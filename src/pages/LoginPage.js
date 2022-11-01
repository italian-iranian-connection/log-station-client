import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context';
import "./LoginPage.css";
import image from "./door-logo.jpg"
 
function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  
  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext); 

 
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
 
  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
 
    axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, requestBody)
      .then((response) => {
      // Request to the server's endpoint `/auth/login` returns a response
      // with the JWT string ->  response.data.authToken
        console.log('JWT token', response.data.authToken );

        storeToken(response.data.authToken);

        authenticateUser();
        setEmail("");
        setPassword("");
      
        navigate('/');                                
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };


  
  return (
    <div className="LoginPage">

    <div className="container frame">
      <div className="login-img"><img style={{height: "450px", maxWidth: "350px", borderRadius: "15%", filter: "invert(90%)"}} src={image} /></div>
      <div className="login">
      <h1>Login</h1>
 
      <form onSubmit={handleLoginSubmit}>

      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form2Example1">Email</label>
        <input 
        id="form2Example1"
        className="form-control"
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
        />
        </div>
 
        <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form2Example1">Password</label>
        <input
        id="form2Example1"
        className="form-control"
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
   </div>
        <button type="submit" className="btn btn-outline-success">Login</button>
      </form>
      { errorMessage && <p className="error-message">{errorMessage}</p> }
 
      <p>Don't have an account yet?</p>
      <Link className="btn btn-outline-success" to={"/signup"}> Sign Up</Link>
      </div>
    </div>
    </div>

  )
}
 
export default LoginPage;