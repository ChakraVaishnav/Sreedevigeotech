import { Link } from 'react-router-dom';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
];

const services = [
  'Geo-technical Investigation',
  'Laboratory Testing',
  'Topographical and Contour',
  'Geo-physical Investigations',
  'Hydrographic Survey',
  'Pile Foundation',
];

export default function Footer() {
  return (
    <footer className="relative bg-[var(--bg-secondary)] border-t border-[rgba(31,111,120,0.35)] mt-16">
      <div className="absolute inset-0 opacity-30 bg-grid" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-6 py-14 grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <h3 className="font-display text-2xl">SREEDEVIGEOTECH</h3>
          <p className="mt-4 text-[var(--text-secondary)] max-w-sm">
            Precision geotechnical engineering and subsurface intelligence for infrastructure, energy, and
            urban development projects across India.
          </p>
          <div className="mt-6 text-sm text-[var(--text-secondary)] space-y-2">
            <p>Phone: +91 90000 00000</p>
            <p>Email: info@sreedevigeotech.com</p>
            <p>Address: Hyderabad, Telangana, India</p>
          </div>
        </div>
        <div>
          <h4 className="font-condensed uppercase tracking-[0.2em] text-sm text-gold">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-[var(--text-secondary)]">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="hover:text-gold" data-cursor="link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-condensed uppercase tracking-[0.2em] text-sm text-gold">Services</h4>
          <ul className="mt-4 space-y-2 text-[var(--text-secondary)]">
            {services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--border-subtle)] py-4 text-center text-xs text-[var(--text-secondary)]">
        Copyright 2026 Sreedevigeotech. All rights reserved.
      </div>
    </footer>
  );
}
