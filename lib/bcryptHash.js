const bcrypt = require("bcrypt");
const saltRounds = 10; // Number of salt rounds

export async function hashPassword(plainPassword) {
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
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
