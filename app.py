from flask import Flask, render_template, request, flash, redirect, url_for, send_file
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

app = Flask(__name__)

# Configuration for email (you'll need to set these)
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USER = os.environ.get('EMAIL_USER')
EMAIL_PASS = os.environ.get('EMAIL_PASS')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/resume')
def resume():
    return render_template('resume.html')

@app.route('/projects')
def projects():
    return render_template('projects.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']
        
        try:
            # Create message
            msg = MIMEMultipart()
            msg['From'] = EMAIL_USER
            msg['To'] = 'devpandya651@gmail.com' 
            msg['Subject'] = f'Portfolio Contact from {name}'
            
            body = f"""
            Name: {name}
            Email: {email}
            
            Message:
            {message}
            """
            
            msg.attach(MIMEText(body, 'plain'))
            
            # Send email
            server = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT)
            server.starttls()
            server.login(EMAIL_USER, EMAIL_PASS)
            text = msg.as_string()
            server.sendmail(EMAIL_USER, 'devpandya651@gmail.com', text)
            server.quit()
            
            flash('Message sent successfully!', 'success')
            return redirect(url_for('contact'))
            
        except Exception as e:
            flash('Error sending message. Please try again.', 'error')
            return redirect(url_for('contact'))
    
    return render_template('contact.html')

@app.route('/download-resume')
def download_resume():
    # You'll need to add your resume PDF to static/files/
    try:
        return send_file('static/files/Resume.pdf', as_attachment=True)
    except FileNotFoundError:
        flash('Resume file not found.', 'error')
        return redirect(url_for('resume'))

if __name__ == '__main__':
    app.run()
