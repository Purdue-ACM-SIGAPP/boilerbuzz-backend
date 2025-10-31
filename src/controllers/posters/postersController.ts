// import { db } from "@/libs/dbs";// Once db is setup, uncomment this line
import pool from "@/libs/db";
import { Request, Response } from "express";
const { getSimilarity } = require('calculate-string-similarity');

const getPosters = async (_req: Request, res: Response) => {
  try {
    const data = await pool.query("SELECT * FROM Poster");
    res.status(200).json(data.rows);
  } catch (err) {
    console.error("Error fetching posters:", err);
    res.status(500).json({
      error: "Failed to fetch posters",
      details:
        "There was an internal server error while retrieving all posters. Please try again later.",
      technical_error: err.message,
    });
  }
};

const getPoster = async (_req: Request, res: Response) => {
  try {
    const data = await pool.query("SELECT * FROM Poster WHERE id = $1", [
      _req.params.id,
    ]);
    res.status(200).json(data.rows);
  } catch (err) {
    console.error("Error fetching poster:", err);
    res.status(500).json({
      error: "Failed to fetch poster",
      details:
        "There was an internal server error while retrieving the poster. Please try again later.",
      technical_error: err.message,
    });
  }
};

const addPoster = async (_req: Request, res: Response) => {
  try {
    const data = await pool.query(
      "INSERT INTO Poster (club_id, user_id, location, position, img_path, date) VALUES ($1, $2, $3, $4::point, $5, $6) RETURNING *",
      [
        _req.body.club_id,
        _req.body.user_id,
        _req.body.location,
        _req.body.position,
        _req.body.img_path,
        _req.body.date
      ],
    );
    res.status(200).json(data.rows);
  } catch (err) {
    console.error("Error Adding poster:", err);
    res.status(500).json({
      error: "Failed to add poster",
      details:
        "There was an internal server error while adding the poster. Please try again later.",
      technical_error: err.message,
    });
  }
};

const updatePoster = async (_req: Request, res: Response) => {
  try {
    const data = await pool.query(
      "UPDATE Poster SET  club_id = $1, user_id = $2, location = $3, position = $4::point, img_path = $5, date = $6 WHERE id = $7",
      [
        _req.body.club_id,
        _req.body.user_id,
        _req.body.location,
        _req.body.position,
        _req.body.img_path,
        _req.body.date,
        _req.params.id,
      ],
    );
    res.status(200).json(data.rows);
  } catch (err) {
    console.error("Error updating poster:", err);
    res.status(500).json({
      error: "Failed to update poster",
      details:
        "There was an internal server error while updating the poster. Please try again later.",
      technical_error: err.message,
    });
  }
};

const deletePoster = async (_req: Request, res: Response) => {
  try {
    const data = await pool.query("DELETE FROM Poster WHERE id = $1", [
      _req.params.id,
    ]);
    res.status(200).json(data.rows);
  } catch (err) {
    console.error("Error deleting poster:", err);
    res.status(500).json({
      error: "Failed to delete poster",
      details:
        "There was an internal server error while deleting the poster. Please try again later.",
      technical_error: err.message,
    });
  }
};

async function queryPostersByTags(search_tag: string, page_index: number, page_length: number, date?: string ) {
    const tagsData = await pool.query('SELECT id, tag_name FROM tags');
    const SIM_THRESHOLD = 75;
    const similar_tags: string[] = [];
    const similar_tag_ids: number[] = [];
    
    tagsData.rows.forEach((tag: { tag_name: string, id: number }) => {
        const sim = getSimilarity(search_tag, tag.tag_name);
        if (sim >= SIM_THRESHOLD) {
            similar_tags.push(tag.tag_name);
            similar_tag_ids.push(tag.id);
        }
    });
    
    console.log("Similar tags found:", similar_tags);
    console.log("Similar tag IDs found:", similar_tag_ids);
    
    if (similar_tag_ids.length === 0) {
        return { posters: [], total_count: 0 };
    }
    
    const countData = await pool.query(
        `SELECT COUNT(DISTINCT poster_id) as total FROM PosterTag WHERE tag_id = ANY($1)`,
        [similar_tag_ids]
    );
    const total_count = parseInt(countData.rows[0].total);
    
    const posterIdsData = await pool.query(
        `SELECT DISTINCT poster_id FROM PosterTag
         WHERE tag_id = ANY($1)
         ORDER BY poster_id
         LIMIT $2 OFFSET $3`,
        [similar_tag_ids, page_length, page_index * page_length]
    );
    
    const posterIds = posterIdsData.rows.map((row: { poster_id: number }) => row.poster_id);
    console.log("Poster IDs found for similar tags:", posterIds);
    
    if (posterIds.length === 0) {
        console.log("No posters found for similar tags");
        return { posters: [], total_count };
    }
    
    let query = `SELECT * FROM Poster WHERE id = ANY($1)`;
    let params: (number[] | string)[] = [posterIds];

    if (date) {
      query += ` AND date = $2`;
      params.push(date);
    }

    query += ` ORDER BY id`;

    const postersData = await pool.query(query, params);

    const posters = postersData.rows;

    return { posters, total_count };
}

export const searchPosters = async (req: Request, res: Response) => {
  try {
    const { search_tag, date, page_index = 0, page_length = 10 } = req.body;

    if (date && isNaN(Date.parse(date))) {
      return res.status(400).json({ error: "date must be a valid date" });
    }

    let query = `
      SELECT * FROM Poster
      WHERE 1=1
    `;
    const values: any[] = [];
    let count = 0;

    if (search_tag) {
      count++;
      query += ` AND id IN (
        SELECT poster_id FROM PosterTag pt
        JOIN Tag t ON pt.tag_id = t.id
        WHERE LOWER(t.name) LIKE LOWER($${count})
      )`;
      values.push(`%${search_tag}%`);
    }

    if (date) {
      count++;
      query += ` AND DATE(date) = DATE($${count})`;
      values.push(date);
    }

    count++;
    query += ` ORDER BY id DESC LIMIT $${count}`;
    values.push(page_length);

    count++;
    query += ` OFFSET $${count}`;
    values.push(page_index * page_length);

    const posters = (await pool.query(query, values)).rows;

    let countQuery = "SELECT COUNT(*) FROM Poster WHERE 1=1";
    const countValues: any[] = [];
    let countParam = 0;

    if (search_tag) {
      countParam++;
      countQuery += ` AND id IN (
        SELECT poster_id FROM PosterTag pt
        JOIN Tag t ON pt.tag_id = t.id
        WHERE LOWER(t.name) LIKE LOWER($${countParam})
      )`;
      countValues.push(`%${search_tag}%`);
    }

    if (date) {
      countParam++;
      countQuery += ` AND DATE(date) = DATE($${countParam})`;
      countValues.push(date);
    }

    const totalCount = await pool.query(countQuery, countValues);

    return res.status(200).json({
      posters,
      total_count: parseInt(totalCount.rows[0].count, 10),
    });

  } catch (err) {
    console.error("Error in searchPosters:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { addPoster, deletePoster, getPoster, getPosters, updatePoster };
