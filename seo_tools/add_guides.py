"""Append an original guide + FAQ (with FAQPage schema) to thin listing pages. Idempotent."""
import json, html

CONTACT = ('<p class="text-sm text-slate-500 mt-6">Listings on this page are compiled from community submissions and public information. '
           'Timings, prices and services change, so please call the business before visiting. To correct or add a listing, '
           '<a class="text-primary-600 font-semibold hover:underline" href="/contact.html">contact the editorial team</a>.</p>')

G = {}

G['directory/best-beauty-parlour-in-paraspur.html'] = dict(
 title='How to Choose a Beauty Parlour in Paraspur',
 paras=['Choosing a salon in a small town works differently from a city. There are fewer online reviews, so word of mouth, a look at the shop itself, and a few direct questions matter more. Use the checklist below whether you are booking a simple haircut or a full party look.'],
 bullets=[('Look at hygiene first','Tools should be cleaned between customers, towels should be fresh, and disposable items such as wax strips and applicators should be used once. If you cannot see this, ask.'),
  ('Ask what products are used','Reputable salons will tell you the brands they use for hair colour, facials and makeup. If you have sensitive skin or allergies, ask for a patch test 24 to 48 hours before any chemical treatment.'),
  ('See recent work','Ask to see photos of recent work on customers with a similar hair type or skin tone to yours.'),
  ('Agree on the price first','Ask for a written or messaged price for the exact services, including any extras such as hair products or draping, so there are no surprises at the counter.'),
  ('Book early in wedding season','Salons and makeup artists fill up quickly on auspicious wedding dates. Book at least two to three weeks ahead for bridal or party makeup.')],
 faq=[('What should I ask before booking a salon?','Ask about the exact services and price, the brands used, whether tools are sterilised, and how long the service will take. For makeup, ask for a trial.'),
  ('How far ahead should I book for a wedding or festival?','For weddings, book two to three weeks ahead at minimum. For a regular haircut or facial, same-day or next-day is usually possible, but calling first saves a wasted trip.'),
  ('Is a patch test necessary?','Yes, if you have sensitive skin or are trying a new hair colour, bleach or face product. Do it a day or two before the service.'),
  ('How can I list my salon here?','Send your salon name, address, services and contact number through our contact page. We check details before publishing.')])

G['directory/bridal-makeup-in-paraspur.html'] = dict(
 title='Bridal Makeup Planning Guide for Paraspur Brides',
 paras=['Bridal makeup has to last through long ceremonies, heat, and photographs. A little planning avoids most problems on the wedding day.'],
 bullets=[('Book a trial 2 to 4 weeks ahead','A trial shows how the artist works with your skin tone and outfit, and leaves time to change the look. Bring a photo of your outfit and jewellery.'),
  ('Check skin compatibility','Tell the artist about allergies or sensitive skin. Do a patch test on the neck or behind the ear a few days before, not on the wedding morning.'),
  ('Confirm what the package includes','Ask whether hair styling, saree or dupatta draping, eye lenses, false lashes and touch-ups are included, and whether the artist travels to your home or venue.'),
  ('Plan the timeline','Bridal makeup usually takes two to three hours. Work backwards from the muhurat and add a buffer for travel and dressing.'),
  ('Get the booking in writing','Note the date, time, price, advance paid and cancellation terms in a message or receipt.')],
 faq=[('How early should I book a bridal makeup artist?','As soon as your wedding date is fixed, especially for popular wedding dates. Many artists take only one or two bridal bookings a day.'),
  ('Do I need a makeup trial?','A trial is strongly recommended. It lets you approve the look and check for skin reactions well before the wedding.'),
  ('What should I bring on the wedding day?','Your outfit, jewellery, dupatta and pins, and any skincare you normally use. Come with clean, moisturised skin and hair washed the previous day unless your artist advises otherwise.'),
  ('Can the artist come to my home?','Some do. Ask about travel charges and how early they need to start.')])

