// Bestellingen en contactberichten gaan via Web3Forms naar jouw e-mail.
const ACCESS_KEY = '0d596b69-24f3-43f5-bf0f-8e7c42631205'
// Bijlagen kan Web3Forms alleen in een betaald plan versturen.
export const ATTACHMENTS_ENABLED = false

// EmailJS: automatische bevestiging naar de klant
const EMAILJS = { service: 'service_l7rsd3a', template: 'template_64az85s', key: 'a_xmG63wB973mAhnR' }

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

const submitOrderMail = (o) =>
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

async function sendConfirmation(o) {
  if (EMAILJS.key.startsWith('JOUW')) return
  try {
    await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: EMAILJS.service, template_id: EMAILJS.template, user_id: EMAILJS.key,
        template_params: { to_name: o.name, to_email: o.email, pakket: o.packageName, prijs: `€${o.price}`, bedrijf: o.company, afbeelding: o.image ? o.image.name : '' },
      }),
    })
  } catch (e) { console.error(e) }
}

export async function submitOrder(o) {
  const res = await submitOrderMail(o)
  sendConfirmation(o) // mislukt dit, dan blijft je bestelling toch gelukt
  return res
}
   }
