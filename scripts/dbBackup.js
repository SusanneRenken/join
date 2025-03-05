let dbBackupTask = [
  {
    assigned: [1, 2, 3, 4],
    category: "Tutorial",
    date: "2024-10-05",
    description:
      'Welcome to Join. Here you can find your default board. This board represents your project and contains four default lists: "To do", "In progress", "Await feedback" and "Done".',
    id: 1,
    priority: "low",
    status: "todo",
    subtasks: [
      {
        done: true,
        subId: 1,
        subTaskName: "Find the board.",
      },
      {
        done: false,
        subId: 2,
        subTaskName: "First read all tutorials.",
      },
    ],
    title: "1. Exploring Join",
    user: "",
  },
  {
    assigned: [10],
    category: "Tutorial",
    date: "2024-10-03",
    description:
      "In your Join you will find 5 tasks and 10 contacts to try out. Feel free to edit these, but the changes will be reset after you log in again. If you delete them, they are permanently removed from your Join board.",
    id: 2,
    priority: "urgent",
    status: "todo",
    title: "2. Sample Tasks and Contacts",
    user: "",
  },
  {
    category: "Tutorial",
    date: "2024-10-20",
    description:
      "Feel free to edit your cards. You can move tasks between sections.",
    id: 3,
    priority: "low",
    status: "inprogress",
    subtasks: [
      {
        done: false,
        subId: 1,
        subTaskName: "Change the title of a task.",
      },
      {
        done: false,
        subId: 2,
        subTaskName: "Add an assignee to the task.",
      },
      {
        done: false,
        subId: 3,
        subTaskName: "Add yourself as a assignee to the task.",
      },
      {
        done: false,
        subId: 4,
        subTaskName: "Move a task to another section.",
      },
      {
        done: false,
        subId: 5,
        subTaskName: "Delete a task.",
      },
    ],
    title: "3. Edit Cards",
    user: "",
  },
  {
    assigned: [4, 5, 6, 7, 8],
    category: "Tutorial",
    date: "2024-11-10",
    description:
      'Cards represent individual tasks. Click the "+" above the list to create a new task. To create new task you can also go to the "Add Task" in the main menu. Enter the task details in the card.',
    id: 4,
    priority: "medium",
    status: "awaitfeedback",
    subtasks: [
      {
        done: false,
        subId: 1,
        subTaskName: 'Go to "Add Task" in the main menu and add a new task.',
      },
      {
        done: false,
        subId: 2,
        subTaskName: 'Add a task directly under "In progress".',
      },
    ],
    title: "4. Adding Cards",
    user: "",
  },
  {
    assigned: [7, 8, 9],
    category: "Tutorial",
    date: "2024-10-29",
    description:
      'You can add new contacts to your projects. Go to the "Contacts" in the main menu, click on "Add new contact". Once added, these contacts can get tasks assigned and can edit them.',
    id: 5,
    priority: "medium",
    status: "done",
    subtasks: [
      {
        done: false,
        subId: 1,
        subTaskName: 'Go to "Contacts" in the menu and add a new contact.',
      },
    ],
    title: "5. Creating Contacts",
    user: "",
  },
  {
    assigned: [1, 2, 3, 4],
    category: "Tutorial",
    date: "2024-10-04",
    description:
      'Welcome to Join. Here you can find your default board. This board represents your project and contains four default lists: "To do", "In progress", "Await feedback" and "Done".',
    id: 6,
    priority: "low",
    status: "todo",
    subtasks: [
      {
        done: true,
        subId: 1,
        subTaskName: "Find the board.",
      },
      {
        done: false,
        subId: 2,
        subTaskName: "First read all tutorials.",
      },
    ],
    title: "1. Exploring Join",
    user: "",
  },
  {
    assigned: [10],
    category: "Tutorial",
    date: "2024-10-04",
    description:
      "In your Join you will find 5 tasks and 10 contacts to try out. Feel free to edit these, but the changes will be reset after you log in again. If you delete them, they are permanently removed from your Join board.",
    id: 7,
    priority: "urgent",
    status: "todo",
    title: "2. Sample Tasks and Contacts",
    user: "",
  },
  {
    category: "Tutorial",
    date: "2024-10-23",
    description:
      "Feel free to edit your cards. You can move tasks between sections.",
    id: 8,
    priority: "low",
    status: "inprogress",
    subtasks: [
      {
        done: false,
        subId: 1,
        subTaskName: "Change the title of a task.",
      },
      {
        done: false,
        subId: 2,
        subTaskName: "Add an assignee to the task.",
      },
      {
        done: false,
        subId: 3,
        subTaskName: "Add yourself as a assignee to the task.",
      },
      {
        done: false,
        subId: 4,
        subTaskName: "Move a task to another section.",
      },
      {
        done: false,
        subId: 5,
        subTaskName: "Delete a task.",
      },
    ],
    title: "3. Edit Cards",
    user: "",
  },
  {
    assigned: [4, 5, 6, 7, 8],
    category: "Tutorial",
    date: "2024-10-11",
    description:
      'Cards represent individual tasks. Click the "+" above the list to create a new task. To create new task you can also go to the "Add Task" in the main menu. Enter the task details in the card.',
    id: 9,
    priority: "medium",
    status: "awaitfeedback",
    subtasks: [
      {
        done: false,
        subId: 1,
        subTaskName: 'Go to "Add Task" in the main menu and add a new task.',
      },
      {
        done: false,
        subId: 2,
        subTaskName: 'Add a task directly under "In progress".',
      },
    ],
    title: "4. Adding Cards",
    user: "",
  },
  {
    assigned: [7, 8, 9],
    category: "Tutorial",
    date: "2024-11-25",
    description:
      'You can add new contacts to your projects. Go to the "Contacts" in the main menu, click on "Add new contact". Once added, these contacts can get tasks assigned and can edit them.',
    id: 10,
    priority: "medium",
    status: "done",
    subtasks: [
      {
        done: false,
        subId: 1,
        subTaskName: 'Go to "Contacts" in the menu and add a new contact.',
      },
    ],
    title: "5. Creating Contacts",
    user: "",
  },
];

