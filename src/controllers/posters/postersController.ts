
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

export { getPosterImage };