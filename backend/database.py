import os
import time
import pyodbc
import pandas as pd
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


# Validate required env vars
def validate_env():
    required_vars = ['DB_SERVER', 'DB_NAME', 'DB_USERNAME', 'DB_PASSWORD']
    missing = [var for var in required_vars if not os.getenv(var)]
    if missing:
        raise EnvironmentError(f"Missing environment variables: {', '.join(missing)}")

# Connect to Azure SQL with retry logic
def connect_to_azure_sql(max_retries=5, delay_seconds=10):
    validate_env()
    attempt = 0
    while attempt < max_retries:
        try:
            connection = pyodbc.connect(
                f"DRIVER={{ODBC Driver 17 for SQL Server}};"
                f"SERVER={os.getenv('DB_SERVER')};"
                f"DATABASE={os.getenv('DB_NAME')};"
                f"UID={os.getenv('DB_USERNAME')};"
                f"PWD={os.getenv('DB_PASSWORD')};"
                f"Encrypt=yes;"
                f"TrustServerCertificate=no;"
                f"Connection Timeout=60;"  # 60s enough for serverless wake
            )
            print(f"[INFO] Successfully connected to Azure SQL Database on attempt {attempt + 1}.")
            return connection
        except Exception as e:
            print(f"[WARNING] Attempt {attempt + 1} failed: {e}")
            attempt += 1
            if attempt < max_retries:
                print(f"[INFO] Retrying in {delay_seconds} seconds...")
                time.sleep(delay_seconds)
            else:
                print("[ERROR] All connection attempts failed.")
                return None

# Read entire table into DataFrame
def read_sql(table_name):
    try:
        conn = connect_to_azure_sql()
        if conn:
            query = f"SELECT * FROM {table_name}"
            df = pd.read_sql(query, conn)
            conn.close()
            return df
        else:
            return pd.DataFrame()
    except Exception as e:
        print(f"[ERROR] Error reading SQL data: {e}")
        return pd.DataFrame()




# Manual test connection
if __name__ == "__main__":
    try:
        conn = connect_to_azure_sql()
        if conn:
            print("[INFO] Test connection successful.")
            conn.close()
    except Exception as e:
        print(f"[ERROR] Test connection failed: {e}")
