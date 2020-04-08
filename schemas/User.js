const userSchema = `
    type Query {
        user(id: String!): User
        users: [User]
        },
        type Mutation {
            create(name: String!, lastName: String!, email: String!): User
            update(id: String!, name: String!, lastName: String!): User
        },
        type User {
            id: String,
            email: String,
            name: String,
            lastName: String,
    }`;

module.exports = userSchema;