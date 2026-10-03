// Bestellingen en contactberichten worden via Web3Forms naar jouw e-mail gestuurd.
// 1) Vraag op https://web3forms.com een gratis access key aan voor elias.esgt@gmail.com
// 2) Plak die key hieronder. (Deze key is bedoeld om publiek in de site te staan.)
const ACCESS_KEY = '29e67bd3-c19b-4bb2-979c-439cae5d4e16'
// Bijlagen (de reclame-afbeelding) kan Web3Forms alleen in een betaald plan versturen.
// Heb je dat, zet dit dan op true.
export const ATTACHMENTS_ENABLED = false

const ENDPOINT = 'https://api.web3forms.com/submit'
export const isBackendConfigured = () => Boolean(ACCESS_KEY) && !ACCESS_KEY.startsWith('PLAK')

async function send(fields, file) {
  if (!isBackendConfigured()) throw new Error('NO_BACKEND')
  const fd = new FormData()
  fd.append('access_key', ACCESS_KEY)
  Object.entries(fields).forEach(([k, v]) => v && fd.append(k, v))
  if (file && ATTACHMENTS_ENABLED) fd.append('attachment', file)
  const res = await fetch(ENDPOINT, { method: 'POST', body: fd })
  const json = await res.json().catch(() => ({}))
  if (!res.ok || !json.success) throw new Error(json.message || 'Server error')
  return json
}

export const submitOrder = (o) =>
  send({
    subject: `Nieuwe ESGT-bestelling: ${o.packageName} (${o.company})`,
    from_name: 'ESGT website',
    name: o.name, email: o.email, bedrijf: o.company, telefoon: o.phone, website_social: o.link,
    pakket: o.packageName, aantal_advertenties: o.ads, prijs: `€${o.price}`, extra_info: o.note,
    afbeelding: o.image ? `${o.image.name} (${Math.round(o.image.size / 1024)} KB) - ${ATTACHMENTS_ENABLED ? 'bijgevoegd' : 'NIET bijgevoegd, vraag de klant de afbeelding te mailen'}` : '',
    betaling: 'Nog niet betaald (er is geen betaalprovider gekoppeld)',
  }, o.image)

export const sendContact = (d) =>
  send({ subject: `ESGT contactformulier: ${d.name}`, from_name: 'ESGT website', name: d.name, email: d.email, message: d.msg })
  //What the sigma
  
