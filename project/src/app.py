import os
import pandas as pd
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from prophet.serialize import model_from_json
from datetime import datetime, timedelta
import matplotlib.pyplot as plt
import seaborn as sns


app = Flask(__name__)
CORS(app)

# Load the trained model once at startup
model_path = os.path.join("..", "models", "prophet_model.json")
with open(model_path, "r") as f:
    model_json = f.read()
model = model_from_json(model_json)

def predict_temperature(date_str):
    """ Predict temperature for a given date using Prophet model. """
    future = pd.DataFrame({"ds": [date_str]})
    forecast = model.predict(future)
    return round(forecast.loc[0, "yhat"], 2)  # Return rounded prediction

@app.route('/predict', methods=['GET'])
def predict():
    date = request.args.get('date')
    if not date:
        return jsonify({"error": "Date parameter is required"}), 400

    try:
        predicted_temp = predict_temperature(date)
        return jsonify({"date": date, "predicted_temperature": f"{predicted_temp}°C"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/predict_range', methods=['GET'])
def predict_range():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')

    if not start_date or not end_date:
        return jsonify({"error": "Missing start or end date"}), 400

    try:
        start_date = datetime.strptime(start_date, "%Y-%m-%d")
        end_date = datetime.strptime(end_date, "%Y-%m-%d")

        all_dates = [start_date + timedelta(days=i) for i in range((end_date - start_date).days + 1)]
        forecast = [{"date": d.strftime("%Y-%m-%d"), "predicted_temperature": f"{predict_temperature(d.strftime('%Y-%m-%d'))}°C"} for d in all_dates]

        return jsonify({"forecast": forecast})
    except Exception as e:
        return jsonify({"error": str(e)}), 500





if __name__ == '__main__':
    app.run(debug=True)