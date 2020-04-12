***Dokumentacija za NodeJS API:***

Rename demo.env to .env

---

Database table: verifyEmail
email TEXT, secret TEXT, date TEXT, used BOOL

---

GET /api/verifyEmail

@apiParam {string} secret Secret used to verify user's email. Generated at sendVerificationEmail.js

---

POST /api/sendVerificationEmail

sendVerificationEmail is using Sendgrid's email API.

@apiParam {string} secret Server secret (from .env)
@apiParam {string} email User's email
