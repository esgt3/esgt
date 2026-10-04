import { useEffect, useRef, useState } from 'react'
import Logo from './Logo.jsx'
import { PACKAGES, FEATURES, euro, EMAIL_RE, ADS, CATS, BENEFITS, FAQ } from './lib/data.js'
import { submitOrder, sendContact, ATTACHMENTS_ENABLED } from './lib/api.js'

const NAV = [['home', 'Home'], ['advertenties', 'Advertenties'], ['prijzen', 'Prijzen'], ['hoe', 'Hoe werkt het?'], ['contact', 'Contact']]
const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

function Navbar({ onBuy }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="nav">
      <a className="brand" href="#home" onClick={(e) => { e.preventDefault(); go('home') }}><Logo /><span>ESGT</span></a>
      <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>☰</button>
      <nav className={open ? 'open' : ''} aria-label="Hoofdmenu">
        {NAV.map(([id, l]) => <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); setOpen(false); go(id) }}>{l}</a>)}
        <button className="btn primary sm" onClick={() => { setOpen(false); onBuy() }}>Koop reclame</button>
      </nav>
    </header>
  )
}

const Hero = () => (
  <section id="home" className="hero">
    <div>
      <h1>Laat jouw reclame gezien worden.</h1>
      <p>Promoot jouw bedrijf, merk of project met ESGT en bereik een groter publiek.</p>
      <div className="row"><button className="btn primary" onClick={() => go('prijzen')}>Bekijk pakketten</button><button className="btn ghost" onClick={() => go('hoe')}>Hoe werkt het?</button></div>
    </div>
    <div className="logo-wrap"><div className="glow" /><Logo label="ESGT logo" /></div>
  </section>
)

function Ads() {
  const [cat, setCat] = useState('Alles')
  const list = cat === 'Alles' ? ADS : ADS.filter((a) => a.cat === cat)
  return (
    <section id="advertenties" className="sec">
      <h2>Advertenties</h2><p className="lead">   Dit zijn voorbeeldadvertenties, geen echte bedrijven. Zo kan jouw reclame eruitzien.</p>
      <div className="tabs" role="group" aria-label="Filter op categorie">{CATS.map((c) => <button key={c} aria-pressed={c === cat} onClick={() => setCat(c)}>{c}</button>)}</div>
      <div className="grid ads">
        {list.map((a) => (
          <article key={a.company} className="card ad">
            <div className="ad-img" style={{ background: `linear-gradient(135deg,hsl(${a.hue} 80% 55%),hsl(${a.hue + 50} 70% 25%))` }} role="img" aria-label={`Voorbeeldafbeelding ${a.company}`}>   {a.videoFile ? <video src={a.videoFile} controls muted playsInline preload="metadata" /> : <b>Ad</b>}<span className="tag">Voorbeeld</span></div>
            <h3>{a.company}</h3><p>{a.text}</p>
               {a.link && <a href={a.link} target="_blank" rel="noopener noreferrer">Bezoek website</a>}
          </article>
        ))}
      </div>
    </section>
  )
}

const Why = () => (
  <section className="sec"><h2>Waarom ESGT?</h2>
    <div className="grid price">{BENEFITS.map(([t, d]) => <div className="card" key={t}><h3>{t}</h3><p className="mut">{d}</p></div>)}</div>
  </section>
)

const Faq = () => (
  <section id="faq" className="sec narrow"><h2>Veelgestelde vragen</h2>
    {FAQ.map(([q, a]) => <details key={q} className="card faq"><summary>{q}</summary><p>{a}</p></details>)}
  </section>
)

const Cta = ({ onBuy }) => (
  <section className="sec"><div className="cta"><h2>Klaar om op te vallen?</h2><p>Kies een pakket en stuur je reclame in.</p><button className="btn primary" onClick={() => onBuy()}>Koop reclame</button></div></section>
)

const Pricing = ({ onBuy }) => (
  <section id="prijzen" className="sec">
    <h2>Prijzen</h2><p className="lead">Kies het pakket dat bij jou past. Eenmalige prijs, per pakket.</p>
    <div className="grid price">
      {PACKAGES.map((p) => (
        <article key={p.id} className={`card plan ${p.featured ? 'featured' : ''}`}>
          {p.featured && <span className="badge">Meest gekozen</span>}
          <h3>{p.name}</h3><div className="amount">{euro(p.price)}</div>
          <ul>{FEATURES(p.count).map((f) => <li key={f}>{f}</li>)}</ul>
          <button className={`btn ${p.featured ? 'primary' : 'ghost'}`} onClick={() => onBuy(p.id)}>Kies dit pakket</button>
        </article>
      ))}
    </div>
  </section>
)

const How = () => (
  <section id="hoe" className="sec">
    <h2>Hoe werkt het?</h2>
    <ol className="grid steps">
      {[['Kies je pakket', 'Selecteer 1, 2 of 3 advertenties.'], ['Upload je reclame', 'Stuur je afbeelding en gegevens in.'], ['ESGT verwerkt en toont je reclame', 'Wij zorgen voor een professionele weergave.']].map(([t, d], i) => (
        <li key={t} className="card step"><span className="num">{i + 1}</span><h3>{t}</h3><p>{d}</p></li>
      ))}
    </ol>
  </section>
)

