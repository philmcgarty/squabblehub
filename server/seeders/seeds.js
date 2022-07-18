const db = require('../config/connection');
const { Comment, User } = require('../models');

db.once('open', async () => {
  await Comment.deleteMany({});
  await User.deleteMany({});

  // create user data
  const userData = [];
  const users = [
  {
     username: "Ariel21",
     email: "ariel21@email.com",
     password: "arielpass"
  },
  {
    username: "Eric13",
    email: "eric13@email.com",
    password: "eripass"
 },
 {
    username: "Elsa35",
    email: "elsa25@email.com",
    password: "elsapass"
  },
  {
    username: "Simba17",
    email: "simba17@email.com",
    password: "simbapass"
  },
  {
    username: "Rafiki60",
    email: "rafiki60@email.com",
    password: "rafikipass"
  }
]

  for (let i = 0; i < 6; i += 1) {
    const username = users[i].username;
    const email = users[i].email;
    const password = users[i].password;

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);

  // create comments
  let createdComments = [];
  const comments = [
"The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. ",
"The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
 "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.",
 "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." ,
 "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
 "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure." ,
]
  for (let i = 0; i < 6; i += 1) {
    const commentText = comments[i];
    const movieOrBook = Math.round(Math.random(0.5));
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdComment = await Comment.create({ commentText, username, movieOrBook });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { comments: createdComment._id } }
    );

    createdComments.push(createdComment);
  }


  console.log('Database seeded');
  process.exit(0);
});
