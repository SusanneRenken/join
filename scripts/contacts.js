/**
 * Loads and renders the content of the contact list.
 * This function groups the contacts by their initials and displays them in the UI.
 */
async function renderContacts() {
  let contactList = await getContactList();
  // console.log('contactList', contactList);

  renderContactsList(contactList);
}

/**
 * Groups the contacts by their initials.
 * This function filters the active user's contacts and groups them based on the first letter
 * of their initials.
 * @returns {Object} An object containing the contacts grouped by initials.
 */
async function getContactList() {
  let userContacts = await filterUserContacts();

  return userContacts.reduce((arr, contact) => {
    if (contact && contact.initials) {
      let firstInitial = contact.initials.charAt(0).toUpperCase();
      if (!arr[firstInitial]) {
        arr[firstInitial] = [];
      }
      arr[firstInitial].push(contact);
    }
    return arr;
  }, {});
}

/**
 * Filters the contacts of the currently active user.
 * This function loads the contacts from the database and filters only those that belong to the active user.
 * @returns {Array} A list of the filtered contacts of the active user.
 */
async function filterUserContacts() {
  let contacts = await fetchData("contacts");

  let userContacts = contacts.filter((contact) =>
    activeUser.contacts.includes(contact.id)
  );

  return userContacts;
}

/**
 * Renders the grouped contacts in the contact list.
 * This function sorts the initials, renders a letter box for each initial, and displays
 * the corresponding contacts.
 * @param {Object} contactList - An object containing the contacts grouped by initials.
 */
function renderContactsList(contactList) {
  let contactListContainer = document.getElementById("contact_list");
  contactListContainer.innerHTML = "";

  initActiveUser(contactListContainer);
  initContacts(contactList, contactListContainer);
}

/**
 * Initializes and displays the information of the active user in the contact list.
 * @param {HTMLElement} contactList - The HTML element of the contact list.
 */
function initActiveUser(contactListContainer) {
  activeUser.id = 0;

  let limitNameLength = limitTextLength(activeUser.name);
  let limitEmailLength = limitTextLength(activeUser.email);

  contactListContainer.innerHTML = generateActiveUserContact(
    activeUser,
    limitNameLength,
    limitEmailLength
  );
}

function initContacts(contactList, contactListContainer) {
  let sortedInitials = Object.keys(contactList).sort();

  sortedInitials.forEach((initial) => {
    initLetterBox(initial, contactListContainer);

    renderContactsByInitial(contactList[initial], contactListContainer);
  });
}

/**
 * Initializes a letter box in the contact list.
 * @param {string} initial - The starting letter of the initials.
 * @param {HTMLElement} contactList - The HTML element of the contact list.
 */
function initLetterBox(initial, contactListContainer) {
  let letterBoxHtml = generateLetterBox(initial);
  contactListContainer.innerHTML += letterBoxHtml;
}

/**
 * Renders all contacts that belong to a specific initial.
 * @param {Array} contacts - The contacts grouped under a specific initial.
 * @param {HTMLElement} contactList - The HTML element of the contact list.
 */
function renderContactsByInitial(contacts, contactListContainer) {
  contacts.forEach((contact) => {
    let limitNameLength = limitTextLength(contact.name);
    let limitEmailLength = limitTextLength(contact.email);

    let contactHtml = generateContact(
      contact,
      limitNameLength,
      limitEmailLength
    );

    contactListContainer.innerHTML += contactHtml;
  });
}

/**
 * Limits the length of a text to a maximum length.
 * If the text is longer than the specified maximum length, it is truncated and appended with "...".
 * @param {string} text - The text to be limited.
 * @param {number} [maxLength=20] - The maximum length of the text.
 * @returns {string} The processed text.
 */
function limitTextLength(text, maxLength = 15) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
}

//---------------------------------------------------------------------------------------------------------------

/**
 * Displays the information of a contact on the desktop.
 * This function loads the contact data and shows it in the contact info area.
 * If the screen width is less than 777px, the mobile view will be displayed instead.
 * @param {number} contactId - The ID of the contact whose information should be displayed.
 */
async function displayContactInfo(contactId) {
  let contact = await getContact(contactId);

  let contactInfoContainer = document.getElementById("contact_info_box");
  contactInfoContainer.innerHTML = generateContactInfo(contact);

  designeUserInitial(contact);
  highlightContact(contact);
  toggleContactInfo();
  toggleAddContactBtn();
  toggleEditContactBtn();
}

