const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        getAllUsers: async () => {
            console.log("Fetching all users...");
            const users = await prisma.user.findMany();
            console.log("Fetched users:", users);
            return users;
        },
        getVisitCount: async () => {
            const count = await prisma.visitCount.findUnique({
                where: { page: 'homepage' },
                select: { count: true }
            });
            return count ? count.count : 0;  // Return 0 if no record exists
        },
    },
    Mutation: {
        createUser: async (_, { name, email }) => {
            console.log(`Attempting to create user: ${name}, ${email}`);
            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                },
            });
            console.log("User created:", newUser);
            return newUser;
        },
        updateUser: async (_, { id, name, email }) => {
            console.log(`Attempting to update user: ${id}`);
            const updatedUser = await prisma.user.update({
                where: { id },
                data: {
                    name,
                    email,
                },
            });
            console.log("User updated:", updatedUser);
            return updatedUser;
        },
        deleteUser: async (_, { id }) => {
            console.log(`Attempting to delete user: ${id}`);
            const deletedUser = await prisma.user.delete({
                where: { id },
            });
            console.log("User deleted:", deletedUser);
            return deletedUser;
        },
        incrementVisitCount: async () => {
            console.log("Increment visitor count called");
            const count = await prisma.visitCount.upsert({
                where: { page: 'homepage' },
                update: { count: { increment: 1 } },
                create: { page: 'homepage', count: 1 },
                select: { count: true }
            });
            return count.count;
        },
    },
};

module.exports = { resolvers };
