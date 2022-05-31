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


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App started at port ${port}`)
})