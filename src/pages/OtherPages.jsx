import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Award, Users, Globe, Target, ChevronDown, X } from 'lucide-react';

/* ═══════════════════════════════════════════ */
/*  TEAM DATA                                  */
/* ═══════════════════════════════════════════ */

const boardOfDirectors = [
  {
    name: 'Chanda HJ Chileshe',
    role: 'Chairman',
    photo: '/images/team/ChandaChileshe.jpg',
    initials: 'CC',
    bio: 'Chanda is a seasoned lawyer and Managing Partner of Lloyd Jones & Collins with over 35 years experience in commercial and legal practice both locally and internationally. He holds a Bachelor of Arts – Joint Hons. in Law & Economics from the University of Keele as well as a Master of Laws Degree, LLM: Taxation, Insurance, Company Law from the University of London. He is a member of various professional bodies and has sat on various Boards including Finance Bank (Atlas Mara), Colgate Palmolive and the Revenue Appeals Tribunal, among others.',
  },
  {
    name: 'Banji Gideon Moono',
    role: 'Director, CFA',
    photo: '/images/team/BanjiMoono.jpeg',
    initials: 'BM',
    bio: 'Banji is a qualified and experienced Finance, Accounting, and Investment professional with extensive experience in Banking and Investments. He has served in senior management positions with various commercial banks including Finance Bank and most recently, the United Bank for Africa where he is currently serving as the Group Head-Investor Relations based in Nigeria. Banji is a qualified Chartered Management Accountant (CIMA) and holder of the prestigious CFA Charter. He holds a Diploma in Treasury Management and is also a fellow of the Zambia Institute of Chartered Accountants (ZICA).',
  },
  {
    name: 'Dionysius Makunka',
    role: 'CEO, CFA',
    photo: '/images/team/DionysusMakunka.jpg',
    initials: 'DM',
    bio: 'Dionysius is a qualified and experienced Economics and Finance professional with over twenty (20) years of practice with various institutions. He spent about twenty years at the Bank of Zambia where he served in senior management positions prior to going into private practice. He has also been involved in lecturing at the University of Zambia (Derivatives), ZIBFS (Investment Analysis & Portfolio Management) and the University of Lusaka (Risk Management). Dionysius is a Chartered Accountant (ACCA) and holds the prestigious CFA Charter. He also holds the Bachelor of Accountancy degree from the Copperbelt University as well as a Master of Science in Finance & Economics from Manchester University, UK.',
  },
  {
    name: 'Namucana Musiwa',
    role: 'Director',
    photo: '/images/team/NamucanaMusiwa.jpg',
    initials: 'NM',
    bio: 'Namucana is an entrepreneur with extensive experience in governance and talent acquisition. She is the founder and CEO of Career Prospects Limited, one of the leading recruitment agencies in Zambia. She has served and continues to serve on various Boards including the Zambia Qualification Authority, Zambia Institute of Human Resources Management, Professional Insurance Corporation and the University of Zambia Council, Bank of Zambia REMCO, Zambia National Building Society REMCO, among others. Namucana holds a Bachelor of Arts in Public Administration and Economics obtained from the University of Zambia.',
  },
  {
    name: 'Andrew John Kangwa',
    role: 'Investment Committee Member',
    photo: null,
    initials: 'AK',
    bio: 'Andrew is an experienced finance professional and entrepreneur. Having spent several years working in the Finance division of mining group, First Quantum Mining Plc, he set up private enterprises focused on diversified sectors. Among other qualifications, he holds a Master of Business Administration (MBA).',
  },
  {
    name: 'Pathias Paupila',
    role: 'Director',
    photo: null,
    initials: 'PP',
    bio: 'Pathias is a qualified and experienced Legal, Credit, Risk and Compliance professional with extensive exposure to managing complex risk processes gained in several institutions for over 18 years. He possesses extensive experience in the allocation of capital to Small and Medium Enterprises (SMEs). Pathias also Chairs the Risk and Compliance Committee of Longhorn Associates Limited. He holds a Master of Science degree in Risk Management, a Bachelor of Laws degree and a Bachelor of Business Administration degree.',
  },
];

