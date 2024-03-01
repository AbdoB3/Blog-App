const Post = require('../models/post')

const getAllPosts = (req, res) => {
    Post.find()
        .then((posts) => res.json(posts))
        .catch(err => console.log('error ', err))
};

const getPostById = (req, res, next) => {
    let postById = getPosts.getPostById(req.params.id)
    if (postById) {
        res.send(postById)
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