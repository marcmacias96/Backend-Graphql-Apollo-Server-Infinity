import http from 'http'
import express from 'express';
import path from 'path'

const morgan = require('morgan');
const app = express();
//mongodb://localhost/graphql-mongo
import mongoose from 'mongoose';
mongoose.connect('mongodb+srv://mmacias:Guitarra2896@@cluster0-0z2u2.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => console.log('connected to db'))
    .catch(err => console.log(err));
/*
import jwt from 'jsonwebtoken'
import { ApolloServer, AuthenticationError } from 'apollo-server-express';



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
/*/
// settingss
app.set('port', process.env.PORT || 3000);
app.use('/public', express.static(path.join(__dirname, './public')));
/*const SERVER = new ApolloServer({
    typeDefs,
    resolvers,
    context: async(req) => {
        //const me = await getMe(req)
        //console.log(me);

        //return { SECRET, me }
        return { SECRET }
    },
    introspection: true,
    playground: true,
    playground: {
        endpoint: `http://localhost:4000/graphql`,
        settings: {
            'editor.theme': 'dark'
        }
    }
})*/
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
const router = express.Router();
router.get('/', (req,res) => {
    res.send("ok")
});
app.use(router);
/*
SERVER.applyMiddleware({
    app
})
const httpServer = http.createServer(app);
SERVER.installSubscriptionHandlers(httpServer);
*/
// start the server
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});