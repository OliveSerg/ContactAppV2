$(document).ready(function() {

  function addText(contact){
  }


  $.ajax({
    url: '/contacts',
    method: 'GET',
    success: function(contacts){
      $('body').append('<div id="contactlist"></div>');
      contacts.forEach(function(contact){
        $contactDiv = $("<div>").addClass('contact')
        $('<h2>').addClass('fullname').text(contact.firstname + " " + contact.lastname).appendTo($contactDiv)
        $('<p>').text(contact.phonenumber).appendTo($contactDiv)
        $('<p>').text(contact.email).appendTo($contactDiv)
        $('<p>').text(contact.birthday).appendTo($contactDiv)
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
        console.log(contact)
      }
    })

    // $.post('/add_contact', $('#add_contact').serialize())
    //   .done(function(){
    //
    // })
  })

  // $('#search').click(function(){
  //   $.get({
  //     url: '/contact/'
  //   })
  // })
});
