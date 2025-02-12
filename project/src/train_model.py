import os
import pandas as pd
from prophet import Prophet
from prophet.serialize import model_to_json

def preprocess_data(df):
    """
    Prepares the data for Prophet model:
    - Renames 'Date' to 'ds' (datetime)
    - Renames 'T2M' to 'y' (temperature)
    - Converts date column to datetime format
    """
    required_columns = {'Date', 'T2M'}
    if not required_columns.issubset(df.columns):
        raise ValueError(f"❌ Error: Dataset must have columns {required_columns}. Found: {df.columns}")

    df = df.rename(columns={"Date": "ds", "T2M": "y"})
    df["ds"] = pd.to_datetime(df["ds"], format="%d/%m/%Y")  # Adjust format if needed
    return df

def main():
    # Load dataset
    data_path = r"D:\maknoon\hackathon\deeepseek\data\climate_data.csv"
    print(f"📂 Loading dataset from: {data_path}")  # Debugging log

    if not os.path.exists(data_path):
        raise FileNotFoundError(f"❌ Error: {data_path} not found.")

    df = pd.read_csv(data_path)

    # Preprocess data
    df = preprocess_data(df)

    # Train Prophet model
    model = Prophet()
    model.fit(df)

    # Save the trained model
    models_dir = os.path.abspath(os.path.join("..", "models"))
    os.makedirs(models_dir, exist_ok=True)

    model_json = model_to_json(model)
    model_path = os.path.join(models_dir, "prophet_model.json")
    with open(model_path, "w") as f:
        f.write(model_json)

    # Make future predictions (next 365 days)
    future = model.make_future_dataframe(periods=365)
    forecast = model.predict(future)

    # Save the forecast data
    forecast_path = os.path.join(models_dir, "forecast.csv")
    forecast.to_csv(forecast_path, index=False)

    print(f"✅ Model training complete.")
    print(f"📊 Predictions saved to: {forecast_path}")

if __name__ == "__main__":
    main()

