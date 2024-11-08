const mongoose = require('mongoose');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

const mongoURI = 'mongodb+srv://biggsstephaine:HGeAzZYDKl0cpRno@cluster0.fxpgp.mongodb.net/GraphQL_API';

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

// Middleware for handling GraphQL requests
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true, // Enable GraphiQL interface for testing
}));

// This starts the server
app.listen(4000, () => {
  console.log('Now listening for requests on port 4000');
});