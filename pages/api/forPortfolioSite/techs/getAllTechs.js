import { getAllTechs } from "../../../../lib/mongodb";

export default function (req, res) {
  try {
    getAllTechs().then((result) => {
      res.status(200).json({ result: result });
    });
  } catch (error) {
    console.log("api getAllTechs --- " + error.message);
    res.end(error.message);
  }
}
