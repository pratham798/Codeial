const express=require('express');
const app=express();
const port=8000;

//use express router
app.use('/',require('./routes')); //any thing appended in url will first got to main route which contains all other routes(homecontroller)
//there the route which has the same url will get accessed

// setting view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
   if(err) {
    console.log(`Error in running server: ${err}`);
   };
   console.log(`Server is running at ${port}`);
})