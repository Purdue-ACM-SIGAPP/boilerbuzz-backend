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




export {
  getTags,
  getTag,
  addTag,
  updateTag,
  deleteTag,


};