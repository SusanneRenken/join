/**
 * Loads and renders the content of the contact list.
 * This function groups the contacts by their initials and displays them in the UI.
 */
async function renderContacts() {
  let contactList = await getContactList();

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
  addContactBtn.classList.toggle("d-flex");
}

//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------

/**
 * Clears all inputs in the form and removes any error displays.
 */
function clearAddContactForm() {
  let nameInput = document.getElementById("contact_name");
  let emailInput = document.getElementById("contact_email");
  let phoneInput = document.getElementById("contact_phone");
  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  clearError(nameInput, "field_alert_name");
  clearError(emailInput, "field_alert_email");
}

/**
 * Removes the error message and error styling from the input field.
 * @param {HTMLElement} inputElement - The input field for which to reset the error.
 * @param {string} alertElementId - The ID of the element displaying the error message.
 */
function clearError(inputElement, alertElementId) {
  let alertElement = document.getElementById(alertElementId);
  alertElement.innerText = "";
  inputElement.classList.remove("error");
}

async function createContact() {
  resetAlert(
    "contact_name",
    "contact_email",
    "field_alert_name",
    "field_alert_email"
  );

  let nameInput = document.getElementById("contact_name").value.trim();
  let emailInput = document.getElementById("contact_email").value.trim();
  let phoneInput = document.getElementById("contact_phone").value.trim();
  let initials = getContactInitials(nameInput);

  await createContactProcess(nameInput, emailInput, phoneInput, initials);
  window.location.reload();
}

function resetAlert(inputName, inputEmail, alertName, alertEmail) {
  let nameInputContent = document.getElementById(inputName);
  let emailInputContent = document.getElementById(inputEmail);

  clearError(nameInputContent, alertName);
  clearError(emailInputContent, alertEmail);
}

async function createContactProcess(
  nameInput,
  emailInput,
  phoneInput,
  initials
) {
  validateContactInputs(emailInput, nameInput);

  await addContact(nameInput, emailInput, phoneInput, initials);

  clearAddContactForm();

  await openDialogSuccessfully("created");

  toggleOverlay("dialog_contacts_overlay");
}

/**
 * Adds a new contact and updates the user interface.
 * This function creates a new contact, adds it to the active user, and renders the
 * updated contact list.
 */
async function addContact(nameInput, emailInput, phoneInput, initials) {
  let contactId = await getNewId("contacts");

  await postNewContact(nameInput, emailInput, phoneInput, contactId, initials);

  addContactToUser(contactId);
}

/**
 * Posts a new contact to the database and returns the contact ID.
 * @returns {number} The ID of the newly created contact.
 */
async function postNewContact(name, email, phone, contactId, initials) {
  let contactData = {
    id: contactId,
    name: name,
    email: email,
    phone: phone,
    color: generateRandomColor(),
    initials: initials,
  };

  await postData(`contacts/${contactId - 1}/`, contactData);
}

/**
 * Generates a random color in a dark shade.
 * @returns {string} A hexadecimal color code.
 */
function generateRandomColor() {
  let darkLetters = "0123456789ABC";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += darkLetters[Math.floor(Math.random() * darkLetters.length)];
  }
  return color;
}

/**
 * Adds a contact to the user and saves it in the database.
 * This function checks if the user already has the contact and adds it if it does not exist.
 * @param {number} contactId - The ID of the contact to be added.
 * @param {Object} activeUser - The currently logged-in user.
 */
async function addContactToUser(contactId) {
  let activeUser = JSON.parse(localStorage.getItem("activeUser"));

  if (!activeUser.contacts.includes(contactId)) {
    activeUser.contacts.push(contactId);
    localStorage.setItem("activeUser", JSON.stringify(activeUser));

    if (activeUser !== 0) {
      let path = `users/${activeUser.id - 1}/contacts/${
        activeUser.contacts.length - 1
      }`;
      await postData(path, contactId);
    }
  }
}
//-----------------------------------------------------------------------------------

function openDialogSuccessfully(operation) {
  return new Promise((resolve) => {
    let overlay = document.getElementById("succesfully_created");
    overlay.innerHTML = generateContactFeedback(operation);
    overlay.classList.remove("d-none");
    overlay.classList.add("active");

    setTimeout(() => {
      overlay.classList.add("visible");
      setTimeout(() => {
        overlay.classList.remove("active", "visible");
        overlay.classList.add("d-none");
        resolve();
      }, 1500);
    }, 50);
  });
}

//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------

async function openEditContact(contactId) {
  toggleOverlay("dialog_edit_overlay");

  await loadEditContactForm(contactId);

  getEditContactData(contactId);
}

function loadEditContactForm(contactId) {
  let editForm = document.getElementById("dialog_edit_contacts_overlay");
  editForm.innerHTML = generateEditContactDialog(contactId);
}

async function getEditContactData(contactId) {
  let contact = await getContact(contactId);

  let name = document.getElementById("input_edit_name");
  let email = document.getElementById("input_edit_email");
  let phone = document.getElementById("input_edit_phone");

  name.value = "";
  email.value = "";
  phone.value = "";

  name.value = contact.name;
  email.value = contact.email;
  phone.value = contact.phone;
}

//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------

