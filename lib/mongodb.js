import { MongoClient } from "mongodb";

const MONGO_DB_URI =
  "mongodb+srv://supunrathnayake007:robin_hood@cluster0.rhcudih.mongodb.net/?retryWrites=true&w=majority";
const MONGO_DB_NAME = "socialMediaClone";
const COLLECTION_USER = "user";

export async function createUser(username, passwordHash) {
  try {
    const db = await getDatabase();
    const collection = db.collection(COLLECTION_USER);

    // Insert a new document
    const result = await collection.insertOne({ username, passwordHash });

    res
      .status(200)
      .json({ message: "Document inserted", insertedId: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: "Error inserting document" });
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
  cachedDb = db;
  return db;
}

async function getDatabase() {
  if (!cachedDb) {
    cachedDb = await connectToDatabase(MONGO_DB_URI);
  }
  return cachedDb;
}

// export default createUser;
