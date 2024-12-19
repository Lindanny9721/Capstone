import { Link } from "react-router-dom";
import SignUp from "../components/SignUp";
import Navbar from "../components/Nav";

export default function SignUpPage() {
    return (
        <div className="login">
            <Navbar/>
            <SignUp/>
            <Link to='/login'> Have an have a account?</Link>
        </div>
    );
}