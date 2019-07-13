import { Car, User, Image, Comment } from './models/Models'

module.exports = {
    User : {
        images : async ({images}) => {
            return await Image.find()
        }
    }
}