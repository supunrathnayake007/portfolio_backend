import { useState } from "react";

const ProjectCard = (props) => {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const openNewPage = () => {
    // props.openNewPage(props.project);
  };

  return (
    <div className="hover:border-2 border-sky-500  p-1">
      <div>
        <a href={props.project.url} target="_blank" rel="noopener noreferrer">
          <img
            className="w-80"
            src={"data:image/png;base64," + props.project.image}
            alt={props.project.title}
            onError={(e) => {
              e.target.src = "/error_cloud_icon.svg"; // Replace with a fallback image URL
            }}
          />
        </a>
      </div>
      <div>{props.project.title}</div>
      <div className="text-gray-400">
        {<>{`${props.project.desc.slice(0, 50)}... `}</>}
        {
          <button
            onClick={openNewPage}
            className="text-blue-500 hover:underline focus:outline-none ml-2"
            disabled
          >
            View Details
          </button>
        }
      </div>
      <div>{props.project.selectedTechs}</div>
    </div>
  );
};

export default ProjectCard;
