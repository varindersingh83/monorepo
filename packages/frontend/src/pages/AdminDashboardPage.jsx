import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboardPage = () => {
    const navigate = useNavigate();

    const navigateToAddBlog = () => {
        navigate('/admin/add-blog');
    };

    return (
        <div>
            <h1>Welcome, Admin</h1>
            <a href="/logout">Logout</a>
            <button onClick={navigateToAddBlog}>Add Blog</button>
        </div>
    );
};

export default AdminDashboardPage;
