# Inventory API Documentation

This document provides details about the Inventory API endpoints and example `curl` commands for testing.

## Base URL
```
http://localhost:3000/api/inventory

```

### Authentication
- Requires Token

---

## Endpoints

### 1. Get All Inventory Items
**GET** `/`

**Description:** Retrieve a list of all inventory items.

**Example Request:**
```bash
curl -X GET http://localhost:3000/api/inventory/
-H "Authorization: Token <your_token>"
```

---

### 2. Get a Single Inventory Item
**GET** `/:id`

**Description:** Retrieve details of a specific inventory item by its ID.

**Example Request:**
```bash
curl -X GET http://localhost:3000/api/inventory/123
-H "Authorization: Token <your_token>"
```

---

### 3. Add a New Inventory Item
**POST** `/`

**Description:** Add a new item to the inventory.

**Request Body:**
```json
{
    "name": "Tomatoes",
    "quantity": 10,
    "unit": "kg"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/inventory/ \
-H "Authorization: Token <your_token>" \
-H "Content-Type: application/json" \
-d '{"name": "Tomatoes", "quantity": 10, "unit": "kg"}'
```

---

### 4. Update an Inventory Item
**PUT** `/:id`

**Description:** Update the details of an existing inventory item.

**Request Body:**
```json
{
    "name": "Tomatoes",
    "quantity": 15,
    "unit": "kg"
}
```

**Example Request:**
```bash
curl -X PUT http://localhost:3000/api/inventory/123 \
-H "Authorization: Token <your_token>" \
-H "Content-Type: application/json" \
-d '{"name": "Tomatoes", "quantity": 15, "unit": "kg"}'
```

---

### 5. Delete an Inventory Item
**DELETE** `/:id`

**Description:** Remove an inventory item by its ID.

**Example Request:**
```bash
curl -X DELETE http://localhost:3000/api/inventory/123
-H "Authorization: Token <your_token>"
```

---

## Notes
- Replace `123` with the actual ID of the inventory item.
- Ensure the server is running locally on port `3000` or update the base URL accordingly.
