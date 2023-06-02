# Auth Service App

## APIs List : 

- POST users/signup: Register New User
- POST users/signin: Log In 
- POST users/forgotPassword: Register for New Password
- POST users/resetPassword/:token: Updates the New Password
- POST users/verifyEmail: Verify the email account of user.

## Tech-Stack Used

Overpay-Auth uses a number of Libraries to work properly:

- Node.js
- Express.js
- mongoose
- For Database : MongoDB
- For authentication : jsonwebtoken
- For Google OAuth : passport.js and Google OAuth Client ID and Secret
- And many more..

## Installation

This application requires [Node.js](https://nodejs.org/) v10+ to run.

### Steps to run this project : 

```sh
Step 1 : Clone this Repo 
Step 2 : Open your bash shell and run code git clone {git clone url}
Step 3 : Install the dependencies and devDependencies and start the server using npm install.

Step 4 : npm run dev : For development enviorments
```
The local server will start at 127.0.0.1:3000/


