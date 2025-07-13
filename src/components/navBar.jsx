import { Link, useNavigate } from "react-router-dom";
import '../css/NavBar.css';

export default function NavBar() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("manager");
    navigate("/SignIn");
  };

  return (
    <nav className="navbar">
      <Link to="/VeraCleaningFrontend/">Home</Link>
      <Link to="/VeraCleaningFrontend/SignIn">Sign In</Link>
      <Link to="/VeraCleaningFrontend/Jobs">Jobs</Link>
      <Link to="/VeraCleaningFrontend/employees">Employees</Link>
      <Link to="/VeraCleaningFrontend/signout">Sign Out</Link>
    </nav>
  );
}
