import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RiseLoader from "react-spinners/RiseLoader";
import ProjectDetails from "../components/ProjectDetails";
import ProfileCard from "../components/user/ProfileCard";

function ProjectPage() {
  const [projectDetails, setProjectDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const { projectId } = useParams();
  const storedToken = localStorage.getItem("authToken");

  const getProjectDetails = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((projectDetails) => {
        setProjectDetails(projectDetails.data);
        setLoading(false);
        getUser(projectDetails.data.userId)

      });
  };

  const getUser = (ownerId) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/${ownerId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUserDetails(response.data)
        setLoading(false);
      })
      .catch((error) => console.log(error))
  };

  useEffect(() => {
    getProjectDetails();
  }, []);

  

  return (
    <div className="ProjectPage">
      <RiseLoader
        color="yellow"
        loading={loading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
           {userDetails?.profile?._id  &&
           <div className="row mt-2">
           <div className="col-12 col-lg-6">
           <ProjectDetails {...projectDetails} /> 
          </div>
          <div className="col-12 col-lg-6">
          <ProfileCard {...userDetails.profile} />   
          </div>
          </div>
          }
    </div>
  );
}

export default ProjectPage;
