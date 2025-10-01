import { Request, Response } from "express";

import pool from "../libs/db";

export const listUsers = async (_request: Request, response: Response) => {
  try {
    const result = await pool.query("SELECT * FROM Users");
    console.log("Get list of users from database");
    response.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Failed to list users" });
  }
};

export const getUserData = async (request: Request, response: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM UserSettings WHERE userid = $1",
      [request.params.id],
    );

    console.log("Update user data request sent");
    response.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    response.status(500).json("Failed to fetch user data");
  }
};

export const addPoster = async (request: Request, response: Response) => {
  try {
    await pool.query(
      "INSERT INTO Poster (id, club_id, user_id, location, position, img_path) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        request.body.id,
        request.body.clubId,
        request.body.userId,
        request.body.location,
        request.body.position,
        request.body.imgPath,
      ],
    );

    response.status(200);
  } catch {
    response.status(500).json("Failed to add poster data");
  }
};

export const updateUserSettings = async (_request: Request, response: Response) => {
  // No need to do anything since there is nothing in the user settings table
  // other than the user ID.
  response.status(200);
};

export const deleteUserData = async (request: Request, response: Response) => {
  try {
    await pool.query("DELETE FROM UserSettings WHERE userid = $1", [
      request.params.id,
    ]);

    console.log("Delete user data request processed");
    response.status(200);
  } catch (error) {
    console.error(error);
    response.status(500).json("Failed to delete user data");
  }
};
