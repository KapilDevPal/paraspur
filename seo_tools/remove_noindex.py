import os
import re

def remove_noindex(directory):
    for filename in os.listdir(directory):
        if not filename.endswith(".html"):
            continue
            
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if noindex exists
        noindex_str = '\n  <meta name="robots" content="noindex">'
        if noindex_str in content:
            new_content = content.replace(noindex_str, '')
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Removed noindex tag from {filename}")
        elif '<meta name="robots" content="noindex">' in content:
            new_content = content.replace('<meta name="robots" content="noindex">', '')
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Removed noindex tag from {filename}")

if __name__ == "__main__":
    villages_dir = "villages"
    print(f"Processing {villages_dir}...")
    remove_noindex(villages_dir)
    
    directory_dir = "directory"
    print(f"\nProcessing {directory_dir}...")
    remove_noindex(directory_dir)
