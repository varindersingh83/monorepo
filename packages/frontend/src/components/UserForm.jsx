import React, { useState } from 'react';
import axios from 'axios';

function UserForm({ onUserAdded }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Submitting user:', { name, email });

        const query = `
            mutation CreateUser($name: String!, $email: String!) {
                createUser(name: $name, email: $email) {
                    id
                    name
                    email
                }
            }
        `;

        const variables = {
            name: name,
            email: email,
        };

        try {
            const response = await axios.post('http://localhost:4000/graphql', {
                query: query,
                variables: variables,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    // Include any other headers like Authorization if needed
                }
            });

            console.log('Response:', response.data);
            onUserAdded();  // Trigger update in parent
            setName('');
            setEmail('');
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add User</h2>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <button type="submit">Add User</button>
        </form>
    );
}

export default UserForm;
