import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// tailwind classNames
const commonButton =
  "m-1 px-2 py-1 bg-lime-500 rounded hover:bg-lime-600  text-white ";
const commonInput = "m-1 w-full px-3 py-2 border rounded-md ";
///
function CreateTechs() {
  const [logo, setLogo] = useState(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("Welcome");
  const [allTechs, setAllTechs] = useState([]);
  const [imgSrc, setImgSrc] = useState([]);
  const updateTitle = (title) => {
    setTitle(title);
  };

  useEffect(() => {
    console.log("---- loadAllTechs calling -----");
    loadAllTechs();
  }, [message]);
  async function createOnclick() {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("image", logo);
      if (title !== "" && logo) {
        setMessage("Inserting ...");
        const res = await fetch("/api/forPortfolioSite/techs/createTech", {
          method: "POST",
          body: formData,
        });
        const responseData = await res.json();
        if (!responseData.result.acknowledged) {
          const match = responseData.result.match(/title: "([^"]+)"/);
          if (match && match.length > 1) {
            debugger;
            const duplicateValue = match[1];
            setMessage("Duplicate Tech Title :" + duplicateValue);
          } else {
            console.log("Something Wrong ...");
          }
        } else {
          setMessage("successful ...");
        }
      } else {
        setMessage("please put a Title ...");
        console.log("please put a Title ...");
      }
    } catch (error) {
      setMessage(error.message);
      console.log("login page catch error - " + error.message);
    }
  }
  async function loadAllTechs() {
    console.log(" ----- loadAllTechs ----");
    const res = await fetch("/api/forPortfolioSite/techs/getAllTechs");
    const responseData = await res.json();
    //debugger;
    setAllTechs(responseData.result);
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
  };

  async function handleDeleteTech(title) {
    try {
      setMessage(title + " Deleting ..");
      const res = await fetch("/api/forPortfolioSite/techs/removeTech", {
        method: "POST",
        body: title,
      });
      const responseData = await res.json();
      if (responseData.result.acknowledged) {
        if (responseData.result.deletedCount === 1) {
          setMessage("Delete success .. ");
        }
      }
      debugger;
      console.log(responseData);
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <div className="flex justify-center">
      <div>
        <p>{message}</p>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <div>
          {logo && (
            <img
              src={URL.createObjectURL(logo)}
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
            onChange={(e) => {
              updateTitle(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <button className={commonButton} onClick={createOnclick}>
            Create
          </button>
        </div>
        <div className="flex">
          {allTechs
            ? allTechs.map((tech, index) => (
                <div
                  className="w-16 border flex justify-center border-sky-500"
                  key={index}
                >
                  <div>
                    <p>{tech.title}</p>
                    <img
                      src={"data:image/png;base64," + tech.fileBuffer}
                      alt={tech.title}
                      onError={(e) => {
                        e.target.src = "/error_cloud_icon.svg"; // Replace with a fallback image URL
                      }}
                    />
                    <button
                      className="bg-sky-300 hover:bg-sky700"
                      onClick={() => handleDeleteTech(tech.title)}
                    >
                      delete
                    </button>
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
}
export default CreateTechs;
