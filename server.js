const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');

const authRoutes = require('./routes/authRoutes');
const oauthRoutes = require('./routes/oauthRoutes');
const passport = require('passport');

dotenv.config({path : './config.env'});
require('./controller/authController');

const app = express();

mongoose.connect(process.env.DATABASE_USER, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('Database connected successfully!!!'))
  .catch(err => console.log(`DB Error: ${err.message}`));

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use('/users', authRoutes);
app.use('/auth/google', oauthRoutes);

app.get('/', (req, res, next) => {
    res.send(`<div style={{margin: "20px"}}> <h1>Welcome to overpay family!! </h1> </div>
              <div style={{margin: "20px"}}> <a href="https://documenter.getpostman.com/view/17373422/Uz5FHwJa"> Open this link for POSTMAN documentation </a> </div>
              <div style={{margin: "20px"}}> <a href="http://127.0.0.1:3000/auth/google"> Sign In using Google Account </a> </div>
      `);
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App started at port ${port}`)
})