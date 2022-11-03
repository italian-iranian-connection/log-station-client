import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import image from "../images/default-img/door-logo.jpg";


function LoginPage() {
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

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, requestBody)
      .then((response) => {
        // Request to the server's endpoint `/auth/login` returns a response
        // with the JWT string ->  response.data.authToken
        console.log("JWT token", response.data.authToken);
        storeToken(response.data.authToken);
        authenticateUser();
        setEmail("");
        setPassword("");
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="container card LoginPage border-0 shadow-none" style={{display: "flex" }}>
  <div class="row justify-content-md-center">

  <div class="col-lg-5" style={{marginTop: "10%" }}>
          <div className="frame">
            <img
              style={{
                height: "450px",
                maxWidth: "350px",
                borderRadius: "15%",
                filter: "invert(90%)",
              }}
              src={image}
              alt="door open"
            />
          </div>
        </div>

        <div class="col-lg-5" style={{marginTop: "10%", padding: "10px"}}>
          <h1>Login</h1>
          <form onSubmit={handleLoginSubmit} className="form">
            <div className="form-outline mb-2" >
              <label className="form-label">
                Email
                <input
                  className="form-control mt-2"
                  type="email"
                  name="email"
                  value={email}
                  required
                  onChange={handleEmail}
                />
              </label>
            </div>

            <div className="form-outline mb-4">
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
            <button type="submit" className="btn btn-warning mb-3">
              Login
            </button>
          </form>

          {errorMessage && (
            <p className="error-message text-uppercase">- {errorMessage} -</p>
          )}

          <div className="mt-5">
            <p>Don't have an account yet?</p>
            <Link className="btn btn-warning" to={"/signup"}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>

  );
}

export default LoginPage;
