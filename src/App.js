import React, { useState, useEffect, useCallback, useRef } from "react";
import "./index.css";
import {
  ArrowRight, TrendingUp, CheckCircle, Shield, Award, Users, BarChart2,
  ChevronDown, ChevronRight, ChevronLeft, Search, LogIn, Building, PieChart,
  GraduationCap, Briefcase, BookOpen, Globe, Target, Mail, Phone, Clock,
  Lock, FileText, CreditCard, UserCheck, Building2, X, DollarSign, Activity,
  Info, Play, Calculator, Newspaper, Calendar, Heart, Eye, Star, ArrowUpRight
} from "lucide-react";

/* ── Stethoscope icon ── */
const Stethoscope = (p) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={p.size||24} height={p.size||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={p.style}><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>
);

/* ═══════════════════════════════════════════ */
/*  DESIGN SYSTEM                             */
/* ═══════════════════════════════════════════ */
const C = {
  navy: '#1A4B8C', navyLight: '#2563A8', navyDark: '#0F3D6E',
  red: '#C41E2F', redHover: '#A01825', redLight: '#FFF1F2',
  white: '#FFFFFF', offWhite: '#F8F9FC',
  gray50: '#F4F5F8', gray100: '#E8EAF0', gray200: '#D1D5DF',
  gray300: '#B0B6C4', gray400: '#8890A0', gray500: '#6B7280',
  gray600: '#4B5563', gray700: '#374151', gray800: '#1F2937', gray900: '#111827',
  gold: '#C9982E', green: '#16A34A',
};
const font = { serif: "'Playfair Display',Georgia,serif", sans: "'DM Sans',system-ui,sans-serif" };

/* ═══════════════════════════════════════════ */
/*  FUND DATA (from brochure)                 */
/* ═══════════════════════════════════════════ */
const funds = [
  { id:'equities', name:'Listed Equities Fund', short:'Equity Fund', icon:TrendingUp, color:'#C41E2F', desc:'Principally invests in equities listed on the Lusaka Securities Exchange (LuSE).', fee:'3.5%', risk:'High', returnRate:'12.4', fundSize:'K180M', volatility:'8.2%', expenseRatio:'3.5%' },
  { id:'fixed-income', name:'Fixed Income Fund', short:'Bond Fund', icon:Shield, color:'#1565C0', desc:'Invests in government securities as well as listed securities of reputable institutions.', fee:'3.5%', risk:'Low–Medium', returnRate:'8.2', fundSize:'K250M', volatility:'3.5%', expenseRatio:'3.5%' },
  { id:'property', name:'Listed Property Fund', short:'Property Fund', icon:Building, color:'#2E7D32', desc:'In-Country & Global property exposure. Note: to exit this fund, a buyer of your units must first be found.', fee:'3.5%', risk:'Medium–High', returnRate:'9.6', fundSize:'K120M', volatility:'5.8%', expenseRatio:'3.5%' },
  { id:'multi-asset', name:'Multi Assets Class Fund', short:'Balanced Fund', icon:PieChart, color:'#7B1FA2', desc:'A balanced hybrid mutual fund combining equities, bonds and money market instruments for competitive risk-adjusted returns.', fee:'3.5%', risk:'Medium', returnRate:'10.1', fundSize:'K200M', volatility:'4.6%', expenseRatio:'3.5%' },
  { id:'education', name:'Education Fund', short:'Education Fund', icon:GraduationCap, color:'#E65100', desc:'Designed to help investors plan for education needs — their own and their families\'.', fee:'3.5%', risk:'Medium', returnRate:'9.8', fundSize:'K95M', volatility:'4.2%', expenseRatio:'3.5%' },
  { id:'white-coat', name:'White Coat Fund', short:'White Coat Fund', icon:Stethoscope, color:'#00838F', desc:'An investment fund designed for medical personnel to achieve financial stability whilst in active service.', fee:'2.5%', risk:'Medium', returnRate:'8.9', fundSize:'K45M', volatility:'3.8%', expenseRatio:'2.5%' },
  { id:'gratuity', name:'Gratuity Fund', short:'Gratuity Fund', icon:Award, color:'#AD1457', desc:'Provides competitive returns and liquidity by investing in a diversified portfolio of securities.', fee:'3.5%', risk:'Medium', returnRate:'9.2', fundSize:'K75M', volatility:'4.0%', expenseRatio:'3.5%' },
];

/* ── Generate chart data ── */
function genChart(months=12, base=100, growth=0.08) {
  const pts = [];
  let val = base;
  for(let i=0; i<months; i++) {
    val *= (1 + growth/12 + (Math.random()-0.45)*0.03);
    pts.push({ month: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i%12], value: val });
  }
  return pts;
}

