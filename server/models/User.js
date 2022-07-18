const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!']
    },
    password: {
      type: String,
      required: true,
      minlength: 5
    },
    comment:{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
  },
  {
    toJSON: {
      viartuals: true
    }
  }
);



const User = model('User', userSchema);

module.exports = User;