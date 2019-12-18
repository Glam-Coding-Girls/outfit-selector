require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cors         = require('cors');
const session      = require('express-session')
const passport = require('./config/passport');

const app = express();




mongoose
  // .connect('mongodb://localhost/server2', {useNewUrlParser: true})
  .connect('mongodb+srv://pradeepa:pradeepa@cluster0-t4s9i.mongodb.net/outfits?retryWrites=true&w=majority', {useNewUrlParser: true})
//mongoose config
// mongoose.connect('mongodb://localhost/server2', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);


app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}));
// Express session middleware
// app.use(session({
//   secret: "basic-auth-secret",
//   save: true,
//   saveUninitialized: true,
//   resave: false,
//   cookie: { maxAge: 1000 * 60 * 60 }
//   }));
  app.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: "secret",
      cookie: { maxAge: 1000 * 60 * 60 }
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());


app.use(express.static(path.join(__dirname, './client/build'))) //Our front end folder 
// Middleware Setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));



// Express View engine setup

// app.use(require('node-sass-middleware')({
//   src:  path.join(__dirname, 'public'),
//   dest: path.join(__dirname, 'public'),
//   sourceMap: true
// }));     

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';




//Routes
const index = require('./routes/index');
app.use('/api', index);

const userRoute = require('./routes/user-route');
app.use('/api', userRoute);



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html')) //Whenver we go to my site i send this html file 
})
module.exports = app;