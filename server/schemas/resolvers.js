const {User, Comment } = require('../models');

const resolvers = {
  Query: {
    comments: async () => {
      return Comment.find().sort({ createdAt: -1 });
    }
  },

  // Query: {
  //   helloWorld: () => {return 'Hello woooooorld!';}
  // }
};

module.exports = resolvers