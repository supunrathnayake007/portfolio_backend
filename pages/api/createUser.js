import jwt from "jsonwebtoken";
import { createUser } from "../../lib/mongodb.js";
import { hashPassword } from "../../lib/bcryptHash.js";

export default function (req, res) {
  const body = JSON.parse(req.body);
  if (!req.body) {
    req.statusCode = 404;
    res.end("Error");
    return;
  }

  const { username, password } = body;
  try {
    hashPassword(password).then((passwordHash) => {
      //console.log("111--passwordHash: " + passwordHash);
      createUser(username, passwordHash).then((result) => {
        res.status(200).json({ result: result });
      });
    });
  } catch (error) {
    res.end(error.message);
  }
}
