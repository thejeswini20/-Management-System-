# Dance School Management System

## Setup Instructions

### Frontend Setup

```bash
cd "dance management system"
npm install
npm start
```

Frontend runs on: http://localhost:3000

### Backend Setup

```bash
cd backend
npm install
npm start
```

Backend runs on: http://localhost:3002

## Project Structure

**Frontend** - React-based management system

- Pages: Home, About, Courses, Instructors, Timetable, Fees, Login
- Dashboard: Students, Instructors, Schedule, Fees, Attendance

**Backend** - Express.js API server

- Auth endpoints for login/register
- CRUD endpoints for students, instructors, courses, fees, attendance
- JWT-based authentication

## Environment Variables

**Frontend (.env)**

- `REACT_APP_API_URL` - Backend API URL (default: http://localhost:3000)
- `REACT_APP_ENV` - Environment (development/production)

**Backend (.env)**

- `PORT` - Server port (default: 3002)
- `NODE_ENV` - Environment
- `JWT_SECRET` - Secret key for JWT tokens

## Default Login Credentials

- Email: `admin@dance.com`
- Password: `admin123`

## Features

- User authentication with JWT
- Student management
- Instructor management
- Course management
- Fee management
- Attendance tracking
- Admin dashboard
