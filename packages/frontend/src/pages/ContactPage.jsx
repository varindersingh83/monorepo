// packages/frontend/src/pages/ContactPage.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import '../styles/contactPage.css'; // Ensure the correct path
import '../styles/blogStyles.css'; // Ensure the correct path

const SUBMIT_CONTACT_FORM = gql`
    mutation SubmitContactForm($name: String!, $email: String!, $message: String!) {
        submitContactForm(name: $name, email: $email, message: $message) {
            success
            message
        }
    }
`;

function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitContactForm, { data, loading, error }] = useMutation(SUBMIT_CONTACT_FORM);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await submitContactForm({ variables: { name, email, message } });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="contact-container">
            <nav className="contact-nav">
                <Link to="/" className="home-link">@VarinderSingh</Link>
            </nav>
            <div className="form-wrapper">
                <form className="contact-form" onSubmit={handleSubmit}>
                    <h1>Ask me anything!</h1>
                    <div>
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div>
                        <label>Content</label>
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                    </div>
                    <button type="submit" disabled={loading}>Submit</button>
                    {data && <p>{data.submitContactForm.message}</p>}
                    {error && <p>Error submitting the form.</p>}
                </form>
            </div>
        </div>
    );
}

export default ContactPage;
