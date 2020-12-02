const User = require('../models/userModel')

function handleError(error){
    let err = { username: '', email: '', password: ''}

    if(error.message === 'incorrect username'){
        err.username = 'that username does not exist'
    }

    if(error.message === 'incorrect email'){
        err.email = 'that email is not valid'
    }

    if(error.message === 'incorrect password'){
        err.password = 'the password is incorrect'
    }

    if(error.code === 11000){
        err.email = 'that email is registered already'
        return err
    }

    if(error.message.includes('user validation failed')){
        Object.values(error.errors).forEach(({ properties }) => {
            err[properties.path] = properties.message
        })
    }
    return err
}

const userCtrl = {}


// create user detail - POST
userCtrl.createUser = async(req, res) => {
    try{
        let newUser = new User(req.body)
        let result = await newUser.save()
        res.status(200).send({message: 'Your account has been created', result})
    } catch (error){
        const warnings = handleError(error)
        res.status(400).json({warnings})
    }
}

// read user detail - GET
userCtrl.getUserDetails = async (req, res) => {
    try{
        let person = await User.find({username: req.body.username})
        if (!person){
            res.status(400).send({message: 'user does not exist'})
        } else{
            res.status(200).send({message: 'user found', person})
        }
    } catch (error){
        console.log(error)
    }
}

// update user detail - PUT
userCtrl.updateUserDetails = async (req, res) => {

    const {username, email, password} = req.body

    try{
        let person = await User.findOneAndUpdate({_id: req.params.id}, {username, email, password})
        res.status(200).send({message: 'user details updated', person})
    } catch (error){
        console.log(error)
    }
}

//  delete user detail - DELETE
userCtrl.deleteUser = async (req, res) => {

    try{
        await User.findOneAndDelete({_id: req.params.id})
        res.status(200).send({message: 'user successfully deleted'})
    } catch (error){
        console.log(error)
    }
}


module.exports = userCtrl