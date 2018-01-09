import { signUp, login } from './models/User';

export const resolvers = {
  Query: {
    hello: () => 'hello',
  },
  Mutation: {
    signUp: (_, { firstname, lastname, email, password }) =>
      signUp({ firstname, lastname, email, password }),
    login: (_, { email, password }) => login({ email, password }),
  },
};
