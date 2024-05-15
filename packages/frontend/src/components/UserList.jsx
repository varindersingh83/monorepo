import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const query = `
            query GetAllUsers {
                getAllUsers {
                    id
                    name
                    email
                }
            }
        `;

        try {
            const response = await axios.post('http://localhost:4000/graphql', {
                query: query,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    // Include any other necessary headers like Authorization
                }
            });

            // Assuming your GraphQL server responds with the data encapsulated in { data: { getAllUsers } }
            setUsers(response.data.data.getAllUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name} - {user.email}</li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
