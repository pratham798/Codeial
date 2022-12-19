//accessing the database
const User=require('../models/user');

module.exports.profile=function(req,res){
    if(req.cookies.user_id)//if cookie named user_id is present
    {
      // find by id works same as find one
      User.findById(req.cookies.user_id,function(err,user){
          if(user){
            return res.render('user_profile',{title:"User Profile", user:user});//rendering user_profile page in views
          }
      });
    }
    else{
        return res.redirect('/users/Sign-in');
    }
};

//Render Sign Up Page
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{title:"Codeial | Sign Up"});
};

//render Sign In page
module.exports.signIn=function(req,res){
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

//Get the Sign In data
module.exports.createSession=function(req,res){
    
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('error in finding email'); return;}
        if(!user){
            res.redirect('back');
        }
        else
        {
            if(user.password!=req.body.password){
                return res.redirect('back');
            }
            else{
               res.cookie('user_id',user.id);
               return res.redirect('/users/profile');

            //    we can also directly render the details from here instead of going to the profile page first
            //    return res.render('user_profile',{title:"User Profile", user:user});
            
            }
        }
    })
};