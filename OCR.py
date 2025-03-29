import pytesseract
#from inventory import views 
import os

def main():
    curr_path = os.pathcwd()
    print(curr_path)
    text = pytesseract.image_to_string(image_path, lang='eng', config='--psm 6 --oem 1')
    print(text)
