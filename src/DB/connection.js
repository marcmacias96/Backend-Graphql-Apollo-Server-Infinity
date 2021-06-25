import mongoose from 'mongoose';
//mongodb://localhost/graphql-mongo   
mongoose.connect('mongodb+srv://SECRET:HOST', { useNewUrlParser: true })
.then(() => console.log('connected to db'))
.catch(err => console.log(err));
