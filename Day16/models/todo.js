const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const todoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true
  },
  done: {
    type: Boolean
  },
  createdBy: {
    type: ObjectId,
    ref: 'User'
}
});


module.exports = mongoose.model("Todo", todoSchema);