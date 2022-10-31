import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";



const API_URL = "http://localhost:5005";

function AddProfile({refreshPage}) {
  const [headline, setHeadline] = useState("");
  const [basedIn, setBasedIn] = useState("");
  const [technologies, setTechnologies] = useState([]);
  const [githubUrl, setGithubUrl] = useState("");
  const [profileImg, setProfileImg] = useState("");
 
  const navigate = useNavigate();
  const { user} = useContext(AuthContext);
  const {userId} = useParams();

  const storedToken = localStorage.getItem("authToken");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const profile = {headline, basedIn, technologies, githubUrl , profileImg};
    console.log()

    axios.put(`${API_URL}/api/user/${user._id}/`, profile)
    .then((response) => {
      console.log(response);
      refreshPage();
    })
    .catch(error=>{
      console.log("error adding profile", error)
    })
  };



  return (
    <div className="AddProfile card" style={{marginLeft: "35%",width: "30rem", textAlign: "center"}} >

      <form className="form" onSubmit={handleSubmit}>
      <div className="mb-3">

        <label htmlFor="exampleInputEmail1" className="form-label">
          Headline:
          <input
            className="form-control"
            type="text"
            name="headline"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="Say something about yourself..."
            
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
            placeholder="Wherever you are..."
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
    </div>
  );
}

export default AddProfile;
