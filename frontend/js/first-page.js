function register(){
  var register = `
  <form class="border rounded p-5">
    <h3 class="mb-4 text-center">Registracija</h3>
    <div class="form-group">
      <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="E-mail" required>
    </div>
    <div class="form-group">
      <input type="password" class="form-control" id="password" placeholder="Geslo" required>
    </div>
    <button type="submit" class="btn btn-success btn-round btn-block shadow-sm">Registracija</button>
    <small class="d-block mt-4 text-center"><a class="text-gray" onclick='login()'>Prijava</a></small>
  </form>`
  document.getElementById('login-register').innerHTML = register
  document.getElementById('left-button').innerHTML = '<a class="btn btn-outline-light btn-lg btn-round" onclick="login()">Prijava</a>'
}

function login(){
  var register = `
  <form class="border rounded p-5">
    <h3 class="mb-4 text-center">Prijava</h3>
    <div class="form-group">
      <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="E-mail" required>
    </div>
    <div class="form-group">
      <input type="password" class="form-control" id="password" placeholder="Geslo" required>
    </div>
    <div class="form-group form-check">
      <input type="checkbox" class="form-check-input" id="exampleCheck1">
      <label class="form-check-label small text-muted" for="exampleCheck1">Zapomni si me</label>
    </div>
    <button type="submit" class="btn btn-success btn-round btn-block shadow-sm">Prijava</button>
    <small class="d-block mt-4 text-center"><a class="text-gray" href="#">Pozabljeno geslo?</a></small>
  </form>`
  document.getElementById('login-register').innerHTML = register
  document.getElementById('left-button').innerHTML = '<a class="btn btn-outline-light btn-lg btn-round" onclick="register()">Registracija</a>'
}
