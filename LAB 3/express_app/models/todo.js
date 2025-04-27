const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
  },
  status: {
    type: String,
    enum: ['to-do', 'in progress', 'done'],
    default: 'to-do',
  },
}, { timestamps: true }); 

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;