import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <>
            <Link to='/'> Home | </Link>
            <Link to='/SignIn'>  Sign In | </Link>
            <Link to='/Jobs'>  Jobs | </Link>
            <Link to='/employees'>  Employees</Link>
        </>
    );
}