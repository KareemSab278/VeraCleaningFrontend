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
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/signin" element = {<SignIn/>}/>
        <Route path = "/jobs" element = {<Jobs/>}/>
        <Route path = "/employees" element = {<Employees/>}/>
        </Routes>
    </>
  )
}

export default App
