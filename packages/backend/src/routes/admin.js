const express = require('express');
const helmet = require('helmet');
const path = require('path');
const passport = require('../utils/passportConfig');

const router = express.Router();

// Use Helmet to set security headers, including CSP
router.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "data:", "blob:"],
      styleSrc: ["'self'", "'unsafe-inline'", "https:"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https:"],
      fontSrc: ["'self'", "https:", "data:"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  })
);

// Middleware for checking authentication
const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/admin');
};

// Serve static files from the 'dist' directory
router.use(express.static(path.resolve(__dirname, '../../../frontend/dist')));

router.post('/login', (req, res, next) => {
  console.log('Login route called');
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Error during authentication:', err);
      return next(err);
    }
    if (!user) {
      console.log('Authentication failed:', info.message);
      return res.redirect('/admin');
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error('Error during login:', err);
        return next(err);
      }
      console.log('Authentication successful, redirecting to /admin_dashboard');
      return res.redirect('/admin_dashboard');
    });
  })(req, res, next);
});

router.get('/admin', (req, res) => {
  console.log('Serving admin.html');
  res.sendFile(path.resolve(__dirname, '../../../frontend/dist/index.html')); // Serve React app
});

router.get('/admin_dashboard', checkAuth, (req, res) => {
  console.log('Admin dashboard route called');
  console.log('User is authenticated, serving admin_dashboard');
  res.sendFile(path.resolve(__dirname, '../../../frontend/dist/index.html')); // Serve React app
});

router.get('/admin/add-blog', checkAuth, (req, res) => {
  console.log('Add blog route called');
  res.sendFile(path.resolve(__dirname, '../../../frontend/dist/index.html')); // Serve React app
});

router.get('/logout', (req, res) => {
  console.log('Logout route called');
  req.logout();
  res.redirect('/admin');
});

// Catch-all route to serve the React app for any other routes
router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../../frontend/dist/index.html')); // Serve React app
});

module.exports = router;
