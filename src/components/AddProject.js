import axios from "axios";
import { useState } from "react";

const API_URL = "http://localhost:5005";

//const storedToken = localStorage.getItem("authToken");
//{ headers: { Authorization: `Bearer ${storedToken}` } }

function AddProject() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [technology, setTechnology] = useState("")
    const [technologies, setTechnologies] = useState([])
    const [deploymentUrl, setDeploymentUrl] = useState("")
    const [gitRepoUrl, setGitRepoUrl] = useState("")
    const [status, setStatus] = useState("")
    const [screenshoot, setScreenshoot] = useState("")


    const handleProjectForm = (e) => {
      e.preventDefault()
      console.log(name, description,technologies,deploymentUrl,gitRepoUrl,status,screenshoot)
      

    }

    const addTecnology = (technology, event) => {
      
      if(technology){
        
      setTechnologies((prevTechnologies) => {
        const newArr = [...prevTechnologies, technology]
        setTechnology("")
        
        return newArr
      })}
    } 

  return (

    <div className="AddProject">
    <div className='container'>
    
      <form onSubmit={handleProjectForm} className="form card mt-4 p-5">

      <label className="form-label">Name of your Project:
        <input className="form-control m-2" type="text" name="name" value={name} onChange={(e)=>{setName(e.target.value)}} required placeholder="my amazing app"/>
      </label>

      <label className="form-label">What's your Project about?
        <input className="form-control m-2" type="text" name="description" value={description} onChange={(e)=>{setDescription(e.target.value)}} required placeholder="Tell us..."/>
      </label>

      <label className="form-label">Techologies used:
        <input className="form-control m-2" type="text" name="technologies" value={technology} onChange={(e)=>{setTechnology(e.target.value)}} placeholder="React..."/>
        <button className="btn btn-dark" onClick={(event) => {addTecnology(technology)}} >Add</button>
      </label>

      <label className="form-label">URL of your Project (if deployed):
        <input className="form-control m-2" type="text" name="deploymentUrl" value={deploymentUrl} onChange={(e)=>{setDeploymentUrl(e.target.value)}} placeholder="http://my-amazing-app.com"/>
      </label>

      <label className="form-label">URL of your Project Repository on GitHub:
        <input className="form-control m-2" type="text" name="gitRepoUrl" value={gitRepoUrl} onChange={(e)=>{setGitRepoUrl(e.target.value)}} required placeholder="https://github.com/italian-iranian-connection" />
      </label>
      
      <div className="form-check m-2" onChange={(e)=>{setStatus(e.target.value)}} >
      <label className="form-label m-2">What stage is your Project at?
      <label className="form-check-label m-2">Planned
        <input className="form-check-input m-2" type="radio" name={status} value="planned" onChange={(e)=>{setStatus(e.target.value)}}  />
      </label>
      <label className="form-check-label m-2">Ongoing
        <input className="form-check-input m-2" type="radio" name={status} value="ongoing" onChange={(e)=>{setStatus(e.target.value)}} />
      </label>
      <label className="form-check-label m-2">Finished
        <input className="form-check-input  m-2" type="radio" name={status} value="finished" onChange={(e)=>{setStatus(e.target.value)}} />
      </label>
      </label>
      </div> 

      <label className="form-label">Add a screenshoot of your Project:
        <input className="form-control m-2" type="file" name="screenshoot" value={screenshoot} onChange={(e)=>{setScreenshoot(e.target.value)}} />
      </label>
      <button className="btn btn-dark" type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
}

export default AddProject