G['directory/best-ladies-boutique-in-paraspur.html'] = dict(
 title='Tips for Getting Clothes Stitched at a Boutique',
 paras=['A good stitching experience depends on clear communication. These tips help you get the fit you want and avoid delays, especially near weddings and festivals.'],
 bullets=[('Carry a reference','Bring a photo or a garment you like, and explain neckline, sleeve length and lining in detail.'),
  ('Get measurements taken carefully','Ask the tailor to note every measurement on a slip and give you a copy. Wear the innerwear you will wear with the outfit.'),
  ('Confirm the delivery date','Ask for a definite date and add a few days of buffer, particularly in the weeks before Diwali, Eid, or the wedding season.'),
  ('Ask about fitting and alterations','A trial fitting a few days before the deadline leaves time for adjustments. Ask whether minor alterations are free.'),
  ('Check fabric quantity','For heavy fabrics like lehenga or silk, confirm how much material is required so you do not fall short.')],
 faq=[('How long does stitching usually take?','Simple blouses and suits often take a few days to a week; heavy bridal work takes longer. Always confirm the date at booking.'),
  ('Should I pay an advance?','A small advance is common. Keep a receipt that notes the item, price and delivery date.'),
  ('Can I supply my own fabric?','Most boutiques and tailors accept customer fabric. Ask about lining and material charges separately.')])

G['directory/wedding-shopping-in-paraspur.html'] = dict(
 title='Wedding Shopping Checklist for Paraspur Families',
 paras=['Wedding shopping is easiest when it is planned in stages. Families in the Paraspur area usually combine local market purchases with trips to larger cities for specific items, so decide early what you will buy locally.'],
 bullets=[('Start 2 to 3 months ahead','Bridal outfits, jewellery and made-to-measure garments need the longest lead time. Buy readymade and accessory items last.'),
  ('Set a budget by category','Split the total into clothing, jewellery, gifts, décor and miscellaneous, and track spending in a simple list.'),
  ('Compare at least three shops','Compare price, fabric quality and return or exchange policy. Ask for a bill for every purchase.'),
  ('Check jewellery purity','For gold and silver, buy from a jeweller who gives a proper bill and shows hallmark details. Ask about buy-back and making charges.'),
  ('Plan tailoring time','Shop for fabric first, then give it for stitching with enough time for a fitting before the wedding.'),
  ('Keep a gifts list','Note who receives what to avoid duplication and last-minute purchases.')],
 faq=[('Which items should I buy first?','Bridal and groom outfits and jewellery, since they need fitting, alterations or ordering time.'),
  ('Is it better to shop locally or in a city?','Local shops save travel and make alterations easy. Larger cities offer wider choice. Many families do both.'),
  ('How do I avoid overpaying?','Compare prices, ask for itemised bills, and avoid buying everything at one shop without comparison.')])

G['directory/wedding-photographers-paraspur.html'] = dict(
 title='How to Hire a Wedding Photographer',
 paras=['Wedding photographs are the one thing you cannot redo, so hiring carefully matters more than saving a little on the price.'],
 bullets=[('Ask to see full albums','A few best photos are not enough. Ask to see complete albums from real weddings to judge consistency.'),
  ('Clarify the package','Confirm number of photographers, hours of coverage, video, drone, number of edited photos and album pages.'),
  ('Get a written agreement','Note date, venue, price, advance, delivery date and what happens if the photographer cannot attend.'),
  ('Ask about delivery format','Confirm whether you receive all photos or only selected ones, and in what format (pen drive, online gallery, printed album).'),
  ('Plan the shot list','Give the photographer a list of key family groups and rituals so nothing important is missed.')],
 faq=[('How early should I book?','Book as soon as the date is fixed, since popular dates fill quickly.'),
  ('How long does album delivery take?','It varies by studio and package, often several weeks. Agree the date in writing.'),
  ('Should I pay in full in advance?','No. Pay an advance to confirm the booking and the balance on delivery or as agreed in writing.')])

