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
    loadData(1);
  }, []);
  async function loadData(pageNumber) {
    try {
      setUsersLoading(true);
      const action = "getData";

      const res = await fetch("/api/administrative/assignUserGroups", {
        method: "POST",
        body: JSON.stringify({ action, dataPerPage: itemsPerPage, pageNumber }),
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
      console.log("error|assignUserGroups.js|loadData|catch:" + err.message);
    }
  }
  async function handleClickPage(page) {
    setUsersLoading(true);
    setCurrentPage(page);
    loadData(page);
    setUsersLoading(false);
  }

  const [selectedUser, setSelectedUser] = useState("");
  const handleUserName = (value) => {
    setSelectedUser(value);
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
        onClick={() => onUserNameClick(obj)}
      >
        {obj.User}
        {/* may be userName */}
      </button>
    ));
  };
  const [userId, setUserId] = useState("");
  // this have to contain boolean value with the groupName
  const [userGroups, setUserGroups] = useState([
    { userGroup: "ADMIN_GROUP", assigned: true },
    { userGroup: "READERS", assigned: true },
  ]);
  const onUserNameClick = (obj) => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    setUserGroupsLoading(true);
    debugger;
    setSelectedUser(obj.User);
    setUserId(obj._id);
    //obj.UserGroups from users table
    //userGroups from userGroups table
    let userGroupsTemp = [...userGroups];
    userGroupsTemp.forEach((element) => {
      if (obj.UserGroups.includes(element.userGroup)) {
        element.assigned = true;
      } else element.assigned = false;
    });
    setUserGroups(userGroupsTemp);
    setUserGroupsLoading(false);
  };

  //// still modification needed | not Done
  async function handleSaveButton() {
    try {
      setUserGroupsLoading(true);
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

  return <div></div>;
}
