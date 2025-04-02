# Receipt Scanning API - Documentation

This endpoint enables users to upload a receipt image and automatically extract grocery items using the OpenAI GPT-4o Vision model. Extracted items are saved directly to the authenticated user's inventory.

---
## **Base URL**
`http://<your-domain>/api/`

---
## Endpoint
**POST** `/receipts/scan_receipt/`

### Authentication
- Requires Token

### Content-Type
- `multipart/form-data`

### Request Parameters
| Field  | Type   | Required | Description                       |
|--------|--------|----------|-----------------------------------|
| image  | file   | Yes      | Receipt image in JPG/PNG format. |


### Example cURL
```bash
curl -X POST http://127.0.0.1:8000/api/receipts/scan_receipt/ \
  -H "Authorization: Token <your_token>" \
  -H "Content-Type: multipart/form-data" \
  -F "image=@/path/to/your/receipt.jpg"
```

### Example Request (Postman)
- Method: POST
- Headers:
  - `Authorization: Bearer <your_token>`
- Body:
  - form-data
    - `key`: `image`
    - `type`: File
    - `value`: [Upload image file]

---

## Response
### Success (201 Created)
```json
{
  "added_items": [
    {"id": 101, "name": "Milk"},
    {"id": 102, "name": "Eggs"}
  ]
}
```

### Error (400 Bad Request)
```json
{
  "error": "Image file is required."
}
```

### Error (500 Internal Server Error)
```json
{
  "error": "time data '' does not match format '%Y-%m-%d'"
}
```

---

## Process Flow
1. Validates that an image file is present.
2. Encodes the image to Base64.
3. Sends the image to the OpenAI Vision model (`gpt-4o`) with a strict prompt to return **only valid JSON**.
4. Parses the JSON content and extracts:
   - `name`
   - `quantity`
   - `unit`
   - `expiration_date` (uses a fallback if blank)
5. Saves the items in the user's inventory.
6. Returns a JSON response with the saved items.

---

## Notes
- Ensure your OpenAI API key is configured via `OPENAI_API_KEY` in environment variables.
- The model expects clean, structured receipts with recognizable grocery names.
- Expiration dates are optional; if not available, a default or null may be stored.
- Parsing includes a fallback for malformed OpenAI output (like markdown-wrapped JSON).