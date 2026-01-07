# Full Stack Application

This is a full-stack application with .NET backend and React frontend.

## Backend

- Framework: ASP.NET Core Web API
- Location: `backend/`
- Run: `cd backend; dotnet run`
- API: `https://localhost:5001/hello` returns "Hello World"

## Frontend

- Framework: React
- Location: `frontend/`
- Run: `cd frontend; npm start`
- Opens at: `http://localhost:3000`
- Fetches message from backend API

## Setup

1. Ensure .NET 8 SDK is installed.
2. Ensure Node.js is installed.
3. Run backend and frontend as above.

## Features

- Backend provides a simple hello endpoint with CORS enabled.
- Frontend displays the hello message fetched from the API.
