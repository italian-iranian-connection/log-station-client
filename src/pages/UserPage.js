import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useParams, Link } from "react-router-dom";
import AddProfile from "../components/user/AddProfile";
import ProfileCard from "../components/user/ProfileCard";
import image from "../images/default-img/def-profile.png";

function UserPage() {
  const [displayForm, setDisplayForm] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const { userId } = useParams();
  const { user } = useContext(AuthContext);

  const shiftForm = () => {
    setDisplayForm((currentState) => !currentState);
  };

  const getUser = () => {
    const storedToken = localStorage.getItem("authToken");

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
  }, []);

  return (
    <div className="container card justify-content-md-center border-0 shadow-none" style={{display: "flex" }}>

    <div className="UserPage">
      <div className="card m-5 p-5">
        <div className="row">
          <div className="col">
            {userDetails && (
              <div className="headProfile">
                {userDetails?.profile?.headline ? (
                  <img
                    src={userDetails.profile.screenshoot}
                    alt="Profile"
                    style={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "50%",
                      marginBottom: "20px",
                    }}
                  />
                ) : (
                  <img
                    src={image}
                    alt="Profile"
                    style={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "50%",
                      marginBottom: "20px",
                    }}
                  />
                )}
              </div>
            )}
          </div>

          <div className="col">
            <div className="card coll p-4">
              {userDetails && (
                <div className="prof-title">
                  <h2 className="card-title">{userDetails.name}</h2>
                  <h6 className="card-text">{userDetails.email}</h6>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="card m-5 p-5">
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

        {userDetails?.profile?.headline && (
          <div>
            <ProfileCard {...userDetails.profile} />
            <div className="mt-5"></div>
            <Link to={`/user/edit/${userId}`} > 
              <button
                className="btn btn-warning"
                style={{ marginLeft: "15px" }}
              >
                Edit Profile
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default UserPage;
