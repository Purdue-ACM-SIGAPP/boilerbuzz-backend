
import { Request, Response } from "express";
import pool from "@/libs/db.js";

export async function remoteImageUrlToBase64(url: string): Promise<{ dataUrl: string, mime: string, base64: string }> {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`);

    const mime = res.headers.get('content-type') || 'application/octet-stream';
    const arrayBuffer = await res.arrayBuffer();                // Uint8Array-compatible
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');
    const dataUrl = `data:${mime};base64,${base64}`;

    return { dataUrl, mime, base64 };
}

const getPosterImage = async (req: Request, res: Response) => {
    try {
        console.log("Fetching poster image...");
        const posterId = req.params.id;

        const query = "SELECT img_path FROM poster WHERE id = $1";
        const values = [posterId];

        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Poster not found",
                details: `No poster found with id ${posterId}`,
            });
        }

        const img_path = result.rows[0].img_path;

        const { dataUrl } = await remoteImageUrlToBase64(img_path);

        return res.status(200).json({ data_url: dataUrl });
    } catch (err) {
        console.error("Error fetching poster image:", err);
        return res.status(500).json({
            error: "Failed to fetch poster image",
            details:
                "There was an internal server error while retrieving the poster image. Please try again later.",
            technical_error: err instanceof Error ? err.message : String(err),
        });
    }
};

const getPosters = async (_req: Request, res: Response) => {
  try {
    const data = await pool.query("SELECT * FROM Poster");
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
    const data = await pool.query("SELECT * FROM Poster WHERE id = $1", [
      _req.params.id,
    ]);
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
    const data = await pool.query(
      "INSERT INTO Poster (club_id, user_id, location, position, img_path) VALUES ($1, $2, $3, $4::point, $5) RETURNING *",
      [
        _req.body.club_id,
        _req.body.user_id,
        _req.body.location,
        _req.body.position,
        _req.body.img_path,
      ],
    );
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
    const data = await pool.query(
      "UPDATE Poster SET  club_id = $1, user_id = $2, location = $3, position = $4::point, img_path = $5 WHERE id = $6",
      [
        _req.body.club_id,
        _req.body.user_id,
        _req.body.location,
        _req.body.position,
        _req.body.img_path,
        _req.params.id,
      ],
    );
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
    const data = await pool.query("DELETE FROM Poster WHERE id = $1", [
      _req.params.id,
    ]);
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

export { addPoster, deletePoster, getPoster, getPosters, updatePoster, getPosterImage };
