const mongoose = require('mongoose');
const bcrypt = require('bcrypt');   //for password hashing

const userSchema = new mongoose.Schema({                        //setting model keys
    username: {
        type: String,
         minlength: [5, 'minimum username length is 5'], 
         maxlength: [16, 'maximum username length is 16'],
         unique: true,
         required: [true, 'please enter a username'],
         lowercase: true
        },
    email: {
        type: String,
        unique: true,
        required: [true, 'the email field is required'],
        lowercase: true
    },
    password: {
        type: String,
         minlength: 8,
         required: [true, 'you must enter a password']
        }
});

const User = mongoose.model('user', userSchema)  //modelling a collection called user

userSchema.pre('save', async function(next){
    const salt = bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()   
})


module.exports = User
