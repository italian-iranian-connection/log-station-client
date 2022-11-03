import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import image from "../images/default-img/door-logo.jpg";

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
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupPage p-5">
      <div className="row">
        <div className="col col-lg-6 mt-5">
          <div className="container frame">
            <img
              style={{
                height: "450px",
                maxWidth: "350px",
                borderRadius: "15%",
                filter: "invert(10%)",
              }}
              src={image}
              alt="open door"
            />
          </div>
        </div>

        <div className="col col-lg-6 mt-5">
          <h1>Sign Up</h1>
          <form onSubmit={handleSignupSubmit} className="form">
            <div className="form-outline mb-2">
              <label className="form-label">
                Email
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={email}
                  required
                  onChange={handleEmail}
                />
              </label>
            </div>

            <div className="form-outline mb-2">
              <label className="form-label">
                Password
                <input
                  className="form-control mt-2"
                  type="password"
                  name="password"
                  value={password}
                  required
                  onChange={handlePassword}
                />
              </label>
            </div>

            <div className="form-outline mb-4">
              <label className="form-label">
                Name
                <input
                  className="form-control mt-2"
                  type="text"
                  name="name"
                  value={name}
                  required
                  onChange={handleName}
                />
              </label>
            </div>
            <button className="btn btn-warning mb-3" type="submit">
              Sign Up
            </button>
          </form>

          {errorMessage && (
            <p className="error-message text-uppercase">- {errorMessage} -</p>
          )}

          <div className="mt-5">
            <p>Already have account?</p>
            <Link className="btn btn-warning" to={"/login"}>
              {" "}
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
