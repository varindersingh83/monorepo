const express = require('express');
const adminRoutes = require('./admin');
const blogRoutes = require('./blog');
const loginRoutes = require('./login');
const router = express.Router();

router.use(loginRoutes);
router.use(adminRoutes);
router.use(blogRoutes);

module.exports = router;