const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: [true,'required field'] }
},
    { timestamps: true }
);

const Post = mongoose.model('post',postSchema); 



module.exports = Post;