const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        console.log('Attempting to authenticate user:', username);
        const user = await prisma.user.findUnique({
            where: {
                email: username // Assuming the username field from the form is the email
            }
        });

        if (!user) {
            console.log('User not found:', username);
            return done(null, false, { message: 'Incorrect username.' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            console.log('Incorrect password for user:', username);
            return done(null, false, { message: 'Incorrect password.' });
        }

        console.log('User authenticated successfully:', username);
        return done(null, user);
    } catch (err) {
        console.error('Error during authentication:', err);
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    console.log('Serializing user:', user.id);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: Number(id) } });
        if (!user) {
            throw new Error('User not found');
        }
        console.log('Deserialized user:', user.id);
        done(null, user);
    } catch (error) {
        console.error('Error during deserialization:', error);
        done(error);
    }
});

module.exports = passport;
