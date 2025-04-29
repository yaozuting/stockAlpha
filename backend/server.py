from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import os
from backend import get_stock_data, get_news_data, get_stock_price, get_market_data, get_market_news
import numpy as np
import pathlib

app = Flask(__name__)
# Enable CORS for all routes and all origins (or restrict to GitHub Pages)
CORS(app, origins=["https://yaozuting.github.io"])

# ✅ Centralize base directory
BASE_DIR = pathlib.Path(__file__).resolve().parent
FILES_DIR = BASE_DIR / 'files'

@app.route('/api/stockNames', methods=['GET'])
def get_stockNames():
    try:
        file_path = FILES_DIR / 'basic.csv'
        fetched_data = pd.read_csv(file_path)

        stockName = fetched_data[['Long Name', 'Name', 'Code']].drop_duplicates()

        return jsonify(stockName.to_dict(orient='records'))

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/SectorIndustry', methods=['GET'])
def get_sector():
    try:
        file_path = FILES_DIR / 'basic.csv'
        fetched_data = pd.read_csv(file_path)

        sector_industry = fetched_data[['Sector', 'Industry']].drop_duplicates()
        sector_industry_list = [
            {sector: sector_industry.loc[sector_industry['Sector'] == sector, 'Industry'].tolist()}
            for sector in sector_industry['Sector'].unique()
        ]

        return jsonify(sector_industry_list)

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/screener', methods=['GET'])
def get_data():
    try:
        fetched_data = get_market_data()

        sector = request.args.get('sector')
        industry = request.args.get('industry')
        min_value = request.args.get('min', type=float)
        max_value = request.args.get('max', type=float)

        if sector:
            fetched_data = fetched_data[fetched_data['Sector'] == sector]

        if industry:
            fetched_data = fetched_data[fetched_data['Industry'] == industry]

        fetched_data['MCap.(M)'] = pd.to_numeric(fetched_data['MCap.(M)'], errors='coerce')
        if min_value is not None and max_value is not None:
            fetched_data = fetched_data[
                (fetched_data['MCap.(M)'] >= min_value) & (fetched_data['MCap.(M)'] <= max_value)
            ]

        fetched_data = fetched_data.replace({np.nan: None})

        return jsonify(fetched_data.to_dict(orient='records'))

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/news', methods=['GET'])
def get_news():
    try:
        news_data = get_market_news()
        response = jsonify(news_data)
        response.headers['Content-Type'] = 'application/json; charset=utf-8'
        return response

    except Exception as e:
        print(f'Error: {e}')
        return jsonify({'error': str(e)}), 500

@app.route('/api/stock', methods=['GET'])
def get_stock():
    try:
        stockCode = request.args.get('stockCode')
        fetched_data = get_stock_data(stockCode)
        response = jsonify(fetched_data)
        response.headers['Content-Type'] = 'application/json; charset=utf-8'
        return response

    except Exception as e:
        print(f'Error: {e}')
        return jsonify({'error': str(e)}), 500

@app.route('/api/stockPrice', methods=['GET'])
def get_stockPrice():
    try:
        stockCode = request.args.get('stockCode')
        dateRange = request.args.get('dateRange')
        fetched_data = get_stock_price(stockCode, dateRange)
        response = jsonify(fetched_data)
        response.headers['Content-Type'] = 'application/json; charset=utf-8'
        return response

    except Exception as e:
        print(f'Error: {e}')
        return jsonify({'error': str(e)}), 500

@app.route('/api/companyNews', methods=['GET'])
def get_companyNews():
    try:
        stockCode = request.args.get('stockCode')
        announcements, companyNews = get_news_data(stockCode)
        news_json = companyNews.to_dict(orient='records')

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

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
