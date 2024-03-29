const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true},
    role: {type:String,default:'user'},
},
    { timestamps: true }
);

const User = mongoose.model('user',userSchema); 


module.exports = User;