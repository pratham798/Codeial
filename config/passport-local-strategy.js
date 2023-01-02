const passport=require('passport');

const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
       usernameField: 'email' //This is the part of syntax as we need to define a username field and acc to schema it is email
    },
    // inbuilt function
    function(email,password,done){
       User.findOne({email:email},function(err,user){
          if(err){
             console.log('Error in Finding user --> Passport');
             return done(err); //report an error to passport
          }
          if(!user || user.password!=password){
            console.log('Invalid Username/Password');
            return done(null,false); //null signifies there is no error then after that we pass the state if found or not found
          }
          return done(null,user);
       });
    }
));

//serializeing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);//setting the user id as key into the cookie in encrypted format as done function automatically encrypts it
})                     //IMPORTANT :- encyrption is done using expression

//deserializing user from the key in the cookies 
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in Finding user --> Passport');
            return done(err);
        }
        return done(null,user); 
    });

});

//check if the user is authenticated
passport.checkAuthentication=function(req,res,next){
    //if  user is authenticated then pass on the request to the next function(inbuil function used below)
    if(req.isAuthenticated()){
        return next();
    }
    //else redirect to sign in page
    return res.redirect('/users/sign-in');
}


passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated())
    {
        //req.user contains the current signed in user from the session cookie and we are just sending this to the local for views
        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;