const managementTeam = [
  {
    name: 'Dionysius Makunka',
    role: 'CEO, CFA',
    photo: '/images/team/DionysusMakunka.jpg',
    initials: 'DM',
    bio: 'Dionysius is a qualified and experienced Economics and Finance professional with over twenty (20) years of practice with various institutions. He spent about twenty years at the Bank of Zambia where he served in senior management positions prior to going into private practice. He has also been involved in lecturing at the University of Zambia (Derivatives), ZIBFS (Investment Analysis & Portfolio Management) and the University of Lusaka (Risk Management). Dionysius is a Chartered Accountant (ACCA) and holds the prestigious CFA Charter.',
  },
  {
    name: 'Brian Chilufya Chintu',
    role: 'Chief Investments & Operations Officer',
    photo: '/images/team/BrianChilufyaChintu.JPG',
    initials: 'BC',
    bio: 'Brian is a qualified and experienced Finance and Investments professional with experience in management of assorted investment portfolios including Pension Funds and Collective Investments. He has specialized in Investments during his time with the Madison Group where he served in various portfolios in Finance and Investments. More recently he served as Commercial Services Director at Zambia Airports Corporation. He comes with a wealth of experience with particular focus in Corporate Finance, Investments and Accounting.',
  },
  {
    name: 'Marlon Nsofu',
    role: 'Chief Systems & Data Analytics Officer',
    photo: '/images/team/MarlonNsofu.jpg',
    initials: 'MN',
    bio: 'Marlon is an investment professional with over fourteen years of experience in managing pension funds and collective investment schemes. His expertise spans across money markets, capital markets, and other key economic sectors. He has earned certifications in computer science and data science, which he leverages to enhance his work in quantitative finance and financial engineering. He holds a bachelor\'s degree in finance from the Robert H. Smith School of Business at the University of Maryland, USA.',
  },
  {
    name: 'Izukanji Nachiza Mwanza',
    role: 'CFO',
    photo: '/images/team/IzukanjiMwanza.jpg',
    initials: 'IM',
    bio: 'Izukanji started her accounting career with AMO Chartered Accountants in 2011 where she worked as a Management Trainee. She later worked at various institutions in the Finance and Accounting role. Prior to her accounting career, she pursued a diploma in Chemical Engineering at the Copperbelt University. Izukanji is a Chartered Accountant and holder of the ACCA qualification. She is also a member of both ACCA and ZICA.',
  },
  {
    name: 'Lewis Mwale',
    role: 'Chief Partnerships Officer',
    photo: '/images/team/lewis.jpg',
    initials: 'LM',
    bio: 'Lewis is a qualified Social Security Expert and Financial Advisor with over 7 years work experience in the Pensions Industry in Zambia. He holds a Bachelor\'s Degree in Business Administration from the Copperbelt University and is currently pursuing a Master of Business Administration (MBA) - Finance. Prior to joining Longhorn, Lewis worked as a Financial Controller for Innscor Zambia Limited and as a Credit and Debt Analyst for Vision Fund Zambia.',
  },
  {
    name: 'Patrick Edward Zulu',
    role: 'Chief Credit Operations & Fintech Officer',
    photo: null,
    initials: 'PZ',
    bio: 'Patrick is a seasoned Certified Credit Professional and management specialist with a proven record of building and leading diverse teams. He holds an MBA in Accounting and Finance from the University of Liverpool and a BA with a bias in Economics from the University of Zambia. With more than 18 years of experience, Patrick has worked across credit risk, strategic planning, human resource management and change management at leading institutions including Bayport Financial Services and Micro Finance Zambia Limited.',
  },
];

