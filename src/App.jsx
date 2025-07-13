import './App.css'
import NavBar from './components/navBar'
import { Route, Routes } from 'react-router-dom';
import { Jobs } from './pages/Jobs';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Employees from './pages/Employees';

function App() {
  return (
    <>
    <NavBar />
      <Routes>
        <Route path = "/VeraCleaningFrontend/" element = {<Home/>}/>
        <Route path = "/VeraCleaningFrontend/signin" element = {<SignIn/>}/>
        <Route path = "/VeraCleaningFrontend/jobs" element = {<Jobs/>}/>
        <Route path = "/VeraCleaningFrontend/employees" element = {<Employees/>}/>
        <Route path = "*" element = {<Home/>}/>
        <Route path = "/VeraCleaningFrontend/signout" element = {<SignIn/>}/>
        </Routes>
    </>
  )
}

export default App
