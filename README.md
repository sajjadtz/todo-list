# NestJS TodoList API with CQRS Pattern and Clean Architecture

This project is a simple TodoList management API built using [NestJS](https://nestjs.com/), implementing the CQRS (Command Query Responsibility Segregation) pattern and adhering to Clean Architecture principles.

## Features

- **User Management**: Sign up and login.
- **TodoList Management**: Create, update, and delete todo lists.
- **TodoListItem Management**: Add, update, delete, and move items within todo lists.
- **CQRS**: Commands for mutating data, Queries for reading data.
- **Clean Architecture**: Separation of concerns between domain, application, and infrastructure layers.

## Technologies

- `NestJS`: Node.js framework for building efficient and scalable server-side applications.
- `Mongoose`: ODM (Object Document Mapper) for MongoDB integration.
- `JWT`: JSON Web Tokens for authentication.
- `MongoDB`: NoSQL database used for data storage.
- `CQRS Module`: NestJS CQRS package for implementing command and query segregation.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) v14.x or higher
- [Nest CLI](https://docs.nestjs.com/cli/overview)
- [MongoDB](https://www.mongodb.com/) (or a MongoDB cloud instance)

1. Clone the repository:
   ```bash
   git clone https://github.com/sajjadtz/todo-list.git
   ```
2. Install the dependencies:
   ```bash
    cd todo-list
    npm install
   ```
3. Config src/shared/configs/config.yml file:

   ```yaml
   app:
     secret: someSecretForJwt
     tokenExpireTime: 1d

   mongo:
     url: 'mongodb://localhost:27017/todo'
   ```

4. Run application:
   ```bash
   npm run start:dev
   ```
5. Run tests:
   ```bash
   npm run test:e2e
   ```

## Api Documentation

### User Endpoints

#### sign up

- POST `/api/v1/users/sign-up`

```json
{
  "username": "test",
  "password": "test"
}
```

#### login

- POST `/api/v1/users/login`
  ```json
  {
    "username": "test",
    "password": "test"
  }
  ```
- Response:
  ```json
  {
    "user": {
      "id": "user_id",
      "username": "test"
    },
    "accessToken": "jwt_token"
  }
  ```

#### get user

- GET `/api/v1/users`
  - Headers:
    - Authorization: `Bearer <jwt_token>`
- Response:
  ```json
  {
    "user": {
      "id": "<user_id>",
      "username": "test"
    },
    "accessToken": "jwt_token"
  }
  ```

### TodoList Endpoints

#### Create TodoList

- POST `/api/v1/todo-list`
  - Headers:
    - Authorization: `Bearer <jwt_token>`
  ```json
  {
    "title": "test"
  }
  ```

#### Get TodoList

- GET `/api/v1/todo-list/:id`
  - Headers:
    - Authorization: `Bearer <jwt_token>`
- Response
  ```json
  {
    "title": "test",
    "user": {
      "id": "<user_id>"
    },
    "items": []
  }
  ```

#### Update TodoList

- PATCH `/api/v1/todo-list/:id`
  - Headers:
    - Authorization: `Bearer <jwt_token>`
  ```json
  {
    "title": "test"
  }
  ```

#### Delete TodoList

- DELETE `/api/v1/todo-list/:id`
  - Headers:
    - Authorization: `Bearer <jwt_token>`

### TodoListItem Endpoints

#### Create TodoListItem

- POST `/api/v1/todo-list-item`
  - Headers:
    - Authorization: `Bearer <jwt_token>`
  ```json
  {
    "title": "test",
    "description": "test",
    "todoListId": "<todolist_id>"
  }
  ```

#### Update TodoListItem

- PATCH `/api/v1/todo-list-item/:id`
  - Headers:
    - Authorization: `Bearer <jwt_token>`
  ```json
  {
    "title": "test",
    "description": "test"
  }
  ```

#### Delete TodoListItem

- DELETE `/api/v1/todo-list-item/:id`
  - Headers:
    - Authorization: `Bearer <jwt_token>`

#### Move TodoListItem

- POST `/api/v1/todo-list-item/:id/move`
  - Headers:
    - Authorization: `Bearer <jwt_token>`
  ```json
  {
    "prevPriority": "0|100000:" //it's optional, the value is the priority of the previous todoListItem. If an amount is sent, the desired item will be moved to the first of the list
  }
  ```

# Project Structure

### This project follows a modular and scalable structure that separates the domain, application logic, and infrastructure concerns:

```bash
  src/
  │
  ├── application/       # CQRS commands, queries, handlers
  ├── domain/            # Domain entities and services
  ├── infrastructure/    # Infrastructure concerns (e.g., persistence, external services)
  ├── presentation/      # Presentation concerns (e.g., controllers)
  │
  ├── shared/            # Shared utilities (e.g., guards, interceptors, decorators)
  │
  ├── app.module.ts          # Root module
  └── main.ts                # Entry point of the application
```

### CQRS

#### The project implements the CQRS pattern to separate commands and queries. Commands are responsible for mutations (create, update, delete), and queries are responsible for reading data.

#### Example Command Handler (CreateTodoListCommand):

```typescript
@CommandHandler(CreateTodoListCommand)
export class CreateTodoListHandler
  implements ICommandHandler<CreateTodoListCommand, ITodoList>
{
  @Inject('ITodoListRepository')
  private readonly todoListRepository: ITodoListRepository;

  @Inject('IUserRepository') private readonly userRepository: IUserRepository;

  async execute({
    todoList,
  }: {
    todoList: Omit<ITodoList, 'items'>;
  }): Promise<ITodoList> {
    const result = await this.todoListRepository.create({ todoList });
    await this.userRepository.addTodoList({
      id: todoList.user.id,
      listId: result.id,
    });
    return result;
  }
}
```

### Clean Architecture

#### The code is structured into three main layers:

1. Entities (Domain): Core business rules and models.
2. Use Cases (Application): Business logic for specific operations.
3. Interface Adapters (Presentation): Transforms data between domain models and external systems.
4. Frameworks & Drivers (Infrastructure): Implementation of external technologies, frameworks, and services.
