import axios from "axios";
import { useEffect, useState, useContext } from "react";                     
import { AuthContext } from "../context/auth.context";
import { Link, useParams } from "react-router-dom";
import AddProfile from "../components/user/AddProfile";


const API_URL = "http://localhost:5005";




function UserPage() {

    const { user } = useContext(AuthContext);
    const [userDetails, setUserDetails] = useState(null)

    // const refreshPage = ()=>{
    //     setUserDetails(userDetails)
    // }

     const { userId } = useParams()
     const [displayForm, setDisplayForm] = useState(false)
     const shiftForm = () => {setDisplayForm((currentState) => !currentState);}

  
        const storedToken = localStorage.getItem("authToken");
        const getUser = ()=>{
           axios.get(`${API_URL}/api/user/${userId}`, { headers: { Authorization: `Bearer ${storedToken}` } }
        )
             .then(response=>{
                setUserDetails(response.data)
             })
             .catch((error) => console.log(error));
        }
        
 



    useEffect(()=>{
      getUser()
    }, [])

    return (
      <div className="UserPage">
        
        {userDetails && (
          <div
            className="card"
            style={{
              width: "18rem",
              margin: "50px 20px 10px 50px",
              padding: "10px",
            }}
          >
            <h1 className="card-title">{userDetails.name}</h1>
            <h4 className="card-text">{userDetails.email}</h4>
          </div>
        )}

        <>
          { !userDetails?.profile?.headline && (
            <>
              <button className="btn btn-dark" onClick={shiftForm}>
                {displayForm ? "Hide the Form" : "Add Profile"}
              </button>
              {displayForm && <AddProfile refreshPage={getUser} />}
            </>
          )}

          {userDetails?.profile?.headline && (
            <section>
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
                  <img src={userDetails.profile.profileImg} alt="Profile" />
                  <h4 className="card-title">
                    Headline: {userDetails.profile.headline}
                  </h4>
                  <h4 className="card-subtitle mb-2 text-muted">
                    Based in: {userDetails.profile.basedIn}
                  </h4>
                  <h4 className="card-subtitle mb-2 text-muted">
                    Tech Skills: {userDetails.profile.technologies}
                  </h4>
                  <h4 className="card-subtitle mb-2 text-muted">
                    GitHub URL: {userDetails.profile.githubUrl}
                  </h4>
                </div>

                <div>
                  <Link to={`/user/edit/${userId}`}>
                    <button className="btn btn-primary">Edit Profile</button>
                  </Link>
                </div>
              </div>
            </section>
          )}
        </>
      </div>
    );
}


export default UserPage;