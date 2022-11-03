import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";
import image from "./door-logo.jpg";

// const API_URL = "http://localhost:5005";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupPage">
      <div className="container frame">
        <div className="login-img">
          <img
            style={{
              height: "450px",
              maxWidth: "350px",
              borderRadius: "15%",
              filter: "invert(10%)",
            }}
            src={image}
          />
        </div>
        <div className="login">
          <h1>Sign Up</h1>

          <form onSubmit={handleSignupSubmit}>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="form2Example1">
                Name
              </label>
              <input
                id="form2Example1"
                className="form-control"
                type="text"
                name="name"
                value={name}
                onChange={handleName}
              />
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="form2Example1">
                Email
              </label>
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
              <label className="form-label" htmlFor="form2Example1">
                Password
              </label>
              <input
                id="form2Example1"
                className="form-control"
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
              />
            </div>

            <button className="btn btn-outline-warning" type="submit">
              Sign Up
            </button>
          </form>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <p>Already have account?</p>
          <Link className="btn btn-outline-warning" to={"/login"}>
            {" "}
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
