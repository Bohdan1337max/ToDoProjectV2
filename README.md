# To-Do List App

A simple To-Do List application with a .NET Core Web API backend and a React frontend.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The To-Do List App is a web application that allows users to manage their tasks and to-do items. It consists of a .NET Core Web API backend for handling data and a React frontend for the user interface.

## Features

- Create, read, update, and delete tasks
- Mark tasks as completed
- Responsive user interface

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [.NET Core SDK](https://dotnet.microsoft.com/download/dotnet)
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/) database server
- [Visual Studio Code](https://code.visualstudio.com/) or your preferred code editor

## Getting Started

### Backend Setup

1. Clone the repository:
git clone https://github.com/Bohdan1337max/ToDoProjectV2
2. Navigate to the backend directory:
cd todo_api
3. Create a PostgreSQL database for the application. 
4. Update the connection string in appsettings.json to point to your PostgreSQL database:
  "ConnectionStrings": {
   "TodoDb": "Server=127.0.0.1;Port=5432;Database=tododb;User Id=postgres;Password=dovakinis3"
  }
5. Run the database scrips in DataBase folder to create the necessary tables:
   ? 1. run DateBaseCreate
     2. run CreateTaskTable
6. Start the backend API:
  dotnet run
The backend API should now be running at [http://localhost:5094].

### Frontend Setup

1. Navigate to the frontend directory: cd todo_ui
2. Install frontend dependencies: npm install
3. Start the React development server: npm start
The React frontend should now be running at http://localhost:3000.
## Usages

1. Open your web browser and go to http://localhost:3000 to access the To-Do List App.
2. Start managing your tasks and to-do items.
