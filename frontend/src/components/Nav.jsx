import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <ul className="navbar-link">
                    <li><Link to="/" className="navbar-link">Home </Link></li>
                    <li><Link to="/login" className="navbar-link">Login </Link></li>
                    <li> <Link to="/signup" className="navbar-link">Sign In </Link> </li>
                    {/* <li><Link to="/plan" className="navbar-link">Plan </Link></li> */}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