/* ── Team Member Card ── */
function TeamCard({ member, accentColor, onSelect }) {
  const [imgError, setImgError] = useState(false);
  const hasPhoto = member.photo && !imgError;

  return (
    <div
      onClick={() => onSelect(member)}
      style={{
        background: '#fff', borderRadius: 16, overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)', cursor: 'pointer',
        transition: 'all 0.3s', border: '1px solid rgba(0,0,0,0.06)',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; }}
    >
      {/* Photo or Initials */}
      <div style={{
        height: 200, background: hasPhoto ? 'none' : `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {hasPhoto ? (
          <img
            src={member.photo}
            alt={member.name}
            onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
          />
        ) : (
          <span style={{
            fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 48,
            color: '#fff', opacity: 0.9,
          }}>{member.initials}</span>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '18px 20px' }}>
        <h3 style={{
          fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 700,
          color: '#0F2E50', marginBottom: 4, lineHeight: 1.3,
        }}>{member.name}</h3>
        <p style={{
          fontSize: 12, color: accentColor, fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8,
        }}>{member.role}</p>
        <p style={{
          fontSize: 12, color: '#6B7280', lineHeight: 1.5,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>{member.bio}</p>
        <div style={{ fontSize: 12, color: accentColor, fontWeight: 600, marginTop: 10 }}>
          View Profile →
        </div>
      </div>
    </div>
  );
}

/* ── Team Member Modal ── */
function TeamModal({ member, accentColor, onClose }) {
  const [imgError, setImgError] = useState(false);
  const hasPhoto = member.photo && !imgError;

  if (!member) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
      zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 20, maxWidth: 640, width: '100%',
        maxHeight: '85vh', overflow: 'auto', position: 'relative',
        boxShadow: '0 24px 64px rgba(0,0,0,0.2)',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 16, right: 16, width: 36, height: 36, borderRadius: '50%',
          background: '#f3f4f6', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10,
        }}>
          <X size={18} style={{ color: '#374151' }} />
        </button>

        <div style={{ display: 'flex', gap: 0 }}>
          {/* Photo side */}
          <div style={{
            width: 220, minHeight: 280, flexShrink: 0,
            background: hasPhoto ? 'none' : `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '20px 0 0 20px', overflow: 'hidden',
          }}>
            {hasPhoto ? (
              <img src={member.photo} alt={member.name} onError={() => setImgError(true)}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
            ) : (
              <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 56, color: '#fff', opacity: 0.9 }}>{member.initials}</span>
            )}
          </div>

          {/* Bio side */}
          <div style={{ flex: 1, padding: '32px 32px 32px 28px' }}>
            <h2 style={{
              fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 700,
              color: '#0F2E50', marginBottom: 4,
            }}>{member.name}</h2>
            <p style={{
              fontSize: 13, color: accentColor, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 20,
            }}>{member.role}</p>
            <div style={{ width: 32, height: 3, borderRadius: 2, background: accentColor, marginBottom: 16 }} />
            <p style={{
              fontSize: 14, color: '#4B5563', lineHeight: 1.8,
            }}>{member.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════ */
/*  ABOUT PAGE                                 */
/* ═══════════════════════════════════════════ */
export function AboutPage() {
  const [teamTab, setTeamTab] = useState('board');
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const accentColor = '#C41E2F';
  const blueText = '#0F2E50';
  const bluePrimary = '#2563A8';

  return (
    <div>
      <section style={{ background: 'linear-gradient(135deg, #0F3D6E, #1A4B8C)', paddingTop: 140, paddingBottom: 80 }}>
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

      {/* Who We Are */}
      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <div style={{ width: 40, height: 3, borderRadius: 2, background: accentColor, marginBottom: 16 }} />
              <h2 className="section-heading" style={{ marginBottom: 20 }}>Who We Are</h2>
              <p style={{ fontSize: 16, color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: 20 }}>
                Longhorn Associates is a Securities and Exchange Commission (SEC) and Pensions and Insurance Authority (PIA) licensed and regulated Investment Management Company, founded on the strength of providing value-adding investment options for clients in Zambia and globally.
              </p>
              <p style={{ fontSize: 16, color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: 32 }}>
                We are Zambian wholly-owned, built by people who understand the local market, the aspirations of Zambian families, and the real impact that smart investing can have on communities. We believe every Zambian deserves access to professional investment management.
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
                { icon: Award, label: '15+', sub: 'Years Serving Zambia', color: accentColor },
                { icon: Users, label: '500+', sub: 'Satisfied Clients', color: bluePrimary },
                { icon: Globe, label: 'Global', sub: 'Investment Access', color: accentColor },
                { icon: Target, label: '6', sub: 'Core Services', color: bluePrimary },
              ].map(({ icon: Icon, label, sub, color }, i) => (
                <div key={label} style={{
                  padding: 28, borderRadius: 20, background: '#fff', boxShadow: 'var(--shadow-md)',
                  textAlign: 'center', marginTop: i % 2 === 1 ? 24 : 0,
                }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                    <Icon size={24} style={{ color }} />
                  </div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 700, color: blueText }}>{label}</div>
                  <div style={{ fontSize: 12, color: 'var(--gray-400)', fontWeight: 500, marginTop: 4 }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ background: 'linear-gradient(135deg, #0F3D6E, #1A4B8C)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
            {[
              { label: 'Our Mission', text: 'To enrich society through the delivery of superior investment services, making professional wealth management accessible to every Zambian.' },
              { label: 'Our Vision', text: 'To be the most trusted and impactful investment management company in Zambia, recognised for integrity, performance, and community impact.' },
            ].map(({ label, text }) => (
              <div key={label} style={{ padding: 40, borderRadius: 20, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <div style={{ width: 40, height: 3, borderRadius: 2, background: accentColor, marginBottom: 16 }} />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 16 }}>{label}</h3>
                <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TEAM — Board of Directors + Management
          Photos in: public/images/team/
          ══════════════════════════════════════════ */}
      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ width: 40, height: 3, borderRadius: 2, background: accentColor, margin: '0 auto 12px' }} />
            <h2 className="section-heading">Our People</h2>
            <p style={{ fontSize: 15, color: 'var(--gray-600)', maxWidth: 520, margin: '8px auto 0' }}>
              Meet the experienced professionals driving Longhorn Associates forward.
            </p>
          </div>

          {/* Sub-tabs: Board / Management */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 40,
          }}>
            {[
              { key: 'board', label: 'Board of Directors' },
              { key: 'management', label: 'Management' },
            ].map(t => (
              <button key={t.key} onClick={() => setTeamTab(t.key)} style={{
                padding: '10px 28px', borderRadius: 100, fontSize: 14, fontWeight: 600, cursor: 'pointer',
                background: teamTab === t.key ? blueText : '#fff',
                color: teamTab === t.key ? '#fff' : 'var(--gray-600)',
                border: teamTab === t.key ? `2px solid ${blueText}` : '2px solid var(--gray-200)',
                transition: 'all 0.2s', fontFamily: 'var(--font-sans)',
              }}>{t.label}</button>
            ))}
          </div>

          {/* Board of Directors */}
          {teamTab === 'board' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24 }}>
              {boardOfDirectors.map(member => (
                <TeamCard key={member.name} member={member} accentColor={accentColor} onSelect={setSelectedMember} />
              ))}
            </div>
          )}

          {/* Management */}
          {teamTab === 'management' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24 }}>
              {managementTeam.map(member => (
                <TeamCard key={member.name + member.role} member={member} accentColor={bluePrimary} onSelect={setSelectedMember} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bio Modal */}
      {selectedMember && (
        <TeamModal
          member={selectedMember}
          accentColor={teamTab === 'board' ? accentColor : bluePrimary}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </div>
  );
}


/* ═══════════════════════════════════════════ */
/*  INSIGHTS PAGE (unchanged)                  */
/* ═══════════════════════════════════════════ */
const articles = [
  { title: 'Why Every Zambian Should Start Investing in 2025', date: 'Feb 20, 2025', category: 'Investing 101', excerpt: 'With rising inflation and currency pressures, keeping your money in a savings account is no longer enough. Here\'s how to make your Kwacha work harder.', readTime: '5 min read' },
  { title: 'Understanding Unit Trusts: A Beginner\'s Guide', date: 'Jan 15, 2025', category: 'Education', excerpt: 'Unit trusts allow you to invest in a diversified portfolio managed by professionals. We break down exactly how they work and why they suit most Zambians.', readTime: '7 min read' },
  { title: 'Pension Planning: Why Starting Early Matters', date: 'Dec 10, 2024', category: 'Retirement', excerpt: 'The compounding effect of early pension contributions cannot be overstated. See how starting at 30 vs 40 impacts your retirement fund significantly.', readTime: '6 min read' },
  { title: 'Zambia Market Update: Q4 2024 Performance', date: 'Nov 28, 2024', category: 'Market Update', excerpt: 'A review of LuSE equity performance, bond market movements, and our outlook for the first quarter of 2025 for Zambian investors.', readTime: '8 min read' },
  { title: 'Education Fund: Invest in Tomorrow Today', date: 'Oct 22, 2024', category: 'Education', excerpt: 'School fees are rising year on year. Discover how our Education Fund helps parents build a dedicated fund that grows alongside their child.', readTime: '4 min read' },
  { title: 'Legacy Planning: Building Wealth for Generations', date: 'Sep 14, 2024', category: 'Wealth Management', excerpt: 'True wealth isn\'t about what you accumulate — it\'s about what you leave behind. Explore strategies for multigenerational wealth transfer in Zambia.', readTime: '9 min read' },
];

const categoryColors = { 'Investing 101': '#C41E2F', 'Education': '#2563A8', 'Retirement': '#2563A8', 'Market Update': '#0F3D6E', 'Wealth Management': '#C41E2F' };

export function InsightsPage() {
  const [active, setActive] = useState('All');
  const categories = ['All', ...new Set(articles.map(a => a.category))];
  const filtered = active === 'All' ? articles : articles.filter(a => a.category === active);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div>
      <section style={{ background: 'linear-gradient(135deg, #0F3D6E, #1A4B8C)', paddingTop: 140, paddingBottom: 80 }}>
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
          <div style={{ display: 'flex', gap: 10, marginBottom: 48, flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActive(cat)} style={{
                padding: '8px 20px', borderRadius: 100, fontSize: 14, fontWeight: 600, cursor: 'pointer',
                background: active === cat ? '#0F2E50' : '#fff',
                color: active === cat ? '#fff' : 'var(--gray-600)',
                border: active === cat ? '2px solid #0F2E50' : '2px solid var(--gray-200)',
                transition: 'all 0.2s', fontFamily: 'var(--font-sans)',
              }}>{cat}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 32 }}>
            {filtered.map(({ title, date, category, excerpt, readTime }) => (
              <div key={title} className="card" style={{ overflow: 'hidden' }}>
                <div style={{ height: 6, background: categoryColors[category] || '#C41E2F' }} />
                <div style={{ padding: 32 }}>
                  <div style={{ display: 'flex', gap: 10, marginBottom: 16, alignItems: 'center' }}>
                    <span style={{
                      padding: '4px 12px', borderRadius: 100, fontSize: 11, fontWeight: 700,
                      background: `${categoryColors[category] || '#C41E2F'}18`, color: categoryColors[category] || '#C41E2F',
                      textTransform: 'uppercase', letterSpacing: '0.08em',
                    }}>{category}</span>
                    <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>{readTime}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 19, fontWeight: 700, color: '#0F2E50', marginBottom: 12, lineHeight: 1.4 }}>{title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.7, marginBottom: 24 }}>{excerpt}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid var(--gray-100)' }}>
                    <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>{date}</span>
                    <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: '#C41E2F' }}>Read More <ArrowRight size={14} /></a>
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


