function start(){
  var status = urlParams["status"] || ''
  var query = urlParams["reason"] || ''
  if(!query){
    login()
  }
  else{
    if(query == 'missing'){
      sendAlert('Napaka', 'Manjka email ali geslo!', 'error')
    }
    login()
  }
}

function ajaxLogin(event){
  var email = document.getElementById('email').value
  var password = document.getElementById('password').value
  $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/login',
      contentType: 'application/json',
      data: '{"email": "'+email+'", "password":"'+password+'"}',
      dataType: 'json',
      success: function(data){
          console.log(data.message, data.token)
          window.localStorage.setItem('jwt', data.token)
          //localStorage.getItem('jwt')
      },
      error: function(data){
        console.log('ERROR: '+JSON.stringify(data))
        handleErrorMessages(data)
      }
  });
  event.preventDefault();
}

function handleErrorMessages(data){
  var message = data.responseJSON.message
  if (message == 'No such user found') sendAlert('Napaka', 'Uporabnik ni najden!', 'error')
  if (message == 'Password is not correct!') sendAlert('Napaka', 'Geslo ni pravilno!', 'error')
  if (message == 'Missing credentials!') sendAlert('Napaka', 'Manjkajoče geslo ali email!', 'error')
  if (message == 'Email is not verified!') sendAlert('Napaka', 'Email še ni potrjen!!', 'error')
  if (message == 'Internal Server Error!') sendAlert('Napaka', 'Napaka strežnika! Prosim poskusite kasneje!', 'error')
}

function register(){
  var register = `<form class="border rounded p-5">
    <h3 class="mb-4 text-center">Registracija</h3>
    <div class="form-group">
      <input type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Ime in Priimek" required>
    </div>
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
    <button type="submit" class="btn btn-success btn-round btn-block shadow-sm" onclick='ajaxLogin(event)'>Prijava</button>
    <small class="d-block mt-4 text-center"><a class="text-gray" href="#">Pozabljeno geslo?</a></small>
  </form>`
  document.getElementById('login-register').innerHTML = register
  document.getElementById('left-button').innerHTML = '<a class="btn btn-outline-light btn-lg btn-round" onclick="register()">Registracija</a>'
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
