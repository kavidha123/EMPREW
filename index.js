require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo'); 
const flashMiddleware = require('./config/flashMiddleware');
const {connectMongoose} = require('./config/db')

// Use body-parser for parsing request bodies
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./assets'));

// Set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(expressLayouts);

// Mongoose Connection
connectMongoose();



// Set up Express session
app.use(
  session({
    name: 'ERS',
    secret: 'employeeReviewSystem',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create({ // Initialize MongoStore without (session)
      mongoUrl: process.env.DATABASE_URL,
      autoRemove: 'disabled',
    }),
  })
);

// Initialize Passport and use it for user authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Use Connect flash for displaying flash messages
app.use(flash());
app.use(flashMiddleware.setFlash);

// Set up your application routes
app.use('/', require('./routes/index'));

// Start the server
const PORT = process.env.PORT || 8000

app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`);
})