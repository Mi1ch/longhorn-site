import React, { useState, useCallback, useEffect } from 'react';
import './index.css';
import HomeSlide from './slides/HomeSlide';
import ServicesSlide from './slides/ServicesSlide';
import { AboutSlide, InsightsSlide, ContactSlide, PortalSlide } from './slides/OtherSlides';
import { ChevronLeft, ChevronRight, Menu, X, LogIn } from 'lucide-react';

const slides = [
  { id: 0, label: 'Home',     Component: HomeSlide },
  { id: 1, label: 'Services', Component: ServicesSlide },
  { id: 2, label: 'About',    Component: AboutSlide },
  { id: 3, label: 'Insights', Component: InsightsSlide },
  { id: 4, label: 'Contact',  Component: ContactSlide },
  { id: 5, label: 'Portal',   Component: PortalSlide },
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useCallback((idx) => {
    setCurrent(Math.max(0, Math.min(slides.length - 1, idx)));
    setMobileOpen(false);
  }, []);

  const prev = () => navigate(current - 1);
  const next = () => navigate(current + 1);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') navigate(current + 1);
      if (e.key === 'ArrowLeft') navigate(current - 1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [current, navigate]);

  return (
    <div className="app-shell">
      {/* ─── Top Navigation ─── */}
      <nav className="top-nav">
        <img src="/logo.jpeg" alt="Longhorn Associates" className="nav-logo" onClick={() => navigate(0)} />
        <div className="nav-links">
          {slides.slice(0, 5).map(({ id, label }) => (
            <button key={id} className={`nav-link${current === id ? ' active' : ''}`} onClick={() => navigate(id)}>
              {label}
            </button>
          ))}
          <button className="nav-cta" onClick={() => navigate(5)}>
            <LogIn size={14} /> Client Portal
          </button>
        </div>
        <button className="mobile-menu-btn" onClick={() => setMobileOpen(true)} style={{ display: 'none' }}>
          <Menu size={22} />
        </button>
      </nav>

      {/* ─── Mobile Nav ─── */}
      {mobileOpen && (
        <>
          <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />
          <div className="mobile-nav open">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
              <img src="/logo.jpeg" alt="Longhorn Associates" style={{ height: 36 }} />
              <button onClick={() => setMobileOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-500)' }}>
                <X size={20} />
              </button>
            </div>
            {slides.map(({ id, label }) => (
              <button key={id} onClick={() => navigate(id)} style={{
                display: 'block', width: '100%', textAlign: 'left', padding: '14px 16px', border: 'none', cursor: 'pointer',
                background: current === id ? 'var(--red-light)' : 'transparent',
                color: current === id ? 'var(--red)' : 'var(--gray-700)',
                fontWeight: current === id ? 700 : 500, fontSize: 15, fontFamily: 'var(--font-sans)',
                borderRadius: 10, marginBottom: 4,
                borderLeft: current === id ? '3px solid var(--red)' : '3px solid transparent',
              }}>{label}</button>
            ))}
          </div>
        </>
      )}

      {/* ─── Main Stage ─── */}
      <div className="main-stage">
        <div className="slide-track" style={{ transform: `translateX(-${current * 100}%)` }}>
          {slides.map(({ id, Component }) => (
            <div key={id} className={id === 4 || id === 2 ? 'slide-scroll' : 'slide'}>
              <Component onNavigate={navigate} />
            </div>
          ))}
        </div>

        {current > 0 && (
          <button onClick={prev} className="slide-arrow" style={{
            position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
            width: 44, height: 44, borderRadius: '50%', background: '#fff', border: '1px solid var(--gray-200)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 50,
            color: 'var(--red)', boxShadow: 'var(--shadow-md)', transition: 'all 0.25s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--red)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--red)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = 'var(--red)'; e.currentTarget.style.borderColor = 'var(--gray-200)'; }}
          ><ChevronLeft size={18} /></button>
        )}
        {current < slides.length - 1 && (
          <button onClick={next} className="slide-arrow" style={{
            position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
            width: 44, height: 44, borderRadius: '50%', background: '#fff', border: '1px solid var(--gray-200)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 50,
            color: 'var(--red)', boxShadow: 'var(--shadow-md)', transition: 'all 0.25s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--red)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--red)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = 'var(--red)'; e.currentTarget.style.borderColor = 'var(--gray-200)'; }}
          ><ChevronRight size={18} /></button>
        )}

        <div className="dots-bar">
          {slides.map(({ id, label }) => (
            <button key={id} className={`dot-btn${current === id ? ' active' : ''}`} onClick={() => navigate(id)} title={label} />
          ))}
        </div>
        <div className="slide-counter">
          {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}
