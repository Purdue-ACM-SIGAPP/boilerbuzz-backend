import { Request, Response } from "express";

import pool from "@/libs/db";

export const listUsers = async (_request: Request, response: Response) => {
  // #swagger.description = 'Gets a list of all users in the database.'
  /* #swagger.responses[200] = {
          description: 'Successful retrieval of user list.',
  } */
  /* #swagger.responses[500] = {
           description: 'Failed to list users.',
   } */
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
  // #swagger.description = 'Gets the user data for a specific user ID.'
  /*  #swagger.parameters['id'] = {
            in: 'path',
            description: 'ID of the user to retrieve data for.',
            required: true,
            type: 'integer'
           
   } */
  /* #swagger.responses[200] = {
          description: 'Successful retrieval of user data.',
  } */
  /* #swagger.responses[500] = {
           description: 'Failed to fetch user data.',
   } */
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
  // #swagger.description = 'Adds a new user to the database.'
  /* #swagger.responses[200] = {
          description: 'Successful addition of new user.',
  } */
  /* #swagger.responses[500] = {
           description: 'Failed to add user data.',
   } */
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
  // No need to do anything since there is nothing in the user settings table
  // other than the user ID.
  // #swagger.description = 'Updates the user settings for a specific user ID.'
  /*  #swagger.parameters['id'] = {
            in: 'path',
            description: 'ID of the user to update settings for.',
            required: true,
            type: 'integer'
   } */
  /* #swagger.responses[200] = {
          description: 'Successful update of user settings.',
  } */
  /* #swagger.responses[500] = {
           description: 'Failed to update user settings.',
   } */

  response.status(200);
};

export const deleteUserData = async (request: Request, response: Response) => {
  // #swagger.description = 'Deletes all user data for a specific user ID.'
  /*  #swagger.parameters['id'] = {
            in: 'path',
            description: 'ID of the user to delete data for.',
            required: true,
            type: 'integer'
   } */
  /* #swagger.responses[200] = {
          description: 'Successful deletion of user data.',
  } */
  /* #swagger.responses[500] = {
           description: 'Failed to delete user data.',
   } */
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