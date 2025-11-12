import pool from "@/libs/db.js";
import { Request, Response } from "express";

const getUserSettings = async (_req: Request, res: Response) => {
  // #swagger.description = 'Retrieve all user settings from the database.'

  /* #swagger.responses[200] = {
          description: 'User settings retrieved successfully.',
  } */
  /* #swagger.responses[500] = {
           description: 'Failed to fetch user settings.',
   } */
  try {
    const query = "SELECT * FROM usersettings";
    const result = await pool.query(query);
    res.status(200).json({ res: result });
  } catch (err) {
    console.error("Error fetching user settings:", err);
    res.status(500).json({ error: "Failed to fetch user settings" });
  }
};

// GET /api/user/settings/:id
// Given a user id (foreign key), return that user's setting if it exists.
const createUserSetting = async (_req: Request, res: Response) => {
  // #swagger.description = 'Create user settings for a given user ID.'
  /*  #swagger.parameters['id'] = {
              in: 'body',
              description: 'ID of the user to create settings for',
              required: true,
              schema: { type: 'integer' }
   } */
  /* #swagger.responses[200] = {
          description: 'User settings created successfully.',
  } */
  /* #swagger.responses[500] = {
           description: 'Failed to fetch user settings.',
   } */

  const { id } = _req.body;
  if (!id) {
    return res.status(400).json({ error: "Missing user id in body" });
  }
  try {
    const query = "INSERT INTO usersettings (user_id) VALUES ($1)";
    const result = await pool.query(query, [id]);
    console.debug(result);
    return res.status(200).json({ good: "Created user settings for user" });
  } catch (err) {
    console.error("Error fetching user settings for id", id, err);
    return res.status(500).json({ error: "Failed to fetch user settings" });
  }
};

const getUserSettingsByUserId = async (_req: Request, res: Response) => {
  // #swagger.description = 'Create a new club and assign the requesting user as its administrator.'
  /*  #swagger.parameters['id'] = {
              in: 'path',
              description: 'ID of the user to get settings for',
              required: true,
              schema: { type: 'integer' }
   } */
  /* #swagger.responses[200] = {
          description: 'User settings retrieved successfully.',
  } */
  /* #swagger.responses[500] = {
           description: 'Failed to fetch user settings.',
   } */
  const { id } = _req.params;
  if (!id) {
    return res.status(400).json({ error: "Missing user id in params" });
  }
  try {
    const query = "SELECT * FROM usersettings WHERE user_id = $1 LIMIT 1";
    const result = await pool.query(query, [id]);

    if (result.rows.length == 0) {
      return res.status(404).json({ error: "User settings not found" });
    }

    return res.status(200).json({ res: result });
  } catch (err) {
    console.error("Error fetching user settings for id", id, err);
    return res.status(500).json({ error: "Failed to fetch user settings" });
  }
};

// NO SETTINGS TO UPDATE YET
// const putUserSetting = async (_req: Request, res: Response) => {
//     const { user_id } = _req.body;
//     const curr_id = _req.params.id;
//     if (!user_id) {
//         return res.status(400).json({ error: "Missing user id in body" });
//     }
//     if (!curr_id) {
//         return res.status(400).json({ error: "Missing user id in params" });
//     }
//     try {
//         const query = "UPDATE usersettings SET user_id = ($1) WHERE user_id = ($2)";
//         const result = await pool.query(query, [user_id, curr_id]);
//         console.debug(result)
//         return res.status(200).json({good : "Updated user settings for user"});
//     } catch (err) {
//         console.error("Error fetching user settings for id", curr_id, err);
//         return res.status(500).json({ error: "Failed to fetch user settings" });
//     }
// };

const deleteUserSetting = async (_req: Request, res: Response) => {
  // #swagger.description = 'Delete user settings for a given user ID.'
  /*  #swagger.parameters['id'] = {
              in: 'path',
              description: 'ID of the user to delete settings for',
              required: true,
              schema: { type: 'integer' }
   } */
  /* #swagger.responses[200] = {
          description: 'User settings deleted successfully.',
  } */
  /* #swagger.responses[500] = {
           description: 'Failed to fetch user settings.',
   } */
  const { id } = _req.params;
  if (!id) {
    return res.status(400).json({ error: "Missing user id in body" });
  }
  try {
    const query = "DELETE FROM usersettings WHERE user_id = ($1)";
    const result = await pool.query(query, [id]);
    console.debug(result);
    return res.status(200).json({ good: "Created user settings for user" });
  } catch (err) {
    console.error("Error fetching user settings for id", id, err);
    return res.status(500).json({ error: "Failed to fetch user settings" });
  }
};

export {
  createUserSetting,
  deleteUserSetting,
  getUserSettings,
  getUserSettingsByUserId,
};
