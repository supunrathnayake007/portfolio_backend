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
  const [message, setMessage] = useState("");
  const updateTitle = (Password) => {
    setTitle(Password);
  };
  async function createOnclick() {
    try {
      if (title !== "") {
        const formData = new FormData();
        formData.append("image", logo);

        const res = await fetch("/api/forPortfolioSite/createTech", {
          method: "POST",
          body: JSON.stringify({ formData, title }),
        });
        const responseData = await res.json();
        console.log("hi hi" + responseData);
      } else console.log("please put a Title ...");
    } catch (error) {
      console.log("login page catch error - " + error.message);
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setLogo(URL.createObjectURL(file));
  };

  return (
    <div className="flex justify-center">
      <div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <div>
          {logo && (
            <img src={logo} alt="Selected" style={{ maxWidth: "300px" }} />
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
      </div>
    </div>
  );
}
export default CreateTechs;
