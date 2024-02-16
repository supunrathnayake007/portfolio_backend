import {
  getWallpapersThumb,
  getFieldById,
  UpdateRecodeById,
} from "../../../lib/mongodb";
export default async function (req, res) {
  // Set CORS headers to allow requests from all origins
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  try {
    let body;
    if (typeof req.body === "object" && !Array.isArray(req.body)) {
      body = req.body;
    } else {
      body = JSON.parse(req.body);
    }
    let result = null;
    const action = body.action;
    if (action === "loadThumbs") {
      const { viewedIds, pageNumber, dataPerPage } = body;
      result = await getWallpapersThumb(viewedIds, pageNumber, dataPerPage);
    } else if (action === "loadTheWallpaper") {
      const { id } = body;
      result = await getFieldById("wallpapers", "file_data", id);
    } else if (action === "updateDownloadCount") {
      const { id, data } = body;
      result = await UpdateRecodeById("wallpapers", id, data);
    }

    //console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
}
