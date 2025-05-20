from bs4 import BeautifulSoup as bs
import pandas as pd 
import requests
import re
from yahooquery import Ticker
import time
import re 
from datetime import datetime
import pytz
from sklearn.feature_extraction.text import TfidfVectorizer
from database import read_sql
from openai import OpenAI
import os 
from dotenv import load_dotenv
import json
import pathlib
from curl_cffi import requests

# Convert ISO 8601 string to KL time and extract the date
def convert_to_kl_date(iso_date_str):
    if iso_date_str == None :
        return 
    # Parse the ISO 8601 string into a datetime object
    utc_time = datetime.strptime(iso_date_str, "%Y-%m-%dT%H:%M:%S.%fZ")
    
    # Define the KL timezone
    kl_timezone = pytz.timezone('Asia/Kuala_Lumpur')
    
    # Convert UTC time to KL time
    kl_time = utc_time.replace(tzinfo=pytz.utc).astimezone(kl_timezone)
    
    # Extract and return only the date part
    return kl_time.date()


load_dotenv('.env')


# Set up OpenAI API client
api = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=api ,base_url="https://api.deepseek.com")

def classify_with_deepseek(titles):
    """
    Classifies sentiment using DeepSeek based on an aggregated string of titles.
    
    Parameters:
        titles (str): Aggregated news headlines as a single string (e.g. "- Title 1\n- Title 2")

    Returns:
        dict: {'label': 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE', 'score': float}
    """
    titles = ' '.join(titles)
    print(titles)
    if not isinstance(titles, str) or not titles.strip():
        return {"label": "NEUTRAL", "score": 0.0}

    prompt = f"""
You are a financial sentiment classifier.

Analyze the overall market sentiment expressed in the following financial news headlines.

Return a JSON object with:
- label: "POSITIVE", "NEUTRAL", or "NEGATIVE"
- score: a float from 0.0 to 1.0 indicating confidence
in this format '{'label:XX,score:XX'}' not other word needed
News Headlines:
{titles}
    """

    try:
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role": "system", "content": "You are a financial sentiment classifier."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.2,
        )

        content = response.choices[0].message.content.strip().replace('json','')
        print(content)
        sentiment = json.loads(content)
        print(sentiment)
        return sentiment

    except Exception as e:
        print(f"❌ DeepSeek sentiment classification failed: {e}")
        return {"label": "NEUTRAL", "score": 0.0}


def get_market_data():

    base_dir = pathlib.Path(__file__).resolve().parent
    file_path = base_dir / 'files' / 'basic.csv'
    industry_data = pd.read_csv(file_path)

    sliced_data = industry_data[['Name', 'Industry', 'Sector']]
    market_url = 'https://www.klsescreener.com/v2/screener/quote_results'
    
    # Send a GET request to the URL
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    response = requests.get(market_url, headers=headers)
    
    # Check if the request was successful
    if response.status_code != 200:
        print(f"Failed to fetch the page. Status code: {response.status_code}")
        return []

    # Parse the HTML content with BeautifulSoup
    soup = bs(response.text, 'html.parser')

    # Find the table
    table = soup.find('table')
    if not table:
        print("No table found.")
        return []

    # Extract table headers
    rows = table.find_all('tr')
    headers = [header.text.strip() for header in rows[0].find_all('th')]

    # Extract table rows
    data = []
    for row in rows[1:]:
        temp = {}
        cols = row.find_all('td')
        for num, col in enumerate(cols):
            if num == 2:
                smalls = col.find_all('small')
                temp['Industry'] = smalls[0].text.strip()
                temp['Sector'] = smalls[1].text.rsplit(',', 1)[0]
            if num ==3:
               temp[headers[num]] =  cols[num].find(string=True, recursive=False).strip()
            
            else:
                temp[headers[num]] = col.text.strip().replace("\n", "").replace("[s]", "")
        data.append(temp)

    df =pd.DataFrame(data)
    # Apply to your dataframe
    df = df.drop(columns=['EPS','DPS','DY','ROE','Indicators'])
    # df = df.merge(sliced_data, left_on='Name', right_on='Name', how='left')

    return df



