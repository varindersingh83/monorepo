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
const logger = require('./src/utils/logger');
const authenticate = require('./src/middlewares/auth'); // Import the authentication middleware

dotenv.config();

const app = express();
const prisma = new PrismaClient();

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

app.use(authenticate); // Apply the authentication middleware

app.use(routes);

app.get('/heartbeat', (req, res) => {
    logger.info('Heartbeat check');
    res.status(200).json({ status: 'Server is running' });
});

app.use(express.static(path.join(__dirname, '../frontend/public')));

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
        user: req.user,
    }),
});

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        logger.info(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
    });
}

startServer();
