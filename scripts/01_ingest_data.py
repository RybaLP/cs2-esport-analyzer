import requests
import json
import os
import logging
from datetime import datetime
from dotenv import load_dotenv

#  config
load_dotenv()
API_KEY = os.getenv("PANDASCORE_API_KEY")
BASE_URL = "https://api.pandascore.co/csgo/matches/past"
RAW_DATA_DIR = "data/raw"
PER_PAGE = 5

# logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

def validate_config():
    """Ensure required environment variables are set"""
    if not API_KEY:
        raise ValueError("Api Key is not set in .env")
    
def build_url(per_page: int) -> str:
    """Build API request URL"""
    return f"{BASE_URL}?token={API_KEY}&per_page={per_page}"

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

def ingest_matches(per_page: int = PER_PAGE):
    """main ingestion pipeline"""
    logger.info("starting data ingestion...")

    validate_config()
    url = build_url(per_page)
    data = fetch_matches(url)

    if data:
        save_raw_data(data)
    else:
        logger.warning("no data to save")

if __name__ == "__main__":
    ingest_matches()