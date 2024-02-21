import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = process.env.MONGODB_CONNECTION_STRING;

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

export async function createTech(fileBuffer, title) {
  try {
    // Connect to the "insertDB" database and access its "haiku" collection
    await client.connect();
    const database = client.db("socialMediaClone");
    const collectionName = database.collection("portfolioTechnologies");
    await collectionName.createIndex({ title: 1 }, { unique: true });

    // Create a user to insert
    const tech = {
      fileBuffer: fileBuffer,
      title: title,
    };
    const result = await collectionName.insertOne(tech);

    // Print the ID of the inserted document
    console.log(`the tech inserted with the _id: ${result.insertedId}`);
    return result;
  } catch (error) {
    await client.close();
    console.log("catch from mongodb.js - createTech -" + error.message);
    return error.message;
  } finally {
    // Close the MongoDB client connection
    await client.close();
  }
}
export async function getAllTechs() {
  try {
    await client.connect();
    const database = client.db("socialMediaClone");
    const collectionName = database.collection("portfolioTechnologies");
    const result = collectionName.find().toArray();
    //console.log("from mongodb.js  1212 -" + result.passwordHash);
    return result;
  } catch (error) {
    console.log("catch from mongodb.js  -" + error.message);
    await client.close();
    return { error };
  } finally {
    //await client.close();
  }
}

export async function removeTech(title) {
  try {
    await client.connect();
    const database = client.db("socialMediaClone");
    const collectionName = database.collection("portfolioTechnologies");
    const result = collectionName.deleteOne({ title: title });
    return result;
  } catch (error) {
    console.log("catch from mongodb.js  -" + error.message);
    await client.close();
    return { error };
  } finally {
    //await client.close();
  }
}
// Run the function and handle any errors
//run().catch(console.dir);
export async function getAllProject() {
  try {
    await client.connect();
    const database = client.db("socialMediaClone");
    const collectionName = database.collection("portfolioProjects");
    const result = collectionName.find().toArray();
    return result;
  } catch (error) {
    console.log("catch from mongodb.js  -" + error.message);
    await client.close();
    return { error };
  }
}

export async function createProjectThumb(data) {
  try {
    await client.connect();
    const database = client.db("socialMediaClone");
    const collectionName = database.collection("portfolioProjects");
    await collectionName.createIndex({ title: 1 }, { unique: true });

    const result = await collectionName.insertOne(data);
    console.log(`the tech inserted with the _id: ${result.insertedId}`);
    return result;
  } catch (error) {
    await client.close();
    console.log("catch from mongodb.js - createProjectThumb -" + error.message);
    return error.message;
  }
}
//marked this for remove - use commonInsert method
export async function createAPost(data) {
  try {
    await client.connect();
    const database = client.db("socialMediaClone");
    const collectionName = database.collection("Posts");

    const result = await collectionName.insertOne(data);
    console.log(`the post inserted with the _id: ${result.insertedId}`);
    return result;
  } catch (error) {
    await client.close();
    console.log("catch from mongodb.js - createAPost -" + error.message);
    return error.message;
  }
}
//marked for remove - use getDataPageVice method OR may be infinite scrolling
export async function getAllPost() {
  try {
    await client.connect();
    const database = client.db("socialMediaClone");
    const collectionName = database.collection("Posts");
    const result = await collectionName.find().toArray();
    return result;
  } catch (error) {
    console.log("catch from mongodb.js  -" + error.message);
    await client.close();
    return { error };
  }
}

export async function commonInsert(data, collection) {
  try {
    await client.connect();
    const database = client.db("socialMediaClone");
    const collectionName = database.collection(collection);

    const result = await collectionName.insertOne(data);
    console.log(`the post inserted with the _id: ${result.insertedId}`);
    return result;
  } catch (error) {
    console.log(
      "Error mongodb.js|commonInsert|collection:" +
        collection +
        "|catch:" +
        error.message
    );
    await client.close();
    return { error };
  }
}
export async function commonInsertMany(data, collection) {
  try {
    await client.connect();
    const database = client.db("socialMediaClone");
    const collectionName = database.collection(collection);

    const result = await collectionName.insertMany(data);
    console.log(
      `${result.insertedCount} documents inserted into ${collection}`
    );
    return result;
  } catch (error) {
    console.log(
      `Error mongodb.js|commonInsert|collection:${collection}|catch:${error.message}`
    );
    await client.close();
    return { error };
  }
}

export async function getDataPageVice(collection, dataPerPage, pageNumber) {
  try {
    const skipDataCount = (pageNumber - 1) * dataPerPage;
    await client.connect();
    const database = client.db("socialMediaClone");
    const collectionName = database.collection(collection);
    const result = collectionName
      .find()
      .skip(skipDataCount)
      .limit(dataPerPage)
      .toArray();
    return result;
  } catch (error) {
    console.log(
      "Error mongodb.js|getDataPageVice|collection:" +
        collection +
        "|catch:" +
        error.message
    );
    await client.close();
    return { error };
  }
}
export async function getDataByTable(tableName) {
  try {
    await client.connect();
    const database = client.db("socialMediaClone");
    const collectionName = database.collection(tableName);
    const result = await collectionName.find().toArray();
    await client.close();
    return result;
  } catch (error) {
    console.log("catch from mongodb.js|getDataByTable  -" + error.message);
    await client.close();
    return { error };
  } finally {
    //await client.close();
  }
}
export async function getDataCount(collection) {
  try {
    await client.connect();
    const database = client.db("socialMediaClone");
    const collectionName = database.collection(collection);
    const totalRecords = collectionName.countDocuments();
    return totalRecords;
  } catch (error) {
    console.log(
      "Error mongodb.js|getDataCount|collection:" +
        collection +
        "|catch:" +
        error.message
    );
    await client.close();
    return { error };
  }
}

