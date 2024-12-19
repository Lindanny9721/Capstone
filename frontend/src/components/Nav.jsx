import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <ul className="navbar-links">
                    <li><Link to="/" className="navbar-link">Home </Link></li>
                    <li><Link to="/login" className="navbar-link">Login </Link></li>
                    <li> <Link to="/signup" className="navbar-link">Sign Up </Link> </li>
                    <li><Link to ="/map" className="navbar-link"> Map</Link> </li>
                    {/* <li><Link to="/plan" className="navbar-link">Plan </Link></li> */}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
