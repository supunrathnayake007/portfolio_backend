import { getWallpapers } from "../../../lib/mongodb";
export default async function (req, res) {
  // Set CORS headers to allow requests from all origins
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  try {
    const body = JSON.parse(req.body);
    const { viewedIds, pageNumber, dataPerPage } = body;
    const result = await getWallpapers(viewedIds, pageNumber, dataPerPage);
    //console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
}
