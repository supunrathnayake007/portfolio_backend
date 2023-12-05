import jwt from "jsonwebtoken";
import { findUser } from "../../lib/mongodb.js";
import { hashPassword, compare } from "../../lib/bcryptHash.js";

const KEY = "dfbdsfbsdkjbsdkjfbsdk";

export default async function (req, res) {
  if (!req.body) {
    req.statusCode = 404;
    res.end("Error");
    return;
  }
  console.log("inside api/login ");
  const body = JSON.parse(req.body);
  const { username, password } = body;

  try {
    const hashPassword = await findUser(username);
    const authorized = await compare(password, hashPassword);

    res.json({ authorized: authorized });
  } catch (error) {
    console.log("api/login catch error " + error.message);
  }
  // console.log("api/login 2" + result);
  //return result;
  // res.json({
  //   token: jwt.sign(
  //     {
  //       username,
  //       admin: username === "admin" && password === "admin",
  //     },
  //     KEY
  //   ),
  // });
}
