import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_BLOG_POST } from '../queries'; // Ensure the path is correct
import '../styles/adminLoginPage.css'; // Corrected import path

const AddBlogPage = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [body, setBody] = useState('');
    const [addBlogPost] = useMutation(ADD_BLOG_POST);

    const generateSlug = (title) => {
        return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    };

    const handleSave = async () => {
        const slug = generateSlug(title);
        await addBlogPost({ variables: { slug, title, date, body } });
        navigate('/blog');
    };

    return (
        <div className="admin-container">
            <nav className="admin-nav">
                <a href="/" className="home-link">Home</a>
            </nav>
            <div className="form-wrapper">
                <form className="admin-form">
                    <h1>Add Blog Post</h1>
                    <label>
                        Title:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Date:
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Body:
                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                    </label>
                    <br />
                    <button type="button" onClick={handleSave}>Save</button>
                </form>
            </div>
        </div>
    );
};

export default AddBlogPage;
