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
    await collectionName.createIndex({ username: 1 }, { unique: true });
    //your group can be implement later
    const userGroupId = 101;

    // Create a user to insert
    const user = {
      username: username,
      passwordHash: passwordHash,
      userGroupId: userGroupId,
    };
    const result = await collectionName.insertOne(user);

    // Print the ID of the inserted document
    console.log(`the user inserted with the _id: ${result.insertedId}`);
    return result;
  } catch (error) {
    await client.close();
    console.log("catch from mongodb.js  -" + error.message);
    return { error };
  } finally {
    // Close the MongoDB client connection
    await client.close();
  }
}
export async function findUser(username) {
  try {
    await client.connect();
    const database = client.db("socialMediaClone");
    const collectionName = database.collection("user");
    const result = await collectionName.findOne({ username: username });
    //console.log("from mongodb.js  1212 -" + result.passwordHash);
    return result;
  } catch (error) {
    console.log("catch from mongodb.js  -" + error.message);
    await client.close();
    return { error };
  } finally {
    await client.close();
  }
}
// Run the function and handle any errors
//run().catch(console.dir);
