import React, { useEffect, useState, useRef } from "react";

export default function WallpaperThumbGrid() {
  const [wallpapers, setWallpapers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef(null);

  useEffect(() => {
    loadWallpapers(pageNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

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

  async function loadWallpapers(pageNumber) {
    try {
      const dataPerPage = 5;
      setIsLoading(true);
      const res = await fetch("/api/wallpaperApp/loadWallpapers", {
        method: "POST",
        body: JSON.stringify({ viewedIds: [], dataPerPage, pageNumber }),
      });
      const responseData = await res.json();
      setWallpapers((prevWallpapers) => [...prevWallpapers, ...responseData]);
      setIsLoading(false);
      setPageNumber(pageNumber + 1);
    } catch (error) {
      console.log("wallpaperThumbGrid|error:" + error.message);
      setIsLoading(false);
    }
  }

  function handleObserver(entries) {
    const target = entries[0];
    if (target.isIntersecting && !isLoading) {
      loadWallpapers(pageNumber);
    }
  }

  const openFullScreen = (index) => {
    setCurrentImageIndex(index);
  };

  const closeFullScreen = () => {
    setCurrentImageIndex(null);
  };

  const downloadImage = (imageData) => {
    const link = document.createElement("a");
    link.href = "data:image/png;base64," + imageData;
    link.download = "wallpaper.png";
    link.click();
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
      {/* Full screen image view */}
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
