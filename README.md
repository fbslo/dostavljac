# dostavljac

Free community essentials delivery app. 

developed by @fbslo and @sijanec

---

***Dokumentacija za NodeJS API:***

Preimenuj `demo.env` v `.env` in dodaj potrebne podatke.

Dodaj podatke za MySQL baso podatkov v `database/db_config.json`

Dodaj potrebne knjižnice: `npm install`

`node index.js` (ali s pm2 `pm2 start index.js`)

---

- MySQL

Database table: `users`

`name TEXT, email TEXT, password TEXT, date TEXT, verifiedEmail TEXT, userStatus TEXT`

Database table: `verifyEmail`

`email TEXT, secret TEXT, date TEXT, used BOOL`

Database table: `kyc`

`email TEXT, file TEXT, date TEXT`

Database table: `resetPassword`

`email TEXT, secret TEXT, date TEXT, status TEXT`

---

`POST` `/api/sendVerificationEmail`

sendVerificationEmail is using Sendgrid's email API.

```
@apiParam {string} server_secret Server secret (from .env)
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
@apiParam {string} name User's name
@apiParam {string} email User's email
@apiParam {string} password User's password
@apiParam {string} userStatus Status of the user (Prostovoljec or Uporabnik)
```

Vrne JSON:
- `message: User created!`, uporabnik je usvarjen
- `message: User not created!`, napaka pri ustvarjanju uporabnika (MySQL napaka)
- `message: Missing credentials!`, če manjka geslo ali email ali je email v nepravilnem formatu
- `message: Name or password is to short!`, če je geslo krajše od 10 znakov ali ime krajše od 5 znakov.
- `message: Email already exisits!`, če je email že uporabljen.
- `message: Internal Server Error!`, če pride do napake pri prejemanju podatkov iz baze podatkov

---

`GET` `/api/kraji`

Seznam slovenskih krajev in poštnih številk.

```
@apiParam {string} filter (optional) Filter by name of postal code
```

Vrne JSON array oblike `{"result":[{"postnaStevilka": "1000", "kraj": "Ljubljana"}, {"postnaStevilka": "1001", "kraj": "Ljubljana - P. P."}]}`

Filter omogoča filtriranje rezultatov (npr. `?filter=1000`) po imenu kraja ali poštni številki (ali seznam krajev, ki vsebujejo ime/poštno števliko (npr. `?filter=lju` vrne vse kraje, ki imajo v imenu `lju`)).

Zahvala @DejanL za seznam krajev na https://api.lavbic.net/kraji

---

`POST` `/login`

Pridobitev JSON Web Token (JWT) za autentikacijo uporabnika.

```
@apiParam {string} email User's email
@apiParam {string} password User's password
```

Vrne JSON:

- `message: ok`, JWT je shranjen v cookie
- `message: No such user found!`, če uporabnikov email ni v bazi podatkov
- `message: Password is not correct!`, če se geslo ne ujema s tistim v bazi podatkov
- `message: Missing credentials!`, če manjka geslo ali email
- `message: Email is not verified!`, če email še ni potrjen
- `message: Internal Server Error!`, če pride do napake pri prejemanju podatkov iz baze podatkov

---

`POST` `/api/userStatus`

Podrobnosti o uporabniku.

```
@apiParam {cookie} id User's cookie (from login)
```

Vrne JSON:

- `message: ok, result: userDetails`, userDetails so podatki o uporabniku.
- `message: No such user found!`, če uporabnikov email ni v bazi podatkov
- `message: Internal Server Error!`, če pride do napake pri prejemanju podatkov iz baze podatkov

---

`POST` `/api/resetPassword`

Pošiljanje emaila s potrditveno kodo za spremembo gesla.

```
@apiParam {string} email User's email
```

Vrne JSON:

- `message: Email sent!`, userDetails so podatki o uporabniku.
- `message: No such user found!`, če uporabnikov email ni v bazi podatkov
- `message: Missing credentials!`, če zahteva ne vsebuje emaila
- `message: Internal Server Error!`, če pride do napake pri prejemanju podatkov iz baze podatkov

---

`POST` `/api/resetPassword/change`

Sprememba pozabljenega gesla.

```
@apiParam {string} email User's email
@apiParam {string} secret Secret from email sent to user
@apiParam {string} new_password New user's password
```

Vrne JSON:

- `message: Password changed!`, geslo je uspešno spremenjeno.
- `message: Secret already used!`, koda je že uporabljena.
- `message: No such user found!`, če uporabnikov email ni v bazi podatkov
- `message: Missing credentials!`, če zahteva ne vsebuje emaila, gesla ali skrivne kode.
- `message: Internal Server Error!`, če pride do napake pri prejemanju podatkov iz baze podatkov

---

`POST` `/api/changePassword`

Sprememba  gesla.

```
@apiParam {cookie} id User's cookie
@apiParam {string} password User's old password
@apiParam {string} new_password New user's password
```

Vrne JSON:

- `message: Password changed!`, geslo je uspešno spremenjeno.
- `message: Old password is not correct!`, staro geslo ni pravilno.
- `message: No such user found!`, če uporabnikov email ni v bazi podatkov
- `message: Missing credentials!`, če zahteva ne vsebuje emaila, gesla ali skrivne kode.
- `message: Internal Server Error!`, če pride do napake pri prejemanju podatkov iz baze podatkov
- `message: Updating password failed!`, če pride do napake pri vstavljanju novega gesla v bazo podatkov

---

<details><summary>Donations</summary><p><p>Bitcoin: bc1q5a2c4amvwwftfcmw8ng3a0d5q6wftpmsq9kxa3</details>

