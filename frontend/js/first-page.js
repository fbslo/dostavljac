function register(){
  var register = `<form class="border rounded p-5" method="POST" action="/api/register">
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
  <form class="border rounded p-5" method="POST" action="/api/login">
    <h3 class="mb-4 text-center">Prijava</h3>
    <div class="form-group">
      <input type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Ime in Priimek" required>
    </div>
    <div class="form-group">
      <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="E-mail" required>
    </div>
    <div class="form-group">
      <input type="password" class="form-control" id="password" placeholder="Geslo" required>
    </div>
    <div class="form-group form-check">
      <input type="checkbox" class="form-check-input" id="check">
      <label class="form-check-label small text-muted" for="check">Zapomni si me</label>
    </div>
    <button type="submit" class="btn btn-success btn-round btn-block shadow-sm">Prijava</button>
    <small class="d-block mt-4 text-center"><a class="text-gray" href="#">Pozabljeno geslo?</a></small>
  </form>`
  document.getElementById('login-register').innerHTML = register
  document.getElementById('left-button').innerHTML = '<a class="btn btn-outline-light btn-lg btn-round" onclick="register()">Registracija</a>'
}


function start(){
  var status = urlParams["status"] || ''
  var query = urlParams["reason"] || ''
  if(!query) login()
  else{
    if(query == 'missing'){
      sendAlert('Napaka', 'Manjka email ali geslo!', 'error')
    }
    login()
  }
}

function sendAlert(title, message, icon){
  Swal.fire(
  title,
  message,
  icon
  )
}

var urlParams;
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
})();