/* ═══════════════════════════════════════════ */
/*  MARKET TICKER                             */
/* ═══════════════════════════════════════════ */
function MarketTicker() {
  const items = [
    { label: 'Market Updates', value: '', isLabel: true },
    { label: 'LuSE ASI', value: '+9.4%', positive: true },
    { label: 'USD/ZMW', value: '27.10' },
    { label: '10Y Bond Yield', value: '16.8%' },
    { label: 'Inflation', value: '12.3%' },
    { label: 'BoZ Rate', value: '12.5%' },
  ];
  const tickerItems = [...items, ...items, ...items]; /* triple for seamless loop */
  return (
    <div style={{
      background: '#3B7DD8', padding: '10px 0', display: 'flex', alignItems: 'center',
      overflow: 'hidden', position: 'relative',
    }}>
      <style>{`@keyframes tickerScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }`}</style>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 24, whiteSpace: 'nowrap',
        animation: 'tickerScroll 20s linear infinite',
      }}>
        {tickerItems.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {item.isLabel ? (
              <span style={{ fontSize: 12, fontWeight: 700, color: C.white, background: C.red, padding: '4px 12px', borderRadius: 4 }}>{item.label}</span>
            ) : (
              <>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>{item.label}</span>
                <div style={{ width: 4, height: 12, borderRadius: 1, background: item.positive ? '#4ADE80' : 'rgba(255,255,255,0.5)', marginRight: 2 }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: item.positive ? '#4ADE80' : C.white }}>{item.value}</span>
                {i < tickerItems.length - 1 && <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.2)', marginLeft: 16 }} />}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════ */
/*  MINI CHART SVG                            */
/* ═══════════════════════════════════════════ */
function MiniChart({ data, width=480, height=200, color=C.red }) {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data.map(d=>d.value));
  const min = Math.min(...data.map(d=>d.value));
  const range = max - min || 1;
  const padY = 20;
  const points = data.map((d,i) => {
    const x = (i / (data.length-1)) * width;
    const y = height - padY - ((d.value - min) / range) * (height - padY*2);
    return `${x},${y}`;
  }).join(' ');
  const areaPoints = points + ` ${width},${height-padY} 0,${height-padY}`;

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`grad-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {/* Grid lines */}
      {[0.25, 0.5, 0.75].map(pct => (
        <line key={pct} x1="0" y1={padY + pct*(height-padY*2)} x2={width} y2={padY + pct*(height-padY*2)} stroke="rgba(0,0,0,0.06)" strokeWidth="1" strokeDasharray="4,4" />
      ))}
      <polygon points={areaPoints} fill={`url(#grad-${color.replace('#','')})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* End dot */}
      {data.length > 0 && (() => {
        const lastX = width;
        const lastY = height - padY - ((data[data.length-1].value - min) / range) * (height - padY*2);
        return <circle cx={lastX} cy={lastY} r="4" fill={color} stroke="#fff" strokeWidth="2" />;
      })()}
      {/* Month labels */}
      {data.map((d,i) => {
        if (i % 2 !== 0 && i !== data.length-1) return null;
        const x = (i / (data.length-1)) * width;
        return <text key={i} x={x} y={height-2} textAnchor="middle" fontSize="10" fill={C.gray400} fontFamily={font.sans}>{d.month}</text>;
      })}
    </svg>
  );
}

/* ═══════════════════════════════════════════ */
/*  HOME PAGE                                 */
/* ═══════════════════════════════════════════ */
function HomePage({ onNavigate }) {
  /* Only 4 funds for the home page */
  const homeFunds = [
    { id: 'equities', icon: TrendingUp, label: 'Equity Fund', color: C.red,
      desc: 'Invest in equities listed on the Lusaka Securities Exchange (LuSE) for long-term capital growth. Ideal for investors seeking higher returns who are comfortable with market fluctuations.' },
    { id: 'fixed-income', icon: Shield, label: 'Bond Fund', color: '#1565C0',
      desc: 'A lower-risk option investing in government securities and listed bonds from reputable institutions. Designed for investors seeking stable, predictable returns with capital preservation.' },
    { id: 'multi-asset', icon: PieChart, label: 'Balanced Fund', color: '#6A3FB5',
      desc: 'A hybrid fund combining equities, bonds and money market instruments — delivering competitive risk-adjusted returns through diversification across multiple asset classes.' },
    { id: 'property', icon: Building, label: 'Property Fund', color: '#2E7D32',
      desc: 'Gain exposure to the property sector through in-country and global listed property investments. Perfect for investors looking to diversify into real estate without direct ownership.' },
  ];

  const quickLinks = [
    { icon: Info, label: 'About Longhorn', page: 'about' },
    { icon: BarChart2, label: 'Our Products', page: 'products' },
    { icon: Shield, label: 'Governance', page: 'about' },
    { icon: Users, label: 'Our Team', page: 'about' },
    { icon: Heart, label: 'Core Values', page: 'about' },
    { icon: Newspaper, label: 'Insights & News', page: 'insights' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 64px)' }}>

      {/* ── Market Updates Ticker — above hero ── */}
      <MarketTicker />

      {/* ── Hero — Uploaded landscape image ── */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        height: 280, minHeight: 280, maxHeight: 280,
        display: 'flex', alignItems: 'center',
        marginTop: 6,
      }}>
        {/* Background image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/Long_horn.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
          backgroundRepeat: 'no-repeat',
        }} />

        <div style={{ position: 'relative', zIndex: 1, padding: '0 60px', maxWidth: 640 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '5px 14px', borderRadius: 4,
            background: 'rgba(196,30,47,0.22)', border: '1px solid rgba(196,30,47,0.45)',
            marginBottom: 18,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.red }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#ff8a94', letterSpacing: '0.1em', textTransform: 'uppercase' }}>SEC & PIA Licensed</span>
          </div>

          <h1 style={{
            fontFamily: font.serif, fontWeight: 800,
            fontSize: 'clamp(2rem, 3.6vw, 2.8rem)', lineHeight: 1.12,
            color: C.white, marginBottom: 14,
            textShadow: '0 2px 24px rgba(0,0,0,0.2)',
          }}>
            Investing for Long-Term<br />Financial Growth
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: 24, maxWidth: 500 }}>
            Licensed asset managers. Unit trust & pension investment products. Research-driven investment process.
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => onNavigate('products')} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 26px',
              background: C.red, color: C.white, fontWeight: 700, fontSize: 13,
              borderRadius: 6, border: 'none', cursor: 'pointer', fontFamily: font.sans,
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = C.redHover}
              onMouseLeave={e => e.currentTarget.style.background = C.red}
            >Explore Products</button>
            <button onClick={() => onNavigate('portal')} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 26px',
              background: C.white, color: C.navy, fontWeight: 700, fontSize: 13,
              borderRadius: 6, border: 'none', cursor: 'pointer', fontFamily: font.sans,
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = C.gray100}
              onMouseLeave={e => e.currentTarget.style.background = C.white}
            >Start Investing</button>
          </div>
        </div>
      </div>

      {/* ── Quick Link Icons Row ── */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: 0,
        padding: '28px 60px', background: C.white, borderBottom: `1px solid ${C.gray100}`,
      }}>
        {quickLinks.map(({ icon: Ic, label, page }) => (
          <button key={label} onClick={() => onNavigate(page)} style={{
            flex: 1, maxWidth: 150, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
            padding: '16px 12px', border: 'none', background: 'transparent', cursor: 'pointer',
            transition: 'all 0.2s', borderRadius: 8,
          }}
            onMouseEnter={e => { e.currentTarget.style.background = C.gray50; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: C.red, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Ic size={22} style={{ color: C.white }} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, color: C.gray700, textAlign: 'center' }}>{label}</span>
          </button>
        ))}
      </div>

      {/* ── Our Investment Solutions — Only 4 funds ── */}
      <div style={{ padding: '40px 60px', background: C.offWhite, flex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h2 style={{ fontFamily: font.serif, fontSize: 24, fontWeight: 700, color: C.gray900, marginBottom: 10 }}>Our Investment Solutions</h2>
          <p style={{ fontSize: 14, color: C.gray500, maxWidth: 520, margin: '0 auto' }}>
            Four professionally managed funds tailored to different risk profiles and investment objectives.
          </p>
        </div>

        {/* 4 fund selector buttons */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
          {homeFunds.map((f) => {
            const FIcon = f.icon;
            return (
              <button key={f.id} onClick={() => onNavigate('fund', f.id)} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '12px 24px',
                borderRadius: 8, border: `1.5px solid ${C.gray200}`, background: C.white,
                cursor: 'pointer', fontFamily: font.sans, fontSize: 14, fontWeight: 600,
                color: C.gray800, transition: 'all 0.2s', minWidth: 180,
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = f.color; e.currentTarget.style.color = f.color; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.gray200; e.currentTarget.style.color = C.gray800; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <FIcon size={18} style={{ color: f.color }} />
                {f.label}
              </button>
            );
          })}
        </div>

        {/* 4 fund detail cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, maxWidth: 900, margin: '0 auto' }}>
          {homeFunds.map(f => {
            const FIcon = f.icon;
            return (
              <div key={f.id} onClick={() => onNavigate('fund', f.id)} style={{
                background: C.white, borderRadius: 14, padding: '28px 26px', cursor: 'pointer',
                border: `1px solid ${C.gray100}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                transition: 'all 0.25s', position: 'relative', overflow: 'hidden',
                borderTop: `4px solid ${f.color}`,
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${f.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FIcon size={22} style={{ color: f.color }} />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: C.gray900, fontFamily: font.serif }}>{f.label}</h3>
                </div>
                <p style={{ fontSize: 14, color: C.gray500, lineHeight: 1.7, marginBottom: 16 }}>{f.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: f.color }}>
                  Learn More <ArrowRight size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

/* ═══════════════════════════════════════════ */
/*  FUND DETAIL PAGE                          */
/* ═══════════════════════════════════════════ */
function FundDetailPage({ fundId, onNavigate }) {
  const fund = funds.find(f => f.id === fundId) || funds[1];
  const FIcon = fund.icon;
  const [activeTab, setActiveTab] = useState('performance');
  const tabs = ['Overview', 'Performance', 'Project Returns', 'Documents', 'How to Invest'];
  const tabKeys = ['overview', 'performance', 'project', 'documents', 'howto'];
  const chartData = genChart(12, 100, parseFloat(fund.returnRate)/100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 64px)' }}>
      {/* Fund header */}
      <div style={{
        background: `linear-gradient(135deg, ${C.navyDark} 0%, ${C.navy} 100%)`,
        padding: '28px 60px', display: 'flex', alignItems: 'center', gap: 20,
      }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: `${fund.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FIcon size={26} style={{ color: fund.color }} />
        </div>
        <div>
          <h1 style={{ fontFamily: font.serif, fontSize: 28, fontWeight: 700, color: C.white, marginBottom: 4 }}>{fund.name}</h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Longhorn Unit Trust · Annual Fee: {fund.fee}</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', background: C.navy, padding: '0 60px', gap: 0 }}>
        {tabs.map((t, i) => (
          <button key={t} onClick={() => setActiveTab(tabKeys[i])} style={{
            padding: '14px 20px', border: 'none', cursor: 'pointer', fontFamily: font.sans,
            fontSize: 13, fontWeight: activeTab === tabKeys[i] ? 700 : 500,
            background: activeTab === tabKeys[i] ? C.white : 'transparent',
            color: activeTab === tabKeys[i] ? C.navy : 'rgba(255,255,255,0.6)',
            borderRadius: activeTab === tabKeys[i] ? '8px 8px 0 0' : 0,
            transition: 'all 0.2s',
          }}>{t}</button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', background: C.white }}>
        {/* Chart area */}
        <div style={{ flex: 1, padding: '32px 40px' }}>
          {(activeTab === 'performance' || activeTab === 'overview') && (
            <>
              <div style={{ height: 260, marginBottom: 16, border: `1px solid ${C.gray100}`, borderRadius: 12, padding: 16, background: C.offWhite }}>
                <MiniChart data={chartData} width={540} height={220} color={fund.color} />
              </div>

              {activeTab === 'overview' && (
                <div style={{ padding: 20, background: C.gray50, borderRadius: 12, border: `1px solid ${C.gray100}` }}>
                  <h3 style={{ fontFamily: font.serif, fontSize: 18, fontWeight: 700, color: C.gray900, marginBottom: 10 }}>About This Fund</h3>
                  <p style={{ fontSize: 14, color: C.gray600, lineHeight: 1.7 }}>{fund.desc}</p>
                  <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                    {['SEC Regulated', 'Independent Trustee', 'Bank Custodian'].map(b => (
                      <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 6, background: C.white, border: `1px solid ${C.gray200}` }}>
                        <CheckCircle size={12} style={{ color: C.green }} />
                        <span style={{ fontSize: 11, fontWeight: 600, color: C.gray600 }}>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'project' && (
            <ReturnCalculator fund={fund} />
          )}

          {activeTab === 'documents' && (
            <div style={{ padding: 20 }}>
              <h3 style={{ fontFamily: font.serif, fontSize: 20, fontWeight: 700, color: C.gray900, marginBottom: 20 }}>Fund Documents</h3>
              {['Fund Fact Sheet', 'Annual Report 2024', 'Quarterly Update Q4 2024', 'Trust Deed', 'Application Form'].map(doc => (
                <div key={doc} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 18px', borderRadius: 10, border: `1px solid ${C.gray100}`,
                  marginBottom: 8, cursor: 'pointer', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = C.gray50; e.currentTarget.style.borderColor = C.red; }}
                  onMouseLeave={e => { e.currentTarget.style.background = C.white; e.currentTarget.style.borderColor = C.gray100; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <FileText size={18} style={{ color: C.red }} />
                    <span style={{ fontSize: 14, fontWeight: 600, color: C.gray800 }}>{doc}</span>
                  </div>
                  <span style={{ fontSize: 12, color: C.red, fontWeight: 600 }}>Download PDF</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'howto' && (
            <div style={{ padding: 20 }}>
              <h3 style={{ fontFamily: font.serif, fontSize: 20, fontWeight: 700, color: C.gray900, marginBottom: 20 }}>How to Invest</h3>
              {[
                { step: 1, title: 'Complete Application & KYC', desc: 'Fill out a Longhorn Unit Trust form with: Copy of ID (NRC/Passport), passport photo, reference letter, proof of residence.' },
                { step: 2, title: 'Choose Your Investment', desc: 'Invest a lump sum (min. K500) via bank transfer, cheque, or cash — or set up monthly K100+ via DDAC/payroll.' },
                { step: 3, title: 'Fund Allocation', desc: 'Select this fund or spread across multiple funds to match your goals.' },
                { step: 4, title: 'Track Performance', desc: 'Monitor your portfolio through our online platform with full transparency.' },
              ].map(({ step, title, desc }) => (
                <div key={step} style={{ display: 'flex', gap: 16, marginBottom: 18, padding: '16px 20px', borderRadius: 12, background: C.gray50, border: `1px solid ${C.gray100}` }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: C.red, color: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: font.serif, fontWeight: 700, fontSize: 16, flexShrink: 0 }}>{step}</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: C.gray900, marginBottom: 4 }}>{title}</div>
                    <p style={{ fontSize: 13, color: C.gray500, lineHeight: 1.6 }}>{desc}</p>
                  </div>
                </div>
              ))}
              <button onClick={() => onNavigate('portal')} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px',
                background: C.red, color: C.white, fontWeight: 700, fontSize: 14,
                borderRadius: 6, border: 'none', cursor: 'pointer', fontFamily: font.sans, marginTop: 8,
              }}>Start Investing <ArrowRight size={14} /></button>
            </div>
          )}
        </div>

        {/* Stats Sidebar */}
        <div style={{ width: 260, borderLeft: `1px solid ${C.gray100}`, padding: '32px 24px', background: C.offWhite }}>
          {[
            { label: 'Annual Return', value: `${fund.returnRate}%`, color: C.red },
            { label: 'Fund Size', value: fund.fundSize, color: C.gray900 },
            { label: 'Volatility', value: fund.volatility, color: C.gray900 },
            { label: 'Expense Ratio', value: fund.expenseRatio, color: C.gray900 },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, color: C.gray400, fontWeight: 600, marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color, fontFamily: font.serif }}>{value}</div>
            </div>
          ))}
          <button onClick={() => onNavigate('fund', fund.id, 'project')} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            width: '100%', padding: '12px 0', background: C.red, color: C.white,
            fontWeight: 700, fontSize: 13, borderRadius: 8, border: 'none', cursor: 'pointer',
            fontFamily: font.sans, transition: 'all 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = C.redHover}
            onMouseLeave={e => e.currentTarget.style.background = C.red}
          >Project Your Returns <ArrowRight size={14} /></button>

          {/* Min investment */}
          <div style={{ marginTop: 24, padding: 16, borderRadius: 10, background: C.white, border: `1px solid ${C.gray100}` }}>
            <div style={{ fontSize: 11, color: C.gray400, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Minimum Investment</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: C.gray500 }}>Lump Sum</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.navy }}>K 500</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: C.gray500 }}>Monthly</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.navy }}>K 100</span>
            </div>
          </div>
        </div>
      </div>

      <MarketTicker />
    </div>
  );
}

/* ═══════════════════════════════════════════ */
/*  RETURN PROJECTION CALCULATOR              */
/* ═══════════════════════════════════════════ */
function ReturnCalculator({ fund }) {
  const [initial, setInitial] = useState(20000);
  const [monthly, setMonthly] = useState(2000);
  const [horizon, setHorizon] = useState(5);
  const [scenario, setScenario] = useState('historical');
  const [calculated, setCalculated] = useState(false);

  const rates = { historical: parseFloat(fund?.returnRate || 8)/100, conservative: 0.05, balanced: 0.08, optimistic: 0.12 };
  const rate = rates[scenario];
  const totalInvested = initial + monthly * 12 * horizon;
  const futureValue = initial * Math.pow(1 + rate, horizon) + monthly * ((Math.pow(1 + rate/12, horizon*12) - 1) / (rate/12));
  const bestCase = futureValue * 1.15;
  const worstCase = futureValue * 0.85;

  const projChart = [];
  for (let y = 0; y <= horizon; y++) {
    const val = initial * Math.pow(1 + rate, y) + monthly * 12 * y * (1 + rate * y/2);
    projChart.push({ month: `${y}yr`, value: val });
  }

  return (
    <div style={{ padding: 4 }}>
      <h3 style={{ fontFamily: font.serif, fontSize: 22, fontWeight: 700, color: C.gray900, marginBottom: 4 }}>
        Return Projection Calculator
      </h3>
      <p style={{ fontSize: 13, color: C.gray400, marginBottom: 24 }}>
        {fund ? `Fund: ${fund.name}` : 'Estimate your investment growth'}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 28 }}>
        {/* Inputs */}
        <div>
          <div style={{ padding: 20, background: C.gray50, borderRadius: 12, border: `1px solid ${C.gray100}` }}>
            {[
              { label: 'Initial Investment', value: initial, set: setInitial, prefix: 'K' },
              { label: 'Monthly Contribution', value: monthly, set: setMonthly, prefix: 'K' },
            ].map(({ label, value, set, prefix }) => (
              <div key={label} style={{ marginBottom: 16 }}>
                <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 600, color: C.gray600, marginBottom: 6 }}>
                  <span>{label}</span>
                  <span style={{ color: C.navy, fontWeight: 700 }}>{prefix} {value.toLocaleString()}</span>
                </label>
                <input type="range" min="0" max={label.includes('Initial') ? 100000 : 10000} step={label.includes('Initial') ? 1000 : 100} value={value} onChange={e => set(+e.target.value)} style={{ width: '100%', accentColor: C.red }} />
              </div>
            ))}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 600, color: C.gray600, marginBottom: 6 }}>
                <span>Investment Horizon</span>
                <span style={{ color: C.navy, fontWeight: 700 }}>{horizon} Years</span>
              </label>
              <input type="range" min="1" max="30" value={horizon} onChange={e => setHorizon(+e.target.value)} style={{ width: '100%', accentColor: C.red }} />
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.gray600, marginBottom: 8 }}>Scenario</div>
              {['historical', 'conservative', 'balanced', 'optimistic'].map(s => (
                <label key={s} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, cursor: 'pointer' }}>
                  <div style={{
                    width: 16, height: 16, borderRadius: '50%', border: `2px solid ${scenario === s ? C.red : C.gray300}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {scenario === s && <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.red }} />}
                  </div>
                  <span style={{ fontSize: 13, color: scenario === s ? C.gray900 : C.gray500, fontWeight: scenario === s ? 600 : 400, textTransform: 'capitalize' }} onClick={() => setScenario(s)}>{s === 'historical' ? 'Historical Trends' : s}</span>
                </label>
              ))}
            </div>

            <button onClick={() => setCalculated(true)} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              width: '100%', padding: '12px 0', background: C.navy, color: C.white,
              fontWeight: 700, fontSize: 14, borderRadius: 8, border: 'none', cursor: 'pointer',
              fontFamily: font.sans,
            }}>
              <Calculator size={16} /> Calculate
            </button>
          </div>
        </div>

        {/* Results */}
        <div>
          <div style={{
            padding: '16px 20px', borderRadius: 10, marginBottom: 20,
            background: `linear-gradient(135deg, ${C.red}, #E53E3E)`, color: C.white,
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.8, marginBottom: 4 }}>Projected Value Range</div>
            <div style={{ fontFamily: font.serif, fontSize: 28, fontWeight: 800 }}>
              K {Math.round(worstCase).toLocaleString()} – K {Math.round(bestCase).toLocaleString()}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
            {[
              { label: 'Median Value', value: `K ${Math.round(futureValue).toLocaleString()}` },
              { label: 'Total Invested', value: `K ${Math.round(totalInvested).toLocaleString()}` },
              { label: 'Best Case', value: `K ${Math.round(bestCase).toLocaleString()}` },
            ].map(({ label, value }) => (
              <div key={label} style={{ padding: 14, background: C.gray50, borderRadius: 10, border: `1px solid ${C.gray100}` }}>
                <div style={{ fontSize: 11, color: C.gray400, fontWeight: 600, marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: C.navy, fontFamily: font.serif }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Projection chart */}
          <div style={{ height: 140, border: `1px solid ${C.gray100}`, borderRadius: 10, padding: 12, background: C.offWhite }}>
            <MiniChart data={projChart} width={320} height={120} color={C.navy} />
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 6, border: `1px solid ${C.gray200}`, background: C.white, cursor: 'pointer', fontFamily: font.sans, fontSize: 12, fontWeight: 600, color: C.gray600 }}>
              <CheckCircle size={14} /> Save Scenario
            </button>
            <button onClick={() => onNavigate('portal')} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 6, border: 'none', background: C.red, color: C.white, cursor: 'pointer', fontFamily: font.sans, fontSize: 12, fontWeight: 700 }}>
              Start Investing <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════ */
