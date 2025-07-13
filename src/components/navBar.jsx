import { Link, useNavigate } from "react-router-dom";
import "../css/NavBar.css";

export default function NavBar() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("manager");
    navigate("/VeraCleaningFrontend/signin");
  };

  return (
    <nav className="navbar">
      <Link to="/VeraCleaningFrontend/">Home</Link>
      <Link to="/VeraCleaningFrontend/signin">Sign In</Link>
      <Link to="/VeraCleaningFrontend/jobs">Jobs</Link>
      <Link to="/VeraCleaningFrontend/employees">Employees</Link>
      <Link to="/VeraCleaningFrontend/signout" onClick={handleSignOut}>Sign Out</Link>
    </nav>
  );
}
