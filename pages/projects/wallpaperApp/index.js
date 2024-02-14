import React from "react";
import WallpaperUploader from "../../../components/wallpaper_app/wallpaperUploader";
import WallpaperThumbGrid from "../../../components/wallpaper_app/wallpaperThumbGrid";
import { useGlobalContext } from "../../../context/GlobalContext";
import { collapseToast } from "react-toastify";

export default function index() {
  const { globalVariable, setGlobalVariable } = useGlobalContext();
  if (!globalVariable.username) {
    if (typeof window !== "undefined") {
      const username = localStorage.getItem("smc_username");
      setGlobalVariable({ ...globalVariable, username: username });
    }
  }
  console.log(globalVariable.username);
  return (
    <div>
      <div>
        <WallpaperUploader userName={globalVariable.username} />
      </div>
      <div>
        <WallpaperThumbGrid />
      </div>
    </div>
  );
}
