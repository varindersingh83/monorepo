const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { PrismaClient } = require('@prisma/client');
const morgan = require('morgan');
const cors = require('cors'); // Import the cors middleware
const { typeDefs } = require('./src/graphql/schema');
const { resolvers } = require('./src/graphql/resolvers');

const app = express();  // Initialize the express app first
app.use(morgan('dev'));  // Now use the morgan middleware
app.use(cors()); // Use the cors middleware

const prisma = new PrismaClient();

app.use(express.json()); // For parsing application/json

const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
    });
}

startServer();
