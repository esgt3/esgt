export const PACKAGES = [
  { id: 1, name: '1 Advertentie', count: 1, price: 50 },
  { id: 2, name: '2 Advertenties', count: 2, price: 100 },
  { id: 3, name: '3 Advertenties', count: 3, price: 175, featured: true },
]
export const FEATURES = (n) => [`${n} reclameplaatsing${n > 1 ? 'en' : ''}`, 'Professionele weergave', 'Eenvoudig insturen']
export const euro = (n) => `€${n}`
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
// Voorbeeldadvertenties (placeholders, vervang door echte data uit een API)
export const ADS = [
  { company: 'Studio Nova', text: 'Branding en webdesign voor ambitieuze starters.', link: 'https://example.com', hue: 200, cat: 'Design' },
  { company: 'Fietsatelier Mol', text: 'Maatwerk en herstellingen voor elke fiets.', link: 'https://example.com', hue: 260, cat: 'Lokaal' },
  { company: 'Brew & Bloom', text: 'Specialty koffie en verse bloemen onder één dak.', link: 'https://example.com', hue: 160, cat: 'Lokaal' },
  { company: 'Pixel Pulse', text: 'Videoproductie en social content die opvalt.', link: 'https://example.com', hue: 310, cat: 'Design' },
]
export const CATS = ['Alles', 'Design', 'Lokaal']
export const BENEFITS = [
  ['Duidelijke prijzen', 'Een vaste prijs per pakket, zonder verborgen kosten.'],
  ['Eenvoudig insturen', 'Upload je afbeelding en gegevens in een paar minuten.'],
  ['Professionele weergave', 'Jouw reclame krijgt een nette kaart met naam, tekst en link.'],
]
// Pas deze antwoorden aan naar jouw situatie
export const FAQ = [
  ['Welke afbeeldingen kan ik uploaden?', 'PNG, JPG of WebP tot 5 MB.'],
  ['Hoe snel wordt mijn reclame getoond?', 'Dit antwoord vul je zelf in (src/lib/data.js).'],
  ['Hoe betaal ik?', 'Online betalen is nog niet actief. Zodra Mollie of Stripe is gekoppeld, reken je af na je bestelling.'],
  ['Kan ik mijn reclame later wijzigen?', 'Dit antwoord vul je zelf in (src/lib/data.js).'],
]