import React, { useState } from 'react';
import {
  CheckCircle, Award, Users, Globe, Target, ArrowRight, Star,
  Shield, TrendingUp, ChevronLeft, ChevronRight, Mail, Phone,
  MapPin, Clock, Lock, FileText, CreditCard, UserCheck, Upload,
  Building2
} from 'lucide-react';

/* ─────────────── ABOUT ─────────────── */
const aboutTabs = ['Our Story', 'Mission & Vision', 'How to Invest'];

const team = [
  { name: 'Loretta Ward', role: 'Founder & CEO', initials: 'LW' },
  { name: 'David Mwansa', role: 'Chief Investment Officer', initials: 'DM' },
  { name: 'Chileshe Banda', role: 'Head of Portfolio Management', initials: 'CB' },
  { name: 'Natasha Phiri', role: 'Client Relations Director', initials: 'NP' },
  { name: 'Brian Zulu', role: 'Risk & Compliance Manager', initials: 'BZ' },
  { name: 'Grace Tembo', role: 'Senior Investment Analyst', initials: 'GT' },
];

export function AboutSlide() {
  const [tab, setTab] = useState(0);
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--white)' }}>
      {/* Header */}
      <div style={{ padding: '20px 48px 0', background: 'var(--white)', borderBottom: '1px solid var(--gray-200)', flexShrink: 0 }}>
        <span className="section-tag">Our Company</span>
        <h2 className="section-title" style={{ marginBottom: 16 }}>About Longhorn Associates</h2>
        <div style={{ display: 'flex', gap: 0 }}>
          {aboutTabs.map((t, i) => (
            <button key={t} onClick={() => setTab(i)} style={{
              padding: '12px 24px', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-sans)', fontSize: 14,
              fontWeight: tab === i ? 700 : 500, background: 'transparent',
              color: tab === i ? 'var(--red)' : 'var(--gray-500)',
              borderBottom: tab === i ? '3px solid var(--red)' : '3px solid transparent',
              transition: 'all 0.2s',
            }}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden' }}>

        {/* Our Story */}
        {tab === 0 && (
          <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '1.2fr 1fr', overflow: 'hidden' }}>
            <div style={{ padding: '28px 48px', overflowY: 'auto' }}>
              <div className="accent-bar" />
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 16 }}>Who We Are</h3>
              <p style={{ fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: 14 }}>
                Longhorn Associates is a Securities and Exchange Commission (SEC) and Pensions and Insurance Authority (PIA) licensed Investment Management Company, founded on the strength of providing value-adding investment options for clients in Zambia and globally.
              </p>
              <p style={{ fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: 14 }}>
                We are Zambian wholly-owned, built by people who understand the local market and the real impact that smart investing can have on communities. We believe every Zambian deserves access to professional investment management.
              </p>
              <p style={{ fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: 24 }}>
                Our flagship Retail Collective Investment Scheme (Unit Trust) houses 7 professionally managed funds, enabling investors to plan for property, education, retirement, and more — starting from just K100 per month.
              </p>
              {['SEC & PIA Licensed', 'LuSE Member', 'Zambian Wholly-Owned', 'Global Investment Access', '4 Branch Locations Nationwide'].map(f => (
                <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                  <CheckCircle size={15} style={{ color: 'var(--red)' }} />
                  <span style={{ fontSize: 14, color: 'var(--gray-600)', fontWeight: 500 }}>{f}</span>
                </div>
              ))}

              {/* Leadership inline */}
              <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid var(--gray-200)' }}>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-800)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>Leadership Team</h4>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {team.map(({ name, role, initials }) => (
                    <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', borderRadius: 10, background: 'var(--gray-50)', border: '1px solid var(--gray-100)' }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--red), #EF5350)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 12, color: '#fff', flexShrink: 0,
                      }}>{initials}</div>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-900)' }}>{name}</div>
                        <div style={{ fontSize: 10, color: 'var(--red)', fontWeight: 600 }}>{role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ padding: '28px 40px', display: 'flex', alignItems: 'center', background: 'var(--gray-50)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, width: '100%' }}>
                {[
                  { icon: Award, label: '15+', sub: 'Years Serving Zambia' },
                  { icon: Users, label: '500+', sub: 'Satisfied Clients' },
                  { icon: Globe, label: '7', sub: 'Unit Trust Funds' },
                  { icon: Target, label: '4', sub: 'Branch Locations' },
                ].map(({ icon: Icon, label, sub }, i) => (
                  <div key={label} style={{
                    padding: 22, borderRadius: 16, background: 'var(--white)',
                    boxShadow: 'var(--shadow-md)', textAlign: 'center',
                    marginTop: i % 2 === 1 ? 20 : 0, border: '1px solid var(--gray-100)',
                  }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12, background: 'var(--red-light)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px',
                    }}><Icon size={20} style={{ color: 'var(--red)' }} /></div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 700, color: 'var(--red)' }}>{label}</div>
                    <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 4, fontWeight: 600 }}>{sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mission & Vision */}
        {tab === 1 && (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '24px 48px', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
              {[
                { label: 'Our Mission', text: 'To enrich society through the delivery of superior investment services, making professional wealth management accessible to every Zambian regardless of income level.' },
                { label: 'Our Vision', text: 'To be the most trusted and impactful investment management company in Zambia, recognised for integrity, performance, and measurable community impact.' },
              ].map(({ label, text }) => (
                <div key={label} style={{ padding: 28, borderRadius: 18, background: 'var(--red)', color: '#fff' }}>
                  <div style={{ width: 40, height: 3, background: 'rgba(255,255,255,0.4)', borderRadius: 2, marginBottom: 14 }} />
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{label}</h3>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.7 }}>{text}</p>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, flex: 1 }}>
              {[
                { Icon: Shield, label: 'Integrity', desc: 'We operate with complete transparency in everything we do.' },
                { Icon: TrendingUp, label: 'Performance', desc: 'We are committed to delivering superior, consistent returns.' },
                { Icon: Users, label: 'Community', desc: "We invest in Zambia's people and its collective prosperity." },
                { Icon: Award, label: 'Excellence', desc: 'We hold ourselves to the highest professional standards.' },
              ].map(({ Icon, label, desc }) => (
                <div key={label} style={{
                  padding: 20, borderRadius: 14, background: 'var(--gray-50)', textAlign: 'center',
                  border: '1px solid var(--gray-200)', display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 12, background: 'var(--red-light)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12,
                  }}><Icon size={20} style={{ color: 'var(--red)' }} /></div>
                  <div style={{ fontWeight: 700, color: 'var(--gray-900)', marginBottom: 6, fontSize: 14 }}>{label}</div>
                  <div style={{ fontSize: 12, color: 'var(--gray-500)', lineHeight: 1.5 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* How to Invest (from brochure) */}
        {tab === 2 && (
          <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden' }}>
            {/* Getting started steps */}
            <div style={{ padding: '28px 48px', overflowY: 'auto' }}>
              <div className="accent-bar" />
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 8 }}>
                Getting Started Is Easy
              </h3>
              <p style={{ fontSize: 14, color: 'var(--gray-500)', lineHeight: 1.7, marginBottom: 24 }}>
                Begin your investment journey with Longhorn Associates in a few simple steps. Download an application form from our website or visit any of our four branches.
              </p>

              {[
                { step: 1, icon: FileText, title: 'Complete Application & KYC', desc: 'Fill out a Longhorn Unit Trust application form and provide: Copy of ID (NRC/Passport), passport-size photo, reference letter from employer/banker/lawyer, and proof of residence (water/electricity bill or bank letter).' },
                { step: 2, icon: CreditCard, title: 'Choose Your Investment Option', desc: 'Invest a lump sum (min. K500) via bank transfer, cheque, or cash deposit — or set up a monthly contribution (min. K100) via DDAC mandate or payroll deduction through your employer.' },
                { step: 3, icon: UserCheck, title: 'Select Your Fund(s)', desc: 'Choose from 7 Unit Trust funds tailored to different goals — Listed Equities, Fixed Income, Property, Multi Assets, Education, White Coat, or Gratuity Fund. You can invest in multiple funds.' },
                { step: 4, icon: TrendingUp, title: 'Track & Grow', desc: 'Access your performance statements and manage your investment through our online interaction platform. No maximum investment limit — increase at any time.' },
              ].map(({ step, icon: SIcon, title, desc }) => (
                <div key={step} style={{
                  display: 'flex', gap: 16, marginBottom: 20,
                  padding: '16px 18px', borderRadius: 14,
                  background: 'var(--gray-50)', border: '1px solid var(--gray-100)',
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: 'var(--red)', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 16, flexShrink: 0,
                  }}>{step}</div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <SIcon size={14} style={{ color: 'var(--red)' }} />
                      <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-900)' }}>{title}</span>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--gray-500)', lineHeight: 1.6 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Investment options summary */}
            <div style={{ padding: '28px 40px', background: 'var(--gray-50)', overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ background: 'var(--white)', borderRadius: 18, padding: 28, boxShadow: 'var(--shadow-md)', border: '1px solid var(--gray-100)', marginBottom: 20 }}>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-800)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 18 }}>
                  Two Ways to Invest
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div style={{
                    padding: 20, borderRadius: 14, background: 'var(--red-light)',
                    border: '1px solid var(--red-100)', textAlign: 'center',
                  }}>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 800, color: 'var(--red)', marginBottom: 4 }}>K500</div>
                    <div style={{ fontSize: 12, color: 'var(--gray-600)', fontWeight: 600 }}>Lump Sum</div>
                    <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 4 }}>One-off investment</div>
                  </div>
                  <div style={{
                    padding: 20, borderRadius: 14, background: 'var(--red-light)',
                    border: '1px solid var(--red-100)', textAlign: 'center',
                  }}>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 800, color: 'var(--red)', marginBottom: 4 }}>K100</div>
                    <div style={{ fontSize: 12, color: 'var(--gray-600)', fontWeight: 600 }}>Monthly</div>
                    <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 4 }}>Via DDAC or Payroll</div>
                  </div>
                </div>
                <p style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 14, textAlign: 'center', fontStyle: 'italic' }}>
                  No maximum limit — increase your investment at any time depending on your liquidity.
                </p>
              </div>

              <div style={{ background: 'var(--white)', borderRadius: 18, padding: 24, boxShadow: 'var(--shadow-md)', border: '1px solid var(--gray-100)' }}>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-800)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
                  How Unit Trusts Make Money
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <div style={{ width: 24, height: 24, borderRadius: 6, background: 'var(--red-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--red)' }}>1</span>
                    </div>
                    <div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-900)' }}>Unit Appreciation</span>
                      <p style={{ fontSize: 12, color: 'var(--gray-500)', lineHeight: 1.5 }}>As the value of investments in the fund increases, so does the value of your units.</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <div style={{ width: 24, height: 24, borderRadius: 6, background: 'var(--red-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--red)' }}>2</span>
                    </div>
                    <div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-900)' }}>Periodic Distributions</span>
                      <p style={{ fontSize: 12, color: 'var(--gray-500)', lineHeight: 1.5 }}>Profits from the fund are passed to investors through distributions — interest, dividends, and other income.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────── INSIGHTS ─────────────── */
