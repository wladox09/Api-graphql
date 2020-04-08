var express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");

var userSchema = require("./schemas/User");
var userResolvers = require("./resolvers/user");

var schema = userSchema;

var root = userResolvers

var app = express();
app.use(
    "/graphql",
    graphqlHTTP({
        schema: buildSchema(schema),
        rootValue: root,
        graphiql: true
    })
);
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
