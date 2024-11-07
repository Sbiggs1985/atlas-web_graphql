const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID, GraphQLList } = graphql;

// Dummy data: array of projects and tasks
const projects = [
  { id: '1', title: 'Advanced HTML', weight: 1, description: 'Learn HTML basics.' },
  { id: '2', title: 'Bootstrap', weight: 1, description: 'Intro to Bootstrap.' }
];

const tasks = [
  { id: '1', title: 'Create your first webpage', weight: 1, description: 'HTML setup.', projectId: '1' },
  { id: '2', title: 'Structure your webpage', weight: 1, description: 'Create sections.', projectId: '1' }
];

// Define ProjectType
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve(parent) {
        return _.filter(tasks, { projectId: parent.id });
      }
    }
  })
});

// Define TaskType
const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    project: {
      type: ProjectType,
      resolve(parent) {
        return _.find(projects, { id: parent.projectId });
      }
    }
  })
});

// Define RootQuery
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: TaskType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(tasks, { id: args.id });
      }
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(projects, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});