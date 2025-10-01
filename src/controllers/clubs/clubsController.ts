// import { db } from "@/libs/dbs";// Once db is setup, uncomment this line
import { Request, Response } from "express";

const getClubs = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const { userId } = req.auth;
    console.log(`User ${userId} is fetching all clubs...`);
    res.status(200).json({ message: "Fetched all clubs successfully" });
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
    // @ts-ignore
    const { userId } = req.auth;
    console.log(`User ${userId} is fetching a club...`);
    res.status(200).json({ message: "Fetched the club successfully" });
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
    // @ts-ignore
    const { userId } = req.auth;
    console.log(`User ${userId} is adding a club...`);
    res.status(200).json({ message: "Club added successfully" });
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
    // @ts-ignore
    const { userId } = req.auth;
    console.log(`User ${userId} is updating a club...`);
    res.status(200).json({ message: "Club updated successfully" });
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
    // @ts-ignore
    const { userId } = req.auth;
    console.log(`User ${userId} is deleting a club...`);
    res.status(200).json({ message: "Club deleted successfully" });
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