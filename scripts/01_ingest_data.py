import requests
import json
import os
import logging
from datetime import datetime
from dotenv import load_dotenv
import time

#  config
load_dotenv()
API_KEY = os.getenv("PANDASCORE_API_KEY")
BASE_URL = "https://api.pandascore.co/csgo/matches/past"
RAW_DATA_DIR = "data/raw"
PER_PAGE = 50

# logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

def validate_config():
    """Ensure required environment variables are set"""
    if not API_KEY:
        raise ValueError("Api Key is not set in .env")
    
def build_url(per_page: int, page: int) -> str:
    """Build API request URL with pagination support"""
    return f"{BASE_URL}?token={API_KEY}&per_page={per_page}&page={page}"

def fetch_matches(url:str) -> list:
     """Fetch matches from api"""
     try:
         response = requests.get(url,timeout=10)
         if response.status_code == 200:
             data = response.json()
             logger.info(f"Fetched {len(data)} matches successfuly")
             return data
         else :
             logger.error(f"api request failed with status code: {response.status_code}")
             return []
     except requests.RequestException as e:
         logger.error(f"Request error: {e}")
         return []

def save_raw_data (data : list):
    """Save raw data to json  with timestamp"""

    os.makedirs(RAW_DATA_DIR,exist_ok=True)
    timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    file_path = os.path.join(RAW_DATA_DIR, f"matches_raw_{timestamp}.json")

    with open (file_path, "w", encoding="utf-8") as f:
        json.dump(data,f,ensure_ascii=False,indent=4)

    logger.info(f"rawdata saved to: {file_path}")

def ingest_matches(pages_to_fetch: int = 5):
    """main ingestion pipeline"""
    logger.info("starting data ingestion...")

    validate_config()
    all_data = []

    for page in range(1, pages_to_fetch + 1):
        current_url = build_url(PER_PAGE, page) 
        
        logger.info(f"Fetching page {page}...")
        
        data = fetch_matches(current_url) 
        
        if data:
            all_data.extend(data)
            logger.info(f"Page {page} added. Total matches so far: {len(all_data)}")
        else:
            logger.warning(f"No data found on page {page}")
            break
        
        time.sleep(1.5)

    if all_data:
        save_raw_data(all_data)
        logger.info(f"Successfully ingested {len(all_data)} matches in total.")
    else:
        logger.warning("No data to save")

if __name__ == "__main__":
    ingest_matches()