import { AuthenticationError, UserInputError, PubSub } from 'apollo-server-express';
import { Car, User, Image, Comment } from './models/Models'
import { ObjectID } from 'mongodb'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import { randomNumber } from './Helpers/libs.js'

const pubsub = new PubSub();
const PHOTO_ADDED = 'PHOTO_ADDED';
const COMMENT_ADDED = 'COMMENT_ADDED';
const createToken = async(user, secret, expireIn) => {
    const { _id, email, name } = user
    return await jwt.sign({ _id, email, name }, secret)
}

export default {
    Query: {
        allCars: async(parent, args) => {
            const cars = await Car.find();
            return cars.map(x => {
                x._id = x._id.toString();
                return x;
            })
        },
        getUsers: async(parent, args) => {
            const users = await User.find()
            return users
        },
        getUser: async(parent, args) => {
            const { id } = args
            const user = await User.findOne({ _id: id })
            return user
        },
        getImage: async(parent, args) => {
            const { id } = args
            const image = await Image.findOne({ _id: id })
            return image
        },
        getImages: async(parent, args) => {
            const images = await Image.find()
            return images
        },
        getComment: async(parent, args) => {
            const { id } = args
            const comment = await Comment.findOne({ _id: id })
            return comment
        },
        getComments: async(parent, args) => {
            const comments = await Comment.find()
            console.log(comments);

            return comments
        },
        stats : async (parent, args) => {
            const { usr_id } = args
            const user = await User.findOne({ _id : usr_id})
            let likes
            user.images.forEach(image => {
               likes += image.likes 
            });
            const stats = {
                images : user.images.length,
                comments : user.images.comments.length,
                views : 0,
                likes : likes
            }
            return stats
        }

    },
    Mutation: {
        createCar: async(parent, args) => {
            const car = await new Car(args).save();
            car._id = car._id.toString();
            return car;
        },
        signIn: async(parent, args, { SECRET }) => {
            const { input } = args
            //const user = await User.findByLogin(input.email)
            let user = await User.findOne({ email: input.email });
            if (!user) {
                throw new UserInputError(
                    'No user found with this login credentials.',
                );
            }
            const isValid = await user.matchPassword(input.password)
            if (!isValid) {
                if (!isValid) {
                    throw new AuthenticationError('Invalid password.');
                }
            }
            return { token: createToken(user, SECRET, '30m') };
        },
        signUp: async(parent, args, { SECRET }) => {
            const { input } = args
            const defautls = {
                //campos no obligatorios
                name: ``,
                email: ``,
                password: ``,
                images: []
            }
            const user = await new User(Object.assign(defautls, input)).save()
            user.password = await user.encryptPassword(input.password)
            await user.save()
            return { token: createToken(user, SECRET, '30m') }
        },
        createUser: async(parent, args) => {
            const { input } = args
            const defautls = {
                //campos no obligatorios
                name: ``,
                email: ``,
                password: ``,
                images: []
            }
            const user = await new User(Object.assign(defautls, input)).save()
            user.password = await user.encryptPassword(input.password)
            await user.save()
            return user
        },
        createImage: async(parent, args, req) => {
            const { input, usr_id } = args
            var defautls = {
                //campos no obligatorios
                title: ``,
                description: ``,
                fileName: '',
                views: 0,
                likes: 0,
                uniqueId: ``,
                comments: [],

            }

            if (input.file) {
                const file = await input.file.then(file => {
                    return file
                })
                const { filename, createReadStream } = file
                const imgUrl = randomNumber();
                const stream = createReadStream()
                const ext = path.extname(filename).toLowerCase();
                const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);
                if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
                    stream.on('data', (data) => {


                        fs.appendFile(targetPath, data, function(err) {
                            if (err) throw err;

                        });
                    })

                }
                defautls.fileName = imgUrl + ext
                defautls.uniqueId = imgUrl
            }

            const image = await new Image(Object.assign(defautls, input)).save()
            const user = await User.findOne({ _id: ObjectID(usr_id) })
            user.images.push(image)
            user.save()
            pubsub.publish(PHOTO_ADDED, { photos: image });
            return user

        },
        createComment: async(parent, args) => {
            const { input, img_id } = args
            const defautls = {
                //campos no obligatorios
                comment: ``,
                postedBy: ``
            }
            const comment = await new Comment(Object.assign(defautls, input))
            comment.save()
            const image = await Image.findOne({ _id: ObjectID(img_id) })
            image.comments.push(comment)
            image.save()
            pubsub.publish(COMMENT_ADDED, { comments: comment });
            return image
        },
        like : async(parent, args) => {
            const { img_id } = args
            const image = await Image.findOne({ _id: ObjectID(img_id) })
            image.likes = image.likes + 1
            await image.save()
            return image
        }
    },
    Subscription :  {
        photos : {
          subscribe: () => pubsub.asyncIterator([PHOTO_ADDED])
        },
        comments : {
            subscribe : () => pubsub.asyncIterator([COMMENT_ADDED])
        }
      },
}