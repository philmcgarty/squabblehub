const faker = require('faker');

const db = require('../config/connection');
const { Comment, User, Squabble } = require('../models');

db.once('open', async () => {
  await Comment.deleteMany({});
  await User.deleteMany({});
  await Squabble.deleteMany({})

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
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdComment = await Comment.create({ commentText, username, movieorbook });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { comments: createdComment._id } }
    );

    const updatedSquabble = await Squabble.updateOne(
      { _id: userId },
      { $push: { squabbleComments: createdComment._id } }
    );

    createdComments.push(createdComments);
  }

  

  console.log('all done!');
  process.exit(0);
});
