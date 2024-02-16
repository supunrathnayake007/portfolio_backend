import { saveAs } from "file-saver";
import axios from "axios";
import useErrorLogger from "../../hooks/useErrorLogger";
import React, { useEffect, useState, useRef } from "react";

function useInfiniteScroll(callback) {
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1,
    });
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, []);

  function handleObserver(entries) {
    const target = entries[0];
    if (target.isIntersecting && !isLoading) {
      requestAnimationFrame(() => {
        setIsLoading(true);
        callback();
      });
    }
  }

  return [loaderRef];
}

export default function WallpaperThumbGrid() {
  const [wallpapers, setWallpapers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [loaderRef] = useInfiniteScroll(() => {
    loadWallpapers(pageNumber);
  });
  const errorLogger = useErrorLogger();

  async function loadWallpapers(pageNumber) {
    try {
      const dataPerPage = 5;
      setIsLoading(true);
      const res = await axios.post("/api/wallpaperApp/loadWallpapers", {
        viewedIds: [],
        dataPerPage,
        pageNumber,
      });
      const responseData = res.data;
      setWallpapers((prevWallpapers) => [...prevWallpapers, ...responseData]);
      setIsLoading(false);
      setPageNumber(pageNumber + 1);
    } catch (error) {
      errorLogger.logError(error);
      setIsLoading(false);
    }
  }

  const downloadImage = (imageData) => {
    const blob = new Blob([imageData], { type: "image/png" });
    saveAs(blob, "wallpaper.png");
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex !== null ? prevIndex + 1 : null
    );
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex !== null && prevIndex > 0 ? prevIndex - 1 : null
    );
  };

  const openFullScreen = (index) => {
    setCurrentImageIndex(index);
  };

  const closeFullScreen = () => {
    setCurrentImageIndex(null);
  };

  return (
    <div>
      <div className="m-1 p-1 w-full flex flex-wrap justify-center">
        {wallpapers.map((wallpaper, index) => (
          <div key={index} className="relative">
            <img
              className="m-0.5 h-80"
              src={"data:image/png;base64," + wallpaper.file_data}
              alt={wallpaper.file_name}
              onClick={() => openFullScreen(index)}
              onError={(e) => {
                e.target.src = "/error_cloud_icon.svg"; // Replace with a fallback image URL
              }}
            />
          </div>
        ))}
        {isLoading && <div ref={loaderRef}>Loading...</div>}
      </div>
      {currentImageIndex !== null && (
        <div className="fixed top-0 left-0 w-full h-full bg-black flex justify-center items-center">
          <img
            className="max-h-full max-w-full"
            src={
              "data:image/png;base64," + wallpapers[currentImageIndex].file_data
            }
            alt="Full Screen Wallpaper"
          />
          <div className="absolute top-0 left-0 m-4">
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded-md"
              onClick={closeFullScreen}
            >
              Close
            </button>
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded-md"
              onClick={() =>
                downloadImage(wallpapers[currentImageIndex].file_data)
              }
            >
              Download
            </button>
          </div>
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-md absolute right-0 top-1/2 transform -translate-y-1/2"
            onClick={handleNext}
          >
            Next
          </button>
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-md absolute left-0 top-1/2 transform -translate-y-1/2"
            onClick={handlePrevious}
          >
            Previous
          </button>
        </div>
      )}
    </div>
  );
}
