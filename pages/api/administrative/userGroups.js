import {
  commonInsert,
  getDataPageVice,
  getDataCount,
  removeRecodeById,
  UpdateRecodeById,
} from "../../../lib/mongodb";

export default async function (req, res) {
  //in the body, action is always compulsory
  //action can be update, create, delete and getData
  //if action is "create"then API requires "userGroupData"
  //if action is "update" then API requires "id" and "userGroupData"
  //if action is "delete" then API requires "id"
  //if action is "getData" then API requires "dataPerPage" and "pageNumber"
  //make sure  userGroupData contains only the data should be in database

  const body = JSON.parse(req.body);
  if (!req.body) {
    req.statusCode = 404;
    res.end("Error");
    return;
  }
  console.log("api triggered");
  try {
    const { action } = body;

    let result = {};
    if (action === "create") {
      const { userGroupData } = body;
      result = await commonInsert(userGroupData, "UserGroups");
    }
    if (action === "update") {
      const { userGroupData } = body;
      result = await UpdateRecodeById(
        "UserGroups",
        userGroupData._id,
        userGroupData
      );
    }
    if (action === "delete") {
      const { userGroupId } = body;
      result = await removeRecodeById("UserGroups", userGroupId);
    }
    if (action === "getData") {
      const { dataPerPage, pageNumber } = body;
      result = await getDataPageVice("UserGroups", dataPerPage, pageNumber);
    }
    const recodeCount = await getDataCount("UserGroups");
    return res.status(200).json({ result: result, recodeCount: recodeCount });
  } catch (error) {
    res.end(error.message);
  }
}
