import mongoose from 'mongoose';
//mongodb://localhost/graphql-mongo   
mongoose.connect('mongodb+srv://marcmacias96:Guitarra2896@@cluster0-olbfz.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
.then(() => console.log('connected to db'))
.catch(err => console.log(err));