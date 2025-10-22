// import { db } from "@/libs/dbs";// Once db is setup, uncomment this line
import { Request, Response } from "express";
import pool from "@/libs/db";

const getClubs = async (_req: Request, res: Response) => {
  /*
    #swagger.summary = "List All Clubs"
    #swagger.description = "Retrieves all club IDs and club permissions"
  */

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
  /*
    #swagger.summary = "Get Club"
    #swagger.description = "Retrieves club ID and permission for specified club"
    #swagger.parameters["id"] = {
      description: "Club ID"
    }
  */

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
  /*
    #swagger.summary = "Add Club"
    #swagger.description = "Creates a new club with specified permissions"
    #swagger.body["member_post_permissions"] = {
      in: "body",
      description: "Post permission for members",
      type: "boolean"
    }
  */

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

const updateClub = async (_req: Request, res: Response) => {
  /*
    #swagger.summary = "Update Club"
    #swagger.description = "Updates club member post permissions"
    #swagger.parameters["id"] = {
      description: "Club ID"
    }
    #swagger.body["member_post_permissions"] = {
      description: "Post permission for members",
      type: "boolean"
    }
  */

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

const deleteClub = async (_req: Request, res: Response) => {
  /*
    #swagger.summary = "Delete Club"
    #swagger.description = "Deletes a club"
    #swagger.parameters["id"] = {
      description: "Club ID"
    }
  */

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