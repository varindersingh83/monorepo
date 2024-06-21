// packages/frontend/src/pages/AdminLoginPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { jwtDecode } from 'jwt-decode'; // Use named import
import '../styles/adminLoginPage.css';

const AdminLoginPage = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get('username');
        const password = formData.get('password');

        console.log('Form submitted with:', { username, password });

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                const { token } = data;
                localStorage.setItem('token', token);

                try {
                    const decodedUser = jwtDecode(token);
                    setUser(decodedUser);
                    console.log('Login successful');
                    navigate('/blog');
                } catch (error) {
                    console.error('Error decoding token:', error);
                }
            } else {
                console.log('Login failed');
                navigate('/admin');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="admin-container">
            <nav className="admin-nav">
                <a href="/" className="home-link">Home</a>
            </nav>
            <div className="form-wrapper">
                <form onSubmit={handleSubmit} className="admin-form">
                    <h1>Admin Login</h1>
                    <div>
                        <label>Username:</label>
                        <input type="text" name="username" required />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password" required />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLoginPage;
