# Setting Up & Running the Interactive Kitchen Backend

This guide walks you through installing and running the Django backend located in:  
📁 `interactive-kitchen/interactive-kitchen-backend/`

---

## 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/interactive-kitchen.git
cd interactive-kitchen/interactive-kitchen-backend
```

---

## 2. Create and Activate a Virtual Environment

```bash
# Create virtual environment
python -m venv venv

# Activate it
# macOS/Linux:
source venv/bin/activate

# Windows:
venv\Scripts\activate
```

---

## 3. Install Dependencies

Make sure you're inside the `interactive-kitchen-backend` directory, then:

```bash
pip install -r requirements.txt
```

> Make sure `requirements.txt` includes:
```txt
Django>=4.2
djangorestframework
python-dotenv
openai
Pillow
```

---

## 4. Configure Environment Variables

Create a `.env` file inside the same folder (`interactive-kitchen-backend/`) with:

```env
DEBUG=True
SECRET_KEY=your_django_secret_key
OPENAI_API_KEY=your_openai_api_key
```

---

## 5. Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

---

## 6. (Optional) Create Superuser

```bash
python manage.py createsuperuser
```

---

## 7. Run the Development Server

```bash
python manage.py runserver
```

Your backend will be live at:  
 `http://127.0.0.1:8000/api/`

---

##  8. Testing API Endpoints

You can test the API using:
-  [Postman Team link]([url](https://app.getpostman.com/join-team?invite_code=b2acf93e9c703d46813a8a1eb9e1fcd62226de8945677bc4ea61937e60db9748))
-  `curl` from the terminal
