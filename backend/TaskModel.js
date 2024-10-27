const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String,default:"true"}
});

module.exports = mongoose.model('TaskModel', TaskSchema);