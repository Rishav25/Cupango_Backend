const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");
const HttpException = require('./utils/HttpException.utils');
const errorMiddleware = require('./middleware/error.middleware');
const userRouter = require('./routes/user.route');
const ResRouter = require('./routes/restaurent.route');
const BookingsRouter = require('./routes/bookings.route');
const OrderRouter = require('./routes/orders.route.js');
const ItemRouter = require('./routes/items.route.js');
const session = require('express-session');
const jwt = require('jsonwebtoken');

// Init express
const app = express();
// Init environment
dotenv.config();
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());
app.set('view engine', 'ejs');

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET' 
  }));


  app.get('/', function(req, res) {
    res.render('auth');
  });


const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());


const port = Number(process.env.PORT || 8000);


app.get('/success', (req, res) => {

    res.send(userProfile['emails'][0]['value']);

});
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
cb(null, obj);
});


// index.js

/*  Google AUTH  */

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '';
const GOOGLE_CLIENT_SECRET = '';
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback"
},
function(accessToken, refreshToken, profile, done) {
    userProfile=profile;
    return done(null, userProfile);
}
));

app.get('/auth/google',
passport.authenticate('google', { scope : ['profile', 'email'] }));
const UserModel = require('../src/models/user.model');
app.get('/auth/google/callback',
passport.authenticate('google', { failureRedirect: '/error' }),
async function(req, res) {
  email  = userProfile['emails'][0]['value'];

  console.log(email);
   const user = await UserModel.findOne({ email });

        if (!user) {
            throw new HttpException(401, 'Unable to login!');
        }
        console.log(user);
        // user matched!


        const secretKey = process.env.SECRET_JWT || "";
        const token = jwt.sign({ user_id: user.id.toString() }, secretKey, {
            expiresIn: '24h'
      
        });

        res.json({"token": token});
  
});



app.use(`/api/v1/users`, userRouter);
//app.use(`/google`, userRouter);
// 404 error

app.use('/api/v1/restaurants', ResRouter);
app.use('/api/v1/reservations', BookingsRouter);
app.use('/api/v1/orders' , OrderRouter);
//app.use('/api/v1/items' , ItemRouter);
app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Endpoint Not Found');
    next(err);
});

// Error middleware
app.use(errorMiddleware);

// starting the server
app.listen(port, () =>
    console.log(`Server running on port ${port}!`));


module.exports = app;
