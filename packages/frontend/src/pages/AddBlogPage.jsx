import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_BLOG_POST, UPDATE_BLOG_POST, GET_BLOG_POST } from '../queries';
import { useParams, useNavigate } from 'react-router-dom'; // Updated import
import { toast } from 'react-toastify';
import '../styles/adminLoginPage.css';
import { nanoid } from 'nanoid'; // Import nanoid to generate unique IDs

const AddBlogPage = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Updated usage
    const [formData, setFormData] = useState({ slug: '', title: '', date: '', body: '' });
    const { loading, data } = useQuery(GET_BLOG_POST, { variables: { slug: id }, skip: !id });

    const [addBlogPost] = useMutation(ADD_BLOG_POST);
    const [updateBlogPost] = useMutation(UPDATE_BLOG_POST);

    useEffect(() => {
        if (data) {
            setFormData(data.getBlogPost);
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Generate a unique slug if it is empty
            if (!formData.slug) {
                formData.slug = nanoid();
            }

            if (id) {
                await updateBlogPost({ variables: { ...formData, id: parseInt(id) } });
                toast.success('Blog post updated successfully!');
            } else {
                await addBlogPost({ variables: formData });
                toast.success('Blog post added successfully!');
            }
            navigate('/blog'); // Updated usage
        } catch (err) {
            toast.error('Failed to save blog post.');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="admin-container">
            <nav className="admin-nav">
                <a href="/" className="home-link">Home</a>
            </nav>
            <div className="form-wrapper">
                <form className="admin-form" onSubmit={handleSubmit}>
                    <h1>{id ? 'Edit' : 'Add'} Blog Post</h1>
                    <label>
                        Title:
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Date:
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Body:
                        <textarea
                            name="body"
                            value={formData.body}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">{id ? 'Update' : 'Add'} Blog Post</button>
                </form>
            </div>
        </div>
    );
};

export default AddBlogPage;
