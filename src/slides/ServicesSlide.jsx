import React, { useState } from 'react';
import {
  BarChart2, TrendingUp, Shield, GraduationCap, Briefcase, BookOpen,
  ArrowRight, CheckCircle, Building, Stethoscope, Award, PieChart, DollarSign
} from 'lucide-react';

/* ─── Main service categories ─── */
const services = [
  {
    id: 'unit-trust',
    icon: TrendingUp,
    label: 'Unit Trust Fund',
    tagline: 'Retail Collective Investment Scheme',
    desc: 'The Longhorn Unit Trust pools investors\' money into professionally managed funds, governed by the Securities and Exchange Commission (SEC). It operates through a tripartite structure: Longhorn Associates as fund manager, an approved bank as custodian, and an independent firm as registered trustee — ensuring your assets are always held separately from the management company.',
    benefits: [
      'Competitive returns aimed at maximising investor value',
      'Regular income with access to invested funds',
      'Professional management by qualified & experienced team',
      'Full transparency via online interaction platform',
      'High liquidity — short turnaround on unit redemption',
      'Diversification across multiple investment options',
    ],
    min: 'K500 lump sum or K100/month',
    hasFunds: true,
  },
  {
    id: 'portfolio',
    icon: BarChart2,
    label: 'Portfolio Management',
    tagline: 'Professionally managed, individually tailored',
    desc: 'Customised investment strategies aligned to your unique financial goals and risk profile. Our licensed fund managers continuously monitor markets and rebalance your portfolio for maximum risk-adjusted returns.',
    benefits: ['Personalised asset allocation', 'Regular portfolio rebalancing', 'Quarterly performance reports', 'Dedicated relationship manager', 'Multi-asset class coverage'],
    min: 'K 10,000',
    hasFunds: false,
  },
  {
    id: 'pension',
    icon: Shield,
    label: 'Pension Fund Management',
    tagline: 'PIA-regulated retirement security',
    desc: 'Our pension fund management ensures retirement savings are professionally managed under strict PIA regulatory oversight. Bespoke pension solutions for individuals, SMEs, and large corporates.',
    benefits: ['PIA-licensed and regulated', 'Corporate & individual schemes', 'Risk-graded options', 'Regular actuarial reviews', 'Flexible contribution structures'],
    min: 'Consultation required',
    hasFunds: false,
  },
  {
    id: 'advisory',
    icon: Briefcase,
    label: 'Investment Advisory',
    tagline: 'Expert guidance for informed decisions',
    desc: 'Our licensed investment advisors provide personalised, objective advice to help you navigate the investment landscape — from first-time investors to seasoned professionals.',
    benefits: ['Licensed, independent advisors', 'Comprehensive needs analysis', 'Market research & commentary', 'Multi-asset class coverage', 'Ongoing monitoring & review'],
    min: 'Contact for rates',
    hasFunds: false,
  },
  {
    id: 'wealth',
    icon: BookOpen,
    label: 'Wealth Management',
    tagline: 'Total financial planning for your legacy',
    desc: 'For high-net-worth individuals and families — a holistic approach to growing, protecting, and transferring wealth across generations. Assets, liabilities, insurance, estate planning, and succession all in one.',
    benefits: ['Holistic financial planning', 'Estate & succession planning', 'Multi-generational strategies', 'Insurance integration', 'Bespoke reporting'],
    min: 'K 250,000+',
    hasFunds: false,
  },
];

/* ─── The 7 Unit Trust sub-funds from the brochure ─── */
const unitTrustFunds = [
  {
    name: 'Listed Equities Fund',
    icon: TrendingUp,
    desc: 'Principally invests in equities listed on the Lusaka Securities Exchange (LuSE).',
    fee: '3.5%',
    risk: 'High',
    color: '#D32F2F',
  },
  {
    name: 'Fixed Income Fund',
    icon: Shield,
    desc: 'Invests in government securities as well as listed securities of reputable institutions.',
    fee: '3.5%',
    risk: 'Low–Medium',
    color: '#1565C0',
  },
  {
    name: 'Listed Property Fund',
    icon: Building,
    desc: 'In-Country & Global property exposure for clients seeking real estate sector participation. Note: to exit, a buyer of your units must first be found.',
    fee: '3.5%',
    risk: 'Medium–High',
    color: '#2E7D32',
  },
  {
    name: 'Multi Assets Class Fund',
    icon: PieChart,
    desc: 'A balanced hybrid fund combining equities, bonds and money market instruments — aimed at competitive returns while managing portfolio risk.',
    fee: '3.5%',
    risk: 'Medium',
    color: '#7B1FA2',
  },
  {
    name: 'Education Fund',
    icon: GraduationCap,
    desc: 'Designed to help investors plan for education needs — their own and their families\'. Build a dedicated growth fund for school fees that rise year on year.',
    fee: '3.5%',
    risk: 'Medium',
    color: '#E65100',
  },
  {
    name: 'White Coat Fund',
    icon: Stethoscope,
    desc: 'An investment fund designed specifically for medical personnel to achieve financial stability and plan their financial future whilst in active service.',
    fee: '2.5%',
    risk: 'Medium',
    color: '#00838F',
  },
  {
    name: 'Gratuity Fund',
    icon: Award,
    desc: 'Provides competitive returns and liquidity by investing in a diversified portfolio of securities. Ideal for end-of-contract or gratuity planning.',
    fee: '3.5%',
    risk: 'Medium',
    color: '#AD1457',
  },
];

