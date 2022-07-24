const { Schema, model } = require('mongoose');

const pollSchema = new Schema({
    question: {
        type: String
    },
    oneVoters: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Comment'
            }
          ],

    twoVoters: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Comment'
            }
          ],
    threeVoters:  [
            {
              type: Schema.Types.ObjectId,
              ref: 'Comment'
            }
          ],
    oneTitle: {
        type: String
    },
    twoTitle: {
        type: String
    },
    threeTitle: {
        type: String
    },
},
{
    toJSON: {
      virtuals: true
    }
});

pollSchema.virtual('oneVoteCount').get(function() {
    return this.oneVoters.length;
  });

pollSchema.virtual('twoVoteCount').get(function() {
return this.twoVoters.length;
});

pollSchema.virtual('threeVoteCount').get(function() {
return this.threeVoters.length;
});


  
const Polls = model('Polls', pollSchema);
  
module.exports = Polls;