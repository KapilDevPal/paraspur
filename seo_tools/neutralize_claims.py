"""Replace unverifiable superlatives on listing pages with neutral, factual wording."""
import re
R = {
 'directory/best-ladies-boutique-in-paraspur.html': [
  ('>Top Rated<', '>Boutique<'),
  ("A premium destination for designer women's wear, known for exquisite tailoring and a vast collection of the latest ethnic trends.",
   "A boutique in Paraspur offering women's ethnic wear and tailoring. Ask to see recent work and fabric options before placing an order."),
 ],
 'directory/businesses.html': [
  ('Reliable local service for prescription meds.', 'Local pharmacy for prescription medicines. Call ahead to confirm stock and delivery.')],
 'directory/best-beauty-parlour-in-paraspur.html': [
  ('>Top Rated<', '>Salon & Makeup<'),
  ('Highly rated studio in Paraspur offering expert hair styling, professional skin treatments, and stunning party makeup.',
   'A studio in Paraspur offering hair styling, skin treatments and party makeup. See its dedicated page for details.'),
  ('A trusted local choice for haircuts, waxing, facials, and grooming services. Known for hygienic practices and friendly staff.',
   'A salon in Paraspur Market offering haircuts, waxing, facials and grooming services. Check hygiene practices in person before booking.')],
 'directory/bridal-makeup-in-paraspur.html': [
  ('>Top Rated<', '>Bridal Makeup<'),
  ('Known for their aesthetic sense and high-quality products, MLB Makeup Zone provides comprehensive bridal packages including hair and draping.',
   'MLB Makeup Zone offers bridal makeup packages that include hair and saree draping. Ask what products are used and request a trial before the wedding.')],
 'directory/wedding-photographers-paraspur.html': [
  ('A long-standing photo studio in Paraspur known for its digital photo mixing, traditional wedding shots, and quick delivery.',
   'A photo studio in Paraspur offering digital photo editing and traditional wedding photography. Confirm delivery time and album format in writing.')],
 'directory/wedding-shopping-in-paraspur.html': [
  ('>Best for Sarees<', '>Sarees & Suits<'), ('>Top Selection<', '>Bridal Wear<'),
  ('A well-designed shop offering a premium collection of wedding sarees, suits, and ethnic wear. Known for its curated selection and excellent customer service.',
   'A shop in the Main Market area offering wedding sarees, suits and ethnic wear.'),
  ('A staple for wedding shopping in the area, Saree Sansar is famous for its wide variety of traditional bridal wear and latest fashion trends.',
   'Saree Sansar sells bridal lehengas, sarees and fancy wear. Compare it with two or three other shops before you decide.')],
 'directory/restaurants-paraspur.html': [
  ('>Top Rated<', '>Restaurant<'),
  ('Highly rated for its delicious food and fair pricing. A perfect spot for family dinners and local celebrations.',
   'A restaurant in Paraspur suitable for family meals. Call ahead for timings, menu and group bookings.'),
  ('Known for: Dal Makhani, Paneer Tikka, Fresh Salad', 'Menu items include: Dal Makhani, Paneer Tikka, Fresh Salad'),
  ('Famous for local sweets and morning breakfast (Poori Sabzi).', 'Sells local sweets and morning breakfast such as Poori Sabzi.')],
 'directory/transport-services-paraspur.html': [
  ('Daily bus services between Paraspur and Gonda. Known for punctual arrivals and comfortable seating.',
   'Bus services run between Paraspur and Gonda. Timings change, so check with the bus stand or operator on the day of travel.')],
}
for f, pairs in R.items():
    s = open(f, encoding='utf-8').read()
    for a, b in pairs:
        if a not in s: print('MISSING', f, a[:40])
        s = s.replace(a, b)
    open(f, 'w', encoding='utf-8').write(s)
