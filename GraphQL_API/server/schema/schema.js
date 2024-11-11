const Task = require('../models/task');
const Project = require('../models/project');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList } = graphql;
const _ = require('lodash');

const tasks = [
  { id: '1', title: 'Create your first webpage', weight: 1, description: 'Create HTML file', projectId: '1' },
  { id: '2', title: 'Structure your webpage', weight: 1, description: 'Add head and body tags', projectId: '1' },
];

const projects = [
  { id: '1', title: 'Advanced HTML', weight: 1, description: 'Learn HTML basics' },
  { id: '2', title: 'Bootstrap', weight: 1, description: 'Responsive front-end framework' },
];

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

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: TaskType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Task.findById(args.id);
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
        return Task.find();
      }
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve() {
        return Project.find();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});