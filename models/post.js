const fs = require('fs')

const getAllPosts = () => {
    const posts = JSON.parse(fs.readFileSync('./posts.json', 'utf-8'))
    return posts
}

const getPostById = (id) => {
    let posts = getAllPosts();
    let data = posts.find(post => post.id == id)
    if (data) return data
}

const createPost = (data) => {
    let posts = getAllPosts();
    posts.push(data)
    fs.writeFileSync('./posts.json', JSON.stringify(posts))
}


const updatePost = (title, desc, id) => {
    let posts = getAllPosts();
    let myPost = posts.find(post => post.id == id)
    myPost.title = title
    myPost.desc = desc
    fs.writeFileSync('./posts.json', JSON.stringify(posts))
}

const deletePost = (id) => {
    let posts = getAllPosts();
    let myPost = posts.find(post => post.id == id)
    posts.splice(posts.indexOf(myPost, 0), 1)
    fs.writeFileSync('./posts.json', JSON.stringify(posts))
}


module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };