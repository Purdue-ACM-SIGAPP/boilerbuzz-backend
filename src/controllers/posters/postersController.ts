// import { db } from "@/libs/dbs";// Once db is setup, uncomment this line
import { Request, Response } from "express";
import pool from "@/libs/db";

const getPosters = async (_req: Request, res: Response) => {
  try {
    const data = await pool.query('SELECT * FROM Posters');
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
    const data = await pool.query('SELECT * FROM Posters WHERE id = $1', [_req.params.id]);
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
    const data = await pool.query('INSERT INTO Posters (club_id, user_id, location, position, img_path) VALUES ($1, $2, $3, $4, $5) RETURNING *', [_req.body.club_id, _req.body.user_id, _req.body.location, _req.body.position, _req.body.img_path]);
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
      const data = await pool.query('UPDATE Posters SET  club_id = $1, user_id = $2, location = $3, position = $4, img_path = $5 WHERE id = $6', [_req.body.club_id, _req.body.user_id, _req.body.location, _req.body.position, _req.body.img_path, _req.params.id]);
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
      const data = await pool.query('DELETE FROM Posters WHERE id = $1', [_req.params.id]);
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

export {
  getPosters,
  getPoster,
  addPoster,
  updatePoster,
  deletePoster,

};