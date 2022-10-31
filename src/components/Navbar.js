import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";                     
import { AuthContext } from "../context/auth.context";

function Navbar(){

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");


console.log(user)

    return (
        <nav>
          <Link to="/">
            <button>Home</button>
          </Link>

          {isLoggedIn && (
        <>
          <Link to="/projects">
            <button>Projects</button>
          </Link>        

          <button onClick={logOutUser}>Logout</button>
          <span>{user && `Welcome ${user.name}`}</span>
          <span>{user && <Link to={`/user/${user._id}`}><button>Profile</button></Link>}</span>

        </>
      )}
 
      {!isLoggedIn && (
        <>
          <Link to="/signup"> <button>Sign Up</button> </Link>
          <Link to="/login"> <button>Login</button> </Link>
        </>
      )}

        </nav>
      );
}

export default Navbar;