import React from 'react';
import { ArrowRight, Users, Award, BarChart2, MapPin, Building2, Layers, Shield, Heart, Newspaper, DollarSign, TrendingUp, PieChart } from 'lucide-react';

const cats = [
  { icon: Building2, label: 'About Longhorn', slide: 3 },
  { icon: Layers, label: 'Our Products', slide: 1, active: true },
  { icon: Shield, label: 'Governance', slide: 3 },
  { icon: Users, label: 'Our Team', slide: 3 },
  { icon: Heart, label: 'Core Values', slide: 3 },
  { icon: Newspaper, label: 'Insights & News', slide: 4 },
];

const funds = [
  { label: 'Money Market Fund', color: '#2E7D32', icon: DollarSign },
  { label: 'Bond Fund', color: '#0B1D3A', icon: Shield },
  { label: 'Balanced Fund', color: '#D32F2F', icon: PieChart },
  { label: 'Equity Fund', color: '#7B1FA2', icon: TrendingUp },
];

export default function HomeSlide({ onNavigate }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <div style={{ background: 'linear-gradient(135deg, #0B1D3A 0%, #132B52 50%, #1B3A6B 100%)', padding: '48px 60px 36px', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, pointerEvents: 'none', opacity: 0.06 }}>
          {[60,90,50,110,70,95,55,120,80,65,100,75,85,45,105,68,92,58].map((h, i) => (
            <div key={i} style={{ position: 'absolute', bottom: 0, left: `${i*5.5}%`, width: '4%', height: h, background: '#fff', borderRadius: '2px 2px 0 0' }} />
          ))}
        </div>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: 16, maxWidth: 560 }}>Investing for Long-Term{'\n'}Financial Growth</h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: 500, marginBottom: 28 }}>Licensed asset managers. Unit trust & pension investment products. Research-driven investment process.</p>
          <div style={{ display: 'flex', gap: 14 }}>
            <button className="btn-primary" onClick={() => onNavigate(1)}>Explore Products</button>
            <button className="btn-outline" onClick={() => onNavigate(6)}>Start Investing</button>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', background: '#fff', borderBottom: '1px solid var(--g200)', flexShrink: 0 }}>
        {cats.map((c) => { const Icon = c.icon; return (
          <button key={c.label} onClick={() => onNavigate(c.slide)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '20px 12px', border: 'none', cursor: 'pointer', background: c.active ? 'var(--red-pale)' : 'transparent', borderBottom: c.active ? '3px solid var(--red)' : '3px solid transparent', fontFamily: 'var(--font-sans)', transition: 'all 0.2s' }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: c.active ? 'var(--red)' : 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon size={20} style={{ color: '#fff' }} /></div>
            <span style={{ fontSize: 12, fontWeight: 600, color: c.active ? 'var(--red)' : 'var(--g600)' }}>{c.label}</span>
          </button>
        ); })}
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '32px 60px' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 700, color: 'var(--g900)', marginBottom: 24, textAlign: 'center' }}>Our Investment Solutions</h2>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 28 }}>
          {funds.map(f => { const FI = f.icon; return (
            <button key={f.label} onClick={() => onNavigate(1)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 28px', borderRadius: 10, border: `2px solid ${f.color}20`, background: '#fff', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 14, color: f.color, transition: 'all 0.25s', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
              onMouseEnter={e => { e.currentTarget.style.background = f.color; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = f.color; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = f.color; e.currentTarget.style.borderColor = `${f.color}20`; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <FI size={16} /> {f.label}
            </button>
          ); })}
        </div>
        <div style={{ display: 'flex', gap: 32, marginTop: 8 }}>
          {[{ v: '500+', l: 'Investors', Icon: Users }, { v: '15+', l: 'Years', Icon: Award }, { v: '7', l: 'Funds', Icon: BarChart2 }, { v: '4', l: 'Branches', Icon: MapPin }].map(s => (
            <div key={s.l} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <s.Icon size={16} style={{ color: 'var(--red)' }} />
              <div><span style={{ fontFamily: 'var(--font-serif)', fontWeight: 800, fontSize: 18, color: 'var(--navy)' }}>{s.v}</span><span style={{ fontSize: 12, color: 'var(--g400)', marginLeft: 6 }}>{s.l}</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
