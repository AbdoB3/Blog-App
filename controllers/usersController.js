const User = require('../models/users');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');



const getAllUsers = (req, res) => {
    User.find()
        .then((users) => res.json(users))
        .catch(err => console.log('error ', err))
}


const registration = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        let user = new User({ 'username': req.body.username, 'password': hashedPassword })
        let savedUser = await user.save()
        res.json(savedUser)
    } catch (err) {
        console.log('catch err: ', err)
    }
};

const login = async (req, res) => {
    let userLogin = await User.findOne({ username: req.body.username })
    const match = await bcrypt.compare(req.body.password, userLogin.password);
    if (!userLogin) {
       return res.send('erro')
    }
    if (!match) {
       return res.status(402).send("Incort password")
    }
    const token = jwt.sign({ user: userLogin.id, role: userLogin.role }, 'secret_key', { expiresIn: '2h' });
    res.json(token)
}

const changeRole = async (req,res) => {
    let userLogin = await User.findByIdAndUpdate(req.params.id,{role:req.body.role})
    if(!userLogin){
        return res.status(401).send('User not found')
    }
    res.send(userLogin)
}

module.exports = { getAllUsers, registration, login, changeRole }
