# Task Manager RESTFul-API

Kanban Task manager API built using **NESTJS** Framework ,  **NODE JS** and **MongoDB**. It follows a **RESTFul** design architecture. The app sends an email notification upon registration and deactivation of the user's account. It's richly built with a simple scientific technique and best practices in the world of **API** design.

## Features

- Authentication and Security

## API Endpoints

| Methods | Endpoints                          | Access  | Description                              |
| ------- | ---------------------------------- | ------- | ---------------------------------------- |
| GET     | /user/[userId]                         | Private | User's Boards                         |
| GET   | /user/[userId]/boards/[boardId]                          | Private | Get one board                           |
| POST    | /user/[userId]                   | Private |  Create a Board                   |
| DELETE    | /user/[userId]/boards/[boardId]             | Private | Delete  one board                      |
| GET | /user/[userId]/boards/[boardsId]/columns/[columnId]                   | Private | get one column 
| PUT | /user/[userId]/boards/[boardsId]/columns/[columnId]/tasks/[taskId]                   | Private | update one task 
| POST | /user/[userId]/boards/[boardsId]/columns/[columnId]                  | Private | create one task
| DELETE  | /user/[userId]/boards/[boardsId]/columns/[columnId]/tasks/[taskId]                          | Private | Delete one task                            

## Hosted Domain Link

[Kanban Task Manager API](https://kanbantask.onrender.com)

## Postman Collection Link

[Kanban Task Manager API Shared Collection]

## Contributing

You can fork the repository and send pull request or reach out easily to me via twitter => [lucas zebre](https://twitter.com/ZebreLucas)

## Security Vulnerabilities

If you discover a security vulnerability within the project, please create an issue. All security vulnerabilities will be promptly addressed and appreciated.
