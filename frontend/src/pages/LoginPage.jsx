import Login from "../components/Login";
import { Link } from "react-router-dom";
import Navbar from "../components/Nav";

export default function LoginPage() {
    return (
        <div className="login">
            <Navbar/>
            <Login/>
            <Link to='/signup'> Don't have a account?</Link>
        </div>
    );
}