function Field({ label, error, children, id }) {
  return <div className="field"><label htmlFor={id}>{label}</label>{children}{error && <p className="err" id={`${id}-e`} role="alert">{error}</p>}</div>
}

function Contact() {
  const [f, setF] = useState({ name: '', email: '', msg: '' })
  const [e, setE] = useState({}), [status, setStatus] = useState(null)
  const set = (k) => (ev) => setF({ ...f, [k]: ev.target.value })
  async function submit(ev) {
    ev.preventDefault()
    const er = {}
    if (!f.name.trim()) er.name = 'Vul je naam in.'
    if (!EMAIL_RE.test(f.email)) er.email = 'Vul een geldig e-mailadres in.'
    if (f.msg.trim().length < 5) er.msg = 'Schrijf een bericht (minstens 5 tekens).'
    setE(er); if (Object.keys(er).length) return
    try { await sendContact(f); setStatus('ok'); setF({ name: '', email: '', msg: '' }) }
    catch (x) { setStatus(x.message === 'NO_BACKEND' ? 'nobackend' : 'fail') }
  }
  return (
    <section id="contact" className="sec">
      <h2>Contact</h2>
      <div className="grid contact">
          <div className="card"><h3>Neem contact op</h3><p>E-mail: <a href="mailto:elias.esgt@gmail.com">elias.esgt@gmail.com</a></p>
     <p className="socials"><a href="https://www.instagram.com/elias.esgt" target="_blank" rel="noopener noreferrer">Instagram</a></p></div>
        <form className="card" onSubmit={submit} noValidate>
          <Field id="c-name" label="Naam" error={e.name}><input id="c-name" value={f.name} onChange={set('name')} aria-invalid={!!e.name} /></Field>
          <Field id="c-email" label="E-mailadres" error={e.email}><input id="c-email" type="email" value={f.email} onChange={set('email')} aria-invalid={!!e.email} /></Field>
          <Field id="c-msg" label="Bericht" error={e.msg}><textarea id="c-msg" rows="4" value={f.msg} onChange={set('msg')} aria-invalid={!!e.msg} /></Field>
          <button className="btn primary">Verstuur bericht</button>
          {status === 'ok' && <p className="ok" role="status">Bedankt, je bericht is verzonden.</p>}
          {status === 'nobackend' && <p className="err" role="alert">Je bericht is nog niet verzonden: er is nog geen backend gekoppeld.</p>}
          {status === 'fail' && <p className="err" role="alert">Verzenden mislukt. Probeer het later opnieuw.</p>}
        </form>
      </div>
    </section>
  )
}

function Modal({ title, onClose, children }) {
  const ref = useRef()
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', k); document.body.style.overflow = 'hidden'; ref.current?.focus()
    return () => { document.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [onClose])
  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={title} tabIndex={-1} ref={ref}>
        <button className="x" aria-label="Sluiten" onClick={onClose}>×</button><h2>{title}</h2>{children}
      </div>
    </div>
  )
}

