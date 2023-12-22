import { getAllProject } from "../../../lib/mongodb";

export default function (req, res) {
  try {
    getAllProject().then((result) => {
      res.status(200).json({ result: result });
    });
  } catch (error) {
    console.log("api getAllProject --- " + error.message);
    res.end(error.message);
  }
}
