import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import comment from "./Comment"
const Comment = comment.schema
const ImageSChema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    fileName: {
        type: String,
        required: false
    },
    views: {
        type: Number,
        required: false
    },
    likes: {
        type: Number,
        required: false
    },
    timeStamp: {
        type: Date,
        default : Date.now
    },
    comments: {
        type: [Comment],
        required: false
    }
});

ImageSChema.virtual('uniqueId')
    .get(function() {
        return this.filename.replace(path.extname(this.filename), '');
    });

const Image = mongoose.model('images', ImageSChema);

export default Image;