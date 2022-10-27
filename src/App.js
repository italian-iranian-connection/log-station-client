import './App.css';
import { Routes, Route } from "react-router-dom"; 

import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import ProjectListPage from './pages/ProjectListPage';
import SignupPage from "./pages/SignupPage"; 
import LoginPage from "./pages/LoginPage"; 
import IsPrivate from './components/IsPrivate';
import IsAnon from "./components/IsAnon";
import UserPage from './pages/UserPage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/projects" element={ <IsPrivate> <ProjectListPage /> </IsPrivate> }  />
        <Route path="/createprofile" element={ <IsPrivate> <UserPage /> </IsPrivate> } />
        <Route path="/signup" element={ <IsAnon> <SignupPage /> </IsAnon> } />
        <Route path="/login" element={ <IsAnon> <LoginPage /> </IsAnon> } />
      </Routes>

    </div>
  );
}

export default App;
