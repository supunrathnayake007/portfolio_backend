import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CreateProjects from "../../components/input_components/createProjects";
function Projects() {
  const [data, setData] = useState([]);
  useEffect(() => {
    LoadAllProject();
  }, []);
  async function LoadAllProject() {
    const res = await fetch("/api/forPortfolioSite/getAllProjects");
    const responseData = await res.json();
    debugger;
    setData(responseData.result);
  }
  let data1 = [
    {
      title: "title",
      image: "image",
      disc: "description",
      tech: "techs",
    },
    { title: "title2", image: "image2", disc: "description2", tech: "techs2" },
  ];
  const checkAuth = () => {
    /* user authentication should implement here */
    return true;
  };

  return (
    <div className="min-h-screen bg-slate-800 ">
      {checkAuth() ? <CreateProjects /> : ""}
      <div className="flex m-2 text-white">
        {data
          ? data.map((project, index) => (
              <div className="border-2 border-sky-500 m-1 p-1">
                <div>
                  <img
                    className="w-40"
                    src={"data:image/png;base64," + project.image}
                    alt={project.title}
                    onError={(e) => {
                      e.target.src = "/error_cloud_icon.svg"; // Replace with a fallback image URL
                    }}
                  />
                </div>
                <div>{project.title}</div>
                <div>{project.desc}</div>
                <div>{project.selectedTechs}</div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}
export default Projects;
