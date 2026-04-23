import os

def fix_all():
    villages_dir = "villages"
    for filename in os.listdir(villages_dir):
        if not filename.endswith(".html") or filename == "index.html":
            continue
            
        path = os.path.join(villages_dir, filename)
        with open(path, 'r') as f:
            lines = f.readlines()
            
        new_lines = []
        found_desc = False
        already_has_canonical = False
        
        for line in lines:
            if 'rel="canonical"' in line:
                already_has_canonical = True
            if ('<meta name="description"' in line or '<meta name=\'description\'' in line) and not found_desc:
                found_desc = True
                new_lines.append(line)
                desc_idx = len(new_lines)
            else:
                new_lines.append(line)
        
        if found_desc and not already_has_canonical:
            canonical_line = f'  <link rel="canonical" href="https://paraspur.com/villages/{filename}" />\n'
            new_lines.insert(desc_idx, canonical_line)
            with open(path, 'w') as f:
                f.writelines(new_lines)
            print(f"Fixed {filename}")

fix_all()
