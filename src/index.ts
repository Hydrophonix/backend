// Core
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

// Resolvers
import { AuthResolver } from './resolvers';

// Instruments
import { app } from './server';
import { connectDatabase } from './database';
import { PORT } from './constants';

(async () => {
  await connectDatabase();

  // https://www.apollographql.com/docs/apollo-server/api/apollo-server/
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AuthResolver],
      validate: false
    }),
    context: ({ req, res }) => ({ req, res })
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}/graphql`);
  });
})();


// Apollo healthcheck endpoint
// /.well-known/apollo/server-health