def stock_basic_data():
    # Load existing stock data
    stock_data = pd.read_csv('website.csv')
    code = stock_data['Code']

    # Define new columns
    stock_data['Description'] = ''
    stock_data['Sector'] = ''
    stock_data['Industry'] = ''
    stock_data['Website'] = ''

    # Scrape data and add it to the stock_data DataFrame
    for index, stock_symbol in enumerate(code):
        stock_symbol += ".KL"  # Bursa Malaysia stocks
        retries = 3
        while retries > 0:
            try:
                stock = Ticker(stock_symbol)
                company_info = stock.summary_profile
                if company_info and stock_symbol in company_info:
                    data = company_info[stock_symbol]
                    if isinstance(data, dict):
                        print(data)
                        stock_data.at[index, 'Description'] = data.get('longBusinessSummary', 'No description available.')
                        stock_data.at[index, 'Sector'] = data.get('sector', 'N/A')
                        stock_data.at[index, 'Industry'] = data.get('industry', 'N/A')
                        stock_data.at[index, 'Website'] = data.get('website', '#')
                    else:
                        stock_data.at[index, 'Description'] = ''
                        stock_data.at[index, 'Sector'] = ''
                        stock_data.at[index, 'Industry'] = ''
                        stock_data.at[index, 'Website'] = ''
                break  # Exit the retry loop if successful
            except Exception as e:
                print(f"Error fetching data for {stock_symbol}: {e}")
                retries -= 1
                time.sleep(2)  # Wait for 2 seconds before retrying


    # Display the updated DataFrame
    stock_data.to_csv('website.csv')



#market news
def get_market_news(filters=None):
    title =  filters.get('keyword') if filters and 'keyword' in filters else None

    kl_timezone = pytz.timezone('Asia/Kuala_Lumpur')
    # Get the current date and time in KL timezone
    today_date = datetime.now(kl_timezone).date()

    # Ensure 'Published Date' is in datetime format
    if filters:
        print(filters)
        query = """
                SELECT *
                FROM Market_News
                WHERE 
                    (%s IS NULL OR Title LIKE '%%' + %s + '%%' OR Body LIKE '%%' + %s + '%%')
                    AND (%s IS NULL OR Sector = %s)
                    AND (%s IS NULL OR CAST(Published_Date AS DATE) >= %s)
                    AND (%s IS NULL OR CAST(Published_Date AS DATE) <= %s)
                ORDER BY Published_Date DESC
            """

        params = [
            filters.get('keyword') if filters and 'keyword' in filters else None,
            filters.get('keyword') if filters and 'keyword' in filters else None,
            filters.get('keyword') if filters and 'keyword' in filters else None,
            filters.get('sector') if filters and 'sector' in filters else None,
            filters.get('sector') if filters and 'sector' in filters else None,
            convert_to_kl_date(filters.get('start_date')) if filters and 'start_date' in filters else None,
            convert_to_kl_date(filters.get('start_date')) if filters and 'start_date' in filters else None,
            convert_to_kl_date(filters.get('end_date')) if filters and 'end_date' in filters else None,
            convert_to_kl_date(filters.get('end_date'))if filters and 'end_date' in filters else None,
        ]
        notValid = set(params)
        if len(notValid) == 1 and None in notValid:
            query = """
                SELECT * FROM Market_News
                WHERE CAST(Published_Date AS DATE) = %s
            """
            params = [today_date]

    if filters is None:
        # Define the Kuala Lumpur timezone
        query = """
                SELECT * FROM Market_News
                WHERE CAST(Published_Date AS DATE) = ?
                    """
        params = [today_date]

   
    news = read_sql('Market_News',query,params)
    news = news.drop_duplicates(subset=['Title'])
    dates = pd.to_datetime(news['Published_Date'], errors='coerce').dropna().apply(lambda x: x.date()).unique()
    min_date = dates.min()
    max_date = dates.max()
    date = f'{min_date} - {max_date}' if min_date!=max_date else dates[0]
    news = news.sort_values(by='Published_Date', ascending=False).reset_index(drop=True)
    number_of_news = len(news)
    sector_unique = news['Sector'].str.replace('"', '').unique()
    sector_distribution = {s: len(news[news['Sector'] == s]) for s in sector_unique}
    company_names = news['Related_Stock'].str.strip().str.split(',').explode().reset_index(drop=True)
    company_distribution = company_names.value_counts().to_dict()
    company_distribution = [{"name": k, "value": int(v)} for k, v in company_distribution.items() if v > 0]

    # Word count
    titles = news['Title'].dropna().astype(str).tolist()

    if titles:
        vectorizer = TfidfVectorizer(stop_words='english', max_features=200)
        X = vectorizer.fit_transform(titles)  # Each title is a document
        summed = X.sum(axis=0).A1  # Sum TF-IDF scores across all docs
        word_count = dict(zip(vectorizer.get_feature_names_out(), summed))
        word_cloud = [{"text": k, "value": float(v)} for k, v in word_count.items()]
    else:
        word_cloud = []
        sentiment = {"label": "NEUTRAL", "score": 0.0}

    sentiment = classify_with_deepseek(titles)
    
    #summarize
    title_text = news[['Title','Published_Date','Body']].to_dict('split')
    title_text = title_text['data']
    text = ''
    for item in title_text:
        t = f'{item[1]}: {item[0]}:{item[2]}'  # Concatenate title and body with a colon and space
        text += t + '\n'  # Add a newline for better readability

    # summary = summary_deepseek(title,text)

    return {
        'number_of_news': number_of_news,
        'news': news.to_dict(orient='records'),
        'latest_date': date,
        'sector_distribution': sector_distribution,
        'company_distribution': company_distribution,
        'word_Cloud': word_cloud,
        "sentiment": sentiment['label'],
        "sentiment_score": sentiment["score"],
    }