/* ═══════════════════════════════════════════ */
/*  CONTACT PAGE (unchanged)                   */
/* ═══════════════════════════════════════════ */
export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [sent, setSent] = useState(false);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleSubmit = (e) => { e.preventDefault(); setSent(true); };

  return (
    <div>
      <section style={{ background: 'linear-gradient(135deg, #0F3D6E, #1A4B8C)', paddingTop: 140, paddingBottom: 80 }}>
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
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, color: '#0F2E50', marginBottom: 24 }}>Visit or Call Us</h2>
              {[
                { label: 'Office Address', value: 'Ground Floor, Office Park\nPlot 1146/15, Lagos Road\nP.O. Box 50655, Lusaka, Zambia' },
                { label: 'Phone', value: '+260 252 540' },
                { label: 'Email', value: 'info@longhorn-associates.com' },
                { label: 'Business Hours', value: 'Monday – Friday: 08:00 – 17:00\nSaturday: 09:00 – 13:00' },
              ].map(({ label, value }) => (
                <div key={label} style={{ marginBottom: 28, padding: 20, background: '#fff', borderRadius: 14, boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#C41E2F', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>{label}</div>
                  <div style={{ fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{value}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#fff', borderRadius: 24, padding: 48, boxShadow: 'var(--shadow-lg)' }}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <CheckCircle size={56} style={{ color: '#C41E2F', margin: '0 auto 20px' }} />
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, color: '#0F2E50', marginBottom: 12 }}>Message Sent!</h3>
                  <p style={{ color: 'var(--gray-600)', marginBottom: 24 }}>Our team will be in touch within one business day.</p>
                  <button onClick={() => setSent(false)} className="btn-dark">Send Another Message</button>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, color: '#0F2E50', marginBottom: 8 }}>Send Us a Message</h3>
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
                          onFocus={e => e.target.style.borderColor = '#C41E2F'}
                          onBlur={e => e.target.style.borderColor = 'var(--gray-200)'}
                        />
                      </div>
                    ))}
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--gray-800)', marginBottom: 6 }}>Service of Interest</label>
                      <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1.5px solid var(--gray-200)', fontSize: 15, fontFamily: 'var(--font-sans)', outline: 'none', color: form.service ? 'var(--text-dark)' : 'var(--gray-400)', background: '#fff' }}>
                        <option value="">Select a service...</option>
                        {['Pension Fund Management', 'Unit Trust Fund Management', 'Credit', 'Securities & Stock Broking', 'Consultancy & Advisory', 'Risk Management', 'General Enquiry'].map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--gray-800)', marginBottom: 6 }}>Message</label>
                      <textarea placeholder="Tell us about your investment goals..." value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })} rows={4}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1.5px solid var(--gray-200)', fontSize: 15, fontFamily: 'var(--font-sans)', outline: 'none', color: 'var(--text-dark)', resize: 'vertical' }}
                        onFocus={e => e.target.style.borderColor = '#C41E2F'}
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


