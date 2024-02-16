import React, { useEffect, useState } from "react";
import WallpaperUploader from "../../../components/wallpaper_app/wallpaperUploader";
import WallpaperThumbGrid from "../../../components/wallpaper_app/wallpaperThumbGrid";

import { collapseToast } from "react-toastify";

export default function index() {
  const [user, setUser] = useState();
  useEffect(() => {
    if (typeof window !== "undefined") {
      debugger;
      const username = localStorage.getItem("smc_username");
      setUser(username);
    }
  }, []);

  const handleContact = () => {
    window.location.href = "https://supunrathnayake007.github.io/#/contact";
  };

  return (
    <div>
      <div>
        <div className="flex justify-center text-7xl">Welcome</div>
        <div className="flex justify-center text-2xl">
          Free Mobile Wallpapers Web App
        </div>
        <div className="flex justify-center text-lg">
          <button
            className="m-1 px-2 py-1 bg-yellow-500 rounded hover:bg-yellow-600  text-white "
            onClick={handleContact}
          >
            Contact Me here
          </button>
        </div>
        <div className="flex justify-center text-[0.7rem]">
          <div className="text-center">
            Disclaimer: This project is a personal hobby endeavor.
            <br /> I do not own any of the wallpapers featured here, and I
            strongly advise against using them for commercial purposes.
          </div>
        </div>
      </div>
      <div>{user && <WallpaperUploader userName={user} />}</div>
      <div>
        <WallpaperThumbGrid />
      </div>
    </div>
  );
}