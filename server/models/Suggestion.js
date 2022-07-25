const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const suggestionSchema = new Schema(
  {
    suggestionTitle: {
      type: String,
      minlength: 1,
      maxlength: 100
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
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const Suggestion = model('Suggestion', suggestionSchema);

module.exports = Suggestion;