import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  {
    label: 'Services', path: '/services',
    children: [
      { label: 'Portfolio Management', path: '/services#portfolio' },
      { label: 'Unit Trust', path: '/services#unit-trust' },
      { label: 'Pension Funds', path: '/services#pension' },
      { label: 'Education Fund', path: '/services#education' },
    ]
  },
  { label: 'About', path: '/about' },
  { label: 'Insights', path: '/insights' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const isHome = location.pathname === '/';
  const navBg = scrolled || !isHome ? 'rgba(26,0,0,0.97)' : 'transparent';
  const navShadow = scrolled ? '0 2px 24px rgba(0,0,0,0.25)' : 'none';

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: navBg, boxShadow: navShadow,
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'all 0.4s ease',
        borderBottom: scrolled ? '1px solid rgba(230,48,48,0.25)' : 'none',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 80 }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/logo.jpeg"
              alt="Longhorn Associates"
              style={{ height: 58, width: 'auto', objectFit: 'contain' }}
            />
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">
            {navLinks.map(link => (
              link.children ? (
                <div key={link.label} style={{ position: 'relative' }}
                  onMouseEnter={() => setDropOpen(true)}
                  onMouseLeave={() => setDropOpen(false)}>
                  <button style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    padding: '8px 14px', background: 'none', border: 'none', cursor: 'pointer',
                    color: location.pathname === link.path ? '#e63030' : 'rgba(255,255,255,0.9)',
                    fontWeight: 500, fontSize: 15, fontFamily: 'var(--font-sans)',
                    transition: 'color 0.2s', borderRadius: 6,
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = '#e63030'}
                    onMouseLeave={e => e.currentTarget.style.color = location.pathname === link.path ? '#e63030' : 'rgba(255,255,255,0.9)'}
                  >
                    {link.label} <ChevronDown size={14} />
                  </button>
                  {dropOpen && (
                    <div style={{
                      position: 'absolute', top: '100%', left: 0,
                      background: 'rgba(26,0,0,0.97)', backdropFilter: 'blur(12px)',
                      borderRadius: 12, padding: 8, minWidth: 220,
                      boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
                      border: '1px solid rgba(230,48,48,0.2)',
                    }}>
                      {link.children.map(child => (
                        <Link key={child.label} to={child.path} style={{
                          display: 'block', padding: '10px 16px', color: 'rgba(255,255,255,0.85)',
                          fontSize: 14, fontWeight: 500, borderRadius: 8, transition: 'all 0.2s',
                        }}
                          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(230,48,48,0.15)'; e.currentTarget.style.color = '#e63030'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}
                        >{child.label}</Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={link.label} to={link.path} style={{
                  padding: '8px 14px', borderRadius: 6,
                  color: location.pathname === link.path ? '#e63030' : 'rgba(255,255,255,0.9)',
                  fontWeight: 500, fontSize: 15, transition: 'color 0.2s',
                  borderBottom: location.pathname === link.path ? '2px solid #e63030' : '2px solid transparent',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = '#e63030'}
                  onMouseLeave={e => e.currentTarget.style.color = location.pathname === link.path ? '#e63030' : 'rgba(255,255,255,0.9)'}
                >{link.label}</Link>
              )
            ))}
            <Link to="/portal" style={{
              marginLeft: 10, padding: '10px 22px', fontSize: 14,
              background: '#e63030', color: '#fff', fontWeight: 700,
              borderRadius: 8, cursor: 'pointer',
              fontFamily: 'var(--font-sans)', transition: 'all 0.2s',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#c0392b'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(230,48,48,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#e63030'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              Client Portal
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ display: 'none', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 6 }}
            className="mobile-menu-btn"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', top: 80, left: 0, right: 0, bottom: 0,
          background: 'rgba(26,0,0,0.98)', zIndex: 999,
          padding: 24, overflowY: 'auto',
          animation: 'fadeIn 0.2s ease',
        }}>
          {navLinks.map(link => (
            <div key={link.label}>
              <Link to={link.path} style={{
                display: 'block', padding: '14px 0',
                color: location.pathname === link.path ? '#e63030' : 'rgba(255,255,255,0.9)',
                fontSize: 18, fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}>{link.label}</Link>
              {link.children && link.children.map(c => (
                <Link key={c.label} to={c.path} style={{
                  display: 'block', padding: '10px 0 10px 20px',
                  color: '#e63030', fontSize: 15, fontWeight: 500,
                }}>— {c.label}</Link>
              ))}
            </div>
          ))}
          <Link to="/portal" style={{
            marginTop: 24, display: 'flex', justifyContent: 'center',
            padding: '14px 32px', background: '#e63030', color: '#fff',
            fontWeight: 700, borderRadius: 8, fontSize: 15,
          }}>
            Client Portal
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
