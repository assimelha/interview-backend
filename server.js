import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import Knex from 'knex';
import { Model } from 'objection';
import dotenv from 'dotenv';

import { schema } from './schema';
import { resolvers } from './resolvers';
import knexConfig from './knexfile';
import { serializeUser } from './lib';

dotenv.config();

const knex = Knex(
  process.env.NODE_ENV === 'production'
    ? knexConfig.production
    : knexConfig.development,
);

Model.knex(knex);

const myGraphQLSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

const app = express();

// bodyParser is needed just for POST.
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({ schema: myGraphQLSchema }),
);

app.post(
  '/login', (req, res) => {
    res.send(req.body).end();
  }
);

app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled

app.listen(process.env.PORT, () => {
  console.log(`Listening through ${process.env.PORT}`);
});