def unpack_dict(d, prefix=""):
    """
    Recursively unpacks nested dictionary and prints key-value pairs.
    :param d: Dictionary to unpack
    :param prefix: String prefix for nested keys
    """
    if isinstance(d, dict):
        for key, value in d.items():
            new_prefix = f"{prefix}.{key}" if prefix else key
            unpack_dict(value, new_prefix)
    elif isinstance(d, list):
        for i, item in enumerate(d):
            unpack_dict(item, f"{prefix}[{i}]")
    else:
        print(f"{prefix}: {d}")


def date_converter(date_str):
    """Convert 'Sun, 30 Jun 2024 00:00:00 GMT' → '30Jun2024'"""
    return date_str.strftime("%d/%m/%Y")

def compare_stock_data(stock_data):
    tickers = list(stock_data.keys())

    if len(tickers) < 2:
        print("Need at least two tickers to compare.")
        return

    t1, t2 = tickers[0], tickers[1]
    print(f"Comparing: {t1} vs {t2}")

    for section in ['cash_flow', 'balance_sheet', 'income_statement']:
        data1 = stock_data[t1].get(section)
        data2 = stock_data[t2].get(section)

        if data1 == data2:
            print(f"✅ Section '{section}' is identical.")
        else:
            print(f"❌ Section '{section}' is different.")
            # Optional: show specific differences
            if isinstance(data1, list) and isinstance(data2, list):
                for i, (entry1, entry2) in enumerate(zip(data1, data2)):
                    if entry1 != entry2:
                        print(f"  🔹 Difference at index {i}:")
                        keys = set(entry1.keys()).union(entry2.keys())
                        for key in keys:
                            v1 = entry1.get(key)
                            v2 = entry2.get(key)
                            if v1 != v2:
                                print(f"    - {key}: {v1} != {v2}")
                        break  # Stop at first diff unless you want more
            else:
                print(f"  Values are not directly comparable: {type(data1)} vs {type(data2)}")





def date_converter(date):
    """Convert a date to string format."""
    if pd.isna(date):
        return None
    if isinstance(date, (pd.Timestamp, datetime)):
        return date.strftime('%Y-%m-%d')
    return str(date)

