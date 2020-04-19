function start(){
  console.log('Ready to change the world!')
}

function changePassword(event){
  var oldPassword = document.getElementById('oldPassword').value
  var newPassword = document.getElementById('newPassword').value
  var newPasswordConfirm = document.getElementById('newPasswordConfirm').value
  if(!oldPassword || !newPassword || !newPasswordConfirm){
    sendAlert('Napaka', "Izpolnite vsa polja!", "error")
  } else {
    if(newPassword != newPasswordConfirm){
      sendAlert('Napaka', 'Novo geslo se ne ujema s ponovljenim geslom!', 'error')
    } else {
      ajaxChangePassword(oldPassword, newPassword, newPasswordConfirm, event)
    }
  }
  event.preventDefault();
}

function ajaxChangePassword(oldPassword, newPassword, newPasswordConfirm, event){
  $.ajax({
      type: 'POST',
      url: '/api/changePassword',
      contentType: 'application/json',
      data: '{"password": "'+oldPassword+'", "new_password":"'+newPassword+'"}',
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
  if (message == 'Old password is not correct!') sendAlert('Napaka', 'Staro geslo ni pravilno!', 'error')
  if (message == 'Missing credentials!') sendAlert('Napaka', 'Manjkajoče geslo!', 'error')
  if (message == 'No such user found!') sendAlert('Napaka', 'Uporabnik ni najden!', 'error')
  if (message == 'Internal Server Error!') sendAlert('Napaka', 'Napaka strežnika! Prosim poskusite kasneje!', 'error')
  if(message == 'Updating password failed!') sendAlert('Napaka', 'Spememba gesla neuspešna! Prosim poskusite kasneje!', 'error')
}

function sendAlert(title, message, icon){
  Swal.fire(
  title,
  message,
  icon
  )
}