function Order({ initial, onClose }) {
  const [v, setV] = useState({ name: '', company: '', email: '', phone: '', link: '', pkg: initial || 3, note: '' })
  const [file, setFile] = useState(null), [preview, setPreview] = useState(null)
  const [e, setE] = useState({}), [step, setStep] = useState('form'), [res, setRes] = useState(null)
  const set = (k) => (ev) => setV({ ...v, [k]: ev.target.value })
  const pkg = PACKAGES.find((p) => p.id === Number(v.pkg))
  useEffect(() => () => preview && URL.revokeObjectURL(preview), [preview])
  function pick(ev) {
    const fl = ev.target.files[0]; if (!fl) return
    if (!fl.type.startsWith('image/')) return setE({ ...e, file: 'Kies een afbeeldingsbestand (PNG, JPG, WebP).' })
    if (fl.size > 5 * 1024 * 1024) return setE({ ...e, file: 'De afbeelding is groter dan 5 MB.' })
    setE({ ...e, file: null }); setFile(fl); setPreview(URL.createObjectURL(fl))
  }
  function review(ev) {
    ev.preventDefault(); const er = {}
    if (!v.name.trim()) er.name = 'Vul je naam in.'
    if (!v.company.trim()) er.company = 'Vul je bedrijfsnaam in.'
    if (!EMAIL_RE.test(v.email)) er.email = 'Vul een geldig e-mailadres in.'
    if (!file) er.file = 'Upload je reclame-afbeelding.'
    setE(er); if (!Object.keys(er).length) setStep('review')
  }
  async function send() {
    setStep('sending')
    try { setRes(await submitOrder({ ...v, packageName: pkg.name, ads: pkg.count, price: pkg.price, image: file })); setStep('done') }
    catch (x) { setRes(x.message); setStep('error') }
  }
  if (step === 'done') return <Modal title="Bestelling ontvangen" onClose={onClose}><p>Bedankt! We nemen contact met je op via {v.email}.</p>{!ATTACHMENTS_ENABLED && <p>Let op: je afbeelding is nog niet meegestuurd. We vragen je er per e-mail om.</p>}<button className="btn primary" onClick={onClose}>Sluiten</button></Modal>
  if (step === 'review' || step === 'sending' || step === 'error') return (
    <Modal title="Overzicht" onClose={onClose}>
      <dl className="sum">
        <dt>Pakket</dt><dd>{pkg.name}</dd><dt>Aantal advertenties</dt><dd>{pkg.count}</dd><dt>Prijs</dt><dd>{euro(pkg.price)}</dd>
        <dt>Naam</dt><dd>{v.name}</dd><dt>Bedrijf</dt><dd>{v.company}</dd><dt>E-mail</dt><dd>{v.email}</dd>
        {v.phone && <><dt>Telefoon</dt><dd>{v.phone}</dd></>}{v.link && <><dt>Website/social</dt><dd>{v.link}</dd></>}{v.note && <><dt>Extra info</dt><dd>{v.note}</dd></>}
      </dl>
      {preview && <img className="thumb" src={preview} alt="Voorbeeld van je reclame" />}
      {step === 'error' && <p className="err" role="alert">{res === 'NO_BACKEND' ? 'Je bestelling is niet verzonden en er is niets betaald: er is nog geen backend of betaalprovider gekoppeld (zie src/lib/api.js).' : 'Verzenden mislukt. Probeer het opnieuw.'}</p>}
      <div className="row"><button className="btn ghost" onClick={() => setStep('form')}>Terug</button><button className="btn primary" disabled={step === 'sending'} onClick={send}>{step === 'sending' ? 'Versturen…' : 'Bestelling versturen'}</button></div>
    </Modal>
  )
  return (
    <Modal title="Bestel je advertentiepakket" onClose={onClose}>
      <form onSubmit={review} noValidate className="orderform">
        <Field id="o-pkg" label="Pakket"><select id="o-pkg" value={v.pkg} onChange={set('pkg')}>{PACKAGES.map((p) => <option key={p.id} value={p.id}>{p.name} – {euro(p.price)}</option>)}</select></Field>
        <Field id="o-name" label="Naam *" error={e.name}><input id="o-name" value={v.name} onChange={set('name')} autoComplete="name" aria-invalid={!!e.name} /></Field>
        <Field id="o-company" label="Bedrijfsnaam *" error={e.company}><input id="o-company" value={v.company} onChange={set('company')} autoComplete="organization" aria-invalid={!!e.company} /></Field>
        <Field id="o-email" label="E-mailadres *" error={e.email}><input id="o-email" type="email" value={v.email} onChange={set('email')} autoComplete="email" aria-invalid={!!e.email} /></Field>
        <Field id="o-phone" label="Telefoonnummer (optioneel)"><input id="o-phone" type="tel" value={v.phone} onChange={set('phone')} autoComplete="tel" /></Field>
        <Field id="o-link" label="Website/social media (optioneel)"><input id="o-link" value={v.link} onChange={set('link')} /></Field>
        <Field id="o-file" label="Reclame-afbeelding * (max 5 MB)" error={e.file}><input id="o-file" type="file" accept="image/*" onChange={pick} aria-invalid={!!e.file} /></Field>
        {preview && <img className="thumb" src={preview} alt="Voorbeeld van je reclame" />}
        <Field id="o-note" label="Extra informatie (optioneel)"><textarea id="o-note" rows="3" value={v.note} onChange={set('note')} /></Field>
        <button className="btn primary">Naar overzicht</button>
      </form>
    </Modal>
  )
}

const LEGAL = {
  'Algemene voorwaarden': 'Hier komen de algemene voorwaarden van ESGT. Vervang deze placeholder door de definitieve tekst.',
  'Privacybeleid': 'Hier komt het privacybeleid van ESGT. Vervang deze placeholder door de definitieve tekst.',
}

export default function App() {
  const [order, setOrder] = useState(null), [legal, setLegal] = useState(null)
  const buy = (id) => setOrder({ id: typeof id === 'number' ? id : 3 })
  return (
    <>
      <Navbar onBuy={buy} />
      <main><Hero /><Why /><Ads /><Pricing onBuy={buy} /><How /><Faq /><Cta onBuy={buy} /><Contact /></main>
      <footer className="foot">
        <div className="brand"><Logo label="ESGT logo" /><span>ESGT</span></div>
        <p>© 2026 ESGT. Alle rechten voorbehouden.</p>
        <nav aria-label="Footer"><button onClick={() => setLegal('Algemene voorwaarden')}>Algemene voorwaarden</button><button onClick={() => setLegal('Privacybeleid')}>Privacybeleid</button><button onClick={() => go('contact')}>Contact</button></nav>
      </footer>
      {order && <Order initial={order.id} onClose={() => setOrder(null)} />}
      {legal && <Modal title={legal} onClose={() => setLegal(null)}><p>{LEGAL[legal]}</p></Modal>}
    </>
  )
}
