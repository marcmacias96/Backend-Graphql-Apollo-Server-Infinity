import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/graphql-mongo', { useNewUrlParser: true })
.then(() => console.log('connected to db'))
.catch(err => console.log(err));