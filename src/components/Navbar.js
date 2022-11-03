import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import "./Navbar.css";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");

  console.log(user);

  return (
    <nav className="nav">
      <div>
        <NavLink to="/">
          <button id="home" className="navButton">
            Home
          </button>
        </NavLink>
      </div>
      <div>
        <a href="/#about">
          <button className="navButton">About</button>
        </a>
      </div>
      {isLoggedIn && (
        <>
          <div>
            <NavLink to="/projects">
              <button className="navButton">Projects</button>
            </NavLink>
          </div>

          {/* <div>
            <span>{user && `Welcome ${user.name}`}</span>{" "}
          </div> */}

          <div>
            <span>
              {user && (
                <NavLink to={`/user/${user._id}`}>
                  <button className="navButton">Profile</button>
                </NavLink>
              )}
            </span>
          </div>

          <div>
            <NavLink to="/">
              <button className="navButton endBtn" onClick={logOutUser}>
                Logout
              </button>
            </NavLink>{" "}
          </div>
        </>
      )}

      {!isLoggedIn && (
        <>
          <div>
            <NavLink to="/signup">
              {" "}
              <button className="navButton">Sign Up</button>{" "}
            </NavLink>
          </div>
          <div>
            <NavLink to="/login">
              {" "}
              <button className="navButton endBtn">Login</button>{" "}
            </NavLink>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;
