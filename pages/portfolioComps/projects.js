import ProjectCard from "../../components/portfolioComp/projectCard";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import CreateProjects from "../../components/input_components/createProjects";
function Projects() {
  const [data, setData] = useState([]);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const toggleDescription = () => {
    setShowFullDesc(!showFullDesc);
  };
  const reloadProjects = () => {
    LoadAllProject();
  };
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
      {checkAuth() ? <CreateProjects reloadProjects={reloadProjects} /> : ""}
      <div className="flex flex-wrap text-white">
        {data
          ? data.map((project, index) => (
              <div
                key={index}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4"
              >
                <ProjectCard key={index} project={project} />
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}
export default Projects;
