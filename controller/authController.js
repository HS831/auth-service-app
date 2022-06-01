const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const otpGenerator = require('otp-generator');

const sendEmail = require('../utils/email');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;


const OTP_CONFIG = {
  digits: true
}

const OTP = otpGenerator.generate(4, OTP_CONFIG);


const signtoken = id => {
   return jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn : process.env.JWT_EXPIRES_IN
    })
};

const createToken = (user,  statusCode, res) => {
    const token = signtoken(user._id);
    const cookieOptions = {
        expires : new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
        )
    }

    res.cookie('jwt', token, cookieOptions);
    user.password = undefined;

    res.status(statusCode).json({
        status : 'success',
        token
    })
};


exports.signup = async (req, res, next) => {
    const generatedOTP = OTP;
    const newUser = await User.create({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : req.body.password,
        passwordConfirm : req.body.passwordConfirm,
        otp : generatedOTP
    });

    try {
      const message = `Ha ha ha!!, your account is hacked!!! Ha ha ha`;

      await sendEmail({
        email: newUser.email,
        subject: 'Just to notify, your account is hacked!!',
        message
      });

      createToken(newUser, 201, res);
     // return next(newUser);
    }
    catch(err) {
      res.status(500).json({
        status : 'fail',
        message : 'There was an error sending the email. Try again later!'
      });

      //return next();
    }
};

exports.signin = async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        res.status(400).json({
            status : 'fail',
            data : 'Please enter your email and password'
        });

        return next();
    }

    const user = await User.findOne({ email }).select('+password');
    if(!user || !(await user.correctPassword(password, user.password))) {
        res.status(401).json({
            status : 'fail',
            data : 'Email or Password is incorrect'
        })

        return next();
    }

    createToken(user, 200, res);
};

exports.verifyEmail = async (req, res, next) => {
  const { email, otp } = req.body;
  const user = await User.findOne({email}).select('+otp');
  if(!user) {
    res.status(400).json({
      status: 'fail',
      message: 'User with this email does not exist!'
    })
  }
  
  if(otp !== user.otp) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid or Wrong OTP'
    })
  }


  createToken(user, 201, res);

}

exports.forgotPassword = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).json({
          status : 'fail',
          message : 'Please enter valid email address'
      });

      return next();
    }
  
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
  
    try {
      const resetURL = `${req.protocol}://${req.get(
        'host'
      )}/users/resetPassword/${resetToken}`;
    //   console.log(resetURL);
      const message = `Forgot your password? Click on this link to reset your password: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

      await sendEmail({
        email: user.email,
        subject: 'Your password reset token (valid for 10 min)',
        message
      });
  
      res.status(200).json({
        status: 'success',
        message: 'Token sent to email!'
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
  
      res.status(500).json({
          status : 'fail',
          message : 'There was an error sending the email. Try again later!'
      });

      return next();
    }
};

exports.resetPassword = async (req, res, next) => {
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');
  
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });
  
   
    if (!user) {
      res.status(400).json({
          status : 'fail',
          message : 'Token is invalid or expired'
      })

      return next();
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
  
    createToken(user, 200, res);
};

// const CLIENT = process.env.GOOGLE_CLIENT_ID;
// const SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
  clientID: '842094180502-jaso88m2v2o82e120tlhgcgtp7mb2ipr.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: "http://127.0.0.1:3000/auth/google/callback",
  passReqToCallback: true,
},
function(request, accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});





