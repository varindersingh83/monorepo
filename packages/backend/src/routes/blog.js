const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

router.get('/blog', async (req, res) => {
    const blogs = await prisma.blogPost.findMany({ orderBy: { date: 'desc' } });
    res.json(blogs);
});

router.post('/newBlog', async (req, res) => {
    const { title, body } = req.body;
    const date = new Date().toISOString();
    await prisma.blogPost.create({
        data: { title, body, date }
    });
    res.redirect('/blog');
});

module.exports = router;
