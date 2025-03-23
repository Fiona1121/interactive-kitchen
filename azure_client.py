import os
from azure.ai.vision.imageanalysis import ImageAnalysisClient
from azure.ai.vision.imageanalysis.models import VisualFeatures
from azure.core.credentials import AzureKeyCredential

# Set the values of your computer vision endpoint and computer vision key
# as environment variables:
try:
    endpoint = os.environ["https://aikim.cognitiveservices.azure.com/"]
    key = os.environ["3etVNLAt4KMGUmAnvIhCKrXXujcOINFg4W1BXNqIxEPm0VKNFK9wJQQJ99BAAC4f1cMXJ3w3AAAFACOGQL9S"]
except KeyError:
    print("Missing environment variable 'VISION_ENDPOINT' or 'VISION_KEY'")
    print("Set them before running this sample.")
    exit()

# Create an Image Analysis client for synchronous operations,
# using API key authentication
client = ImageAnalysisClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(key)
)

def sample_ocr_image_file():
    import os
    from azure.ai.vision.imageanalysis import ImageAnalysisClient
    from azure.ai.vision.imageanalysis.models import VisualFeatures
    from azure.core.credentials import AzureKeyCredential

    # Set the values of your computer vision endpoint and computer vision key
    # as environment variables:
    try:    
        endpoint = os.environ["https://aikim.cognitiveservices.azure.com/"]
        key = os.environ["3etVNLAt4KMGUmAnvIhCKrXXujcOINFg4W1BXNqIxEPm0VKNFK9wJQQJ99BAAC4f1cMXJ3w3AAAFACOGQL9S"]
    except KeyError:
        print("Missing environment variable 'VISION_ENDPOINT' or 'VISION_KEY'")
        print("Set them before running this sample.")
        exit()


# [START read]
    # Load image to analyze into a 'bytes' object
    with open("sample.jpg", "rb") as f:
        image_data = f.read()

    # Extract text (OCR) from an image stream. This will be a synchronously (blocking) call.
    result = client.analyze(
        image_data=image_data,
        visual_features=[VisualFeatures.READ]
    )

    # Print text (OCR) analysis results to the console
    print("Image analysis results:")
    print(" Read:")
    if result.read is not None:
        for line in result.read.blocks[0].lines:
            print(f"   Line: '{line.text}', Bounding box {line.bounding_polygon}")
            for word in line.words:
                print(f"     Word: '{word.text}', Bounding polygon {word.bounding_polygon}, Confidence {word.confidence:.4f}")
    # [END read]
    print(f" Image height: {result.metadata.height}")
    print(f" Image width: {result.metadata.width}")
    print(f" Model version: {result.model_version}")


if __name__ == "__main__":
    sample_ocr_image_file()