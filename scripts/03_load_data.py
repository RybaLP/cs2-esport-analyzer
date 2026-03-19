import pandas as pd
from sqlalchemy import create_engine
import logging
from dotenv import load_dotenv
import os

CSV_FILE_PATH = "data/processed/matches_clean.csv"

# Logging setup
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv(dotenv_path=".env")

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")


def get_db_engine():
    """create and return a sqlalchemy engine using environment variables"""
    conn_string = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    return create_engine(conn_string)


def load_data():
    """load csv file into pgsql database."""
    if not os.path.exists(CSV_FILE_PATH):
        logger.error(f"File not found: {CSV_FILE_PATH}")
        return

    df = pd.read_csv(CSV_FILE_PATH)

    if df.empty:
        logger.warning("csv file is empty")
        return

    logger.info(f"Loaded {len(df)} rows from {CSV_FILE_PATH}")

    engine = None
    try:
        engine = get_db_engine()

        df.to_sql("matches", engine, if_exists="replace", index=False)
        logger.info(f"Successfully inserted {len(df)} rows into 'matches' table.")

    except Exception as e:
        logger.error(f"failed to load data into database: {e}")

    finally:
        if engine:
            engine.dispose()
            logger.info("db connection closed")


if __name__ == "__main__":
    load_data()