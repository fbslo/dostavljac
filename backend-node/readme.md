***Dokumentacija za NodeJS API:***

GET /api/verifyEmail

@apiParam {string} secret Secret used to verify user's email. Generated at sendVerificationEmail.js

POST /api/sendVerificationEmail

@apiParam {string} secret Server secret
@apiParam {string} email User's email
