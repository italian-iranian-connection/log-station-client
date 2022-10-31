import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

function ProjectCard({ name, technologies, status, screenshoot, _id, userId }) {
  const style = { textDecoration: "none", color: "black" };

  const { user } = useContext(AuthContext);

  return (
    <div className="ProjectCard card m-2 p-2">
      <Link to={`/projects/${_id}`} style={style}>
        <div className="row">
          <div className="col">
            <img
              src={screenshoot}
              alt={name}
              className="card-img-start m-4"
              width="200px"
              max-height="200px"
            />
          </div>

          <div className="col">
            <h5 className="card-title text-uppercase">{name}</h5>
            <p className="text-align-end">
              {status === "planned" && `🟢 Status: ${status}`}
              {status === "ongoing" && `🟡 Status: ${status}`}
              {status === "finished" && `🔴 Status: ${status}`}
            </p>
            <h6 className="card-text">Techologies: </h6>
            {technologies.map((tech, index) => {
              return <span key={index}>✩{tech} </span>;
            })}
          </div>
          {user?._id && user._id === userId && (
            <div className="m-1">
              <button className="btn btn-dark">Update Your Project</button>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}

export default ProjectCard;
