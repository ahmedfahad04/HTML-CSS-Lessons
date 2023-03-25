
import fitz
from crop_image import get_cropped_images
from img_to_pdf import merge_pdf


def pdf_to_images(input_pdf, output_dir):
    # Open the input PDF
    pdf = fitz.open(input_pdf)

    # Iterate through the pages of the input PDF
    for i, page in enumerate(pdf):
        # Extract the page as an image
        pix = page.get_pixmap()
        output = f"{output_dir}/page{i}.png"
        pix.save(output)


def start_conversion(filepath, page_size):
    print("[MERGING] merging is progress.......")
    pdf_to_images(filepath, 'temp')
    get_cropped_images()
    merge_pdf(page_size)
    print("[DONE] check output folder for the merged file.......")

