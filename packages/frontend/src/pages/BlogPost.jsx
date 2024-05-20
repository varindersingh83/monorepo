import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_BLOG_POST } from '../queries'; // Ensure the path is correct
import '../styles/blogStyles.css';

function BlogPost() {
    const { slug } = useParams();
    const { loading, error, data } = useQuery(GET_BLOG_POST, { variables: { slug } });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading post: {error.message}</div>;

    const post = data.getBlogPost;

    return (
        <div className="blog-page"> {/* Use the same class as BlogPage */}
            <nav className="blog-nav">
                <Link to="/" className="home-link">@VarinderSingh</Link>
                <span className="blog-text"> / </span>
                <Link to="/blog" className="home-link">Blog</Link>
            </nav>
            <div className="blog-content">
                <h1>{post.title}</h1>
                <p>{post.date}</p>
                <article>{post.body}</article>
            </div>
        </div>
    );
}

export default BlogPost;
