import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://supunrathnayake007:robin_hood@cluster0.rhcudih.mongodb.net/?retryWrites=true&w=majority";

// Create a new client and connect to MongoDB
const client = new MongoClient(uri);

export async function createUser(username, passwordHash) {
  try {
    // Connect to the "insertDB" database and access its "haiku" collection
    await client.connect();
    const database = client.db("socialMediaClone");
    const collectionName = database.collection("user");

    //your group can be implement later
    const userGroupId = 101;

    // Create a user to insert
    const user = {
      username: username,
      passwordHash: passwordHash,
      userGroupId: userGroupId,
    };
    // Insert the defined document into the "user" collection
    const result = await collectionName.insertOne(user);

    // Print the ID of the inserted document
    console.log(`the user inserted with the _id: ${result.insertedId}`);
  } finally {
    // Close the MongoDB client connection
    await client.close();
  }
}
// Run the function and handle any errors
//run().catch(console.dir);
