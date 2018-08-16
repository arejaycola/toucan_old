const fs = require('fs');
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const colors = require('colors');

const {searchForVerifiedUser} = require('./TwitterHelper');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 80; 

var app = express();
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');


app.use(express.static(publicPath));


app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.post('/server/twitter-search', async (req, res) => {
	try{

		var user = await searchForVerifiedUser(req.body);
		fs.writeFileSync('results.json', JSON.stringify(user, undefined, 2));
		user.profile_image_url_https = user.profile_image_url_https.replace(new RegExp('_normal', 'g'), '')
		res.render('index', {
			user:user
		})
		// res.renderPartials({
		// 	result: {data: "user"}
		// });
		//res.render('partials/result', {layout: false, user: user})
	}catch(e){
		console.log(colors.red(e));
	}
});

app.get('/', (req, res) => {
	res.render('index');
});



app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});