/**
 * Retrieves the contact data based on the contact ID.
 * This function distinguishes between the active user and a regular contact.
 * @param {number} contactId - The ID of the contact to be retrieved.
 * @returns {Object} The data of the contact.
 */
async function getContact(contactId) {
  if (contactId === 0) {
    return activeUser;
  } else {
    let contacts = await fetchData("contacts");
    let contact = contacts.find((c) => c && c.id === contactId);
    return contact;
  }
}

function designeUserInitial(contact) {
  if (contact.id === 0) {
    document
      .getElementById("for_active_user")
      .classList.add("letter-circel-user");
    document.getElementById("user_delete_display_info").classList.add("d-none");
  }
}

/**
 * Highlights the currently selected contact in the contact list.
 * This function sets the background color of the selected contact and visually highlights it.
 * @param {Object} contact - The contact to be highlighted.
 */
function highlightContact(contact) {
  let contactsContainer = document.getElementsByClassName("contacts");

  for (let i = 0; i < contactsContainer.length; i++) {
    contactsContainer[i].classList.remove("is-selected");
  }
  document.getElementById(`contact${contact.id}`).classList.add("is-selected");
}

/**
 * Hides the mobile contact information and resets the display.
 * This function removes the mobile contact view and clears the contents.
 */
function goBackMobile() {
  toggleContactInfo();
  toggleAddContactBtn();
  toggleEditContactBtn();
}

function toggleContactInfo() {
  let contactListContainer = document.getElementById("contact_box");
  contactListContainer.classList.toggle("handle-display");
  let contactContentContainer = document.getElementById("contact_info");
  contactContentContainer.classList.toggle("is-shown");
}

function toggleAddContactBtn() {
  let addContactBtn = document.getElementById("mobile_add_contact");
  addContactBtn.classList.toggle("d-none");
  addContactBtn.classList.toggle("mobile-add-contact");
}

function toggleEditContactBtn() {
  let addContactBtn = document.getElementById("mobile_delete_edit");
  addContactBtn.classList.toggle("d-none");
}

// /**
//  * Adds a new contact and updates the user interface.
//  * This function creates a new contact, adds it to the active user, and renders the
//  * updated contact list.
//  */
// async function addContact() {
//   let contactId = await postNewContact();
//   addContactToUser(contactId, activeUser);
//   addContactToUserLocal(contactId, activeUser);
//   closeDialog();
//   await openDialogSuccessfully('created');
//   clearForm();
//   renderContacts();
// }

// /**
//  * Creates a contact object with the provided data.
//  * @param {string} name - The name of the contact.
//  * @param {string} email - The email address of the contact.
//  * @param {string} phone - The phone number of the contact.
//  * @param {number} contactId - The ID of the contact.
//  * @returns {Object} The created contact object.
//  */
// function createContact(name, email, phone, contactId) {
//   return {
//     id: contactId,
//     name: name,
//     email: email,
//     phone: phone,
//     color: generateRandomColor(),
//     initials: getInitials(name),
//   };
// }

// /**
//  * Generates a random color in a dark shade.
//  * @returns {string} A hexadecimal color code.
//  */
// function generateRandomColor() {
//   let darkLetters = "0123456789ABC";
//   let color = "#";
//   for (let i = 0; i < 6; i++) {
//     color += darkLetters[Math.floor(Math.random() * darkLetters.length)];
//   }
//   return color;
// }

// /**
//  * Returns the initials of a name.
//  * This function extracts the first letters from the name and returns them as initials.
//  * @param {string} name - The name from which the initials should be extracted.
//  * @returns {string} The initials of the name.
//  */
// function getInitials(name) {
//   let names = name.split(" ");
//   if (names.length === 1) {
//     return names[0].charAt(0).toUpperCase();
//   }
//   let firstInitial = names[0].charAt(0).toUpperCase();
//   let lastInitial = names[names.length - 1].charAt(0).toUpperCase();
//   return firstInitial + lastInitial;
// }

/**
 * Waits for a specified amount of time.
 * This function returns a promise that resolves after the specified time.
 * @param {number} ms - The wait time in milliseconds.
 * @returns {Promise} A promise that resolves after the wait time.
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
