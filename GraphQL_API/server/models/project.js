const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: String,
  weight: Number,
  description: String
});

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

module.exports = Project;