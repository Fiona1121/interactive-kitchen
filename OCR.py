import pytesseract
import os
import re

def extract_groceries(text):
    grocery_items = []
    lines = text.split('\n')  # Split text into lines
    
    for line in lines:
        # Match grocery item lines based on pattern (typically contain a name and price)
        match = re.search(r'([A-Za-z\s]+)\s+[0-9]+\.[0-9]{2}\s*F?', line)
        if match:
            item_name = match.group(1).strip()
            grocery_items.append(item_name)
    
    return grocery_items

def main():
    curr_path = os.getcwd()
    print(curr_path)
    pytesseract.pytesseract.tesseract_cmd = r'C:/Program Files/Tesseract-OCR/tesseract.exe'
    text = pytesseract.image_to_string(curr_path+"/reciept1.jpeg", lang='eng', config='--psm 6 --oem 1')
    print(type(text))
    groceries = extract_groceries(text)
    
    print("\nGrocery List:")
    for item in groceries:
        print(item)

if __name__ == "__main__":
    main()