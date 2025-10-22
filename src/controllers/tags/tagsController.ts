// import { db } from "@/libs/dbs";// Once db is setup, uncomment this line
import { Request, Response } from "express";

import pool from "@/libs/db";

const getTags = async (req: Request, res: Response) => {
  try {
    const data = await pool.query('SELECT * FROM Tags');
    res.status(200).json(data.rows);
  } catch (err) {
    console.error("Error fetching Tags:", err);
    res.status(500).json({
      error: "Failed to fetch Tags",
      details:
        "There was an internal server error while retrieving all Tags. Please try again later.",
      technical_error: err.message,
    });
  }
};

const getTag = async (req: Request, res: Response) => {
  try {
    const data = await pool.query('SELECT * FROM Tags WHERE id = $1', [req.params.id]);
    res.status(200).json(data.rows[0]);
  } catch (err) {
    console.error("Error fetching Tag:", err);
    res.status(500).json({
      error: "Failed to fetch Tag",
      details:
        "There was an internal server error while retrieving the Tag. Please try again later.",
      technical_error: err.message,
    });
  }
};

const addTag = async (req: Request, res: Response) => {
  try {
    const data = await pool.query('INSERT INTO Tags (tag_name) VALUES ($1) RETURNING *', [req.body.tag_name]);
    res.status(200).json(data.rows);
  } catch (err) {
    console.error("Error Adding Tag:", err);
    res.status(500).json({
      error: "Failed to adding Tag",
      details:
        "There was an internal server error while adding the Tag. Please try again later.",
      technical_error: err.message,
    });
  }
};

const updateTag = async (req: Request, res: Response) => {
  try {
    const data = await pool.query('UPDATE Tags SET tag_name = $1 WHERE id = $2', [req.body.tag_name, req.params.id]);
    res.status(200).json(data.rows);
  } catch (err) {
    console.error("Error updating Tag:", err);
    res.status(500).json({
      error: "Failed to updating Tag",
      details:
        "There was an internal server error while updating the Tag. Please try again later.",
      technical_error: err.message,
    });
  }
};

const deleteTag = async (req: Request, res: Response) => {
  try {
    const data = await pool.query('DELETE FROM Tags WHERE id = $1', [req.params.id]);
    res.status(200).json(data.rows);
  } catch (err) {
    console.error("Error deleting Tag:", err);
    res.status(500).json({
      error: "Failed to deleting Tag",
      details:
        "There was an internal server error while deleting the Tag. Please try again later.",
      technical_error: err.message,
    });
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



export {
  getTags,
  getTag,
  addTag,
  updateTag,
  deleteTag,
  tagPoster,
  untagPoster

};