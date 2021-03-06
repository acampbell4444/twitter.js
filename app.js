const express = require('express');
const chalk = require('chalk');
const nunjucks = require('nunjucks')
const app = express();
const routes = require('./routes/');
const bodyParser = require('body-parser');
const socketio = require('socket.io')


app.set('view engine', 'html'); // have res.render work with html files
nunjucks.configure('views',{noCache: true}); // point nunjucks to the proper directory for templates
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks

app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', routes(io)); //next ?

app.use(express.static('public'))

app.use('/tweets',function (req, res, next) {
	console.log(chalk.blue.bgRed.bold("You're in the Special Zone!"))
	res.status(200).send('welcome to the Special Zone!')
	next();
})

app.use(function (req, res, next) {
	console.log(chalk.green(req.method, req.path, res.statusCode)) 
	next();
})

// app.post('/tweets', function(req, res){
// 	alert('yo')
// 	console.log('jyyeye')
// 	res.status(200)
// });

// app.get('/stylesheets/style.css', function(req, res){

// 	res.sendFile(__dirname + '/public/stylesheets/style.css')
// });

app.get('/', function(req, res){
	console.log(chalk.blue('server listening'));
	const people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
	const tacos = ['soft','hard','spicy']
	res.render( 'index', {subtitle: 'this is a subtitle', title: 'Hall of Fame', people: people, tacos: tacos} );
});



app.get('/news', function(req, res){
  	console.log('server listening on the news page')
  	res.status(200).send('welcome to the news page!')
});


var server = app.listen(3000);
var io = socketio.listen(server);
exports.io = io
