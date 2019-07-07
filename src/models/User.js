import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
const Schema = mongoose.Schema;
import image from "./Image"
const Image = image.schema
const UserSChema = new Schema({
  name: {
      type : String,
      required :true
  },
  email : {
      type : String,
      required : true
  },
  password : {
      type : String,
      required : true
  },
  images : {
      type : [Image],
      required : false
  }
});



UserSChema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)
    return hash
}
//este metodo ancripta la contrase;a
UserSChema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

UserSChema.methods.findByLogin = async function (login) {
    let user = await User.findOne({ email: login });

    if (!user) {
      user = await User.findOne({
        where: { email: login },
      });
    }

    return user;
}

const User = mongoose.model('users', UserSChema);

export default User;
