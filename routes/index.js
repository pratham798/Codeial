const express = require('express');
const router=express.Router();
const homecontroller=require('../controllers/home_controller'); //connecting with controller
 
router.get('/',homecontroller.home);

module.exports = router;