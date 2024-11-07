<h2>Learning Objectives</h2>

<ul>
  <li>
    What GraphQL means:
    <p>A Query Langauge for your API, and a server-side runtime for executing queries using a type system you define for your data.</p>
  </li>
  <li>
    What is Graphiql:
    <p>An open-source data query language for API's and a server-side runtime for executing queries. Developed by FAcebook and made open source for the world. Unlike most REST APIs, GraphQL allows clients to request exactly the data theey need in a single query.</p>
  </li>
  <li>
    How to test queries using Graphiql
    <p>Start your GraphQL server and open the GraphiQL interface. Then you'll write a query or mutation. Then you'll add variables, etc. Then run the query. make sure to explore the schema to see available queries. This helps you know what data is available and how to structure your queries.</p>
  </li>
  <li>
    What is Apollo
    <p>Apollo is a popular platform for building, managing, and optimizing GraohQL.</p>
  </li>
</ul>

<h2>Process</h2>
<ul>
  <li>
    Task One
    1. Make sure you have express, expresss-graphql, and graphql installed:
    npm install express express-graphql graphql
    2. Modify app.js
    Update app.js to use schema you will define in schema.js:
    3. Create schema.js:
    Add GraphQLObjectType object using the object destructuring syntax. The create a new GrapgQLObject Type: TaskType which contains 2 parameters: (Name: Task, Fields property: Object contains a set of properties. (Id of type GraphQL string, title of type GraphQL string, weight of type GraphQLLint, and description of type GraphQLString.)

  </li>
</ul>
