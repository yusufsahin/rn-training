# JSON Server with Authentication

This project demonstrates how to add JWT-based authentication to `json-server`.

## Setup

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Access the server at [http://localhost:3000](http://localhost:3000).

## Endpoints

### Login
- **URL**: `/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "username": "admin",
    "password": "1234"
  }
  ```
- **Response**:
  ```json
  {
    "token": "your-jwt-token"
  }
  ```

### Protected Routes
Include the JWT token in the `Authorization` header:
```
Authorization: Bearer <your-jwt-token>
```

Example:
```bash
curl -X GET http://localhost:3000/posts \
-H "Authorization: Bearer your-jwt-token"
```
