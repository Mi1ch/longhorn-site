import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, TrendingUp, Shield, GraduationCap, Briefcase, BookOpen, ArrowRight, CheckCircle } from 'lucide-react';

const services = [
  {
    id: 'portfolio', icon: BarChart2, label: 'Portfolio Management', color: '#c0392b',
    tagline: 'Professionally managed, individually tailored',
    desc: 'Our portfolio management service delivers customised investment strategies aligned to your unique financial goals and risk profile. Our licensed fund managers continuously monitor markets and rebalance your portfolio to maximise risk-adjusted returns.',
    features: ['Personalised asset allocation strategy', 'Regular portfolio rebalancing', 'Quarterly performance reporting', 'Dedicated relationship manager', 'Access to equities, bonds, and money market instruments'],
    minInvestment: 'K 10,000',
  },
  {
    id: 'unit-trust', icon: TrendingUp, label: 'Unit Trust Fund', color: '#e63030',
    tagline: 'Accessible investing for every Zambian',
    desc: 'Pool your resources with other investors to access professionally managed, diversified portfolios. Our Unit Trust is designed to make quality investing accessible to everyone, whether you\'re just starting out or growing an existing portfolio.',
    features: ['Start with as little as K100/month', 'Instant diversification', 'Professional fund management', 'Daily liquidity options', 'Transparent NAV reporting', 'No hidden fees'],
    minInvestment: 'K 100 / month',
  },
  {
    id: 'pension', icon: Shield, label: 'Pension Fund Management', color: '#2d0000',
    tagline: 'PIA-regulated retirement security',
    desc: 'Our pension fund management service ensures your retirement savings are professionally managed under strict PIA regulatory oversight. We design bespoke pension solutions for individuals, SMEs, and large corporates.',
    features: ['PIA-licensed and regulated', 'Corporate and individual schemes', 'Risk-graded investment options', 'Regular actuarial reviews', 'Comprehensive member reporting', 'Flexible contribution structures'],
    minInvestment: 'Consultation required',
  },
  {
    id: 'education', icon: GraduationCap, label: 'Education Fund', color: '#e63030',
    tagline: 'Invest in your child\'s future today',
    desc: 'The Longhorn Education Fund is a specially designed savings and investment vehicle to help parents and guardians fund their children\'s education. With competitive returns and flexible terms, this is the smart way to plan ahead.',
    features: ['Start from K100/month', '1-year minimum investment period', 'Competitive, tax-efficient returns', 'Milestone-linked payout options', 'Flexible top-up contributions', 'Dedicated education planning advisor'],
    minInvestment: 'K 100 / month',
  },
  {
    id: 'advisory', icon: Briefcase, label: 'Investment Advisory', color: '#c0392b',
    tagline: 'Expert guidance for informed decisions',
    desc: 'Our licensed investment advisors provide personalised, objective advice to help you navigate the investment landscape. Whether you are a first-time investor or a seasoned professional, we give you the insight you need to make confident financial decisions.',
    features: ['Licensed, independent advisors', 'Comprehensive financial needs analysis', 'Market research and commentary', 'Investment proposal and planning', 'Ongoing monitoring and review', 'Multi-asset class coverage'],
    minInvestment: 'Contact for rates',
  },
  {
    id: 'wealth', icon: BookOpen, label: 'Wealth Management', color: '#e63030',
    tagline: 'Total financial planning for your legacy',
    desc: 'For high-net-worth individuals and families, our Wealth Management service provides a holistic approach to growing, protecting, and transferring wealth across generations. We look at the entire picture — assets, liabilities, insurance, estate planning, and succession.',
    features: ['Holistic financial planning', 'Estate and succession planning', 'Multi-generational wealth strategies', 'Insurance and risk management integration', 'Bespoke reporting and analytics', 'Priority client service team'],
    minInvestment: 'K 250,000+',
  },
];

export default function ServicesPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #1a0000, #2d0000)',
        paddingTop: 140, paddingBottom: 80, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <span className="tag">Our Products</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, color: '#fff', marginBottom: 20 }}>
            Investment Solutions
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)', maxWidth: 600, margin: '0 auto 32px' }}>
            Six carefully designed products to serve every stage of your financial journey — from your first investment to your legacy.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {services.map(s => (
              <a key={s.id} href={`#${s.id}`} style={{
                padding: '8px 16px', borderRadius: 100, fontSize: 13, fontWeight: 600,
                background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)',
                color: '#e63030', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.15)'; }}
              >{s.label}</a>
            ))}
          </div>
        </div>
      </section>

      {/* Service cards */}
      <section style={{ background: 'var(--cream)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 60 }}>
            {services.map(({ id, icon: Icon, label, tagline, desc, features, minInvestment, color }, i) => (
              <div key={id} id={id} className="card" style={{ display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1fr 1.6fr' : '1.6fr 1fr', gap: 0, overflow: 'hidden' }}>
                {/* Colored side */}
                {i % 2 !== 0 && (
                  <div style={{ padding: 48, background: color, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Icon size={48} style={{ color: 'rgba(255,255,255,0.9)', marginBottom: 24 }} />
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 12 }}>{label}</h3>
                    <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: 24 }}>{tagline}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.12)', width: 'fit-content' }}>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Min. Investment</span>
                      <span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{minInvestment}</span>
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
                        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 700, color: 'var(--green-dark)' }}>{label}</h3>
                        <p style={{ fontSize: 14, color, fontWeight: 600 }}>{tagline}</p>
                      </div>
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
                  {i % 2 === 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 24, paddingTop: 20, borderTop: '1px solid var(--gray-100)' }}>
                      <div>
                        <div style={{ fontSize: 11, color: 'var(--gray-400)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Minimum Investment</div>
                        <div style={{ fontSize: 18, fontWeight: 700, color, fontFamily: 'var(--font-serif)' }}>{minInvestment}</div>
                      </div>
                      <Link to="/contact" className="btn-dark" style={{ marginLeft: 'auto' }}>
                        Get Started <ArrowRight size={15} />
                      </Link>
                    </div>
                  )}
                  {i % 2 !== 0 && (
                    <Link to="/contact" className="btn-dark">
                      Get Started <ArrowRight size={15} />
                    </Link>
                  )}
                </div>
                {/* Colored side for even items */}
                {i % 2 === 0 && (
                  <div style={{ padding: 48, background: color, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <Icon size={64} style={{ color: 'rgba(255,255,255,0.9)', marginBottom: 24 }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderRadius: 12, background: 'rgba(0,0,0,0.15)', width: 'fit-content' }}>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Product</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{label}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--green-dark)', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#fff', marginBottom: 16 }}>Not Sure Where to Start?</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 17, marginBottom: 36 }}>Our advisors will help you find the right product for your goals and budget.</p>
          <Link to="/contact" className="btn-primary">Book a Free Consultation <ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}
