import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Award, Users, Globe, Target } from 'lucide-react';

const team = [
  { name: 'Loretta Ward', role: 'Founder & CEO', initials: 'LW', color: '#c0392b' },
  { name: 'David Mwansa', role: 'Chief Investment Officer', initials: 'DM', color: '#e63030' },
  { name: 'Chileshe Banda', role: 'Head of Portfolio Management', initials: 'CB', color: '#e63030' },
  { name: 'Natasha Phiri', role: 'Client Relations Director', initials: 'NP', color: '#2d0000' },
];

export function AboutPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div>
      <section style={{ background: 'linear-gradient(135deg, #1a0000, #2d0000)', paddingTop: 140, paddingBottom: 80 }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="tag">Our Story</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, color: '#fff', marginBottom: 20 }}>
            About Longhorn Associates
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)', maxWidth: 620, margin: '0 auto' }}>
            A proudly Zambian investment management company committed to enriching society through superior investment services.
          </p>
        </div>
      </section>

      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <div className="gold-bar" />
              <h2 className="section-heading" style={{ marginBottom: 20 }}>Who We Are</h2>
              <p style={{ fontSize: 16, color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: 20 }}>
                Longhorn Associates is a Securities and Exchange Commission (SEC) and Pensions and Insurance Authority (PIA) licensed and regulated Investment Management Company, founded on the strength of providing value-adding investment options for clients in Zambia and globally.
              </p>
              <p style={{ fontSize: 16, color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: 32 }}>
                We are Zambian wholly-owned, built by people who understand the local market, the aspirations of Zambian families, and the real impact that smart investing can have on communities. We believe every Zambian deserves access to professional investment management — not just the wealthy few.
              </p>
              {[
                'Licensed by SEC and PIA Zambia', 'Member of the Lusaka Securities Exchange (LuSE)',
                'Zambian wholly-owned company', 'Serving clients locally and globally',
              ].map(f => (
                <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
                  <CheckCircle size={16} style={{ color: 'var(--green-accent)' }} />
                  <span style={{ fontSize: 15, color: 'var(--gray-600)', fontWeight: 500 }}>{f}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {[
                { icon: Award, label: '15+', sub: 'Years Serving Zambia', color: '#e63030' },
                { icon: Users, label: '500+', sub: 'Satisfied Clients', color: '#c0392b' },
                { icon: Globe, label: 'Global', sub: 'Investment Access', color: '#e63030' },
                { icon: Target, label: '12+', sub: 'Investment Products', color: '#2d0000' },
              ].map(({ icon: Icon, label, sub, color }, i) => (
                <div key={label} style={{
                  padding: 28, borderRadius: 20, background: '#fff', boxShadow: 'var(--shadow-md)',
                  textAlign: 'center', marginTop: i % 2 === 1 ? 24 : 0,
                }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                    <Icon size={24} style={{ color }} />
                  </div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 700, color: 'var(--green-dark)' }}>{label}</div>
                  <div style={{ fontSize: 12, color: 'var(--gray-400)', fontWeight: 500, marginTop: 4 }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ background: 'var(--green-mid)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
            {[
              { label: 'Our Mission', text: 'To enrich society through the delivery of superior investment services, making professional wealth management accessible to every Zambian.' },
              { label: 'Our Vision', text: 'To be the most trusted and impactful investment management company in Zambia, recognised for integrity, performance, and community impact.' },
            ].map(({ label, text }) => (
              <div key={label} style={{ padding: 40, borderRadius: 20, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(201,168,76,0.2)' }}>
                <div className="gold-bar" />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 16 }}>{label}</h3>
                <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="gold-bar" style={{ margin: '0 auto 12px' }} />
            <h2 className="section-heading">Leadership Team</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 28 }}>
            {team.map(({ name, role, initials, color }) => (
              <div key={name} className="card" style={{ padding: 32, textAlign: 'center' }}>
                <div style={{
                  width: 80, height: 80, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${color}, ${color}88)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 26, color: '#fff',
                }}>{initials}</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 700, color: 'var(--green-dark)', marginBottom: 6 }}>{name}</h3>
                <p style={{ fontSize: 13, color, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─────────── INSIGHTS ───────────
const articles = [
  { title: 'Why Every Zambian Should Start Investing in 2025', date: 'Feb 20, 2025', category: 'Investing 101', excerpt: 'With rising inflation and currency pressures, keeping your money in a savings account is no longer enough. Here\'s how to make your Kwacha work harder.', readTime: '5 min read' },
  { title: 'Understanding Unit Trusts: A Beginner\'s Guide', date: 'Jan 15, 2025', category: 'Education', excerpt: 'Unit trusts allow you to invest in a diversified portfolio managed by professionals. We break down exactly how they work and why they suit most Zambians.', readTime: '7 min read' },
  { title: 'Pension Planning: Why Starting Early Matters', date: 'Dec 10, 2024', category: 'Retirement', excerpt: 'The compounding effect of early pension contributions cannot be overstated. See how starting at 30 vs 40 impacts your retirement fund significantly.', readTime: '6 min read' },
  { title: 'Zambia Market Update: Q4 2024 Performance', date: 'Nov 28, 2024', category: 'Market Update', excerpt: 'A review of LuSE equity performance, bond market movements, and our outlook for the first quarter of 2025 for Zambian investors.', readTime: '8 min read' },
  { title: 'Education Fund: Invest in Tomorrow Today', date: 'Oct 22, 2024', category: 'Education', excerpt: 'School fees are rising year on year. Discover how our Education Fund helps parents build a dedicated fund that grows alongside their child.', readTime: '4 min read' },
  { title: 'Legacy Planning: Building Wealth for Generations', date: 'Sep 14, 2024', category: 'Wealth Management', excerpt: 'True wealth isn\'t about what you accumulate — it\'s about what you leave behind. Explore strategies for multigenerational wealth transfer in Zambia.', readTime: '9 min read' },
];

const categoryColors = { 'Investing 101': '#c0392b', 'Education': '#e63030', 'Retirement': '#e63030', 'Market Update': '#2d0000', 'Wealth Management': '#e63030' };

export function InsightsPage() {
  const [active, setActive] = useState('All');
  const categories = ['All', ...new Set(articles.map(a => a.category))];
  const filtered = active === 'All' ? articles : articles.filter(a => a.category === active);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div>
      <section style={{ background: 'linear-gradient(135deg, #1a0000, #2d0000)', paddingTop: 140, paddingBottom: 80 }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="tag">Knowledge Hub</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, color: '#fff', marginBottom: 20 }}>
            Insights & Market Updates
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)', maxWidth: 580, margin: '0 auto' }}>
            Expert analysis, investment education, and market commentary from our team of licensed professionals.
          </p>
        </div>
      </section>

      <section style={{ background: 'var(--cream)', padding: '80px 0' }}>
        <div className="container">
          {/* Filter */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 48, flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActive(cat)} style={{
                padding: '8px 20px', borderRadius: 100, fontSize: 14, fontWeight: 600, cursor: 'pointer',
                background: active === cat ? 'var(--green-dark)' : '#fff',
                color: active === cat ? '#e63030' : 'var(--gray-600)',
                border: active === cat ? '2px solid var(--green-dark)' : '2px solid var(--gray-200)',
                transition: 'all 0.2s', fontFamily: 'var(--font-sans)',
              }}>{cat}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 32 }}>
            {filtered.map(({ title, date, category, excerpt, readTime }) => (
              <div key={title} className="card" style={{ overflow: 'hidden' }}>
                <div style={{ height: 6, background: categoryColors[category] || 'var(--green-accent)' }} />
                <div style={{ padding: 32 }}>
                  <div style={{ display: 'flex', gap: 10, marginBottom: 16, alignItems: 'center' }}>
                    <span style={{
                      padding: '4px 12px', borderRadius: 100, fontSize: 11, fontWeight: 700,
                      background: `${categoryColors[category] || '#c0392b'}18`, color: categoryColors[category] || '#c0392b',
                      textTransform: 'uppercase', letterSpacing: '0.08em',
                    }}>{category}</span>
                    <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>{readTime}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 19, fontWeight: 700, color: 'var(--green-dark)', marginBottom: 12, lineHeight: 1.4 }}>{title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.7, marginBottom: 24 }}>{excerpt}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid var(--gray-100)' }}>
                    <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>{date}</span>
                    <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: 'var(--green-accent)', transition: 'gap 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                      onMouseLeave={e => e.currentTarget.style.gap = '6px'}
                    >Read More <ArrowRight size={14} /></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─────────── CONTACT ───────────
export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [sent, setSent] = useState(false);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div>
      <section style={{ background: 'linear-gradient(135deg, #1a0000, #2d0000)', paddingTop: 140, paddingBottom: 80 }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="tag">Get In Touch</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, color: '#fff', marginBottom: 20 }}>Contact Us</h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)', maxWidth: 540, margin: '0 auto' }}>
            Our team of licensed advisors is ready to help you start or grow your investment journey.
          </p>
        </div>
      </section>

      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 60, alignItems: 'start' }}>
            {/* Info */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, color: 'var(--green-dark)', marginBottom: 24 }}>Visit or Call Us</h2>
              {[
                { label: 'Office Address', value: 'Ground Floor, Office Park\nPlot 1146/15, Lagos Road\nP.O. Box 50655, Lusaka, Zambia' },
                { label: 'Phone', value: '+260 252 540' },
                { label: 'Email', value: 'info@longhorn-associates.com' },
                { label: 'Business Hours', value: 'Monday – Friday: 08:00 – 17:00\nSaturday: 09:00 – 13:00' },
              ].map(({ label, value }) => (
                <div key={label} style={{ marginBottom: 28, padding: 20, background: '#fff', borderRadius: 14, boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--green-accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>{label}</div>
                  <div style={{ fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{value}</div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div style={{ background: '#fff', borderRadius: 24, padding: 48, boxShadow: 'var(--shadow-lg)' }}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <CheckCircle size={56} style={{ color: 'var(--green-accent)', margin: '0 auto 20px' }} />
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, color: 'var(--green-dark)', marginBottom: 12 }}>Message Sent!</h3>
                  <p style={{ color: 'var(--gray-600)', marginBottom: 24 }}>Our team will be in touch within one business day.</p>
                  <button onClick={() => setSent(false)} className="btn-dark">Send Another Message</button>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, color: 'var(--green-dark)', marginBottom: 8 }}>Send Us a Message</h3>
                  <p style={{ color: 'var(--gray-400)', fontSize: 14, marginBottom: 28 }}>We typically respond within one business day.</p>
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    {[
                      { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
                      { key: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
                      { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+260 ...' },
                    ].map(({ key, label, type, placeholder }) => (
                      <div key={key}>
                        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--gray-800)', marginBottom: 6 }}>{label}</label>
                        <input type={type} placeholder={placeholder} value={form[key]}
                          onChange={e => setForm({ ...form, [key]: e.target.value })}
                          style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1.5px solid var(--gray-200)', fontSize: 15, fontFamily: 'var(--font-sans)', outline: 'none', color: 'var(--text-dark)', transition: 'border-color 0.2s' }}
                          onFocus={e => e.target.style.borderColor = 'var(--green-accent)'}
                          onBlur={e => e.target.style.borderColor = 'var(--gray-200)'}
                        />
                      </div>
                    ))}
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--gray-800)', marginBottom: 6 }}>Service of Interest</label>
                      <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1.5px solid var(--gray-200)', fontSize: 15, fontFamily: 'var(--font-sans)', outline: 'none', color: form.service ? 'var(--text-dark)' : 'var(--gray-400)', background: '#fff' }}>
                        <option value="">Select a service...</option>
                        {['Portfolio Management', 'Unit Trust Fund', 'Pension Fund', 'Education Fund', 'Investment Advisory', 'Wealth Management', 'General Enquiry'].map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--gray-800)', marginBottom: 6 }}>Message</label>
                      <textarea placeholder="Tell us about your investment goals or any questions you have..." value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        rows={4}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1.5px solid var(--gray-200)', fontSize: 15, fontFamily: 'var(--font-sans)', outline: 'none', color: 'var(--text-dark)', resize: 'vertical' }}
                        onFocus={e => e.target.style.borderColor = 'var(--green-accent)'}
                        onBlur={e => e.target.style.borderColor = 'var(--gray-200)'}
                      />
                    </div>
                    <button type="submit" className="btn-primary" style={{ justifyContent: 'center', marginTop: 4 }}>
                      Send Message <ArrowRight size={16} />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─────────── CLIENT PORTAL ───────────
export function PortalPage() {
  const [tab, setTab] = useState('login');
  const [step, setStep] = useState(1);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const inputStyle = {
    width: '100%', padding: '13px 16px', borderRadius: 10,
    border: '1.5px solid var(--gray-200)', fontSize: 15,
    fontFamily: 'var(--font-sans)', outline: 'none', color: 'var(--text-dark)',
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 72 }}>
      <div style={{ width: '100%', maxWidth: 480, padding: 24 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 16,
            background: 'linear-gradient(135deg, #e63030, #ff6b6b)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 24, color: '#1a0000',
            margin: '0 auto 16px',
          }}>LA</div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, color: 'var(--green-dark)', fontWeight: 700, marginBottom: 4 }}>Investor Portal</h1>
          <p style={{ fontSize: 14, color: 'var(--gray-400)' }}>Longhorn Associates Investment Management</p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', background: '#fff', borderRadius: 12, padding: 4, marginBottom: 28, boxShadow: 'var(--shadow-sm)', border: '1px solid var(--gray-100)' }}>
          {['login', 'register'].map(t => (
            <button key={t} onClick={() => { setTab(t); setStep(1); }} style={{
              flex: 1, padding: '11px 0', borderRadius: 9, border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14,
              background: tab === t ? 'var(--green-dark)' : 'transparent',
              color: tab === t ? '#e63030' : 'var(--gray-400)',
              transition: 'all 0.25s',
            }}>{t === 'login' ? 'Sign In' : 'Register'}</button>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 20, padding: 36, boxShadow: 'var(--shadow-lg)' }}>
          {tab === 'login' ? (
            <>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--green-dark)', marginBottom: 24 }}>Welcome Back</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--gray-800)', marginBottom: 6 }}>Email Address</label>
                  <input type="email" placeholder="your@email.com" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--green-accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--gray-200)'}
                  />
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-800)' }}>Password</label>
                    <a href="#" style={{ fontSize: 12, color: 'var(--green-accent)', fontWeight: 600 }}>Forgot password?</a>
                  </div>
                  <input type="password" placeholder="••••••••" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--green-accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--gray-200)'}
                  />
                </div>
                <button className="btn-primary" style={{ justifyContent: 'center', marginTop: 4 }}>Sign In to Portal</button>
              </div>
              <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--gray-400)', marginTop: 20 }}>
                Don't have an account?{' '}
                <button onClick={() => setTab('register')} style={{ background: 'none', border: 'none', color: 'var(--green-accent)', fontWeight: 600, cursor: 'pointer', fontSize: 13, fontFamily: 'var(--font-sans)' }}>Register here</button>
              </p>
            </>
          ) : (
            <>
              {/* Progress */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
                {[1, 2, 3].map(s => (
                  <div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: s <= step ? 'var(--green-accent)' : 'var(--gray-200)', transition: 'background 0.3s' }} />
                ))}
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--green-dark)', marginBottom: 6 }}>
                {step === 1 ? 'Personal Details' : step === 2 ? 'Investment Profile' : 'Upload Documents'}
              </h2>
              <p style={{ fontSize: 13, color: 'var(--gray-400)', marginBottom: 24 }}>Step {step} of 3</p>

              {step === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--gray-800)', marginBottom: 6 }}>First Name</label>
                      <input type="text" style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--green-accent)'} onBlur={e => e.target.style.borderColor = 'var(--gray-200)'} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--gray-800)', marginBottom: 6 }}>Last Name</label>
                      <input type="text" style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--green-accent)'} onBlur={e => e.target.style.borderColor = 'var(--gray-200)'} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--gray-800)', marginBottom: 6 }}>Email Address</label>
                    <input type="email" style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--green-accent)'} onBlur={e => e.target.style.borderColor = 'var(--gray-200)'} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--gray-800)', marginBottom: 6 }}>Phone Number</label>
                    <input type="tel" placeholder="+260 ..." style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--green-accent)'} onBlur={e => e.target.style.borderColor = 'var(--gray-200)'} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--gray-800)', marginBottom: 6 }}>NRC Number</label>
                    <input type="text" placeholder="000000/00/0" style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--green-accent)'} onBlur={e => e.target.style.borderColor = 'var(--gray-200)'} />
                  </div>
                  <button onClick={() => setStep(2)} className="btn-primary" style={{ justifyContent: 'center', marginTop: 4 }}>Next: Investment Profile <ArrowRight size={15} /></button>
                </div>
              )}

              {step === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--gray-800)', marginBottom: 6 }}>Service of Interest</label>
                    <select style={{ ...inputStyle, background: '#fff' }}>
                      <option>Unit Trust Fund</option>
                      <option>Portfolio Management</option>
                      <option>Pension Fund</option>
                      <option>Education Fund</option>
                      <option>Wealth Management</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--gray-800)', marginBottom: 6 }}>Investment Amount (ZMW)</label>
                    <input type="number" placeholder="e.g. 5000" style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--green-accent)'} onBlur={e => e.target.style.borderColor = 'var(--gray-200)'} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--gray-800)', marginBottom: 8 }}>Risk Tolerance</label>
                    <div style={{ display: 'flex', gap: 10 }}>
                      {['Conservative', 'Balanced', 'Aggressive'].map(r => (
                        <label key={r} style={{
                          flex: 1, padding: '10px', borderRadius: 10, border: '2px solid var(--gray-200)',
                          textAlign: 'center', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: 'var(--gray-600)',
                          transition: 'all 0.2s',
                        }}>
                          <input type="radio" name="risk" style={{ display: 'none' }} />
                          {r}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button onClick={() => setStep(1)} className="btn-outline" style={{ flex: 1, justifyContent: 'center', color: 'var(--green-dark)', borderColor: 'var(--gray-200)' }}>Back</button>
                    <button onClick={() => setStep(3)} className="btn-primary" style={{ flex: 2, justifyContent: 'center' }}>Next: Documents <ArrowRight size={15} /></button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[{ label: 'National Registration Card (NRC)', desc: 'Front and back scan or photo' }, { label: 'Proof of Address', desc: 'Utility bill, bank statement (last 3 months)' }, { label: 'Passport Photo', desc: 'Recent passport-sized photograph' }].map(({ label, desc }) => (
                    <div key={label} style={{
                      padding: 16, borderRadius: 12, border: '2px dashed var(--gray-200)',
                      textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.2s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--green-accent)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--gray-200)'}
                    >
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--green-dark)', marginBottom: 4 }}>{label}</div>
                      <div style={{ fontSize: 12, color: 'var(--gray-400)', marginBottom: 8 }}>{desc}</div>
                      <div style={{ fontSize: 13, color: 'var(--green-accent)', fontWeight: 600 }}>+ Click to upload</div>
                    </div>
                  ))}
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button onClick={() => setStep(2)} className="btn-outline" style={{ flex: 1, justifyContent: 'center', color: 'var(--green-dark)', borderColor: 'var(--gray-200)' }}>Back</button>
                    <button onClick={() => alert('Registration submitted! Our team will review your application within 2 business days.')} className="btn-primary" style={{ flex: 2, justifyContent: 'center' }}>Submit Application <ArrowRight size={15} /></button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--gray-400)', marginTop: 20 }}>
          Protected by 256-bit SSL encryption. Regulated by SEC & PIA Zambia.
        </p>
      </div>
    </div>
  );
}
