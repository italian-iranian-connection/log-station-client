import axios from "axios";
import { useState, useEffect, useContext } from "react";
import RiseLoader from "react-spinners/RiseLoader";
import AddProject from "../components/AddProject";
import ProjectCard from "../components/ProjectCard";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import LoginPage from "./LoginPage";

const API_URL = "http://localhost:5005";

function ProjectsListPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const style = { textDecoration: "none", color: "fuchsia" };

  const { isLoggedIn } = useContext(AuthContext);

  const getAllProjects = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/projects`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div className="ProjectsListPage">
      <RiseLoader
        color="fuchsia"
        loading={loading}
        size={200}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <div className="container">
        <div className="row mt-2">
          <div className="col">
            {projects.map((project) => {
              return <ProjectCard {...project} key={project._id} />;
            })}
          </div>
          {isLoggedIn ? (
            <div className="col-12 col-lg-6">
              <AddProject />
            </div>
          ) : (
            <div className="col-12 col-lg-6 mt-2">
              <div className="card p-5">
                <Link to="/signup" style={style}>
                  <h1 className="danger">
                    Sign Up and start collaborating with other developers like
                    you!
                  </h1>
                </Link>
              </div>
              <div className="card p-5 mt-2">
                <LoginPage />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectsListPage;
