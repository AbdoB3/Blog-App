const express  = require('express');
const router= express.Router();

const {getAllUsers,registration,login,logout} = require('../controllers/usersController')



router.get('/',getAllUsers)
router.post('/registration',registration)
router.post('/login',login)

router.get('/logout', logout);
  

module.exports=router