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

---

POST /api/kyc

KYC (Know Your Customer) omogoča upload slike (npr. osebna izkaznica, selfie...) za verifikacijo novih uporabnikov in zmanjševanje zlorab. Slika se shrani v backend-node/kyc/ mapo, največja velikost je 5 MB (lahko spremeniš v index.js), dovoljeni formati so jpeg, png, gif.

Opomba: encType pri POST requestu (vsaj v HTML form) mora biti multipart/form-data

@apiParam {string} email User's email
@apiParam {file} image Image of user's ID, selfie...
