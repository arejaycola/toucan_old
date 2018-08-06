const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const colors = require('colors');

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

app.post('/server/twitter-search', async (req, res) => {
	try{
		var user = await searchForVerifiedUser(req.body);
		console.log(user.name);
	}catch(e){
		console.log(colors.red(e));
	}
	// searchForVerifiedUser(req.body).then((result) => {
	// })
	// .catch((error) => {
	// 	console.log(colors.red(error));
	// });
})

app.get('/', (req, res) => {
	res.render('index', {
		welcomeMessage: 'Hello, welcome to my page',
		pageTitle: 'Home Page'
	});
});



app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});

