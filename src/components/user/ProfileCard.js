import axios from "axios";
import { useEffect, useState, useContext } from "react";                     
import { AuthContext } from "../../context/auth.context";
import AddProfile from "./AddProfile";


const API_URL = "http://localhost:5005";


function ProfileCard(){

     const { user } = useContext(AuthContext);
     const [profile, setProfile] = useState({})
     const storedToken = localStorage.getItem("authToken");


     const [displayForm, setDisplayForm] = useState(false)

     const shiftForm = () => {setDisplayForm((currentState) => !currentState);}
 
 
     const getUser = () => { 
 
         axios.get(`${API_URL}/api/user/${profile._id}`)
         .then(response=>{
             const oneUser = response.data;
             setProfile(oneUser) ;
         })
         .catch((error) => console.log(error));
     }
 
     useEffect(()=>{
         getUser();
     }, [])

     console.log(user)
     console.log(profile)

    return(
        <>
            <h1>{profile.name}</h1>
            
            {!profile.headline 
            ? 
            <>
            <button onClick={shiftForm} >{displayForm ? "Hide the Form" : "Add Profile"}</button>
            {displayForm && <AddProfile /> }
            </>
            :
            <section>
                <div>
                    <img src="{user.profileImg}" alt="Profile image"/>
                    <h1>{profile.name}</h1>
                    <h6>Headline: {profile.headline}</h6>
                    <h6>Based in: {profile.basedIn}</h6>
                    <h6>Tech Skills: {profile.technologies}</h6>
                    <h6>GitHub URL: {profile.githubUrl}</h6>

                </div>
                <div>
                    <button>Edit Profile</button>
                    <button>Delete Profile</button>
                </div>
           </section>
            }

        </>

    )
}

export default ProfileCard;