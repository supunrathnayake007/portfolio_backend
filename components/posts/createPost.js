import { useState, useEffect } from "react";
import React, { useRef } from "react";
import HashLoader from "react-spinners/HashLoader";
const createPost = (props) => {
  const commonButton =
    "m-1 px-2 py-1 bg-lime-500 rounded hover:bg-lime-600  text-white ";
  const commonInput = "m-1 w-full px-3 py-2 border rounded-md ";
  const inputFile = useRef(null);
  const [postImg, setPostImg] = useState(null);
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPostImg(file);
  };
  const handleSelectFileReset = () => {
    debugger;
    if (inputFile.current) {
      inputFile.current.value = "";
      inputFile.current.type = "text";
      inputFile.current.type = "file";
    }
  };
  async function handlePostPressed() {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("image", postImg);
      formData.append("desc", postText);
      formData.append("user", username);

      const res = await fetch("/api/posts/createPost", {
        method: "POST",
        body: formData,
      });
      const responseData = await res.json();
      console.log(responseData);
      if (responseData.result.acknowledged) {
        setPostText("");
        setTitle("");
        handleSelectFileReset();
        setPostImg(null);
      }
    } catch (err) {
      console.log("createPost handlePostPressed error:" + err.message);
    }
    setLoading(false);
  }
  const updateTitle = (title) => {
    setTitle(title);
  };
  const updatePostText = (postText) => {
    setPostText(postText);
  };

  async function validateUser() {
    try {
      const jsonWebToken = localStorage.getItem("smc_jwtToken");
      if (jsonWebToken) {
        const verifyRes = await fetch("/api/verifyJwt", {
          method: "POST",
          body: JSON.stringify({ jsonWebToken }),
        });
        const verifyResponseData = await verifyRes.json();
        const decodedToken = verifyResponseData.decodedToken;

        if (decodedToken.valid) {
          if (decodedToken.payload.authorized) {
            setUsername(decodedToken.payload.username);
          }
        }
      }
    } catch (error) {
      console.log("create post page validateUser - " + error.message);
    }
  }
  validateUser();

  return (
    <div className="relative">
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-700 bg-opacity-75 ml-1">
          <div className="flex justify-center items-center m-10 p-10 w-1/2">
            <HashLoader color="#36d7b7" />
          </div>
        </div>
      )}

      <div className={`${loading ? "opacity-40" : ""}`}>
        <input
          type="file"
          accept="image/*"
          ref={inputFile}
          onChange={handleImageChange}
        />
        <div>
          {postImg && (
            <img
              src={URL.createObjectURL(postImg)}
              alt="Selected"
              style={{ maxWidth: "300px" }}
            />
          )}
        </div>
        <div>
          <input
            className={commonInput + " placeholder:italic"}
            type="text"
            placeholder="Title here ..."
            value={title}
            onChange={(e) => {
              updateTitle(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <textarea
            className={commonInput + " placeholder:italic"}
            rows="5"
            value={postText}
            placeholder="Write your post here ..."
            onChange={(e) => {
              updatePostText(e.target.value);
            }}
          ></textarea>
        </div>
        <div>
          <button className={commonButton} onClick={handlePostPressed}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};
export default createPost;
