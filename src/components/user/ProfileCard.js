import { Link } from "react-router-dom";
import "./ProfileCard.css";

function ProfileCard({
  screenshoot,
  headline,
  basedIn,
  technologies,
  githubUrl,
  userId,
  name
}) {
  return (
    <section className="ProfileCard profile">
      <div
        className="card"
        style={{
          width: "30rem",
          margin: "20px 50px",
          padding: "10px",
          textAlign: "left",
        }}
      >
        <div className="card-body">
        <h4>{name}</h4>
          <img className="profileImg" src={screenshoot} alt="Profile" />

          <h4 className="card-title">Headline: {headline}</h4>
          <h4 className="card-subtitle mb-2 text-muted">Based in: {basedIn}</h4>
          <h4 className="card-subtitle mb-2 text-muted">
            Tech Skills: {technologies}
          </h4>
          <h4 className="card-subtitle mb-2 text-muted">
            GitHub URL: {githubUrl}
          </h4>
        </div>

        
      </div>
      <div>
          <Link to={`/user/edit/${userId}`}>
            <button className="btn btn-warning editBtn">Edit Profile</button>
          </Link>
        </div>
    </section>
  );
}

export default ProfileCard;
