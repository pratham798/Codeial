const express = require('express');
const router=express.Router();
const passport=require('passport');
const usersController=require('../controllers/users_controller');

router.get('/profile',passport.checkAuthentication,usersController.profile);
router.get('/Sign-up',usersController.signUp);
router.get('/Sign-in',usersController.signIn);
//creating a new user through sign up 
//form used to enter data has the method post thats why router.post instead of router.get
router.post('/create',usersController.create);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/Sign-in' ,failureMessage:true}, //if user failed to sign in then redirect to the sign up page
),usersController.createSession); //else this function is called

router.get('/Sign-out',usersController.destroySession);

module.exports = router;