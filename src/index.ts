// Core
import 'reflect-metadata';
import { ApolloServer, PubSub } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

// App
import { app } from './app';

// Resolvers
import { AuthResolver, UserResolver, TodoResolver } from './resolvers';

// Instruments
import { connectDatabase } from './database';
import { PORT, IS_DEV } from './constants';
import { formatValidationError } from './utils';

(async () => {
    await connectDatabase();

    const schema = await buildSchema({
        resolvers: [ AuthResolver, UserResolver, TodoResolver ],
    });

    // Apollo healthcheck endpoint
    // /.well-known/apollo/server-health
    // https://www.apollographql.com/docs/apollo-server/api/apollo-server/
    const apolloServer = new ApolloServer({
        schema,
        context:       ({ req, res }) => ({ req, res, pubsub: new PubSub() }),
        formatError:   formatValidationError,
        playground:    IS_DEV,
        introspection: IS_DEV,
    });

    apolloServer.applyMiddleware({ app, cors: false });

    app.listen(PORT, () => {
        console.log(`server started at http://localhost:${PORT}/graphql`);
    });
})();
