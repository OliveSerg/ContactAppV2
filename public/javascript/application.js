var app = {

  contacts: [],

  render: function(sort = "created_at"){
    $('#contactlist').html("")
    var contacts = _.sortBy(app.contacts, sort)
    contacts.forEach(function(contact){
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
        .text("Phone Number: " + contact.phonenumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")),
      $('<p>')
        .addClass('email')
        .text("Email: " + contact.email),
      $('<p>')
        .addClass('birthday')
        .text("DOB: " + moment(contact.birthday).format("MMM Do YYYY")),
      $('<button>')
        .attr('type', 'button')
        .addClass('edit glyphicon glyphicon-pencil'),
      $('<button>')
        .attr('type', 'button')
        .addClass('delete glyphicon glyphicon-remove'),
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
    var form = $('<form>').addClass('edit-form').attr('id','editForm')
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
        .text('Update'),
      $('<button>')
        .addClass('undo')
        .text('Undo')
    ])
  },

  undoChanges: function(e){
    e.preventDefault()
    $(this).parent().remove()
    $('.contact').children().show()
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
          return contact.id === data.id
        })
        app.render()
      }
    })
  },

  updateContact: function(e){
    e.preventDefault();
    var data = $('#editForm').serialize()
    $.ajax({
      url: '/update_contact',
      method: 'PUT',
      data: data,
      success: function(data){
        _.remove(app.contacts, function(contact){
          return contact.id === data.id
        })
        app.contacts.push(data)
        app.render()
      }
    })
  },

  init: function(){
    $(document).on('submit', '#addContactForm', app.addContact);
    $(document).on('click', '.edit', app.createForm);
    $(document).on('click', '.undo', app.undoChanges)
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
  $('#show-form').on('click', function(){
    $('.form').toggleClass('translate')
  })
  $('#order-by').on('click', 'li',function(){
    app.render($(this).attr('name'))
  })
});
