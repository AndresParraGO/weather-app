const mongoose = require('mongoose');
require('dotenv').config();


// Connnect MongoDB

module.exports = async() => {
	try {
		mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true, 
			useUnifiedTopology: true
		});
	} catch(err) {
		console.log('Mal conectado');
	}
}