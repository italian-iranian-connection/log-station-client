import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { Link } from "react-router-dom";

function ProjectDetails({
  name,
  description,
  technologies,
  deploymentUrl,
  gitRepoUrl,
  status,
  screenshoot,
  _id,
  userId
}) {

  const { user } = useContext(AuthContext);
  const style = { textDecoration: "none", color: "fuchsia" };

  return (
    <div className="ProjectDetails card m-2 p-2">
      <h2 className="card-title text-uppercase mt-2">{name}</h2>
      {deploymentUrl ? (
        <iframe
          className="p-3"
          title={name}
          width="100%"
          src={deploymentUrl}
        ></iframe>
      ) : (
        <img
          src={screenshoot}
          alt={name}
          className="card-img-top ps-5 pe-5 p-1"
        />
      )}
      <a
        href={deploymentUrl}
        className="text-decoration-none mb-2"
        target="_blank"
        rel="noreferrer"
      >
        Check it out!
      </a>
      <p className="card-text border p-2">{description}</p>

      <div className="border">
        <h5 className="card-text p-1">Techologies: </h5>
        
        {technologies && technologies.map((tech, index) => {
          return <span key={index}>✩{tech} </span>;
        })}
      </div>
      <p className="card-text mt-3">
        {status === "planned" && `🟢 Status: ${status}`}
        {status === "ongoing" && `🟡 Status: ${status}`}
        {status === "finished" && `🔴 Status: ${status}`}
      </p>
      <h3>
        <a
          href={gitRepoUrl}
          className="text-decoration-none"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-brands fa-github"></i>
        </a>
      </h3>
      {user?._id && user._id === userId && (
            <div className="m-1">
            <Link to={`/projects/edit/${_id}`} style={style} >
              <button className="btn btn-outline-dark">Update Your Project</button>
              </Link>
            </div>
          )}
    </div>
  );
}

export default ProjectDetails;
