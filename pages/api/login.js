import jwt from "jsonwebtoken";
import { findUser } from "../../lib/mongodb.js";
import { hashPassword } from "../../lib/bcryptHash.js";

const KEY = "dfbdsfbsdkjbsdkjfbsdk";

export default function (req, res) {
  if (!req.body) {
    req.statusCode = 404;
    res.end("Error");
    return;
  }
  console.log("inside api/login ");
  const body = JSON.parse(req.body);
  const { username, password } = body;
  //we can compare password hash and create token with auth information
  try {
    const result = findUser(username).then((result) => {
      //const hash = result.hashPassword.split(".");
      res.status(200).json({ result: result });
      //console.log("api/login " + result.hashPassword);
    });
    //console.log("api/login 2" + result.hashPassword); //we cant do any thing here
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
