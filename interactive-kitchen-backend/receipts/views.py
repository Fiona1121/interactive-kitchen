from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from openai import OpenAI
from users.models import CustomUser
from inventory.models import InventoryItem
import os
import datetime
import json
import base64
from mimetypes import guess_type
import re

api_key = os.getenv("OPENAI_API_KEY")
openai = OpenAI(api_key=api_key)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def scan_receipt(request):
    '''
    Handles the upload of a receipt image, processes it using an OpenAI model to extract grocery items, 
    and saves the extracted items to the inventory.
    Args: 
        request (HttpRequest): The HTTP request object containing the uploaded image file and user information.
    Returns:
        Response: 
            - HTTP 201 Created: If the receipt is successfully processed and items are added to the inventory.
              Returns a JSON response with the added items.
            - HTTP 400 Bad Request: If the image file is missing in the request.
              Returns a JSON response with an error message.
            - HTTP 500 Internal Server Error: If an unexpected error occurs during processing.
              Returns a JSON response with the error message.
    Raises:
        json.JSONDecodeError: If the extracted JSON data from the OpenAI response cannot be parsed.
        Exception: For any other unexpected errors during processing.
    Process:
        1. Validates that an image file is included in the request.
        2. Reads and encodes the image file to Base64 format.
        3. Sends the encoded image to the OpenAI Vision API with a prompt to extract grocery items.
        4. Parses the JSON response from the OpenAI API to extract item details.
        5. Saves the extracted items to the inventory database.
        6. Returns a response with the added items or an appropriate error message.
    Example cURL:
        curl -X POST http://127.0.0.1:8000/api/scan-receipt/ \
        -H "Authorization: Bearer <your_token>" \
        -H "Content-Type: multipart/form-data" \
        -F "image=@/path/to/your/receipt.jpg"
    '''
    if 'image' not in request.FILES:
        return Response({"error": "Image file is required."}, status=status.HTTP_400_BAD_REQUEST)

    image_file = request.FILES['image']
    user = request.user

    try:
        # Read and encode the image
        image_bytes = image_file.read()
        base64_image = base64.b64encode(image_bytes).decode('utf-8')

        # Get MIME type (e.g., image/jpeg)
        mime_type = guess_type(image_file.name)[0] or 'image/jpeg'

        # Send image to OpenAI Vision API with a prompt
        response = openai.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that extracts grocery items from receipts."},
                {
                    "role": "user",
                    "content": [
                        {"type": "text", 
                         "text": 
                         ''' 
                         Extract grocery items in this image. select sensibly, 3 items that would expire within next 3 days. 2 items that would expire within next 7 days and remaining items that would expire after more than 7 days.
                         Respond ONLY with a valid JSON array. Do NOT include any explanations, descriptions, markdown, or text outside the JSON. Return the response exactly in this format:
                            [
                            {"name": "<item_name - cleaned name>", "quantity": <quantity>, "unit": "<unit>", "expiration_date": "<YYYY-MM-DD - assume an expiration date starting 2025-04-03>"}
                            ]
                        '''},
                        {"type": "image_url", "image_url": {"url": f"data:{mime_type};base64,{base64_image}"}}
                    ]
                }
            ],
            max_tokens=1000
        )
        raw_response = response.choices[0].message.content
        # Extract JSON array from markdown block
        match = re.search(r"```json\\s*(\\[.*?\\])\\s*```", raw_response, re.DOTALL)
        if match:
            json_data = match.group(1)
        else:
            # Fallback: try extracting JSON-looking part from whole response
            json_data = raw_response.strip().split("```json")[-1].split("```")[0].strip()

        try:
            items = json.loads(json_data)
        except json.JSONDecodeError as e:
            print("Failed to parse cleaned JSON:")
            print(json_data)
            raise e

        # added_items = []
        # for item in items:
        #     inv_item = InventoryItem.objects.create(
        #         name=item["name"],
        #         quantity=item["quantity"],
        #         unit=item["unit"],
        #         expiration_date=datetime.datetime.strptime(item["expiration_date"], "%Y-%m-%d").date() if item["expiration_date"] else None,
        #         added_by=user
        #     )
        #     added_items.append({"id": inv_item.id, "name": inv_item.name})

        return Response({"items": items}, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
