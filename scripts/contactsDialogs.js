





/**
 * Fills the edit form fields with the contact's information.
 * @param {Object} contact - The contact object with properties name, email, and phone.
 */
function populateFormFields(contact) {
  document.getElementById("inputEditName").value = contact.name;
  document.getElementById("inputEditEmail").value = contact.email;
  if (contact.phone === undefined) {
    contact.phone = "";
  }
  document.getElementById("inputEditPhone").value = contact.phone;
}

/**
 * Generates and displays the big letter circle for the dialog.
 * @param {Object} contact - The contact object with properties color and initials.
 */
function dialogBigLetterCircle(contact) {
  document.getElementById("big_letter_circle").innerHTML =
    generateBigLetterCircle(contact);
  if (contact.color === "#ffffff") {
    document
      .getElementById("for_active_use_dialog_circel")
      .classList.add("letter-circel-user");
  }
}

/**
 * Opens the dialog window indicating that a contact operation has been successfully completed.
 *
 * @param {string} operation - The type of operation that was performed on the contact.
 *                             It can be one of the following values:
 *                             - "created" for a newly added contact,
 *                             - "edited" for an updated contact,
 *                             - "deleted" for a removed contact.
 * @returns {Promise<void>} A promise that resolves when the dialog has been fully displayed and closed.
 */
async function openDialogSuccessfully(operation) {
  let dialogContainer = document.getElementById("succesfully_created");
  dialogContainer.innerHTML = generateSuccesssfullyHtml(operation);
  setTimeout(async () => {
    dialogContainer.open = true;
    await sleep(300);
    dialogContainer.classList.add("dialog-open");
    dialogContainer.classList.add("d-flex");
    await sleep(1500);
    dialogContainer.classList.remove("dialog-open");
    await sleep(300);
    dialogContainer.classList.remove("d-flex");
    dialogContainer.open = false;
  }, 300);
}

/**
 * Retrieves the value of an input field based on its ID.
 * 
 * @param {string} id - The ID of the input field.
 * @returns {string} - The value of the input field.
 */
function getInputValue(id) {
  return document.getElementById(id).value;
}







/**
 * Clears all inputs in the edit form and removes any error displays.
 */
function clearEditForm() {
  let nameEditInput = document.getElementById("inputEditName");
  let emailEditInput = document.getElementById("inputEditEmail");
  let phoneEditInput = document.getElementById("inputEditPhone");
  clearError(nameEditInput, "edit_field_alert_name");
  clearError(emailEditInput, "edit_field_alert_email");
  clearError(phoneEditInput, "edit_field_alert_phone");
}



/**
 * Updates the source of the close icon based on screen width.
 */
function updateCrossImage() {
  let imgElements = document.querySelectorAll(".cross");
  imgElements.forEach((imgElement) => {
    if (window.innerWidth < 1024) {
      imgElement.src = "../assets/img/png/close-white.png"; 
    } else {
      imgElement.src = "../assets/img/png/close.png"; 
    }
  });
}

/**
 * Edits a contact's information and updates it in the database.
 * @param {number} contactId - The ID of the contact being edited.
 */
async function editContact(contactId) {
  let existingContact = await getContact(contactId);
  if(contactId === 0) {
    let activeUser = JSON.parse(localStorage.getItem("activeUser"));
    existingContact.id = activeUser.id;
  }
  let updatedContact = createUpdatedContact(existingContact);
  let endpoint =
    existingContact.color === "#ffffff"
      ? `users/${existingContact.id - 1}/`
      : `contacts/${existingContact.id - 1}/`;
  await postData(endpoint, updatedContact);
  closeDialogEdit();
  openDialogSuccessfully('edited');
  await renderContent();
  checkDisplayForInfo(existingContact)
}

/**
 * Überprüft die Displaygröße und passt das Layout sowie die Kontaktinformationen an.
 * 
 * - Wenn die Fensterbreite kleiner oder gleich 777px ist, wird die Informationsanzeige
 *   für mobile Geräte versteckt und positionelle Klassen entfernt.
 * - Andernfalls wird bei großen Bildschirmen der Kontakt basierend auf seiner ID angezeigt.
 *   Wenn die Farbe des Kontakts weiß ist, wird die Kontakt-ID auf 0 gesetzt.
 * 
 * @param {Object} existingContact - Das bestehende Kontaktobjekt, das Informationen über den Kontakt enthält.
 * @param {number} existingContact.id - Die eindeutige ID des Kontakts.
 * @param {string} existingContact.color - Die Farbe des Kontakts (im Hex-Format).
 */
function checkDisplayForInfo(existingContact){
  if (window.innerWidth <= 777) {
    let infoDiv = document.getElementById("mobile_contact_info");
    infoDiv.classList.add("d-none");
    infoDiv.classList.remove("pos-abs");
  } else {
    if ( existingContact.color === "#ffffff") {
      existingContact.id = 0;
    }
    displayContactInfo(existingContact.id);
  }
}

/**
 * Creates an updated contact object based on the edited inputs.
 * @param {Object} existingContact - The existing contact object being edited.
 * @returns {Object} - The updated contact object.
 */
function createUpdatedContact(existingContact) {
  let updatedName = document.getElementById("inputEditName").value;
  let updatedEmail = document.getElementById("inputEditEmail").value;
  let updatedPhone = document.getElementById("inputEditPhone").value;
  let updatedInitials = getInitials(updatedName);
    return {
      ...existingContact,
      name: updatedName,
      email: updatedEmail,
      phone: updatedPhone,
      initials: updatedInitials,
    };
  }

/**
 * Event listener that calls the updateCrossImage function when the page loads.
 * This listener ensures that the close icon is adjusted based on screen size
 * as soon as the page is fully loaded.
 */
window.addEventListener("load", updateCrossImage);

/**
 * Event listener that calls the updateCrossImage function when the screen size changes.
 * This listener dynamically adjusts the close icon when the screen size changes
 * (e.g., when resizing the browser window).
 */
window.addEventListener("resize", updateCrossImage);
