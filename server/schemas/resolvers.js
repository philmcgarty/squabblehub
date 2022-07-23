const {User, Comment, Squabble, Suggestion, Polls } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require("../utils/auth");


const resolvers = {
  Query: {
    //get filtered comments by Username
    commentsAllOrByUser: async (parent, { username }) => {
      //params may or may not have a filter based on the username, if no params, this will return ALL comments
      const params = username ? { username } : {};
      return Comment.find(params).sort({ createdAt: -1 });
    },

    //get filtered comments by movie/book preference (Int value:  Movie 1 - Book 2)
    commentsByPreference: async (parent, { movieorbook }) => {
      return Comment.find({ movieorbook }).sort({ createdAt: -1 });
    },

    // get single comment by ID
    commentById: async (parent, { commentId }) => {
      return Comment.findOne({ _id: commentId });
    },

    //get filtered comments by movie and squabble id
    commentsBySquabble: async (parent, { squabbleId, movieorbookId }) => {
      //params may or may not have a filter based on the username, if no params, this will return ALL comments
      return await Comment.find({ forSquabble: squabbleId, movieorbook: movieorbookId }).sort({ createdAt: -1 })
    },

    // get all users
    usersAll: async () => {
      return User.find()
        .select('-__v -password')
        .populate('comments')
        .populate('favSquabbles')
    },
    // get single user by username
    userByName: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('comments')
        .populate('favSquabbles')
    },

    // the ME query for login users (useful for creating a profile page)
    userMe: async (parent, args, context) => {
      if(context.user) {
      const userData = await User.findOne({ _id: context.user._id})
      .select('-__v -password')
      .populate('comments')
      
      return userData;
      }
      throw new AuthenticationError("Not logged in");
    },

    // query for ALL squabbles
    squabbleAll: async () => {
      return Squabble.find()
        .populate('squabbleComments');
    },

    // query for squabble by it's ID
    squabbleById: async (parent, { _id }) => {
      return Squabble.findOne({ _id })
      .populate('squabbleComments');
    },

    // query ALL suggestions, or include a parameter: Username
    suggestionAllorByUser: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Suggestion.find(params).sort({ createdAt: -1 });
    },
    //Query all polls
    polls: async () => {
      return Polls.find()
    }
  },

  Mutation: {// passing the user object to signToken() function so username, email, and _id properties are added to the token.
    // adding a new user (signup)
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
    },
    
    // adding comments. Comment will be saved in the user model and the squabble model
    commentAdd: async (parent, args, context) => {
      if (context.user) {
        const newComment = await Comment.create({ ...args, username: context.user.username, forSquabble: args.squabbleId });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { comments: newComment._id } },
          { new: true }
          );


        await Squabble.findOneAndUpdate(
          { _id: args.squabbleId },
          { $push: { squabbleComments: newComment }},
          { new: true, runValidators: true }
          );
        return newComment;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    
    //deleting a comment
    commentDelete: async (parent, { commentId }, context) => {
      if (context.user) {
      await Comment.findOneAndDelete({  _id: commentId, username: context.user.username} )
          return `${context.user.username} deleted a comment`
      }
      throw new AuthenticationError("Please log in first, you can only delete a comment of yours.");
    },
    

    commentEdit: async (parent, { commentId, commentNewText }, context) => {
      if (context.user) {
      const updatedComment = await Comment.findOneAndUpdate({_id: commentId},
      { $set:{commentText: commentNewText}},
      { new: true, runValidators: true })
          return updatedComment
      }
      throw new AuthenticationError("Please log in first, you can only delete a comment of yours.");
    },

    //adding a suggestion
    suggestionAdd: async (parent, args, context) => {
      if (context.user) {
        const newSuggestion = await Suggestion.create({ ...args, username: context.user.username })
        return newSuggestion
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    //Adding squabble to favSquabbles. Currently this mutation only adds the squable ID to the user model. room for improvement here
    squabbleAddFavourite: async (parent, { squabbleId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { favSquabbles: squabbleId } },
          { new: true }
        ).populate('favSquabbles');

        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // add vote
    vote: async (parent, { pollId, optionIndex }, context ) => {
      if (context.user) {
        const key = "options."+ optionIndex + ".votes";
        const updatedPoll = await Polls.findByIdAndUpdate(
        { _id: pollId },
        { $inc: { [key]: 1} },
        { new: true }
        )
        return updatedPoll
      }
      throw new AuthenticationError('You need to be logged in!');
    }


  },
};

module.exports = resolvers