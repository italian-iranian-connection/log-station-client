import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useParams, useNavigate } from "react-router-dom";
import RiseLoader from "react-spinners/RiseLoader";

function EditProfilePage() {
  const [headline, setHeadline] = useState("");
  const [basedIn, setBasedIn] = useState("");
  const [technology, setTechnology] = useState("");
  const [technologies, setTechnologies] = useState([]);
  const [githubUrl, setGithubUrl] = useState("");
  const [screenshoot, setScreenshoot] = useState();
  const [imgLoading, setImgLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);

  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneUser = response.data.profile;
        setHeadline(oneUser.headline);
        setBasedIn(oneUser.basedIn);
        setTechnologies(oneUser.technologies);
        setGithubUrl(oneUser.githubUrl);
        setScreenshoot(oneUser.screenshoot);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [userId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");
    const profile = { headline, basedIn, technologies, githubUrl, screenshoot };

    axios
      .put(`${process.env.REACT_APP_API_URL}/api/user/${user._id}/`, profile, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate(`/user/${userId}`);
      });
  };

  const addTecnology = (technology, e) => {
    e.preventDefault();
    if (technology) {
      setTechnologies((prevTechnologies) => {
        const newArr = [...prevTechnologies, technology];
        setTechnology("");
        return newArr;
      });
    }
  };

  const deleteProfile = () => {
    const storedToken = localStorage.getItem("authToken");
    const profile = { screenshoot };
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/user/${userId}`, profile, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        console.log("res: ", res);
        navigate(`/user/${userId}`);
      })
      .catch((err) => console.log(err));
  };

  const handleFileUpload = (e) => {
    setImgLoading(true);
    const uploadData = new FormData();
    uploadData.append("screenshoot", e.target.files[0]);
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/upload`, uploadData)
      .then((response) => {
        console.log(response.data.screenshoot);
        setScreenshoot(response.data.screenshoot);
        setImgLoading(false);
      });
  };

  return (

    <div className="EditProfile">
    <RiseLoader
        color="yellow"
        loading={loading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    <div className="card m-5 special p-4">
      <div className="card m-2 p-2">
        <div className="row ">
          <div className="col-12 col-lg-6">
            <img src={screenshoot} alt="collaboration" width="150px" />
          </div>

          <div className="col-12 col-lg-6">
            {user && (
              <>
                <h1 className="card-title">{user.name}</h1>
                <h4 className="card-text">{user.email}</h4>
              </>
            )}
          </div>
        </div>
      </div>

      
        <div className="row p-4">
          <div className="col col-lg-6">
          <h3 className="mt-2">Add any information You'd like to share.</h3>
            <form className="form card mt-2 p-3" onSubmit={handleFormSubmit}>
              <label className="form-label">
                Headline:
                <input
                  className="form-control mt-2"
                  type="text"
                  name="headline"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                />
              </label>

              <label className="form-label">
                Based in:
                <input
                  className="form-control mt-2"
                  type="text"
                  name="basedIn"
                  value={basedIn}
                  onChange={(e) => setBasedIn(e.target.value)}
                />
              </label>

              <label className="form-label">
                Techologies you know (or want to practice):
                <input
                  className="form-control mt-2"
                  type="text"
                  name="technologies"
                  value={technology}
                  onChange={(e) => {
                    setTechnology(e.target.value);
                  }}
                  placeholder="Anything new?"
                />
                <button
                  className="btn btn-dark mt-2"
                  onClick={(e) => {
                    addTecnology(technology, e);
                  }}
                >
                  Add
                </button>
                <p>
                  {technologies.map((tech, index) => {
                    return <span key={index}> ✩{tech} </span>;
                  })}
                </p>
              </label>

              <label className="form-label">
                Your GitHub profile:
                <input
                  className="form-control mt-2"
                  type="text"
                  name="githubUrl"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                />
              </label>

              <label className="form-label">
                Profile Picture:
                <input
                  className="form-control"
                  type="file"
                  name="screenshoot"
                  onChange={(e) => {
                    handleFileUpload(e);
                  }}
                />
              </label>

              <div className="text-center">
                <RiseLoader
                  color="yellow"
                  loading={imgLoading}
                  size={10}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>

              <button type="submit" className="btn btn-warning mt-2">
                Submit Profile
              </button>
            </form>

            <div>
              <button className="btn btn-danger mt-4" onClick={deleteProfile}>
                Delete Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfilePage;
