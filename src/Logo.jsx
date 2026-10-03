   export default function Logo({ label, ...props }) {
     return <img src="/logo.png" alt={label || ''} {...props} />
   }
