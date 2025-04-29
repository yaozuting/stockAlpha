import os
import time
import pandas as pd
import pymssql
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Validate required env vars
def validate_env():
    required_vars = ['DB_SERVER', 'DB_NAME', 'DB_USERNAME', 'DB_PASSWORD']
    missing = [var for var in required_vars if not os.getenv(var)]
    if missing:
        raise EnvironmentError(f"Missing environment variables: {', '.join(missing)}")

# Connect to Azure SQL using pymssql with retry logic
def connect_to_azure_sql(max_retries=5, delay_seconds=10):
    validate_env()
    attempt = 0
    while attempt < max_retries:
        try:
            connection = pymssql.connect(
                server=os.getenv('DB_SERVER'),
                user=os.getenv('DB_USERNAME'),
                password=os.getenv('DB_PASSWORD'),
                database=os.getenv('DB_NAME'),
                timeout=60,
                login_timeout=30
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