def get_stock_data(symbol):
    """
    Fetch stock data for a single ticker.

    :param symbol: A single stock symbol (e.g., '03040.KL').
    :return: A dictionary containing stock data for the ticker.
    """
    # Validate the symbol
    # if not symbol or not isinstance(symbol, str):
    #     return {'error': 'Invalid or missing stock symbol'}

    session = requests.Session(impersonate="chrome")
   
    result = {}

    try:
       # Pass this session to yahooquery
        tickers =  Ticker(symbol, asynchronous=True, progress=True, session=session)


        # Fetch different modules separately
        result["summary_detail"] = tickers.summary_detail.get(symbol, {})
        result["asset_profile"] = tickers.asset_profile.get(symbol, {})
        result["price"] = tickers.price.get(symbol, {})
        result["summary_profile"] = tickers.summary_profile.get(symbol, {})
        result["earnings"] = tickers.earnings.get(symbol, {})

        # Threshold for dropping rows with too many missing values
        threshold = 0.5

        # Process financial statements
        # ---------- Income Statement ----------
        df_income = tickers.income_statement()
        if isinstance(df_income, pd.DataFrame) and not df_income.empty:
            df_income = df_income.fillna('-')
            df_income = df_income[df_income.apply(lambda row: (row == "-").mean() < threshold, axis=1)]
            if "asOfDate" in df_income.columns:
                df_income["asOfDate"] = df_income["asOfDate"].apply(date_converter)
            result["income_statement"] = df_income.to_dict(orient="records")
        else:
            result["income_statement"] = {}

        # ---------- Balance Sheet ----------
        df_balance = tickers.balance_sheet()
        if isinstance(df_balance, pd.DataFrame) and not df_balance.empty:
            df_balance = df_balance.fillna('-')
            df_balance = df_balance[df_balance.apply(lambda row: (row == "-").mean() < threshold, axis=1)]
            if "asOfDate" in df_balance.columns:
                df_balance["asOfDate"] = df_balance["asOfDate"].apply(date_converter)
            result["balance_sheet"] = df_balance.to_dict(orient="records")
        else:
            result["balance_sheet"] = {}

        # ---------- Cash Flow ----------
        df_cash = tickers.cash_flow()
        if isinstance(df_cash, pd.DataFrame) and not df_cash.empty:
            df_cash = df_cash.fillna('-')
            df_cash = df_cash[df_cash.apply(lambda row: (row == "-").mean() < threshold, axis=1)]
            if "asOfDate" in df_cash.columns:
                df_cash["asOfDate"] = df_cash["asOfDate"].apply(date_converter)
            result["cash_flow"] = df_cash.to_dict(orient="records")
        else:
            result["cash_flow"] = {}

        # ---------- Quarterly Income Statement ----------
        df_income_q = tickers.income_statement(frequency="q")
        if isinstance(df_income_q, pd.DataFrame) and not df_income_q.empty:
            df_income_q = df_income_q.fillna('-')
            df_income_q = df_income_q[df_income_q.apply(lambda row: (row == "-").mean() < threshold, axis=1)]
            if "asOfDate" in df_income_q.columns:
                df_income_q["asOfDate"] = df_income_q["asOfDate"].apply(date_converter)
            result["income_statement_quarter"] = df_income_q.to_dict(orient="records")
        else:
            result["income_statement_quarter"] = {}

        # ---------- Quarterly Balance Sheet ----------
        df_balance_q = tickers.balance_sheet(frequency="q")
        if isinstance(df_balance_q, pd.DataFrame) and not df_balance_q.empty:
            df_balance_q = df_balance_q.fillna('-')
            df_balance_q = df_balance_q[df_balance_q.apply(lambda row: (row == "-").mean() < threshold, axis=1)]
            if "asOfDate" in df_balance_q.columns:
                df_balance_q["asOfDate"] = df_balance_q["asOfDate"].apply(date_converter)
            result["balance_sheet_quarter"] = df_balance_q.to_dict(orient="records")
        else:
            result["balance_sheet_quarter"] = {}

        # ---------- Quarterly Cash Flow ----------
        df_cash_q = tickers.cash_flow(frequency="q")
        if isinstance(df_cash_q, pd.DataFrame) and not df_cash_q.empty:
            df_cash_q = df_cash_q.fillna('-')
            df_cash_q = df_cash_q[df_cash_q.apply(lambda row: (row == "-").mean() < threshold, axis=1)]
            if "asOfDate" in df_cash_q.columns:
                df_cash_q["asOfDate"] = df_cash_q["asOfDate"].apply(date_converter)
            result["cash_flow_quarter"] = df_cash_q.to_dict(orient="records")
        else:
            result["cash_flow_quarter"] = {}



    except Exception as e:
        result["error"] = f"An error occurred: {str(e)}"

    # Return the result directly (not wrapped in a dictionary with symbol as key)
    return {symbol:result}






