import {
  UpdateRecodeById,
  getDataPageVice,
  getDataCount,
} from "../../../lib/mongodb";
export default async function (req, res) {
  const body = JSON.parse(req.body);
  if (!req.body) {
    req.statusCode = 404;
    res.end("Error");
    return;
  }
  console.log("api triggered|AssignUserGroups.js");
  try {
    //we need update users table with new column users table with userGroups id
    //there is no new create, delete  just update only
    //but we can users data here
    //action value will be update,getData
    const { action } = body;
    let result = {};
    if (action === "update") {
      const { users } = body;
      result = await UpdateRecodeById("users", users._id, users);
    }
    if (action === "getData") {
      const { dataPerPage, pageNumber } = body;
      result = await getDataPageVice("users", dataPerPage, pageNumber);
    }
    const recodeCount = await getDataCount("users");
    return res.status(200).json({ result: result, recodeCount: recodeCount });
  } catch (error) {
    res.end(error.message);
  }
}
