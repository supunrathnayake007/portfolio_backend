import React, { useState, useEffect, useRef } from "react";
import HashLoaderC from "../../components/loaders/HashLoaderC";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function assignUserGroups() {
  const [userList, setUserList] = useState([]);
  const [totalUsers, setTotalCount] = useState(0);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [usersLoading, setUsersLoading] = useState(false);
  const [userGroupsLoading, setUserGroupsLoading] = useState(false);
  const scrollRef = useRef(null);
  const commonButton =
    "m-1 px-2 py-1 bg-lime-500 rounded hover:bg-lime-600  text-white ";
  const commonInput = "m-1 w-full px-3 py-2 border rounded-md ";
  useEffect(() => {
    loadUserData(1);
    loadUserGroupData();
  }, []);
  async function loadUserData(pageNumber) {
    try {
      setUsersLoading(true);
      const action = "getData";
      const jsonWebToken = localStorage.getItem("smc_jwtToken");
      const res = await fetch("/api/administrative/users", {
        method: "POST",
        body: JSON.stringify({
          action,
          jsonWebToken,
          dataPerPage: itemsPerPage,
          pageNumber,
        }),
      });
      const responseData = await res.json();
      debugger;
      if (responseData.recodeCount !== totalUsers) {
        setTotalCount(responseData.recodeCount);
      }
      setUserList(responseData.result);
      setUsersLoading(false);
    } catch (err) {
      setUsersLoading(false);
      console.log(
        "error|assignUserGroups.js|loadUserData|catch:" + err.message
      );
    }
  }
  async function loadUserGroupData() {
    try {
      setUserGroupsLoading(true);
      const action = "getAllData";
      const jsonWebToken = localStorage.getItem("smc_jwtToken");
      const res = await fetch("/api/administrative/userGroups", {
        method: "POST",
        body: JSON.stringify({ action, jsonWebToken }),
      });
      const responseData = await res.json();
      const result = responseData.result;
      const temUserGroups = [];
      //{ userGroup: "ADMIN_GROUP", assigned: true }
      result.forEach((element) => {
        temUserGroups.push({
          id: element._id,
          userGroup: element.UserGroupName,
          assigned: false,
        });
      });
      setUserGroups(temUserGroups);
      setUserGroupsLoading(false);
    } catch (err) {
      setUserGroupsLoading(false);
      console.log(
        "error|assignUserGroups.js|loadUserGroupData|catch:" + err.message
      );
    }
  }
  async function handleClickPage(page) {
    setUsersLoading(true);
    setCurrentPage(page);
    loadUserData(page);
    setUsersLoading(false);
  }

  const [selectedUser, setSelectedUser] = useState("");
  const handleUserName = (value) => {
    setSelectedUser(value);
  };
  const handleSearchUserText = (value) => {};
  const displayUserList = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedUsers = userList.slice(startIndex, endIndex);
    //debugger;
    return displayedUsers.map((obj, index) => (
      <button
        className={
          "m-1 px-2 py-1 bg-slate-500 rounded hover:bg-slate-600  text-white  w-full"
        }
        key={index}
        onClick={() => onUserNameClick(obj)}
      >
        {obj.username}
        {/* may be userName */}
      </button>
    ));
  };
  const displayUserGroupsList = () => {
    const handleUserGroupCheck = (obj) => {
      const updatedUserGroups = userGroups.map((group) => {
        if (group.userGroup === obj.userGroup) {
          return { ...group, assigned: !group.assigned };
        }
        return group;
      });
      setUserGroups(updatedUserGroups);
    };
    return userGroups.map((obj, index) => (
      <div className="w-full flex mt-10">
        <input
          className="mr-4"
          type="checkbox"
          checked={obj.assigned}
          onChange={() => handleUserGroupCheck(obj)}
          id={obj.userGroup}
          name={obj.userGroup}
          value={obj.userGroup}
        />
        <label for={obj.userGroup}> {obj.userGroup}</label>
      </div>
    ));
  };
  const [userId, setUserId] = useState("");
  // this have to contain boolean value with the groupName
  const [userGroups, setUserGroups] = useState([]);
  //   { userGroup: "ADMIN_GROUP", assigned: true },
  //   { userGroup: "READERS", assigned: true },
  // ]);
  // const handleUserGroupCheck = (obj) => {
  //   debugger;
  //   let tempUserGroups = [...userGroups];
  //   tempUserGroups.forEach((element) => {
  //     if (element.userGroup === obj.userGroup) {
  //       element.assigned = !element.assigned;
  //     }
  //   });
  // };
  const onUserNameClick = (obj) => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    setUserGroupsLoading(true);
    debugger;
    setSelectedUser(obj.username);
    setUserId(obj._id);
    //obj.UserGroups from users table
    //userGroups from userGroups table
    let userGroupsTemp = [...userGroups];
    userGroupsTemp.forEach((element) => {
      if (Array.isArray(obj.userGroupId)) {
        if (obj.userGroupId.includes(element.id)) {
          element.assigned = true;
        } else element.assigned = false;
      } else {
        element.assigned = false;
      }
    });
    setUserGroups(userGroupsTemp);
    setUserGroupsLoading(false);
  };

  //// still modification needed | not Done
  async function handleSaveButton() {
    try {
      setUserGroupsLoading(true);
      debugger;
      //let functions = [];
      let action = "";
      let userData = {};
      let userGroupIds = [];
      //   { userGroup: "ADMIN_GROUP", assigned: true },
      userGroups.forEach((element) => {
        if (element.assigned) {
          userGroupIds.push(element.id);
        }
      });
      action = "assignUserGroups";
      userData = {
        _id: userId,
        userGroupId: userGroupIds,
      };
      const jsonWebToken = localStorage.getItem("smc_jwtToken");
      if (!jsonWebToken) {
        return;
      }
      //debugger;
      const res = await fetch("/api/administrative/users", {
        method: "POST",
        body: JSON.stringify({ action, userData, jsonWebToken }),
      });
      const responseData = await res.json();
      debugger;
      console.log("createUserGroups.js|handleSaveButton|" + responseData);
      loadUserData(currentPage);
      setUserGroupsLoading(false);
      toast.success("User Group assign Successful ...", {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 5000,
      });
    } catch (err) {
      setUserGroupsLoading(false);
      toast.error("Error |" + err.message, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 5000,
      });
      console.log(
        "error|createUserGroups.js|handleSaveButton|catch:" + err.message
      );
    }
  }
  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(totalUsers / itemsPerPage);
    console.log("totalUGCount " + totalUsers);
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

  return (
    <div className="flex flex-wrap m-1">
      <div className="lg:w-1/2 sm:w-1/2 sm:m-0 xxxs:w-full xxxs:m-10">
        {usersLoading && (
          <div className="absolute">
            <div className="h-full w-full lg:w-1/2 sm:w-1/2 mt-28 ml-60">
              {usersLoading ? <HashLoaderC /> : null}
            </div>
          </div>
        )}
        <div className={`${usersLoading ? "opacity-10" : ""}`}>
          <div className="w-full flex">
            <input
              className={"placeholder:italic " + commonInput}
              type="text"
              placeholder="Type User Name here ..."
              onChange={(e) => {
                handleSearchUserText(e.target.value);
              }}
            />
            <button className={commonButton}>Search</button>
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
        {userGroupsLoading && (
          <div className="absolute w-1/2 sm:h-1/2 xxxs:w-full xxxs:h-full ">
            <div className="h-full w-full lg:w-1/2 sm:w-1/2 mt-28 ml-24">
              {userGroupsLoading ? <HashLoaderC /> : null}
            </div>
          </div>
        )}
        <div className={`${userGroupsLoading ? "opacity-10" : ""}`}>
          <div className="w-full">{displayUserGroupsList()}</div>
          <div className="w-full flex mt-10 ml-10">
            <button className={commonButton} onClick={handleSaveButton}>
              Save
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
