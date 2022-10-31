import './App.css';
import { Routes, Route } from "react-router-dom"; 
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import ProjectsListPage from './pages/ProjectsListPage';
import SignupPage from "./pages/SignupPage"; 
import LoginPage from "./pages/LoginPage"; 
import IsPrivate from './components/IsPrivate';
// import IsAnon from "./components/IsAnon";
import UserPage from './pages/UserPage';
import AddProfile from './components/user/AddProfile';
import ProfileCard from './components/user/ProfileCard';
import EditProfilePage from './pages/EditProfilePage';
import ProjectPage from './pages/ProjectPage';

function App() {
  return (
    <div className="App mb-3">
    
      <Navbar />
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        {/* <Route path="/projects" element={ <IsPrivate> <ProjectListPage /> </IsPrivate> }  />
        <Route path="/createprofile" element={ <IsPrivate> <UserPage /> </IsPrivate> } />
        <Route path="/signup" element={ <IsAnon> <SignupPage /> </IsAnon> } />
        <Route path="/login" element={ <IsAnon> <LoginPage /> </IsAnon> } />  */}

        <Route path="/user/:userId" element={ <UserPage /> } />
        <Route path="/user/edit/:userId" element={<EditProfilePage />} />
        {/* <Route path="/user/profile/:userId" element={<AddProfile />} /> */}
        <Route path="/projects" element={ <ProjectsListPage /> } />
        <Route path='/projects/:projectId' element={ <IsPrivate> <ProjectPage /> </IsPrivate> } />
        {/* <Route path="/user/:userId/" element={ <UserPage /> } /> */}

        <Route path="/signup" element={ <SignupPage /> }  />
        <Route path="/login" element={ <LoginPage /> } />
      </Routes>
      </div>

    
  );
}

export default App;
