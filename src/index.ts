// Core
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

// Resolvers
import { AuthResolver } from "./resolvers/AuthResolver";
import { BookResolver } from "./resolvers/BookResolver";

// Instruments
import { app } from './server';
import { connectDatabase } from './database';

const port = process.env.PORT || 4000;

(async () => {
  await connectDatabase();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AuthResolver, BookResolver],
      validate: false
    }),
    context: ({ req, res }) => ({ req, res })
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/graphql`);
  });
})();

