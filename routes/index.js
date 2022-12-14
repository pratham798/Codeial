const express = require('express');
const router=express.Router();
const homecontroller=require('../controllers/home_controller'); //connecting with controller

//main router page where all the other routes can be accessed.we can create more routes
router.get('/',homecontroller.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
module.exports = router;