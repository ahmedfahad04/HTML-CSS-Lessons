import os
from PyPDF2 import PdfMerger


from PIL import Image

output_dir = (os.path.join(os.getcwd(), "output"))
image_dir = (os.path.join(os.getcwd(), "temp"))


def del_file(dir):
    # Delete the files in directories
    for filename in os.listdir(dir):
        filepath = os.path.join(dir, filename)
        if not filepath:
            continue
        os.remove(filepath)


def getImageSize(images, page_size):
    
    if page_size == 'Legal':
        spacing = 100
        margin = 120

        width = 2 * (images[0].width + spacing) - spacing + 2 * margin
        height = 4 * (images[0].height + spacing) - spacing + 2 * margin
        
        bulk = 8
    
    elif page_size == 'A4':
        spacing = 100
        margin = 120

        width = 2 * (images[0].width + spacing) - spacing + 2 * margin
        height = 3 * (images[0].height + spacing) - spacing + 2 * margin
        
        bulk = 6
        
    elif page_size == 'A5':
        spacing = 160
        margin = 100

        width = 2 * (images[0].width + spacing) - spacing + 2 * margin
        height = 4 * (images[0].height + spacing) - spacing + 2 * margin
        
        bulk = 8     
        
    return spacing, margin, width, height, bulk


def img_pdf(page_size):
    del_file(output_dir)

    # Create an image object for each image file
    images = [Image.open(os.path.join(image_dir, filename)) for filename in os.listdir(image_dir)]
    
    
    # Iterate over the images in groups of 8
    for i in range(0, len(images), 8):
        
        spacing, margin, width, height, bulk = getImageSize(images, page_size=page_size)
       
        print(images[0].width, images[0].height)
        # Create a blank image with a white background
        page = Image.new('RGB', (width, height), 'white')

        # Paste the images into the page
        for j in range(bulk):
            if i + j >= len(images):
                break
            
            x = j % 2
            y = j // 2
            
            # image dimension 575x358
            page.paste(images[i + j], (x * (images[0].width + spacing) + margin, y * (images[0].height + spacing) + margin))
            # page.show()
            # print(x * (images[0].width + spacing) + margin, y * (images[0].height + spacing) + margin)

        print(width, height)
        # Save the page to a PDF file
        page.save('{}/output_{}.pdf'.format(output_dir, i), 'PDF', resolution=300.0, quality=95, dpi=(300, 300))
        # page.save('temp{}.png'.format(i), 'PNG')
        
    
    del_file(image_dir)


def merge_pdf(page_size):
    
    img_pdf(page_size)
    # Create a PDF file merger
    merger = PdfMerger()

    # Loop through the PDF files in the directory
    for filename in os.listdir(output_dir):
        # Skip non-PDF files
        if not filename.endswith('.pdf'):
            continue

        # Add the PDF file to the merger
        filepath = os.path.join(output_dir, filename)
        merger.append(filepath)

    # Save the merged PDF file
    merged_filepath = os.path.join(output_dir, 'merged.pdf')
    merger.write(merged_filepath)
    # Close the merger
    merger.close()

    for filename in os.listdir(output_dir):
        if filename.endswith('.pdf') and filename != 'merged.pdf':
            filepath = os.path.join(output_dir, filename)
            os.remove(filepath)