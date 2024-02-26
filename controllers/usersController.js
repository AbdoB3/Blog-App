const getUsers = require('../models/users');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');



const getAllUsers = (req, res) => {
    const users = getUsers.getAllUsers();
    res.send(users);
}


const registration = async (req, res) => {
    try {
        let users = getUsers.getAllUsers();
        let lengthU = users.length;
        let id;
        if(lengthU==0){
            id=1
        }else{
            let getId = users[lengthU - 1].id;
            id = parseInt(getId) + 1;
        }

        console.log('pass', req.body.password)
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        getUsers.registration({ 'id': id, 'username': req.body.username, 'password': hashedPassword ,'role':'user'})
        users.push({ 'id': id, 'username': req.body.username, 'password': hashedPassword ,'role':'user'});
        res.json(users)
    } catch (err) {
        console.log('catch err: ', err)
    }
};

const login = async (req, res) => {
    let users = getUsers.getAllUsers();
    let user = users.find(u => u.username === req.body.username)
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!user) {
        res.send('erro')
    }
    if (!match) {
        res.status(402).send("Incort password")
    }
    const token = jwt.sign({ user: user.id, role: user.role }, 'secret_key', { expiresIn: '1m' });
    res.json(token)
}

const logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      res.redirect('/post'); 
    });
  };

module.exports = { getAllUsers, registration, login,logout }
