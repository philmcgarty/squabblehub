const faker = require('faker');

const db = require('../config/connection');
const { Comment, User, Squabble, Polls, Suggestion } = require('../models');

db.once('open', async () => {
  await Comment.deleteMany({});
  await User.deleteMany({});
  await Squabble.deleteMany({})
  await Polls.deleteMany({})
  await Suggestion.deleteMany({})

  //////////// create USER data
  const userData = [];

  for (let i = 0; i < 10; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }
  
  const createdUsers = await User.collection.insertMany(userData);

  //////////// create SQUABBLE Data
  const squabbleData = [];

  //   miscTitles = [
  //     {
  //     title: "THe Lord Of The Rings",
  //     movieYear: 2005,
  //     movieDirector: "Peter Jackson",
  //     bookYear: 1976,
  //     bookAuthor: "J. R. R. Tolkien"
  //   },
  //   {
  //     title: "Annihilation",
  //     movieYear: 214,
  //     movieDirector: "David Fincher",
  //     bookYear: 2012,
  //     bookAuthor: "Gillian Flynn"
  //   },
  // ]

  //   for (let i = 0; i < 2; i += 1) {
  //     const title = `${miscTitles[i].title}`;
  //     const bookAuthor = `${miscTitles[i].bookAuthor}`;
  //     const bookYear = `${miscTitles[i].bookYear}`;
  //     const movieDirector = `${miscTitles[i].movieDirector}`;
  //     const movieYear = `${miscTitles[i].movieYear}`;
  const bookVotes = Math.round(Math.random() * 20);
  const movieVotes = Math.round(Math.random() * 20);

      squabbleData.push({       
        title: "The Lord of The Rings",
        movieYear: 2004,
        movieDirector: "Peter Jackson",
        bookYear: 1979,
        bookAuthor: "JRR Tolkien",
        bookVotes,
        movieVotes
      });
    // }
  
    const createdSquabbles = await Squabble.collection.insertMany(squabbleData);


  //////////// create COMMENTS data
  let createdComments = [];
  for (let i = 0; i < 10; i += 1) {
    const commentText = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const movieorbook = Math.round(Math.random(0.5)+1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const randomSquabbleIndex = Math.floor(Math.random() * createdSquabbles.ops.length);

    const { username, _id: userId } = createdUsers.ops[randomUserIndex];
    const { _id: squabbleId } = createdSquabbles.ops[randomSquabbleIndex];

    const createdComment = await Comment.create({ commentText, username, movieorbook, forSquabble: squabbleId });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { comments: createdComment._id } }
    );

    const updatedSquabble = await Squabble.updateOne(
      { _id: squabbleId },
      { $push: { squabbleComments: createdComment._id } }
    );

    createdComments.push(createdComments);
  }
  
  
  const poll = {
    // question: "Help Pick Next Weeks Squabble",
    // options: [
    //   {
    //     optionName: "Dune",
    //     votes: Math.round(Math.random() * 20)
    //   },
    //   {
    //     optionName: "Ready Player One",
    //     votes: Math.round(Math.random() * 20)
    //   },
    //   {
    //     optionName: "The Adventures of Tom Bombadil",
    //     votes: Math.round(Math.random() * 20)
    //   }
    // ]
    question: "Help Pick Next Weeks Squabble",
    oneTitle: "Anihilation",
    twoTitle: "Forest Gump",
    threeTitle: "Life of Pi"
    
   }     
    const createdPoll = await Polls.collection.insertOne(poll);

  

  console.log('all done!');
  process.exit(0);
});
