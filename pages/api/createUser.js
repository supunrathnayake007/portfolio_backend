import jwt from "jsonwebtoken";
import { createUser } from "../../lib/mongodb";
import { hashPassword } from "../../lib/bcryptHash.js";

export default function (req, res) {
  if (!req.body) {
    req.statusCode = 404;
    res.end("Error");
    return;
  }

  const { username, password } = req.body;
  const passwordHash = hashPassword(password);

  let result = createUser(username, passwordHash);

  res.status(200).json({ result: result });
}
