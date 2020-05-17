const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

//bring in routes
const routes = require('./routes');

const MONGO_URI = "mongodb://localhost/User"; 

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
app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("Server on " + port)
});