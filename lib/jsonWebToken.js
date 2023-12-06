import jwt from "jsonwebtoken";

const KEY = "abc@123456789Abc@123456789";
export function jwtSign(data, expires) {
  return {
    token: jwt.sign(data, KEY, { expiresIn: expires }),
  };
}

export function verifyJwt(token) {
  //this function doesn't work in browser
  //better put in server-side
  try {
    if (!token || typeof token !== "string") {
      return { valid: false, error: "Invalid token format" };
    }
    const decoded = jwt.verify(token, KEY);
    return { valid: true, payload: decoded }; // Token is valid, return decoded payload
  } catch (error) {
    console.log("jsonWebToken.js catch error - " + error.message);
    if (error instanceof jwt.TokenExpiredError) {
      return { valid: false, error: "Token expired" };
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return { valid: false, error: "Invalid token" };
    }
    return { valid: false, error: error.message }; // Token is invalid or expired
  }
}
