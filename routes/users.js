const express = require('express');
const router=express.Router();
const usersController=require('../controllers/users_controller');

router.get('/profile',usersController.profile);
router.get('/Sign-up',usersController.signUp);
router.get('/Sign-in',usersController.signIn);
//creating a new user through sign up 
//form used to enter data has the method post thats why router.post instead of router.get
router.post('/create',usersController.create);
router.post('/create-session',usersController.createSession);

module.exports = router;