import ProjectCard from "../../components/portfolioComp/projectCard";
import { useState, useEffect } from "react";
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
