var app = {

  contacts: [],

  render: function(){
    $('#contactlist').html("")
    app.contacts.forEach(function(contact){
      var $contactDiv = app.contactCard(contact);
      $contactDiv.appendTo($('#contactlist'));
    })
  },

  contactCard: function(contact){
    return $("<div>").addClass('contact').append([
      $('<h2>')
        .addClass('fullname')
        .text(contact.firstname + " " + contact.lastname),
      $('<p>')
        .addClass('pnumber')
        .text(contact.phonenumber),
      $('<p>')
        .addClass('email')
        .text(contact.email),
      $('<p>')
        .addClass('birthday')
        .text(contact.birthday),
      $('<button>')
        .attr('type', 'button')
        .addClass('edit')
        .text("Edit"),
      $('<button>')
        .attr('type', 'button')
        .addClass('delete')
        .text("Delete"),
      $('<input>')
        .addClass('id')
        .attr('name', 'id')
        .attr('type', 'hidden')
        .attr('value', contact.id)])
  },

  createForm: function(){
    var parentNode = $(this).parent()
    parentNode.children().hide()
    var id = parentNode.children('.id').val()
    var contact = _.find(app.contacts, {id: parseInt(id)})
    var form = $('<form>').attr('id','editForm')
    form.append(parentNode.children('.id'))
    parentNode.append(form)
    form.append([
      $('<input>')
        .addClass('firstname-input')
        .attr('name', 'contact[firstname]')
        .attr('value',contact.firstname),
      $('<input>')
        .addClass('lastname-input')
        .attr('name', 'contact[lastname]')
        .attr('value',contact.lastname),
      $('<input>')
        .addClass('pnumber-input')
        .attr('name', 'contact[phonenumber]')
        .attr('value',contact.phonenumber),
      $('<input>')
        .addClass('email-input')
        .attr('name', 'contact[email]')
        .attr('value',contact.email),
      $('<input>')
        .addClass('birthday-input')
        .attr('name', 'contact[birthday]')
        .attr('value',contact.birthday),
      $('<button>')
        .addClass('update')
        .attr('type', 'data')
        .text('Update')
    ])
  },

  addContact: function(e){
    e.preventDefault();
    var data = $('#addContactForm').serialize()
    $.ajax({
      url: '/add_contact',
      method: 'POST',
      data: data,
      success: function(data){
        app.contacts.push(data)
        app.render()
      }
    })
  },

  removeContact: function(){
    var parentNode = $(this).parent()
    var id = parentNode.children('.id').val()
    $.ajax({
      url: `/delete_contact/${id}`,
      method: 'DELETE',
      success: function(data) {
        _.remove(app.contacts, function(contact){
          contact.id === data.id
        })
        app.render()
      }
    })
  },

  updateContact: function(){
    var data = $('#editForm').serialize()
    $.ajax({
      url: '/update_contact',
      method: 'PUT',
      data: data,
      success: function(data){
        _.remove(app.contacts, function(contact){
          contact.id === data.id
        })
        app.contacts.push(data)
        app.render()
      }
    })
  },

  init: function(){
    $(document).on('submit', '#addContactForm', app.addContact);
    $(document).on('click', '.edit', app.createForm);
    $(document).on('click', '.update', app.updateContact);
    $(document).on('click', '.delete', app.removeContact);
    $.ajax({
      url: '/contacts',
      method: 'GET',
      success: function(data){
        data.forEach(function(contact){
          app.contacts.push(contact)
        })
        app.render()
      }
    })
  }
}


$(document).ready(function() {
  app.init()

  // $.ajax({
  //   url: '/contacts',
  //   method: 'GET',
  //   success: storeObject(data)
  // })
  //
  // $('#addContactForm').submit(function(e){
  //   e.preventDefault()
  //   data = $('#addContactForm').serialize()
  //   $.ajax({
  //     url: '/add_contact',
  //     method: 'POST',
  //     data: data,
  //     success: function(contact){
  //       $contactDiv = contactCard(contact)
  //       $('#contactlist').prepend($contactDiv)
  //     }
  //   })
  // })
  //
  // $(document).on('click', '.update', function(){
  //   parentNode = $(this).parent()
  //   parentNode.children('.fullname')
  //   parentNode.children('.email')
  //   parentNode.children('.pnumber')
  // })
  //
  // $(document).on('click', '.delete', function(e){
  //   parentNode = $(this).parent()
  //   name = parentNode.children('.fullname').text().split(" ")
  //   data = {contact: {
  //     firstname: name[0],
  //     lastname: name[1],
  //     email: parentNode.children('.email').text(),
  //     phonenumber: parentNode.children('.pnumber').text(),
  //     birthday: parentNode.children('.birthday').text()
  //   }}
  //   $.ajax({
  //     url: '/delete_contact',
  //     method: 'DELETE',
  //     data: data,
  //     success: function(contact){
  //       console.log(contact)
  //     }
  //   })
  // })


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
