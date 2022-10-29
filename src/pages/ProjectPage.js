import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RiseLoader from "react-spinners/RiseLoader";
import ProjectDetails from "../components/ProjectDetails";
import ProfileCard from "../components/user/ProfileCard";

const API_URL = "http://localhost:5005";

function ProjectPage() {
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);
  const { projectId } = useParams();

  const getProjectDetails = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((projectDetails) => {
        setProject(projectDetails.data);
        setLoading(false)
      });
  };
  
  useEffect(() => {
    getProjectDetails();
  }, []);
  
    const details = (
        <div className="row mt-2">
          <div className="col col-lg-6">
            <ProjectDetails {...project} />
          </div>
          <div className="col col-lg-6">
            <ProfileCard />
          </div>
        </div>
      );

  return (
    <div className="ProjectPage">
      <RiseLoader
        color="fuchsia"
        loading={loading}
        size={200}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      {!loading && details}
    </div>
  );
}

export default ProjectPage;
