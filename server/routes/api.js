const express = require('express');

const router = express.Router();

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : 'dino',
    database : 'blog'
  }
});

const data = [
  {
    idx: 0,
    user: 'dtk0528',
    content: 'LOGIN and type a name to start',
    time: JSON.parse(JSON.stringify(new Date('Mon, 8 May 2017 12:00:00 +0800'))),
    replys: '1',
  },
  {
    idx: 1,
    user: 'dtk0528',
    content: 'REPLY to any comment',
    time: JSON.parse(JSON.stringify(new Date('Mon, 8 May 2017 12:05:10 +0800'))),
    replyTo: 0,
  },
];

for (let i = 0; i < data.length; i += 1) {
  knex('posts')
    .insert(data[i])
    .then(res => console.log(res))
    .catch(err => console.error(err));
}

router.get('/getPosts', (req, res) => {
  let dbData;
  knex('posts')
    .select()
    .then(posts => {
      dbData = posts;
      res.json(dbData);
    })
    .catch(err => console.error(err));
});

router.post('/addReply', (req, res) => {
  const reply = req.body;
  let allPosts;
  knex('posts')
    .select()
    .then(posts => {
      allPosts = posts;
      knex('posts')
        .where({ idx: reply.replyTo })
        .update({
          replys: allPosts[reply.replyTo].replys + ',' + reply.idx,
        })
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
  knex('posts')
    .insert(reply)
    .then(db => {
      res.send(reply);
    })
    .catch(err => console.error(err));
});

router.post('/addPost', (req, res) => {
  const post = req.body;
  post.replys = '';
  knex('posts')
    .insert(post)
    .then(db => {
      res.send(post);
    })
    .catch(err => console.error(err));
});

module.exports = router;
