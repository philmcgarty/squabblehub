const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const commentSchema = new Schema(
  {
    commentText: {
      type: String,
      required: 'Let us know what you think!',
      minlength: 1,
      maxlength: 450
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    //movie is 0, book is 1
    movieOrBook: {
      type: Boolean,
      // required: true
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);


const Comment = model('Comment', commentSchema);

module.exports = Comment;