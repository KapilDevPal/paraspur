import os
import re

def add_canonical_tags(directory, base_url):
    for filename in os.listdir(directory):
        if filename.endswith(".html") and filename != "index.html":
            filepath = os.path.join(directory, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Check if canonical tag already exists
            if 'rel="canonical"' in content:
                print(f"Skipping {filename}: Canonical tag already exists.")
                continue
            
            canonical_url = f"{base_url}/{filename}"
            canonical_tag = f'\n  <link rel="canonical" href="{canonical_url}" />'
            
            # Insert after the description meta tag
            new_content = re.sub(
                r'(<meta name="description" content="[^"]*">)',
                rf'\1{canonical_tag}',
                content
            )
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Added canonical tag to {filename}")
            else:
                print(f"Warning: Could not find description tag in {filename}")

if __name__ == "__main__":
    villages_dir = "villages"
    site_url = "https://paraspur.com/villages"
    add_canonical_tags(villages_dir, site_url)
