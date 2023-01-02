const User=require('../models/user');

module.exports.profile=function(req,res){
    return res.render('home',{title:"User Profile"});
};

//Render Sign Up Page
module.exports.signUp=function(req,res){
    //is user is already authenticated then we donot need to sign in or sign up again so the same piece of code is written in both
    //sign in and sign up module function
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{title:"Codeial | Sign Up"});
};

//render Sign In page
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{title:"Codeial | Sign In"});
};

//Get the Signup data
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password)
    {
        res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('error in finding user while signing up'); return;}
        if(!user){
            User.create(req.body,function(err,user){
               if(err){console.log('error in creating user while signing up'); return;}
               return res.redirect('./users/Sign-in')
            });
        }
        else{
            res.redirect('back');
        }
    });
};

//Get the Sign data
module.exports.createSession=function(req,res){
    // later in future
    return res.redirect('/');
};

module.exports.destroySession=function(req,res){
    req.logout(); //inbuilt function for logging user out or deleting the session cookie
    return res.redirect('/');
};