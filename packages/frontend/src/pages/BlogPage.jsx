import React, { useContext } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_BLOG_POSTS, DELETE_BLOG_POST } from '../queries';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserContext';
import '../styles/blogStyles.css';

const BlogPage = () => {
  const { loading, error, data } = useQuery(GET_ALL_BLOG_POSTS);
  const [deleteBlogPost] = useMutation(DELETE_BLOG_POST, {
    context: {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  console.log('User context:', user);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts: {error.message}</div>;

  const handleDelete = async (id) => {
    try {
      await deleteBlogPost({ variables: { id } });
      toast.success('Blog post deleted successfully!');
      window.location.reload();
    } catch (err) {
      toast.error('Failed to delete blog post.');
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-blog/${id}`);
  };

  const handleView = (slug) => {
    navigate(`/blog/${slug}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out successfully!');
    navigate('/');
  };

  return (
    <div className="blog-page">
      <nav className="blog-nav">
        <a href="/" className="home-link">@VarinderSingh</a>
        {user?.email === 'varinder83singh@gmail.com' ? (
          <>
            <span>Logged in as Admin</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          console.log('User is not authorized or user is undefined')
        )}
      </nav>
      <h1>Blog</h1>
      <ul>
        {data.getAllBlogPosts.map((post) => (
          <li key={post.id}>
            {user?.email === 'varinder83singh@gmail.com' && (
              <>
                <button onClick={() => handleEdit(post.id)}>✏️</button>
                <button onClick={() => handleDelete(post.id)}>🗑️</button>
              </>
            )}
            <span onClick={() => handleView(post.slug)}>{post.date} - {post.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPage;
