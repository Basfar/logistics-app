# logistics app 

## Setting up locally

Make sure node is installed before proceeding, to check if node is installed run `node --version`. If it works, you can proceed

Open git bash and type this command `git clone https://github.com/Nero2005/logistics-app.git`. Next, cd into logistics-app and run npm install.

Create a .env file with the following keys:

  - LOGISTICS_APP_DB, create a mongo atlas account and a new database, then copy the connection url and paste here
  - PORT, port number
  - SECRET_PASSPHRASE, secret phrase for encrypting passwords, can be any string that's difficult to guess
  - JWT_SECRET, secret phrase for jwt encryption, can be any string that's difficult to guess
  - CRYPT_PASSWORD=secret phrase for otp encryption, can be any string that's difficult to guess
  - ACCOUNT_SID, create twilio account, then get the account sid from settings
  - AUTH_TOKEN_TWILIO, get authentication token from twilio account settings
  - MESSAGING_SERVICE_SID=get messaging service sid from twilio account settings
  - TWILIO_PHONE_NUMBER=get twilio phone number from account
  - FLW_SECRET_KEY=create a flutterwave account and get a secret from settings
  - SERVER_HOST, host for backend, like http://localhost:5000
  - HOME_PAGE, url for frontend home page

Run `npm run dev`
