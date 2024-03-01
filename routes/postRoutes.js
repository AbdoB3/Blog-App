const express  = require('express');
const router= express.Router();

const {getAllPosts,getPostById,createPost,updatePost,deletePost} = require('../controllers/postController')

const {authenticateUser,logs ,authorize} = require('../middlewares/postMiddlewares');


router.get('/',getAllPosts)
router.get('/:id',getPostById)

router.use(authenticateUser);
router.use(logs)

router.post('/',createPost)
router.put('/update',updatePost)
router.delete('/:id',authorize('admin'),deletePost)



module.exports=router