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
      "INSERT INTO Poster (club_id, user_id, location, position, img_path) VALUES ($1, $2, $3, $4::point, $5) RETURNING *",
      [
        _req.body.club_id,
        _req.body.user_id,
        _req.body.location,
        _req.body.position,
        _req.body.img_path,
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
      "UPDATE Poster SET  club_id = $1, user_id = $2, location = $3, position = $4::point, img_path = $5 WHERE id = $6",
      [
        _req.body.club_id,
        _req.body.user_id,
        _req.body.location,
        _req.body.position,
        _req.body.img_path,
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

async function queryPostersByTags(search_tag: string, page_index: number, page_length: number) {
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

  const postersData = await pool.query(
    `SELECT * FROM Poster WHERE id = ANY($1) ORDER BY id`,
    [posterIds]
  );

  const posters = postersData.rows;

  return { posters, total_count };
}

export const searchPosters = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search_tag, page_index = 0, page_length = 10 } = req.body;

    if (!search_tag || typeof search_tag !== 'string') {
      res.status(400).json({ error: "search_tag must be a non-empty string" });
      return;
    }

    if (search_tag.trim() === '') {
      res.status(400).json({ error: "search_tag cannot be empty" });
      return;
    }

    const pageIndex = Number(page_index);
    if (isNaN(pageIndex) || !Number.isInteger(pageIndex)) {
      res.status(400).json({ error: "page_index must be an integer" });
      return;
    }

    if (pageIndex < 0) {
      res.status(400).json({ error: "page_index must be non-negative" });
      return;
    }

    const pageLength = Number(page_length);
    if (isNaN(pageLength) || !Number.isInteger(pageLength)) {
      res.status(400).json({ error: "page_length must be an integer" });
      return;
    }

    if (pageLength <= 0) {
      res.status(400).json({ error: "page_length must be greater than 0" });
      return;
    }

    if (pageLength > 100) {
      res.status(400).json({ error: "page_length cannot exceed 100" });
      return;
    }

    const result = await queryPostersByTags(search_tag, pageIndex, pageLength);

    res.status(200).json(result);
    return;
  } catch (error) {
    console.error("Error searching posters:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};

const tagPoster = async (req: Request, res: Response) => {
  try {
    //check if the tag and poster exist
    const tagCheck = await pool.query('SELECT * FROM Tags WHERE id = $1', [req.params.tagId]);
    const posterCheck = await pool.query('SELECT * FROM Poster WHERE id = $1', [req.params.posterId]);
    if (tagCheck.rows.length === 0)
      return res.status(404).json({ error: "Tag not found" });
    if (posterCheck.rows.length === 0)
      return res.status(404).json({ error: "Poster not found" });

    //check if the tag is already associated with the poster
    const associationCheck = await pool.query('SELECT * FROM PosterTag WHERE tag_id = $1 AND poster_id = $2', [req.params.tagId, req.params.posterId]);
    if (associationCheck.rows.length > 0)
      return res.status(400).json({ error: "Tag is already associated with the Poster" });

    //associate the tag with the poster
    const data = await pool.query('INSERT INTO postertag (tag_id, poster_id) VALUES ($1, $2) RETURNING *', [req.params.tagId, req.params.posterId]);
    return res.status(200).json(data.rows);
  } catch (err) {
    console.error("Error tagging Poster:", err);
    return res.status(500).json({
      error: "Failed to tag Poster",
      details:
        "There was an internal server error while tagging the Poster. Please try again later.",
      technical_error: err.message,
    });
  }
};

const untagPoster = async (req: Request, res: Response) => {
  try {
    //check if the tag and poster exist
    const tagCheck = await pool.query('SELECT * FROM Tags WHERE id = $1', [req.params.tagId]);
    const posterCheck = await pool.query('SELECT * FROM Poster WHERE id = $1', [req.params.posterId]);
    if (tagCheck.rows.length === 0)
      return res.status(404).json({ error: "Tag not found" });
    if (posterCheck.rows.length === 0)
      return res.status(404).json({ error: "Poster not found" });

    //check if the tag is actually associated with the poster
    const associationCheck = await pool.query('SELECT * FROM PosterTag WHERE tag_id = $1 AND poster_id = $2', [req.params.tagId, req.params.posterId]);
    if (associationCheck.rows.length === 0)
      return res.status(400).json({ error: "Tag is not associated with the Poster" });

    //remove the association between the tag and the poster
    const data = await pool.query('DELETE FROM postertag WHERE tag_id = $1 AND poster_id = $2', [req.params.tagId, req.params.posterId]);
    return res.status(200).json(data.rows);
  } catch (err) {
    console.error("Error untagging Poster:", err);
    return res.status(500).json({
      error: "Failed to untag Poster",
      details:
        "There was an internal server error while untagging the Poster. Please try again later.",
      technical_error: err.message,
    });
  }
};


export { addPoster, deletePoster, getPoster, getPosters, updatePoster, tagPoster, untagPoster };
