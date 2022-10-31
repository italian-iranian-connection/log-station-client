import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useParams, useNavigate } from "react-router-dom";

//"https://www.canva.com/templates/EAEeKH905XY-yellow-and-black-gamer-grunge-twitch-profile-picture/",

// { userDetails?.profile?.headline
//   ? renderProfileDetails()
//   : renderAddProfileButton()
// }

const API_URL = "http://localhost:5005";

function EditProfilePage() {
  const [headline, setHeadline] = useState("");
  const [basedIn, setBasedIn] = useState("");
  const [technology, setTechnology] = useState("");
  const [technologies, setTechnologies] = useState([]);
  const [githubUrl, setGithubUrl] = useState("");
  const [screenshoot, setScreenshoot] = useState("");

  const { user } = useContext(AuthContext);

  const { userId } = useParams();
  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${API_URL}/api/user/${userId}`)
      .then((response) => {
        const oneUser = response.data.profile;
        setHeadline(oneUser.headline);
        setBasedIn(oneUser.basedIn);
        setTechnologies(oneUser.technologies);
        setGithubUrl(oneUser.githubUrl);
        setScreenshoot(oneUser.screenshoot);

        // setProfileImg(oneUser.profileImg);
      })
      .catch((error) => console.log(error));
  }, [userId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const profile = { headline, basedIn, technologies, githubUrl, screenshoot };

    axios.put(`${API_URL}/api/user/${user._id}/`, profile).then((response) => {
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
    const profile = {};
    axios
      .put(`${API_URL}/api/user/${userId}`, profile)
      .then((res) => {
        console.log("res: ", res);
        navigate(`/user/${userId}`);
      })
      .catch((err) => console.log(err));
  };

  const handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);
    const uploadData = new FormData();
    uploadData.append("screenshoot", e.target.files[0]);
    axios.post(`${API_URL}/api/upload`, uploadData).then((response) => {
      console.log(response.data.screenshoot);
      setScreenshoot(response.data.screenshoot);
    });
  };

  return (
    <>
      <div className="container">
        <div className="container card m-5 p-5" style={{ maxWwidth: "50vw" }}>
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4">
            <div className="col">
              {user && (
                <>
                  <h1 className="card-title">{user.name}</h1>
                  <h4 className="card-text">{user.email}</h4>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="EditProfile">
        <div className="container">
          <div className="container card m-5 p-5" style={{ maxWwidth: "50vw" }}>
            <div className="col col-lg-6" style={{ marginLeft: "50%" }}>
              <form className="form mt-2 p-3" onSubmit={handleFormSubmit}>
                <div className="row g-3 align-items-center">
                  <label className="form-label">
                    Headline:
                    <input
                      className="form-control m-2"
                      type="text"
                      name="headline"
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                    />
                  </label>
                </div>

                <div className="row g-3 align-items-center">
                  <label className="form-label">
                    Based in:
                    <input
                      className="form-control m-2"
                      type="text"
                      name="basedIn"
                      value={basedIn}
                      onChange={(e) => setBasedIn(e.target.value)}
                    />
                  </label>
                </div>

                <div className="row g-3 align-items-center">
                  <label className="form-label">
                    Techologies you know (or want to practice):
                    <input
                      className="form-control m-2"
                      type="text"
                      name="technologies"
                      value={technology}
                      onChange={(e) => {
                        setTechnology(e.target.value);
                      }}
                      placeholder="Anything new?"
                    />
                    <button
                      className="btn btn-dark"
                      onClick={(e) => {
                        addTecnology(technology, e);
                      }}
                    >
                      Add
                    </button>
                    <p>
                      {technologies.map((tech, index) => {
                        return <span key={index}>✩{tech} </span>;
                      })}
                    </p>
                  </label>
                </div>

                <div className="row g-3 align-items-center">
                  <label className="form-label">
                    Your GitHub profile:
                    <input
                      className="form-control m-2"
                      type="text"
                      name="githubUrl"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                    />
                  </label>
                </div>

                <div className="form-group">
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
                </div>

                <button type="submit" className="btn btn-warning">
                  Submit Profile
                </button>
              </form>

              <div>
                <button className="btn btn-danger" onClick={deleteProfile}>
                  Delete Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfilePage;
