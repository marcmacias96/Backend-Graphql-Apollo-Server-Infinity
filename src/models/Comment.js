import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const CommentSChema = new Schema({
  comment: {
      type : String,
      required :true
  },
  timeStamp : {
      type : Number,
      required : false,
      default : Date.now

  },
  postedBy : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'User',
      required : true
  }
});

const Comment = mongoose.model('comments', CommentSChema);

export default Comment;