/**
 * opens the delete window and adds the "YES" button
 *
 * @param {number} contactId - Contact Id
 */
function openDeleteDialog(contactId) {
  toggleOverlay("contact_delete_overlay");

  let yesButton = document.getElementById("delete_yes_btn_contact");
  console.log(yesButton);

  yesButton.innerHTML = generateDeleteButton(contactId);
}

/**
 * Deletes a contact if the contact ID is not 0.
 * This function checks if the contact ID is 0 (indicating that the active user cannot be deleted).
 * It deletes the contact and updates the display of contacts.
 * @param {number} contactId - The ID of the contact to be deleted.
 */
async function deleteContact(contactId) {
  await deleteContactInData(contactId);
  await openDialogSuccessfully("deleted");
  document.getElementById("contact_info_box").innerHTML = "";
  window.location.reload();
}

/**
 * Deletes a contact from user data.
 * This function determines whether the contact should be deleted only for the user or for all users,
 * and performs the appropriate deletion actions.
 * @param {number} contactId - The ID of the contact to be deleted.
 */
async function deleteContactInData(contactId) {
  let users = await fetchData("users");
  if (contactId >= 1 && contactId <= 10) {
    await deleteContactOnlyforUser(contactId, users);
  } else {
    await deleteContactforAllUsers(contactId, users);
  }
  await deleteContactFromTasks(contactId);
  deleteContactInLocalStorage(contactId);
}

/**
 * Deletes a contact only for the active user.
 * This function removes the contact from the active user's contact list.
 * @param {number} contactId - The ID of the contact to be deleted.
 * @param {Array} users - The list of all users.
 */
async function deleteContactOnlyforUser(contactId, users) {
  if (activeUser.id === 0) {
    return;
  }
  users = users.map((user) => {
    if (user.id === activeUser.id) {
      return {
        ...user,
        contacts: user.contacts.filter((contact) => contact !== contactId),
      };
    }
    return user;
  });
  await postData("users", users);
}

/**
 * Deletes a contact from all tasks.
 * This function removes the contact ID from the list of assigned users for all tasks.
 * @param {number} contactId - The ID of the contact to be deleted.
 */
async function deleteContactFromTasks(contactId) {
  let allTasks = await fetchData("tasks");
  let updatedTasks = allTasks.map((task) => {
    if (task.assigned && Array.isArray(task.assigned)) {
      return {
        ...task,
        assigned: task.assigned.filter((id) => id !== contactId),
      };
    }
    return task;
  });
  await postData("tasks", updatedTasks);
}

/**
 * Deletes a contact for all users.
 * This function deletes the contact from the database and removes it from the contact lists of all users.
 * @param {number} contactId - The ID of the contact to be deleted.
 * @param {Array} users - The list of all users.
 */
async function deleteContactforAllUsers(contactId, users) {
  await deleteData("contacts", contactId);
  if (activeUser.id === 0) {
    return;
  }
  users = users.map((user) => ({
    ...user,
    contacts: user.contacts.filter((contact) => contact !== contactId),
  }));
  await postData("users", users);
}

/**
 * Deletes a contact from the local storage of the active user.
 * This function removes the contact ID from the list of contacts in Local Storage.
 * @param {number} contactId - The ID of the contact to be deleted.
 */
function deleteContactInLocalStorage(contactId) {
  let activeUser = JSON.parse(localStorage.getItem("activeUser"));
  activeUser.contacts = activeUser.contacts.filter(
    (contact) => contact !== contactId
  );
  localStorage.setItem("activeUser", JSON.stringify(activeUser));
}

//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------

/**
 * Edits a contact's information and updates it in the database.
 * @param {number} contactId - The ID of the contact being edited.
 */
async function editContact(contactId) {
  resetAlert(
    "input_edit_name",
    "input_edit_email",
    "edit_field_alert_name",
    "edit_field_alert_email"
  );

  let nameInput = document.getElementById("input_edit_name").value.trim();
  let emailInput = document.getElementById("input_edit_email").value.trim();
  let phoneInput = document.getElementById("input_edit_phone").value.trim();
  let initials = getContactInitials(nameInput);

  if (contactId === 0) {
    await editUserProcess(nameInput, emailInput, phoneInput, initials);
  } else {
    await editContactProcess(
      nameInput,
      emailInput,
      phoneInput,
      initials,
      contactId
    );
  }

  await openDialogSuccessfully("edit");

  window.location.reload();
}

async function editUserProcess(name, email, phone, initials) {
  let activeUser = JSON.parse(localStorage.getItem("activeUser"));
  let userData = {
    ...activeUser,
    name: name,
    email: email,
    phone: phone,
    initials: initials,
  };

  localStorage.setItem("activeUser", JSON.stringify(userData));

  if (activeUser !== 0) {
    for (let [key, value] of Object.entries(userData)) {
      await postData(`users/${activeUser.id - 1}/${key}`, value);
    }
  }
}

async function editContactProcess(name, email, phone, initials, contactId) {
  let contact = await getContact(contactId);

  let contactData = {
    ...contact,
    name: name,
    email: email,
    phone: phone,
    initials: initials,
  };

  for (let [key, value] of Object.entries(contactData)) {
    await postData(`contacts/${contact.id - 1}/${key}`, value);
  }
}