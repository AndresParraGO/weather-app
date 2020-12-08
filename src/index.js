
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;


// Config



// Routes

app.get('/', (req, res) => {
	res.send('<h1>Hello World!!!</h1>')
});




// Static Files



app.listen(PORT, err => console.log(`Listen in the port ${PORT}`))