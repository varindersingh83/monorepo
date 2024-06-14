import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/adminLoginPage.css';

const AdminLoginPage = () => {
    const navigate = useNavigate();

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
                console.log('Login successful');
                navigate('/admin_dashboard');
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
