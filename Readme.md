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

### Test out the APIs in Postman

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/17373422-88747350-4e03-478b-994b-b83bd030637b?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D17373422-88747350-4e03-478b-994b-b83bd030637b%26entityType%3Dcollection%26workspaceId%3D8b7ad081-e86e-4420-a3e2-fa4ced2b1851#?env%5BProd%3Aauth-service%5D=W3sia2V5IjoiVVJMIiwidmFsdWUiOiJodHRwczovL2F1dGgtc2VydmljZS03c2czLm9ucmVuZGVyLmNvbS8iLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoiZGVmYXVsdCIsInNlc3Npb25WYWx1ZSI6Imh0dHBzOi8vYXV0aC1zZXJ2aWNlLTdzZzMub25yZW5kZXIuY29tLyIsInNlc3Npb25JbmRleCI6MH0seyJrZXkiOiJqd3QiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJhbnkiLCJzZXNzaW9uVmFsdWUiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJalkwTnpsbE1EVTRPVFprWXpjeE1EQXpNalJoTW1KaFppSXNJbWxoZENJNk1UWTROVGN3T0RnNU15d2laWGh3SWpveE5qZzFOekE0T0RremZRLkwzbVMyZ0JwZS4uLiIsInNlc3Npb25JbmRleCI6MX1d)


