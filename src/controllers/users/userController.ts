import { Request, Response } from "express";

import pool from "@/libs/db";

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

export const addUser = async (_request: Request, response: Response) => {
  try {
    await pool.query("INSERT INTO Users (userid) VALUES (DEFAULT)");

    response.status(200);
  } catch {
    response.status(500).json("Failed to add user data");
  }
};

export const updateUserSettings = async (
  _request: Request,
  response: Response,
) => {
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

export const syncClerkUser = async (request: Request, response: Response) => {
  console.log("syncClerkUser called");
  try {
    const { clerk_user_id } = request.body;
    console.log("clerk_user_id received:", clerk_user_id);

    if (!clerk_user_id) {
      return response.status(400).json({ error: "clerk_user_id is required" });
    }

    console.log("About to query existing user");
    const existingUser = await pool.query(
      'SELECT * FROM appuser WHERE clerk_user_id = $1',
      [clerk_user_id]
    );
    console.log("Query completed, rows found:", existingUser.rows.length);

    if (existingUser.rows.length > 0) {
      console.log("User already exists:", clerk_user_id);
      return response.status(200).json({ 
        message: "User already exists",
        user: existingUser.rows[0] 
      });
    }

    console.log("About to insert new user");
    const newUser = await pool.query(
      'INSERT INTO appuser (clerk_user_id) VALUES ($1) RETURNING *',
      [clerk_user_id]
    );

    console.log("User created successfully:", clerk_user_id);
    return response.status(201).json({
      message: "User created successfully",
      user: newUser.rows[0]
    });

  } catch (error) {
    console.error("Error syncing Clerk user:", error);
    return response.status(500).json({
      error: "Failed to sync user",
      technical_error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};