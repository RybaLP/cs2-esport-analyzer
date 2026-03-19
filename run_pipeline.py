import subprocess
import sys
import logging

# Setup logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

def run_script(script_path):
    logger.info(f"starting: {script_path}")
    try:
        result = subprocess.run([sys.executable, script_path], check=True)
        logger.info(f"finished: {script_path}")
        return True
    except subprocess.CalledProcessError as e:
        logger.error(f"Error occurred while running {script_path}: {e}")
        return False

def main():
    scripts = [
        "scripts/01_ingest_data.py",
        "scripts/02_transform_data.py",
        "scripts/03_load_data.py"
    ]

    for script in scripts:
        if not run_script(script):
            logger.error("pipeline failed, stopping execution")
            sys.exit(1)

    logger.info("pipeline executed successfully!")

if __name__ == "__main__":
    main()