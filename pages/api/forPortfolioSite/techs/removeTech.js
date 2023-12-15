import { removeTech } from "../../../../lib/mongodb";

export default function (req, res) {
  try {
    const title = req.body;
    removeTech(title).then((result) => {
      res.status(200).json({ result: result });
    });
  } catch (error) {
    console.log("api removeTech --- " + error.message);
    res.end(error.message);
  }
}
