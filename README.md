# Employee Task Manager

A full-stack application for managing employees and their tasks within jobs. Built with React on the frontend and Node.js/Express with MongoDB on the backend, this app allows users to create employees, assign detailed tasks, and track them efficiently. (I did this as my first React project to learn - big mistake lol)

## Features

- **Job Selection**: Select from a list of jobs fetched from the backend.
- **Employee Management**: Add employees to a job with an empty task list via a simple form.
- **Task Assignment**: Assign detailed tasks (name, image URL, start/end times) to employees, with all fields required for submission.
- **Responsive UI**: Dropdowns highlight selected jobs and employees, persisting through task submissions until a new selection is made.
- **Data Persistence**: Tasks are stored in MongoDB with auto-incremented IDs and status updates (e.g., "completed" when image URL and end time are provided).

## Tech Stack

- **Frontend**: React (hooks: `useState`, `useEffect`), custom components (`Dropdown`, `TextBox`, `PopupWrapper`, `ImageUploadPopup`).
- **Backend**: Node.js, Express, MongoDB (Mongoose), `mongoose-sequence` for auto-incrementing IDs.
- **Styling**: CSS with responsive design (highlighting, centering, hover effects).

## Prerequisites

- **Node.js**: v14.x or higher
- **MongoDB**: Local instance running on `mongodb://localhost:27017`
- **npm**: For package management

## Setup

### Backend
1. **Navigate to Backend Directory**:
   ```bash
   cd server
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Start MongoDB**: Ensure MongoDB is running locally:
   ```bash
   mongod
   ```
4. **Run Server**:
   ```bash
   node server.js
   ```
   - Server runs on `http://localhost:3000`.

### Frontend
1. **Navigate to Frontend Directory**:
   ```bash
   cd "C:\Users\user\Desktop\Experimental Management system\frontend\VeraCleaningFrontEnd"
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Start React App**:
   ```bash
   npm start
   ```
   - App runs on `http://localhost:3000`

## Usage

1. **Select a Job**:
   - Dropdown lists jobs fetched from `/jobs`.
   - First job auto-selected; highlight persists until new selection.

2. **Add Employee**:
   - Click "Add Employee" button, enter a `fullName` in the popup, submit.
   - Creates employee with `tasks: []` in the selected job.

3. **Assign Tasks**:
   - Select an employee from the dropdown (highlight persists).
   - Fill "Task Details" form: `taskName`, `imageUrl`, `startTime`, `endTime`.
   - Submit button disabled until all fields are filled; submits to add a new task.

4. **View in MongoDB**:
   - Connect to `mongodb://localhost:27017/task_manager`.
   - Query `jobs` collection to see employees and tasks.

## API Endpoints

- **GET /jobs**: Fetch all jobs.
- **POST /jobs**: Create a new job (e.g., `{ "jobName": "Job 1", "createdBy": "Admin" }`).
- **PATCH /jobs/:jobId/assign**:
  - `{ fullName }`: Creates employee with empty `tasks`.
  - `{ fullName, task: { taskName, imageUrl, startTime, endTime } }`: Adds full task to existing employee.
- **GET /jobs/:jobId/employees**: Fetch employees for a job.

## Database Schema

- **Job**:
  - `jobName`: String
  - `createdBy`: String
  - `createdAt`: Date
  - `employees`: [Employee]
- **Employee** (subdocument):
  - `fullName`: String
  - `tasks`: [Task]
- **Task** (subdocument):
  - `taskName`: String
  - `startTime`: Date
  - `endTime`: Date
  - `imageUrl`: String
  - `status`: Enum ("pending", "in-progress", "completed")
  - `taskId`: Number (auto-incremented)

## Future Enhancements

- **Task List View**: Display all tasks per employee.
- **Employee Edit**: Modify employee details post-creation.
- **Authentication**: Add user login for job management.

## Contributing

Feel free to fork, submit PRs, or open issues on GitHub. Focus on clean code and clear commit messages (e.g., "Simplify employee creation by removing task name from Add Employee form").

## License

MIT License—free to use, modify, and distribute.





(is code even copyrightable??????)