import React from "react";
import { useEffect, useState, useRef } from "react";
import ViewPost from "./viewPost";
import axios from "axios";
import HashLoaderC from "../loaders/HashLoaderC";

export default function viewPosts() {
  const dataPerPage = 2;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [noMorePosts, setNoMorePosts] = useState(false);
  const loaderRef = useRef(null);

  useEffect(() => {
    //loadPosts(1);
  }, []);

  const loadPosts = async (pageNumber) => {
    try {
      debugger;
      const res = await axios.post("/api/posts/viewPosts", {
        action: "loadPosts",
        dataPerPage,
        pageNumber,
        loadedDataCount: posts.length,
      });
      const responseData = res.data;
      setNoMorePosts(responseData.noMorePosts);
      setPosts((prevPosts) => [...prevPosts, ...responseData.posts]);
      //setPageNumber((prevPageNumber) => prevPageNumber + 1);
    } catch (error) {
      console.log("viewPost.js|loadSampleData|error:" + error.message);
    }
  };

  useEffect(() => {
    console.log("loaderRef.current:" + loaderRef.current);
    //debugger;
    const observer = new IntersectionObserver(
      async (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !loading && !noMorePosts) {
            setLoading(true);
            await loadPosts(pageNumber);
            setPageNumber((prevPageNumber) => prevPageNumber + 1);
            setLoading(false);
          }
        }
      },
      {
        root: null, // Use the viewport as the root
        threshold: 0, // Trigger the observer as soon as any part of the target is visible
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loading, noMorePosts]);

  return (
    <div>
      {posts.map((post, index) => (
        <div key={index}>
          <ViewPost post={post} />
        </div>
      ))}
      <div ref={loaderRef}>
        {loading && (
          <div className=" w-full bg-slate-500 p-0.5  rounded-lg m-0.5">
            <div className="flex justify-center">
              <HashLoaderC />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
