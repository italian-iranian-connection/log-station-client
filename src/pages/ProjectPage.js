import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RiseLoader from "react-spinners/RiseLoader";
import ProjectDetails from "../components/ProjectDetails";
import { AuthContext } from "../context/auth.context";
import EditProject from "../components/EditProject";
import ProfileCard from "../components/user/ProfileCard";

const API_URL = "http://localhost:5005";

function ProjectPage() {
  const [projectDetails, setProjectDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const { projectId } = useParams();
  const storedToken = localStorage.getItem("authToken");

  const { user } = useContext(AuthContext);

  const getProjectDetails = () => {
    axios
      .get(`${API_URL}/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((projectDetails) => {
        setProjectDetails(projectDetails.data);
        setLoading(false);
      });
  };

  const getUser = (userId) => {
    axios
      .get(`${API_URL}/api/user/${projectDetails.userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUserDetails(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProjectDetails();
    getUser()
  }, []);

  return (
    <div className="ProjectPage">
      <RiseLoader
        color="fuchsia"
        loading={loading}
        size={200}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
        <div className="row mt-2">
          <div className="col">
           {projectDetails?._id && <ProjectDetails {...projectDetails} /> }
          </div>
          <div className="col">
            {userDetails?.profile && <ProfileCard {...userDetails.profile} profileData={userDetails} />}  {/*   <EditProject project={projectDetails} /> */}
          </div>
        </div>
    </div>
  );
}

export default ProjectPage;
