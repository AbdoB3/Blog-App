const express  = require('express');
const router= express.Router();

const {getAllUsers,registration,login,changeRole} = require('../controllers/usersController')
const {authorize} = require('../middlewares/postMiddlewares');

router.get('/',getAllUsers)
router.post('/registration',registration)
router.post('/login',login)


router.patch('/role/:id',authorize('admin'),changeRole) //only for admin


module.exports=router