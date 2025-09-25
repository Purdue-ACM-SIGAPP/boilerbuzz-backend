// import { db } from "@/libs/dbs";// Once db is setup, uncomment this line
import { Request, Response } from "express";

const getPosters = async (_req: Request, res: Response) => {
  try {
    console.log("Fetching all posters...");
    res.status(200).json({ message: "Fetched all posters successfully" });
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
    console.log("Fetching a poster...");
    res.status(200).json({ message: "Fetched the poster successfully" });
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

  } catch (err) {
    console.error("Error Adding poster:", err);
    res.status(500).json({
      error: "Failed to adding poster",
      details:
        "There was an internal server error while adding the poster. Please try again later.",
      technical_error: err.message,
    });
  }
};

const updatePoster = async (_req: Request, res: Response) => {
  try {

  } catch (err) {
    console.error("Error updating poster:", err);
    res.status(500).json({
      error: "Failed to updating poster",
      details:
        "There was an internal server error while updating the poster. Please try again later.",
      technical_error: err.message,
    });
  }
};

const deletePoster = async (_req: Request, res: Response) => {
  try {

  } catch (err) {
    console.error("Error deleting poster:", err);
    res.status(500).json({
      error: "Failed to deleting poster",
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