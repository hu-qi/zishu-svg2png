import os
import sys
import cairosvg
from datetime import datetime

# Create results directory
RESULTS_DIR = 'results'


if not os.path.exists(RESULTS_DIR):
    os.mkdir(RESULTS_DIR)

def log_error(error):
    RESULTS_FILE = os.path.join(RESULTS_DIR, 'errors.txt')
    if not os.path.exists(RESULTS_FILE):
        open(RESULTS_FILE, 'w').close()
    timestamp = datetime.now().isoformat()
    with open(RESULTS_FILE, 'a') as f:
        f.write(f'[{timestamp}] {error}\n')

def convert_svg_to_png(svg_path):
    try:
        # Create output path in results directory
        relative_path = os.path.relpath(svg_path)
        output_path = os.path.join(RESULTS_DIR, relative_path).replace('.svg', '.png')
        
        # Create output directory if needed
        output_dir = os.path.dirname(output_path)
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)
            
        cairosvg.svg2png(url=svg_path, write_to=output_path)
        print(f'Converted: {svg_path} -> {output_path}')
    except Exception as e:
        log_error(f'Failed to convert {svg_path}: {str(e)}')

def process_path(input_path):
    try:
        if os.path.isfile(input_path) and input_path.endswith('.svg'):
            convert_svg_to_png(input_path)
        elif os.path.isdir(input_path):
            for filename in os.listdir(input_path):
                if filename.endswith('.svg'):
                    convert_svg_to_png(os.path.join(input_path, filename))
        else:
            log_error(f'Invalid input: {input_path} is not an SVG file or directory')
    except Exception as e:
        log_error(f'Error processing {input_path}: {str(e)}')

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print('Usage: python index.py <file.svg or directory>')
        sys.exit(1)
    
    input_path = sys.argv[1]
    process_path(input_path)
