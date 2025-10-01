// import { db } from "@/libs/dbs";// Once db is setup, uncomment this line
import { Request, Response } from "express";
import pool from "@/libs/db";

const getClubs = async (_req: Request, res: Response) => {
  try {
    const data = await pool.query('SELECT * FROM club');
    res.status(200).json(data.rows);
  } catch (err) {
    console.error("Error fetching clubs:", err);
    res.status(500).json({
      error: "Failed to fetch clubs",
      details:
        "There was an internal server error while retrieving all clubs. Please try again later.",
      technical_error: err.message,
    });
  }
};

const getClub = async (_req: Request, res: Response) => {
  try {
    const data = await pool.query('SELECT * FROM Club WHERE id = $1', [_req.params.id]);
    res.status(200).json(data.rows[0]);
  } catch (err) {
    console.error("Error fetching club:", err);
    res.status(500).json({
      error: "Failed to fetch club",
      details:
        "There was an internal server error while retrieving the club. Please try again later.",
      technical_error: err.message,
    });
  }
};

const addClub = async (_req: Request, res: Response) => {
  try {
    const data = await pool.query('INSERT INTO Club (name, description) VALUES ($1, $2) RETURNING *', [_req.body.name, _req.body.description]);
    res.status(200).json(data.rows);
  } catch (err) {
    console.error("Error Adding club:", err);
    res.status(500).json({
      error: "Failed to adding club",
      details:
        "There was an internal server error while adding the club. Please try again later.",
      technical_error: err.message,
    });
  }
};

const updateClub = async (_req: Request, res: Response) => {
  try {
    const data = await pool.query('UPDATE Club SET name = $1, description = $2 WHERE id = $3', [_req.body.name, _req.body.description, _req.params.id]);
    res.status(200).json(data.rows);
  } catch (err) {
    console.error("Error updating club:", err);
    res.status(500).json({
      error: "Failed to updating club",
      details:
        "There was an internal server error while updating the club. Please try again later.",
      technical_error: err.message,
    });
  }
};

const deleteClub = async (_req: Request, res: Response) => {
  try {
    const data = await pool.query('DELETE FROM Club WHERE id = $1', [_req.params.id]);
    res.status(200).json(data.rows);

  } catch (err) {
    console.error("Error deleting club:", err);
    res.status(500).json({
      error: "Failed to deleting club",
      details:
        "There was an internal server error while deleting the club. Please try again later.",
      technical_error: err.message,
    });
  }
};

export {
  getClubs,
  getClub,
  addClub,
  updateClub,
  deleteClub,

};