let dbBackupContacts = [
  {
    color: "#01687E",
    email: "Renken@gmail.com",
    id: 1,
    initials: "SR",
    name: "Susanne Renken",
    phone: 1735554442,
  },
  {
    color: "#19FF82",
    email: "Schumacher@gmail.com",
    id: 2,
    initials: "LS",
    name: "Lars Schumacher",
    phone: 1734216923,
  },
  {
    color: "#4ab862",
    email: "Hund@gmail.com",
    id: 3,
    initials: "RH",
    name: "Rieke Hund",
    phone: 12341234,
  },
  {
    color: "#1C7B2B",
    email: "Ziegler@gmail.com",
    id: 4,
    initials: "BZ",
    name: "Benedikt Ziegler",
    phone: 12341234,
  },
  {
    color: "#523C5A",
    email: "Eisenberg@gmail.com",
    id: 5,
    initials: "DE",
    name: "David Eisenberg",
    phone: 12341234,
  },
  {
    color: "#ED4F01",
    email: "Mauer@gmail.com",
    id: 6,
    initials: "EM",
    name: "Emmanuel Mauer",
    phone: 12341234,
  },
  {
    color: "#BA6C74",
    email: "Bauer@gmail.com",
    id: 7,
    initials: "MB",
    name: "Marcel Bauer",
    phone: 12341234,
  },
  {
    color: "#130994",
    email: "Wolf@gmail.com",
    id: 8,
    initials: "TW",
    name: "Tatjana Wolf",
    phone: 12341234,
  },
  {
    color: "#2A3A33",
    email: "Bibi2@gmail.com",
    id: 9,
    initials: "BB",
    name: "Bianca Bremer",
    phone: 12341234,
  },
  {
    color: "#dd1d1d",
    email: "Sina@gmail.com",
    id: 10,
    initials: "SH",
    name: "Sina Herzlich",
    phone: 12341234,
  },
];
