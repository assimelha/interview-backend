const schema = `
type User {
  firstname : String!
  lastname: String!
  email: String!
}

type Query {
  hello: String
}

type Mutation {
  signUp(firstname: String!, lastname: String!, email: String!, password: String!) : LoginOutput
  login(email: String!, password: String!): LoginOutput
}

type LoginOutput {
  user: User
  token: String
}

schema {
    query: Query
    mutation: Mutation
  }
`;

// eslint-disable-next-line import/prefer-default-export
export { schema };
