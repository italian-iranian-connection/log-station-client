import axios from "axios";
import { useState, useEffect } from "react";
import RiseLoader from "react-spinners/RiseLoader";
import AddProject from "../components/AddProject";
import ProjectCard from "../components/ProjectCard";
import { Link } from "react-router-dom";

function ProjectsListPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const style = { textDecoration: "none", color: "black" };

  const getAllProjects = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/projects`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const updateList = () => {
    getAllProjects()
  }

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div className="ProjectsListPage">
      <RiseLoader
        color="yellow"
        loading={loading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <div className="container">
        <div className="row mt-2">
          <div className="col-12 col-lg-6">
            {projects.map((project) => {
              return <ProjectCard {...project} key={project._id} />;
            })}
          </div>

          <div className="col-12 col-lg-6">
            <AddProject updateList={updateList} />
            <div className="container mt-2">
              <div className="card p-5">
                <Link to="/user/edit/:userId" style={style}>
                  <h1>
                    Create your profile and start collaborating with other
                    developers like you!
                  </h1>
                  <button className="btn btn-dark mt-2">Profile</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectsListPage;
