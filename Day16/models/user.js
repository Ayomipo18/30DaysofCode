const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true
	},
	email: {
		type: String,
        trim: true,
        required: true
	},
	hash: {
		type: String,
        required: true
    }
});

module.exports = mongoose.model("User", userSchema);