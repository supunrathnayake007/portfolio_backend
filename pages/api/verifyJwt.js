import { verifyJwt } from "../../lib/jsonWebToken";

export default function (req, res) {
  const body = JSON.parse(req.body);
  if (!req.body) {
    req.statusCode = 404;
    res.end("Error");
    return;
  }
  const { jsonWebToken } = body;
  try {
    const decodedToken = verifyJwt(jsonWebToken);
    res.json({ decodedToken });
  } catch (error) {
    res.end(error.message);
  }
}
