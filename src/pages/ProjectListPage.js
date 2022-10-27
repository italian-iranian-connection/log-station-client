import axios from "axios";
import { useState, useEffect } from "react";
import {Link} from "react-router-dom"

// import AddProject from "../components/AddProject"; 

import ProjectCard from "../components/ProjectCard";

const API_URL = "http://localhost:5005";


function ProjectListPage(){
    const [projects, setProjects] = useState([]);

    
    const getAllProjects = ()=>{

        const storedToken = localStorage.getItem("authToken");

        axios.get(`${API_URL}/api/projects`, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(response=>{
            setProjects(response.data)
        })
        .catch((error) => console.log(error));
    }

    useEffect(()=>{
        getAllProjects();
    }, [])

    return(
        <div className="ProjectListPage">

            <h1>All Projects</h1>

        {/* <AddProject refreshProjects={getAllProjects} /> */}

      
        {projects.map((project) => {
         return <ProjectCard key={project._id} {...project} />
        })}     
       
    </div>
    )

}

export default ProjectListPage;