# 🌍 AI-Powered Climate Research & Forecasting API

## 🚀 Overview
This project provides an **AI-powered** API for **climate forecasting** and **research paper retrieval**, integrating **OpenAI's GPT-4o** and **Prophet time-series forecasting**.

## 📂 Project Structure
```bash
/your-project
│── /data
│   ├── database.py         # Database models & initialization
│── /models
│   ├── prophet_model.json  # Trained Prophet model
│── /utils
│   ├── config.py           # API Keys, Database path
│── /frontend
│   ├── (Your frontend files)
│── /static
│── /templates
│── app.py                 # Main Flask application
│── requirements.txt        # Python dependencies
│── README.md              # Project documentation
│── .gitignore             # Ignore unnecessary files
│── database.db            # SQLite Database
```

## 🛠 Installation
### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2️⃣ Create Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # On macOS/Linux
venv\Scripts\activate     # On Windows
```

### 3️⃣ Install Dependencies
```bash
pip install -r requirements.txt
```

## 🚦 Usage
### 🔥 Run Flask Server
```bash
python app.py
```
Your API will be available at: `http://127.0.0.1:5000/`

## 🌡 Features
### 🔹 1. Temperature Forecasting
**Endpoint:** `/predict`
- **Request:** `GET`
- **Params:** `date=YYYY-MM-DD`
- **Response:**
```json
{
  "date": "2025-02-20",
  "predicted_temperature": "25.4°C"
}
```

### 🔹 2. Predict Temperature Range
**Endpoint:** `/predict_range`
- **Request:** `GET`
- **Params:** `start_date=YYYY-MM-DD`, `end_date=YYYY-MM-DD`
- **Response:**
```json
{
  "forecast": [
    { "date": "2025-02-20", "predicted_temperature": "25.4°C" },
    { "date": "2025-02-21", "predicted_temperature": "26.1°C" }
  ]
}
```

### 🔹 3. Fetch Research Papers
**Endpoint:** `/fetch_research`
- **Request:** `POST`
- **Params:** `{ "topic": "AI in Climate Forecasting" }`
- **Response:**
```json
{
  "message": "Research updated!",
  "summary": "Recent advancements in AI-driven climate prediction..."
}
```

### 🔹 4. Retrieve Research Data
**Endpoint:** `/research`
- **Request:** `GET`
- **Params:** `year=2025`, `topic=climate`
- **Response:** List of research papers.

### 🔹 5. Summarize Text
**Endpoint:** `/summarize`
- **Request:** `POST`
- **Params:** `{ "text": "Long research paper content..." }`
- **Response:**
```json
{
  "summary": "This paper discusses..."
}
```

## 🎯 Technologies Used
- **Python, Flask** (Backend API)
- **SQLite, SQLAlchemy** (Database)
- **OpenAI GPT-4o, DeepSeek** (AI Research Retrieval)
- **Prophet** (Time-Series Forecasting)

## 🔐 Environment Variables
Create a `.env` file in the project root:
```ini
API_KEY=your_openai_api_key
BASE_URL=https://api.openai.com/v1
DB_PATH=database.db
```

## 🏗 Future Enhancements
- [ ] **Dockerize the Application**
- [ ] **Add Authentication (JWT)**
- [ ] **Improve Frontend with React.js**

## 💡 Contributing
Feel free to submit issues or pull requests.

## 📜 License
MIT License. See `LICENSE` for details.



