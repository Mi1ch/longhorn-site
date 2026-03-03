import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Linkedin, Instagram, Facebook, ArrowRight, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: '#1a0000', color: 'rgba(255,255,255,0.8)' }}>
      {/* Newsletter bar */}
      <div style={{ background: '#2d0000', padding: '48px 0', borderBottom: '1px solid rgba(230,48,48,0.2)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 6 }}>
              Stay Informed
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15 }}>
              Get market insights and investment updates delivered to your inbox.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 0, flexWrap: 'wrap' }}>
            <input type="email" placeholder="Enter your email address"
              style={{
                padding: '14px 20px', fontSize: 15, border: '1px solid rgba(230,48,48,0.3)',
                borderRadius: '8px 0 0 8px', background: 'rgba(255,255,255,0.06)',
                color: '#fff', outline: 'none', minWidth: 280,
                fontFamily: 'var(--font-sans)',
              }} />
            <button style={{
              padding: '14px 24px', background: '#e63030', color: '#fff', border: 'none',
              borderRadius: '0 8px 8px 0', fontWeight: 700, fontSize: 15, cursor: 'pointer',
              fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', gap: 8,
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#c0392b'}
              onMouseLeave={e => e.currentTarget.style.background = '#e63030'}
            >
              Subscribe <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container" style={{ padding: '64px 24px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: 20 }}>
              <img src="/logo.jpeg" alt="Longhorn Associates" style={{ height: 60, width: 'auto', objectFit: 'contain' }} />
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.55)', marginBottom: 24 }}>
              Your Innovative Financing & Investment Partner. A Zambian wholly-owned Investment Management Company committed to enriching society through superior investment services.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {[{ Icon: Linkedin, url: '#' }, { Icon: Instagram, url: '#' }, { Icon: Facebook, url: '#' }].map(({ Icon, url }, i) => (
                <a key={i} href={url} style={{
                  width: 38, height: 38, borderRadius: 8, background: 'rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.6)', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(230,48,48,0.25)'; e.currentTarget.style.color = '#e63030'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 15, marginBottom: 20, letterSpacing: '0.05em' }}>Our Services</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Portfolio Management', 'Unit Trust Fund', 'Pension Fund Management', 'Education Fund', 'Investment Advisory', 'Wealth Management'].map(s => (
                <li key={s}>
                  <Link to="/services" style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#e63030'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                  >→ {s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 15, marginBottom: 20, letterSpacing: '0.05em' }}>Company</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[['About Us', '/about'], ['Insights & News', '/insights'], ['Client Portal', '/portal'], ['Contact Us', '/contact'], ['Privacy Policy', '/privacy'], ['Terms of Service', '/terms']].map(([label, path]) => (
                <li key={label}>
                  <Link to={path} style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#e63030'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                  >→ {label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 15, marginBottom: 20, letterSpacing: '0.05em' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <MapPin size={16} style={{ color: '#e63030', marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
                  Ground Floor, Office Park<br />Plot 1146/15, Lagos Road<br />P.O. Box 50655, Lusaka
                </span>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <Phone size={16} style={{ color: '#e63030', flexShrink: 0 }} />
                <a href="tel:+260252540" style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#e63030'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                >+260 252 540</a>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <Mail size={16} style={{ color: '#e63030', flexShrink: 0 }} />
                <a href="mailto:info@longhorn-associates.com" style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#e63030'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                >info@longhorn-associates.com</a>
              </div>
            </div>

            {/* Regulatory badges */}
            <div style={{ marginTop: 28, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['SEC Licensed', 'PIA Regulated', 'LuSE Member'].map(badge => (
                <div key={badge} style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  padding: '5px 10px', borderRadius: 6,
                  background: 'rgba(230,48,48,0.12)',
                  border: '1px solid rgba(230,48,48,0.25)',
                  fontSize: 11, color: '#e63030', fontWeight: 600,
                }}>
                  <Shield size={10} /> {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '20px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
            © {new Date().getFullYear()} Longhorn Associates Limited. All rights reserved.
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
            Regulated by SEC & PIA Zambia. Investments carry risk. Past performance is not indicative of future results.
          </p>
        </div>
      </div>
    </footer>
  );
}
