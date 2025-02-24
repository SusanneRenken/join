/**
 * Adds an event listener that is triggered when the DOM is fully loaded.
 * Upon triggering, the greeting is displayed, tasks are rendered, and
 * the mobile greeting is checked.
 */
document.addEventListener("DOMContentLoaded", () => {
  greeting();
  renderTasks();
  if (window.innerWidth <= 770) {
    checkAndShowGreeting();
  }
});

/**
 * Updates the greeting message and displays it.
 */
function greeting() {
  let greeting = document.getElementById("greetings");
  let greetingMobile = document.getElementById("greeting_mobile");
  let greetingUser = activeUser.name;
  let greetingMassage = getGreetingMessage();
  greeting.innerHTML = "";
  greetingMobile.innerHTML = "";
  greeting.innerHTML = greetingHtml(greetingMassage, greetingUser);
  greetingMobile.innerHTML = greetingHtml(greetingMassage, greetingUser);
}

/**
 * Returns the greeting message based on the current time.
 * @returns {string} - The greeting message ("Good morning", "Good afternoon", or "Good evening").
 */
function getGreetingMessage() {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return "Good morning";
  } else if (currentHour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

/**
 * Generates the HTML for the greeting.
 * @param {string} greetingMassage - The greeting message.
 * @param {string} greetingUser - The user's name.
 * @returns {string} - The HTML representation of the greeting.
 */
function greetingHtml(greetingMassage, greetingUser) {
  return `${greetingMassage}, <div class="greeting-user">${greetingUser}</div>`;
}

/**
 * Renders the tasks and updates the counters.
 * @returns {Promise<void>}
 */
async function renderTasks() {
  let tasks = await loadTasks();
  countTasks(tasks, "count_to_do", "todo", "status");
  countTasks(tasks, "count_done", "done", "status");
  countTasks(tasks, "count_progress", "inprogress", "status");
  countTasks(tasks, "count_feedback", "awaitfeedback", "status");
  countTasks(tasks, "count_priority_urgent", "urgent", "priority");
  countTasks(tasks, "count_tasks", "", "length");
  deadlineDate(tasks);
}

async function loadTasks() {
  let userTasks = activeUser.tasks;
  let allTasks = await fetchData("tasks");
  let tasksToRender = allTasks.filter((task) => userTasks.includes(task.id));
  return tasksToRender;
}

function countTasks(tasks, element, taskStatus, taskCategorie) {
  let eachSummary = document.getElementById(element);
  let count = "";
  if (taskCategorie === "length") {
    count = tasks[taskCategorie];
  } else {
    count = tasks.filter((task) => task[taskCategorie] === taskStatus).length;
  }
  eachSummary.innerHTML = `${count}`;
}

/**
 * Outputs the next due date of the tasks and formats it.
 * @param {Array} tasks - The list of tasks.
 */
function deadlineDate(tasks) {
  let tasksWithDueDate = tasks.filter((task) => task.date);
  tasksWithDueDate.sort((a, b) => new Date(a.date) - new Date(b.date));
  let nextDueDate = tasksWithDueDate[0]?.date;
  let [year, month, day] = nextDueDate.split("-");
  let dateObj = new Date(year, month - 1, day);
  let formattedDate = dateObj.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  let deadlineElement = document.getElementById("deadline_date");
  deadlineElement.innerHTML = `${formattedDate}`;
}

/**
 * Navigates to the board page.
 */
function navigatonToBoard() {
  window.location.href = "../html/board.html";
}

/**
 * Checks if the mobile greeting should be displayed and shows it if necessary.
 */
function checkAndShowGreeting() {
  let greetingShown = localStorage.getItem("greetingShown");
  if (greetingShown === "false" || !greetingShown) {
    mobileGreeting();
    localStorage.setItem("greetingShown", "true");
  }
}

/**
 * Displays the mobile greeting and hides it after 2.5 seconds.
 */
function mobileGreeting() {
  let greetingDialog = document.getElementById("greeting_mobile");
  if (greetingDialog) {
    greetingDialog.classList.remove("d-none");
    setTimeout(() => {
      greetingDialog.classList.add("d-none");
      greetingDialog.close();
    }, 2500);
  }
}
