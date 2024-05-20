const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        getAllUsers: async () => {
            const users = await prisma.user.findMany();
            return users;
        },
        getVisitCount: async () => {
            const count = await prisma.visitCount.findUnique({
                where: { page: 'homepage' },
                select: { count: true }
            });
            return count ? count.count : 0;
        },
        getAllBlogPosts: async () => {
            const blogPosts = await prisma.blogPost.findMany();
            return blogPosts;
        },
        getBlogPost: async (_, { slug }) => {
            const blogPost = await prisma.blogPost.findUnique({
                where: { slug }
            });
            return blogPost;
        },
        getAllProjects: async () => { // New resolver to fetch all projects
            const projects = await prisma.project.findMany();
            return projects;
        },
    },
    Mutation: {
        createUser: async (_, { name, email }) => {
            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                },
            });
            return newUser;
        },
        updateUser: async (_, { id, name, email }) => {
            const updatedUser = await prisma.user.update({
                where: { id },
                data: {
                    name,
                    email,
                },
            });
            return updatedUser;
        },
        deleteUser: async (_, { id }) => {
            const deletedUser = await prisma.user.delete({
                where: { id },
            });
            return deletedUser;
        },
        incrementVisitCount: async () => {
            const count = await prisma.visitCount.upsert({
                where: { page: 'homepage' },
                update: { count: { increment: 1 } },
                create: { page: 'homepage', count: 1 },
                select: { count: true }
            });
            return count.count;
        },
        addBlogPost: async (_, { slug, title, date, body }) => {
            const newBlogPost = await prisma.blogPost.create({
                data: { slug, title, date, body }
            });
            return newBlogPost;
        },
        submitContactForm: async (_, { name, email, message }) => {
            try {
                await prisma.contactForm.create({
                    data: { name, email, message },
                });
                return { success: true, message: 'Thank you for your message!' };
            } catch (error) {
                return { success: false, message: 'Failed to submit your message.' };
            }
        },
    },
};

module.exports = { resolvers };
