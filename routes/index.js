'use strict'
const socket = require('../app')


module.exports = function (io) {
  const express = require('express');
  const router = express.Router();
  // could use one line instead: const router = require('express').Router();
  const tweetBank = require('../tweetBank');

  router.get('/', function (req, res) {
    let tweets = tweetBank.list();
    res.render( 'index', { tweets: tweets, showForm: true} );
  });

  router.get('/users/:name', function(req, res) {
    var name = req.params.name;
    var list = tweetBank.find( {name: name} );
    res.render( 'index', { tweets: list, showForm: true, username: name} );
  });

  router.get('/tweets/:id', function(req, res) {
    var id = Number(req.params.id)
    var list = tweetBank.find( {id: id} );
    res.render( 'index', { tweets: list } );
  });

  router.post('/tweets', function(req, res) {
    var name = req.body.name;
    var text = req.body.text;
    var info =tweetBank.add(name, text);
    socket.io.emit('newTweet', info);
    // res.render( 'index', { tweets: tweetBank.list() } );
    res.redirect('/');
  });
  return router
};

