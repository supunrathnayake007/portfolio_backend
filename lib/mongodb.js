import { MongoClient } from "mongodb";

const MONGO_DB_URI =
  "mongodb+srv://supunrathnayake007:robin_hood@cluster0.rhcudih.mongodb.net/?retryWrites=true&w=majority";
const MONGO_DB_NAME = "socialMediaClone";
const COLLECTION_USER = "user";

export async function createUser(username, passwordHash) {
  try {
    const db = await getDatabase();
    const collection = db.collection(COLLECTION_USER);
    // we can impliment propely later
    const userGroupId = 101;

    // Insert a new document
    const result = await collection.insertOne({
      username,
      passwordHash,
      userGroupId,
    });
  } catch (error) {
    console.log("Error inserting document - mongodb.js -" + error.message);
  }
}

async function connectToDatabase(uri) {
  // if (cachedDb) {
  //   return cachedDb;
  // }
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db(MONGO_DB_NAME);
  return db;
}

async function getDatabase() {
  return await connectToDatabase(MONGO_DB_URI);
}

// export default createUser;
