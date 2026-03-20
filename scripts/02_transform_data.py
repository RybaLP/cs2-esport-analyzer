import os
import glob
import logging
import json
import pandas as pd

# logging setup
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

# paths
RAW_DATA_DIR = "data/raw"
PROCESSED_DATA_PATH = "data/processed/matches_clean.csv"


def get_latest_raw_file():
    """find the most recent json file"""
    list_of_files = glob.glob(os.path.join(RAW_DATA_DIR, "*.json"))
    if not list_of_files:
        logger.error("could not find json files")
        return None

    latest_file = max(list_of_files, key=os.path.getctime)
    return latest_file


def load_raw_file(file_path):
    """load data from a file """
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    if not data:
        logger.error(f"The file {file_path} is empty")
    return data

def get_single_url(raw_url):
                if isinstance(raw_url, list) and raw_url:
                    return raw_url[0]
                elif isinstance(raw_url, str):
                    return raw_url
                return None


def transform_data(data):
    """transform raw match data into a flat, analysis-ready structure"""
    processed_matches = []

    for match in data:
        if match.get('status') == 'finished':
            match_name = match.get('name','')
            teams = match_name.split(' vs ')
            team1 = teams[0].split(":")[-1].strip() if (len(teams) > 0) else None
            team2 = teams[1].strip() if len(teams) > 1 else None

            # team logos
            opponents = match.get('opponents',[])
            t1_logo_raw = opponents[0].get('opponent',{}).get('image_url') if len(opponents) > 0 else None
            t2_logo_raw = opponents[1].get('opponent',{}).get('image_url') if len(opponents) > 1 else None

            t1_logo = get_single_url(t1_logo_raw)
            t2_logo = get_single_url(t2_logo_raw)

            # played maps
            games_list = []
            for game in match.get('games',[]):
                if game.get('map'):

                    raw_map_image = game['map'].get('image_url')
                    safe_map_image = get_single_url(raw_map_image)

                    games_list.append({
                        "map_name": game['map'].get('name'),
                        "map_image": safe_map_image,
                        "score": f"{game.get('results', [{}])[0].get('score', 0)}:{game.get('results', [{}, {}])[1].get('score', 0)}"
                    })

            overall_res = match.get('results', [])
            os1 = overall_res[0].get('score', 0) if len(overall_res) > 0 else 0
            os2 = overall_res[1].get('score', 0) if len(overall_res) > 1 else 0

            clean_match = {
                "id": match.get('id'),
                "name": match_name,
                "team1": team1,
                "team1_logo": t1_logo,
                "team2": team2,
                "team2_logo": t2_logo,
                "winner": match.get('winner', {}).get('name') if match.get('winner') else "Draw",
                "league": match.get("league", {}).get('name'),
                "score": f"{os1}:{os2}",
                "date": match.get('begin_at')
            }
            processed_matches.append(clean_match)

    logger.info(f"Matches overall {len(data)}")
    logger.info(f"Finished matches: {len(processed_matches)}")
    return processed_matches

def save_processed_data(matches, output_path=PROCESSED_DATA_PATH):
    """save processed data to csv"""
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    df = pd.DataFrame(matches)
    df.to_csv(output_path, index=False)
    logger.info(f"Processed data saved to: {output_path}")


if __name__ == "__main__":
    latest_file_path = get_latest_raw_file()
    if latest_file_path:
        logger.info(f"Found newest file: {latest_file_path}")
        raw_data = load_raw_file(latest_file_path)
        if raw_data:
            processed_matches = transform_data(raw_data)
            if processed_matches:
                save_processed_data(processed_matches)