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
  { company: 'Voorbeeld: webdesign', text: 'Hier komt jouw korte beschrijving. Vertel in een of twee zinnen wat je doet.', hue: 200, cat: 'Design', videoFile: '/webdesign.mp4.mp4' },
  { company: 'Voorbeeld: lokale winkel', text: 'Zo kan jouw reclame eruitzien, met een afbeelding, naam en tekst.', hue: 260, cat: 'Lokaal', videoFile: '/lokale winkel.mp4' },
  { company: 'Voorbeeld: horecazaak', text: 'Jouw reclame komt op een nette kaart te staan.', hue: 160, cat: 'Lokaal' },
  { company: 'Voorbeeld: creatief bureau', text: 'Hier kan ook jouw bedrijf of project staan.', hue: 310, cat: 'Design' },
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
  ['Hoe snel wordt mijn reclame getoond?', 'Het zou ongeveer een week duren om een reclame te maken.'],
  ['Hoe betaal ik?', 'Online betalen is nog niet actief. Zodra Mollie of Stripe is gekoppeld, reken je af na je bestelling.'],
  ['Kan ik mijn reclame later wijzigen?', 'U kunt uw reclame altijd laten wijzigen, jammer genoeg gaat u dan wel moeten bijbetalen'],
]
