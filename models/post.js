const mongoose=require('mongoose');
const User = require('./user');

const postSchema =new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
},
    {timestamps: true}
);

const Post=mongoose.model('Post',postSchema); //name of schema is post and is referring to postschema
module.exports=Post;