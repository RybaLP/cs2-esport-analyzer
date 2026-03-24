import pandas as pd
import logging
from dotenv import load_dotenv
import os
from kafka import KafkaProducer
import json

CSV_FILE_PATH = "data/processed/matches_clean.csv"

# Logging setup
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv(dotenv_path=".env")

KAFKA_BROKER = os.getenv("KAFKA_BROKER")
TOPIC_NAME = os.getenv("TOPIC_NAME")

def load_and_send_to_kafka():
    if not os.path.exists(CSV_FILE_PATH):
        logger.error("CSV file is empty")
        return
    df = pd.read_csv(CSV_FILE_PATH)
    if df.empty:
        logger.error("CSV file is empty")
        return
    try: 
        producer = KafkaProducer(
            bootstrap_servers=[KAFKA_BROKER],
            value_serializer=lambda v: json.dumps(v).encode('utf-8')
        )
        logger.info(f"Connected to Kafka Broker at: {KAFKA_BROKER}")

        for _,row in df.iterrows():
            match_data = row.to_dict()
            producer.send(TOPIC_NAME,match_data)

        producer.flush()
        logger.info(f"Successfully sent {len(df)} matches to Kafka topic '{TOPIC_NAME}'.")
    except Exception as e:
        logger.error(f"Failed to send data to Kafka: {e}")

if __name__ == "__main__":
    load_and_send_to_kafka()