export async function removeRecodeById(collection, id) {
  try {
    const { ObjectId } = require("mongodb");
    const objectId = new ObjectId(id);
    await client.connect();
    const database = client.db("socialMediaClone");
    const collectionName = database.collection(collection);
    const result = await collectionName.deleteOne({ _id: objectId });
    return result;
  } catch (error) {
    console.log(
      "Error mongodb.js|removeRecodeById|collection:" +
        collection +
        "|catch:" +
        error.message
    );
    await client.close();
    return { error };
  }
}

export async function UpdateRecodeById(collection, id, data) {
  try {
    const { ObjectId } = require("mongodb");
    const objectId = new ObjectId(id);
    await client.connect();
    const database = client.db("socialMediaClone");
    const collectionName = database.collection(collection);
    delete data._id;
    const result = await collectionName.updateOne(
      { _id: objectId },
      { $set: data },
      { upsert: true }
    );
    await client.close();
    return result;
  } catch (error) {
    console.log(
      "Error mongodb.js|removeRecodeById|collection:" +
        collection +
        "|catch:" +
        error.message
    );
    await client.close();
    return { error };
  }
}
//need testing
export async function GetAllFunctionsNameByUserGroupIds(userGroupIds) {
  try {
    let objectIdArray = [];
    userGroupIds.forEach((element) => {
      const objectId = new ObjectId(element);
      objectIdArray.push({ _id: objectId });
    });

    await client.connect();
    const database = client.db("socialMediaClone");
    const collectionName = database.collection("UserGroups");
    let functionNames = [];
    const resultUserGroups = await collectionName
      .find({ $or: objectIdArray })
      .toArray();
    resultUserGroups.forEach((element) => {
      element.Functions.forEach((func) => {
        functionNames.push(func);
      });
    });
    return functionNames;
  } catch (error) {
    console.log(
      "Error mongodb.js|GetAllFunctionsNameByUserGroupIds|catch:" +
        error.message
    );
    await client.close();
    return { error };
  }
}

export async function getAllByCollection(collection) {
  try {
    await client.connect();
    const database = client.db("socialMediaClone");
    const collectionName = database.collection(collection);
    const result = await collectionName.find().toArray();
    return result;
  } catch (error) {
    console.log(
      "catch from mongodb.js|getAllByCollection|catch  -" + error.message
    );
    await client.close();
    return { error };
  }
}

export async function getWallpapersThumb(
  viewedWallpaperIds,
  pageNumber,
  dataPerPage
) {
  try {
    const skipDataCount = (pageNumber - 1) * dataPerPage;
    const pipeline = [
      // Filter out already viewed wallpapers
      //{ $match: { _id: { $nin: viewedWallpaperIds } } },
      // Sort by whether they have been viewed or not
      //{ $addFields: { viewed: { $in: ["$_id", viewedWallpaperIds] } } },
      //{ $sort: { viewed: 1 } },
      // Projection to select specific fields
      {
        $project: {
          _id: 1,
          file_name: 1,
          thumbnail: 1,
          downloads: 1,
        },
      },
      // Add a new field file_data with the same values as thumbnail
      {
        $addFields: {
          file_data: "$thumbnail", // Create a new field file_data and assign the value of thumbnail to it
          downloaded: false,
        },
      },
      // Pagination
      { $skip: skipDataCount },
      { $limit: dataPerPage },
    ];
    let result = { wallpapers: [], moreWallpapersAvailable: true };
    await client.connect();
    const database = client.db("socialMediaClone");
    const collectionName = database.collection("wallpapers");
    const totalRecords = await collectionName.countDocuments();

    skipDataCount >= totalRecords + dataPerPage
      ? (result.moreWallpapersAvailable = false)
      : (result.moreWallpapersAvailable = true);

    if (result.moreWallpapersAvailable) {
      result.wallpapers = await collectionName.aggregate(pipeline).toArray();
    }
    return result;
  } catch (error) {
    console.log("catch from mongodb.js|getWallpapers|catch  -" + error.message);
    await client.close();
    return { error };
  }
}
export async function getFieldById(collection, field_name, id) {
  try {
    const objectId = new ObjectId(id);
    await client.connect();
    const database = client.db("socialMediaClone");
    const collectionName = database.collection(collection);
    const result = await collectionName.findOne(
      { _id: objectId },
      {
        projection: { [field_name]: 1 },
      }
    );
    return result;
  } catch (error) {
    console.log("catch from mongodb.js|getFieldById|catch  -" + error.message);
    await client.close();
    return { error };
  }
}
