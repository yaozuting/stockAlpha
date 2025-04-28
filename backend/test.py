# import nltk
# from nltk import word_tokenize, pos_tag
# from nltk.stem import WordNetLemmatizer
# import spacy
# import pandas as pd
# from wordcloud import WordCloud
# import matplotlib.pyplot as plt
# from sklearn.feature_extraction.text import TfidfVectorizer
# from langdetect import detect, DetectorFactory
# import langid
# import google.generativeai as genai

# industry_categories = {
#     "Plantation": ['Palm Oil','Rubber'],
#     "Property": ['Residential','Commercial','Industrial'],
#     "Technology": [
#         "Digital Services", "Semiconductors", "Software", "Technology Equipment"
#     ],
#     "Construction": ['Residential','Commercial','Industrial'],
#     "Consumer Products & Services": [
#         "Agricultural Products", "Automotive", "Consumer Services", "Food & Beverages", 
#         "Household Goods", "Personal Goods", "Retailers", "Travel, Leisure & Hospitality"
#     ],
#     "Energy": [
#         "Energy", "Infrastructure", "Equipment & Services", "Oil & Gas Producers", 
#         "Other Energy Resources", "Renewable"
#     ],
#     "Financial Services": [
#         "Banking", "Insurance", "Other Financials"
#     ],
#     "Health Care": [
#         "Health Care Equipment & Services", "Health Care Providers", "Pharmaceuticals", "Hospital"
#     ],
#     "Industrial Products & Services": [
#         "Auto Parts", "Building Materials", "Chemicals", "Diversified Industrials", 
#         "Industrial Engineering", "Industrial Materials, Components & Equipment", "Industrial Services", 
#         "Metals", "Packaging Materials", "Wood & Wood Products"
#     ],
#     "Telecommunication & Media": [
#         "Media", "Telecommunications Equipment", "Telecommunications Service Providers"
#     ],
#     "Transportation & Logistics": [
#         "Transportation & Logistics Services", "Transportation Equipment"
#     ],
#     "Utilities": [
#         "Electricity", "Gas", "Water & Multi-Utilities"
#     ]
# }



# # # Download necessary NLTK data
# # nltk.download('punkt')
# # nltk.download('punkt_tab')
# # nltk.download('vader_lexicon')
# # nltk.download("averaged_perceptron_tagger_eng")
# # nltk.download('wordnet')

# # lemmatizer = WordNetLemmatizer()

# # def lemmatize_text(text):
# #     return " ".join([lemmatizer.lemmatize(word) for word in text.split()])

# # Load SpaCy model for Named Entity Recognition (NER)
# nlp = spacy.load("en_core_web_sm")
# DetectorFactory.seed = 0  

# def get_response(prompt):
#      model = genai.GenerativeModel("gemini-2.0-flash")
#      genai.configure(api_key="AIzaSyBrUCjoEuOaRwrRsIY8zRybr-ipgeCkTg0")
#      response = model.generate_content(prompt)
#      return response.text

# # ----------------- 1️⃣ Language Detection -----------------
# def is_english(text):
#     """Detect language using both langdetect and langid for better accuracy."""
#     try:
#         lang_detect = detect(text)  # langdetect method
#         lang_langid, confidence = langid.classify(text)  # langid method
#         final_decision = lang_detect == "en" or lang_langid == "en"
#         # print(f"'{text}' → LangDetect: {lang_detect}, LangID: {lang_langid} (Confidence: {confidence:.2f}) → Final Decision: {final_decision}")
#         return final_decision
#     except Exception as e:
#         print(f"Error detecting language for: {text}. Error: {e}")
#         return False

# # ----------------- 3️⃣ Named Entity Recognition (NER) -----------------
# def extract_entities(text):
#     """Extract named entities."""
#     doc = nlp(text)
#     return [(ent.text, ent.label_) for ent in doc.ents]

# # ----------------- 4️⃣ Keyword Extraction -----------------
# def extract_keywords(text, top_k=5):
#     """Extract keywords."""
#     vectorizer = TfidfVectorizer(stop_words="english")
#     X = vectorizer.fit_transform([text])
#     keywords = vectorizer.get_feature_names_out()
#     return keywords[:top_k]

