import os
import pandas as pd
from prophet import Prophet
from prophet.serialize import model_from_json

def load_model():
    """
    Load the serialized Prophet model from the models folder.
    """
    model_path = os.path.join("..", "models", "prophet_model.json")
    with open(model_path, "r") as f:
        model_json = f.read()
    model = model_from_json(model_json)
    return model

def predict_temperature(input_date_str):
    """
    Given an input date string (format: YYYY-MM-DD), predict the temperature.
    Returns the predicted temperature (yhat) from Prophet.
    """
    model = load_model()
    
    # Create a DataFrame with the given date for prediction
    future = pd.DataFrame({"ds": [input_date_str]})
    forecast = model.predict(future)
    predicted_temperature = forecast.loc[0, "yhat"]
    return predicted_temperature

# For testing purposes when running this file directly:
if __name__ == "__main__":
    test_date = "2025-02-15"  # Example date; adjust as needed
    prediction = predict_temperature(test_date)
    print(f"Predicted Temperature for {test_date}: {prediction:.2f}°C")
