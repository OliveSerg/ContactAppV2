var app = {

  contacts: [],

  render: function(contacts){
    contacts.forEach(function(contact){
      $contactDiv = contactCard(contact)
      $contactDiv.appendTo($('#contactlist'))
    })
  },

  contactCard: function(contact){
    return $("<div>").addClass('contact').append([
      $('<h2>').addClass('fullname').text(contact.firstname + " " + contact.lastname),
      $('<p>').addClass('pnumber').text(contact.phonenumber),
      $('<p>').addClass('email').text(contact.email),
      $('<p>').addClass('birthday').text(contact.birthday),
      $('<button>').attr('type', 'button').addClass('update').text("Edit"),$('<button>').attr('type', 'button').addClass('delete').text("Delete")])
  },

  addContact: function(contact){

  },

  removeContact: function(contact){

  },

  updateContact: function(contact){

  },

  init: function(){

  }
}


$(document).ready(function() {
  app.init()

  $.ajax({
    url: '/contacts',
    method: 'GET',
    success: storeObject(data)
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

  $(document).on('click', '.update', function(){
    parentNode = $(this).parent()
    parentNode.children('.fullname')
    parentNode.children('.email')
    parentNode.children('.pnumber')
  })

  $(document).on('click', '.delete', function(e){
    parentNode = $(this).parent()
    name = parentNode.children('.fullname').text().split(" ")
    data = {contact: {
      firstname: name[0],
      lastname: name[1],
      email: parentNode.children('.email').text(),
      phonenumber: parentNode.children('.pnumber').text(),
      birthday: parentNode.children('.birthday').text()
    }}
    $.ajax({
      url: '/delete_contact',
      method: 'DELETE',
      data: data,
      success: function(contact){
        console.log(contact)
      }
    })
  })


  // function formattedDate(date){
  //   date = date.split("-")
  //   return new Date(date[2],date[1],date[0])
  // }
  // $('#search').click(function(){
  //   $.get({
  //     url: '/contact/'
  //   })
  // })
});
