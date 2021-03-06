// front-end logic
var addressBook = new AddressBook;

function showContact (id) {
  var contact = addressBook.findContact(id);
  if ( contact ) {
    $("#span-first-name").text(contact.firstName);
    $("#span-last-name").text(contact.lastName);
    $("#span-phone-number").text(contact.phoneNumber);
    var buttons=$("#buttons");
    buttons.empty();
    buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
    $("#div-show-contact").show();
  }
};

function myDeleteContact (id) {
  addressBook.deleteContact(id);
  $("#div-show-contact").hide();
  displayContactDetails(addressBook);
};

function attachContactListeners() {
  // add event listener for each individual contact in list 
  $("#ul-contacts").on("click","li",function() {
    showContact(parseInt(this.id));
  });
  // add event listener for each delete button
  $("#buttons").on("click",".deleteButton", function() {
    myDeleteContact(parseInt(this.id));
  });
};

var displayContactDetails = function(addressBookToDisplay) {
  var contactsList = $("#ul-contacts");
  var htmlContactsList = "";
  addressBookToDisplay.contacts.forEach (function (contact) {
    htmlContactsList += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  })
  contactsList.html(htmlContactsList);
};

$(document).ready(function(){

  attachContactListeners();

  $("form#input").submit(function(event){
    event.preventDefault();

    // reset from previous runs
    $("#div-new-first-name").removeClass("has-error");
    $("#div-new-last-name").removeClass("has-error");
    $("#div-new-phone-number").removeClass("has-error");
    
    // get and validate form input
    var firstNameInput = $("#new-first-name").val();
    var lastNameInput = $("#new-last-name").val();
    var phoneNumberInput = $("#new-phone-number").val();

    // show output if valid inputs; else show alert
    if ( validInputs(firstNameInput, lastNameInput, phoneNumberInput)) {
      var newContact = new Contact(firstNameInput, lastNameInput, phoneNumberInput);
      addressBook.addContact (newContact);
      $("#new-first-name").val("");
      $("#new-last-name").val("");
      $("#new-phone-number").val("");
      displayContactDetails(addressBook);
    } else {
      alert ("Invalid entry. Try again.");
    }
  });

  // validate form input
  var validInputs = function(firstName, lastName, phoneNumber) {
    var blnValid = true;
    if (!firstName) {
      $("#div-new-first-name").addClass("has-error");
      blnValid = false;
    }
    if (!lastName) {
      $("#div-new-last-name").addClass("has-error");
      blnValid = false;
    }      
    if (!phoneNumber) {
      $("#div-new-phone-number").addClass("has-error");
      blnValid = false;
    }
    return blnValid;
  }
});


// biz logic for AddressBook -------------
function AddressBook() {
  this.contacts = [];
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function (id) {
  for(var i = 0; i < this.contacts.length; i++) {
    if ( this.contacts[i] ) {
      if (this.contacts[i].id === id ) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function (id) {
  for (var i=0; i < this.contacts.length; i++) {
    if ( this.contacts[i] ) {
      if (this.contacts[i].id === id ) {
        delete this.contacts[i];
        return true;
      }
    }
  }
  return false;
}

// biz logic for Contacts -------------
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}