G['directory/businesses.html'] = dict(
 title='Shopping in Paraspur: A Practical Guide for Residents and Visitors',
 paras=['Paraspur is a market town that serves surrounding villages. Most daily needs, from groceries and medicines to mobile phones and clothing, are available in the main bazaar and nearby market areas. Use these tips to shop smartly.'],
 bullets=[('Ask for a bill','A proper bill helps with warranty claims on electronics and appliances and with returns for clothing.'),
  ('Check medicines carefully','Verify expiry dates and buy prescription medicines only against a valid prescription. Ask the pharmacist about generic alternatives.'),
  ('Compare before big purchases','For phones, appliances and furniture, compare prices in at least two shops and check the warranty terms.'),
  ('Confirm timings','Small shops may close on market holidays or for a midday break. Call ahead if you are travelling from a village.'),
  ('Support local, verify quality','Local traders often offer credit, repairs and personal service. Ask about repair and return policies before paying.')],
 faq=[('Which market days are busiest?','Markets are usually busiest around weekly bazaar days and before festivals and weddings. See our Paraspur Market guide for the weekly pattern.'),
  ('How can I add my shop to this directory?','Send your business name, address, category and contact number through our contact page.'),
  ('Do local shops accept UPI?','Many do, but not all. Ask before you shop, and keep some cash on hand.')])

G['directory/clothing-shops-paraspur.html'] = dict(
 title='Clothing Buying Tips for Paraspur Shoppers',
 paras=['Whether you are buying everyday wear or festival outfits, a few habits help you get better value and avoid returns.'],
 bullets=[('Check fabric and stitching','Look at seams, colour fastness and fabric weight. Rub a small area to see if colour transfers.'),
  ('Try before you buy','Always try garments, especially readymade suits and jackets, since sizes vary by brand.'),
  ('Ask about exchange policy','Confirm exchange terms before paying and keep the bill. Note that many shops do not exchange discounted or altered items.'),
  ('Buy ahead of festivals','Prices and crowds rise before Diwali, Eid and the wedding season. Shopping a week or two earlier is easier.'),
  ('Wash care','Read the care label. New dark or printed fabrics may need a first wash separately.')],
 faq=[('Can I get clothes altered at the shop?','Many shops and nearby tailors offer minor alterations. Ask the price and time before buying.'),
  ('How do I know the fabric is good?','Check the label for fibre content, feel the fabric, and compare with similar items in another shop.'),
  ('Should I bargain?','Polite bargaining is common in local markets, but branded and fixed-price items may not be negotiable.')])

G['directory/transport-services-paraspur.html'] = dict(
 title='Getting To and From Paraspur: Travel Tips',
 paras=['Paraspur is connected to Gonda and nearby towns by road. Most residents travel by bus, shared vehicles, or private cars and taxis. Schedules change often, so plan a little extra time for any journey.'],
 bullets=[('Confirm timings on the day','Bus and shared-vehicle timings can change with season, road conditions and festivals. Check with the bus stand or operator before you leave.'),
  ('Agree on fares first','For taxis and auto-rickshaws, agree the fare before starting. For longer trips, note the pick-up time and total charge.'),
  ('Keep emergency numbers handy','Dial 112 for police, 108 or 102 for an ambulance, and 1090 for the women helpline.'),
  ('Plan around rain and fog','During monsoon and winter fog, allow extra time, especially for early-morning or late-night travel to train stations.'),
  ('Travelling for trains','Reach the railway station well before departure and check the train status on the official Indian Railways channels.')],
 faq=[('How do I get to Gonda from Paraspur?','Buses and shared vehicles run on the road to Gonda. Check current timings at the bus stand.'),
  ('Are taxis available for weddings and events?','Local operators offer cars and vehicles on hire. Book early for wedding dates and confirm the rate in advance.'),
  ('How can I list my transport service?','Send your service details through our contact page.')])

