import { getAllProject } from "../../../lib/mongodb";

export default function (req, res) {
  // Set CORS headers to allow requests from all origins
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  try {
    getAllProject().then((result) => {
      res.status(200).json({ result: result });
    });
  } catch (error) {
    console.log("api getAllProject --- " + error.message);
    res.end(error.message);
  }
}
