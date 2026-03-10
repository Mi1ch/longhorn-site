import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp, Shield, Users, Award, ArrowRight, ChevronDown,
  BarChart2, BookOpen, GraduationCap, Briefcase, Star, CheckCircle,
  Play, Building, PieChart
} from 'lucide-react';

/* ── animated counter ── */
function Counter({ target, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const step = target / 60;
        const t = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(t); } else setCount(Math.floor(start));
        }, 25);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

/* ─────────────────────────────────────────────
   LIGHTER BLUE COLOR PALETTE
   (replacing all dark navy / #1a0000 / #2d0000)
   ───────────────────────────────────────────── */
const blue = {
  primary:    '#2563A8',  /* main lighter blue */
  dark:       '#1A4B8C',  /* slightly deeper for contrast */
  deeper:     '#0F3D6E',  /* deepest variant — still lighter than old navy */
  light:      '#3B7DD8',  /* hover / lighter accent */
  bg:         '#F0F5FB',  /* very light blue page background */
  bg2:        '#E1ECF7',  /* card hover / subtle tint */
  text:       '#0F2E50',  /* dark blue for headings */
};
const accent = '#C41E2F'; /* red from logo */

/* ─────────────────────────────────────────────
   ONLY 4 INVESTMENT FUNDS
   ───────────────────────────────────────────── */
const investments = [
  {
    icon: TrendingUp,
    label: 'Equity Fund',
    desc: 'Invest in equities listed on the Lusaka Securities Exchange (LuSE) for long-term capital growth. Ideal for investors seeking higher returns who are comfortable with market fluctuations.',
    color: accent,
  },
  {
    icon: Shield,
    label: 'Bond Fund',
    desc: 'A lower-risk option investing in government securities and listed bonds from reputable institutions. Designed for investors seeking stable, predictable returns with capital preservation.',
    color: blue.primary,
  },
  {
    icon: PieChart,
    label: 'Balanced Fund',
    desc: 'A hybrid fund combining equities, bonds and money market instruments — delivering competitive risk-adjusted returns through diversification across multiple asset classes.',
    color: blue.dark,
  },
  {
    icon: Building,
    label: 'Property Fund',
    desc: 'Gain exposure to the property sector through in-country and global listed property investments. Perfect for investors looking to diversify into real estate without direct ownership.',
    color: blue.deeper,
  },
];

const testimonials = [
  { name: 'Mwamba C.', role: 'Business Owner, Lusaka', text: 'Longhorn Associates transformed the way I invest. My portfolio has grown steadily and I always feel informed about where my money is going.', rating: 5 },
  { name: 'Thandiwe M.', role: 'Civil Engineer', text: 'The Education Fund has been a game-changer for our family. Starting with K100/month felt manageable and the returns have been impressive.', rating: 5 },
  { name: 'James K.', role: 'Retired Professional', text: 'Their pension advisory service gave me clarity and confidence about retirement. The team is professional, responsive, and trustworthy.', rating: 5 },
];

const stats = [
  { value: 500, suffix: '+', label: 'Clients Served' },
  { value: 15, suffix: '+', label: 'Years of Excellence' },
  { value: 98, suffix: '%', label: 'Client Retention' },
  { value: 7, suffix: '', label: 'Unit Trust Funds' },
];

