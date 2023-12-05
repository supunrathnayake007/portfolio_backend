const bcrypt = require("bcrypt");
const saltRounds = 10; // Number of salt rounds

export async function hashPassword(plainPassword) {
  if (!plainPassword) console.log("plainPassword not defined or something");
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    //throw new Error("Error hashing password");
    console.log("Error hashing password - " + error.message);
  }
}

export async function compare(password, hashPassword) {
  try {
    const result = await bcrypt.compare(password, hashPassword);
    return result;
  } catch (error) {
    console.log("Error compare password - " + error.message);
  }
}

// // Usage example
// const plaintextPassword = "your_password_here";

// hashPassword(plaintextPassword)
//   .then((hashedPassword) => {
//     console.log("Hashed Password:", hashedPassword);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
