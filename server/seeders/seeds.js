const faker = require('faker');

const db = require('../config/connection');
const { Comment, User, Squabble, Polls } = require('../models');

db.once('open', async () => {
  await Comment.deleteMany({});
  await User.deleteMany({});
  await Squabble.deleteMany({})
  await Polls.deleteMany({})

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }
  
  const createdUsers = await User.collection.insertMany(userData);

    // create Squabble Data
    const squabbleData = [];

    miscTitles = [
      {
      title: "Gone Girl",
      movieYear: 2018,
      movieDirector: "Alex garland",
      bookYear: 2014,
      bookAuthor: "Jeff VanderMeer"
    },
    {
      title: "Annihilation",
      movieYear: 214,
      movieDirector: "David Fincher",
      bookYear: 2012,
      bookAuthor: "Gillian Flynn"
    },
  ]

    for (let i = 0; i < 2; i += 1) {
      const title = `${miscTitles[i].title}`;
      const bookAuthor = `${miscTitles[i].bookAuthor}`;
      const bookYear = `${miscTitles[i].bookYear}`;
      const movieDirector = `${miscTitles[i].movieDirector}`;
      const movieYear = `${miscTitles[i].movieYear}`;

      squabbleData.push({       
        title,
        movieYear,
        movieDirector,
        bookYear,
        bookAuthor});
    }
  
    const createdSquabbles = await Squabble.collection.insertMany(squabbleData);


  // create comments
  let createdComments = [];
  for (let i = 0; i < 100; i += 1) {
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

    console.log(updatedSquabble)

    createdComments.push(createdComments);
  }
  
  
  const poll = {
    question: "Help Pick Next Weeks Squabble",
    options: [
      {
        optionName: "Dune",
        votes: Math.round(Math.random() * 20)
      },
      {
        optionName: "Ready Player One",
        votes: Math.round(Math.random() * 20)
      },
      {
        optionName: "The Adventures of Tom Bombadil",
        votes: Math.round(Math.random() * 20)
      }
    ]
   }     
    const createdPoll = await Polls.collection.insertOne(poll);

  

  console.log('all done!');
  process.exit(0);
});
