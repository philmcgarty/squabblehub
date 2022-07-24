const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat')
const Comment = require('../models/Comment')

const squabbleSchema = new Schema(
  {
    title: {
      type: String,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    bookAuthor: {
      type: String
    },
    bookYear: {
      type: Number
    },
    movieDirector: {
      type: String
    },
    movieYear: {
      type: Number
    },
    bookVotes:     [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    movieVotes:     [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    winningParty: {
      type: Number
    },
    squabbleComments: 
    [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    }
  }
);

squabbleSchema.virtual('commentCount').get(function() {
  return this.squabbleComments.length;
});

squabbleSchema.virtual('movieVoteCount').get(function() {
  return this.movieVotes.length;
});

squabbleSchema.virtual('bookVoteCount').get(function() {
  return this.bookVotes.length;
});

const Squabble = model('Squabble', squabbleSchema);

module.exports = Squabble;