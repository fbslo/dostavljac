// TODO: get user details from api
var user_status = 'Prostovoljec'
var cakajoca_narocila = '12'

function start(){
  document.getElementById('current_user_status').innerHTML = user_status
  if(user_status == 'Uporabnik'){
    showUporabnikMainPage()
  }
  if(user_status == 'Prostovoljec'){
    showProstovoljecMainPage()
  }
}

function showUporabnikMainPage(){
  var navbar = `<li class="nav-item"><a class="nav-link" href="/novo-narocilo">Novo Naročilo</a></li>`
  var navbar2 = `<li class="nav-item"><a class="nav-link" href="/vsa-narocila">Tvoja Naročila</a></li>`
  document.getElementById('current_user_navbar').innerHTML = navbar
  document.getElementById('current_user_navbar2').innerHTML = navbar2
  var call_to_action = `<h5 class="font-weight-light mb-4"><strong>Potrebuješ pomoč pri nakupu izdelkov?</strong></h5>
  <a href="#" class="btn btn-lg btn-primary">Novo naročilo</a>`
  document.getElementById('call_to_action').innerHTML = call_to_action
}

function showProstovoljecMainPage(){
  var navbar = `<li class="nav-item"><a class="nav-link" href="/cakajoca-narocilo">Čakajoča Naročilo<span class="badge badge-warning ml-2">${cakajoca_narocila}</span></a></li>`
  var navbar2 = `<li class="nav-item"><a class="nav-link" href="/vsa-narocila">Tvoja Naročila</a></li>`
  document.getElementById('current_user_navbar').innerHTML = navbar
  document.getElementById('current_user_navbar2').innerHTML = navbar2
  var call_to_action = `<h5 class="font-weight-light mb-4"><strong>Želiš pomagati drugim?</strong></h5>
  <a href="/cakajoca-narocila" class="btn btn-lg btn-primary">Sprejmi naročilo</a>`
  document.getElementById('call_to_action').innerHTML = call_to_action
}
