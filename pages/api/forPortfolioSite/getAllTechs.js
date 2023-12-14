import { getAllTechs } from "../../../lib/mongodb";

export default function () {
  try {
    getAllTechs().then((result) => {
      res.status(200).json({ result: result });
    });
  } catch (error) {
    res.end(error.message);
  }
}
