# Dev Bhupendra Pandya - Portfolio Website

A modern, responsive portfolio website built with Flask (Python), Bootstrap 5, and JavaScript.

## Features

- **Responsive Design**: Works perfectly on all devices
- **Dark/Light Mode**: Toggle between themes
- **Interactive UI**: Smooth animations and transitions
- **Contact Form**: Functional email contact form
- **Resume Download**: Downloadable PDF resume
- **Project Showcase**: Grid layout for projects
- **Modern Styling**: Clean, professional design with Bootstrap 5

## Tech Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript
- **Styling**: Bootstrap 5
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter)

## Project Structure

```
portfolio/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── README.md             # Project documentation
├── static/
│   ├── css/
│   │   └── style.css     # Custom styles
│   ├── js/
│   │   └── script.js     # JavaScript functionality
│   ├── images/
│   │   └── profile.jpg   # Profile image
│   └── files/
│       └── Dev_Pandya_Resume.pdf  # Resume PDF (add your own)
└── templates/
    ├── base.html         # Base template
    ├── index.html        # Home page
    ├── about.html        # About page
    ├── resume.html       # Resume page
    ├── projects.html     # Projects page
    └── contact.html      # Contact page
```

## Setup Instructions

### Prerequisites

- Python 3.7 or higher
- pip (Python package installer)

### Installation

1. **Clone or download the project files**

2. **Create a virtual environment** (recommended):
   ```
   python -m venv portfolio_env
   
   # On Windows:
   portfolio_env\Scripts\activate
   
   # On macOS/Linux:
   source portfolio_env/bin/activate
   ```

3. **Install dependencies**:
   ```
   pip install -r requirements.txt
   ```

4. **Add your resume PDF**:
   - Create a `static/files/` directory if it doesn't exist
   - Add your resume PDF as `Resume.pdf` in the `static/files/` directory

5. **Configure email settings** (for contact form):
   - Open `app.py`
   - Update the email configuration variables:
     ```python
     EMAIL_USER = 'your-email@gmail.com'
     EMAIL_PASS = 'your-app-password'
     ```
   - For Gmail, you'll need to use an App Password instead of your regular password

### Running the Application

1. **Start the Flask development server**:
   ```
   python app.py
   ```

2. **Open your browser** and navigate to:
   ```
   http://localhost:5000
   ```


