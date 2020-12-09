
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = '226dbba9ae6f257e0974c3aa748fd529';


// Config

// MongoDB
const db = require('./config/db');
db();

// Model
const CommentModel = require('./models/comment');


// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// Set the default templating engine to ejs
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


// Routes

app.get('/', (req, res) => {
	res.render('index.html', { title: 'home' });
});

app.get('/about', (req, res) => {
	res.render('about.html', { title: 'about' });
});

app.get('/city/:city', async (req, res) => {
	res.render('city.html', { title: req.params.city, city: req.params.city});
});

app.get('/api/city/:city', async (req, res) => {
	fetch(`http://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&appid=${API_KEY}`)
		.then(response => response.json())
		.then(data => res.json(data));
});

app.post('/api/new-comment', (req, res) => {
	CommentModel({
		txt: req.body.txt,
		stars: req.body.stars
	})
	.save()
	res.json({msg: 'Guardado correctamente'});
});
app.get('/api/get-comments', async (req, res) => {
	const comments = await CommentModel.find();
    res.json(comments);
});


// Static Files
app.use(express.static(path.join(__dirname, 'public')));


// 404
app.get('*', (req, res) => {
	res.status(404).render('404.html', { title: 'Not Found' })
});


app.listen(PORT);