const { Schema, model } = require('mongoose');

const pollSchema = new Schema({
    question: {
        type: String
    },
    options: [{
        optionName: String,
        votes: Number
    }]

});

  
const Polls = model('Polls', pollSchema);
  
module.exports = Polls;