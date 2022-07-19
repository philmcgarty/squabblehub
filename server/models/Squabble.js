const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

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
    squabbleComments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

squabbleSchema.virtual('commentCount').get(function() {
  return this.squabbleComments.length;
});

const Squabble = model('Squabble', squabbleSchema);

module.exports = Squabble;