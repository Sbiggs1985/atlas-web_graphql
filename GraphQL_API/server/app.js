const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');  // Import your schema

const app = express();

// Middleware for handling GraphQL requests
app.use('/graphql', graphqlHTTP({
  schema, // Use the schema here
  graphiql: true, // Enable GraphiQL interface for testing
}));

// Start the server
app.listen(4000, () => {
  console.log('Now listening for requests on port 4000');
});