# Join – Task Management Platform

Join is a comprehensive task management application built with vanilla JavaScript that enables teams to organize, track, and collaborate on work items through an intuitive Kanban board interface. The platform provides essential features for project management including task creation, contact management, and progress tracking, solving the challenge of coordinating team workflows without complex tooling.

The application offers a responsive design that works across devices, with persistent data storage using browser local storage for seamless user experience.

---

## Table of Contents
- Features
- Tech Stack
- Installation / Quickstart
- Project Structure

---

## Features
- User authentication with signup and login functionality
- Interactive Kanban board for task visualization and management
- Task creation with priority levels, categories, and subtasks
- Contact management system for team member organization
- Summary dashboard with key metrics and progress tracking
- Responsive design optimized for desktop and mobile devices
- Local data persistence using browser storage
- Search and filter capabilities for efficient task discovery

---

## Tech Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Custom CSS with responsive media queries
- **Data Storage**: Browser Local Storage API
- **Icons and Assets**: Custom SVG and PNG graphics

---

## Installation / Quickstart
1. Clone the repository:
   ```
   git clone <repository-url>
   cd join
   ```

2. Open the application in a web browser:
   - Navigate to the project directory
   - Open `index.html` in your preferred web browser

For development with live reloading, you can use a local server:
   ```
   # Using Python (if available)
   python -m http.server 8000

   # Or using Node.js http-server
   npx http-server
   ```

The application will be accessible at `http://localhost:8000` (or your configured port).

---

## Project Structure
```
join/
├── index.html                 # Main application entry point
├── script.js                  # Core application logic
├── style.css                  # Global styles
├── assets/                    # Static assets
│   ├── fonts/                 # Font files
│   ├── img/                   # Images and icons
│   │   ├── png/               # PNG graphics
│   │   └── svg/               # SVG graphics
│   └── templates/             # HTML templates
├── html/                      # Application pages
│   ├── addTask.html           # Task creation interface
│   ├── board.html             # Kanban board view
│   ├── contacts.html          # Contact management
│   ├── help.html              # Help documentation
│   ├── legalNotice.html       # Legal information
│   ├── privacyPolicy.html     # Privacy policy
│   └── summary.html           # Dashboard overview
├── scripts/                   # JavaScript modules
│   ├── access*.js             # Authentication logic
│   ├── addTask*.js            # Task creation functionality
│   ├── board*.js              # Board management
│   ├── contacts*.js           # Contact operations
│   ├── desktopTemplate.js     # UI templates
│   ├── summary.js             # Dashboard logic
│   └── dbBackup.js            # Data persistence
└── styles/                    # CSS stylesheets
    ├── *.css                  # Component styles
    └── media/                 # Responsive styles
```

---