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
      <Link to="/">Home</Link>
      <Link to="/SignIn">Sign In</Link>
      <Link to="/Jobs">Jobs</Link>
      <Link to="/employees">Employees</Link>
      <a href="/SignIn" onClick={handleSignOut} className="signout-link">Sign Out</a>
    </nav>
  );
}
