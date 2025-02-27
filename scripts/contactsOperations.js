

/**
 * Deletes a contact if the contact ID is not 0.
 * This function checks if the contact ID is 0 (indicating that the active user cannot be deleted).
 * It deletes the contact and updates the display of contacts.
 * @param {number} contactId - The ID of the contact to be deleted.
 */
async function deleteContact(contactId) {
  await deleteContactInData(contactId);
  openDialogSuccessfully('deleted');
  await renderContent();
  document.querySelector(".contacts-info-box").innerHTML = "";
  if (window.innerWidth < 777) {
    document.getElementById("mobile_menu").classList.remove("d-flex");
    goBackMobile();
  }
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

/**
 * opens the delete window and adds the "YES" button
 *
 * @param {number} contactId - Contact Id
 */
function openDeleteDialog(contactId) {
  toggleOverlay("contact_delete_overlay");
  let yesButton = document.getElementById("delete_yes_btn");
  yesButton.innerHTML = generateDeleteButton(contactId);
}
