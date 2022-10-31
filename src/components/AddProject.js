import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const API_URL = "http://localhost:5005";

function AddProject({getAllProjects}) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [technology, setTechnology] = useState("")
    const [technologies, setTechnologies] = useState([])
    const [deploymentUrl, setDeploymentUrl] = useState("")
    const [gitRepoUrl, setGitRepoUrl] = useState("")
    const [status, setStatus] = useState("planned")
    const [screenshoot, setScreenshoot] = useState("https://res.cloudinary.com/daualsgyz/image/upload/v1667058915/log-station/m36rz07pitw0tjmprqpp.jpg")
    const navigate = useNavigate('/projects');

    const handleProjectForm = (e) => {
      e.preventDefault()
      const newProject = {name, description, technologies, deploymentUrl, gitRepoUrl, status, screenshoot}
      const storedToken = localStorage.getItem("authToken")   
      axios.post(`${API_URL}/api/projects`, newProject, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
      console.log("finally......", response.data);
      navigate('/projects');
    })
    }

    const addTecnology = (technology, e) => {
      e.preventDefault()
      if(technology){  
      setTechnologies((prevTechnologies) => {
        const newArr = [...prevTechnologies, technology]
        setTechnology("")
        return newArr
      })}
    } 

    const handleFileUpload = (e) => {
        console.log("The file to be uploaded is: ", e.target.files[0]);
        const uploadData = new FormData();
        uploadData.append("screenshoot", e.target.files[0])
        axios.post(`${API_URL}/api/upload`, uploadData)
        .then((response)=>{
          console.log(response.data.screenshoot)
        setScreenshoot(response.data.screenshoot)
        
      })
    }  

  return (

    <div className="AddProject">
    <div className='container'>
    
      <form onSubmit={(e)=> {handleProjectForm(e)}} className="form card mt-2 p-3">

      <label className="form-label">Name of your Project:*
        <input className="form-control m-2" type="text" name="name" value={name} onChange={(e)=>{setName(e.target.value)}} required placeholder="my amazing app"/>
      </label>

      <label className="form-label">What's your Project about?*
        <input className="form-control m-2" type="text" name="description" value={description} onChange={(e)=>{setDescription(e.target.value)}} required placeholder="Tell us..."/>
      </label>

      <label className="form-label">Techologies used:*
        <input className="form-control m-2" type="text" name="technologies" value={technology} onChange={(e)=>{setTechnology(e.target.value)}} placeholder="React..."/>
       <button className="btn btn-dark" onClick={(e) => {addTecnology(technology, e)}} >Add</button> 
      <p>{technologies.map((tech,index)=>{ return <span key={index}>{tech} </span>})}</p>
      </label>

      <label className="form-label">URL of your Project (if deployed):
        <input className="form-control m-2" type="text" name="deploymentUrl"  onChange={(e)=>{setDeploymentUrl(e.target.value)}} placeholder="http://my-amazing-app.com"/>
      </label>

      <label className="form-label">URL of your Project Repository on GitHub:*
        <input className="form-control m-2" type="text" name="gitRepoUrl" value={gitRepoUrl} onChange={(e)=>{setGitRepoUrl(e.target.value)}} required placeholder="https://github.com/italian-iranian-connection" />
      </label>
      
      <div className="form-check m-2" onChange={(e)=>{setStatus(e.target.value)}} >
      <p className="form-label m-2">What stage is your Project at?*</p>
      <label className="form-check-label m-2">Planned
        <input className="form-check-input m-2" type="radio" name={status} value="planned" onChange={(e)=>{setStatus(e.target.value)}} />
      </label>
      <label className="form-check-label m-2">Ongoing
        <input className="form-check-input m-2" type="radio" name={status} value="ongoing" onChange={(e)=>{setStatus(e.target.value)}} />
      </label>
      <label className="form-check-label m-2">Finished
        <input className="form-check-input  m-2" type="radio" name={status} value="finished" onChange={(e)=>{setStatus(e.target.value)}} />
      </label>
      </div> 

      <label className="form-label">Add a screenshoot of your Project:
        <input className="form-control m-2" type="file" name="screenshoot" onChange={(e)=>{handleFileUpload(e)}} />
      </label>

      <p className="form-label m-2"> Please, check if you filled in all the * fields</p>
      <button className="btn btn-dark" type="submit">Submit</button> 
      
      </form>
    </div>
    </div>
  );
}

export default AddProject;