import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
  const style = { textDecoration: "none", color: "black" };


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
    <div className="ProjectPage p-4">
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
          
          <div className="card p-4 mt-2">
            <Link to="/chat" style={style}>
            <h5>Contact <em className="text-capitalize">{userDetails.name}</em> and start collaborating on this project!</h5>
              <button className="btn btn-warning m-2">Start Conversation</button>
            </Link>
            </div>
          </div>
          </div>
          }
    </div>
  );
}

export default ProjectPage;
