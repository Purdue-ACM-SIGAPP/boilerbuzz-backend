const { getSimilarity } = require('calculate-string-similarity');
import pool from "@/libs/db.js";

async function queryPostersByTags(search_tag: string, page_index: number, page_length: number) {
    const tagsData = await pool.query('SELECT * FROM tags');
    //TEST: const data = { rows: [{ tag_name: "Test" }, { tag_name: "Another" }, { tag_name: "Sample" }, { tag_name: "Exampleag" }, { tag_name: "Demo" }] };
    const SIM_THRESHOLD = 75;
    let similar_tags: string[] = [];
    let similar_tag_ids: number[] = [];
    tagsData.rows.forEach((tag: { tag_name: string, tag_id: number }) => {
        const sim = getSimilarity(search_tag, tag.tag_name);
        if (sim >= SIM_THRESHOLD) {
            similar_tags.push(tag.tag_name);
            similar_tag_ids.push(tag.tag_id);
        }
    });
    if (similar_tags.length === 0) {
        return { posters: [], total_count: 0 };
    }
    let posterIdsData = await pool.query(
        `SELECT DISTINCT p.* FROM PosterTag p
         WHERE tag_id = ANY($1)
         LIMIT $2 OFFSET $3`,
        [similar_tag_ids, page_length, page_index * page_length]
    );
    let posterIds = posterIdsData.rows.map((row: { poster_id: number }) => row.poster_id);
    if (posterIds.length === 0) {
        return { posters: [], total_count: 0 };
    }
    let postersData = await pool.query(
        `SELECT * FROM Poster
         WHERE id = ANY($1)`,
        [posterIds]
    );

    let posters = postersData.rows;


    return posters;
}

console.log(queryPostersByTags("Example", 0, 10));