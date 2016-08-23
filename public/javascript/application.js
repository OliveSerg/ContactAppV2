$(document).ready(function() {

  function formattedDate(date){
    date = date.split("-")
    return new Date(date[2],date[1],date[0])
  }

  function contactCard(contact){
    return $("<div>").addClass('contact').append([
      $('<h2>').addClass('fullname').text(contact.firstname + " " + contact.lastname),
      $('<p>').text(contact.phonenumber),
      $('<p>').text(contact.email),
      $('<p>').text(contact.birthday),
      $('<button>').attr('type', 'button').addClass('update').text("Edit"),$('<button>').attr('type', 'button').addClass('delete').text("Delete")])
  }


  $.ajax({
    url: '/contacts',
    method: 'GET',
    success: function(contacts){
      $('body').append('<div id="contactlist"></div>');
      contacts.forEach(function(contact){
        $contactDiv = contactCard(contact)
        $contactDiv.appendTo($('#contactlist'))
      })
    }
  })

  $('#addContactForm').submit(function(e){
    e.preventDefault()
    data = $('#addContactForm').serialize()
    $.ajax({
      url: '/add_contact',
      method: 'POST',
      data: data,
      success: function(contact){
        $contactDiv = contactCard(contact)
        $('#contactlist').prepend($contactDiv)
      }
    })
  })

  $('document').on('click', '.update', function(){

  })

  $('document').on('click', '.delete', function(){
    
  })

  // $('#search').click(function(){
  //   $.get({
  //     url: '/contact/'
  //   })
  // })
});
