import React, { useState, useEffect } from 'react';
import { ArrowRight, TrendingUp, CheckCircle, Star, Shield, Award, Users, BarChart2, Building2 } from 'lucide-react';

function Counter({ target, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / 50;
    const t = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(start));
    }, 30);
    return () => clearInterval(t);
  }, [target]);
  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
}

const stats = [
  { value: 500, suffix: '+', label: 'Active Investors', icon: Users },
  { value: 15, suffix: '+', label: 'Years Experience', icon: Award },
  { value: 7, suffix: '', label: 'Unit Trust Funds', icon: BarChart2 },
  { value: 4, suffix: '', label: 'Branch Locations', icon: Building2 },
];

export default function HomeSlide({ onNavigate }) {
  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      background: 'var(--white)', position: 'relative', overflow: 'hidden',
    }}>
      {/* Background accents */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `radial-gradient(circle at 80% 20%, rgba(211,47,47,0.04) 0%, transparent 50%),
          radial-gradient(circle at 20% 80%, rgba(59,79,160,0.03) 0%, transparent 50%)`,
      }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: '45%', height: '100%',
        background: 'linear-gradient(180deg, var(--red-light) 0%, rgba(255,235,238,0) 100%)',
        pointerEvents: 'none', opacity: 0.5,
      }} />

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 60px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, width: '100%', alignItems: 'center' }}>

          {/* Left — Hero copy */}
          <div>
            <div className="au d1" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 16px', borderRadius: 100, marginBottom: 24,
              background: 'var(--red-light)', border: '1px solid var(--red-100)',
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--red)', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--red)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>SEC & PIA Licensed</span>
            </div>

            <h1 className="au d2" style={{
              fontFamily: 'var(--font-serif)', fontWeight: 800,
              fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)', lineHeight: 1.1,
              color: 'var(--gray-900)', marginBottom: 20,
            }}>
              Your Innovative<br />
              <span style={{ color: 'var(--red)' }}>Financing & Investment</span><br />
              Partner
            </h1>

            <p className="au d3" style={{
              fontSize: 16, color: 'var(--gray-500)', lineHeight: 1.75,
              marginBottom: 32, maxWidth: 480,
            }}>
              Zambia's trusted Investment Management Company — from Unit Trust funds starting at just K100/month to full portfolio management. Invest in property, equities, education, and more with professional guidance.
            </p>

            <div className="au d4" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 36 }}>
              <button className="btn-primary" onClick={() => onNavigate(1)}>
                Explore Our Funds <ArrowRight size={15} />
              </button>
              <button className="btn-outline" onClick={() => onNavigate(5)}>
                Client Portal
              </button>
            </div>

            <div className="au d5" style={{
              display: 'flex', gap: 20, paddingTop: 24,
              borderTop: '1px solid var(--gray-200)', flexWrap: 'wrap',
            }}>
              {['SEC Licensed', 'PIA Regulated', 'LuSE Member', 'Lusaka · Ndola · Kitwe · Solwezi'].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle size={14} style={{ color: 'var(--red)' }} />
                  <span style={{ fontSize: 12, color: 'var(--gray-500)', fontWeight: 600 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Dashboard card */}
          <div className="au d3" style={{ position: 'relative' }}>
            <div style={{
              background: 'var(--white)', border: '1px solid var(--gray-200)',
              borderRadius: 20, padding: 28, boxShadow: 'var(--shadow-lg)', position: 'relative', zIndex: 1,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--gray-400)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Portfolio Value</div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 700, color: 'var(--gray-900)' }}>K 2,840,000</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 100, background: 'rgba(76,175,80,0.1)' }}>
                  <TrendingUp size={13} style={{ color: '#4CAF50' }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#4CAF50' }}>+18.4%</span>
                </div>
              </div>

              {/* Chart bars */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 80, marginBottom: 16 }}>
                {[38, 55, 45, 70, 58, 80, 68, 92, 75, 100, 85, 110].map((h, i) => (
                  <div key={i} style={{
                    flex: 1, borderRadius: '3px 3px 0 0', height: `${h}%`,
                    background: i === 11 ? 'linear-gradient(180deg, var(--red), #EF5350)' : `rgba(211,47,47,${0.12 + i * 0.04})`,
                    transition: 'height 0.4s ease',
                  }} />
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--gray-400)' }}>
                {['J','F','M','A','M','J','J','A','S','O','N','D'].map(m => <span key={m}>{m}</span>)}
              </div>
            </div>

            {/* Floating cards */}
            <div style={{
              position: 'absolute', bottom: -14, left: -20, zIndex: 2,
              background: 'var(--red)', borderRadius: 14, padding: '12px 18px',
              boxShadow: '0 10px 28px rgba(211,47,47,0.4)', animation: 'float 6s ease-in-out infinite',
            }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.8)', marginBottom: 2 }}>Start From</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: '#fff' }}>K100/mo</div>
            </div>

            <div style={{
              position: 'absolute', top: -14, right: -14, zIndex: 2,
              background: 'var(--white)', border: '1px solid var(--gray-200)',
              borderRadius: 14, padding: '10px 16px',
              boxShadow: 'var(--shadow-lg)', animation: 'float 7s ease-in-out infinite reverse',
            }}>
              <div style={{ fontSize: 10, color: 'var(--gray-400)', marginBottom: 2, fontWeight: 600 }}>Unit Trust Funds</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 700, color: 'var(--red)' }}>7 Funds</div>
            </div>

            <div style={{
              position: 'absolute', bottom: -14, right: 16, zIndex: 2,
              background: 'var(--white)', border: '1px solid var(--gray-200)',
              borderRadius: 12, padding: '10px 14px',
              boxShadow: 'var(--shadow-md)',
              display: 'flex', alignItems: 'center', gap: 10, maxWidth: 220,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--red), #EF5350)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-serif)', fontWeight: 700, color: '#fff', fontSize: 13, flexShrink: 0,
              }}>M</div>
              <div>
                <div style={{ display: 'flex', gap: 1, marginBottom: 2 }}>
                  {[1,2,3,4,5].map(i => <Star key={i} size={9} fill="var(--red)" style={{ color: 'var(--red)' }} />)}
                </div>
                <p style={{ fontSize: 10, color: 'var(--gray-500)', lineHeight: 1.3, fontStyle: 'italic' }}>
                  "Portfolio has grown steadily..."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{
        borderTop: '1px solid var(--gray-200)', background: 'var(--gray-50)',
        padding: '18px 60px', display: 'flex', gap: 0,
        position: 'relative', zIndex: 1, flexShrink: 0,
      }}>
        {stats.map(({ value, suffix, label, icon: Icon }, i) => (
          <div key={label} style={{
            flex: 1, textAlign: 'center', padding: '0 16px',
            borderRight: i < stats.length - 1 ? '1px solid var(--gray-200)' : 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10, background: 'var(--red-light)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Icon size={18} style={{ color: 'var(--red)' }} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 700, color: 'var(--red)', lineHeight: 1 }}>
                <Counter target={value} suffix={suffix} />
              </div>
              <div style={{ fontSize: 11, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 2, fontWeight: 600 }}>{label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
