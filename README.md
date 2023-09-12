# Kanban Task Manager RESTful API

The Kanban Task Manager API is a RESTful API built using **NESTJS**, **Node.js**, and **PostgreSQL**. It provides functionalities for managing boards, columns, tasks, and subtasks in a Kanban-style task management system.

## Features

- Authentication and Security

## API Endpoints

### Authentication

- **User Login**
  - Method: `POST`
  - Endpoint: `/auth/login`
  - Access: Private
  - Description: Allows a user to log in.

- **User Registration**
  - Method: `POST`
  - Endpoint: `/auth/register`
  - Access: Private
  - Description: Allows a user to register an account.

- **User Logout**
  - Method: `POST`
  - Endpoint: `/auth/logout`
  - Access: Private
  - Description: Allows a user to log out.

### User Profile

- **Get User Profile**
  - Method: `GET`
  - Endpoint: `/users/:userId`
  - Access: Private
  - Description: Retrieves the user's profile, including their boards.

### Boards

- **Get All Boards**
  - Method: `GET`
  - Endpoint: `/users/:userId/boards`
  - Access: Private
  - Description: Retrieves all boards belonging to the user.

- **Get One Board**
  - Method: `GET`
  - Endpoint: `/boards/:boardId`
  - Access: Private
  - Description: Retrieves details of a specific board by its `boardId`.

- **Create a Board**
  - Method: `POST`
  - Endpoint: `/users/:userId/boards`
  - Access: Private
  - Description: Creates a new board for the user.

- **Delete One Board**
  - Method: `DELETE`
  - Endpoint: `/users/:userId/boards/:boardId`
  - Access: Private
  - Description: Deletes a specific board.

### Columns

- **Get One Column**
  - Method: `GET`
  - Endpoint: `/columns/:columnId`
  - Access: Private
  - Description: Retrieves details of a specific column by its `columnId`.

- **Update One Task**
  - Method: `PUT`
  - Endpoint: `/columns/:columnId/tasks/:taskId`
  - Access: Private
  - Description: Updates a specific task within a column.

- **Create One Task**
  - Method: `POST`
  - Endpoint: `/columns/:columnId/tasks`
  - Access: Private
  - Description: Creates a new task within a column.

- **Delete One Task**
  - Method: `DELETE`
  - Endpoint: `/columns/:columnId/tasks/:taskId`
  - Access: Private
  - Description: Deletes a specific task within a column.

### Subtasks

- **Create One Subtask**
  - Method: `POST`
  - Endpoint: `/tasks/:taskId/subtask`
  - Access: Private
  - Description: Creates a new subtask within a task.

- **Delete One Subtask**
  - Method: `DELETE`
  - Endpoint: `/subtask/:subtaskId`
  - Access: Private
  - Description: Deletes a specific subtask.

- **Update One Subtask**
  - Method: `PUT`
  - Endpoint: `/subtask/:subtaskId`
  - Access: Private
  - Description: Updates a specific subtask.

## Hosted Domain Link

[Link to Hosted Kanban Task Manager API](https://your-api-domain.com)

## Postman Collection Link

[Link to Postman Collection for Kanban Task Manager API]

## Contributing

You are welcome to contribute to the project by forking the repository and sending pull requests. If you have any questions or suggestions, feel free to reach out on [Twitter](https://twitter.com/YourTwitterHandle).

## Security Vulnerabilities

If you discover any security vulnerabilities within the project, please create an issue to report it. Your assistance in identifying and addressing security issues is greatly appreciated.
