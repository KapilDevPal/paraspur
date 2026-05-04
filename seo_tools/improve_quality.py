import os
import re

def improve_village_quality(directory):
    for filename in os.listdir(directory):
        if not filename.endswith(".html") or filename == "index.html":
            continue
            
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Extract village name from the title or h1
        match = re.search(r'<h1[^>]*>(.*?)</h1>', content, re.IGNORECASE | re.DOTALL)
        if not match:
            continue
            
        h1_text = re.sub(r'<[^>]+>', '', match.group(1)).strip()
        village_name = h1_text.split(':')[0].split('Village')[0].strip()
        
        # Check if we already improved this page
        if 'application/ld+json' in content:
            print(f"Skipping {filename}: already has Schema markup.")
            continue
            
        # 1. Add JSON-LD Schema Markup for LocalBusiness / Place
        schema_markup = f"""
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "Place",
    "name": "{village_name} Village",
    "address": {{
      "@type": "PostalAddress",
      "addressLocality": "Paraspur",
      "addressRegion": "Uttar Pradesh",
      "addressCountry": "IN"
    }},
    "description": "Demographics and local information for {village_name} village in Paraspur Block, Gonda."
  }}
  </script>
"""
        content = content.replace('</head>', schema_markup + '</head>')
        
        # 2. Add an interactive map
        map_embed = f"""
          <section class="mt-12 mb-12">
            <h2 class="text-2xl font-bold mb-6 font-display">Location Map</h2>
            <div class="aspect-video bg-slate-100 rounded-3xl overflow-hidden border border-slate-200">
              <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14210.4284478149!2d81.79!3d27.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z{village_name.replace(' ', '+')}+Village+Paraspur+Gonda!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                  class="w-full h-full grayscale hover:grayscale-0 transition duration-700"
                  style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
          </section>
"""
        
        # 3. Add a "Contribute" Call to Action to encourage UGC (User Generated Content)
        ugc_section = f"""
          <section class="mt-12 p-8 bg-primary-50 rounded-3xl border border-primary-100 text-center">
            <h3 class="text-xl font-bold text-primary-900 mb-4">Are you from {village_name}?</h3>
            <p class="text-primary-800 mb-6">Help us improve this page! Share local photos, history, or list your local business here for free.</p>
            <a href="/contact.html" class="inline-block px-8 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition shadow-lg shadow-primary-200">Contribute Information</a>
          </section>
"""
        
        # Inject the Map and UGC section before the FAQ or at the end of the content div
        if '<h2 id="faq">' in content:
            content = content.replace('<h2 id="faq">', map_embed + ugc_section + '\n          <h2 id="faq">')
        elif '</div>\n\n        <footer' in content:
            content = content.replace('</div>\n\n        <footer', map_embed + ugc_section + '\n        </div>\n\n        <footer')
            
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
            
        print(f"Improved quality of {filename} (Added Schema, Map, and UGC prompt)")

if __name__ == "__main__":
    villages_dir = "villages"
    print(f"Improving quality of files in {villages_dir}...")
    improve_village_quality(villages_dir)
