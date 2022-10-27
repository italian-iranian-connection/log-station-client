import { Button } from "bootstrap";
import { useState } from "react";

function AddProfile() {
  const [headline, setHeadline] = useState("");
  const [basedIn, setBasedIn] = useState("");
  const [technologies, setTechnologies] = useState([]);
  const [githubUrl, setGithubUrl] = useState("");
  const [profileImg, setProfileImg] = useState("");

  const handelSubmit = (e) => {
    e.preventDefault();
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
        <Button>Submit</Button>
      </form>
    </div>
  );
}

export default AddProfile;