/*  INSIGHTS & MARKET DATA                    */
/* ═══════════════════════════════════════════ */
const newsItems = [
  { title: 'Longhorn Associates Igesa Garzonrial Meeting 2024', date: 'Nov 2024', cat: 'Events', excerpt: 'Annual general meeting highlights and key resolutions from the 2024 session.' },
  { title: 'Client Engagement Seminar', date: 'Oct 2024', cat: 'Events', excerpt: 'Opportunities shared as we outlined wealth creation strategies for our investors.' },
  { title: 'End of Year Team Building', date: 'Dec 2024', cat: 'Company', excerpt: 'Remembering milestones and celebrating our team\'s achievements.' },
  { title: 'Understanding the 7 Unit Trust Funds', date: 'Jan 2025', cat: 'Education', excerpt: 'From Listed Equities to the White Coat Fund — fees, risks & suitability.' },
  { title: 'Education Fund: Rising School Fees', date: 'Sep 2024', cat: 'Education', excerpt: 'Our Education Fund (3.5% p.a.) helps parents build for the future.' },
  { title: 'White Coat Fund Spotlight', date: 'Aug 2024', cat: 'Funds', excerpt: 'Lowest fee at 2.5% — designed for medical professionals.' },
];

function InsightsPage({ onNavigate }) {
  const [tab, setTab] = useState('markets');
  const tabs = ['Markets', 'Funds', 'Economy', 'Education'];
  const chartData = genChart(12, 100, 0.09);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 64px)' }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${C.navyDark} 0%, ${C.navy} 100%)`, padding: '32px 60px' }}>
        <h1 style={{ fontFamily: font.serif, fontSize: 30, fontWeight: 700, color: C.white, marginBottom: 4 }}>Insights & Market Data</h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>Stay informed with the latest market trends and investment insights</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', background: C.white, padding: '0 60px', borderBottom: `1px solid ${C.gray100}` }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t.toLowerCase())} style={{
            padding: '14px 24px', border: 'none', cursor: 'pointer', fontFamily: font.sans,
            fontSize: 14, fontWeight: tab === t.toLowerCase() ? 700 : 500,
            color: tab === t.toLowerCase() ? C.navy : C.gray400,
            borderBottom: tab === t.toLowerCase() ? `3px solid ${C.navy}` : '3px solid transparent',
            background: 'transparent', transition: 'all 0.2s',
          }}>{t}</button>
        ))}
      </div>

      {/* Chart + Stats */}
      <div style={{ display: 'flex', padding: '24px 60px', background: C.offWhite, borderBottom: `1px solid ${C.gray100}` }}>
        <div style={{ flex: 1, height: 220, border: `1px solid ${C.gray100}`, borderRadius: 12, padding: 16, background: C.white, marginRight: 24 }}>
          <MiniChart data={chartData} width={540} height={190} color={C.navy} />
        </div>
        <div style={{ width: 220 }}>
          {[
            { label: 'Annual Return', value: '8.2%', color: C.red },
            { label: 'Fund Size', value: 'K250M', color: C.gray900 },
            { label: 'Volatility', value: '3.5%', color: C.gray900 },
            { label: 'Expense Ratio', value: '1.2%', color: C.gray900 },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: C.gray400, fontWeight: 600 }}>{label}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color, fontFamily: font.serif }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      <MarketTicker />

      {/* Insights & Events */}
      <div style={{ padding: '32px 60px', background: C.white, flex: 1 }}>
        <h2 style={{ fontFamily: font.serif, fontSize: 22, fontWeight: 700, color: C.gray900, marginBottom: 20 }}>Insights & Events</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {newsItems.slice(0, 3).map(item => (
            <div key={item.title} style={{
              background: C.white, borderRadius: 12, overflow: 'hidden',
              border: `1px solid ${C.gray100}`, transition: 'all 0.25s', cursor: 'pointer',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ height: 140, background: `linear-gradient(135deg, ${C.navy}, ${C.navyLight})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Newspaper size={32} style={{ color: 'rgba(255,255,255,0.3)' }} />
              </div>
              <div style={{ padding: 18 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: C.red, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.cat}</span>
                <h3 style={{ fontFamily: font.serif, fontSize: 15, fontWeight: 700, color: C.gray900, marginTop: 6, marginBottom: 8, lineHeight: 1.3 }}>{item.title}</h3>
                <p style={{ fontSize: 12, color: C.gray500, lineHeight: 1.5 }}>{item.excerpt}</p>
                <div style={{ fontSize: 11, color: C.gray400, marginTop: 10 }}>{item.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════ */
/*  ABOUT PAGE                                */
/* ═══════════════════════════════════════════ */
function AboutPage() {
  const [tab, setTab] = useState('about');
  const tabs = [{ k: 'about', l: 'About Us' }, { k: 'governance', l: 'Governance' }, { k: 'team', l: 'Our Team' }, { k: 'values', l: 'Core Values' }];
  const team = [
    { name: 'Loretta Ward', role: 'Founder & CEO', i: 'LW' }, { name: 'David Mwansa', role: 'Chief Investment Officer', i: 'DM' },
    { name: 'Chileshe Banda', role: 'Head of Portfolio Mgmt', i: 'CB' }, { name: 'Natasha Phiri', role: 'Client Relations Director', i: 'NP' },
    { name: 'Brian Zulu', role: 'Risk & Compliance Manager', i: 'BZ' }, { name: 'Grace Tembo', role: 'Sr. Investment Analyst', i: 'GT' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 64px)' }}>
      <div style={{ background: `linear-gradient(135deg, ${C.navyDark} 0%, ${C.navy} 100%)`, padding: '32px 60px' }}>
        <h1 style={{ fontFamily: font.serif, fontSize: 30, fontWeight: 700, color: C.white }}>About Longhorn Associates</h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>SEC & PIA Licensed Investment Management Company</p>
      </div>
      <div style={{ display: 'flex', background: C.white, padding: '0 60px', borderBottom: `1px solid ${C.gray100}` }}>
        {tabs.map(t => (
          <button key={t.k} onClick={() => setTab(t.k)} style={{
            padding: '14px 24px', border: 'none', cursor: 'pointer', fontFamily: font.sans,
            fontSize: 14, fontWeight: tab === t.k ? 700 : 500,
            color: tab === t.k ? C.navy : C.gray400,
            borderBottom: tab === t.k ? `3px solid ${C.red}` : '3px solid transparent',
            background: 'transparent',
          }}>{t.l}</button>
        ))}
      </div>

      <div style={{ flex: 1, padding: '32px 60px', background: C.offWhite }}>
        {tab === 'about' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 32 }}>
            <div>
              <div style={{ width: 40, height: 3, background: C.red, borderRadius: 2, marginBottom: 16 }} />
              <h2 style={{ fontFamily: font.serif, fontSize: 24, fontWeight: 700, color: C.gray900, marginBottom: 16 }}>Who We Are</h2>
              <p style={{ fontSize: 15, color: C.gray600, lineHeight: 1.8, marginBottom: 14 }}>Longhorn Associates is a Securities and Exchange Commission (SEC) and Pensions and Insurance Authority (PIA) licensed Investment Management Company, providing value-adding investment options for clients in Zambia and globally.</p>
              <p style={{ fontSize: 15, color: C.gray600, lineHeight: 1.8, marginBottom: 20 }}>We are Zambian wholly-owned. Our flagship Retail Collective Investment Scheme (Unit Trust) houses 7 professionally managed funds — from just K100/month — governed by a tripartite structure ensuring your assets are always held separately from the management company.</p>
              {['SEC & PIA Licensed', 'LuSE Member', 'Zambian Wholly-Owned', '7 Unit Trust Funds', '4 Branches: Lusaka, Ndola, Kitwe, Solwezi'].map(f => (
                <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                  <CheckCircle size={16} style={{ color: C.green }} />
                  <span style={{ fontSize: 14, color: C.gray600, fontWeight: 500 }}>{f}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[{ icon: Award, label: '15+', sub: 'Years in Zambia' }, { icon: Users, label: '500+', sub: 'Investors' }, { icon: Globe, label: '7', sub: 'Trust Funds' }, { icon: Building2, label: '4', sub: 'Branches' }].map(({ icon: Ic, label, sub }, idx) => (
                <div key={label} style={{ padding: 24, borderRadius: 14, background: C.white, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'center', marginTop: idx % 2 === 1 ? 20 : 0 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: `${C.red}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}><Ic size={22} style={{ color: C.red }} /></div>
                  <div style={{ fontFamily: font.serif, fontSize: 26, fontWeight: 800, color: C.navy }}>{label}</div>
                  <div style={{ fontSize: 12, color: C.gray400, marginTop: 4, fontWeight: 600 }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'team' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {team.map(t => (
              <div key={t.name} style={{ padding: 28, borderRadius: 14, background: C.white, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: `linear-gradient(135deg, ${C.navy}, ${C.navyLight})`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', fontFamily: font.serif, fontWeight: 700, fontSize: 20, color: C.white }}>{t.i}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.gray900 }}>{t.name}</div>
                <div style={{ fontSize: 13, color: C.red, fontWeight: 600, marginTop: 4 }}>{t.role}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'values' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {[{ I: Shield, l: 'Integrity', d: 'Complete transparency in all we do.' }, { I: TrendingUp, l: 'Performance', d: 'Delivering superior, consistent returns.' }, { I: Users, l: 'Community', d: 'Investing in Zambia\'s collective prosperity.' }, { I: Award, l: 'Excellence', d: 'Highest professional standards in everything.' }].map(({ I, l, d }) => (
              <div key={l} style={{ padding: 28, borderRadius: 14, background: C.white, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'center' }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${C.red}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}><I size={24} style={{ color: C.red }} /></div>
                <div style={{ fontFamily: font.serif, fontSize: 18, fontWeight: 700, color: C.gray900, marginBottom: 8 }}>{l}</div>
                <div style={{ fontSize: 13, color: C.gray500, lineHeight: 1.6 }}>{d}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'governance' && (
          <div style={{ maxWidth: 700 }}>
            <div style={{ width: 40, height: 3, background: C.red, borderRadius: 2, marginBottom: 16 }} />
            <h2 style={{ fontFamily: font.serif, fontSize: 24, fontWeight: 700, color: C.gray900, marginBottom: 16 }}>Governance Structure</h2>
            <p style={{ fontSize: 15, color: C.gray600, lineHeight: 1.8, marginBottom: 24 }}>The Longhorn Unit Trust operates through a robust tripartite governance structure, ensuring the highest standards of accountability and investor protection:</p>
            {[
              { title: 'Fund Manager — Longhorn Associates', desc: 'Licensed by SEC to make investment decisions and manage the Unit Trust portfolios.' },
              { title: 'Custodian — Approved Bank', desc: 'An independent bank holds all fund assets, ensuring separation from the management company.' },
              { title: 'Trustee — Independent Firm', desc: 'An approved independent firm acts as registered Trustee, overseeing fund operations on behalf of investors.' },
              { title: 'Regulator — SEC Zambia', desc: 'The Securities and Exchange Commission authorizes, regulates, and monitors all Unit Trust operations.' },
            ].map(({ title, desc }, i) => (
              <div key={title} style={{ display: 'flex', gap: 16, marginBottom: 16, padding: '18px 22px', borderRadius: 12, background: C.white, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: C.navy, color: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: font.serif, fontWeight: 700, fontSize: 16, flexShrink: 0 }}>{i + 1}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.gray900, marginBottom: 4 }}>{title}</div>
                  <p style={{ fontSize: 13, color: C.gray500, lineHeight: 1.6 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════ */
/*  CONTACT PAGE                              */
/* ═══════════════════════════════════════════ */
const branches = [
  { name: 'Head Office — Lusaka', addr: 'Ground Floor, Gardenview Office Park\nPlot 1146/15, Lagos Road, Rhodespark\nP.O. Box 50655, Ridgeway', ph: '+260 211 25 25 40' },
  { name: 'Ndola Branch', addr: 'Mwasumina Road, Plot 32\nItawa, Ndola', ph: '+260 956 55 22 38' },
  { name: 'Kitwe Branch', addr: 'Unit E, Second Floor, Building 2\nECL Business Park, Stand 7732\nFreedom Avenue', ph: '+260 950 85 36 41' },
  { name: 'Solwezi Branch', addr: 'Plot No. 133, Independence Ave\nFirst Floor, New Jaids Complex', ph: '+260 95 337 8634' },
];

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [sent, setSent] = useState(false);
  const iS = { width: '100%', padding: '11px 14px', borderRadius: 8, border: `1.5px solid ${C.gray200}`, fontSize: 14, fontFamily: font.sans, outline: 'none', color: C.gray800, background: C.white };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 64px)' }}>
      <div style={{ background: `linear-gradient(135deg, ${C.navyDark} 0%, ${C.navy} 100%)`, padding: '32px 60px' }}>
        <h1 style={{ fontFamily: font.serif, fontSize: 30, fontWeight: 700, color: C.white }}>Contact Us</h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>Visit any of our 4 branches or get in touch online</p>
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1.4fr', background: C.white }}>
        {/* Branches */}
        <div style={{ padding: '28px 32px', background: C.navy, color: C.white, overflowY: 'auto' }}>
          <h3 style={{ fontFamily: font.serif, fontSize: 18, marginBottom: 20 }}>Our Locations</h3>
          {branches.map(b => (
            <div key={b.name} style={{ marginBottom: 14, padding: 14, borderRadius: 10, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <Building2 size={13} style={{ color: C.red }} />
                <span style={{ fontSize: 13, fontWeight: 700 }}>{b.name}</span>
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, whiteSpace: 'pre-line', marginBottom: 6 }}>{b.addr}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}><Phone size={11} />{b.ph}</div>
            </div>
          ))}
          <div style={{ padding: 14, borderRadius: 10, background: 'rgba(255,255,255,0.08)', marginTop: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}><Mail size={12} /><span style={{ fontSize: 12, fontWeight: 700 }}>Email</span></div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>info@longhorn-associates.com</div>
          </div>
          <div style={{ padding: 14, borderRadius: 10, background: 'rgba(255,255,255,0.08)', marginTop: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}><Globe size={12} /><span style={{ fontSize: 12, fontWeight: 700 }}>Website</span></div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>www.longhorn-associates.com</div>
          </div>
        </div>

        {/* Form */}
        <div style={{ padding: '28px 48px', overflowY: 'auto' }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: `${C.red}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}><CheckCircle size={32} style={{ color: C.red }} /></div>
              <h3 style={{ fontFamily: font.serif, fontSize: 22, color: C.gray900, marginBottom: 10 }}>Message Sent!</h3>
              <p style={{ color: C.gray500, marginBottom: 24 }}>We'll respond within one business day.</p>
              <button onClick={() => setSent(false)} style={{ padding: '12px 28px', background: C.red, color: C.white, fontWeight: 700, fontSize: 14, borderRadius: 6, border: 'none', cursor: 'pointer', fontFamily: font.sans }}>Send Another</button>
            </div>
          ) : (
            <>
              <h3 style={{ fontFamily: font.serif, fontSize: 22, color: C.gray900, marginBottom: 24 }}>Send Us a Message</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                {[{ k: 'name', l: 'Full Name', p: 'Your name' }, { k: 'email', l: 'Email', p: 'your@email.com' }].map(({ k, l, p }) => (
                  <div key={k}><label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: C.gray600, marginBottom: 5 }}>{l}</label><input placeholder={p} value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} style={iS} onFocus={e => e.target.style.borderColor = C.red} onBlur={e => e.target.style.borderColor = C.gray200} /></div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div><label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: C.gray600, marginBottom: 5 }}>Phone</label><input placeholder="+260 ..." value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={iS} onFocus={e => e.target.style.borderColor = C.red} onBlur={e => e.target.style.borderColor = C.gray200} /></div>
                <div><label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: C.gray600, marginBottom: 5 }}>Service</label>
                  <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} style={{ ...iS, background: C.white }}>
                    <option value="">Select...</option>
                    {['Listed Equities Fund', 'Fixed Income Fund', 'Property Fund', 'Multi Assets Fund', 'Education Fund', 'White Coat Fund', 'Gratuity Fund', 'Portfolio Management', 'Pension Fund', 'Advisory', 'General'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: 20 }}><label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: C.gray600, marginBottom: 5 }}>Message</label><textarea placeholder="Tell us about your goals..." rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ ...iS, resize: 'vertical' }} onFocus={e => e.target.style.borderColor = C.red} onBlur={e => e.target.style.borderColor = C.gray200} /></div>
              <button onClick={() => setSent(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: C.red, color: C.white, fontWeight: 700, fontSize: 14, borderRadius: 6, border: 'none', cursor: 'pointer', fontFamily: font.sans }}>Send Message <ArrowRight size={14} /></button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════ */
/*  PORTAL PAGE                               */
/* ═══════════════════════════════════════════ */
function PortalPage() {
  const [tab, setTab] = useState('login');
  const [step, setStep] = useState(1);
  const iS = { width: '100%', padding: '11px 14px', borderRadius: 8, border: `1.5px solid ${C.gray200}`, fontSize: 14, fontFamily: font.sans, outline: 'none', color: C.gray800, background: C.white };
  const lS = { display: 'block', fontSize: 12, fontWeight: 600, color: C.gray600, marginBottom: 5 };
  const fH = e => e.target.style.borderColor = C.red;
  const bH = e => e.target.style.borderColor = C.gray200;

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 64px)', background: C.offWhite, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '40%', background: `linear-gradient(135deg, ${C.navyDark} 0%, ${C.navy} 100%)` }} />
      <div style={{ position: 'absolute', top: '15%', right: '15%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,30,47,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 1, padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontFamily: font.serif, fontSize: 28, fontWeight: 800, color: C.white, marginBottom: 6 }}>
            <span style={{ color: C.red }}>SIMP</span> Invest
          </div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Secure Investor Management Portal</p>
        </div>

        <div style={{ background: C.white, borderRadius: 16, padding: 32, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
          <div style={{ display: 'flex', background: C.gray50, borderRadius: 10, padding: 3, marginBottom: 24 }}>
            {['login', 'register'].map(t => (
              <button key={t} onClick={() => { setTab(t); setStep(1); }} style={{
                flex: 1, padding: '10px 0', borderRadius: 8, border: 'none', cursor: 'pointer',
                fontFamily: font.sans, fontWeight: 600, fontSize: 14,
                background: tab === t ? C.navy : 'transparent',
                color: tab === t ? C.white : C.gray400,
              }}>{t === 'login' ? 'Sign In' : 'Register'}</button>
            ))}
          </div>

          {tab === 'login' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[{ l: 'Email Address', t: 'email', p: 'your@email.com' }, { l: 'Password', t: 'password', p: '••••••••' }].map(({ l, t, p }) => (
                <div key={l}><label style={lS}>{l}</label><input type={t} placeholder={p} style={iS} onFocus={fH} onBlur={bH} /></div>
              ))}
              <div style={{ textAlign: 'right', marginTop: -6 }}><a href="#" style={{ fontSize: 12, color: C.red, fontWeight: 600 }}>Forgot password?</a></div>
              <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '14px 0', background: C.red, color: C.white, fontWeight: 700, fontSize: 14, borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: font.sans }}>
                <LogIn size={16} /> Sign In
              </button>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
                {[1, 2, 3].map(s => (<div key={s} style={{ flex: 1, height: 3, borderRadius: 2, background: s <= step ? C.red : C.gray200 }} />))}
              </div>
              <h3 style={{ fontFamily: font.serif, fontSize: 17, color: C.gray900, marginBottom: 3 }}>
                {step === 1 ? 'Personal Details' : step === 2 ? 'Investment Profile' : 'Upload Documents'}
              </h3>
              <p style={{ fontSize: 12, color: C.gray400, marginBottom: 18 }}>Step {step} of 3</p>

              {step === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {['First Name', 'Last Name'].map(l => (<div key={l}><label style={lS}>{l}</label><input style={iS} onFocus={fH} onBlur={bH} /></div>))}
                  </div>
                  {['Email', 'Phone', 'NRC / Passport'].map(l => (<div key={l}><label style={lS}>{l}</label><input style={iS} onFocus={fH} onBlur={bH} /></div>))}
                  <button onClick={() => setStep(2)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '12px 0', background: C.navy, color: C.white, fontWeight: 700, fontSize: 14, borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: font.sans, marginTop: 4 }}>Next <ChevronRight size={14} /></button>
                </div>
              )}
              {step === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div><label style={lS}>Fund</label><select style={iS}>{funds.map(f => <option key={f.id}>{f.name}</option>)}</select></div>
                  <div><label style={lS}>Amount (ZMW)</label><input type="number" placeholder="K500 lump / K100 monthly" style={iS} onFocus={fH} onBlur={bH} /></div>
                  <label style={lS}>Type</label>
                  <div style={{ display: 'flex', gap: 6 }}>{['Lump Sum (K500+)', 'Monthly DDAC (K100+)', 'Payroll'].map(r => (<button key={r} style={{ flex: 1, padding: '9px 4px', borderRadius: 7, border: `1.5px solid ${C.gray200}`, background: 'transparent', color: C.gray500, fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: font.sans }} onMouseEnter={e => { e.currentTarget.style.borderColor = C.red; e.currentTarget.style.color = C.red; }} onMouseLeave={e => { e.currentTarget.style.borderColor = C.gray200; e.currentTarget.style.color = C.gray500; }}>{r}</button>))}</div>
                  <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                    <button onClick={() => setStep(1)} style={{ flex: 1, padding: '12px 0', borderRadius: 8, border: `1.5px solid ${C.gray200}`, background: 'transparent', color: C.gray600, fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: font.sans }}>Back</button>
                    <button onClick={() => setStep(3)} style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '12px 0', background: C.navy, color: C.white, fontWeight: 700, fontSize: 14, borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: font.sans }}>Next <ChevronRight size={14} /></button>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {['Copy of ID (NRC/Passport)', 'Passport Photo', 'Reference Letter', 'Proof of Residence'].map(l => (
                    <div key={l} style={{ padding: 14, borderRadius: 10, border: `1.5px dashed ${C.gray300}`, textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = C.red; e.currentTarget.style.background = C.redLight; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = C.gray300; e.currentTarget.style.background = 'transparent'; }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: C.gray800, marginBottom: 2 }}>{l}</div>
                      <div style={{ fontSize: 11, color: C.red, fontWeight: 600 }}>+ Upload</div>
                    </div>
                  ))}
                  <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                    <button onClick={() => setStep(2)} style={{ flex: 1, padding: '12px 0', borderRadius: 8, border: `1.5px solid ${C.gray200}`, background: 'transparent', color: C.gray600, fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: font.sans }}>Back</button>
                    <button onClick={() => alert('Application submitted!')} style={{ flex: 2, padding: '12px 0', background: C.red, color: C.white, fontWeight: 700, fontSize: 14, borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: font.sans }}>Submit Application</button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <p style={{ textAlign: 'center', fontSize: 10, color: C.gray400, marginTop: 14 }}>256-bit SSL · Regulated by SEC & PIA Zambia</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════ */
/*  TOOLS PAGE (Calculator standalone)        */
/* ═══════════════════════════════════════════ */
function ToolsPage({ onNavigate }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 64px)' }}>
      <div style={{
        background: `linear-gradient(135deg, ${C.navyDark} 0%, ${C.navy} 100%)`,
        padding: '32px 60px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.03) 60px, rgba(255,255,255,0.03) 61px)`,
          pointerEvents: 'none'
        }} />
        <h1 style={{ fontFamily: font.serif, fontSize: 30, fontWeight: 700, color: C.white, position: 'relative' }}>Return Projection Calculator</h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginTop: 6, position: 'relative' }}>Project your investment growth across our 7 Unit Trust funds</p>
      </div>
      <div style={{ flex: 1, padding: '32px 60px', background: C.offWhite }}>
        <ReturnCalculator fund={funds[3]} />
      </div>
      <MarketTicker />
    </div>
  );
}

/* ═══════════════════════════════════════════ */
/*  MAIN APP                                  */
/* ═══════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState('home');
  const [fundId, setFundId] = useState(null);
  const [dropdown, setDropdown] = useState(null);
  const scrollRef = useRef(null);

  const navigate = useCallback((p, fId, tab) => {
    if (p === 'fund') {
      setPage('fund');
      setFundId(fId || 'fixed-income');
    } else {
      setPage(p);
    }
    setDropdown(null);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, []);

  const navItems = [
    { label: 'About', hasDropdown: true, items: [
      { label: 'About Us', action: () => navigate('about') },
      { label: 'Governance', action: () => navigate('about') },
      { label: 'Our Team', action: () => navigate('about') },
      { label: 'Core Values', action: () => navigate('about') },
    ]},
    { label: 'Products', hasDropdown: true, items: funds.map(f => ({ label: f.short, action: () => navigate('fund', f.id) })) },
    { label: 'Governance', action: () => navigate('about') },
    { label: 'Insights', action: () => navigate('insights') },
    { label: 'Tools', action: () => navigate('tools') },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden', fontFamily: font.sans, background: C.white, WebkitFontSmoothing: 'antialiased' }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } input[type="range"] { height: 4px; } input[type="range"]::-webkit-slider-thumb { width: 16px; height: 16px; }`}</style>

      {/* ── TOP NAV ── */}
      <nav style={{
        height: 64, minHeight: 64, background: C.white, borderBottom: `1px solid ${C.gray100}`,
        display: 'flex', alignItems: 'center', padding: '0 40px', zIndex: 200, position: 'relative',
      }}>
        {/* Logo */}
        <div onClick={() => navigate('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3 }}>
          <span style={{ fontFamily: font.serif, fontSize: 22, fontWeight: 800, color: C.red }}>Longhorn</span>
          <span style={{ fontFamily: font.sans, fontSize: 14, fontWeight: 600, color: C.navy, marginTop: 2 }}>Associates</span>
        </div>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginLeft: 'auto' }}>
          {navItems.map(item => (
            <div key={item.label} style={{ position: 'relative' }}
              onMouseEnter={() => item.hasDropdown && setDropdown(item.label)}
              onMouseLeave={() => setDropdown(null)}
            >
              <button onClick={item.action} style={{
                display: 'flex', alignItems: 'center', gap: 4, padding: '8px 16px',
                fontSize: 14, fontWeight: 500, color: C.gray600, background: 'none',
                border: 'none', cursor: 'pointer', fontFamily: font.sans,
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = C.navy}
                onMouseLeave={e => e.currentTarget.style.color = C.gray600}
              >
                {item.label}
                {item.hasDropdown && <ChevronDown size={14} />}
              </button>

              {/* Dropdown */}
              {item.hasDropdown && dropdown === item.label && (
                <div style={{
                  position: 'absolute', top: '100%', left: 0, minWidth: 200,
                  background: C.white, borderRadius: 10, boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
                  border: `1px solid ${C.gray100}`, padding: '6px 0', zIndex: 300,
                }}>
                  {item.items.map(sub => (
                    <button key={sub.label} onClick={sub.action} style={{
                      display: 'block', width: '100%', textAlign: 'left', padding: '10px 18px',
                      fontSize: 13, fontWeight: 500, color: C.gray600, background: 'transparent',
                      border: 'none', cursor: 'pointer', fontFamily: font.sans,
                      transition: 'all 0.15s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = C.gray50; e.currentTarget.style.color = C.red; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.gray600; }}
                    >{sub.label}</button>
                  ))}
                </div>
              )}
            </div>
          ))}

          <button onClick={() => navigate('portal')} style={{
            marginLeft: 12, padding: '9px 20px', background: C.red, color: C.white,
            fontSize: 12, fontWeight: 700, fontFamily: font.sans, border: 'none',
            borderRadius: 6, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6,
            transition: 'all 0.2s', letterSpacing: '0.02em',
          }}
            onMouseEnter={e => e.currentTarget.style.background = C.redHover}
            onMouseLeave={e => e.currentTarget.style.background = C.red}
          >
            SIMP Invest <ArrowUpRight size={12} />
          </button>

          <button style={{ marginLeft: 8, width: 36, height: 36, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.gray500 }}>
            <Search size={18} />
          </button>
        </div>
      </nav>

      {/* ── PAGE CONTENT ── */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {page === 'home' && <HomePage onNavigate={navigate} />}
        {page === 'fund' && <FundDetailPage fundId={fundId} onNavigate={navigate} />}
        {page === 'products' && <HomePage onNavigate={navigate} />}
        {page === 'insights' && <InsightsPage onNavigate={navigate} />}
        {page === 'about' && <AboutPage />}
        {page === 'contact' && <ContactPage />}
        {page === 'tools' && <ToolsPage onNavigate={navigate} />}
        {page === 'portal' && <PortalPage />}
      </div>
    </div>
  );
}