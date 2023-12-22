import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CreateProjects from "../../components/input_components/createProjects";
function Projects() {
  let data = [
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
                <div>{project.image}</div>
                <div>{project.title}</div>
                <div>{project.disc}</div>
                <div>{project.tech}</div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}
export default Projects;
