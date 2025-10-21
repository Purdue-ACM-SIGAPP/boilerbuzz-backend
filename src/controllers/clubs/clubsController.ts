// import { db } from "@/libs/dbs";// Once db is setup, uncomment this line
import { Request, Response } from "express";
import pool from "@/libs/db";

const getClubs = async (req: Request, res: Response) => {
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

const getClub = async (req: Request, res: Response) => {
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

const addClub = async (req: Request, res: Response) => {
  try {
    const data = await pool.query('INSERT INTO Club (member_post_permissions) VALUES ($1) RETURNING *', [_req.body.member_post_permissions]);
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
const updateClub = async (req: Request, res: Response) => {
  try {
    const data = await pool.query('UPDATE Club SET member_post_permissions = $1 WHERE id = $2', [_req.body.member_post_permissions, _req.params.id]);
    res.status(200).json(data.rows);
    // res.status(200).json({ message: "Update club endpoint hit. Functionality to be implemented." });
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

const deleteClub = async (req: Request, res: Response) => {
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