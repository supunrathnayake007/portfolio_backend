import { findUser } from "../../lib/mongodb.js";
import { hashPassword, compare } from "../../lib/bcryptHash.js";
import { jwtSign } from "../..//lib/jsonWebToken.js";
const KEY = "abc@123456789Abc@123456789";

export default async function (req, res) {
  if (!req.body) {
    req.statusCode = 404;
    res.end("Error");
    return;
  }
  console.log("inside api/login ");
  const body = JSON.parse(req.body);
  const { username, password, expiresIn } = body;

  try {
    const result = await findUser(username);
    const passwordHash = result.passwordHash;
    const userGroupId = result.userGroupId;
    const authorized = await compare(password, passwordHash);

    const tokeData = {
      username,
      authorized,
      userGroupId,
    };
    res.json(jwtSign(tokeData, expiresIn));
  } catch (error) {
    console.log("api/login catch error " + error.message);
  }
}
