import axios from "axios";
import { useEffect, useState, useContext } from "react";                     
import { AuthContext } from "../context/auth.context";
import { useParams } from "react-router-dom";
import AddProfile from "../components/user/AddProfile";
import ProfileCard from "../components/user/ProfileCard";


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
            <ProfileCard   {...userDetails.profile} userId={userDetails.userId}/>
          )}
        </>
      </div>
    );
}


export default UserPage;