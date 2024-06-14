import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import BlogPost from './pages/BlogPost';
import ContactPage from './pages/ContactPage';
import ProjectsPage from './pages/ProjectsPage';
import NotFoundPage from './pages/NotFoundPage'; // Ensure this path is correct
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AddBlogPage from './pages/AddBlogPage'; // Add this import

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/admin" element={<AdminLoginPage />} />
                <Route path="/admin_dashboard" element={<AdminDashboardPage />} />
                <Route path="/admin/add-blog" element={<AddBlogPage />} /> {/* Add this route */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
}

export default App;
