import os
import pyodbc
import pandas as pd
from dotenv import load_dotenv
import time

# Load environment variables from .env
load_dotenv()

# Connect to Azure SQL using pyodbc
def connect_to_azure_sql():
    try:
        connection = pyodbc.connect(
            f"DRIVER={{ODBC Driver 18 for SQL Server}};"
            f"SERVER={os.getenv('DB_SERVER')};"
            f"DATABASE={os.getenv('DB_NAME')};"
            f"UID={os.getenv('DB_USERNAME')};"
            f"PWD={os.getenv('DB_PASSWORD')};"
            f"Encrypt=yes;"
            f"TrustServerCertificate=no;"
            f"Connection Timeout=100;"
        )
        print("✅ Successfully connected to Azure SQL Database.")
        return connection
    except Exception as e:
        print(f"❌ Error connecting to Azure SQL Database: {e}")
        return None



def connect_to_azure_sql_with_retry(max_retries=5, delay_seconds=10):
    attempt = 0
    while attempt < max_retries:
        try:
            connection = connect_to_azure_sql()  # your original function
            print(f"[INFO] Connected on attempt {attempt+1}")
            return connection
        except Exception as e:
            print(f"[WARNING] Attempt {attempt+1} failed: {e}")
            attempt += 1
            if attempt < max_retries:
                time.sleep(delay_seconds)
            else:
                raise Exception(f"Failed to connect after {max_retries} retries.")



# Read entire table into DataFrame
def read_sql(table_name):
    try:
        conn = connect_to_azure_sql_with_retry()
        if conn:
            query = f"SELECT * FROM {table_name}"
            df = pd.read_sql(query, conn)
            conn.close()
            return df
    
        else:
            return pd.DataFrame()
    except Exception as e:
        print(f"❌ Error reading SQL data: {e}")
        return pd.DataFrame()


def insert_news(news_df, news_table):
    try:
        conn = connect_to_azure_sql()
        if not conn:
            print("❌ DB connection failed for batch.")
            return
   
        cursor = conn.cursor()
        insert_query = f"""
            INSERT INTO {news_table}
            (Title, News_Hyperlinks, Published_Date, Sector, Extracted_Entities, Related_Stock, Img)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """

        records = [
            (
                row['Title'],
                row['News_Hyperlinks'],
                row['Published_Date'],
                row['Sector'],
                row['Extracted_Entities'],
                row['Related_Stock'],
                row['Img']
            )
            for _, row in news_df.iterrows()
        ]

        cursor.executemany(insert_query, records)
        conn.commit()
        cursor.close()
        conn.close()
        print(f"✅ Inserted batch of {len(records)} rows.")

    except Exception as e:
        print(f"❌ Error inserting batch: {e}")





# Get the most recent row by Published_Date
def extract_last_news(news_table):
    try:
        conn = connect_to_azure_sql_with_retry()
        if conn:
            query = f"SELECT TOP 1 * FROM {news_table} ORDER BY Published_Date DESC"
            df = pd.read_sql(query, conn)
            conn.close()
            return df
        else:
            return pd.DataFrame()
    except Exception as e:
        print(f"❌ Error extracting last news: {e}")
        return pd.DataFrame()


# Test connection
if __name__ == "__main__":
    conn = connect_to_azure_sql()
    if conn:
        conn.close()