G['directory/restaurants-paraspur.html'] = dict(
 title='Eating Out in Paraspur: Practical Tips',
 paras=['Eating options in Paraspur range from small local eateries to family restaurants. A few simple checks help you eat well and stay safe.'],
 bullets=[('Look for cleanliness','Check the kitchen area if visible, water quality and how food is stored. Busy places with fresh turnover are usually a safer choice.'),
  ('Ask for timings and menu','Many eateries have limited hours and menus that change through the day. Call ahead for group orders.'),
  ('Order for events in advance','For birthdays, small functions or catering, give at least a day or two of notice and confirm the price per plate.'),
  ('Check food licences','Registered food businesses display an FSSAI licence or registration number. You can verify it on the official FSSAI website.'),
  ('Dietary needs','Tell the staff about allergies or vegetarian requirements before ordering.')],
 faq=[('Are there vegetarian options?','Most local eateries serve vegetarian food. Ask staff about ingredients if you have strict dietary needs.'),
  ('Can I order for a party?','Many places accept advance orders. Confirm the menu, quantity, price and delivery or pick-up time.'),
  ('How do I check if a restaurant is licensed?','Look for the FSSAI licence number displayed in the shop and verify it on the FSSAI website.')])

G['directory/colleges.html'] = dict(
 title='How to Choose a College Near Paraspur',
 paras=['Choosing a college affects your studies and career for years. Use these checks before taking admission, particularly for professional courses.'],
 bullets=[('Check recognition and affiliation','Confirm the college is affiliated to a recognised university and, for professional courses such as nursing, pharmacy or teacher training, that the relevant council approval (for example the INC or NCTE) is valid for the year you join.'),
  ('Compare fees in writing','Ask for the full fee structure including exam, hostel and other charges, and keep receipts for every payment.'),
  ('Ask about scholarships','Eligible students can apply for government scholarships through the official Uttar Pradesh scholarship portal. Ask the college office about deadlines and documents.'),
  ('Visit the campus','Check classrooms, library, laboratories and the faculty available for your course.'),
  ('Understand placement claims','Ask for actual placement or pass-out data rather than general promises.')],
 faq=[('What documents are needed for admission?','Usually mark sheets, transfer or character certificate, caste or income certificate where applicable, Aadhaar and photographs. Check the college prospectus for the exact list.'),
  ('How do I verify a college is genuine?','Check the university website for its affiliated college list and, for professional courses, the regulator website for approval status.'),
  ('Are hostels available?','Ask each college directly, since availability and fees vary.')])

G['info/pin-code.html'] = dict(
 title='Using the Paraspur PIN Code 271504',
 paras=['A correct PIN code makes sure your letters, parcels and government documents reach you. The postal PIN code for Paraspur, Gonda is 271504.'],
 bullets=[('Write a complete address','Include house number or village name, post office, block (Paraspur), district (Gonda), state (Uttar Pradesh) and the PIN code 271504.'),
  ('Add a landmark','For villages and lanes without house numbers, a nearby landmark or school helps the delivery staff.'),
  ('Add a mobile number','Delivery staff and courier companies often call before delivering, so add a working mobile number.'),
  ('Track your parcel','Speed Post and registered mail can be tracked on the India Post website using the article number.'),
  ('Check your PIN','If you are unsure whether your village falls under 271504, ask at the local post office or use the India Post PIN search.')],
 faq=[('What is the PIN code of Paraspur, Gonda?','The PIN code is 271504.'),
  ('Do all villages of the block share the same PIN?','Many do, but some nearby areas may fall under other post offices. Confirm with your local post office.'),
  ('How can I track Speed Post?','Use the article number on the India Post website tracking page.')])

