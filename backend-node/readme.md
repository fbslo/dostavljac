***Dokumentacija za NodeJS API:***

Preimenuj `demo.env` v `.env`

---

Database table: `users`

`name TEXT, email TEXT, password TEXT, date TEXT, verifiedEmail TEXT`

Database table: `verifyEmail`

`email TEXT, secret TEXT, date TEXT, used BOOL`

Database table: `kyc`

`email TEXT, file TEXT, date TEXT`


---

`POST` `/api/sendVerificationEmail`

sendVerificationEmail is using Sendgrid's email API.

```
@apiParam {string} secret Server secret (from .env)
@apiParam {string} email User's email
```

sendVerificationEmail omogoča pošiljanje email-ov z potrditveno povezavo/kodo uporabnikom. Potrditvena koda je dolga 30 znakov, shrani se v `verifyEmail` tabelo v bazi podtakov.

---

`GET` `/api/verifyEmail`

```
@apiParam {string} secret Secret used to verify user's email. Generated at sendVerificationEmail.js
```

`GET` zahteva na `/api/verifyEmail` potrdi uporabikov email naslov in spremeni status `used` v tabeli `verifyEmail` iz `false` v `true`.

---

`POST` `/api/kyc`

```
@apiParam {string} email User's email
@apiParam {file} image Image of user's ID, selfie...
```

KYC (Know Your Customer) omogoča upload slike (npr. osebna izkaznica, selfie...) za verifikacijo novih uporabnikov in zmanjševanje zlorab. Slika se shrani v `backend-node/kyc/` mapo, največja velikost je 5 MB (lahko spremeniš v index.js), dovoljeni formati so jpeg, png, gif.

Opomba: `encType` pri POST requestu (vsaj v HTML form) mora biti `multipart/form-data`.

---

`POST` `/api/register`

Registracija novih uporabnikov.

```
@apiParam {string} email User's email
@apiParam {string} password User's password
```

If email, password or name is missing, redirect to: ?status=false&reason=missing
