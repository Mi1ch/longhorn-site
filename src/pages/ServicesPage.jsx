import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, TrendingUp, Shield, DollarSign, Briefcase, AlertTriangle, ArrowRight, CheckCircle } from 'lucide-react';

const services = [
  {
    id: 'pension', icon: Shield, label: 'Pension Fund Management', color: '#C41E2F',
    image: '/images/Services/Pension.png',
    tagline: 'PIA-regulated retirement security',
    desc: 'Our pension fund management service ensures your retirement savings are professionally managed under strict PIA regulatory oversight. We design bespoke pension solutions for individuals, SMEs, and large corporates — delivering competitive, long-term returns while safeguarding your future.',
    features: ['PIA-licensed and regulated', 'Corporate and individual schemes', 'Risk-graded investment options', 'Regular actuarial reviews', 'Comprehensive member reporting', 'Flexible contribution structures'],
  },
  {
    id: 'unit-trust', icon: TrendingUp, label: 'Unit Trust Fund Management', color: '#2563A8',
    image: '/images/Services/Fund.png',
    tagline: 'SEC-governed collective investment schemes',
    desc: 'Our SEC-governed Unit Trust pools investor funds into 7 professionally managed portfolios — from equities and bonds to property and education funds. Starting from just K100/month, we make diversified investing accessible to every Zambian through our Retail Collective Investment Scheme.',
    features: ['SEC authorised and monitored', '7 professionally managed funds', 'Start with as little as K100/month', 'Tripartite governance structure', 'Online portfolio tracking', 'No maximum investment limit'],
  },
  {
    id: 'credit', icon: DollarSign, label: 'Credit', color: '#0F3D6E',
    image: '/images/Services/Credit.png',
    tagline: 'Flexible financing solutions',
    desc: 'Access tailored credit facilities designed to meet your personal and business funding needs. Backed by our deep understanding of Zambia\'s financial landscape, we provide competitive lending solutions that help you achieve your goals — whether it\'s growing a business, acquiring property, or bridging short-term cash flow gaps.',
    features: ['Competitive interest rates', 'Flexible repayment terms', 'Personal and business credit', 'Quick turnaround on applications', 'Dedicated credit advisor', 'Transparent fee structure'],
  },
  {
    id: 'securities', icon: BarChart2, label: 'Securities & Stock Broking', color: '#C41E2F',
    image: '/images/Services/Broker.png',
    tagline: 'Trade on the Lusaka Securities Exchange',
    desc: 'Buy and sell equities listed on the Lusaka Securities Exchange (LuSE) with expert guidance from our licensed brokers. We provide real-time market insights, research-driven recommendations, and efficient trade execution to help you build and manage your equity portfolio.',
    features: ['Licensed LuSE broker', 'Real-time market data and insights', 'Research-driven trade recommendations', 'Efficient order execution', 'Portfolio monitoring and reporting', 'Access to IPOs and rights issues'],
  },
  {
    id: 'advisory', icon: Briefcase, label: 'Consultancy & Advisory', color: '#2563A8',
    image: '/images/Services/Consult.png',
    tagline: 'Expert financial guidance',
    desc: 'Our licensed advisors provide personalised, objective investment guidance — from portfolio structuring and market analysis to comprehensive financial planning. Whether you are a first-time investor or a seasoned professional, we give you the insight and strategies you need to make confident financial decisions.',
    features: ['Licensed, independent advisors', 'Comprehensive financial needs analysis', 'Market research and commentary', 'Investment proposal and planning', 'Ongoing monitoring and review', 'Multi-asset class coverage'],
  },
  {
    id: 'risk', icon: AlertTriangle, label: 'Risk Management', color: '#0F3D6E',
    image: '/images/Services/Risk.png',
    tagline: 'Protect and preserve your wealth',
    desc: 'We identify, assess and mitigate financial risks across your portfolio using robust, institutional-grade frameworks. Our risk management service ensures your wealth is protected against market volatility, currency fluctuations, and economic uncertainty — giving you peace of mind as your investments grow.',
    features: ['Comprehensive risk assessment', 'Portfolio stress testing', 'Currency and market risk mitigation', 'Regulatory compliance oversight', 'Ongoing risk monitoring', 'Custom risk reporting'],
  },
];

export default function ServicesPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #0F3D6E, #1A4B8C)',
        paddingTop: 140, paddingBottom: 80, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <span className="tag">Our Services</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, color: '#fff', marginBottom: 20 }}>
            What We Do
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)', maxWidth: 600, margin: '0 auto 32px' }}>
            Six core services designed to manage, grow, and protect your wealth — from pension planning to securities trading.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {services.map(s => (
              <a key={s.id} href={`#${s.id}`} style={{
                padding: '8px 16px', borderRadius: 100, fontSize: 13, fontWeight: 600,
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
              >{s.label}</a>
            ))}
          </div>
        </div>
      </section>

      {/* Service cards */}
      <section style={{ background: 'var(--cream)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 60 }}>
            {services.map(({ id, icon: Icon, label, tagline, desc, features, color, image }, i) => (
              <div key={id} id={id} className="card" style={{ display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1fr 1.6fr' : '1.6fr 1fr', gap: 0, overflow: 'hidden' }}>
                {/* Image panel — left on odd */}
                {i % 2 !== 0 && (
                  <div style={{ position: 'relative', overflow: 'hidden', minHeight: 300 }}>
                    <img src={image} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 40%, ${color}cc 100%)`, pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, textAlign: 'center' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 8, background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)' }}>
                        <Icon size={14} style={{ color: '#fff' }} />
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{label}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Text side */}
                <div style={{ padding: 48 }}>
                  {i % 2 === 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
                      <div style={{ width: 60, height: 60, borderRadius: 16, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={28} style={{ color }} />
                      </div>
                      <div>
                        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 700, color: '#0F2E50' }}>{label}</h3>
                        <p style={{ fontSize: 14, color, fontWeight: 600 }}>{tagline}</p>
                      </div>
                    </div>
                  )}
                  {i % 2 !== 0 && (
                    <div style={{ marginBottom: 20 }}>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 700, color: '#0F2E50', marginBottom: 4 }}>{label}</h3>
                      <p style={{ fontSize: 14, color, fontWeight: 600 }}>{tagline}</p>
                    </div>
                  )}
                  <p style={{ fontSize: 16, color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: 28 }}>{desc}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 32 }}>
                    {features.map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        <CheckCircle size={15} style={{ color, marginTop: 2, flexShrink: 0 }} />
                        <span style={{ fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.5 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/contact" className="btn-dark">
                    Enquire Now <ArrowRight size={15} />
                  </Link>
                </div>

                {/* Image panel — right on even */}
                {i % 2 === 0 && (
                  <div style={{ position: 'relative', overflow: 'hidden', minHeight: 300 }}>
                    <img src={image} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 40%, ${color}cc 100%)`, pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, textAlign: 'center' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 8, background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)' }}>
                        <Icon size={14} style={{ color: '#fff' }} />
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{label}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #1A4B8C, #0F3D6E)', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#fff', marginBottom: 16 }}>Not Sure Where to Start?</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 17, marginBottom: 36 }}>Our advisors will help you find the right service for your goals.</p>
          <Link to="/contact" className="btn-primary">Book a Free Consultation <ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}