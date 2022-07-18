const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const commentSchema = new Schema(
  {
    commentText: {
      type: String,
      required: 'Tell us your reason!',
      minlength: 1,
      maxlength: 280
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
    movieBetter: {
      type: Boolean,
      required: true
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