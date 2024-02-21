import { useState, useEffect } from "react";
import axios from "axios";

export default function viewPost(props) {
  const [post, setPost] = useState({});

  useEffect(() => {
    setPost(props.post);
  }, []);

  return (
    <div className="flex flex-col bg-white opacity-60 m-0.5">
      <div className="text-4xl my-6 mx-10 font-bold">{post.title}</div>
      <div className="sm:flex m-4 ">
        <img
          className="object-contain h-80 m-2 justify-start xxxs:justify-center xxxs:w-full"
          src={"data:image/png;base64," + post.image}
          alt="Post image"
          onError={(e) => {
            e.target.src = "/error_cloud_icon.svg"; // Replace with a fallback image URL
          }}
        />
        <div className="">{post.desc}</div>
      </div>
    </div>
  );
}
