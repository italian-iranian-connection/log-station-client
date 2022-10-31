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
  const [userDetails, setUserDetails] = useState(null)
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

  const getUser = () => {

    axios.get(`${API_URL}/api/user/${user._id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(response => {
         setUserDetails(response.data)
      })
      .catch((error) => console.log(error));
 }

  useEffect(() => {
    getProjectDetails();
    getUser()
    console.log(user);
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

      {projectDetails?._id && (
        <div className="row">
          <div className="col">
            <ProjectDetails {...projectDetails} />
          </div>
          <div className="col">
            {(user._id === projectDetails.userId && userDetails.profile) ? (
              <EditProject project={projectDetails} />
            ) : (
              <ProfileCard {...userDetails.profile} profileData={userDetails} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectPage;
