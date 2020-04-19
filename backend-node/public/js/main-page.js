var user_status;

window.onload=function(){
  startPartials();
  load();
}

function load(){
  $.ajax({
      type: 'GET',
      url: '/api/userStatus',
      contentType: 'application/json',
      dataType: 'json',
      success: function(data){
          console.log(data.result)
          user_status = data.result.userStatus
          run(data)
      },
      error: function(data){
        console.log('ERROR: '+JSON.stringify(data))
        run()
      }
  });
}


function run(){
  if(user_status == 'Uporabnik'){
    showUporabnikMainPage()
  }
  if(user_status == 'Prostovoljec'){
    showProstovoljecMainPage()
  }
}

function showUporabnikMainPage(){
  var call_to_action = `<h5 class="font-weight-light mb-4"><strong>Potrebuješ pomoč pri nakupu izdelkov?</strong></h5>
  <a href="#" class="btn btn-lg btn-primary">Novo naročilo</a>`
  document.getElementById('call_to_action').innerHTML = call_to_action
}

function showProstovoljecMainPage(){
  var call_to_action = `<h5 class="font-weight-light mb-4"><strong>Želiš pomagati drugim?</strong></h5>
  <a href="/cakajoca-narocila" class="btn btn-lg btn-primary">Sprejmi naročilo</a>`
  document.getElementById('call_to_action').innerHTML = call_to_action
}
