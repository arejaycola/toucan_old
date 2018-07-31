const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const {searchForVerifiedUser} = require('./TwitterHelper');

const port = process.env.PORT || 80; 

var app = express();
hbs.registerPartials(path.join(__dirname,  'views', 'partials'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

hbs.registerHelper('getCurrentYear', () =>{
	return new Date().getFullYear();
});

app.post('/server/twitter-search', (req, res) => {
	searchForVerifiedUser(req.body)
	.then((result) => {
		console.log(result.name);
	})
	.catch((error) => {
		console.log(error.red);
	});
})

app.get('/', (req, res) => {
	// console.log(req)
	res.render('index', {
		welcomeMessage: 'Hello, welcome to my page',
		pageTitle: 'Home Page'
	});
});



app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});

