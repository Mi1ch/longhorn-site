import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp, Shield, Users, Award, ArrowRight, ChevronDown,
  BarChart2, BookOpen, GraduationCap, Briefcase, Star, CheckCircle,
  Play
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

const services = [
  { icon: BarChart2, label: 'Portfolio Management', desc: 'Tailored investment portfolios aligned to your financial goals and risk appetite, managed by our expert team.', color: '#c0392b' },
  { icon: TrendingUp, label: 'Unit Trust Fund', desc: 'Start investing with as little as K100/month. Pool your resources with other investors for diversified, professional management.', color: '#e63030' },
  { icon: Shield, label: 'Pension Fund', desc: 'Secure your future with our PIA-regulated pension fund solutions designed for individuals and corporations.', color: '#2d0000' },
  { icon: GraduationCap, label: 'Education Fund', desc: 'Invest in your child\'s future today. Lock in attractive returns with a flexible 1-year minimum investment period.', color: '#e63030' },
  { icon: Briefcase, label: 'Investment Advisory', desc: 'Personalised advice from licensed professionals to help you navigate markets and build long-term wealth.', color: '#c0392b' },
  { icon: BookOpen, label: 'Wealth Management', desc: 'Comprehensive wealth planning services covering assets, liabilities, estate planning and legacy creation.', color: '#e63030' },
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
  { value: 12, suffix: '+', label: 'Investment Products' },
];

