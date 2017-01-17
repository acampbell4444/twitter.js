const express = require('express');
const app = express();

app.get('/', function(req, res){
console.log('server listening')
  res.status(200).send('welcome!')
});


app.listen(3000)