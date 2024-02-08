import {
  commonInsert,
  getDataPageVice,
  getDataCount,
  removeRecodeById,
  UpdateRecodeById,
  GetAllFunctionsNameByUserGroupIds,
} from "../../../lib/mongodb";
import { verifyJwt } from "../../../lib/jsonWebToken";
export default async function (req, res) {
  try {
    //body always should contains action and jwt
    //if action "assignUserGroups" then body should contains userData
    //if action is "getData" then body should contains dataPerPage, pageNumber
    let userGroupsIds = [];
    let accessibleFunctions = [];
    let result = {};
    const { method } = req;
    const body = JSON.parse(req.body);
    if (!req.body) {
      req.statusCode = 404;
      res.end("Error");
      return;
    }
    const { action, jsonWebToken } = body;
    const decodedToken = verifyJwt(jsonWebToken);
    if (decodedToken.valid) {
      if (decodedToken.payload.authorized) {
        if (method === "POST") {
          userGroupsIds = decodedToken.payload.userGroupId;
          accessibleFunctions = await GetAllFunctionsNameByUserGroupIds(
            userGroupsIds
          );
        }
      } else {
        res.end("Token not authorized..");
      }
    } else {
      res.end("Invalid token..|" + decodedToken.error);
    }

    //
    if (method === "POST") {
      if (action === "assignUserGroups") {
        // this means user can assign and remove assigned userGroups
        if (accessibleFunctions.includes("assignUG")) {
          const { userData } = body;
          result = await UpdateRecodeById("user", userData._id, userData);
        } else {
          throw new Error("User don't have access permission to this function");
        }
        // const { userData } = body;
        // result = await UpdateRecodeById("user", userData._id, userData);
      }
      if (action === "getData") {
        const { dataPerPage, pageNumber } = body;
        result = await getDataPageVice("user", dataPerPage, pageNumber);
      }
      //
    }
    const recodeCount = await getDataCount("user");
    return res.status(200).json({ result: result, recodeCount: recodeCount });
  } catch (error) {
    res.end(error.message);
  }
}
