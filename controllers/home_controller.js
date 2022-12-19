module.exports.home = function(req,res){
   //title is sent to home.ejs in views as the name mentioned after render in ' '
   return res.render('home',{
      title:"Home"
   });
};