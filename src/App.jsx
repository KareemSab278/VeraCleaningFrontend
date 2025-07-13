import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/navBar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Jobs from './pages/Jobs';
import Employees from './pages/Employees';
import './App.css';




function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/VeraCleaningFrontend/" element={<Home />} />
        <Route path="/VeraCleaningFrontend/signin" element={<SignIn />} />
        <Route
          path="/VeraCleaningFrontend/jobs"
          element={
            <PrivateRoute>
              <Jobs />
            </PrivateRoute>
          }
        />
        <Route
          path="/VeraCleaningFrontend/employees"
          element={
            <PrivateRoute>
              <Employees />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Home />} />
        <Route path="/VeraCleaningFrontend/signout" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