const articles = [
  { title: 'Why Every Zambian Should Start Investing in 2025', date: 'Feb 20, 2025', cat: 'Investing 101', excerpt: 'With rising inflation, keeping money in a savings account is no longer enough. Make your Kwacha work harder through our Unit Trust funds starting from just K100/month.', read: '5 min' },
  { title: 'Understanding the 7 Longhorn Unit Trust Funds', date: 'Jan 15, 2025', cat: 'Education', excerpt: 'From Listed Equities to the White Coat Fund — a breakdown of each fund, who they suit, and the annual management fees.', read: '7 min' },
  { title: 'Pension Planning: Why Starting Early Matters', date: 'Dec 10, 2024', cat: 'Retirement', excerpt: 'The compounding effect of early pension contributions is profound. See how starting at 30 vs 40 differs significantly for your retirement.', read: '6 min' },
  { title: 'Zambia Market Update: Q4 2024 Performance', date: 'Nov 28, 2024', cat: 'Market Update', excerpt: 'A review of LuSE equity performance, bond market movements, and our Q1 2025 outlook for Zambian investors.', read: '8 min' },
  { title: 'Education Fund: Plan for Rising School Fees', date: 'Oct 22, 2024', cat: 'Education', excerpt: 'School fees rise year on year. Our Education Fund (3.5% annual fee) helps parents build a dedicated growth fund for their children.', read: '4 min' },
  { title: 'White Coat Fund: Investing for Medical Professionals', date: 'Sep 14, 2024', cat: 'Funds', excerpt: 'A specialised fund designed for medical personnel to achieve financial stability while in active service. Lowest management fee at 2.5% p.a.', read: '9 min' },
];

