const express=require('express');
const cookieParser=require('cookie-parser'); //installed for accessing cookies
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');

//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportlocal=require('./config/passport-local-strategy');

//for storing session cookie in dtatabase so that every time we restart our server the cookies will not get deleted
const MongoStore=require('connect-mongo')(session);

const sassMiddleware=require('node-sass-middleware');

//middleware used to convert all scss files into css files
app.use(sassMiddleware({
   src:'./assets/scss', //from where the scss files are taken and converted into css
   dest:'./assets/css', //the converted files gets stored here
   debug: true, //to show errors during compilation if any
   outputStyle:'extended',
   prefix:'/css' //where to look for css files
})); 

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));
//use layouts (make sure to put it before routes as they are gonna be rendered in them)
app.use(expressLayouts);
//extract style and scripts from sub pages into layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// setting view engine
app.set('view engine','ejs');
app.set('views','./views');

//creating express session for storing data in session cookies
app.use(session({
   name:'codeial',
   secret:'something',
   saveUninitialized:false,// when the user identity is not been estabilished we donot need to save extra data in the seeion cookie
   resave:false, //after the identity of user has been set we donot need to rewrite the data in session cookie again and again
   cookie:{
      // duration of time after which cookie expires and you need to login again
      maxAge:(1000*60*100)
   },
   store: new MongoStore(
      {
         mongooseConnection:db,
         autoRemove:'disabled'
      },
      function(err){
         console.log(err||'connect-mongodb setup ok');
      }
   )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router
app.use('/',require('./routes')); //any thing appended in url will first got to main route which contains all other routes(homecontroller)
//there the route which has the same url will get accessed

app.listen(port,function(err){
   if(err) {
    console.log(`Error in running server: ${err}`);
   };
   console.log(`Server is running at ${port}`);
})