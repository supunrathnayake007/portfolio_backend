import jwt from "jsonwebtoken";

const KEY = "dfbdsfbsdkjbsdkjfbsdk";

export default function (req, res) {
  if (!req.body) {
    req.statusCode = 404;
    res.end("Error");
    return;
  }

  const { username, password } = req.body;

  res.json({
    token: jwt.sign(
      {
        username,
        admin: username === "admin" && password === "admin",
      },
      KEY
    ),
  });
}
