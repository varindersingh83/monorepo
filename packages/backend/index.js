const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { PrismaClient } = require('@prisma/client');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const dotenv = require('dotenv');
const { typeDefs } = require('./src/graphql/schema');
const { resolvers } = require('./src/graphql/resolvers');
const routes = require('./src/routes');
const passport = require('./src/utils/passportConfig');
const path = require('path');

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(routes);

// Heartbeat route
app.get('/heartbeat', (req, res) => {
    res.status(200).json({ status: 'Server is running' });
});

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend/public')));

// GraphQL Server
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
