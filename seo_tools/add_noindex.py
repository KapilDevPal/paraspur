import os
import re

def add_noindex(directory, whitelist):
    for filename in os.listdir(directory):
        if not filename.endswith(".html"):
            continue
        
        if filename in whitelist:
            print(f"Skipping {filename} (in whitelist)")
            continue
            
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if noindex already exists
        if '<meta name="robots" content="noindex">' in content:
            print(f"Skipping {filename}: noindex tag already exists.")
            continue
            
        noindex_tag = '\n  <meta name="robots" content="noindex">'
        
        # Insert after <head> or <meta charset>
        if '<head>' in content:
            new_content = content.replace('<head>', '<head>' + noindex_tag)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Added noindex tag to {filename}")
        else:
            print(f"Warning: Could not find <head> tag in {filename}")

if __name__ == "__main__":
    villages_dir = "villages"
    villages_whitelist = [
        "index.html",
        "paraspur.html",
        "pasaka.html"
    ]
    print(f"Processing {villages_dir}...")
    add_noindex(villages_dir, villages_whitelist)
    
    directory_dir = "directory"
    directory_whitelist = [
        "pbc-makeup-studio-paraspur.html",
        "jobs.html",
        "schools.html",
        "clothing-shops-paraspur.html",
        "hospitals.html",
        "restaurants-paraspur.html",
        "colleges.html"
    ]
    print(f"\nProcessing {directory_dir}...")
    add_noindex(directory_dir, directory_whitelist)
