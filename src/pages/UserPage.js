import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useParams, Link } from "react-router-dom";
import AddProfile from "../components/user/AddProfile";
import ProfileCard from "../components/user/ProfileCard";
import "./UserPage.css";

// const API_URL = "http://localhost:5005";

function UserPage() {
  const { user } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);

  const { userId } = useParams();
  const [displayForm, setDisplayForm] = useState(false);
  const shiftForm = () => {
    setDisplayForm((currentState) => !currentState);
  };

  const storedToken = localStorage.getItem("authToken");
  const getUser = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUserDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUser();
    console.log("result", userDetails);
  }, []);

  return (
    <>
      <div className="container">
        <div className="container card m-5 p-5" style={{ maxWwidth: "50vw" }}>
          {/* <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4"> */}
            <div className="col">
              <div className="container">
                <div className="row">
                  <div className="col">
                    {userDetails && (
                      <div className="headProfile">
                        <div>
                          {userDetails.profile.screenshoot && (<img
                            src={userDetails.profile.screenshoot}
                            alt="Profile"
                            style={{
                              width: "200px",
                              height: "200px",
                              borderRadius: "50%",
                              marginBottom: "20px",
                            }}
                          />)}
                        </div>

                        <div className="prof-title">
                          <h4 className="card-title">{userDetails.name}</h4>
                          <h6 className="card-text">{userDetails.email}</h6>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col">
                    <div className="card coll">
                      <h6 className="collab-title">Find collaborators for your projects</h6>
                      <div className="collab-box">
                      <div className="collab"></div>
                      <div className="collab"></div>
                      <div className="collab"></div>
                      <div className="collab"></div>
                      <div className="collab"></div>
                      </div>
                      {/* <AllUsers /> */}
                    </div>
                  </div>
                </div>
              </div>
            {/* </div> */}
          </div>
        </div>

        <div className="container card m-5 p-5">
          {!userDetails?.profile?.headline && (
            <>
              <h6 style={{ textAlign: "left" }}>
                You have no profile at the moment. You can always add it here.
              </h6>
              <div className="col col-lg-6" style={{ marginLeft: "50%" }}>
                <button className="btn btn-warning" onClick={shiftForm}>
                  {displayForm ? "Hide the Form" : "Add Profile"}
                </button>
                {displayForm && <AddProfile refreshPage={getUser} />}
              </div>
            </>
          )}
          {/* <div>
                {userDetails?.profile?.headline && (
                  <ProfileCard   {...userDetails.profile} userId={userDetails.userId}/>
                )}
              
            </div> */}

          {userDetails?.profile?.headline && (
            <section>
              <div
                className=""
                style={{
                  width: "30rem",
                  margin: "20px 50px",
                  padding: "10px",
                  textAlign: "left",
                }}
              >
                <div className="card-body">
                  {/* <img
                    src={userDetails.profile.screenshoot}
                    alt="Profile"
                    style={{
                      width: "250px",
                      borderRadius: "10px",
                      marginBottom: "20px",
                    }}
                  /> */}
                  <h6 className="card-title">
                    Headline: {userDetails.profile.headline}
                  </h6>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Based in: {userDetails.profile.basedIn}
                  </h6>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Tech Skills: {userDetails.profile.technologies}
                  </h6>
                  <h6 className="card-subtitle mb-2 text-muted">
                    GitHub URL: {userDetails.profile.githubUrl}
                  </h6>
                </div>

                <div>
                  <Link to={`/user/edit/${userId}`}>
                    <button
                      className="btn btn-warning"
                      style={{ marginLeft: "15px" }}
                    >
                      Edit Profile
                    </button>
                  </Link>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

export default UserPage;
