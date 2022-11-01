<<<<<<< HEAD
import { Link } from "react-router-dom";
import "./ProfileCard.css";
=======
>>>>>>> 83df31a09f443ebaf38a72b091e3b7e94641f31d

function ProfileCard({
  screenshoot,
  headline,
  basedIn,
  technologies,
  githubUrl,
}) {
  return (
    <section className="ProfileCard mt-2">
      <div className="card p-2">
          <img src={screenshoot} alt="Profile" className="card-img-top p-2 mb-4"/>

          <h4 className="card-title text-capitalize">{headline}</h4>
          <h5 className="card-subtitle mb-2 text-muted">Based in: {basedIn}</h5>
          <h5 className="card-subtitle mb-2 text-muted">
            Tech Skills: 
            {technologies.map((tech, index) => {
              return <span key={index}> ✩{tech} </span>
            })}
          </h5>
          <h3 className="text-center">
        <a
          href={githubUrl}
          className="text-decoration-none"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-brands fa-github"></i>
        </a>
        
      </h3>
      <span className="text-center text-muted">{githubUrl}</span>
        </div>
<<<<<<< HEAD

        
      </div>
      <div>
          <Link to={`/user/edit/${userId}`}>
            <button className="btn btn-warning editBtn">Edit Profile</button>
          </Link>
        </div>
=======
>>>>>>> 83df31a09f443ebaf38a72b091e3b7e94641f31d
    </section>
  );
}

export default ProfileCard;
