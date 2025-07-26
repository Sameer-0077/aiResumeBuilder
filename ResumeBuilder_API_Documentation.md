# 📘 Resume Builder API Documentation

This API allows users to register, log in, get current user details, and generate AI-based resumes.

---

## 🧩 Base URL

```
http://localhost:8000/api
```

---

## 🔐 Authentication

- The `Authorization` header is required for protected routes.
- Format:
  ```
  Authorization: Bearer <JWT_TOKEN>
  ```

---

## 📮 API Endpoints

---

### 1. Register User

- **Endpoint:** `POST /register`
- **Description:** Registers a new user.
- **Request Body:**

```json
{
  "name": "Sameer",
  "email": "sameer@example.com",
  "password": "123456"
}
```

- **Success Response:**

```json
{
  "token": "JWT_TOKEN"
}
```

---

### 2. Login User

- **Endpoint:** `POST /login`
- **Description:** Authenticates a user and returns a token.
- **Request Body:**

```json
{
  "email": "sameer@example.com",
  "password": "123456"
}
```

- **Success Response:**

```json
{
  "token": "JWT_TOKEN"
}
```

---

### 3. Get Current User

- **Endpoint:** `GET /current-user`
- **Description:** Returns the currently logged-in user's data.
- **Headers:**

```
Authorization: Bearer JWT_TOKEN
```

- **Success Response:**

```json
{
  "name": "Sameer",
  "email": "sameer@example.com"
}
```

---

### 4. Generate Resume

- **Endpoint:** `POST /generate-resume`
- **Description:** Sends user data to the AI model and returns a generated resume.
- **Headers:**

```
Authorization: Bearer JWT_TOKEN
```

- **Request Body:**

```json
{
  "fullName": "Sameer Yadav",
  "education": "B.Tech in CSE, 2023",
  "skills": ["JavaScript", "React", "Node.js"],
  "experience": "Interned at XYZ, built 3 major projects"
}
```

- **Success Response:**

```json
{
  "resume": "Generated AI-based Resume Content Here"
}
```

---

## 🧪 Postman Collection

Download and import the full Postman collection to test the API:

👉 [ResumeBuilder_API.postman_collection.json](./ResumeBuilder_API.postman_collection.json)
