
const mongoose = require('mongoose');


// Connnect MongoDB

module.exports = async() => {
	try {
		mongoose.connect('mongodb+srv://gar1092940348:gar1092940348@cluster0.xllef.mongodb.net/weather-app-misiontic?retryWrites=true&w=majority', {
			useNewUrlParser: true, 
			useUnifiedTopology: true
		});
	} catch(err) {
		console.log('Mal conectado');
	}
}