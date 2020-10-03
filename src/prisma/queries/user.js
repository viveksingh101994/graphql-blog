const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const addUser = ({ name, email }) => {
  return prisma.user.create({
    data: {
      email,
      name,
    },
  });
};

const getSingleUser = (id) => {
  return prisma.user.findOne({
    where: {
      id,
    },
  });
};

module.exports = {
  addUser,
  getSingleUser,
};
