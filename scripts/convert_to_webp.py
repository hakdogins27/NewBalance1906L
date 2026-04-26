import os
from PIL import Image
from concurrent.futures import ThreadPoolExecutor

BASE_DIR = "public/assets/frames"
FOLDERS = ["upper", "midsole", "outersole"]

def convert_file(file_path):
    output_path = file_path.rsplit(".", 1)[0] + ".webp"
    if os.path.exists(output_path):
        return
    
    try:
        with Image.open(file_path) as img:
            img.save(output_path, "WEBP", quality=75)
        print(f"Converted: {file_path}")
    except Exception as e:
        print(f"Error converting {file_path}: {e}")

def main():
    files_to_convert = []
    for folder in FOLDERS:
        folder_path = os.path.join(BASE_DIR, folder)
        if not os.path.exists(folder_path):
            continue
        
        for file in os.listdir(folder_path):
            if file.endswith(".jpg"):
                files_to_convert.append(os.path.join(folder_path, file))
    
    print(f"Found {len(files_to_convert)} files to convert using Pillow.")
    
    with ThreadPoolExecutor(max_workers=8) as executor:
        executor.map(convert_file, files_to_convert)

if __name__ == "__main__":
    main()
