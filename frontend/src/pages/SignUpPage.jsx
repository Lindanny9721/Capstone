import { Link } from "react-router-dom";
import SignUp from "../components/SignUp";
import Navbar from "../components/Nav";

export default function SignUpPage() {
    return (
        <div>
            <Navbar/>
            <div className="signup-body">
                <div className = "signup-container">
                    <SignUp/>
                    <Link to='/login'> Have an have a account?</Link>
                </div>
            </div>
        </div>
    );
}