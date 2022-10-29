import { Link } from "react-router-dom";

function ProjectCard({ name, technologies, status, screenshoot, _id }) {
  const style = { textDecoration: "none", color: "black" };
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
        </div>
      </Link>
    </div>
  );
}

export default ProjectCard;