export default function HomePage() {
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeroLoaded(true), 100);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>

      {/* ══════════════════════════════════════════
          HERO — Uploaded landscape image (Long_horn.jpg)
          Reduced height: 380px instead of 100vh
          ══════════════════════════════════════════ */}
      <section style={{
        height: 380, minHeight: 380, maxHeight: 380,
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center',
      }}>
        {/* ── Background image: place Long_horn.jpg in /public/images/ ── */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/Long_horn.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
          backgroundRepeat: 'no-repeat',
        }} />

        {/* ── Lighter blue gradient overlay for readability ── */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(135deg, rgba(15,61,110,0.82) 0%, rgba(37,99,168,0.68) 50%, rgba(59,125,216,0.55) 100%)`,
        }} />

        {/* Bottom edge fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
          background: 'linear-gradient(0deg, rgba(15,61,110,0.45) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Subtle red accent glow */}
        <div style={{
          position: 'absolute', top: '10%', right: '8%', width: 250, height: 250, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(196,30,47,0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            maxWidth: 640,
            opacity: heroLoaded ? 1 : 0,
            transform: heroLoaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease',
          }}>
            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '5px 14px', borderRadius: 4,
              background: 'rgba(196,30,47,0.22)', border: '1px solid rgba(196,30,47,0.45)',
              marginBottom: 20,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: accent, animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#ff8a94', letterSpacing: '0.1em', textTransform: 'uppercase' }}>SEC & PIA Licensed</span>
            </div>

            <h1 style={{
              fontFamily: 'var(--font-serif)', fontWeight: 700,
              fontSize: 'clamp(2rem, 3.6vw, 2.8rem)', lineHeight: 1.12,
              color: '#fff', marginBottom: 14,
              textShadow: '0 2px 24px rgba(0,0,0,0.2)',
            }}>
              Investing for Long-Term<br />Financial Growth
            </h1>

            <p style={{
              fontSize: 15, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7,
              marginBottom: 28, maxWidth: 500,
            }}>
              Licensed asset managers. Unit trust & pension investment products. Research-driven investment process.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/services" className="btn-primary" style={{ background: accent, padding: '12px 26px', fontSize: 14 }}>
                Explore Products <ArrowRight size={15} />
              </Link>
              <Link to="/portal" className="btn-outline" style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff', padding: '12px 26px', fontSize: 14 }}>
                Start Investing
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          STATS — Lighter blue background
          ══════════════════════════════════════════ */}
      <section style={{
        background: blue.primary,
        padding: '52px 0',
        borderTop: `3px solid ${accent}`,
      }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
            {stats.map(({ value, suffix, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 700, color: '#fff', marginBottom: 6,
                }}>
                  <Counter target={value} suffix={suffix} />
                </div>
                <div style={{
                  fontSize: 13, color: 'rgba(255,255,255,0.65)',
                  fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:700px){.stats-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
      </section>


      {/* ══════════════════════════════════════════
          OUR INVESTMENT SOLUTIONS — Only 4 funds
          ══════════════════════════════════════════ */}
      <section className="section-pad" style={{ background: blue.bg }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ width: 40, height: 3, borderRadius: 2, background: accent, margin: '0 auto 16px' }} />
            <span className="tag">Our Investment Solutions</span>
            <h2 className="section-heading" style={{ marginBottom: 16, color: blue.text }}>
              Choose the Fund That<br />Fits Your Goals
            </h2>
            <p className="section-sub" style={{ margin: '0 auto', maxWidth: 560 }}>
              Four professionally managed funds tailored to different risk profiles and investment objectives, all governed by the Securities and Exchange Commission.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {investments.map(({ icon: Icon, label, desc, color }) => (
              <div key={label} className="card" style={{
                padding: 32, borderTop: `4px solid ${color}`,
                transition: 'all 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = ''; }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: 16,
                  background: `${color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 20,
                }}>
                  <Icon size={26} style={{ color }} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: blue.text, marginBottom: 10 }}>{label}</h3>
                <p style={{ fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.7, marginBottom: 20 }}>{desc}</p>
                <Link to="/services" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 14, fontWeight: 600, color: color, transition: 'gap 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                  onMouseLeave={e => e.currentTarget.style.gap = '6px'}
                >
                  Learn More <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          WHY US — Lighter blue palette
          ══════════════════════════════════════════ */}
      <section className="section-pad" style={{
        background: `linear-gradient(135deg, ${blue.deeper} 0%, ${blue.dark} 100%)`,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', right: -100, top: '50%', transform: 'translateY(-50%)',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(196,30,47,0.08) 0%, transparent 70%)',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <div style={{ width: 40, height: 3, borderRadius: 2, background: accent, marginBottom: 16 }} />
              <span className="tag" style={{ color: 'rgba(255,255,255,0.5)' }}>Why Choose Us</span>
              <h2 className="section-heading-light" style={{ marginBottom: 24 }}>
                Your Financial Future<br />Deserves the Best
              </h2>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, marginBottom: 40 }}>
                Longhorn Associates is built on trust, transparency, and measurable results. We combine local expertise with global investment principles to deliver returns that matter.
              </p>
              {[
                { title: 'Fully Regulated', desc: 'Licensed by SEC and PIA Zambia, operating to the highest regulatory standards.' },
                { title: 'Locally Owned', desc: 'A proudly Zambian company understanding the local market landscape deeply.' },
                { title: 'Transparent Reporting', desc: 'Regular, clear performance reports so you always know how your money is working.' },
                { title: 'Accessible Minimums', desc: 'Start your investment journey with as little as K100 per month.' },
              ].map(({ title, desc }) => (
                <div key={title} style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(196,30,47,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <CheckCircle size={16} style={{ color: accent }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#fff', marginBottom: 4 }}>{title}</div>
                    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{desc}</div>
                  </div>
                </div>
              ))}
              <Link to="/about" className="btn-primary" style={{ marginTop: 12, background: accent }}>
                About Our Company <ArrowRight size={16} />
              </Link>
            </div>

            {/* Right side - stat cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {[
                { icon: Award, label: '15+ Years', sub: 'Industry Experience', color: accent },
                { icon: Users, label: '500+', sub: 'Happy Investors', color: blue.light },
                { icon: Shield, label: '100%', sub: 'Regulatory Compliant', color: accent },
                { icon: TrendingUp, label: '18%+', sub: 'Average Annual Return', color: blue.light },
              ].map(({ icon: Icon, label, sub, color: c }, i) => (
                <div key={label} style={{
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 20, padding: 28, textAlign: 'center',
                  transition: 'all 0.3s',
                  marginTop: i % 2 === 1 ? 28 : 0,
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(196,30,47,0.3)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                >
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: `${c}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <Icon size={24} style={{ color: c }} />
                  </div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`@media(max-width:900px){.why-grid{grid-template-columns:1fr!important}}`}</style>
      </section>


      {/* ══════════════════════════════════════════
          TESTIMONIALS
          ══════════════════════════════════════════ */}
      <section className="section-pad" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ width: 40, height: 3, borderRadius: 2, background: accent, margin: '0 auto 16px' }} />
            <span className="tag">Client Stories</span>
            <h2 className="section-heading" style={{ color: blue.text }}>What Our Clients Say</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28 }}>
            {testimonials.map(({ name, role, text, rating }) => (
              <div key={name} className="card" style={{ padding: 36 }}>
                <div style={{ display: 'flex', gap: 3, marginBottom: 20 }}>
                  {Array(rating).fill(0).map((_, i) => <Star key={i} size={16} fill={accent} style={{ color: accent }} />)}
                </div>
                <p style={{ fontSize: 16, color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: 24, fontStyle: 'italic' }}>"{text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${blue.primary}, ${blue.light})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, color: '#fff', fontSize: 16, fontFamily: 'var(--font-serif)',
                  }}>{name[0]}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: blue.text, fontSize: 15 }}>{name}</div>
                    <div style={{ fontSize: 13, color: 'var(--gray-400)' }}>{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          CTA — Lighter blue
          ══════════════════════════════════════════ */}
      <section style={{
        padding: '100px 0', position: 'relative', overflow: 'hidden',
        background: `linear-gradient(135deg, ${blue.dark} 0%, ${blue.deeper} 100%)`,
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(196,30,47,0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(59,125,216,0.1) 0%, transparent 50%)`,
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ width: 40, height: 3, borderRadius: 2, background: accent, margin: '0 auto 12px' }} />
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, color: '#fff', marginBottom: 20 }}>
            Ready to Build Your Wealth?
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', marginBottom: 44, maxWidth: 540, margin: '0 auto 44px' }}>
            Join over 500 Zambian investors who trust Longhorn Associates with their financial futures. Start today with as little as K100.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/portal" className="btn-primary" style={{ background: accent }}>
              Open an Account <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }}>
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}