# def extract_nouns(text):
#    """Extract nouns from the given text using NLTK."""
#    words = word_tokenize(text)  # Tokenize text
#    pos_tags = pos_tag(words)  # Get part-of-speech tags
#    nouns = [word for word, pos in pos_tags if pos in ["NN", "NNS", "NNP", "NNPS"]]  # Extract nouns
#    return nouns

# # ----------------- 4️⃣ wordcloud -----------------
# def generate_wordcloud(text):

#     """Generate and display a word cloud from text."""
#     wordcloud = WordCloud(width=800, height=400, background_color="white").generate(text)
    
#     # Display the word cloud
#     plt.figure(figsize=(10, 5))
#     plt.imshow(wordcloud, interpolation="bilinear")
#     plt.axis("off")  # Hide axis
#     plt.show()


# # entity = {}
# # def visualize_entity(entity_list):
# #     for item in entity_list:
# #         print(item)
# #         value,key = item  # Unpack tuple
# #         if key not in entity.keys():
# #             entity[key] = [value,]
# #         else:
# #             entity[key].append(value)  # Assign to dictionary
    

# # # ----------------- 5️⃣ Apply Analysis to a Dataset -----------------
# # def analyze_news_titles(df, column_name="Title"):
# #     """Process news titles in a DataFrame, checking language only once."""
    
# #     # Check language once and store it
# #     df["Is_English"] = df[column_name].apply(is_english)

# #     # Filter only English titles
# #     df = df[df["Is_English"]].reset_index(drop=True)

# #     # Apply NLP analysis to English titles
# #     df["Entities"] = df[column_name].apply(extract_entities)
# #     df["Keywords"] = df[column_name].apply(extract_keywords)
# #     df['Nouns'] = df[column_name].apply(extract_nouns)
    
# #     #visualization 
# #     df["Entities"].apply(visualize_entity)
# #     print(entity)
# #     return df

# # ----------------- 6️⃣ Example Usage -----------------
# if __name__ == "__main__":
#     # Sample dataset
#     data = pd.read_csv(r"C:\Users\user\OneDrive\桌面\stock_info\market\react_app\my-react-app\backend\files\news.csv")['Title']

#     # df = pd.DataFrame(data)
#     # combine_text = ' '.join(df['Title'])
#     # print(generate_wordcloud(combine_text))
   
#     data['Sector'] = []
#     for news in data.tolist():
#       try:
#         prompt = (f"""
# Analyze each row of news and provide only the output in the following regulated format:

# Sector,Industry

# Instructions:
# - Sector: Choose the sector from {industry_categories.keys()}, or use '-' if not applicable.
# - Industry: If the sector is not empty, select the industry from {industry_categories.values()}, or use '-' if not applicable.

# The data to analyze is:
# {news}
# """)


#     #     response = get_response(prompt)
#     #     data['Sector'].append(response)
#     #     print(response)
#     #   except:
#     #       print(data.iloc,data['Sector'])
#     #       break 
          
#     # print(data.iloc,data['Sector'])
#     # # # Process dataset
#     # processed_df = analyze_news_titles(df)
    
#     # # Save output
#     # processed_df.to_csv('output.csv', index=False)

#     # # Show results
#     # print(processed_df)

# import pandas as pd

# # def PlusKL (text):
# #     text += '.KL'
# #     return text
# # data = pd.read_csv(r'C:\Users\user\OneDrive\桌面\stock_info\market\react_app\my-react-app\backend\files\basic.csv')
# # data['Code'] = data['Code'].apply(PlusKL)
# # data.to_csv(r'C:\Users\user\OneDrive\桌面\stock_info\market\react_app\my-react-app\backend\files\basic.csv',index=False)

# #company specific,industry,announcement
# 'https://www.bursamalaysia.com/api/v1/announcements/search?ann_type=company&company=1155&keyword=&dt_ht=03%2F12%2F2024&dt_lt=31%2F01%2F2025&cat=&sub_type=&mkt=&sec=&subsec=&per_page=50&page=1'


