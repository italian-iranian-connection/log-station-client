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
import EditProfilePage from './pages/EditProfilePage';
import ProjectPage from './pages/ProjectPage';
import EditProjectPage from './pages/EditProjectPage';

function App() {
  return (
    <div className="App mb-3">
    
      <Navbar />
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        
        {/* <Route path="/createprofile" element={ <IsPrivate> <UserPage /> </IsPrivate> } />
        <Route path="/signup" element={ <IsAnon> <SignupPage /> </IsAnon> } /> 
        <Route path="/login" element={ <IsAnon> <LoginPage /> </IsAnon> } />    */}

        <Route path="/projects" element={ <ProjectsListPage /> } />
        <Route path="/user/:userId" element={ <UserPage /> } />
        <Route path="/user/edit/:userId" element={<EditProfilePage />} />
        
        <Route path="/projects" element={ <ProjectsListPage /> } />
        <Route path='/projects/:projectId' element={ <IsPrivate> <ProjectPage /> </IsPrivate> } />
        <Route path='/projects/edit/:projectId' element={ <IsPrivate> <EditProjectPage /> </IsPrivate> } />

        <Route path="/signup" element={ <SignupPage /> }  />
        <Route path="/login" element={ <LoginPage /> } />
      </Routes>
      </div>

    
  );
}

export default App;