export function InsightsSlide() {
  const [filter, setFilter] = useState('All');
  const cats = ['All', ...new Set(articles.map(a => a.cat))];
  const filtered = filter === 'All' ? articles : articles.filter(a => a.cat === filter);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--white)' }}>
      <div style={{ padding: '20px 48px 18px', background: 'var(--white)', borderBottom: '1px solid var(--gray-200)', flexShrink: 0 }}>
        <span className="section-tag">Knowledge Hub</span>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <h2 className="section-title" style={{ marginBottom: 0 }}>Insights & Market Updates</h2>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {cats.map(c => (
              <button key={c} onClick={() => setFilter(c)} style={{
                padding: '6px 16px', borderRadius: 100, border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600,
                background: filter === c ? 'var(--red)' : 'var(--gray-100)',
                color: filter === c ? 'var(--white)' : 'var(--gray-600)',
                transition: 'all 0.2s',
              }}>{c}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, padding: '24px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="h-row" style={{ alignItems: 'stretch', paddingBottom: 16 }}>
          {filtered.map(({ title, date, cat, excerpt, read }) => (
            <div key={title} style={{
              width: 300, background: 'var(--white)', borderRadius: 16,
              boxShadow: 'var(--shadow-md)', overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
              border: '1px solid var(--gray-100)', transition: 'all 0.25s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
            >
              <div style={{ height: 4, background: 'var(--red)' }} />
              <div style={{ padding: 22, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
                  <span style={{
                    padding: '3px 10px', borderRadius: 100, fontSize: 10, fontWeight: 700,
                    background: 'var(--red-light)', color: 'var(--red)',
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                  }}>{cat}</span>
                  <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>{read} read</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 10, lineHeight: 1.4 }}>{title}</h3>
                <p style={{ fontSize: 13, color: 'var(--gray-500)', lineHeight: 1.6, flex: 1 }}>{excerpt}</p>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--gray-100)',
                }}>
                  <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>{date}</span>
                  <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600, color: 'var(--red)' }}>
                    Read <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 8, textAlign: 'center' }}>← Scroll to see more articles →</p>
      </div>
    </div>
  );
}

