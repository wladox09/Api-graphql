const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const BodyParser = require("body-parser");
const userSchema = require("./schemas/User");
const userResolvers = require("./resolvers/user");
const login = require("./services/login");
const signIn = require("./services/signIn");
const authorization = require("./middleware/authorization");

const schema = userSchema;
const root = userResolvers;
const app = express();

app.use(BodyParser.json());

app.post("/login", async (request, response) => {
    const res = await login(request.body.email, request.body.password);
    response.json(res);
});

app.post("/signIn", async (request, response) => {
    const res = await signIn(request.body.email, request.body.password,
        request.body.name, request.body.lastName);
    response.json(res);
});

app.use(
    "/graphql",
    authorization,
    graphqlHTTP({
        schema: buildSchema(schema),
        rootValue: root,
        graphiql: false,
    })
);

app.listen(4040);
console.log("Running a API server...");
