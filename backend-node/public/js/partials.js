function startPartials(){
  loadPartials()
  footer()
}

var user_name;
var cakajoca_narocila = 10;
var user_status;

function loadPartials(){
  $.ajax({
      type: 'GET',
      url: '/api/userStatus',
      contentType: 'application/json',
      dataType: 'json',
      success: function(data){
          console.log(data.result)
          user_name = data.result.name
          user_status = data.result.userStatus
          runPartials(data)
      },
      error: function(data){
        console.log('ERROR: '+JSON.stringify(data))
        runPartials(data)
      }
  });
}

function runPartials(data){
  document.getElementById('current_user_status').innerHTML = user_status;
  if(user_status == 'Uporabnik'){
    showUporabnikNavbar()
  }
  if(user_status == 'Prostovoljec'){
    showProstovoljecNavbar()
  }
}


function showUporabnikNavbar(){
  var navbar = `<li class="nav-item"><a class="nav-link" href="/novo-narocilo">Novo Naročilo</a></li>`
  var navbar2 = `<li class="nav-item"><a class="nav-link" href="/vsa-narocila">Tvoja Naročila</a></li>`
  document.getElementById('current_user_navbar').innerHTML = navbar
  document.getElementById('current_user_navbar2').innerHTML = navbar2
  document.getElementById('user_name').innerHTML = user_name
}


function showProstovoljecNavbar(){
    document.getElementById('user_name').innerHTML = user_name
    var navbar = `<li class="nav-item"><a class="nav-link" href="/cakajoca-narocilo">Čakajoča Naročilo<span class="badge badge-warning ml-2">${cakajoca_narocila}</span></a></li>`
    var navbar2 = `<li class="nav-item"><a class="nav-link" href="/vsa-narocila">Tvoja Naročila</a></li>`
    document.getElementById('current_user_navbar').innerHTML = navbar
    document.getElementById('current_user_navbar2').innerHTML = navbar2
}

function footer(){
  var year = new Date().getFullYear()
  var footer = `<footer class="bg-black pb-5 pt-4 footer">
    <div class="container">
      <div class="row justify-content-center text-center">
        <div class="col-md-12">
          <span class="d-block mt-3 text-gray">&copy;	${year}, z <i class="fas fa-heart text-danger"></i> izdelala <a target="_blank" href="https://github.com/sijanec">@sijanec</a> in <a target="_blank" href="https://github.com/fbslo">@fbslo</a>.
          </span>
        </div>
      </div>
    </div>
  </footer>`
  document.getElementById('footer').innerHTML = footer
}
