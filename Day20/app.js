const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose= require('mongoose');
const path = require('path');

//configure dotenv
dotenv.config();

//initiate express app
const app = express();

//Conect to database
const MONGO_URI = process.env.MONGO_URI; 

mongoose.connect(MONGO_URI, { 
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex : true
	})
	.then(() => console.log('DB Connected'));

mongoose.connection.on('error', err => {
	console.log(`DB connection error: ${err.message}`)
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes'));
app.use('/shortener', require('./routes/url'));


const PORT = process.env.PORT || 3000;
//listen for app
app.listen(PORT, () => console.log(`Server is up and running on ${PORT}`));