const {User, Comment } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require("../utils/auth");


const resolvers = {
  Query: {
    //get filtered comments by movie/book preference (Int value:  Movie 1 - Book 2)
    commentsByPreference: async (parent, { movieorbook }) => {
      //params may or may not have a filter based on the movie/book preference
      const params = movieorbook ? { movieorbook } : {};
      return Comment.find(params).sort({ createdAt: -1 });
    },

    //get filtered comments by User
    commentsByUser: async (parent, { username }) => {
      //params may or may not have a filter based on the username
      const params = username ? { username } : {};
      return Comment.find(params).sort({ createdAt: -1 });
    },

    // get single comment by ID
    commentById: async (parent, { _id }) => {
      return Comment.findOne({ _id });
    },

    // get all users
    usersAll: async () => {
      return User.find()
        .select('-__v -password')
        .populate('comments');
    },
    // get single user by username
    userByName: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('comments');
    },

    // the ME query
    userMe: async (parent, args, context) => {
      if(context.user) {
      const userData = await User.findOne({ _id: context.user._id})
      .select('-__v -password')
      .populate('comments')
      
      return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
    // //example of code to use if a model squabble is implemented
    // squableAll: async (parent, { squableTitle }) => {
    //   //params may or may not have a filter based on the title of the squable
    //   const params = squableTitle ? { squableTitle } : {};
    //   return Squabble.find(params).sort({ createdAt: -1 });
    // },
    // //example of code to use if a model squabble is implemented
    // squabbleById: async (parent, { _id }) => {
    //   return Squabble.findOne({ _id });
    // },
  },

  Mutation: {// passing the user object to signToken() functionso username, email, and _id properties are added to the token.
    // adding a new user
    userSignup: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },

    //login in
    userLogin: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if(!user) {
        throw new AuthenticationError("Mmm please try again, we couldn't recognize you!")
      }
      const correctPw = await user.isCorrectPassword(password);

      if(!correctPw){
        throw new AuthenticationError("Mmm please try again, we couldn't recognize you!")
      }
      const token = signToken(user)
      return { token, user};
    }
  },
};

module.exports = resolvers