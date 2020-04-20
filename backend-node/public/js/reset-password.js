function start(){
  startPartials()
}


function changePassword(event){
  var email = document.getElementById('email').value
  var secret = getParameterByName('secret') || 'null'
  var password = document.getElementById('password').value
  var confirmPassword = document.getElementById('newPassword').value
  if(!password || !confirmPassword || !email){
    sendAlert('Napaka', "Izpolnite vsa polja!", "error")
  }
  else if(secret == 'null'){
    sendAlert('Napaka', "Manjkajoča koda!", "error")
  } else {
    if(password != confirmPassword){
      sendAlert('Napaka', 'Novo geslo se ne ujema s ponovljenim geslom!', 'error')
    } else {
      ajaxChangePassword(password, confirmPassword, secret, email, event)
    }
  }
  event.preventDefault();
}

function ajaxChangePassword(email, password, secret, email, event){
  $.ajax({
      type: 'POST',
      url: '/api/resetPassword/change',
      contentType: 'application/json',
      data: '{"new_password":"'+newPassword+'", "email":"'+email+'", "secret":"'+secret+'"}',
      dataType: 'json',
      success: function(data){
          console.log(data.message)
          sendAlert('Uspeh', 'Geslo je bilo spremenjeno!', 'success')
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
  if (message == 'Password changed!') sendAlert('Uspeh', 'Geslo je bilo spremenjeno!', 'success')
  if (message == 'Secret already used!') sendAlert('Napaka', 'Ta koda je že uporabljena!', 'error')
  if (message == 'Missing credentials!') sendAlert('Napaka', 'Manjkajoče geslo!', 'error')
  if (message == 'No such user found!') sendAlert('Napaka', 'Uporabnik ali koda ni najden/a!', 'error')
  if (message == 'Internal Server Error!') sendAlert('Napaka', 'Napaka strežnika! Prosim poskusite kasneje!', 'error')
}

function sendAlert(title, message, icon){
  Swal.fire(
  title,
  message,
  icon
  )
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
