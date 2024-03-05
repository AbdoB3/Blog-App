const Post = require('../models/post')


//Get Post By pagination
const getAllPosts = (req, res) => {
    const pageSize = 2;
    const pageNumber = req.query.p;
    Post.find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .then(users =>res.json(users) )
    .catch(err => console.log('error ', err))
}; 

//Get Post By pagination
const getPostById = async (req, res, next) => {
    let postById = await Post.findById(req.params.id)
    if (postById) {
        res.json(postById)
    } else {
        const err = new Error('post not found');
        next(err)
    }
};

const createPost = async (req, res) => {
    let { title, content } = req.body;
    let post = new Post({ title, content })
    try {
        let savedPost = await post.save()
        res.send(savedPost)
    } catch (e) { res.send(e.message) }
};

const updatePost = async (req, res, next) => {
    let { title, content } = req.body;
    try {
        let updatedPost = await Post.findOneAndUpdate({ title: title }, { content: content })
        if (!updatedPost) {
            return res.status(404).json('post not found')
        }

        res.send(updatedPost);
    } catch {
        const err = new Error('post not found');
        next(err)
    }
};

const deletePost = async (req, res, next) => {
    let id =req.params.id;
    let myPost = await Post.findByIdAndDelete(id)
    if (!myPost) {
        return res.status(404).json('post not found')
    } 
    res.send('Deleted successfuly');
};

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost }