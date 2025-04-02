# Recipe Suggestion API - Documentation

This endpoint allows authenticated users to get AI-powered recipe suggestions based on ingredients from their inventory or custom input. It uses OpenAI GPT models to generate recipes tailored to user preferences.

---
## **Base URL**
`http://<your-domain>/api/`

---
## Endpoint
**POST** `/recipe/suggest/`

### Authentication
- Requires Token

### Content-Type
- `application/json`

### Request Body Parameters
| Field         | Type    | Required | Description                                                                 |
|---------------|---------|----------|-----------------------------------------------------------------------------|
| ingredients   | list    | No       | List of ingredients to use. Defaults to full inventory if not provided.    |
| cuisine       | string  | No       | Preferred cuisine type (e.g., "Indian", "Italian"). Default is "any".     |
| spicy_level   | string  | No       | Desired spice level ("low", "medium", "high"). Default is "medium".       |
| cooking_time  | string  | No       | Max cooking time in minutes (as a string). Default is "any".               |

### Example Request
```json
{
  "ingredients": [
    {"name": "chicken", "quantity": 1, "unit": "kg"},
    {"name": "onion", "quantity": 2, "unit": "pcs"}
  ],
  "cuisine": "Italian",
  "spicy_level": "low",
  "cooking_time": "30"
}
```

### Example cURL
```bash
curl -X POST http://127.0.0.1:8000/api/recipe/suggest/ \
  -H "Authorization: Token <your-access-token>" \
  -H "Content-Type: application/json" \
  -d '{
        "ingredients": [{"name": "chicken", "unit": "kg", "quantity": 1}],
        "cuisine": "Italian",
        "spicy_level": "low",
        "cooking_time": "30"
     }'
```

---

## Response
### Success (200 OK)
```json
{
  "user": {
    "username": "johndoe",
    "email": "johndoe@example.com"
  },
  "recipe": [
    {
      "recipe": "Creamy Chicken Pasta",
      "ingredients": [
        {"name": "Chicken", "quantity": 1, "unit": "kg", "expiration_date": "2025-01-30"},
        {"name": "Pasta", "quantity": 200, "unit": "g", "expiration_date": "2025-01-15"}
      ],
      "cuisine": "Italian",
      "spicy_level": "Low",
      "cooking_time": 30,
      "overview": "A flavorful pasta.",
      "instructions": "1. Boil pasta. 2. Cook chicken. 3. Combine with cream sauce."
    }
  ]
}
```

### Error (400 Bad Request)
```json
{
  "error": "'ingredients' field is required"
}
```

### Error (500 Internal Server Error)
```json
{
  "error": "OpenAI model error or invalid response"
}
```

---

## Behavior
1. If `ingredients` are not provided (key "ingredients" is missing from request), the user's entire inventory is used by default.
2. Ingredients with closer expiration dates may be prioritized internally.
3. Output is generated via the GPT model, structured as a list of recipe objects.
4. The user's username and email are returned alongside the recipe suggestion.
