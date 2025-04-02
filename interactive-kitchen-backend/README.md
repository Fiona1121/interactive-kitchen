# Interactive Kitchen API Documentation

Welcome to the Interactive Kitchen API! This documentation provides an overview of the available endpoints and their usage. All endpoints require authentication unless otherwise specified.

For detailed API documentation on each feature, see the corresponding README.md files inside the respective app folders:

- [`inventory/README.md`](./inventory/README.md)
- [`recipes/README.md`](./recipes/README.md)
- [`receipts/README.md`](./receipts/README.md)

## **Base URL**
`http://<your-domain>/api/`

---

## **Authentication**

### **Register**
**POST** `/auth/register/`

#### Request:
```json
{
    "username": "example_user",
    "email": "user@example.com",
    "password": "secure_password",
    "date_of_birth": "2000-01-01"
}
```

#### Response:
```json
{
    "token": "your_auth_token"
}
```

### **Login**
**POST** `/auth/login/`

#### Request:
```json
{
    "username": "example_user",
    "password": "secure_password"
}
```

#### Response:
```json
{
    "token": "your_auth_token"
}
```

### **Logout**
**POST** `/auth/logout/`

#### Response:
```json
{
    "message": "Logged out successfully"
}
```

---

## Inventory Management

Manage your pantry items with CRUD functionality.

- **GET** `/inventory/` – Get all items
- **POST** `/inventory/` – Add one or more items
- **PUT** `/inventory/<id>/` – Update a specific item
- **DELETE** `/inventory/<id>/` – Delete a specific item

See full documentation: [`inventory/README.md`](./inventory/README.md)

---

## Recipe Suggestions (AI-powered)

Generate personalized recipes based on inventory or selected ingredients.

- **POST** `/recipe/suggest/`

Example input:
```json
{
    "ingredients": [{"name": "Tomato", "quantity": 500, "unit": "g"}],
    "cuisine": "Italian",
    "spicy_level": "Low",
    "cooking_time": "30"
}
```
 See full documentation: [`recipes/README.md`](./recipes/README.md)

---

## Receipt Scanning

Upload a receipt image and automatically populate your inventory.

- **POST** `/receipts/scan/`
  - Requires `multipart/form-data` with an `image` field

See full documentation: [`receipts/README.md`](./receipts/README.md)

---

## **User Management**

### **Get All Users**
**GET** `/users/`

#### Response:
```json
[
    {
        "id": 1,
        "username": "example_user",
        "email": "user@example.com",
        "date_of_birth": "2000-01-01"
    }
]
```

---

## **Notes**
1. **Authentication**: Most endpoints require an authentication token in the `Authorization` header:
   ```
   Authorization: Token <your_auth_token>
   ```

2. **Error Handling**:
   - Missing or invalid data will return a `400 Bad Request`.
   - Authentication issues return a `401 Unauthorized`.
   - Server issues return a `500 Internal Server Error`.

Feel free to reach out for any clarifications or support!

