import { getAllPost } from "../../../lib/mongodb";
export default function (req, res) {
  try {
    getAllPost().then((result) => {
      res.status(200).json({ result: result });
    });
  } catch (error) {
    console.log("api getAllTechs --- " + error.message);
    res.end(error.message);
  }
}
