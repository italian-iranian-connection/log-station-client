import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function AddProfile() {
  const [headline, setHeadline] = useState("");
  const [basedIn, setBasedIn] = useState("");
  const [technologies, setTechnologies] = useState([]);
  const [githubUrl, setGithubUrl] = useState("");
  const [profileImg, setProfileImg] = useState("");
 
  const { user} = useContext(AuthContext);

  const storedToken = localStorage.getItem("authToken");

  const handelSubmit = (e) => {
    e.preventDefault();
    
    const profile = {headline, basedIn, technologies, githubUrl , profileImg}

    axios.post(`${API_URL}/api/create-profile/${user._id}`, { headers: { Authorization: `Bearer ${storedToken}`}}, profile)
    .then((response) => {
      console.log(response)
    })
  };

  return (
    <div className="AddProfile">
      <form className="form" onSubmit={handelSubmit}>
        <label>
          Headline:
          <input
            type="text"
            name="headline"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="Say something about yourself..."
            required
          />
        </label>

        <label>
          Based in:
          <input
            type="text"
            name="basedIn"
            value={basedIn}
            onChange={(e) => setBasedIn(e.target.value)}
            placeholder="Wherever you are..."
          />
        </label>

        <label>
          Techologies you know (or want to practice):
          <input
            type="text"
            name="technologies"
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
            required
          />
        </label>

        <label>
          Your GitHub profile:
          <input
            type="text"
            name="githubUrl"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            required
          />
        </label>

        <label>
          Profile Picture:
          <input
            type="file"
            name="profileImg"
            value={profileImg}
            onChange={(e) => setProfileImg(e.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default AddProfile;
