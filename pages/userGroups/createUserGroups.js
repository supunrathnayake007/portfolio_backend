import React, { useState, useEffect } from "react";

export default function CreateUserGroups() {
  const commonButton =
    "m-1 px-2 py-1 bg-lime-500 rounded hover:bg-lime-600  text-white ";
  const commonInput = "m-1 w-full px-3 py-2 border rounded-md ";
  const [userList, setUserList] = useState([
    {
      groupName: "ADMIN_GROUP",
      functions: ["manageUG", "createPosts", "createProjects"],
    },
    { groupName: "EDITORS_GROUP", functions: ["createPosts"] },
    { groupName: "READERS", functions: [] },
  ]);
  const [currentUGName, setCurrentUGName] = useState("");
  const handleUserGroupName = (value) => {
    setCurrentUGName(value);
  };
  const handleUGNewPressed = () => {
    setManageUG(false);
    setCreatePosts(false);
    setCreateProjects(false);
    setCurrentUGName("");
  };
  const [searchUser, setSearchUser] = useState("");
  const handleSearchUserText = (value) => {
    setSearchUser(value);
  };
  const handleSearchUser = () => {};

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handleClickPage = (page) => {
    setCurrentPage(page);
  };

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
        {obj.groupName}
      </button>
    ));
  };

  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(userList.length / itemsPerPage);
    console.log("userList.length " + userList.length);
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
  const onGroupNameClick = (obj) => {
    setCurrentUGName(obj.groupName);
    obj.functions.includes("manageUG") ? setManageUG(true) : setManageUG(false);
    obj.functions.includes("createPosts")
      ? setCreatePosts(true)
      : setCreatePosts(false);
    obj.functions.includes("createProjects")
      ? setCreateProjects(true)
      : setCreateProjects(false);
  };
  const handleSaveButton = () => {};
  const handleDeleteButton = () => {};

  return (
    <div className="flex flex-wrap m-1">
      <div className=" lg:w-1/2 sm:w-1/2 sm:m-0 xxxs:w-full xxxs:m-10">
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
      <div className=" lg:w-1/2 sm:w-1/2 sm:m-0 xxxs:w-full xxxs:m-5">
        <div className="w-full flex">
          <input
            className={commonInput}
            placeholder="User Group Name ..."
            value={currentUGName}
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
          <button className={commonButton} onClick={handleSaveButton()}>
            Save
          </button>
          <button
            className="m-1 px-2 py-1 bg-red-700 rounded hover:bg-red-800  text-white "
            onClick={handleDeleteButton()}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
