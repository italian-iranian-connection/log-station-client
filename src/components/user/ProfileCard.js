
function ProfileCard({
  screenshoot,
  headline,
  basedIn,
  technologies,
  githubUrl,
}) {
  return (
    <section className="ProfileCard">
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
    </section>
  );
}

export default ProfileCard;