def get_stock_price(symbol,daterange):
    result = {}
     # Pick a random proxy
    session = requests.Session(impersonate="chrome")
    try:
        # Initialize a Ticker object for the single symbol
        tickers = Ticker(symbol, asynchronous=True, progress=True, session=session)
            # Fetch historical data
        historical_data = tickers.history(daterange).reset_index()
        if isinstance(historical_data, pd.DataFrame) and not historical_data.empty:
            result["historical_data"] = historical_data.to_dict(orient="records")
        else:
            result["historical_data"] = {}
    except Exception as e:
        result["error"] = f"An error occurred: {str(e)}"
    return {symbol: result}



def get_news_data(stock):
    base_dir = pathlib.Path(__file__).resolve().parent
    file_path = base_dir / 'files' / 'basic.csv'
    basic_file = pd.read_csv(file_path)

    # Announcement
    stock_redacted = stock.replace('.KL', '')
    url_announcement = f'https://www.bursamalaysia.com/api/v1/announcements/search?ann_type=company&company={stock_redacted}&per_page=50'

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
    }
    response = requests.get(url_announcement, headers=headers)
    json_data = response.json()

    # Access the HTML fragments inside the 'data' field
    text_row = []

    for row_index, row in enumerate(json_data.get("data", [])):  # Use .get to avoid KeyError
        row_data = {}

        for idx, col in enumerate(row):
            if isinstance(col, str):
                decoded_html = col.encode('utf-8').decode('unicode_escape')
                soup = bs(decoded_html, 'html.parser')

                text = soup.get_text(strip=True)
                link_tag = soup.find('a')
                link = f"https://www.bursamalaysia.com{link_tag['href']}" if link_tag else None

                if idx == 1:
                    match = re.search(r'\d{1,2} \w{3,4} \d{4}$', text)
                    if match:
                        row_data['Date'] = match.group()
                elif idx == 2:
                    row_data['Name'] = text
                    row_data['Company_url'] = link
                elif idx == 3:
                    row_data['Announcement'] = text
                    row_data['url'] = link

        text_row.append(row_data)

    name_company = ''
    # Company name lookup
    try:
        name_company = basic_file.loc[basic_file['Code'] == stock, 'Long Name'].values[0]
    except IndexError:
        name_company = stock


    # Get news from Google News RSS
    url_news = f'https://news.google.com/rss/search?q={name_company}+when:30d'

    response = requests.get(url_news, headers=headers)
    soup = bs(response.text, 'xml')
    items = soup.find_all('item')

    news_data = []
    for item in items:
        try:
            title = item.find('title').text.strip()
        except Exception as e:
            title = "No title"
            print("Title error:", e)

        try:
            description = item.find('description').text.strip()
            link = bs(description, 'html.parser')
            link = link.find('a')['href']
        except Exception as e:
            description = "No description"
            link = "#"
            print("Description error:", e)

        try:
            pub_date_raw = item.find('pubDate').text.strip()
            dt = datetime.strptime(pub_date_raw, "%a, %d %b %Y %H:%M:%S %Z")
            date = dt.strftime("%d %b %Y")
        except Exception as e:
            print("Date parsing error:", e)
            date = pub_date_raw  # fallback

        news_data.append({
            "title": title,
            "link": link,
            "date": date
        })

    # Ensure news_data is a valid DataFrame
    if news_data:
        news_df = pd.DataFrame(data=news_data) 
        news_df['date'] = pd.to_datetime(news_df['date'], format='%d %b %Y', errors='coerce')
        if not news_df.empty:
            # Now sort by the date column
            news_df = news_df.sort_values(by='date', ascending=False)
    else:
        news_df = pd.DataFrame(columns=['title', 'link', 'date'])  # Empty DataFrame with expected columns

    return text_row, news_df
