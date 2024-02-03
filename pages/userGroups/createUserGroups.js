import React, { useState, useEffect, useRef } from "react";
import HashLoaderC from "../../components/loaders/HashLoaderC";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateUserGroups() {
  useEffect(() => {
    loadData(1);
  }, []);

  const scrollRef = useRef(null);
  async function loadData(pageNumber) {
    try {
      setUGLoading(true);
      const action = "getData";

      const res = await fetch("/api/administrative/userGroups", {
        method: "POST",
        body: JSON.stringify({ action, dataPerPage: itemsPerPage, pageNumber }),
      });
      const responseData = await res.json();
      debugger;
      if (responseData.recodeCount !== totalUGCount) {
        setTotalUGCount(responseData.recodeCount);
      }
      setUserList(responseData.result);
      setUGLoading(false);
    } catch (err) {
      setUGLoading(false);
      console.log("error|createUserGroups.js|catch:" + err.message);
    }
  }
  const commonButton =
    "m-1 px-2 py-1 bg-lime-500 rounded hover:bg-lime-600  text-white ";
  const commonInput = "m-1 w-full px-3 py-2 border rounded-md ";
  const [uGLoading, setUGLoading] = useState(false);
  const [functionsLoading, setFunctionsLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  // ([
  //   {
  //     groupName: "ADMIN_GROUP",
  //     functions: ["manageUG", "createPosts", "createProjects"],
  //   },
  //   { groupName: "EDITORS_GROUP", functions: ["createPosts"] },
  //   { groupName: "READERS", functions: [] },
  // ]);
  const [currentUGName, setCurrentUGName] = useState("");
  const handleUserGroupName = (value) => {
    setCurrentUGName(value);
  };
  const handleUGNewPressed = () => {
    setCurrentUGNameEnable("True");
    setManageUG(false);
    setCreatePosts(false);
    setCreateProjects(false);
    setCurrentUGName("");
    setUserGroupId("");
  };
  const [searchUser, setSearchUser] = useState("");
  const handleSearchUserText = (value) => {
    setSearchUser(value);
  };
  const handleSearchUser = () => {};

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUGCount, setTotalUGCount] = useState(0);
  async function handleClickPage(page) {
    setUGLoading(true);
    setCurrentPage(page);
    loadData(page);
    setUGLoading(false);
  }

  const displayUserList = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedUsers = userList.slice(startIndex, endIndex);

    return displayedUsers.map((obj, index) => (
      <button
        className={
          "m-1 px-2 py-1 bg-slate-500 rounded hover:bg-slate-600  text-white  w-full"
        }
        key={index}
        onClick={() => onGroupNameClick(obj)}
      >
        {obj.UserGroupName}
      </button>
    ));
  };

  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(totalUGCount / itemsPerPage);
    console.log("totalUGCount " + totalUGCount);
    const maxVisiblePages = 7; // Set the maximum number of visible pages

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const buttons = [];

    // Always include the button for Page 1
    {
      startPage === 1
        ? ""
        : buttons.push(
            <button
              key={1}
              onClick={() => handleClickPage(1)}
              className={
                "m-1 px-2 py-1 bg-blue-800 rounded hover:bg-blue-900  text-white"
              }
            >
              First
            </button>
          );
    }

    // Include other visible pages
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handleClickPage(i)}
          className={
            "m-1 px-2 py-1 bg-blue-500 rounded hover:bg-blue-600  text-white"
          }
        >
          {i}
        </button>
      );
    }

    // Always include the button for last Page
    {
      endPage === totalPages
        ? ""
        : buttons.push(
            <button
              key={totalPages}
              onClick={() => handleClickPage(totalPages)}
              className={
                "m-1 px-2 py-1 bg-blue-800 rounded hover:bg-blue-900  text-white"
              }
            >
              {totalPages}
            </button>
          );
    }

    return buttons;
  };

  ///
  const [manageUG, setManageUG] = useState(false);
  const [createPosts, setCreatePosts] = useState(false);
  const [createProjects, setCreateProjects] = useState(false);

  const handleChangeManageUG = () => {
    setManageUG(!manageUG);
  };
  const handleChangeCreatePosts = () => {
    setCreatePosts(!createPosts);
  };
  const handleChangeCreateProjects = () => {
    setCreateProjects(!createProjects);
  };
  const [userGroupId, setUserGroupId] = useState("");
  const [currentUGNameEnable, setCurrentUGNameEnable] = useState("True");
  const onGroupNameClick = (obj) => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    setFunctionsLoading(true);
    setCurrentUGNameEnable("False");
    debugger;
    setCurrentUGName(obj.UserGroupName);
    setUserGroupId(obj._id);
    obj.Functions.includes("manageUG") ? setManageUG(true) : setManageUG(false);
    obj.Functions.includes("createPosts")
      ? setCreatePosts(true)
      : setCreatePosts(false);
    obj.Functions.includes("createProjects")
      ? setCreateProjects(true)
      : setCreateProjects(false);
    setFunctionsLoading(false);
  };
  async function handleSaveButton() {
    try {
      setFunctionsLoading(true);
      let functions = [];
      let action = "";
      let userGroupData = {};
      if (manageUG) functions.push("manageUG");
      if (createPosts) functions.push("createPosts");
      if (createProjects) functions.push("createProjects");
      if (userGroupId !== "") {
        action = "update";
        userGroupData = {
          _id: userGroupId,
          UserGroupName: currentUGName,
          Functions: functions,
        };
      } else {
        action = "create";
        userGroupData = {
          UserGroupName: currentUGName,
          Functions: functions,
        };
      }
      //debugger;
      const res = await fetch("/api/administrative/userGroups", {
        method: "POST",
        body: JSON.stringify({ action, userGroupData }),
      });
      const responseData = await res.json();
      console.log("createUserGroups.js|handleSaveButton|" + responseData);
      loadData(currentPage);
      setFunctionsLoading(false);
      toast.success("User Group " + action + " Successful ...", {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 5000,
      });
    } catch (err) {
      setFunctionsLoading(false);
      console.log(
        "error|createUserGroups.js|handleSaveButton|catch:" + err.message
      );
    }
  }
  async function handleDeleteButton() {
    try {
      setFunctionsLoading(true);
      const action = "delete";

      const res = await fetch("/api/administrative/userGroups", {
        method: "POST",
        body: JSON.stringify({ action, userGroupId }),
      });
      //debugger;
      const responseData = await res.json();
      console.log("createUserGroups.js|handleDeleteButton|" + responseData);
      loadData(currentPage);
      handleUGNewPressed();
      setFunctionsLoading(false);
      toast.success("User Group " + action + " Successful ...", {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 5000,
      });
    } catch (err) {
      setFunctionsLoading(false);
      console.log(
        "error|createUserGroups.js|handleDeleteButton|catch:" + err.message
      );
    }
  }

  return (
    <div className="flex flex-wrap m-1">
      <div className="lg:w-1/2 sm:w-1/2 sm:m-0 xxxs:w-full xxxs:m-10">
        {uGLoading && (
          <div className="absolute">
            <div className="h-full w-full lg:w-1/2 sm:w-1/2 mt-28 ml-60">
              {uGLoading ? <HashLoaderC /> : null}
            </div>
          </div>
        )}
        <div className={`${uGLoading ? "opacity-10" : ""}`}>
          <div className="w-full flex">
            <input
              className={"placeholder:italic " + commonInput}
              type="text"
              placeholder="Type User Name here ..."
              onChange={(e) => {
                handleSearchUserText(e.target.value);
              }}
            />
            <button className={commonButton} onClick={handleSearchUser}>
              Search
            </button>
          </div>
          <div className="w-full">
            <div>
              <h2 className="flex justify-center">User Groups</h2>
              <div className="ml-10 mr-10">{displayUserList()}</div>
            </div>
            <div className="flex justify-center">
              {/* Pagination controls */}
              {renderPaginationButtons()}
            </div>
          </div>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="lg:w-1/2 sm:w-1/2 sm:m-0 xxxs:w-full xxxs:m-5"
      >
        {functionsLoading && (
          <div className="absolute w-1/2 sm:h-1/2 xxxs:w-full xxxs:h-full ">
            <div className="h-full w-full lg:w-1/2 sm:w-1/2 mt-28 ml-24">
              {functionsLoading ? <HashLoaderC /> : null}
            </div>
          </div>
        )}
        <div className={`${functionsLoading ? "opacity-10" : ""}`}>
          <div className="w-full flex">
            <input
              className={commonInput}
              placeholder="User Group Name ..."
              value={currentUGName}
              // readOnly={currentUGNameEnable}
              onChange={(e) => {
                handleUserGroupName(e.target.value);
              }}
            />
            <button className={commonButton} onClick={handleUGNewPressed}>
              New
            </button>
          </div>
          <div className="w-full pl-20 ">
            <div className="w-full flex mt-10">
              <input
                className="mr-4"
                type="checkbox"
                checked={manageUG}
                onChange={handleChangeManageUG}
                id="manageUG"
                name="manageUG"
                value="manageUG"
              />
              <label for="manageUG"> Manage User Groups</label>
            </div>
            <div className="w-full flex ">
              <input
                className="mr-4"
                type="checkbox"
                checked={createPosts}
                onChange={handleChangeCreatePosts}
                id="createPosts"
                name="createPosts"
                value="createPosts"
              />
              <label for="createPosts"> Create Posts</label>
            </div>
            <div className="w-full flex ">
              <input
                className="mr-4"
                type="checkbox"
                checked={createProjects}
                onChange={handleChangeCreateProjects}
                id="createProjects"
                name="createProjects"
                value="createProjects"
              />
              <label for="createProjects"> Create Projects</label>
            </div>
          </div>
          <div className="w-full flex mt-10 ml-10">
            <button className={commonButton} onClick={handleSaveButton}>
              Save
            </button>
            <button
              className="m-1 px-2 py-1 bg-red-700 rounded hover:bg-red-800  text-white "
              onClick={handleDeleteButton}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
