const { PrismaClient } = require('@prisma/client');
const { AuthenticationError, ForbiddenError } = require('apollo-server-express');
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
        select: { count: true },
      });
      return count ? count.count : 0;
    },
    getAllBlogPosts: async () => {
      const blogPosts = await prisma.blogPost.findMany({
        orderBy: {
          date: 'desc',
        },
      });
      return blogPosts;
    },
    getBlogPost: async (_, { slug }) => {
      const blogPost = await prisma.blogPost.findUnique({
        where: { slug },
      });
      return blogPost;
    },
    getAllProjects: async () => {
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
        select: { count: true },
      });
      return count.count;
    },
    addBlogPost: async (_, { slug, title, date, body }) => {
      const newBlogPost = await prisma.blogPost.create({
        data: { slug, title, date, body },
      });
      return newBlogPost;
    },
    updateBlogPost: async (_, { id, title, date, body }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Not authenticated');
      }

      const existingBlogPost = await prisma.blogPost.findUnique({ where: { id } });
      if (!existingBlogPost) {
        throw new Error('Blog post not found');
      }

      if (user.email !== 'varinder83singh@gmail.com') {
        throw new ForbiddenError(`Not authorized${user.email}`);
      }

      const updatedBlogPost = await prisma.blogPost.update({
        where: { id },
        data: {
          title,
          date,
          body,
        },
      });
      return updatedBlogPost;
    },
    deleteBlogPost: async (_, { id }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Not authenticated');
      }

      const existingBlogPost = await prisma.blogPost.findUnique({ where: { id } });
      if (!existingBlogPost) {
        throw new Error('Blog post not found');
      }

      if (user.email !== 'varinder83singh@gmail.com') {
        throw new ForbiddenError(`Not authorized${user.email}`);
      }

      const deletedBlogPost = await prisma.blogPost.delete({
        where: { id },
      });
      return deletedBlogPost;
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
    deleteAllSessions: async (_, __, { session }) => {
      try {
        // Assuming you're using a session store that provides a way to clear all sessions
        await session.clearAllSessions();
        return true;
      } catch (error) {
        console.error('Error deleting all sessions:', error);
        return false;
      }
    },
  },
};

module.exports = { resolvers };
