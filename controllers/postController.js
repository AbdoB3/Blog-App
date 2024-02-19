const getPosts = require('../models/post')

const getAllPosts = (req, res) => {
    const posts = getPosts.getAllPosts();
    res.send(posts)
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

const createPost = (req, res) => {
    let posts = getPosts.getAllPosts();
    let lengthP=posts.length;
    let getId=posts[lengthP-1].id;
    let id=getId+1;
    let { title, desc } = req.body;
    getPosts.createPost({ id, title, desc })
    res.send(posts)
};

const updatePost = (req, res,next) => {
    try{
        let id = req.params.id
        let { title, desc } = req.body;
        getPosts.updatePost(title, desc, id)
        res.send(getPosts.getAllPosts());
    }catch{
        const err = new Error('post not found');
        next(err)
    }
};

const deletePost = (req, res,next) => {
    let myPost = getPosts.getPostById(req.params.id)
    if (myPost) {
        getPosts.deletePost(req.params.id);
        res.send(getPosts.getAllPosts());
    } else {
        const err = new Error(' post not found');
        next(err)
    }
};

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost }