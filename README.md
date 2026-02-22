"# MERN-Task-Manager-App-deploy" 
# TASK-MANAGER-USING-MERN



# MERN Task Manager App

A full-stack task management app built with the MERN stack.

Users can create, update, search, mark complete/incomplete, and delete tasks through a React UI backed by an Express + MongoDB API.

## Features

- Add new tasks
- Edit existing tasks
- Mark tasks as done/undone
- Delete tasks
- Search tasks by name
- Toast notifications for success/error actions

## Tech Stack

- Frontend: React (Create React App), Bootstrap, React Icons, React Toastify
- Backend: Node.js, Express, Mongoose
- Database: MongoDB (Atlas/local)
- Deployment config: Vercel (`frontend/vercel.json`, `backend/vercel.json`)

## Project Structure

```text
.
├── backend
│   ├── Controllers
│   ├── Models
│   ├── Routes
│   ├── index.js
│   └── .env
└── frontend
    ├── public
    └── src
```

## Prerequisites

- Node.js 18+ recommended
- npm
- MongoDB connection string

## Environment Variables

### Backend (`backend/.env`)

```env
DB_URL=your_mongodb_connection_string
PORT=8080
```

### Frontend (`frontend/.env`) (optional)

```env
REACT_APP_API_URL=http://localhost:8080
```

If `REACT_APP_API_URL` is not set, the frontend defaults to `http://localhost:8080`.

## Installation

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd ../frontend
npm install
```

## Run Locally

1. Start backend server:

```bash
cd backend
npm start
```

2. Start frontend app (in a new terminal):

```bash
cd frontend
npm start
```

3. Open app:

- Frontend: `http://localhost:3000`
- Backend health route: `http://localhost:8080/`

## API Endpoints

Base URL: `http://localhost:8080`

- `GET /tasks` - Fetch all tasks
- `POST /tasks` - Create task
- `PUT /tasks/:id` - Update task by id
- `DELETE /tasks/:id` - Delete task by id

### Sample Create/Update Payload

```json
{
  "taskName": "Finish README",
  "isDone": false
}
```

## Available Scripts

### Backend

- `npm start` - Run server with nodemon

### Frontend

- `npm start` - Run React development server
- `npm test` - Run tests
- `npm run build` - Build for production

## Deployment Notes

- Backend includes Vercel serverless configuration in `backend/vercel.json`.
- Frontend includes Vercel rewrite configuration in `frontend/vercel.json`.
- Set environment variables in your deployment platform:
  - Backend: `DB_URL`, `PORT` (if needed by platform)
  - Frontend: `REACT_APP_API_URL` pointing to deployed backend URL

## License

ISC