export default function HomePage() {
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeroLoaded(true), 100);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh', position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center',
        background: 'linear-gradient(135deg, #0d0000 0%, #1a0000 40%, #2d0000 70%, #1a0000 100%)',
      }}>
        {/* Decorative blobs */}
        <div style={{
          position: 'absolute', top: '-10%', right: '-5%', width: 600, height: 600,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(230,48,48,0.12) 0%, transparent 70%)',
          animation: 'float 8s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '-15%', left: '-8%', width: 500, height: 500,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(230,48,48,0.15) 0%, transparent 70%)',
          animation: 'float 10s ease-in-out infinite reverse',
        }} />
        {/* Grid pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(230,48,48,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(230,48,48,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            {/* Left copy */}
            <div>
              <div className={`animate-fade-up ${heroLoaded ? '' : ''}`} style={{ opacity: heroLoaded ? 1 : 0, transition: 'all 0.8s ease', transitionDelay: '0.1s' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 100, background: 'rgba(230,48,48,0.15)', border: '1px solid rgba(230,48,48,0.3)', marginBottom: 28 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#e63030', animation: 'pulse 2s infinite' }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#e63030', letterSpacing: '0.1em', textTransform: 'uppercase' }}>SEC & PIA Licensed</span>
                </div>
              </div>

              <div style={{ opacity: heroLoaded ? 1 : 0, transition: 'all 0.9s ease', transitionDelay: '0.2s', transform: heroLoaded ? 'translateY(0)' : 'translateY(30px)' }}>
                <h1 style={{
                  fontFamily: 'var(--font-serif)', fontWeight: 700,
                  fontSize: 'clamp(2.8rem, 5vw, 4.2rem)', lineHeight: 1.1,
                  color: '#fff', marginBottom: 24,
                }}>
                  Grow Your Wealth<br />
                  <span style={{ color: '#e63030' }}>With Confidence</span>
                </h1>
                <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, marginBottom: 40, maxWidth: 500 }}>
                  Zambia's trusted Investment Management Company. We deliver tailored investment solutions to help you build lasting wealth and secure your financial future.
                </p>
              </div>

              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', opacity: heroLoaded ? 1 : 0, transition: 'all 1s ease', transitionDelay: '0.4s' }}>
                <Link to="/services" className="btn-primary">
                  Explore Our Services <ArrowRight size={16} />
                </Link>
                <Link to="/portal" className="btn-outline">
                  Client Portal
                </Link>
              </div>

              {/* Trust indicators */}
              <div style={{
                display: 'flex', gap: 24, marginTop: 48, paddingTop: 32,
                borderTop: '1px solid rgba(255,255,255,0.1)',
                opacity: heroLoaded ? 1 : 0, transition: 'all 1s ease', transitionDelay: '0.6s',
                flexWrap: 'wrap',
              }}>
                {['SEC Licensed', 'PIA Regulated', 'LuSE Member', '15+ Years'].map(t => (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <CheckCircle size={15} style={{ color: '#e63030' }} />
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right visual */}
            <div style={{ display: 'flex', justifyContent: 'center', opacity: heroLoaded ? 1 : 0, transition: 'all 1.1s ease', transitionDelay: '0.3s' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: 480 }}>
                {/* Main card */}
                <div style={{
                  background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.12)', borderRadius: 24,
                  padding: 32, position: 'relative', zIndex: 1,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                    <div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>Portfolio Value</div>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 700, color: '#fff' }}>K 2,840,000</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 100, background: 'rgba(230,48,48,0.2)' }}>
                      <TrendingUp size={14} style={{ color: '#e63030' }} />
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#e63030' }}>+18.4%</span>
                    </div>
                  </div>
                  {/* Chart bars */}
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 100, marginBottom: 28 }}>
                    {[40, 65, 48, 75, 60, 85, 72, 95, 80, 100, 88, 110].map((h, i) => (
                      <div key={i} style={{
                        flex: 1, borderRadius: '4px 4px 0 0',
                        height: `${h}%`,
                        background: i === 11
                          ? 'linear-gradient(180deg, #e63030, #ff6b6b)'
                          : `rgba(230,48,48,${0.3 + i * 0.05})`,
                        transition: 'all 0.3s',
                      }} />
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => <span key={m}>{m}</span>)}
                  </div>
                </div>

                {/* Floating cards */}
                <div style={{
                  position: 'absolute', bottom: -24, left: -32, zIndex: 2,
                  background: '#e63030', borderRadius: 16, padding: '16px 20px',
                  boxShadow: '0 16px 40px rgba(230,48,48,0.4)',
                  animation: 'float 6s ease-in-out infinite',
                }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#1a0000', opacity: 0.7, marginBottom: 2 }}>Monthly Return</div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 700, color: '#1a0000' }}>+2.3%</div>
                </div>

                <div style={{
                  position: 'absolute', top: -20, right: -24, zIndex: 2,
                  background: 'rgba(177, 18, 18, 0.9)', backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(230,48,48,0.3)', borderRadius: 16, padding: '14px 20px',
                  animation: 'float 7s ease-in-out infinite reverse',
                }}>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 2 }}>Active Investors</div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: '#fff' }}>500+</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{
          position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          color: 'rgba(255,255,255,0.4)', fontSize: 12,
          animation: 'float 2s ease-in-out infinite',
        }}>
          <span style={{ letterSpacing: '0.1em' }}>SCROLL</span>
          <ChevronDown size={18} />
        </div>

        <style>{`
          @media (max-width: 900px) {
            .hero-grid { grid-template-columns: 1fr !important; }
            .hero-visual { display: none !important; }
          }
        `}</style>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: '#2d0000', padding: '60px 0', borderTop: '1px solid rgba(230,48,48,0.2)', borderBottom: '1px solid rgba(230,48,48,0.2)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
            {stats.map(({ value, suffix, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#e63030', marginBottom: 6 }}>
                  <Counter target={value} suffix={suffix} />
                </div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:700px){.stats-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
      </section>

      {/* ── SERVICES ── */}
      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="gold-bar" style={{ margin: '0 auto 16px' }} />
            <span className="tag">What We Offer</span>
            <h2 className="section-heading" style={{ marginBottom: 16 }}>Investment Solutions<br />Built for You</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>
              From first-time investors to experienced professionals, we provide the products and expertise to help every Zambian build wealth.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28 }}>
            {services.map(({ icon: Icon, label, desc, color }) => (
              <div key={label} className="card" style={{ padding: 32 }}
                onMouseEnter={e => e.currentTarget.style.borderTop = `4px solid ${color}`}
                onMouseLeave={e => e.currentTarget.style.borderTop = '4px solid transparent'}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: 16,
                  background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 20,
                }}>
                  <Icon size={26} style={{ color }} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: '#1a0000', marginBottom: 10 }}>{label}</h3>
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

      {/* ── WHY US ── */}
      <section className="section-pad" style={{ background: '#1a0000', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', right: -100, top: '50%', transform: 'translateY(-50%)',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(230,48,48,0.08) 0%, transparent 70%)',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <div className="gold-bar" />
              <span className="tag">Why Choose Us</span>
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
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(230,48,48,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <CheckCircle size={16} style={{ color: '#e63030' }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#fff', marginBottom: 4 }}>{title}</div>
                    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{desc}</div>
                  </div>
                </div>
              ))}
              <Link to="/about" className="btn-primary" style={{ marginTop: 12 }}>
                About Our Company <ArrowRight size={16} />
              </Link>
            </div>

            {/* Right side - stat cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {[
                { icon: Award, label: '15+ Years', sub: 'Industry Experience', color: '#e63030' },
                { icon: Users, label: '500+', sub: 'Happy Investors', color: '#e63030' },
                { icon: Shield, label: '100%', sub: 'Regulatory Compliant', color: '#c0392b' },
                { icon: TrendingUp, label: '18%+', sub: 'Average Annual Return', color: '#e63030' },
              ].map(({ icon: Icon, label, sub, color }, i) => (
                <div key={label} style={{
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 20, padding: 28, textAlign: 'center',
                  transition: 'all 0.3s',
                  marginTop: i % 2 === 1 ? 28 : 0,
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(230,48,48,0.1)'; e.currentTarget.style.borderColor = 'rgba(230,48,48,0.3)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                >
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: `${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <Icon size={24} style={{ color }} />
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

      {/* ── TESTIMONIALS ── */}
      <section className="section-pad" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="gold-bar" style={{ margin: '0 auto 16px' }} />
            <span className="tag">Client Stories</span>
            <h2 className="section-heading">What Our Clients Say</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28 }}>
            {testimonials.map(({ name, role, text, rating }) => (
              <div key={name} className="card" style={{ padding: 36 }}>
                <div style={{ display: 'flex', gap: 3, marginBottom: 20 }}>
                  {Array(rating).fill(0).map((_, i) => <Star key={i} size={16} fill="#e63030" style={{ color: '#e63030' }} />)}
                </div>
                <p style={{ fontSize: 16, color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: 24, fontStyle: 'italic' }}>"{text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #e63030, #ff6b6b)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, color: '#fff', fontSize: 16, fontFamily: 'var(--font-serif)',
                  }}>{name[0]}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#1a0000', fontSize: 15 }}>{name}</div>
                    <div style={{ fontSize: 13, color: 'var(--gray-400)' }}>{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: '100px 0', position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, #2d0000 0%, #1a0000 100%)',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(230,48,48,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(230,48,48,0.12) 0%, transparent 50%)`,
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div className="gold-bar" style={{ margin: '0 auto 12px' }} />
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, color: '#fff', marginBottom: 20 }}>
            Ready to Build Your Wealth?
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.68)', marginBottom: 44, maxWidth: 540, margin: '0 auto 44px' }}>
            Join over 500 Zambian investors who trust Longhorn Associates with their financial futures. Start today with as little as K100.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/portal" className="btn-primary">
              Open an Account <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn-outline">
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
