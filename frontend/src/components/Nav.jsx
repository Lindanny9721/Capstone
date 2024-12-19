import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) setIsLoggedIn(true);
        else setIsLoggedIn(false);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
    };
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <ul className="navbar-links">
                    <li><Link to="/" className="navbar-link">Home</Link></li>
                    {isLoggedIn ? (
                        <>
                            <li><Link to="/map" className="navbar-link">Map</Link></li>
                            <li><Link to="/planlist" className="navbar-link">Plans</Link></li>
                            <li><button onClick={handleLogout} className="navbar-link">Logout</button></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/map" className="navbar-link">Map</Link></li>
                            <li><Link to="/login" className="navbar-link">Login</Link></li>
                            <li><Link to="/signup" className="navbar-link">Sign Up</Link></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
