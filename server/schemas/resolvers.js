const {User, Comment } = require('../models');

const resolvers = {
  Query: {
    comments: async (parent, { movieBetter }) => {
      //params may or may not have a filter based on the movie/book preference
      const params = movieBetter ? { movieBetter } : {};
      return Comment.find(params).sort({ createdAt: -1 });

    // comments: async (parent, { username }) => {
    //   //params may or may not have a filter based on the movie/book preference
    //   const params = username ? { username } : {};
    //   return Comment.find(params).sort({ createdAt: -1 });
    }
  },

};

module.exports = resolvers