export default function ServicesSlide({ onNavigate }) {
  const [active, setActive] = useState(0);
  const svc = services[active];
  const Icon = svc.icon;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--white)' }}>
      {/* Header */}
      <div style={{
        padding: '18px 48px', background: 'var(--white)', borderBottom: '1px solid var(--gray-200)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
      }}>
        <div>
          <span className="section-tag">What We Offer</span>
          <h2 className="section-title" style={{ marginBottom: 0 }}>Our Investment Services</h2>
        </div>
        <button className="btn-primary" onClick={() => onNavigate(4)} style={{ flexShrink: 0 }}>
          Get Started <ArrowRight size={14} />
        </button>
      </div>

      {/* Service tabs */}
      <div style={{
        display: 'flex', gap: 0, borderBottom: '1px solid var(--gray-200)',
        background: 'var(--gray-50)', flexShrink: 0, overflowX: 'auto',
      }}>
        {services.map((s, i) => {
          const SIcon = s.icon;
          return (
            <button key={s.id} onClick={() => setActive(i)} style={{
              flex: 1, minWidth: 140, display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 8, padding: '12px 12px', border: 'none', cursor: 'pointer',
              background: active === i ? 'var(--white)' : 'transparent',
              color: active === i ? 'var(--red)' : 'var(--gray-500)',
              fontFamily: 'var(--font-sans)', fontWeight: active === i ? 700 : 500, fontSize: 13,
              borderBottom: active === i ? '3px solid var(--red)' : '3px solid transparent',
              transition: 'all 0.2s', whiteSpace: 'nowrap',
            }}>
              <SIcon size={15} /><span>{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* Detail area */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left info column */}
        <div style={{
          width: svc.hasFunds ? '42%' : '55%',
          padding: '24px 40px', display: 'flex', flexDirection: 'column',
          justifyContent: 'center', borderRight: '1px solid var(--gray-200)',
          overflowY: 'auto',
          transition: 'width 0.3s',
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14, background: 'var(--red-light)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14,
          }}>
            <Icon size={24} style={{ color: 'var(--red)' }} />
          </div>
          <div className="accent-bar" />
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 4 }}>
            {svc.label}
          </h3>
          <p style={{ fontSize: 13, color: 'var(--red)', fontWeight: 600, marginBottom: 12 }}>{svc.tagline}</p>
          <p style={{ fontSize: 13, color: 'var(--gray-600)', lineHeight: 1.7, marginBottom: 18 }}>{svc.desc}</p>

          {/* Min investment */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '8px 16px', borderRadius: 10,
            background: 'var(--red-light)', border: '1px solid var(--red-100)',
            marginBottom: 16, alignSelf: 'flex-start',
          }}>
            <span style={{ fontSize: 10, color: 'var(--gray-500)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Min. Investment</span>
            <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--red)', fontFamily: 'var(--font-serif)' }}>{svc.min}</span>
          </div>

          <button className="btn-primary" onClick={() => onNavigate(4)} style={{ alignSelf: 'flex-start', fontSize: 13, padding: '10px 22px' }}>
            Enquire <ArrowRight size={14} />
          </button>
        </div>

        {/* Right panel — differs based on service type */}
        <div style={{
          flex: 1, padding: '20px 32px', display: 'flex', flexDirection: 'column',
          justifyContent: 'center', background: 'var(--gray-50)', overflowY: 'auto',
        }}>
          {svc.hasFunds ? (
            /* ─── Unit Trust Sub-Funds Grid ─── */
            <>
              <h4 style={{
                fontSize: 12, fontWeight: 700, color: 'var(--gray-800)',
                textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14,
              }}>
                7 Available Funds
              </h4>
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 10, marginBottom: 12,
              }}>
                {unitTrustFunds.map(fund => {
                  const FIcon = fund.icon;
                  return (
                    <div key={fund.name} style={{
                      background: 'var(--white)', borderRadius: 14, padding: '14px 16px',
                      border: '1px solid var(--gray-100)',
                      boxShadow: 'var(--shadow-sm)',
                      transition: 'all 0.25s', cursor: 'default',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: 8,
                          background: `${fund.color}12`, display: 'flex',
                          alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}>
                          <FIcon size={16} style={{ color: fund.color }} />
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-900)', lineHeight: 1.2 }}>
                            {fund.name}
                          </div>
                        </div>
                      </div>
                      <p style={{ fontSize: 11, color: 'var(--gray-500)', lineHeight: 1.5, marginBottom: 8 }}>
                        {fund.desc}
                      </p>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <span style={{
                          fontSize: 10, fontWeight: 700, padding: '2px 8px',
                          borderRadius: 6, background: 'var(--red-light)', color: 'var(--red)',
                        }}>Fee: {fund.fee} p.a.</span>
                        <span style={{
                          fontSize: 10, fontWeight: 700, padding: '2px 8px',
                          borderRadius: 6, background: 'var(--gray-100)', color: 'var(--gray-600)',
                        }}>Risk: {fund.risk}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p style={{ fontSize: 11, color: 'var(--gray-400)', fontStyle: 'italic', textAlign: 'center' }}>
                Unit values may fluctuate subject to market conditions. A fixed return cannot be guaranteed.
              </p>
            </>
          ) : (
            /* ─── Standard benefits list ─── */
            <div style={{
              background: 'var(--white)', borderRadius: 18, padding: 28,
              boxShadow: 'var(--shadow-md)', border: '1px solid var(--gray-100)',
            }}>
              <h4 style={{
                fontSize: 13, fontWeight: 700, color: 'var(--gray-800)',
                textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20,
              }}>What's Included</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {svc.benefits.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <CheckCircle size={16} style={{ color: 'var(--red)', marginTop: 1, flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.4 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Service dots */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 16 }}>
            {services.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                width: active === i ? 24 : 8, height: 8, borderRadius: 4,
                border: 'none', cursor: 'pointer', padding: 0,
                background: active === i ? 'var(--red)' : 'var(--gray-300)',
                transition: 'all 0.3s',
              }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
