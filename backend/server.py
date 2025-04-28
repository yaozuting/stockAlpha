from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import os
from backend import get_stock_data,get_news_data, get_stock_price,get_market_data,get_market_news
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


@app.route('/api/stockNames', methods=['GET'])
def get_stockNames():
    try:
        base_dir = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(base_dir, 'files', 'basic.csv')
        fetched_data = pd.read_csv(file_path)

        stockName = fetched_data[['Long Name', 'Name', 'Code']].drop_duplicates()

        # ✅ Convert DataFrame to list of dicts
        return jsonify(stockName.to_dict(orient='records'))
    
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500
    
@app.route('/api/SectorIndustry', methods=['GET'])  
def get_sector():
    try:
        # Read the CSV file
        base_dir = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(base_dir, 'files', 'basic.csv')
        fetched_data = pd.read_csv(file_path)
        
        # Get unique sector-industry pairs
        sector_industry = fetched_data[['Sector', 'Industry']].drop_duplicates()
        print(sector_industry)
        # Create a list of objects with sectors and their industries
        sector_industry_list = [
            {sector: sector_industry.loc[sector_industry['Sector'] == sector, 'Industry'].tolist()}
            for sector in sector_industry['Sector'].unique()
        ]
        
        return jsonify(sector_industry_list)
    
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

# Example API endpoint
@app.route('/api/screener', methods=['GET'])
def get_data():
    try:
        # Read the CSV file
        fetched_data = get_market_data()
        
        # Get query parameters
        sector = request.args.get('sector')
        industry = request.args.get('industry')
        min_value = request.args.get('min', type=float)
        max_value = request.args.get('max', type=float)
        
        # Apply filters based on provided parameters
        if sector:
            fetched_data = fetched_data[fetched_data['Sector'] == sector]
        
        if industry :
            fetched_data = fetched_data[fetched_data['Industry'] == industry]
        fetched_data['MCap.(M)'] = pd.to_numeric(fetched_data['MCap.(M)'], errors='coerce')
        if min_value is not None and max_value is not None:
             fetched_data = fetched_data[(fetched_data['MCap.(M)'] >= min_value) & (fetched_data['MCap.(M)'] <= max_value)]
        print(fetched_data)
        # Convert to JSON-friendly format
        fetched_data = fetched_data.replace({np.nan: None})
        
        # Convert to JSON-safe dict
        json_data = fetched_data.to_dict(orient='records')
        return jsonify(json_data)

    
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/news', methods=['GET'])
def get_news():
    try:
        news_data = get_market_news()
        print(news_data)
         # Set response headers to ensure UTF-8 encoding
        response = jsonify(news_data)
        response.headers['Content-Type'] = 'application/json; charset=utf-8'
        return response

    except Exception as e:
         print(f'Error:{e}')
         return jsonify({'error': str(e)}), 500

    
@app.route('/api/stock', methods=['GET'])
def get_stock():
    try:
        # Get query parameters
        stockCode = request.args.get('stockCode')

        # Drop the index column if it exists
        fetched_data = get_stock_data(stockCode)
        print(fetched_data)
         # Set response headers to ensure UTF-8 encoding
        response = jsonify(fetched_data)
        response.headers['Content-Type'] = 'application/json; charset=utf-8'
        return response

    except Exception as e:
         print(f'Error:{e}')
         return jsonify({'error': str(e)}), 500

@app.route('/api/stockPrice', methods=['GET'])
def get_stockPrice():
    try:
        # Get query parameters
        stockCode = request.args.get('stockCode')
        dateRange = request.args.get('dateRange')

        # Drop the index column if it exists
        fetched_data =  get_stock_price(stockCode, dateRange)
  
         # Set response headers to ensure UTF-8 encoding
        response = jsonify(fetched_data)
        response.headers['Content-Type'] = 'application/json; charset=utf-8'
        return response

    except Exception as e:
         print(f'Error:{e}')
         return jsonify({'error': str(e)}), 500
    
@app.route('/api/companyNews', methods=['GET'])
def get_companyNews():
    try:
        stockCode = request.args.get('stockCode')

        # Call your function
        announcements, companyNews = get_news_data(stockCode)
        print(announcements)
        # Convert DataFrame to a list of dictionaries
        news_json = companyNews.to_dict(orient='records')

        # Build response data
        fetched_data = {
            'announcements': announcements,
            'companyNews': news_json
        }

        response = jsonify(fetched_data)
        response.headers['Content-Type'] = 'application/json; charset=utf-8'
        return response

    except Exception as e:
        print(f'Error: {e}')
        return jsonify({'error': str(e)}), 500
    
# Post request example
@app.route('/api/data', methods=['POST'])
def post_data():
    data = request.json  # Get JSON data from request body
    return jsonify({'message': f"Received {data['name']}!"})

if __name__ == '__main__':
    app.run(port=5000,debug=True)  # Run on port 5000
