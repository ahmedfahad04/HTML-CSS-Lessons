import os

import cv2


def crop_image(image):
    # Load the image
    image = cv2.imread(image)

    # Convert the image to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Find the edges of the image using Canny edge detection
    edges = cv2.Canny(gray, 50, 100)

    # Find the contours of the edges
    contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)

    # Find the bounding box of all the contours
    bounding_boxes = [cv2.boundingRect(c) for c in contours]

    # Find the bounding box that contains all the bounding boxes
    left = min(x for (x, _, _, _) in bounding_boxes)
    top = min(y for (_, y, _, _) in bounding_boxes)
    right = max(x + w for (x, _, w, _) in bounding_boxes)
    bottom = max(y + h for (_, y, _, h) in bounding_boxes)

    # Crop the image to the bounding box
    edited_image = image[top:bottom, left:right]
    resized_image = cv2.resize(edited_image, (767, 708)) # A4
    
    return resized_image


def get_cropped_images():
    image_dir = (os.path.join(os.getcwd(), "temp"))

    # Loop through the images in the directory
    for filename in os.listdir(image_dir):
        # Skip non-image files
        if not filename.endswith('.png'):
            continue

        # Load the image
        filepath = os.path.join(image_dir, filename)

        # Trim the whitespaces from the image
        trimmed_image = crop_image(filepath)

        # Save the trimmed image
        cv2.imwrite(filepath, trimmed_image)