import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from bs4 import BeautifulSoup
from datetime import date,datetime,timedelta, timezone
from selenium.webdriver.chrome.options import Options
from scrapy.crawler import CrawlerProcess
from openai import OpenAI
from dotenv import load_dotenv
import os
from concurrent.futures import ThreadPoolExecutor
import time
load_dotenv('.env')


# Set up OpenAI API client
api = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key='sk-d5d058d1fd3143bab9caf3ba19e37f14',base_url="https://api.deepseek.com")
def assign_industry(client,news_title):
    """Assigns industry to the news title using DeepSeek API."""
    try:
        response = client.chat.completions.create(
        model="deepseek-chat",  # ✅ correct model name for DeepSeek
        messages=[
            {
                "role": "user",
                "content": f"""Classify the following news title into one of these industries:

        Construction, Consumer Products & Services, Energy, Financial Services, Health Care, Industrial Products & Services, Plantation, Property, REIT, Technology, Telecommunications & Media, Transportation & Logistics, Utilities,Unknown

        Respond with only a single word in quotes — such as Construction, Financial Services, or Unknown . no quotation marks

        Title: {news_title}"""
            }
        ],
        )

        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"Error in API call: {e}")
        return None



def batch_assign_industries(client, items):
    def classify(item):
        item['Sector'] = assign_industry(client, item['Title'])
        return item

    with ThreadPoolExecutor(max_workers=100) as executor:
        return list(executor.map(classify, items))


def extract_key_entities(client, news_title):
    """Extracts structured named entities from a news title using DeepSeek API."""
    try:
        response = client.chat.completions.create(
                    model="deepseek-chat",
                    messages=[
                        {
                            "role": "user",
                            "content": 
                            f"""Extract the most relevant and precise Noun, Verb, and Object from the following news headline. 
            Focus only on the **core subject**, **main verb**, and **main object**. 
            Return the result in the following format:

            Noun: noun,  
            Verb: verb,  
            Object: object
            for example: Truck maker Volvo cuts North America market outlook amid tariff uncertainty after Q1 profit falls
            the result should be:
            Noun: Volvo,
            Verb: cut,
            Object: market outlook

            Guidelines:
            - Only include the **main subject noun** 
            - Only include the **root verb** in its **base form**
            - Only include the **primary object** or concept being acted upon 
            - No quotes or extra explanation. Just a clean 3-line output as shown.

        Title: {news_title}"""
                        }
            ]
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"Error extracting entities: {e}")
        return "None"

def batch_extract_entities(client, news_items):
    """
    Takes a list of dicts (each with a 'Title') and adds a 'Key_Entities' field.
    """
    def enrich_with_entities(item):
        item['Extracted_Entities'] = extract_key_entities(client, item['Title'])
        return item

    with ThreadPoolExecutor(max_workers=100) as executor:
        return list(executor.map(enrich_with_entities, news_items))
    
