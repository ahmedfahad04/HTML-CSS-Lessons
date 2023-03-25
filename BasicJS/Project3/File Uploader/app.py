import os
from flask import Flask, flash, request, redirect, url_for, render_template, send_file
from werkzeug.utils import secure_filename
from convert import start_conversion

UPLOAD_FOLDER = 'uploads'
DOWNLOAD_FOLDER = 'output'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
PAGE_SIZE = None 

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET', 'POST'])
def upload_files():
    
    if request.method == 'POST':      

        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        
        file = request.files['file']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)
            
    return render_template('index.html')
        
@app.route('/handle_data', methods=['POST'])
def handle_data():
    global PAGE_SIZE
    PAGE_SIZE = request.form['page_size']
    
    return render_template("index.html", page_size=PAGE_SIZE)
    
@app.route('/output', methods=['GET'])
def merge_files():
    
    print("PAGE_SIZE: ", PAGE_SIZE)
        
    for filename in os.listdir(UPLOAD_FOLDER):
        if filename.endswith('.pdf'):
            file_path = os.path.join(UPLOAD_FOLDER, filename)
            start_conversion(file_path, PAGE_SIZE)
            os.remove(file_path)
                
    return render_template('download.html', message="Merging Done!!")

@app.route('/output/<name>', methods=['GET', 'POST'])
def download_file(name):
        return send_file(DOWNLOAD_FOLDER+'/'+name, as_attachment=True, mimetype='application/pdf')

app.add_url_rule("/output/<name>", endpoint="download_file", build_only=True)

if __name__ == '__main__':
    app.run()
    
app.run(port=5003, debug=True)