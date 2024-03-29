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
    commentById: async (parent, { _id }) => {
      return Comment.findOne({ _id });
    },

    commentsByMovie: async (parent, { squabbleId }) => {
      //params may or may not have a filter based on the username, if no params, this will return ALL comments
      return await Comment.find({ forSquabble: squabbleId, movieorbook:1 }).sort({ createdAt: -1 })
    },

    commentsByBook: async (parent, { squabbleId }) => {
      //params may or may not have a filter based on the username, if no params, this will return ALL comments
      return await Comment.find({ forSquabble: squabbleId, movieorbook:2 }).sort({ createdAt: -1 })
    },

    //no variable needed
    commentsByCurrentMovie: async (parent, args) => {
      //params may or may not have a filter based on the username, if no params, this will return ALL comments
      return await Comment.find({ movieorbook:1 }).sort({ createdAt: -1 })
    },

    //no variable needed
    commentsByCurrentBook: async (parent, args) => {
      //params may or may not have a filter based on the username, if no params, this will return ALL comments
      return await Comment.find({ movieorbook:2 }).sort({ createdAt: -1 })
    },

    // get all users
    usersAll: async () => {
      return User.find()
        .select('-__v -password')
        .populate('comments')
        .populate('favSquabbles')
        .populate('suggestions')
    },
    // get single user by username
    userByName: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('comments')
        .populate('favSquabbles')
        .populate('suggestions')
    },

    // the ME query for login users (useful for creating a profile page)
    userMe: async (parent, args, context) => {
      if(context.user) {
      const userData = await User.findOne({ _id: context.user._id})
      .select('-__v -password')
      .populate('comments')
      .populate('suggestions')
      
      return userData;
      }
      throw new AuthenticationError("Not logged in");
    },

    // query for ALL squabbles
    squabbleAll: async () => {
      return Squabble.find()
        .populate('squabbleComments')
        .populate('bookVotes')
        .populate('movieVotes')
    },

    // query for squabble by it's ID
    squabbleById: async (parent, { _id }) => {
      return Squabble.findOne({ _id })
      .populate('squabbleComments');
    },

    // query for squabble by it's Name (Hardcoded balue LOTR corresponds to the seeding file)
    squabbleName: async (parent, { title }) => {
      return Squabble.findOne({ title })
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
      .populate('oneVoters')
      .populate('twoVoters')
      .populate('threeVoters');
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
        const newComment = await Comment.create({ ...args, username: context.user.username });

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

    // no variable needed to comment on the single squabble in the DB
    commentAddCurrentMovie: async (parent, args, context) => {
      if (context.user) {
        const newComment = await Comment.create({ 
          ...args, username: context.user.username, 
          movieorbook: 1,
          forSquabble: "The Lord of The Rings: The Followship Of The Ring"
      });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { comments: newComment._id } },
          { new: true }
          );


        await Squabble.findOneAndUpdate(
          { title: "The Lord of The Rings: The Followship Of The Ring" },
          { $push: { squabbleComments: newComment }},
          { new: true, runValidators: true }
          );
        return newComment;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    // no variable needed to comment on the single squabble in the DB
    commentAddCurrentBook: async (parent, args, context) => {
      if (context.user) {
        const newComment = await Comment.create({ 
          ...args, username: context.user.username, 
          movieorbook: 2,
          forSquabble: "The Lord of The Rings: The Followship Of The Ring"
      });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { comments: newComment._id } },
          { new: true }
          );


        await Squabble.findOneAndUpdate(
          { title: "The Lord of The Rings: The Followship Of The Ring" },
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
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { suggestions: newSuggestion._id } },
          { new: true }
          );
        
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

    voteCurrentMovie: async (parent, args, context) => {
      if (context.user) {
      const updateMovieVote = await Squabble.findOneAndUpdate(
        { title: "The Lord of The Rings: The Followship Of The Ring" },
        { $addToSet: { movieVotes: context.user._id}, $pull: { bookVotes: context.user._id}  },
        { new: true }
        )
        .populate('bookVotes')
        .populate('movieVotes')
        return updateMovieVote
      }
      throw new AuthenticationError("Please log in first.");
    },

    voteCurrentBook: async (parent, args, context) => {
      if (context.user) {
      const updateBookVote = await Squabble.findOneAndUpdate(
        { title: "The Lord of The Rings: The Followship Of The Ring" },
        { $addToSet: { bookVotes: context.user._id}, $pull: { movieVotes: context.user._id}  },
        { new: true }
        )
        .populate('bookVotes')
        .populate('movieVotes')

        return updateBookVote
      }
      throw new AuthenticationError("Please log in first.");
    },

    movieVoteAdd: async (parent, { squabbleId }, context) => {
      if (context.user) {
      const updateMovieVote = await Squabble.findByIdAndUpdate(
        {_id: squabbleId},
        { $addToSet: { movieVotes: context.user._id}, $pull: { bookVotes: context.user._id}  },
        { new: true }
        )
        .populate('bookVotes')
        .populate('movieVotes')
        return updateMovieVote
      }
      throw new AuthenticationError("Please log in first.");
    },

    bookVoteAdd: async (parent, { squabbleId }, context) => {
      if (context.user) {
      const updateBookVote = await Squabble.findByIdAndUpdate(
        {_id: squabbleId},
        { $addToSet: { bookVotes: context.user._id}, $pull: { movieVotes: context.user._id}  },
        { new: true }
        )
        .populate('bookVotes')
        .populate('movieVotes')

        return updateBookVote
      }
      throw new AuthenticationError("Please log in first.");
    },

    voteNextOptOne: async (parent, args, context ) => {
      if (context.user) {
        const updatedPoll = await Polls.findOneAndUpdate(
        { question: "Vote for Next Week's Squabble" },
        { 
              $pull: { twoVoters: context.user._id, threeVoters: context.user._id},
              // $pull: { threeVoters: context.user._id},
              $addToSet: { oneVoters: context.user._id},  },
        { new: true }
        )       
        .populate('oneVoters')
        .populate('twoVoters')
        .populate('threeVoters');
        // return "thank you for voting!"
        return updatedPoll
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    voteNextOptTwo: async (parent, args, context ) => {
      if (context.user) {
        const updatedPoll = await Polls.findOneAndUpdate(
        { question: "Vote for Next Week's Squabble" },
        { 
        $pull: { oneVoters: context.user._id, threeVoters: context.user._id},
        // $pull: { threeVoters: context.user._id}, 
        $addToSet: { twoVoters: context.user._id},},
        { new: true }
        )       
        .populate('oneVoters')
        .populate('twoVoters')
        .populate('threeVoters');
        // return "thank you for voting!"
        return updatedPoll
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    voteNextOptThree: async (parent, args, context ) => {
      if (context.user) {
        const updatedPoll = await Polls.findOneAndUpdate(
        { question: "Vote for Next Week's Squabble" },
        { 
              $pull: { oneVoters: context.user._id, twoVoters: context.user._id},
              // $pull: { twoVoters: context.user._id},
              $addToSet: { threeVoters: context.user._id},  },
        { new: true }
        )       
        .populate('oneVoters')
        .populate('twoVoters')
        .populate('threeVoters');
        // return "thank you for voting!"
        return updatedPoll
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    // voteNext: async (parent, { pollId, indexId }, context ) => {
    //   if (context.user) {
    //     // const key = "options."+ optionIndex + ".votes";
    //     const key = () => {
    //     if (indexId === 0){
    //       return 'oneVoters'
    //     } else if ( indexId === 1 ){
    //       return 'twoVoters'
    //     } else return 'threeVoters'
    //   }

    //     const updatedPoll = await Polls.findByIdAndUpdate(
    //     { _id: pollId },
    //     { $addToSet: { [key()]: context.user._id } },
    //     { new: true }
    //     )       
    //     .populate('oneVoters')
    //     .populate('twoVoters')
    //     .populate('threeVoters');
    //     // return "thank you for voting!"
    //     return updatedPoll
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // }
  },
};

module.exports = resolvers