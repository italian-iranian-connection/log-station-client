import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import ProjectsListPage from "./pages/ProjectsListPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import UserPage from "./pages/UserPage";
import EditProfilePage from "./pages/EditProfilePage";
import ProjectPage from "./pages/ProjectPage";
import EditProjectPage from "./pages/EditProjectPage";
import ChatPage from "./pages/ChatPage";

import io from "socket.io-client";
const socket = io.connect(process.env.REACT_APP_WS_SERVER);
console.log(socket);

function App() {
  return (
    <div className="App mb-3">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />

          <Route
            path="/user/:userId"
            element={
              <IsPrivate>
                {" "}
                <UserPage />{" "}
              </IsPrivate>
            }
          />
          <Route
            path="/user/edit/:userId"
            element={
              <IsPrivate>
                {" "}
                <EditProfilePage />{" "}
              </IsPrivate>
            }
          />

          <Route
            path="/projects"
            element={
              <IsPrivate>
                {" "}
                <ProjectsListPage />{" "}
              </IsPrivate>
            }
          />
          <Route
            path="/projects/:projectId"
            element={
              <IsPrivate>
                {" "}
                <ProjectPage />{" "}
              </IsPrivate>
            }
          />
          <Route
            path="/projects/edit/:projectId"
            element={
              <IsPrivate>
                {" "}
                <EditProjectPage />{" "}
              </IsPrivate>
            }
          />

          <Route
            path="/signup"
            element={
              <IsAnon>
                {" "}
                <SignupPage />{" "}
              </IsAnon>
            }
          />
          <Route
            path="/login"
            element={
              <IsAnon>
                {" "}
                <LoginPage />{" "}
              </IsAnon>
            }
          />
        </Routes>
    </div>
  );
}

export default App;
