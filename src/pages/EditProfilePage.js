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
  const [technologies, setTechnologies] = useState([]);
  const [githubUrl, setGithubUrl] = useState("");
  const [profileImg, setProfileImg] = useState("");


  const { user } = useContext(AuthContext);

  const { userId} = useParams();
  const navigate = useNavigate();  


  const storedToken = localStorage.getItem("authToken");


  useEffect(()=>{
    axios.get(`${API_URL}/api/user/${userId}`)
    .then(response=>{
        const oneUser = response.data.profile;
        setHeadline(oneUser.headline);
        setBasedIn(oneUser.basedIn);
        setTechnologies(oneUser.technologies);
        setGithubUrl(oneUser.githubUrl);
        // setProfileImg(oneUser.profileImg);
    })
    .catch((error) => console.log(error));
}, [userId])


  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const profile = {headline, basedIn, technologies, githubUrl , profileImg};
    

    axios.put(`${API_URL}/api/user/${user._id}/`, profile)
    .then((response) => {
      navigate(`/user/${userId}`)
    })
  };

  const deleteProfile = ()=>{
    const profile = {}
    axios.put(`${API_URL}/api/user/${userId}`, profile)
    .then((res)=>{
      console.log("res: ",res)
        navigate(`/user/${userId}`);
    })
    .catch((err) => console.log(err));
}


  return (
    <div className="AddProfile card" style={{marginLeft: "35%",width: "30rem", textAlign: "center"}} >

      <form className="form" onSubmit={handleFormSubmit}>
      <div className="mb-3">

        <label htmlFor="exampleInputEmail1" className="form-label">
          Headline:
          <input
            className="form-control"
            type="text"
            name="headline"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}            
          />
        </label>
        </div>

        <div className="mb-3">
        <label>
          Based in:
          <input
            className="form-control"
            type="text"
            name="basedIn"
            value={basedIn}
            onChange={(e) => setBasedIn(e.target.value)}
          />
        </label>
        </div>

        <div className="form-group">
        <label>
          Techologies you know (or want to practice):
          <input
            className="form-control"
            type="text"
            name="technologies"
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
            
          />
        </label>
        </div>

        <div className="form-group">
        <label>
          Your GitHub profile:
          <input
            className="form-control"
            type="text"
            name="githubUrl"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            
          />
        </label>
        </div>

        <div className="form-group">
        <label>
          Profile Picture:
          <input
            className="form-control"
            type="file"
            name="profileImg"
            value={profileImg}
            onChange={(e) => setProfileImg(e.target.value)}
          />
        </label>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      <button className="btn btn-danger" onClick={deleteProfile}>Delete Profile</button>



    </div>
  );
}

export default EditProfilePage;
