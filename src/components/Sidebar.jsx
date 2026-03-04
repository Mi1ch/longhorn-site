import React from 'react';
import {
  Home, Briefcase, Users, BookOpen, Mail, LogIn,
  TrendingUp, Shield, ChevronRight, X
} from 'lucide-react';

const navItems = [
  { id: 0, label: 'Home',     icon: Home },
  { id: 1, label: 'Services', icon: Briefcase },
  { id: 2, label: 'About',    icon: Users },
  { id: 3, label: 'Insights', icon: BookOpen },
  { id: 4, label: 'Contact',  icon: Mail },
  { id: 5, label: 'Portal',   icon: LogIn },
];

export default function Sidebar({ current, onNavigate, mobileOpen, onMobileClose }) {
  return (
    <aside className={`sidebar${mobileOpen ? ' open' : ''}`}>
      {/* Logo */}
      <div style={{
        padding: '28px 20px 24px',
        borderBottom: '1px solid rgba(230,48,48,0.15)',
        position: 'relative',
      }}>
        {/* Mobile close btn */}
        <button onClick={onMobileClose} style={{
          display: 'none', position: 'absolute', top: 16, right: 16,
          background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)',
          cursor: 'pointer', padding: 4,
        }} className="mobile-close-btn">
          <X size={18} />
        </button>

        <img src="/logo.jpeg" alt="Longhorn Associates"
          style={{ width: '100%', maxWidth: 180, height: 'auto', objectFit: 'contain', display: 'block', margin: '0 auto' }}
        />
        <p style={{
          textAlign: 'center', fontSize: 10, color: 'rgba(255,255,255,0.35)',
          marginTop: 10, letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>Your Innovative Investment Partner</p>
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
        {navItems.map(({ id, label, icon: Icon }) => {
          const active = current === id;
          return (
            <button key={id} onClick={() => { onNavigate(id); onMobileClose(); }}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 14px', borderRadius: 12, border: 'none', cursor: 'pointer',
                background: active ? 'rgba(230,48,48,0.18)' : 'transparent',
                color: active ? '#ff6b6b' : 'rgba(255,255,255,0.6)',
                fontFamily: 'var(--font-sans)', fontWeight: active ? 700 : 500,
                fontSize: 14, marginBottom: 3,
                transition: 'all 0.2s',
                borderLeft: active ? '3px solid #e63030' : '3px solid transparent',
                textAlign: 'left',
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.9)'; }}}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}}
            >
              <Icon size={17} />
              <span style={{ flex: 1 }}>{label}</span>
              {active && <ChevronRight size={14} style={{ color: '#e63030' }} />}
            </button>
          );
        })}
      </nav>

      {/* Slide dots */}
      <div style={{
        padding: '16px 12px', display: 'flex', justifyContent: 'center', gap: 6,
        borderTop: '1px solid rgba(230,48,48,0.12)',
      }}>
        {navItems.map(({ id }) => (
          <button key={id} onClick={() => onNavigate(id)} style={{
            width: current === id ? 20 : 7,
            height: 7, borderRadius: 4, border: 'none', cursor: 'pointer',
            background: current === id ? '#e63030' : 'rgba(255,255,255,0.2)',
            transition: 'all 0.3s',
            padding: 0,
          }} />
        ))}
      </div>

      {/* Regulatory badges */}
      <div style={{ padding: '16px 16px 24px', borderTop: '1px solid rgba(230,48,48,0.12)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {[
            { Icon: Shield, text: 'SEC Licensed' },
            { Icon: Shield, text: 'PIA Regulated' },
            { Icon: TrendingUp, text: 'LuSE Member' },
          ].map(({ Icon, text }) => (
            <div key={text} style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '6px 10px', borderRadius: 8,
              background: 'rgba(230,48,48,0.08)',
              border: '1px solid rgba(230,48,48,0.15)',
            }}>
              <Icon size={11} style={{ color: '#e63030', flexShrink: 0 }} />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 600 }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-close-btn { display: block !important; }
        }
      `}</style>
    </aside>
  );
}
