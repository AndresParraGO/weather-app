
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


// Config

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




// Static Files
app.use(express.static(path.join(__dirname, 'public')));



app.listen(PORT, err => console.log(`Listen in the port ${PORT}`))