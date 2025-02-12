import pandas as pd

def preprocess_data(df):
    # Rename relevant columns
    df = df.rename(columns={'Date': 'ds', 'T2M': 'y'})

    # Convert 'ds' to datetime format
    df['ds'] = pd.to_datetime(df['ds'], format="%d/%m/%Y")

    return df