G['info/population.html'] = dict(
 title='How to Read Census Data for Paraspur',
 paras=['Census figures help planners, students and businesses understand a place. The most recent full Census in India was held in 2011, and later figures are estimates until the next Census is published.'],
 bullets=[('Understand the terms','Population is the total number of people. Sex ratio is the number of females per 1,000 males. Literacy rate is the share of people aged seven and above who can read and write.'),
  ('Village versus block','Census data is published at village, sub-district (tehsil or block) and district level. Figures for one village do not represent the whole block.'),
  ('Use official sources','The Census of India website publishes the Primary Census Abstract for every village and town. Use it to confirm any number you see quoted elsewhere.'),
  ('Remember the date','Figures from 2011 do not reflect migration, births and growth since then, so treat them as a baseline.'),
  ('Use it for planning','Businesses, schools and health services use population and literacy data to decide where to open and what to offer.')],
 faq=[('When was the last Census?','The last full Census in India was conducted in 2011.'),
  ('Where can I find official village-level data?','On the Census of India website under the Primary Census Abstract for Uttar Pradesh, Gonda district.'),
  ('Why do numbers differ between websites?','Some sites use estimates or mix different years. Always check the year and source.')])

G['agriculture/seeds-gonda.html'] = dict(
 title='Buying Quality Seeds: A Farmer Checklist',
 paras=['Good seed is the cheapest way to improve yield. Buying carefully protects you from poor germination and fake products.'],
 bullets=[('Buy from authorised sellers','Purchase from government seed centres, Kisan Seva Kendras and licensed dealers, and always take a pucca bill.'),
  ('Read the tag and packet','Check crop variety, lot number, germination percentage, date of testing and expiry. Certified seed carries an official tag. Keep the tag and empty packet until harvest.'),
  ('Match the variety to the season','Choose varieties recommended for your area and sowing time, for example paddy for Kharif and wheat or mustard for Rabi.'),
  ('Test germination if unsure','Place 100 seeds in damp cloth for a few days and count how many sprout. Low germination means you need a higher seed rate or a new lot.'),
  ('Use soil health guidance','Get your soil tested through the Soil Health Card scheme and follow the fertiliser advice for your crop.'),
  ('Ask the Krishi Vigyan Kendra','The KVK in Gonda gives free advice on varieties, pests and sowing dates.')],
 faq=[('When is the right time to buy seeds?','Buy a few weeks before sowing, so you can check quality and return or replace poor lots.'),
  ('What should I do if seed fails to germinate?','Keep the bill, tag and packet, and report it to the seller and to the district agriculture office.'),
  ('Is certified seed worth the price?','Certified seed is tested for purity and germination and usually gives more reliable results than untested seed.')])


def section(g):
    h = '\n  <section id="local-guide" class="container mx-auto px-4 pb-20">\n    <div class="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 md:p-10 shadow-sm">\n'
    h += f'      <h2 class="text-2xl md:text-3xl font-display font-black text-slate-900 mb-4">{html.escape(g["title"])}</h2>\n'
    for p in g['paras']:
        h += f'      <p class="text-slate-600 leading-relaxed mb-6">{html.escape(p)}</p>\n'
    h += '      <ul class="space-y-4 mb-10">\n'
    for t, d in g['bullets']:
        h += f'        <li class="text-slate-600 leading-relaxed"><strong class="text-slate-900">{html.escape(t)}.</strong> {html.escape(d)}</li>\n'
    h += '      </ul>\n      <h3 class="text-xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h3>\n      <div class="space-y-5">\n'
    for q, a in g['faq']:
        h += f'        <div><h4 class="font-bold text-slate-800">{html.escape(q)}</h4><p class="text-slate-600 mt-1 leading-relaxed">{html.escape(a)}</p></div>\n'
    h += '      </div>\n      ' + CONTACT + '\n    </div>\n  </section>\n'
    return h


def schema(g):
    d = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in g['faq']]}
    return '  <script type="application/ld+json">' + json.dumps(d, ensure_ascii=False) + '</script>\n'


for f, g in G.items():
    s = open(f, encoding='utf-8').read()
    if 'id="local-guide"' in s:
        print('skip', f); continue
    if '</main>' not in s: print('NO MAIN', f); continue
    s = s.replace('</main>', section(g) + '</main>', 1)
    s = s.replace('</head>', schema(g) + '</head>', 1)
    open(f, 'w', encoding='utf-8').write(s)
    print('ok', f)
