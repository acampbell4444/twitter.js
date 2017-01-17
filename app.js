const express = require('express');
const chalk = require('chalk');
const app = express();

app.use('/special',function (req, res, next) {
	console.log(chalk.blue.bgRed.bold("You're in the Special Zone!"))
	res.status(200).send('welcome to the Special Zone!')
	next();
})
app.use(function (req, res, next) {
	console.log(chalk.green(req.method, req.path, res.statusCode)) 
	next();
})

app.get('/', function(req, res){
	console.log(chalk.blue('server listening'));
  	res.status(200).send('welcome to the root page!')
});

app.get('/news', function(req, res){
  	console.log('server listening on the news page')
  	res.status(200).send('welcome to the news page!')
});


app.listen(3000)