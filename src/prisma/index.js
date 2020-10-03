const { addUser, getSingleUser } = require('./queries/user');
const { addPost } = require('./queries/post');

const PrismaQueries = { addUser, addPost, getSingleUser };

module.exports = { PrismaQueries };
