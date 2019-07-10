import http from 'http';
import express from 'express';
import path from 'path'
import { ApolloServer, AuthenticationError } from 'apollo-server-express';

const app = express();


//mongodb://localhost/graphql-mongo

import './DB/connection'
import jwt from 'jsonwebtoken'
import typeDefs from './schema';
import resolvers from './resolvers.js'

//functions
const SECRET = 'Guitarra2896'
const getMe = async req => {
    const token = req.headers['x-token']
    if (token) {
        try {
            return await jwt.verify(token, SECRET)
        } catch (error) {
            throw new AuthenticationError(
                'Your session expired. Sign in again.',
            );
        }
    }
}

// settingss
app.set('port', process.env.PORT || 3000);
app.use('/static', express.static(path.join(__dirname, 'public')))
const SERVER = new ApolloServer({
    typeDefs,
    resolvers,
    subscriptions: {
      onConnect: () => console.log('Connected to websocket'),
    },
    context: async(req,) => {
        //const me = await getMe(req)
        //console.log(me);

        //return { SECRET, me }
        return { SECRET }
    },
    introspection: true,
    playground: true,
    playground: {
        endpoint: `http://localhost:3000/graphql`,
        settings: {
            'editor.theme': 'dark'
        }
    }
})
SERVER.applyMiddleware({
    app
})
const httpServer = http.createServer(app);
SERVER.installSubscriptionHandlers(httpServer);

// start the server
httpServer.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});