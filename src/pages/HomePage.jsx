import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp, Shield, Users, Award, ArrowRight, ChevronDown,
  BarChart2, BookOpen, GraduationCap, Briefcase, Star, CheckCircle,
  Play, Building, PieChart, ChevronLeft, ChevronRight, DollarSign,
  AlertTriangle, Search
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

/* ── Color palette ── */
const blue = {
  primary: '#2563A8',
  dark: '#1A4B8C',
  deeper: '#0F3D6E',
  light: '#3B7DD8',
  bg: '#F0F5FB',
  bg2: '#E1ECF7',
  text: '#0F2E50',
};
const accent = '#C41E2F';

/* ─────────────────────────────────────────────
   HERO SLIDES — 6 services across 5 banners
   Place Banner1.jpeg – Banner5.jpeg in public/images/
   ───────────────────────────────────────────── */
const heroSlides = [
  {
    image: '/images/Banner1.jpeg',
    icon: Shield,
    title: 'Pension Fund Management',
    subtitle: 'Secure Your Retirement',
    desc: 'We manage pension portfolios under strict PIA regulatory oversight — ensuring your retirement savings grow safely while delivering competitive, long-term returns for individuals and corporates.',
  },
  {
    image: '/images/Banner2.jpeg',
    icon: TrendingUp,
    title: 'Unit Trust Fund Management',
    subtitle: 'Invest From Just K100/Month',
    desc: 'Our SEC-governed Unit Trust pools investor funds into 7 professionally managed portfolios — from equities to property — making diversified investing accessible to every Zambian.',
  },
  {
    image: '/images/Banner3.jpeg',
    icon: DollarSign,
    title: 'Credit',
    subtitle: 'Flexible Financing Solutions',
    desc: 'Access tailored credit facilities designed to meet your personal and business funding needs, backed by our deep understanding of Zambia\'s financial landscape.',
  },
  {
    image: '/images/Banner4.jpeg',
    icon: BarChart2,
    title: 'Securities & Stock Broking',
    subtitle: 'Trade on the LuSE',
    desc: 'Buy and sell equities listed on the Lusaka Securities Exchange with expert guidance from our licensed brokers. Access real-time market insights and execution.',
  },
  {
    image: '/images/Banner5.jpeg',
    icon: Briefcase,
    title: 'Consultancy & Advisory',
    subtitle: 'Expert Financial Guidance',
    desc: 'Our licensed advisors provide personalised, objective investment guidance — from portfolio structuring and market analysis to comprehensive financial planning.',
  },
  {
    image: '/images/Banner1.jpeg',
    icon: AlertTriangle,
    title: 'Risk Management',
    subtitle: 'Protect Your Investments',
    desc: 'We identify, assess and mitigate financial risks across your portfolio using robust frameworks — ensuring your wealth is protected against market volatility and uncertainty.',
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
  { value: 6, suffix: '', label: 'Core Services' },
];

export default function HomePage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setHeroLoaded(true), 100);
    window.scrollTo(0, 0);
  }, []);

  /* Auto-rotate every 6 seconds */
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timerRef.current);
  }, []);

  const goToSlide = (idx) => {
    setCurrentSlide(idx);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 6000);
  };

  const prevSlide = () => goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);
  const nextSlide = () => goToSlide((currentSlide + 1) % heroSlides.length);

  const slide = heroSlides[currentSlide];
  const SlideIcon = slide.icon;

  return (
    <div>

      {/* ══════════════════════════════════════════
          HERO — Cycling banners, no overlay
          ══════════════════════════════════════════ */}
      <section style={{
        height: 340, minHeight: 340, maxHeight: 340,
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center',
      }}>
        {/* Background images — stacked, crossfade */}
        {heroSlides.map((s, i) => (
          <div key={i} style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${s.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
            backgroundRepeat: 'no-repeat',
            opacity: currentSlide === i ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
          }} />
        ))}

        {/* Subtle dark gradient behind text only — keeps text readable without tinting the whole image */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 50%, transparent 75%)',
          pointerEvents: 'none',
        }} />

        {/* Slide content */}
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            maxWidth: 560,
            opacity: heroLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}>
            {/* Service tag */}
            <div key={`tag-${currentSlide}`} style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '6px 16px', borderRadius: 6,
              background: 'rgba(196,30,47,0.7)', border: '1px solid rgba(196,30,47,0.8)',
              marginBottom: 16,
              animation: 'fadeUp 0.6s ease both',
            }}>
              <SlideIcon size={14} style={{ color: '#fff' }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {slide.title}
              </span>
            </div>

            <h1 key={`h-${currentSlide}`} style={{
              fontFamily: 'var(--font-serif)', fontWeight: 700,
              fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', lineHeight: 1.15,
              color: '#fff', marginBottom: 12,
              textShadow: '0 2px 12px rgba(0,0,0,0.5)',
              animation: 'fadeUp 0.6s ease 0.1s both',
            }}>
              {slide.subtitle}
            </h1>

            <p key={`p-${currentSlide}`} style={{
              fontSize: 14, color: 'rgba(255,255,255,0.92)', lineHeight: 1.7,
              marginBottom: 22, maxWidth: 480,
              textShadow: '0 1px 6px rgba(0,0,0,0.4)',
              animation: 'fadeUp 0.6s ease 0.2s both',
            }}>
              {slide.desc}
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', animation: 'fadeUp 0.6s ease 0.3s both' }}>
              <Link to="/services" className="btn-primary" style={{ background: accent, padding: '11px 24px', fontSize: 13 }}>
                Learn More <ArrowRight size={14} />
              </Link>
              <Link to="/contact" className="btn-outline" style={{ borderColor: 'rgba(255,255,255,0.6)', color: '#fff', padding: '11px 24px', fontSize: 13, backdropFilter: 'blur(4px)', background: 'rgba(255,255,255,0.12)' }}>
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

        {/* Arrows */}
        <button onClick={prevSlide} style={{
          position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
          width: 44, height: 44, borderRadius: '50%', background: 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: '#fff', zIndex: 10, transition: 'all 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.3)'}
        ><ChevronLeft size={20} /></button>

        <button onClick={nextSlide} style={{
          position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
          width: 44, height: 44, borderRadius: '50%', background: 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: '#fff', zIndex: 10, transition: 'all 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.3)'}
        ><ChevronRight size={20} /></button>

        {/* Dots */}
        <div style={{
          position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: 8, zIndex: 10,
          padding: '6px 14px', background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(8px)',
          borderRadius: 20,
        }}>
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => goToSlide(i)} style={{
              width: currentSlide === i ? 24 : 8, height: 8,
              borderRadius: currentSlide === i ? 4 : 50,
              border: 'none', cursor: 'pointer', padding: 0,
              background: currentSlide === i ? accent : 'rgba(255,255,255,0.5)',
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>

        {/* Progress bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(255,255,255,0.15)', zIndex: 10 }}>
          <div key={`prog-${currentSlide}`} style={{
            height: '100%', background: accent, borderRadius: '0 2px 2px 0',
            animation: 'progressBar 6s linear both',
          }} />
        </div>

        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes progressBar {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}</style>
      </section>


      {/* ══════════════════════════════════════════
          STATS
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
      </section>


      {/* ══════════════════════════════════════════
          WHY US
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
          CTA
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
