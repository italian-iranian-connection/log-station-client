import { Link } from "react-router-dom";
 
// deconstructing props object directly in the parentheses of the function
function ProjectCard ( { name, technologies, _id } ) {
  
  return (
    <div className="ProjectCard card">
      <Link to={`/projects/${_id}`}>
        <h3>Project Title: {name}</h3>
      </Link>
      <p style={{ maxWidth: "400px" }}>Technologies: {technologies} </p>
    </div>
  );
}

export default ProjectCard;