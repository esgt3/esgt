// Logo als code: geen los bestand nodig. Vervang later door <img src="/logo.png" /> als je het echte logo in de map "public" zet.
export default function Logo({ label, ...props }) {
  return (
    <svg viewBox="0 0 288 288" xmlns="http://www.w3.org/2000/svg" role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} {...props}>
      <defs>
        <linearGradient id="lg-blob" x1="0.1" y1="0" x2="0.9" y2="1"><stop offset="0" stopColor="#5ad7ff" /><stop offset=".5" stopColor="#8f8cff" /><stop offset="1" stopColor="#ff7ad9" /></linearGradient>
        <linearGradient id="lg-chrome" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset=".5" stopColor="#b9bfd0" /><stop offset="1" stopColor="#e9ecf5" /></linearGradient>
        <radialGradient id="lg-halo" cx=".62" cy=".3" r=".6"><stop offset="0" stopColor="#7a6bff" stopOpacity=".45" /><stop offset="1" stopColor="#05060b" stopOpacity="0" /></radialGradient>
        <filter id="lg-soft"><feGaussianBlur stdDeviation="14" /></filter>
      </defs>
      <rect width="288" height="288" rx="40" fill="#05060b" />
      <rect width="288" height="288" rx="40" fill="url(#lg-halo)" />
      <path d="M150 40c26-22 62-6 64 26 1 18-8 30-22 42-12 11-8 28-26 34-20 7-40-6-44-26-3-15 4-24 10-36 6-14 0-28 18-40z" fill="url(#lg-blob)" filter="url(#lg-soft)" opacity=".55" />
      <path d="M150 42c24-20 58-6 60 24 1 17-8 28-21 39-11 10-8 26-24 32-19 6-38-6-41-24-3-14 3-23 9-34 6-13 0-27 17-37z" fill="url(#lg-blob)" />
      <circle cx="214" cy="48" r="5" fill="#5ad7ff" /><circle cx="226" cy="64" r="3" fill="#8f8cff" /><circle cx="168" cy="36" r="3.5" fill="#ff7ad9" />
      <g fontFamily="'Arial Rounded MT Bold','Trebuchet MS',Arial,sans-serif" fontWeight="900" fill="url(#lg-chrome)" stroke="#05060b" strokeWidth="3" paintOrder="stroke">
        <text x="52" y="116" fontSize="82" transform="rotate(-8 52 116)">E</text>
        <text x="124" y="136" fontSize="76" fill="#ffffff">S</text>
        <text x="46" y="236" fontSize="82" transform="rotate(-6 46 236)">G</text>
        <text x="156" y="236" fontSize="82" transform="rotate(8 156 236)">T</text>
      </g>
    </svg>
  )
}
 