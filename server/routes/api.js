const express = require('express');

const router = express.Router();

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'ap-cdbr-azure-southeast-b.cloudapp.net',
    user : 'b895f3ec0992fd',
    password : '0f4f25c2',
    database : 'acsm_c4b98265222ea2d'
  }
});

const data = [
  {
    idx: 0,
    user: 'dtk0528',
    content: 'LOGIN and type a name to start',
    time: JSON.parse(JSON.stringify(new Date('Wed, 14 Jun 2017 12:00:00 +0800'))),
    replys: '',
    replyTo: null,
  },
  {
    idx: 1,
    user: 'dtk0528',
    content: 'Click the plus sign to post',
    time: JSON.parse(JSON.stringify(new Date('Wed, 14 Jun 2017 12:00:00 +0800'))),
    replys: '',
    replyTo: null,
  },
  {
    idx: 2,
    user: 'dtk0528',
    content: 'Click REPLY to reply to a post',
    time: JSON.parse(JSON.stringify(new Date('Wed, 14 Jun 2017 12:00:00 +0800'))),
    replys: '',
    replyTo: null,
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
  // res.json(data);
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
  // data[reply.replyTo].reply += ',';
  // data[reply.replyTo].reply += reply.idx;
  // data.push(reply);
  // res.send(reply);
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
  // data.push(post);
  // res.send(post);
});

module.exports = router;
