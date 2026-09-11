import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { createPortal } from 'react-dom';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [open]);

  const canUseDOM = typeof document !== 'undefined';

  const menuOverlay = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 w-screen h-screen bg-white z-[1000] overflow-y-auto"
    >
      <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border-subtle)]">
        <span className="flex items-center gap-2">
          <img src="/navbar-icon.png" alt="Sreedevigeotech" className="h-9 w-9 rounded-full" />
          <span className="font-display text-lg tracking-[0.2em]">SREEDEVIGEOTECH</span>
        </span>
        <button
          className="p-2 text-gold"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          data-cursor="link"
        >
          <X size={24} />
        </button>
      </div>
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
        className="flex flex-col items-center gap-6 py-10"
      >
        {navLinks.map((link) => (
          <motion.div
            key={link.label}
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
          >
            <NavLink
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-2xl font-condensed uppercase tracking-[0.3em] ${
                  isActive ? 'text-gold' : 'text-[var(--text-primary)]'
                }`
              }
            >
              {link.label}
            </NavLink>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        scrolled
          ? 'bg-[rgba(247,248,250,0.96)] backdrop-blur border-b border-[var(--border-subtle)]'
          : 'bg-[rgba(247,248,250,0.96)] backdrop-blur border-b border-[var(--border-subtle)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3" data-cursor="link">
          <img src="/navbar-icon.png" alt="Sreedevigeotech" className="h-10 w-10 rounded-full" />
          <span className="flex flex-col">
            <span className="font-display text-xl tracking-[0.15em]">SREEDEVIGEOTECH</span>
            <span className="h-[2px] w-16 bg-gold mt-1" />
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `relative font-condensed uppercase tracking-[0.25em] text-xs transition-colors ${
                  isActive ? 'text-gold' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                } after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-full after:bg-gold after:scale-x-0 after:origin-left after:transition-transform ${
                  isActive ? 'after:scale-x-100' : 'hover:after:scale-x-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          className="lg:hidden p-2 text-gold"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Open menu"
          aria-expanded={open}
          data-cursor="link"
        >
          <Menu size={24} />
        </button>
      </div>
      {open && canUseDOM ? createPortal(menuOverlay, document.body) : null}
    </header>
  );
}
