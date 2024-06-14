const express = require('express');
const adminRoutes = require('./admin');
const blogRoutes = require('./blog');

const router = express.Router();

router.use(adminRoutes);
router.use(blogRoutes);

module.exports = router;
