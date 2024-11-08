const Task = require('../models/task');
const Project = require('../models/project');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList } = graphql;
const _ = require('lodash');

// Sample data
const tasks = [
  { id: '1', title: 'Create your first webpage', weight: 1, description: 'Create HTML file', projectId: '1' },
  { id: '2', title: 'Structure your webpage', weight: 1, description: 'Add head and body tags', projectId: '1' },
];

const projects = [
  { id: '1', title: 'Advanced HTML', weight: 1, description: 'Learn HTML basics' },
  { id: '2', title: 'Bootstrap', weight: 1, description: 'Responsive front-end framework' },
];

// Define TaskType with project relationship
const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    project: {
      type: ProjectType,
      resolve(parent, args) {
        return _.find(projects, { id: parent.projectId });
      }
    }
  }),
});

// Define ProjectType with tasks relationship
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve(parent, args) {
        return _.filter(tasks, { projectId: parent.id });
      }
    }
  }),
});

// RootQuery with tasks and projects lists
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: TaskType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Task.findById(args.id);  // Fetch task by ID from MongoDB
      }
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);  // Fetch project by ID from MongoDB
      }
    },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve() {
        return Task.find();  // Fetch all tasks from MongoDB
      }
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve() {
        return Project.find();  // Fetch all projects from MongoDB
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});