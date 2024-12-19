import { useState } from "react";
import axios from "axios";
const SignUp = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
        ...userData,
        [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userData.username || !userData.email || !userData.password) {
            setError('All fields are required.');
            return;
        }
        setError('');
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/signup`, userData);
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            window.location.href = "/map";
        } catch (error) {
            setLoading(false);
            console.log(error.response);
            setError(error.response.data.error);
        }
        
    };

    return (
        <div>
        <h2>Sign Up</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="username">Username</label>
            <input
                type="text"
                id="username"
                name="username"
                value={userData.username}
                onChange={handleChange}
                placeholder="Enter a username"
            />
            </div>

            <div>
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Enter your email"
            />
            </div>

            <div>
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="Enter your password"
            />
            </div>

            <button type="submit" disabled={loading}>Sign Up</button>
        </form>
        </div>
    );
};

export default SignUp;
