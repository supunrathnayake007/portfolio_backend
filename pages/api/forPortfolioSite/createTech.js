import { createTech } from "../../../lib/mongodb.js";

export default function (req, res) {
  const body = JSON.parse(req.body);
  const { formData, title } = body;
  if (!req.body) {
    req.statusCode = 404;
    res.end("Error");
    return;
  }

  try {
    createTech(formData, title).then((result) => {
      res.status(200).json({ result: result });
    });
  } catch (error) {
    res.end(error.message);
  }
}
