import Login from "../components/Login";
import { Link } from "react-router-dom";
import Navbar from "../components/Nav";

export default function LoginPage() {
    return (
        <div>
            <Navbar/>
            <div className="login-body">
                <div className="login-container">
                    <Login/>
                    <Link className = "login-link"to='/signup'> Don't have a account?</Link>
                </div>
            </div>
        </div>
    );
}