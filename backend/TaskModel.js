const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String,default:false},
  date:{type:String,required: true}
});

module.exports = mongoose.model('TaskModel', TaskSchema);
