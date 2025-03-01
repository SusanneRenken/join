/**
 * Fills the edit form fields with the contact's information.
 * @param {Object} contact - The contact object with properties name, email, and phone.
 */
// function populateFormFields(contact) {
//   document.getElementById("inputEditName").value = contact.name;
//   document.getElementById("inputEditEmail").value = contact.email;
//   if (contact.phone === undefined) {
//     contact.phone = "";
//   }
//   document.getElementById("inputEditPhone").value = contact.phone;
// }

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
