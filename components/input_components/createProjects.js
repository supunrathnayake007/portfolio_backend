import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// tailwind classNames
const commonButton =
  "m-1 px-2 py-1 bg-lime-500 rounded hover:bg-lime-600  text-white ";
const commonInput = "m-1 w-full px-3 py-2 border rounded-md ";
///

function CreateProjects() {
  const [pageMsg, setPageMsg] = useState("<page message>!");
  const [selectedImage, setSelectedImage] = useState(null);
  const [allTechs, setAllTechs] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");
  const [selectedTechs, setSelectedTechs] = useState([]);
  useEffect(() => {
    //console.log("selectedTechs: " + selectedTechs);
  }, [selectedTechs]);
  const updateTitle = (title) => {
    setTitle(title);
  };
  const updateURL = (url) => {
    setUrl(url);
  };
  const updateDesc = (desc) => {
    setDesc(desc);
  };
  const handleCheckboxChange = (event) => {
    const { checked, value } = event.target;
    if (checked) {
      setSelectedTechs((prevSelectedTechs) => [...prevSelectedTechs, value]);
    } else {
      setSelectedTechs((prevSelectedTechs) =>
        prevSelectedTechs.filter((tech) => tech !== value)
      );
    }
  };
  async function handleInsert() {
    try {
      debugger;
      if (selectedImage === null) {
        setPageMsg("No image selected");
        return;
      }
      if (title === "" && url === "" && desc === "") {
        setPageMsg("Fill necessary fields...");
        return;
      }
      if (selectedTechs.length === 0) {
        setPageMsg("Select least one technology ...");
        return;
      }

      setPageMsg("inserting ...");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("image", selectedImage);
      formData.append("url", url);
      formData.append("desc", desc);
      formData.append("selectedTechs", selectedTechs);

      const res = await fetch("/api/forPortfolioSite/createProject", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        setPageMsg(res.statusText);
        return;
      }
      const responseData = await res.json();
      setPageMsg("successful ...");
      debugger;
      console.log(responseData);
    } catch (err) {
      setPageMsg("handleInsert error:" + err.message);
      console.log("handleInsert error:" + err.message);
    }
  }
  const acceptedImageTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/svg+xml",
  ];
  async function loadAllTechs() {
    console.log(" ----- loadAllTechs ----");
    const res = await fetch("/api/forPortfolioSite/techs/getAllTechs");
    const responseData = await res.json();
    //debugger;
    setAllTechs(responseData.result);
  }
  loadAllTechs();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  return (
    <div className="flex justify-center">
      <div>
        <input
          className={commonButton}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <div className="m-1">
          {selectedImage && (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              style={{ maxWidth: "300px" }}
            />
          )}
        </div>
        <input
          className={commonInput}
          placeholder="Title ..."
          type="text"
          onChange={(e) => {
            updateTitle(e.target.value);
          }}
        />
        <textarea
          placeholder="Description ..."
          className={commonInput}
          name="Text1"
          cols="40"
          rows="5"
          onChange={(e) => {
            updateDesc(e.target.value);
          }}
        ></textarea>
        <input
          className={commonInput}
          placeholder="URL ..."
          type="text"
          onChange={(e) => {
            updateURL(e.target.value);
          }}
        />
        <div className="flex m-1">
          {allTechs
            ? allTechs.map((tech, index) => (
                <div className="m-1 text-white">
                  <input
                    type="checkbox"
                    id={"tech" + index}
                    name={"tech" + index}
                    value={tech.title}
                    onChange={handleCheckboxChange}
                  />
                  <label className="mx-1" for={"tech" + index}>
                    {tech.title}
                  </label>
                </div>
              ))
            : "gg"}
        </div>
        <button className={commonButton} onClick={handleInsert}>
          Insert
        </button>
        <div className="text-white">{pageMsg}</div>
      </div>
    </div>
  );
}
export default CreateProjects;
