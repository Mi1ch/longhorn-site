import React, { useState, useEffect, useCallback, useRef } from "react";
import "./index.css";
import {
  ArrowRight, TrendingUp, CheckCircle, Shield, Award, Users, BarChart2,
  ChevronDown, ChevronRight, ChevronLeft, Search, LogIn, Building, PieChart,
  GraduationCap, Briefcase, BookOpen, Globe, Target, Mail, Phone, Clock,
  Lock, FileText, CreditCard, UserCheck, Building2, X, DollarSign, Activity,
  Info, Play, Calculator, Newspaper, Calendar, Heart, Eye, Star, ArrowUpRight,
  AlertTriangle
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
/*  HERO SLIDES DATA                          */
/* ═══════════════════════════════════════════ */
const heroSlides = [
  { image: '/images/Banner1.jpeg', icon: Shield, title: 'Pension Fund Management', subtitle: 'Secure Your Retirement', desc: 'We manage pension portfolios under strict PIA regulatory oversight — ensuring your retirement savings grow safely while delivering competitive, long-term returns for individuals and corporates.' },
  { image: '/images/Banner2.jpeg', icon: TrendingUp, title: 'Unit Trust Fund Management', subtitle: 'Invest From Just K100/Month', desc: 'Our SEC-governed Unit Trust pools investor funds into 7 professionally managed portfolios — from equities to property — making diversified investing accessible to every Zambian.' },
  { image: '/images/Banner3.jpeg', icon: DollarSign, title: 'Credit', subtitle: 'Flexible Financing Solutions', desc: 'Access tailored credit facilities designed to meet your personal and business funding needs, backed by our deep understanding of Zambia\'s financial landscape.' },
  { image: '/images/Banner4.jpeg', icon: BarChart2, title: 'Securities & Stock Broking', subtitle: 'Trade on the LuSE', desc: 'Buy and sell equities listed on the Lusaka Securities Exchange with expert guidance from our licensed brokers. Access real-time market insights and execution.' },
  { image: '/images/Banner5.jpeg', icon: Briefcase, title: 'Consultancy & Advisory', subtitle: 'Expert Financial Guidance', desc: 'Our licensed advisors provide personalised, objective investment guidance — from portfolio structuring and market analysis to comprehensive financial planning.' },
  { image: '/images/Banner1.jpeg', icon: AlertTriangle, title: 'Risk Management', subtitle: 'Protect Your Investments', desc: 'We identify, assess and mitigate financial risks across your portfolio using robust frameworks — ensuring your wealth is protected against market volatility and uncertainty.' },
];

/* ═══════════════════════════════════════════ */
/*  HOME PAGE                                 */
/* ═══════════════════════════════════════════ */
function HomePage({ onNavigate }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef(null);

  const quickLinks = [
    { icon: Info, label: 'About Longhorn', page: 'about' },
    { icon: BarChart2, label: 'Our Products', page: 'products' },
    { icon: Shield, label: 'Governance', page: 'about' },
    { icon: Users, label: 'Our Team', page: 'about' },
    { icon: Heart, label: 'Core Values', page: 'about' },
    { icon: Newspaper, label: 'Insights & News', page: 'insights' },
  ];

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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 64px)' }}>

      {/* ── Market Updates Ticker — above hero ── */}
      <MarketTicker />

      {/* ══════════════════════════════════════════
          HERO — Cycling banners with service info
          Place Banner1.jpeg–Banner5.jpeg in public/images/
          ══════════════════════════════════════════ */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        height: 320, minHeight: 320, maxHeight: 320,
        display: 'flex', alignItems: 'center',
        marginTop: 6,
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

        {/* Subtle left-side gradient for text readability — no full-image tint */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 45%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Slide content */}
        <div style={{ position: 'relative', zIndex: 1, padding: '0 60px', maxWidth: 640 }}>
          {/* Service tag with icon */}
          <div key={`tag-${currentSlide}`} style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '6px 16px', borderRadius: 6,
            background: 'rgba(196,30,47,0.75)', border: '1px solid rgba(196,30,47,0.85)',
            marginBottom: 18,
            animation: 'heroFadeUp 0.6s ease both',
          }}>
            <SlideIcon size={14} style={{ color: '#fff' }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {slide.title}
            </span>
          </div>

          <h1 key={`h-${currentSlide}`} style={{
            fontFamily: font.serif, fontWeight: 800,
            fontSize: 'clamp(2rem, 3.6vw, 2.8rem)', lineHeight: 1.15,
            color: C.white, marginBottom: 14,
            textShadow: '0 2px 16px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.4)',
            animation: 'heroFadeUp 0.6s ease 0.1s both',
          }}>
            {slide.subtitle}
          </h1>

          <p key={`p-${currentSlide}`} style={{
            fontSize: 14, color: 'rgba(255,255,255,0.92)', lineHeight: 1.7,
            marginBottom: 24, maxWidth: 480,
            textShadow: '0 1px 6px rgba(0,0,0,0.4)',
            animation: 'heroFadeUp 0.6s ease 0.2s both',
          }}>
            {slide.desc}
          </p>

          <div key={`btn-${currentSlide}`} style={{ display: 'flex', gap: 10, animation: 'heroFadeUp 0.6s ease 0.3s both' }}>
            <button onClick={() => onNavigate('products')} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 26px',
              background: C.red, color: C.white, fontWeight: 700, fontSize: 13,
              borderRadius: 6, border: 'none', cursor: 'pointer', fontFamily: font.sans,
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = C.redHover}
              onMouseLeave={e => e.currentTarget.style.background = C.red}
            >Learn More <ArrowRight size={15} /></button>
            <button onClick={() => onNavigate('contact')} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 26px',
              background: 'rgba(255,255,255,0.15)', color: C.white, fontWeight: 700, fontSize: 13,
              borderRadius: 6, border: '1px solid rgba(255,255,255,0.35)', cursor: 'pointer',
              fontFamily: font.sans, backdropFilter: 'blur(4px)', transition: 'all 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.35)'}
            >Get in Touch</button>
          </div>
        </div>

        {/* Arrow navigation */}
        <button onClick={prevSlide} style={{
          position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
          width: 42, height: 42, borderRadius: '50%', background: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: '#fff', zIndex: 10, transition: 'all 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.35)'}
        ><ChevronLeft size={20} /></button>

        <button onClick={nextSlide} style={{
          position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
          width: 42, height: 42, borderRadius: '50%', background: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: '#fff', zIndex: 10, transition: 'all 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.35)'}
        ><ChevronRight size={20} /></button>

        {/* Dot indicators */}
        <div style={{
          position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: 8, zIndex: 10,
          padding: '6px 14px', background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(8px)',
          borderRadius: 20,
        }}>
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => goToSlide(i)} style={{
              width: currentSlide === i ? 24 : 8, height: 8,
              borderRadius: currentSlide === i ? 4 : 50,
              border: 'none', cursor: 'pointer', padding: 0,
              background: currentSlide === i ? C.red : 'rgba(255,255,255,0.4)',
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>

        {/* Progress bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(255,255,255,0.1)', zIndex: 10 }}>
          <div key={`prog-${currentSlide}`} style={{
            height: '100%', background: C.red, borderRadius: '0 2px 2px 0',
            animation: 'heroProgress 6s linear both',
          }} />
        </div>

        <style>{`
          @keyframes heroFadeUp {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes heroProgress {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}</style>
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
/*  TEAM DATA                                  */
/* ═══════════════════════════════════════════ */
const boardOfDirectors = [
  { name: 'Chanda HJ Chileshe', role: 'Chairman', photo: '/images/team/ChandaChileshe.jpg', initials: 'CC', bio: 'Chanda is a seasoned lawyer and Managing Partner of Lloyd Jones & Collins with over 35 years experience in commercial and legal practice both locally and internationally. He holds a Bachelor of Arts – Joint Hons. in Law & Economics from the University of Keele as well as a Master of Laws Degree, LLM: Taxation, Insurance, Company Law from the University of London. He is a member of various professional bodies and has sat on various Boards including Finance Bank (Atlas Mara), Colgate Palmolive and the Revenue Appeals Tribunal, among others.' },
  { name: 'Banji Gideon Moono', role: 'Director, CFA', photo: '/images/team/BanjiMoono.jpeg', initials: 'BM', bio: 'Banji is a qualified and experienced Finance, Accounting, and Investment professional with extensive experience in Banking and Investments. He has served in senior management positions with various commercial banks including Finance Bank and most recently, the United Bank for Africa where he is currently serving as the Group Head-Investor Relations based in Nigeria. Banji is a qualified Chartered Management Accountant (CIMA) and holder of the prestigious CFA Charter. He holds a Diploma in Treasury Management and is also a fellow of the Zambia Institute of Chartered Accountants (ZICA).' },
  { name: 'Dionysius Makunka', role: 'CEO, CFA', photo: '/images/team/DionysusMakunka.jpg', initials: 'DM', bio: 'Dionysius is a qualified and experienced Economics and Finance professional with over twenty (20) years of practice with various institutions. He spent about twenty years at the Bank of Zambia where he served in senior management positions prior to going into private practice. He has also been involved in lecturing at the University of Zambia (Derivatives), ZIBFS (Investment Analysis & Portfolio Management) and the University of Lusaka (Risk Management). Dionysius is a Chartered Accountant (ACCA) and holds the prestigious CFA Charter. He also holds the Bachelor of Accountancy degree from the Copperbelt University as well as a Master of Science in Finance & Economics from Manchester University, UK.' },
  { name: 'Namucana Musiwa', role: 'Director', photo: '/images/team/NamucanaMusiwa.jpg', initials: 'NM', bio: 'Namucana is an entrepreneur with extensive experience in governance and talent acquisition. She is the founder and CEO of Career Prospects Limited, one of the leading recruitment agencies in Zambia. She has served and continues to serve on various Boards including the Zambia Qualification Authority, Zambia Institute of Human Resources Management, Professional Insurance Corporation and the University of Zambia Council, Bank of Zambia REMCO, Zambia National Building Society REMCO, among others. Namucana holds a Bachelor of Arts in Public Administration and Economics obtained from the University of Zambia.' },
  { name: 'Andrew John Kangwa', role: 'Investment Committee Member', photo: null, initials: 'AK', bio: 'Andrew is an experienced finance professional and entrepreneur. Having spent several years working in the Finance division of mining group, First Quantum Mining Plc, he set up private enterprises focused on diversified sectors. Among other qualifications, he holds a Master of Business Administration (MBA).' },
  { name: 'Pathias Paupila', role: 'Director', photo: null, initials: 'PP', bio: 'Pathias is a qualified and experienced Legal, Credit, Risk and Compliance professional with extensive exposure to managing complex risk processes gained in several institutions for over 18 years. He possesses extensive experience in the allocation of capital to Small and Medium Enterprises (SMEs). Pathias also Chairs the Risk and Compliance Committee of Longhorn Associates Limited. He holds a Master of Science degree in Risk Management, a Bachelor of Laws degree and a Bachelor of Business Administration degree.' },
];

const managementTeam = [
  { name: 'Dionysius Makunka', role: 'CEO, CFA', photo: '/images/team/DionysusMakunka.jpg', initials: 'DM', bio: 'Dionysius is a qualified and experienced Economics and Finance professional with over twenty (20) years of practice with various institutions. He spent about twenty years at the Bank of Zambia where he served in senior management positions prior to going into private practice. Dionysius is a Chartered Accountant (ACCA) and holds the prestigious CFA Charter.' },
  { name: 'Brian Chilufya Chintu', role: 'Chief Investments & Operations Officer', photo: '/images/team/BrianChilufyaChintu.JPG', initials: 'BC', bio: 'Brian is a qualified and experienced Finance and Investments professional with experience in management of assorted investment portfolios including Pension Funds and Collective Investments. He has specialized in Investments during his time with the Madison Group where he served in various portfolios in Finance and Investments. More recently he served as Commercial Services Director at Zambia Airports Corporation. He comes with a wealth of experience with particular focus in Corporate Finance, Investments and Accounting.' },
  { name: 'Marlon Nsofu', role: 'Chief Systems & Data Analytics Officer', photo: '/images/team/MarlonNsofu.jpg', initials: 'MN', bio: 'Marlon is an investment professional with over fourteen years of experience in managing pension funds and collective investment schemes. His expertise spans across money markets, capital markets, and other key economic sectors. He has earned certifications in computer science and data science, which he leverages to enhance his work in quantitative finance and financial engineering. He holds a bachelor\'s degree in finance from the Robert H. Smith School of Business at the University of Maryland, USA.' },
  { name: 'Izukanji Nachiza Mwanza', role: 'CFO', photo: '/images/team/IzukanjiMwanza.jpg', initials: 'IM', bio: 'Izukanji started her accounting career with AMO Chartered Accountants in 2011 where she worked as a Management Trainee. She later worked at various institutions in the Finance and Accounting role. Prior to her accounting career, she pursued a diploma in Chemical Engineering at the Copperbelt University. Izukanji is a Chartered Accountant and holder of the ACCA qualification. She is also a member of both ACCA and ZICA.' },
  { name: 'Lewis Mwale', role: 'Chief Partnerships Officer', photo: '/images/team/lewis.jpg', initials: 'LM', bio: 'Lewis is a qualified Social Security Expert and Financial Advisor with over 7 years work experience in the Pensions Industry in Zambia. He holds a Bachelor\'s Degree in Business Administration from the Copperbelt University and is currently pursuing a Master of Business Administration (MBA) - Finance. Prior to joining Longhorn, Lewis worked as a Financial Controller for Innscor Zambia Limited and as a Credit and Debt Analyst for Vision Fund Zambia.' },
  { name: 'Patrick Edward Zulu', role: 'Chief Credit Operations & Fintech Officer', photo: null, initials: 'PZ', bio: 'Patrick is a seasoned Certified Credit Professional and management specialist with a proven record of building and leading diverse teams. He holds an MBA in Accounting and Finance from the University of Liverpool and a BA with a bias in Economics from the University of Zambia. With more than 18 years of experience, Patrick has worked across credit risk, strategic planning, human resource management and change management at leading institutions including Bayport Financial Services and Micro Finance Zambia Limited.' },
];

/* ── Team Member Card ── */
function TeamCard({ member, accentColor, onSelect }) {
  const [imgError, setImgError] = useState(false);
  const hasPhoto = member.photo && !imgError;
  return (
    <div onClick={() => onSelect(member)} style={{
      background: C.white, borderRadius: 16, overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)', cursor: 'pointer',
      transition: 'all 0.3s', border: '1px solid rgba(0,0,0,0.06)',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; }}
    >
      <div style={{
        height: 200, background: hasPhoto ? 'none' : `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
      }}>
        {hasPhoto ? (
          <img src={member.photo} alt={member.name} onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
        ) : (
          <span style={{ fontFamily: font.serif, fontWeight: 700, fontSize: 48, color: '#fff', opacity: 0.9 }}>{member.initials}</span>
        )}
      </div>
      <div style={{ padding: '18px 20px' }}>
        <h3 style={{ fontFamily: font.serif, fontSize: 16, fontWeight: 700, color: C.gray900, marginBottom: 4, lineHeight: 1.3 }}>{member.name}</h3>
        <p style={{ fontSize: 12, color: accentColor, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>{member.role}</p>
        <p style={{ fontSize: 12, color: C.gray500, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{member.bio}</p>
        <div style={{ fontSize: 12, color: accentColor, fontWeight: 600, marginTop: 10 }}>View Profile →</div>
      </div>
    </div>
  );
}

/* ── Team Member Modal ── */
function TeamModal({ member, accentColor, onClose }) {
  const [imgError, setImgError] = useState(false);
  const hasPhoto = member.photo && !imgError;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
      zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 20, maxWidth: 640, width: '100%',
        maxHeight: '85vh', overflow: 'auto', position: 'relative', boxShadow: '0 24px 64px rgba(0,0,0,0.2)',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 16, right: 16, width: 36, height: 36, borderRadius: '50%',
          background: '#f3f4f6', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10,
        }}><X size={18} style={{ color: '#374151' }} /></button>
        <div style={{ display: 'flex' }}>
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
              <span style={{ fontFamily: font.serif, fontWeight: 700, fontSize: 56, color: '#fff', opacity: 0.9 }}>{member.initials}</span>
            )}
          </div>
          <div style={{ flex: 1, padding: '32px 32px 32px 28px' }}>
            <h2 style={{ fontFamily: font.serif, fontSize: 22, fontWeight: 700, color: C.gray900, marginBottom: 4 }}>{member.name}</h2>
            <p style={{ fontSize: 13, color: accentColor, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 20 }}>{member.role}</p>
            <div style={{ width: 32, height: 3, borderRadius: 2, background: accentColor, marginBottom: 16 }} />
            <p style={{ fontSize: 14, color: C.gray600, lineHeight: 1.8 }}>{member.bio}</p>
          </div>
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
  const [teamTab, setTeamTab] = useState('board');
  const [selectedMember, setSelectedMember] = useState(null);
  const tabs = [{ k: 'about', l: 'About Us' }, { k: 'governance', l: 'Governance' }, { k: 'team', l: 'Our Team' }, { k: 'values', l: 'Core Values' }];

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

        {/* About Us — unchanged */}
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

        {/* Our Team — NEW: Board of Directors + Management */}
        {tab === 'team' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{ width: 40, height: 3, borderRadius: 2, background: C.red, margin: '0 auto 12px' }} />
              <h2 style={{ fontFamily: font.serif, fontSize: 24, fontWeight: 700, color: C.gray900, marginBottom: 6 }}>Our People</h2>
              <p style={{ fontSize: 14, color: C.gray500, maxWidth: 480, margin: '0 auto' }}>Meet the experienced professionals driving Longhorn Associates forward.</p>
            </div>

            {/* Board / Management toggle */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 32 }}>
              {[{ key: 'board', label: 'Board of Directors' }, { key: 'mgmt', label: 'Management' }].map(t => (
                <button key={t.key} onClick={() => setTeamTab(t.key)} style={{
                  padding: '10px 28px', borderRadius: 100, fontSize: 14, fontWeight: 600, cursor: 'pointer',
                  background: teamTab === t.key ? C.gray900 : C.white,
                  color: teamTab === t.key ? '#fff' : C.gray500,
                  border: teamTab === t.key ? `2px solid ${C.gray900}` : `2px solid ${C.gray200}`,
                  transition: 'all 0.2s', fontFamily: font.sans,
                }}>{t.label}</button>
              ))}
            </div>

            {/* Board of Directors */}
            {teamTab === 'board' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}>
                {boardOfDirectors.map(m => (
                  <TeamCard key={m.name} member={m} accentColor={C.red} onSelect={setSelectedMember} />
                ))}
              </div>
            )}

            {/* Management */}
            {teamTab === 'mgmt' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}>
                {managementTeam.map(m => (
                  <TeamCard key={m.name + m.role} member={m} accentColor={C.navyLight} onSelect={setSelectedMember} />
                ))}
              </div>
            )}

            {/* Bio Modal */}
            {selectedMember && (
              <TeamModal member={selectedMember} accentColor={teamTab === 'board' ? C.red : C.navyLight} onClose={() => setSelectedMember(null)} />
            )}
          </div>
        )}

        {/* Core Values — unchanged */}
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

        {/* Governance — unchanged */}
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
                    {['Pension Fund Management', 'Unit Trust Fund Management', 'Credit', 'Securities & Stock Broking', 'Consultancy & Advisory', 'Risk Management', 'General Enquiry'].map(s => <option key={s}>{s}</option>)}
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
/*  SERVICES / PRODUCTS PAGE                   */
/* ═══════════════════════════════════════════ */
const servicesList = [
  { id: 'pension', icon: Shield, label: 'Pension Fund Management', color: C.red, image: '/images/Services/Pension.png',
    tagline: 'PIA-regulated retirement security',
    desc: 'Our pension fund management service ensures your retirement savings are professionally managed under strict PIA regulatory oversight. We design bespoke pension solutions for individuals, SMEs, and large corporates — delivering competitive, long-term returns while safeguarding your future.',
    features: ['PIA-licensed and regulated', 'Corporate and individual schemes', 'Risk-graded investment options', 'Regular actuarial reviews', 'Comprehensive member reporting', 'Flexible contribution structures'] },
  { id: 'unit-trust', icon: TrendingUp, label: 'Unit Trust Fund Management', color: C.navyLight, image: '/images/Services/Fund.png',
    tagline: 'SEC-governed collective investment schemes',
    desc: 'Our SEC-governed Unit Trust pools investor funds into 7 professionally managed portfolios — from equities and bonds to property and education funds. Starting from just K100/month, we make diversified investing accessible to every Zambian through our Retail Collective Investment Scheme.',
    features: ['SEC authorised and monitored', '7 professionally managed funds', 'Start with as little as K100/month', 'Tripartite governance structure', 'Online portfolio tracking', 'No maximum investment limit'] },
  { id: 'credit', icon: DollarSign, label: 'Credit', color: C.navyDark, image: '/images/Services/Credit.png',
    tagline: 'Flexible financing solutions',
    desc: 'Access tailored credit facilities designed to meet your personal and business funding needs. Backed by our deep understanding of Zambia\'s financial landscape, we provide competitive lending solutions that help you achieve your goals — whether it\'s growing a business, acquiring property, or bridging short-term cash flow gaps.',
    features: ['Competitive interest rates', 'Flexible repayment terms', 'Personal and business credit', 'Quick turnaround on applications', 'Dedicated credit advisor', 'Transparent fee structure'] },
  { id: 'securities', icon: BarChart2, label: 'Securities & Stock Broking', color: C.red, image: '/images/Services/Broker.png',
    tagline: 'Trade on the Lusaka Securities Exchange',
    desc: 'Buy and sell equities listed on the Lusaka Securities Exchange (LuSE) with expert guidance from our licensed brokers. We provide real-time market insights, research-driven recommendations, and efficient trade execution to help you build and manage your equity portfolio.',
    features: ['Licensed LuSE broker', 'Real-time market data and insights', 'Research-driven trade recommendations', 'Efficient order execution', 'Portfolio monitoring and reporting', 'Access to IPOs and rights issues'] },
  { id: 'advisory', icon: Briefcase, label: 'Consultancy & Advisory', color: C.navyLight, image: '/images/Services/Consult.png',
    tagline: 'Expert financial guidance',
    desc: 'Our licensed advisors provide personalised, objective investment guidance — from portfolio structuring and market analysis to comprehensive financial planning. Whether you are a first-time investor or a seasoned professional, we give you the insight and strategies you need to make confident financial decisions.',
    features: ['Licensed, independent advisors', 'Comprehensive financial needs analysis', 'Market research and commentary', 'Investment proposal and planning', 'Ongoing monitoring and review', 'Multi-asset class coverage'] },
  { id: 'risk', icon: AlertTriangle, label: 'Risk Management', color: C.navyDark, image: '/images/Services/Risk.png',
    tagline: 'Protect and preserve your wealth',
    desc: 'We identify, assess and mitigate financial risks across your portfolio using robust, institutional-grade frameworks. Our risk management service ensures your wealth is protected against market volatility, currency fluctuations, and economic uncertainty — giving you peace of mind as your investments grow.',
    features: ['Comprehensive risk assessment', 'Portfolio stress testing', 'Currency and market risk mitigation', 'Regulatory compliance oversight', 'Ongoing risk monitoring', 'Custom risk reporting'] },
];

function ServicesPage({ onNavigate }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 64px)' }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${C.navyDark} 0%, ${C.navy} 100%)`,
        padding: '40px 60px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px', pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 style={{ fontFamily: font.serif, fontSize: 32, fontWeight: 700, color: C.white, marginBottom: 8 }}>Our Services</h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', maxWidth: 520, margin: '0 auto 24px' }}>
            Six core services designed to manage, grow, and protect your wealth — from pension planning to securities trading.
          </p>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            {servicesList.map(s => (
              <a key={s.id} href={`#svc-${s.id}`} style={{
                padding: '6px 14px', borderRadius: 100, fontSize: 12, fontWeight: 600,
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff', transition: 'all 0.2s', cursor: 'pointer',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              >{s.label}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Service cards */}
      <div style={{ flex: 1, padding: '40px 60px', background: C.offWhite }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {servicesList.map(({ id, icon: Icon, label, tagline, desc, features, color, image }, i) => (
            <div key={id} id={`svc-${id}`} style={{
              display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1fr 1.6fr' : '1.6fr 1fr',
              background: C.white, borderRadius: 16, overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: `1px solid ${C.gray100}`,
            }}>
              {/* Image panel — left on even, right on odd */}
              {i % 2 === 0 && (
                <div style={{ position: 'relative', overflow: 'hidden', minHeight: 280 }}>
                  <img src={image} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 40%, ${color}cc 100%)`, pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', bottom: 20, left: 0, right: 0, textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 8, background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)' }}>
                      <Icon size={14} style={{ color: '#fff' }} />
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{label}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Text content */}
              <div style={{ padding: 40 }}>
                {i % 2 !== 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={24} style={{ color }} />
                    </div>
                    <div>
                      <h3 style={{ fontFamily: font.serif, fontSize: 22, fontWeight: 700, color: C.gray900 }}>{label}</h3>
                      <p style={{ fontSize: 13, color, fontWeight: 600 }}>{tagline}</p>
                    </div>
                  </div>
                )}
                {i % 2 === 0 && (
                  <div style={{ marginBottom: 20 }}>
                    <h3 style={{ fontFamily: font.serif, fontSize: 22, fontWeight: 700, color: C.gray900, marginBottom: 4 }}>{label}</h3>
                    <p style={{ fontSize: 13, color, fontWeight: 600 }}>{tagline}</p>
                  </div>
                )}
                <p style={{ fontSize: 15, color: C.gray600, lineHeight: 1.8, marginBottom: 24 }}>{desc}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 24 }}>
                  {features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <CheckCircle size={14} style={{ color, marginTop: 3, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: C.gray600, lineHeight: 1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => onNavigate('contact')} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px',
                  background: color, color: C.white, fontWeight: 700, fontSize: 13,
                  borderRadius: 6, border: 'none', cursor: 'pointer', fontFamily: font.sans,
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >Enquire Now <ArrowRight size={14} /></button>
              </div>

              {/* Image panel — right on odd */}
              {i % 2 !== 0 && (
                <div style={{ position: 'relative', overflow: 'hidden', minHeight: 280 }}>
                  <img src={image} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 40%, ${color}cc 100%)`, pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', bottom: 20, left: 0, right: 0, textAlign: 'center' }}>
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

        {/* CTA */}
        <div style={{
          marginTop: 40, padding: '48px 40px', borderRadius: 16, textAlign: 'center',
          background: `linear-gradient(135deg, ${C.navy}, ${C.navyDark})`,
        }}>
          <h2 style={{ fontFamily: font.serif, fontSize: 26, fontWeight: 700, color: C.white, marginBottom: 12 }}>Not Sure Where to Start?</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15, marginBottom: 28 }}>Our advisors will help you find the right service for your goals.</p>
          <button onClick={() => onNavigate('contact')} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px',
            background: C.red, color: C.white, fontWeight: 700, fontSize: 14,
            borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: font.sans,
          }}
            onMouseEnter={e => e.currentTarget.style.background = C.redHover}
            onMouseLeave={e => e.currentTarget.style.background = C.red}
          >Book a Free Consultation <ArrowRight size={14} /></button>
        </div>
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
    { label: 'Products', hasDropdown: true, items: [
      { label: 'Pension Fund Management', action: () => navigate('products') },
      { label: 'Unit Trust Fund Management', action: () => navigate('products') },
      { label: 'Credit', action: () => navigate('products') },
      { label: 'Securities & Stock Broking', action: () => navigate('products') },
      { label: 'Consultancy & Advisory', action: () => navigate('products') },
      { label: 'Risk Management', action: () => navigate('products') },
    ]},
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
        {page === 'products' && <ServicesPage onNavigate={navigate} />}
        {page === 'insights' && <InsightsPage onNavigate={navigate} />}
        {page === 'about' && <AboutPage />}
        {page === 'contact' && <ContactPage />}
        {page === 'tools' && <ToolsPage onNavigate={navigate} />}
        {page === 'portal' && <PortalPage />}
      </div>
    </div>
  );
}