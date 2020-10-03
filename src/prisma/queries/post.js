const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const addPost = ({ title, body, published, authorEmail }) => {
  return prisma.post.create({
    data: {
      body,
      title,
      published,
      User: {
        connect: {
          email: authorEmail,
        },
      },
    },
  });
};

module.exports = { addPost };
