import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_ALL_BLOG_POSTS } from '../queries'; // Ensure the path is correct
import '../styles/blogStyles.css';

function BlogPage() {
    const { loading, error, data } = useQuery(GET_ALL_BLOG_POSTS);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading posts: {error.message}</div>;

    return (
        <div className="blog-page">
            <nav className="blog-nav">
                <Link to="/" className="home-link">@VarinderSingh</Link>
            </nav>
            <div className="blog-content">
                <h1>Blog</h1>
                <ul className="blog-list">
                    {data.getAllBlogPosts.map(({ id, slug, date, title }) => (
                        <li key={id}>
                            <Link to={`/blog/${slug}`}>
                                <span className="blog-date">{date}</span> &nbsp; {title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default BlogPage;