def unstructured_news(): 
    file_path = r'C:\Users\user\OneDrive\桌面\stock_info\market\react_app\my-react-app\backend\files\news.csv'
    old = pd.read_csv(file_path)
    latest_data = old.iloc[0] if not old.empty else None
    
    # Ensure target_date is initialized and timezone-aware
    target_date = datetime.now(timezone.utc)
           
    # Parse the target date (ignoring time)
    market_news = []
    # Set Chrome options
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Run in headless mode (no GUI)
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")  # Useful for Linux options=chrome_options

    # Initialize the driver with options
    driver = webdriver.Chrome()
    driver.get("https://www.klsescreener.com/v2/news")
    
    language_ids = ['checkbox_language_ms', 'checkbox_language_zh']

    for lang_id in language_ids:
        label = WebDriverWait(driver,5).until(EC.element_to_be_clickable((By.CSS_SELECTOR, f"label[for='{lang_id}']")))
        driver.execute_script("arguments[0].click();", label)  # Faster & more robust than .click()

        # Wait for the page to load
        time.sleep(2)
    driver.refresh()
    time.sleep(3)



    def process_page():
        """Process the current page with BeautifulSoup"""
        try:
            body = driver.page_source
            soup = BeautifulSoup(body, "html.parser")
            articles = soup.find("div", id="section")

            if not articles:
                print("No articles found.")
                return False

            individual_articles = articles.find_all('div', class_='item figure flex-block')
            found_new = False

            for article in individual_articles:
                title = article.find('h2').get_text(strip=True)
                if latest_data is not None and title == latest_data['Title']:
                    return False  # Stop if we reached previously scraped title

                date_str = article.find('span', attrs={"data-date": True})['data-date']
                article_date = datetime.fromisoformat(date_str)
                article_date = article_date.replace(tzinfo=timezone.utc)  # Ensure timezone-aware
                article_date = article_date.astimezone(timezone.utc)  # Convert to UTC
                # Stop if this article is too old
                if abs(target_date - article_date) > timedelta(hours=4):
                    return False

                news_hyperlink = 'https://www.klsescreener.com' + article.find('a')['href']

                market_news.append({
                    'Title': title,
                    'News_Hyperlinks': news_hyperlink,
                    'Published_Date': date_str
                })
                found_new = True

            return found_new  # Continue if at least one new item is found

        except Exception as e:
            print(f"Error processing page: {e}")
            return False

    while True:
        try:
            # Process the current page
            if not process_page():
                break

            # Click the "Load More" button
            load_more_button = WebDriverWait(driver, 0.01).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, ".figure_loading"))
            )
            load_more_button.click()

        except TimeoutException:
            print("No 'Load More' button found or content loading timed out.")
            break
        except Exception as e:
            print(f"An error occurred: {e}")
            break

    # Close the browser
    driver.quit()

    # Return the results
    return  market_news


import scrapy
from bs4 import BeautifulSoup

class NewsMainStorySpider(scrapy.Spider):
    name = 'main_story_spider'


    def __init__(self, market_news):
        self.market_news = market_news
        self.market_news = batch_assign_industries(client, self.market_news)
        self.market_news = batch_extract_entities(client, self.market_news)
        self.start_urls = [item['News_Hyperlinks'] for item in market_news]

    def start_requests(self):
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
        }
        for idx, url in enumerate(self.start_urls):
            yield scrapy.Request(url=url, headers=headers, callback=self.parse, meta={'index': idx})

    def parse(self, response):
        soup = BeautifulSoup(response.text, 'html.parser')
        news_container = soup.find('div', class_='news-container')
        paragraphs = news_container.find_all('p')
        related_stocks_section = soup.find('div', class_='stock-list table-responsive')
        # full_text = ' '.join([p.get_text(strip=True) for p in paragraphs])
        img = news_container.find('img')
        if img:
            img_url = img['src']
            # print(f"Image URL: {img_url}")
        else:
            img_url = 'https://www.klsescreener.com/v2/img/icon_navbar.png'
            # print("No image found.")
         

        related_stocks = []
        if related_stocks_section:
            related_stocks = [
                stock.find('span').get_text(strip=True)
                for stock in related_stocks_section.find_all('tr')
            ]

        for item in self.market_news:
            if item['News_Hyperlinks'] == response.url:
                # item['Body'] = full_text
                item['Related Stock'] = ', '.join(related_stocks)
                item['Img'] = img_url
                break  # No need to continue once matched

    def closed(self, reason):
        """Called when spider finishes crawling."""
        new_data = pd.DataFrame(self.market_news)
        file_path = r'C:\Users\user\OneDrive\桌面\stock_info\market\react_app\my-react-app\backend\files\news.csv'

        # Step 1: Read old data if it exists
        if os.path.exists(file_path):
            old_data = pd.read_csv(file_path)
            combined = pd.concat([new_data, old_data], ignore_index=True)
            combined.drop_duplicates(subset='Title', inplace=True)

        else:
            combined = new_data

        # Step 2: Write combined data back to CSV
        combined.to_csv(file_path, index=False)
      


if __name__ == "__main__":
    # Step 1: Scrape unstructured news
    market_news = unstructured_news()

    # Step 2: Pass dictionaries to Scrapy
    process = CrawlerProcess()
    process.crawl(NewsMainStorySpider, market_news=market_news)
    process.start()