/* ═══════════════════════════════════════════ */
/*  CLIENT PORTAL (unchanged)                  */
/* ═══════════════════════════════════════════ */
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
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 16,
            background: 'linear-gradient(135deg, #C41E2F, #E53E3E)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 24, color: '#fff',
            margin: '0 auto 16px',
          }}>LA</div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, color: '#0F2E50', fontWeight: 700, marginBottom: 4 }}>Investor Portal</h1>
          <p style={{ fontSize: 14, color: 'var(--gray-400)' }}>Longhorn Associates Investment Management</p>
        </div>

        <div style={{ display: 'flex', background: '#fff', borderRadius: 12, padding: 4, marginBottom: 28, boxShadow: 'var(--shadow-sm)', border: '1px solid var(--gray-100)' }}>
          {['login', 'register'].map(t => (
            <button key={t} onClick={() => { setTab(t); setStep(1); }} style={{
              flex: 1, padding: '11px 0', borderRadius: 9, border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14,
              background: tab === t ? '#0F2E50' : 'transparent',
              color: tab === t ? '#fff' : 'var(--gray-400)',
              transition: 'all 0.25s',
            }}>{t === 'login' ? 'Sign In' : 'Register'}</button>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 20, padding: 36, boxShadow: 'var(--shadow-lg)' }}>
          {tab === 'login' ? (
            <>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: '#0F2E50', marginBottom: 24 }}>Welcome Back</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--gray-800)', marginBottom: 6 }}>Email Address</label>
                  <input type="email" placeholder="your@email.com" style={inputStyle} onFocus={e => e.target.style.borderColor = '#C41E2F'} onBlur={e => e.target.style.borderColor = 'var(--gray-200)'} />
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-800)' }}>Password</label>
                    <a href="#" style={{ fontSize: 12, color: '#C41E2F', fontWeight: 600 }}>Forgot password?</a>
                  </div>
                  <input type="password" placeholder="••••••••" style={inputStyle} onFocus={e => e.target.style.borderColor = '#C41E2F'} onBlur={e => e.target.style.borderColor = 'var(--gray-200)'} />
                </div>
                <button className="btn-primary" style={{ justifyContent: 'center', marginTop: 4 }}>Sign In to Portal</button>
              </div>
              <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--gray-400)', marginTop: 20 }}>
                Don't have an account?{' '}
                <button onClick={() => setTab('register')} style={{ background: 'none', border: 'none', color: '#C41E2F', fontWeight: 600, cursor: 'pointer', fontSize: 13, fontFamily: 'var(--font-sans)' }}>Register here</button>
              </p>
            </>
          ) : (
            <>
              <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
                {[1, 2, 3].map(s => (
                  <div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: s <= step ? '#C41E2F' : 'var(--gray-200)', transition: 'background 0.3s' }} />
                ))}
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: '#0F2E50', marginBottom: 6 }}>
                {step === 1 ? 'Personal Details' : step === 2 ? 'Investment Profile' : 'Upload Documents'}
              </h2>
              <p style={{ fontSize: 13, color: 'var(--gray-400)', marginBottom: 24 }}>Step {step} of 3</p>

              {step === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    {['First Name', 'Last Name'].map(l => (
                      <div key={l}><label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--gray-800)', marginBottom: 6 }}>{l}</label><input type="text" style={inputStyle} onFocus={e => e.target.style.borderColor = '#C41E2F'} onBlur={e => e.target.style.borderColor = 'var(--gray-200)'} /></div>
                    ))}
                  </div>
                  {['Email Address', 'Phone Number', 'NRC Number'].map(l => (
                    <div key={l}><label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--gray-800)', marginBottom: 6 }}>{l}</label><input type="text" style={inputStyle} onFocus={e => e.target.style.borderColor = '#C41E2F'} onBlur={e => e.target.style.borderColor = 'var(--gray-200)'} /></div>
                  ))}
                  <button onClick={() => setStep(2)} className="btn-primary" style={{ justifyContent: 'center', marginTop: 4 }}>Next: Investment Profile <ArrowRight size={15} /></button>
                </div>
              )}
              {step === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--gray-800)', marginBottom: 6 }}>Service of Interest</label>
                    <select style={{ ...inputStyle, background: '#fff' }}>
                      {['Pension Fund Management', 'Unit Trust Fund', 'Credit', 'Securities & Stock Broking', 'Consultancy & Advisory', 'Risk Management'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--gray-800)', marginBottom: 6 }}>Investment Amount (ZMW)</label>
                    <input type="number" placeholder="e.g. 5000" style={inputStyle} onFocus={e => e.target.style.borderColor = '#C41E2F'} onBlur={e => e.target.style.borderColor = 'var(--gray-200)'} />
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button onClick={() => setStep(1)} className="btn-outline" style={{ flex: 1, justifyContent: 'center', color: '#0F2E50', borderColor: 'var(--gray-200)' }}>Back</button>
                    <button onClick={() => setStep(3)} className="btn-primary" style={{ flex: 2, justifyContent: 'center' }}>Next: Documents <ArrowRight size={15} /></button>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {['National Registration Card (NRC)', 'Proof of Address', 'Passport Photo'].map(label => (
                    <div key={label} style={{ padding: 16, borderRadius: 12, border: '2px dashed var(--gray-200)', textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = '#C41E2F'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--gray-200)'}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#0F2E50', marginBottom: 4 }}>{label}</div>
                      <div style={{ fontSize: 13, color: '#C41E2F', fontWeight: 600 }}>+ Click to upload</div>
                    </div>
                  ))}
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button onClick={() => setStep(2)} className="btn-outline" style={{ flex: 1, justifyContent: 'center', color: '#0F2E50', borderColor: 'var(--gray-200)' }}>Back</button>
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