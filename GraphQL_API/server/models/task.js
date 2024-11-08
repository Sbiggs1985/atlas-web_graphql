const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: String,
  weight: Number,
  description: String,
  projectId: { type: Schema.Types.ObjectId, ref: 'Project' }
});

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

module.exports = Task;