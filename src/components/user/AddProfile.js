import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";

function AddProfile({ refreshPage }) {
  const [headline, setHeadline] = useState("");
  const [basedIn, setBasedIn] = useState("");
  const [technology, setTechnology] = useState("")
  const [technologies, setTechnologies] = useState([]);
  const [githubUrl, setGithubUrl] = useState("");

  const [screenshoot, setScreenshoot] = useState("");

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { userId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    const profile = { headline, basedIn, technologies, githubUrl, screenshoot };
    console.log(screenshoot);
    console.log("profile: ", profile);
    const storedToken = localStorage.getItem("authToken");

    axios
      .put(`${API_URL}/api/user/${user._id}/`, profile, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response);
        refreshPage();
      })
      .catch((error) => {
        console.log("error adding profile", error);
      });
  };

  const addTecnology = (technology, e) => {
    e.preventDefault()
    if(technology){  
    setTechnologies((prevTechnologies) => {
      const newArr = [...prevTechnologies, technology]
      setTechnology("")
      return newArr
    })}
  }

  const handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);
    const uploadData = new FormData();
    uploadData.append("screenshoot", e.target.files[0]);
    axios.post(`${API_URL}/api/upload`, uploadData).then((response) => {
      setScreenshoot(response.data.screenshoot);
    });
  };

  return (
    <div className="AddProfile">
      <div className="container">
        <form className="form mt-2 p-3" onSubmit={handleSubmit}>
          <div className="row g-3 align-items-center">
            <label className="form-label">
              Headline:
              <input
                className="form-control m-2"
                type="text"
                name="headline"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Say something about yourself..."
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
                placeholder="Wherever you are..."
              />
            </label>
          </div>

          <div className="row g-3 align-items-center">
            <label className="form-label">
              Techologies you know (or want to practice):
              <input className="form-control m-2" type="text" name="technologies" value={technology} onChange={(e)=>{setTechnology(e.target.value)}} placeholder="React..."/>
       <button className="btn btn-dark" onClick={(e) => {addTecnology(technology, e)}} >Add</button> 
      <p>{technologies.map((tech,index)=>{ return <span key={index}>{tech} </span>})}</p>

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

          <div className="row g-3 align-items-center">
            <label className="form-label">
              Profile Picture:
              <input
                className="form-control m-2"
                type="file"
                name="screenshoot"
                onChange={(e) => {
                  handleFileUpload(e);
                }}
              />
            </label>
          </div>

          <button type="submit" className="btn btn-warning">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProfile;