/* ─────────────── CONTACT ─────────────── */
/* Real branch data from brochure */
const branches = [
  {
    name: 'Head Office — Lusaka',
    address: 'Ground Floor, Gardenview Office Park\nPlot 1146/15, Lagos Road, Rhodespark\nP.O. Box 50655, Ridgeway, Lusaka',
    phone: '+260 211 25 25 40',
  },
  {
    name: 'Ndola Branch',
    address: 'Mwasumina Road, Plot 32\nItawa, Ndola',
    phone: '+260 956 55 22 38',
  },
  {
    name: 'Kitwe Branch',
    address: 'Unit E, Second Floor, Building 2\nECL Business Park, Stand 7732\nFreedom Avenue, Kitwe',
    phone: '+260 950 85 36 41',
  },
  {
    name: 'Solwezi Branch',
    address: 'Plot No. 133, Independence Avenue\nFirst Floor, New Jaids Complex\nSolwezi',
    phone: '+260 95 337 8634',
  },
];

export function ContactSlide() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [sent, setSent] = useState(false);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--white)' }}>
      <div style={{ padding: '20px 48px 18px', background: 'var(--white)', borderBottom: '1px solid var(--gray-200)', flexShrink: 0 }}>
        <span className="section-tag">Get In Touch</span>
        <h2 className="section-title" style={{ marginBottom: 0 }}>Contact Our Team</h2>
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1.5fr', overflow: 'hidden' }}>
        {/* Info panel */}
        <div style={{ padding: '24px 28px', overflowY: 'auto', background: 'var(--red)', color: '#fff' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: '#fff', marginBottom: 6, fontWeight: 700 }}>Visit Us</h3>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 18, lineHeight: 1.5 }}>
            Download an application form from our website or visit any of our branches below.
          </p>

          {branches.map(b => (
            <div key={b.name} style={{
              marginBottom: 12, padding: 12, borderRadius: 12,
              background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <Building2 size={12} style={{ color: 'rgba(255,255,255,0.8)' }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{b.name}</span>
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, whiteSpace: 'pre-line', marginBottom: 6 }}>{b.address}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>
                <Phone size={10} /> {b.phone}
              </div>
            </div>
          ))}

          <div style={{ marginTop: 12, padding: 12, borderRadius: 12, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <Mail size={12} style={{ color: 'rgba(255,255,255,0.8)' }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>Email</span>
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.9)' }}>info@longhorn-associates.com</div>
          </div>

          <div style={{ marginTop: 12, padding: 12, borderRadius: 12, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <Clock size={12} style={{ color: 'rgba(255,255,255,0.8)' }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>Business Hours</span>
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>Mon–Fri: 08:00–17:00{'\n'}Sat: 09:00–13:00</div>
          </div>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 14 }}>
            {['SEC Licensed', 'PIA Regulated', 'LuSE Member'].map(b => (
              <div key={b} style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '4px 8px', borderRadius: 6,
                background: 'rgba(255,255,255,0.15)', fontSize: 10, color: '#fff', fontWeight: 600,
              }}><Shield size={8} /> {b}</div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div style={{ padding: '24px 44px', overflowY: 'auto' }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%', background: 'var(--red-light)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
              }}>
                <CheckCircle size={32} style={{ color: 'var(--red)' }} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--gray-900)', marginBottom: 10 }}>Message Sent!</h3>
              <p style={{ color: 'var(--gray-500)', marginBottom: 24 }}>Our team will be in touch within one business day.</p>
              <button onClick={() => setSent(false)} className="btn-primary">Send Another</button>
            </div>
          ) : (
            <>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, color: 'var(--gray-900)', marginBottom: 20 }}>Send Us a Message</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                {[{ k: 'name', l: 'Full Name', t: 'text', p: 'Your full name' }, { k: 'email', l: 'Email', t: 'email', p: 'your@email.com' }].map(({ k, l, t, p }) => (
                  <div key={k}>
                    <label className="f-label">{l}</label>
                    <input type={t} placeholder={p} className="f-input" value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} />
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label className="f-label">Phone</label>
                  <input type="tel" placeholder="+260 ..." className="f-input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div>
                  <label className="f-label">Service of Interest</label>
                  <select className="f-input" value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                    <option value="">Select a service...</option>
                    {['Unit Trust — Listed Equities', 'Unit Trust — Fixed Income', 'Unit Trust — Property', 'Unit Trust — Multi Assets', 'Unit Trust — Education Fund', 'Unit Trust — White Coat Fund', 'Unit Trust — Gratuity Fund', 'Portfolio Management', 'Pension Fund', 'Investment Advisory', 'Wealth Management', 'General Enquiry'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label className="f-label">Message</label>
                <textarea placeholder="Tell us about your investment goals..." className="f-input" rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ resize: 'vertical' }} />
              </div>
              <button className="btn-primary" onClick={() => setSent(true)}>
                Send Message <ArrowRight size={14} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────── PORTAL ─────────────── */
export function PortalSlide() {
  const [tab, setTab] = useState('login');
  const [step, setStep] = useState(1);
  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: 10,
    border: '1.5px solid var(--gray-200)', fontSize: 14,
    fontFamily: 'var(--font-sans)', outline: 'none',
    color: 'var(--gray-800)', background: 'var(--white)',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };
  const labelStyle = { display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 5 };
  const focusHandler = e => { e.target.style.borderColor = 'var(--red)'; e.target.style.boxShadow = '0 0 0 3px rgba(211,47,47,0.08)'; };
  const blurHandler = e => { e.target.style.borderColor = 'var(--gray-200)'; e.target.style.boxShadow = 'none'; };

  return (
    <div style={{
      height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--gray-50)', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: '-30%', right: '-15%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(211,47,47,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 460, position: 'relative', zIndex: 1, padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: 'var(--red-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
            <Lock size={24} style={{ color: 'var(--red)' }} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 4 }}>Investor Portal</h3>
          <p style={{ fontSize: 13, color: 'var(--gray-400)' }}>Secure access to your investments</p>
        </div>

        <div style={{ display: 'flex', background: 'var(--gray-100)', borderRadius: 12, padding: 4, marginBottom: 20 }}>
          {['login', 'register'].map(t => (
            <button key={t} onClick={() => { setTab(t); setStep(1); }} style={{
              flex: 1, padding: '10px 0', borderRadius: 9, border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14,
              background: tab === t ? 'var(--red)' : 'transparent',
              color: tab === t ? '#fff' : 'var(--gray-500)', transition: 'all 0.25s',
            }}>{t === 'login' ? 'Sign In' : 'Register'}</button>
          ))}
        </div>

        <div style={{ background: 'var(--white)', borderRadius: 20, padding: 32, border: '1px solid var(--gray-200)', boxShadow: 'var(--shadow-lg)' }}>
          {tab === 'login' ? (
            <>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--gray-900)', marginBottom: 20 }}>Welcome Back</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[{ l: 'Email Address', t: 'email', p: 'your@email.com' }, { l: 'Password', t: 'password', p: '••••••••' }].map(({ l, t, p }) => (
                  <div key={l}>
                    <label style={labelStyle}>{l}</label>
                    <input type={t} placeholder={p} style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
                  </div>
                ))}
                <div style={{ textAlign: 'right', marginTop: -6 }}>
                  <a href="#" style={{ fontSize: 12, color: 'var(--red)', fontWeight: 600 }}>Forgot password?</a>
                </div>
                <button className="btn-primary" style={{ justifyContent: 'center', width: '100%' }}>Sign In to Portal</button>
              </div>
            </>
          ) : (
            <>
              <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
                {[1, 2, 3].map(s => (
                  <div key={s} style={{ flex: 1, height: 3, borderRadius: 2, background: s <= step ? 'var(--red)' : 'var(--gray-200)', transition: 'background 0.3s' }} />
                ))}
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--gray-900)', marginBottom: 4 }}>
                {step === 1 ? 'Personal Details' : step === 2 ? 'Investment Profile' : 'Upload Documents'}
              </h3>
              <p style={{ fontSize: 12, color: 'var(--gray-400)', marginBottom: 18 }}>Step {step} of 3</p>

              {step === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {['First Name', 'Last Name'].map(l => (
                      <div key={l}><label style={labelStyle}>{l}</label><input type="text" style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} /></div>
                    ))}
                  </div>
                  {['Email Address', 'Phone Number', 'NRC / Passport Number'].map(l => (
                    <div key={l}><label style={labelStyle}>{l}</label><input type="text" style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} /></div>
                  ))}
                  <button className="btn-primary" style={{ justifyContent: 'center', marginTop: 4 }} onClick={() => setStep(2)}>
                    Next <ChevronRight size={14} />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div>
                    <label style={labelStyle}>Fund of Interest</label>
                    <select style={inputStyle}>
                      {['Listed Equities Fund', 'Fixed Income Fund', 'Listed Property Fund', 'Multi Assets Class Fund', 'Education Fund', 'White Coat Fund', 'Gratuity Fund'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Investment Amount (ZMW)</label>
                    <input type="number" placeholder="Min. K500 lump sum or K100/month" style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
                  </div>
                  <label style={labelStyle}>Investment Type</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {['Lump Sum (K500+)', 'Monthly DDAC (K100+)', 'Payroll Deduction'].map(r => (
                      <button key={r} style={{
                        flex: 1, padding: '9px 4px', borderRadius: 8,
                        border: '1.5px solid var(--gray-200)', background: 'transparent',
                        color: 'var(--gray-500)', fontSize: 11, fontWeight: 600,
                        cursor: 'pointer', fontFamily: 'var(--font-sans)', transition: 'all 0.2s',
                      }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--red)'; e.currentTarget.style.color = 'var(--red)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--gray-200)'; e.currentTarget.style.color = 'var(--gray-500)'; }}
                      >{r}</button>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                    <button onClick={() => setStep(1)} className="btn-outline" style={{ flex: 1, justifyContent: 'center' }}>Back</button>
                    <button className="btn-primary" style={{ flex: 2, justifyContent: 'center' }} onClick={() => setStep(3)}>
                      Next <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {['Copy of ID (NRC / Passport)', 'Passport Size Photo', 'Reference Letter (Employer/Banker/Lawyer)', 'Proof of Residence (Utility Bill / Bank Letter)'].map(l => (
                    <div key={l} style={{
                      padding: 14, borderRadius: 10, border: '1.5px dashed var(--gray-300)',
                      textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--red)'; e.currentTarget.style.background = 'var(--red-50)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--gray-300)'; e.currentTarget.style.background = 'transparent'; }}
                    >
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-800)', marginBottom: 2 }}>{l}</div>
                      <div style={{ fontSize: 11, color: 'var(--red)', fontWeight: 600 }}>+ Click to upload</div>
                    </div>
                  ))}
                  <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                    <button onClick={() => setStep(2)} className="btn-outline" style={{ flex: 1, justifyContent: 'center' }}>Back</button>
                    <button className="btn-primary" style={{ flex: 2, justifyContent: 'center' }}
                      onClick={() => alert('Registration submitted! Our team will review your application within 2 business days.')}>
                      Submit Application
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <p style={{ textAlign: 'center', fontSize: 10, color: 'var(--gray-400)', marginTop: 14 }}>
          256-bit SSL encryption · Regulated by SEC & PIA Zambia
        </p>
      </div>
    </div>
  );
}
