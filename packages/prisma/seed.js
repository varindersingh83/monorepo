const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');  // Ensure correct import
const prisma = new PrismaClient();

async function main() {
  // Clear existing records
  await prisma.blogPost.deleteMany({});
  await prisma.project.deleteMany({}); // Clear existing projects
  console.log('Cleared existing blog posts and projects');

  // Generate new blog posts
  const blogPosts = Array.from({ length: 50 }).map((_, index) => ({
    slug: `tech-blog-${index + 1}`,
    title: faker.lorem.sentence(7),
    date: faker.date.between('2022-01-01', '2024-01-01').toISOString().slice(0, 10), // Random date between 2022 and 2024
    body: faker.lorem.paragraphs(5)
  }));

  // Insert new blog posts
  for (const post of blogPosts) {
    await prisma.blogPost.create({
      data: post,
    });
  }
  console.log('Inserted new blog posts');

  // Generate new projects
  const projects = Array.from({ length: 10 }).map((_, index) => ({
    title: `Project ${index + 1}`,
    description: faker.lorem.paragraph(),
    imageUrl: `https://via.placeholder.com/300x200?text=Project+${index + 1}`, // Placeholder image URL
    projectUrl: faker.internet.url(),
  }));

  // Insert new projects
  for (const project of projects) {
    await prisma.project.create({
      data: project,
    });
  }
  console.log('Inserted new projects');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
