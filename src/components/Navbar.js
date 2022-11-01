import axios from "axios";
import { Link } from "react-router-dom";
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
        <Link to="/">
          <button className="navButton">Home</button>
        </Link>
      </div>
      {isLoggedIn && (
        <>
          <div>
            <Link to="/projects">
              <button className="navButton">Projects</button>
            </Link>
          </div>



          {/* <div>
            <span>{user && `Welcome ${user.name}`}</span>{" "}
          </div> */}

          <div>
            <span>
              {user && (
                <Link to={`/user/${user._id}`}>
                  <button className="navButton">Profile</button>
                </Link>
              )}
            </span>
          </div>

          <div>
            <Link to="/">
              <button className="navButton endBtn" onClick={logOutUser}>
                Logout
              </button>
            </Link>{" "}
          </div>

        </>
      )}

      {!isLoggedIn && (
        <>
          <div>
            <Link to="/signup">
              {" "}
              <button className="navButton">Sign Up</button>{" "}
            </Link>
          </div>
          <div>
            <Link to="/login">
              {" "}
              <button className="navButton endBtn">Login</button>{" "}
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;
