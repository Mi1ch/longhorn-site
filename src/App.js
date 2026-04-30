import React, { useState, useEffect, useCallback, useRef } from "react";
import "./index.css";
import {
  ArrowRight, TrendingUp, CheckCircle, Shield, Award, Users, BarChart2,
  ChevronDown, ChevronRight, ChevronLeft, Search, LogIn, Building, PieChart,
  GraduationCap, Briefcase, BookOpen, Globe, Target, Mail, Phone, Clock,
  Lock, FileText, CreditCard, UserCheck, Building2, X, DollarSign, Activity,
  Info, Play, Calculator, Newspaper, Calendar, Heart, Eye, Star, ArrowUpRight,
  AlertTriangle, Menu
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
/*  HEADER RIBBON COLOUR                        */
/*  Change this ONE line to re-theme every page */
/*  banner/ribbon across the whole site.        */
/*  Examples to try:                            */
/*    RED:    `linear-gradient(135deg, ${C.redHover} 0%, ${C.red} 100%)` */
/*    NAVY:   HEADER_GRADIENT */
/*    BLACK:  `linear-gradient(135deg, #000 0%, #333 100%)`   */
/*    GOLD:   `linear-gradient(135deg, #8B6914 0%, ${C.gold} 100%)` */
/* ═══════════════════════════════════════════ */
const HEADER_GRADIENT = `linear-gradient(135deg, ${C.redHover} 0%, ${C.red} 100%)`;

/* ═══════════════════════════════════════════ */
/*  RESPONSIVE HOOK                            */
/* ═══════════════════════════════════════════ */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [breakpoint]);
  return isMobile;
}
const px = (mobile) => mobile ? '0 20px' : '0 60px';
const pad = (mobile) => mobile ? '20px 20px' : '32px 60px';

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
/*  LONGHORN API CONFIG                        */
/* ═══════════════════════════════════════════ */
const LONGHORN_API = process.env.REACT_APP_LONGHORN_API || 'https://longhorn-api.onrender.com';

/* ═══════════════════════════════════════════ */
/*  CACHED FETCH — in-memory cache for GET     */
/*  Data updates once daily, so 60-min TTL is  */
/*  safe and eliminates redundant API calls    */
/* ═══════════════════════════════════════════ */
const _apiCache = {};
async function cachedFetch(url, ttlMinutes = 60) {
  const now = Date.now();
  if (_apiCache[url] && (now - _apiCache[url].ts) < ttlMinutes * 60 * 1000) {
    return _apiCache[url].data;
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error(res.status);
  const data = await res.json();
  _apiCache[url] = { data, ts: now };
  return data;
}

/* ═══════════════════════════════════════════ */
/*  MARKET TICKER (Fund Performance + FX API)  */
/* ═══════════════════════════════════════════ */
const FALLBACK_TICKER = [
  { label: 'Fund Performance', value: '', isLabel: true },
  { label: 'Equity Fund', value: 'K1.25', isFund: true, yield12: '12.4%' },
  { label: 'Bond Fund', value: 'K1.08', isFund: true, yield12: '8.2%' },
  { label: 'FX Rates vs ZMW', value: '', isLabel: true },
  { label: 'USD/ZMW', value: '-0.5%', gain: true },
  { label: 'EUR/ZMW', value: '-1.4%', gain: true },
];

function MarketTicker() {
  const [items, setItems] = useState(FALLBACK_TICKER);

  useEffect(() => {
    let cancelled = false;

    /* Fetch both APIs in parallel */
    Promise.allSettled([
      cachedFetch('/api/fund-performance/'),
      cachedFetch('/api/foreign-exchange/'),
    ]).then(([fundResult, fxResult]) => {
      if (cancelled) return;
      const tickerData = [];

      /* ── FUND PERFORMANCE (first) ── */
      if (fundResult.status === 'fulfilled') {
        const fundRows = Array.isArray(fundResult.value) ? fundResult.value : fundResult.value.results || [];
        if (fundRows.length > 0) {
          const fundDate = fundRows[0].date || '';
          const fmtFundDate = fundDate ? new Date(fundDate + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
          tickerData.push({ label: 'Fund Performance', value: fmtFundDate, isLabel: true });

          fundRows.forEach(row => {
            const yieldVal = row.averageYieldTwelveMonths;
            const yieldStr = yieldVal != null ? `${yieldVal >= 0 ? '+' : ''}${Number(yieldVal).toFixed(2)}%` : null;
            tickerData.push({
              label: row.fund || 'Fund',
              value: row.price != null ? `K${Number(row.price).toFixed(2)}` : '',
              yield12: yieldStr,
              isFund: true,
              gain: yieldVal != null ? yieldVal >= 0 : true,
              isLabel: false,
            });
          });
        }
      }

      /* ── FOREIGN EXCHANGE (after funds) ── */
      if (fxResult.status === 'fulfilled') {
        const fxRows = Array.isArray(fxResult.value) ? fxResult.value : fxResult.value.results || [];
        if (fxRows.length > 0) {
          const fxDate = fxRows[0].date || '';
          const fmtFxDate = fxDate ? new Date(fxDate + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
          tickerData.push({ label: 'Foreign Exchange', value: fmtFxDate, isLabel: true });

          fxRows.forEach(row => {
            /* Skip ZMW — it's always 1:1 against itself */
            if ((row.currency || '').toUpperCase() === 'ZMW') return;
            const pctChange = row.percentChangeFromPreviousRate;
            const direction = (row.direction || '').toLowerCase();
            const zmwGained = direction.includes('zmw-up') || direction.includes('zmw up');
            const changeStr = pctChange >= 0 ? `+${Number(pctChange).toFixed(2)}%` : `${Number(pctChange).toFixed(2)}%`;
            tickerData.push({
              label: row.currency || 'CUR',
              value: changeStr,
              rate: row.midRate != null ? `K${Number(row.midRate).toFixed(2)}` : null,
              gain: zmwGained,
              isLabel: false,
            });
          });
        }
      }

      if (tickerData.length > 0) {
        setItems(tickerData);
      }
    });

    return () => { cancelled = true; };
  }, []);

  const tickerItems = [...items, ...items, ...items]; /* triple for seamless loop */
  return (
    <div style={{
      background: '#3B7DD8', padding: '10px 0', display: 'flex', alignItems: 'center',
      overflow: 'hidden', position: 'relative',
    }}>
      <style>{`@keyframes tickerScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }`}</style>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 24, whiteSpace: 'nowrap',
        animation: 'tickerScroll 70s linear infinite',
      }}>
        {tickerItems.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {item.isLabel ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.white, background: item.label.includes('Fund') ? C.red : C.green, padding: '4px 12px', borderRadius: 4, letterSpacing: '0.02em' }}>{item.label}</span>
                {item.value && <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{item.value}</span>}
              </div>
            ) : item.isFund ? (
              <>
                <span style={{ fontSize: 12.5, color: C.white, fontWeight: 700, letterSpacing: '0.01em' }}>{item.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.white }}>{item.value}</span>
                {item.yield12 && (
                  <>
                    <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>12M:</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: item.gain ? '#4ADE80' : '#F87171' }}>{item.yield12}</span>
                  </>
                )}
                {i < tickerItems.length - 1 && <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.2)', marginLeft: 16 }} />}
              </>
            ) : (
              <>
                <span style={{ fontSize: 12.5, color: C.white, fontWeight: 700, letterSpacing: '0.01em' }}>{item.label}</span>
                {item.rate && <span style={{ fontSize: 13, fontWeight: 700, color: C.white }}>{item.rate}</span>}
                <div style={{
                  width: 0, height: 0,
                  borderLeft: '4px solid transparent', borderRight: '4px solid transparent',
                  borderBottom: item.gain ? '6px solid #4ADE80' : 'none',
                  borderTop: !item.gain ? '6px solid #F87171' : 'none',
                  marginRight: 2,
                }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: item.gain ? '#4ADE80' : '#F87171' }}>{item.value}</span>
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
  const isMobile = useIsMobile();

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
        height: isMobile ? 260 : 320, minHeight: isMobile ? 260 : 320, maxHeight: isMobile ? 260 : 320,
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
          background: isMobile
            ? 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 100%)'
            : 'linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 45%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Slide content */}
        <div style={{ position: 'relative', zIndex: 1, padding: isMobile ? '0 20px' : '0 60px', maxWidth: 640 }}>
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

        <style>{`
          @keyframes heroFadeUp {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>

      {/* ── Quick Link Icons Row ── */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: 0, flexWrap: isMobile ? 'wrap' : 'nowrap',
        padding: isMobile ? '16px 12px' : '28px 60px', background: C.white, borderBottom: `1px solid ${C.gray100}`,
      }}>
        {quickLinks.map(({ icon: Ic, label, page }) => (
          <button key={label} onClick={() => onNavigate(page)} style={{
            flex: isMobile ? '0 0 30%' : 1, maxWidth: isMobile ? 'none' : 150, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isMobile ? 6 : 10,
            padding: isMobile ? '10px 8px' : '16px 12px', border: 'none', background: 'transparent', cursor: 'pointer',
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
  const isMobile = useIsMobile();
  const tabs = ['Overview', 'Performance', 'Project Returns', 'Documents', 'How to Invest'];
  const tabKeys = ['overview', 'performance', 'project', 'documents', 'howto'];
  const chartData = genChart(12, 100, parseFloat(fund.returnRate)/100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 64px)' }}>
      {/* Fund header */}
      <div style={{
        background: HEADER_GRADIENT,
        padding: isMobile ? '20px 16px' : '28px 60px', display: 'flex', alignItems: 'center', gap: isMobile ? 12 : 20,
      }}>
        <div style={{ width: isMobile ? 40 : 52, height: isMobile ? 40 : 52, borderRadius: 14, background: `${fund.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FIcon size={isMobile ? 20 : 26} style={{ color: fund.color }} />
        </div>
        <div>
          <h1 style={{ fontFamily: font.serif, fontSize: isMobile ? 20 : 28, fontWeight: 700, color: C.white, marginBottom: 4 }}>{fund.name}</h1>
          <p style={{ fontSize: isMobile ? 11 : 13, color: 'rgba(255,255,255,0.6)' }}>Longhorn Unit Trust · Annual Fee: {fund.fee}</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', background: C.navy, padding: isMobile ? '0 12px' : '0 60px', gap: 0, overflowX: isMobile ? 'auto' : 'visible' }}>
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
      <div style={{ flex: 1, display: 'flex', flexDirection: isMobile ? 'column' : 'row', background: C.white }}>
        {/* Chart area */}
        <div style={{ flex: 1, padding: isMobile ? '20px 16px' : '32px 40px' }}>
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
            <ReturnCalculator initialFund={fund.name} onNavigate={onNavigate} />
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
        <div style={{ width: isMobile ? '100%' : 260, borderLeft: isMobile ? 'none' : `1px solid ${C.gray100}`, borderTop: isMobile ? `1px solid ${C.gray100}` : 'none', padding: isMobile ? '20px 16px' : '32px 24px', background: C.offWhite }}>
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
/*  RETURN PROJECTION CALCULATOR (Live API)    */
/*  GET /api/projector-parameters/ for setup   */
/*  POST /api/unit-trust-projection/ to run    */
/* ═══════════════════════════════════════════ */
function ReturnCalculator({ initialFund, onNavigate }) {
  const isMobile = useIsMobile();
  const [params, setParams] = useState(null);
  const [paramsErr, setParamsErr] = useState(false);

  /* Form state */
  const [fund, setFund] = useState('');
  const [mode, setMode] = useState('');
  const [tenure, setTenure] = useState('');
  const [monthlyDeposit, setMonthlyDeposit] = useState('');
  const [lumpsumDeposit, setLumpsumDeposit] = useState('');
  const [minMonthly, setMinMonthly] = useState('');
  const [maxMonthly, setMaxMonthly] = useState('');

  /* Submission */
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});

  /* Fetch projector parameters on mount */
  useEffect(() => {
    let cancelled = false;
    cachedFetch('/api/projector-parameters/')
      .then(data => {
        if (cancelled) return;
        setParams(data);
        /* Pre-select fund if coming from Fund Detail page */
        if (initialFund) {
          const match = (data.funds || []).find(f =>
            f.name.toLowerCase().includes(initialFund.toLowerCase()) ||
            initialFund.toLowerCase().includes(f.name.toLowerCase().replace('longhorn ', ''))
          );
          if (match) setFund(match.name);
        }
      })
      .catch(() => { if (!cancelled) setParamsErr(true); });
    return () => { cancelled = true; };
  }, [initialFund]);

  /* Clear mode-specific fields when mode changes */
  const handleModeChange = (newMode) => {
    setMode(newMode);
    setMonthlyDeposit('');
    setLumpsumDeposit('');
    setMinMonthly('');
    setMaxMonthly('');
    setResult(null);
    setErrors({});
  };

  /* Get mode info */
  const modeInfo = params?.projection_modes?.find(m => m.projection_mode === mode);
  const modeLabel = (m) => (m || '').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  /* Submit projection */
  const handleSubmit = async () => {
    setSubmitting(true);
    setErrors({});
    setResult(null);

    const body = { fund, projection_mode: mode, tenure_months: Number(tenure) };

    if (mode === 'monthly_deposits') body.monthly_deposit = Number(monthlyDeposit);
    else if (mode === 'lumpsum_deposit') body.lumpsum_deposit = Number(lumpsumDeposit);
    else if (mode === 'hybrid_deposits') { body.monthly_deposit = Number(monthlyDeposit); body.lumpsum_deposit = Number(lumpsumDeposit); }
    else if (mode === 'varying_monthly_deposits') { body.minimum_monthly_deposit = Number(minMonthly); body.maximum_monthly_deposit = Number(maxMonthly); }

    try {
      const res = await fetch('/api/unit-trust-projection/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setResult(data);
      } else {
        setErrors(data);
      }
    } catch (err) {
      setErrors({ detail: 'Network error. Please try again.' });
    }
    setSubmitting(false);
  };

  const canSubmit = fund && mode && tenure && Number(tenure) >= 1 && Number(tenure) <= 60 && (
    (mode === 'monthly_deposits' && monthlyDeposit) ||
    (mode === 'lumpsum_deposit' && lumpsumDeposit) ||
    (mode === 'hybrid_deposits' && monthlyDeposit && lumpsumDeposit) ||
    (mode === 'varying_monthly_deposits' && minMonthly && maxMonthly)
  );

  const fmtK = (v) => v != null ? `K ${Number(v).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '—';

  /* Loading / Error */
  if (paramsErr) {
    return (
      <div style={{ padding: 32, textAlign: 'center' }}>
        <AlertTriangle size={28} style={{ color: C.red, marginBottom: 8 }} />
        <div style={{ fontSize: 14, color: C.gray600 }}>Unable to load calculator parameters.</div>
      </div>
    );
  }
  if (!params) {
    return <div style={{ padding: 40, textAlign: 'center', color: C.gray400, fontSize: 14 }}>Loading calculator…</div>;
  }

  const iS = { width: '100%', padding: '10px 14px', borderRadius: 8, border: `1.5px solid ${C.gray200}`, fontSize: 13, fontFamily: font.sans, outline: 'none', color: C.gray800, background: C.white };
  const lS = { display: 'block', fontSize: 11, fontWeight: 600, color: C.gray600, marginBottom: 4 };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr', gap: 28 }}>
        {/* ── LEFT: Form ── */}
        <div>
          <div style={{ padding: 22, background: C.white, borderRadius: 14, border: `1px solid ${C.gray100}`, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            {/* Fund */}
            <div style={{ marginBottom: 14 }}>
              <label style={lS}>Fund <span style={{ color: C.red }}>*</span></label>
              <select value={fund} onChange={e => { setFund(e.target.value); setResult(null); }} style={{ ...iS, background: C.white }}>
                <option value="">Select fund…</option>
                {(params.funds || []).map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
              </select>
              {errors.fund && <div style={{ fontSize: 11, color: C.red, marginTop: 3 }}>{errors.fund}</div>}
            </div>

            {/* Projection Mode */}
            <div style={{ marginBottom: 14 }}>
              <label style={lS}>Projection Mode <span style={{ color: C.red }}>*</span></label>
              <select value={mode} onChange={e => handleModeChange(e.target.value)} style={{ ...iS, background: C.white }}>
                <option value="">Select mode…</option>
                {(params.projection_modes || []).map(m => (
                  <option key={m.projection_mode} value={m.projection_mode}>{modeLabel(m.projection_mode)}</option>
                ))}
              </select>
              {modeInfo && (
                <div style={{ fontSize: 11, color: C.gray400, marginTop: 6, padding: '8px 10px', background: C.gray50, borderRadius: 6, lineHeight: 1.5 }}>
                  {modeInfo.required_inputs}
                </div>
              )}
              {errors.projection_mode && <div style={{ fontSize: 11, color: C.red, marginTop: 3 }}>{errors.projection_mode}</div>}
            </div>

            {/* Tenure */}
            <div style={{ marginBottom: 14 }}>
              <label style={lS}>Investment Period (months) <span style={{ color: C.red }}>*</span></label>
              <input type="number" min="1" max="60" placeholder="1–60" value={tenure} onChange={e => { setTenure(e.target.value); setResult(null); }} style={iS}
                onFocus={e => e.target.style.borderColor = C.red} onBlur={e => e.target.style.borderColor = C.gray200} />
              <div style={{ fontSize: 10, color: C.gray400, marginTop: 3 }}>Maximum 60 months</div>
              {errors.tenure_months && <div style={{ fontSize: 11, color: C.red, marginTop: 3 }}>{errors.tenure_months}</div>}
            </div>

            {/* Dynamic fields per mode */}
            {(mode === 'monthly_deposits' || mode === 'hybrid_deposits') && (
              <div style={{ marginBottom: 14 }}>
                <label style={lS}>Monthly Deposit (ZMW) <span style={{ color: C.red }}>*</span></label>
                <input type="number" min="0" placeholder="e.g. 3000" value={monthlyDeposit} onChange={e => { setMonthlyDeposit(e.target.value); setResult(null); }} style={iS}
                  onFocus={e => e.target.style.borderColor = C.red} onBlur={e => e.target.style.borderColor = C.gray200} />
                {errors.monthly_deposit && <div style={{ fontSize: 11, color: C.red, marginTop: 3 }}>{errors.monthly_deposit}</div>}
              </div>
            )}
            {(mode === 'lumpsum_deposit' || mode === 'hybrid_deposits') && (
              <div style={{ marginBottom: 14 }}>
                <label style={lS}>Lump Sum Deposit (ZMW) <span style={{ color: C.red }}>*</span></label>
                <input type="number" min="0" placeholder="e.g. 30000" value={lumpsumDeposit} onChange={e => { setLumpsumDeposit(e.target.value); setResult(null); }} style={iS}
                  onFocus={e => e.target.style.borderColor = C.red} onBlur={e => e.target.style.borderColor = C.gray200} />
                {errors.lumpsum_deposit && <div style={{ fontSize: 11, color: C.red, marginTop: 3 }}>{errors.lumpsum_deposit}</div>}
              </div>
            )}
            {mode === 'varying_monthly_deposits' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
                <div>
                  <label style={lS}>Min Monthly (ZMW) <span style={{ color: C.red }}>*</span></label>
                  <input type="number" min="0" placeholder="e.g. 2000" value={minMonthly} onChange={e => { setMinMonthly(e.target.value); setResult(null); }} style={iS}
                    onFocus={e => e.target.style.borderColor = C.red} onBlur={e => e.target.style.borderColor = C.gray200} />
                  {errors.minimum_monthly_deposit && <div style={{ fontSize: 11, color: C.red, marginTop: 3 }}>{errors.minimum_monthly_deposit}</div>}
                </div>
                <div>
                  <label style={lS}>Max Monthly (ZMW) <span style={{ color: C.red }}>*</span></label>
                  <input type="number" min="0" placeholder="e.g. 10000" value={maxMonthly} onChange={e => { setMaxMonthly(e.target.value); setResult(null); }} style={iS}
                    onFocus={e => e.target.style.borderColor = C.red} onBlur={e => e.target.style.borderColor = C.gray200} />
                  {errors.maximum_monthly_deposit && <div style={{ fontSize: 11, color: C.red, marginTop: 3 }}>{errors.maximum_monthly_deposit}</div>}
                </div>
              </div>
            )}

            {/* General errors */}
            {errors.detail && (
              <div style={{ padding: '10px 14px', borderRadius: 8, background: `${C.red}10`, border: `1px solid ${C.red}30`, marginBottom: 14 }}>
                <p style={{ fontSize: 12, color: C.red, fontWeight: 600 }}>{errors.detail}</p>
              </div>
            )}
            {errors.non_field_errors && (
              <div style={{ padding: '10px 14px', borderRadius: 8, background: `${C.red}10`, border: `1px solid ${C.red}30`, marginBottom: 14 }}>
                <p style={{ fontSize: 12, color: C.red, fontWeight: 600 }}>{Array.isArray(errors.non_field_errors) ? errors.non_field_errors[0] : errors.non_field_errors}</p>
              </div>
            )}

            {/* Submit */}
            <button disabled={!canSubmit || submitting} onClick={handleSubmit} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              width: '100%', padding: '12px 0',
              background: (!canSubmit || submitting) ? C.gray300 : C.navy, color: C.white,
              fontWeight: 700, fontSize: 14, borderRadius: 8, border: 'none',
              cursor: (!canSubmit || submitting) ? 'not-allowed' : 'pointer',
              fontFamily: font.sans, transition: 'all 0.2s',
            }}>
              {submitting ? 'Running Simulation…' : 'Calculate Projection'} {!submitting && <Calculator size={16} />}
            </button>
          </div>
        </div>

        {/* ── RIGHT: Results ── */}
        <div>
          {!result && !submitting && (
            <div style={{ padding: 40, textAlign: 'center', color: C.gray400, borderRadius: 14, border: `2px dashed ${C.gray200}`, background: C.white }}>
              <Calculator size={36} style={{ color: C.gray200, marginBottom: 12 }} />
              <div style={{ fontSize: 15, fontWeight: 600, color: C.gray500, marginBottom: 6 }}>No Projection Yet</div>
              <p style={{ fontSize: 13, color: C.gray400, lineHeight: 1.5 }}>Select a fund, projection mode, and enter your details to see estimated returns.</p>
            </div>
          )}

          {submitting && (
            <div style={{ padding: 40, textAlign: 'center', color: C.gray400, borderRadius: 14, background: C.white, border: `1px solid ${C.gray100}` }}>
              <Activity size={28} style={{ color: C.navy, marginBottom: 8 }} />
              <div style={{ fontSize: 14, color: C.gray600 }}>Running Monte Carlo simulation…</div>
              <p style={{ fontSize: 12, color: C.gray400, marginTop: 4 }}>{result?.number_of_simulations ? `${Number(result.number_of_simulations).toLocaleString()} scenarios` : 'Analysing market data'}</p>
            </div>
          )}

          {result && !submitting && (
            <div>
              {/* Hero — Estimated Value Range */}
              <div style={{
                padding: '20px 24px', borderRadius: 14, marginBottom: 16,
                background: `linear-gradient(135deg, ${C.navy}, ${C.navyDark})`, color: C.white,
              }}>
                <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.7, marginBottom: 2 }}>Estimated Investment Value</div>
                <div style={{ fontFamily: font.serif, fontSize: 28, fontWeight: 800, marginBottom: 12 }}>
                  {fmtK(result.estimated_middle_value)}
                </div>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  {[
                    { label: 'Conservative', value: fmtK(result.estimated_low_value), color: '#FCA5A5' },
                    { label: 'Expected', value: fmtK(result.estimated_middle_value), color: '#4ADE80' },
                    { label: 'Optimistic', value: fmtK(result.estimated_high_value), color: '#93C5FD' },
                  ].map(s => (
                    <div key={s.label} style={{ flex: 1, minWidth: 100 }}>
                      <div style={{ fontSize: 10, opacity: 0.6, marginBottom: 2 }}>{s.label}</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: s.color }}>{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gain + Return cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 16 }}>
                {[
                  { label: 'Estimated Gain', value: fmtK(result.estimated_middle_gain), color: C.green, sub: `${result.estimated_middle_return_percent}% return` },
                  { label: 'Total Contribution', value: fmtK(result.average_total_contribution), color: C.navy, sub: `${result.tenure_months} months` },
                  { label: 'Chance of Gain', value: `${result.chance_of_gain_percent}%`, color: C.green, sub: `${result.chance_of_loss_percent}% loss risk` },
                ].map(s => (
                  <div key={s.label} style={{ padding: '14px 12px', borderRadius: 12, background: C.white, border: `1px solid ${C.gray100}` }}>
                    <div style={{ fontSize: 10, color: C.gray400, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: s.color, lineHeight: 1.1, marginBottom: 2 }}>{s.value}</div>
                    <div style={{ fontSize: 10, color: C.gray400 }}>{s.sub}</div>
                  </div>
                ))}
              </div>

              {/* Detailed breakdown */}
              <div style={{ padding: '16px 18px', borderRadius: 12, background: C.white, border: `1px solid ${C.gray100}`, marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.navy, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 10 }}>Projection Details</div>
                {[
                  ['Fund', result.fund],
                  ['Projection Type', result.projection_mode_label],
                  ['Investment Period', `${result.tenure_months} months`],
                  ['Simulations Run', Number(result.number_of_simulations).toLocaleString()],
                ].map(([label, value]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: `1px solid ${C.gray50}` }}>
                    <span style={{ fontSize: 12, color: C.gray500 }}>{label}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.gray800 }}>{value}</span>
                  </div>
                ))}
              </div>

              {/* Scenario comparison */}
              <div style={{ padding: '16px 18px', borderRadius: 12, background: C.white, border: `1px solid ${C.gray100}`, marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.navy, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 10 }}>Scenario Comparison</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', gap: 0 }}>
                  {/* Header */}
                  {['', 'Conservative', 'Expected', 'Optimistic'].map(h => (
                    <div key={h} style={{ padding: '6px 8px', fontSize: 10, fontWeight: 700, color: C.gray400, textTransform: 'uppercase', borderBottom: `2px solid ${C.gray100}` }}>{h}</div>
                  ))}
                  {/* Rows */}
                  {[
                    ['Value', result.estimated_low_value, result.estimated_middle_value, result.estimated_high_value],
                    ['Gain', result.estimated_low_gain, result.estimated_middle_gain, result.estimated_high_gain],
                    ['Return', `${result.estimated_low_return_percent}%`, `${result.estimated_middle_return_percent}%`, `${result.estimated_high_return_percent}%`],
                  ].map(([label, lo, mid, hi]) => (
                    <React.Fragment key={label}>
                      <div style={{ padding: '6px 8px', fontSize: 11, fontWeight: 600, color: C.gray600, borderBottom: `1px solid ${C.gray50}` }}>{label}</div>
                      {[lo, mid, hi].map((v, i) => (
                        <div key={i} style={{ padding: '6px 8px', fontSize: 11, fontWeight: 700, color: [C.red, C.green, C.navy][i], borderBottom: `1px solid ${C.gray50}`, textAlign: 'right' }}>
                          {typeof v === 'number' ? fmtK(v) : v}
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Explanation */}
              {result.explanation && (
                <div style={{ padding: '14px 18px', borderRadius: 12, background: `${C.navy}08`, border: `1px solid ${C.navy}15` }}>
                  <p style={{ fontSize: 13, color: C.gray600, lineHeight: 1.6, fontStyle: 'italic' }}>{result.explanation}</p>
                </div>
              )}

              {/* CTA */}
              <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                <button onClick={() => onNavigate && onNavigate('portal')} style={{
                  display: 'flex', alignItems: 'center', gap: 6, padding: '12px 22px', borderRadius: 8, border: 'none',
                  background: C.red, color: C.white, cursor: 'pointer', fontFamily: font.sans, fontSize: 13, fontWeight: 700,
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = C.redHover}
                  onMouseLeave={e => e.currentTarget.style.background = C.red}
                >Start Investing <ArrowRight size={14} /></button>
                <button onClick={() => { setResult(null); }} style={{
                  display: 'flex', alignItems: 'center', gap: 6, padding: '12px 22px', borderRadius: 8,
                  border: `1.5px solid ${C.gray200}`, background: 'transparent', color: C.gray600,
                  cursor: 'pointer', fontFamily: font.sans, fontSize: 13, fontWeight: 600,
                }}>New Projection</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════ */
/*  INSIGHTS & MARKET DATA                    */
/* ═══════════════════════════════════════════ */

/* ── Dual-line comparison chart ── */
function ComparisonChart({ data1, data2, label1, label2, color1 = C.red, color2 = C.navyLight, width = 520, height = 200 }) {
  const all = [...data1, ...data2];
  const max = Math.max(...all.map(d => d.value));
  const min = Math.min(...all.map(d => d.value));
  const range = max - min || 1;
  const padY = 24;
  const padX = 15;

  /* Convert data to x,y coordinates */
  const toCoords = (data) => data.map((d, i) => ({
    x: padX + (i / (data.length - 1)) * (width - padX * 2),
    y: height - padY - ((d.value - min) / range) * (height - padY * 2),
  }));

  /* Smooth cubic bezier path from coordinates */
  const toSmoothPath = (coords) => {
    if (coords.length < 2) return '';
    let d = `M ${coords[0].x},${coords[0].y}`;
    for (let i = 0; i < coords.length - 1; i++) {
      const p0 = coords[Math.max(0, i - 1)];
      const p1 = coords[i];
      const p2 = coords[i + 1];
      const p3 = coords[Math.min(coords.length - 1, i + 2)];
      const tension = 0.35;
      const cp1x = p1.x + (p2.x - p0.x) * tension;
      const cp1y = p1.y + (p2.y - p0.y) * tension;
      const cp2x = p2.x - (p3.x - p1.x) * tension;
      const cp2y = p2.y - (p3.y - p1.y) * tension;
      d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }
    return d;
  };

  /* Smooth area path (closed) */
  const toAreaPath = (coords) => {
    const linePath = toSmoothPath(coords);
    const last = coords[coords.length - 1];
    const first = coords[0];
    return `${linePath} L ${last.x},${height - padY} L ${first.x},${height - padY} Z`;
  };

  const coords1 = toCoords(data1);
  const coords2 = toCoords(data2);
  const path1 = toSmoothPath(coords1);
  const path2 = toSmoothPath(coords2);
  const area1 = toAreaPath(coords1);
  const uid = `cg-${color1.replace('#','')}-${Math.random().toString(36).slice(2,6)}`;

  return (
    <div>
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ display: 'block' }}>
        <defs>
          <linearGradient id={uid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color1} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color1} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {/* Grid */}
        {[0.25, 0.5, 0.75].map(pct => (
          <line key={pct} x1={padX} y1={padY + pct * (height - padY * 2)} x2={width - padX} y2={padY + pct * (height - padY * 2)} stroke="rgba(0,0,0,0.05)" strokeWidth="1" strokeDasharray="4,4" />
        ))}
        {/* Market line (behind) — thinner, dashed, muted */}
        <path d={path2} fill="none" stroke={color2} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="8,5" opacity="0.5" />
        {/* Market end dot */}
        {coords2.length > 0 && <circle cx={coords2[coords2.length-1].x} cy={coords2[coords2.length-1].y} r="3" fill={color2} opacity="0.5" />}
        {/* Longhorn area fill */}
        <path d={area1} fill={`url(#${uid})`} />
        {/* Longhorn line (front) — solid, clear */}
        <path d={path1} fill="none" stroke={color1} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Longhorn end dot with glow */}
        {coords1.length > 0 && (
          <>
            <circle cx={coords1[coords1.length-1].x} cy={coords1[coords1.length-1].y} r="8" fill={color1} opacity="0.15" />
            <circle cx={coords1[coords1.length-1].x} cy={coords1[coords1.length-1].y} r="4.5" fill={color1} stroke="#fff" strokeWidth="2" />
          </>
        )}
        {/* Month labels */}
        {data1.map((d, i) => {
          if (i % 2 !== 0 && i !== data1.length - 1) return null;
          const x = padX + (i / (data1.length - 1)) * (width - padX * 2);
          return <text key={i} x={x} y={height - 4} textAnchor="middle" fontSize="9" fill={C.gray400} fontFamily={font.sans}>{d.month}</text>;
        })}
      </svg>
      {/* Legend — clearer distinction */}
      <div style={{ display: 'flex', gap: 24, marginTop: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 24, height: 4, borderRadius: 2, background: color1 }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: color1 }}>{label1}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 24, height: 2, borderRadius: 2, background: color2, opacity: 0.5 }} />
          <span style={{ fontSize: 11, fontWeight: 500, color: C.gray400 }}>{label2}</span>
        </div>
      </div>
    </div>
  );
}

/* ── Generate comparison data pairs ── */
function genPair(months, lhGrowth, mktGrowth) {
  const mo = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const d1 = [], d2 = [];
  let v1 = 100, v2 = 100;
  for (let i = 0; i < months; i++) {
    v1 *= (1 + lhGrowth / 12 + (Math.random() - 0.48) * 0.008);
    v2 *= (1 + mktGrowth / 12 + (Math.random() - 0.48) * 0.01);
    d1.push({ month: mo[i % 12], value: v1 });
    d2.push({ month: mo[i % 12], value: v2 });
  }
  return [d1, d2];
}

/* ── Fund vs Market instrument mapping ── */
const fundComparisons = {
  short: [
    { fund: 'Fixed Income Fund', instrument: '91-Day T-Bills', lhReturn: '8.2%', mktReturn: '6.8%', lhGrowth: 0.082, mktGrowth: 0.068, tier: 'Short Term' },
    { fund: 'Gratuity Fund', instrument: 'Money Market Rate', lhReturn: '9.2%', mktReturn: '7.5%', lhGrowth: 0.092, mktGrowth: 0.075, tier: 'Short Term' },
  ],
  medium: [
    { fund: 'Multi Assets Fund', instrument: 'Gov Bonds (5Y)', lhReturn: '10.1%', mktReturn: '8.4%', lhGrowth: 0.101, mktGrowth: 0.084, tier: 'Medium Term' },
    { fund: 'Education Fund', instrument: 'Corporate Bonds', lhReturn: '9.8%', mktReturn: '7.9%', lhGrowth: 0.098, mktGrowth: 0.079, tier: 'Medium Term' },
    { fund: 'White Coat Fund', instrument: 'BoZ Savings Rate', lhReturn: '8.9%', mktReturn: '6.2%', lhGrowth: 0.089, mktGrowth: 0.062, tier: 'Medium Term' },
  ],
  long: [
    { fund: 'Listed Equities Fund', instrument: 'LuSE All Share Index', lhReturn: '12.4%', mktReturn: '9.4%', lhGrowth: 0.124, mktGrowth: 0.094, tier: 'Long Term' },
    { fund: 'Listed Property Fund', instrument: 'Property Index', lhReturn: '9.6%', mktReturn: '7.1%', lhGrowth: 0.096, mktGrowth: 0.071, tier: 'Long Term' },
  ],
};

/* ── Market snapshot data ── */
const marketSnapshot = [
  { label: 'Inflation Rate', value: '12.3%', change: '+0.2%', negative: true },
  { label: 'BoZ Policy Rate', value: '12.5%', change: 'Unchanged', negative: false },
  { label: 'LuSE ASI Daily', value: '+0.34%', change: '+9.4% YTD', negative: false },
  { label: 'USD / ZMW', value: '27.10', change: '-0.5%', negative: false },
  { label: '10Y Bond Yield', value: '16.8%', change: '+0.3%', negative: true },
  { label: '91-Day T-Bill', value: '11.2%', change: '-0.1%', negative: false },
];

/* ── News items ── */
const newsItems = [
  { title: 'Longhorn Associates Annual General Meeting 2024', date: 'Nov 2024', cat: 'Events', excerpt: 'Annual general meeting highlights and key resolutions from the 2024 session.' },
  { title: 'Client Engagement Seminar', date: 'Oct 2024', cat: 'Events', excerpt: 'Opportunities shared as we outlined wealth creation strategies for our investors.' },
  { title: 'End of Year Team Building', date: 'Dec 2024', cat: 'Company', excerpt: 'Remembering milestones and celebrating our team\'s achievements.' },
  { title: 'Understanding the 7 Unit Trust Funds', date: 'Jan 2025', cat: 'Education', excerpt: 'From Listed Equities to the White Coat Fund — fees, risks & suitability.' },
  { title: 'Education Fund: Rising School Fees', date: 'Sep 2024', cat: 'Education', excerpt: 'Our Education Fund (3.5% p.a.) helps parents build for the future.' },
  { title: 'White Coat Fund Spotlight', date: 'Aug 2024', cat: 'Funds', excerpt: 'Lowest fee at 2.5% — designed for medical professionals.' },
];

/* ══════════════════════════════════════════════
   FUNDS TAB — horizontal side-scroll carousel
   Uses Inter font (cleaner, client-requested)
   ══════════════════════════════════════════════ */
const INSIGHTS_FONT = "'Inter',system-ui,-apple-system,sans-serif";

function FundsTab({ isMobile, onNavigate }) {
  const [fundsData, setFundsData] = useState(null); // { fundName: rows[] }
  const [error, setError] = useState(null);
  const [selectedFund, setSelectedFund] = useState(null); // fund name or null
  const scrollRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    cachedFetch('/api/fund-performance-benchmark/')
      .then(data => {
        if (cancelled) return;
        if (data && typeof data === 'object' && !Array.isArray(data)) {
          setFundsData(data);
        } else {
          setFundsData({});
        }
      })
      .catch(err => { if (!cancelled) setError(String(err)); });
    return () => { cancelled = true; };
  }, []);

  const scrollByCard = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardW = isMobile ? el.clientWidth - 40 : 400;
    el.scrollBy({ left: dir * cardW, behavior: 'smooth' });
  };

  if (error) {
    return (
      <div style={{ flex: 1, padding: isMobile ? '20px 16px' : '28px 60px', background: C.offWhite, fontFamily: INSIGHTS_FONT }}>
        <div style={{ padding: 24, borderRadius: 12, background: C.white, border: `1px solid ${C.gray100}`, textAlign: 'center' }}>
          <AlertTriangle size={28} style={{ color: C.red, marginBottom: 8 }} />
          <div style={{ fontSize: 14, color: C.gray600 }}>Unable to load fund performance data.</div>
        </div>
      </div>
    );
  }
  if (!fundsData) {
    return (
      <div style={{ flex: 1, padding: isMobile ? '20px 16px' : '28px 60px', background: C.offWhite, fontFamily: INSIGHTS_FONT }}>
        <div style={{ padding: 40, textAlign: 'center', color: C.gray400, fontSize: 14 }}>Loading fund performance…</div>
      </div>
    );
  }

  const fundNames = Object.keys(fundsData);
  if (fundNames.length === 0) {
    return (
      <div style={{ flex: 1, padding: isMobile ? '20px 16px' : '28px 60px', background: C.offWhite, fontFamily: INSIGHTS_FONT }}>
        <div style={{ padding: 24, color: C.gray500, textAlign: 'center' }}>No fund data available.</div>
      </div>
    );
  }

  // ═══ DETAIL VIEW ═══
  if (selectedFund && fundsData[selectedFund]) {
    const rows = (fundsData[selectedFund] || []).slice().sort((a, b) => (a.date || '').localeCompare(b.date || ''));
    const latest = rows[rows.length - 1] || {};
    const earliest = rows[0] || {};
    const fundYield = Number(latest.fundNetAnnualYield) || 0;
    const bmYield = Number(latest.benchMarkMetric) || 0;
    const inflation = Number(latest.Inflation) || 0;
    const outperf = fundYield - bmYield;
    const realReturn = fundYield - inflation;
    const fmtDate = (d) => d ? new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

    return (
      <div style={{ flex: 1, padding: isMobile ? '20px 16px' : '28px 60px', background: C.offWhite, fontFamily: INSIGHTS_FONT }}>
        {/* Back button + ROI Calculator */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <button onClick={() => setSelectedFund(null)} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8,
            background: C.white, border: `1px solid ${C.gray200}`, color: C.gray700, fontSize: 13,
            fontWeight: 600, cursor: 'pointer', fontFamily: INSIGHTS_FONT,
          }}
            onMouseEnter={e => { e.currentTarget.style.background = C.gray50; e.currentTarget.style.borderColor = C.red; e.currentTarget.style.color = C.red; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.white; e.currentTarget.style.borderColor = C.gray200; e.currentTarget.style.color = C.gray700; }}
          >
            <ChevronLeft size={16} /> Back to All Funds
          </button>
          <button onClick={() => onNavigate && onNavigate('tools')} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px',
            background: C.red, color: C.white, fontWeight: 700, fontSize: 12,
            borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: font.sans,
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = C.redHover}
            onMouseLeave={e => e.currentTarget.style.background = C.red}
          ><Calculator size={14} /> ROI Calculator</button>
        </div>

        {/* Performance Summary — top, full width, darker background */}
        <div style={{ padding: '20px 24px', borderRadius: 12, background: '#E8EDF4', border: `1px solid ${C.gray200}`, marginBottom: 20 }}>
          <h4 style={{ fontFamily: INSIGHTS_FONT, fontSize: 14, fontWeight: 700, color: C.gray900, marginBottom: 10, letterSpacing: '-0.01em' }}>Performance Summary</h4>
          {outperf >= 0 ? (
            <p style={{ fontFamily: INSIGHTS_FONT, fontSize: 13, color: C.gray600, lineHeight: 1.7 }}>
              Over the last 12 months, the {selectedFund} has delivered a net annual yield of <b style={{ color: C.green }}>{fundYield.toFixed(2)}%</b>,
              compared to the {latest.benchMark || 'benchmark'} at <b style={{ color: C.navy }}>{bmYield.toFixed(2)}%</b> — an outperformance of <b style={{ color: C.green }}>+{outperf.toFixed(2)} percentage points</b>.
              With inflation currently at <b style={{ color: '#E0A500' }}>{inflation.toFixed(2)}%</b>, the fund is delivering a <b style={{ color: realReturn >= 0 ? C.green : C.red }}>{realReturn >= 0 ? 'positive' : 'negative'} real return</b> of {realReturn >= 0 ? '+' : ''}{realReturn.toFixed(2)}% — {realReturn >= 0 ? 'preserving and growing' : 'eroding'} investors' purchasing power.
            </p>
          ) : (
            <p style={{ fontFamily: INSIGHTS_FONT, fontSize: 13, color: C.gray600, lineHeight: 1.7 }}>
              Over the last 12 months, the {selectedFund} has delivered a net annual yield of <b style={{ color: C.green }}>{fundYield.toFixed(2)}%</b>.
            </p>
          )}
        </div>

        {/* Chart + stat cards side by side */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 220px', gap: 16, marginBottom: 20 }}>
          {/* Chart card */}
          <div style={{
            padding: isMobile ? 16 : 22, borderRadius: 16,
            background: C.gray50,
            border: `1px solid ${C.gray200}`,
            boxShadow: '0 4px 16px rgba(15, 61, 110, 0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
          }}>
            <FundBenchmarkChart fundName={selectedFund} rows={rows} isMobile={isMobile} />
          </div>

          {/* Stat cards — stacked vertically on the right */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr', gap: 10 }}>
            {[
              { label: 'Fund Yield', value: `${fundYield.toFixed(2)}%`, color: C.red, sub: 'Current period' },
              { label: latest.benchMark || 'Benchmark', value: `${bmYield.toFixed(2)}%`, color: C.navy, sub: 'Market reference' },
              { label: 'Inflation', value: `${inflation.toFixed(2)}%`, color: '#E0A500', sub: 'CPI' },
              { label: 'Real Return', value: `${realReturn >= 0 ? '+' : ''}${realReturn.toFixed(2)}%`, color: realReturn >= 0 ? C.green : C.red, sub: 'Fund − Inflation' },
            ].map(s => (
              <div key={s.label} style={{ padding: '12px 14px', borderRadius: 12, background: C.white, border: `1px solid ${C.gray100}` }}>
                <div style={{ fontSize: 10, color: C.gray400, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>{s.label}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: s.color, letterSpacing: '-0.02em', lineHeight: 1.1 }}>{s.value}</div>
                <div style={{ fontSize: 10, color: C.gray400, marginTop: 2 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ═══ LIST VIEW — clickable grid of fund cards ═══
  const fmtDate = (d) => d ? new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

  return (
    <div style={{ flex: 1, padding: isMobile ? '20px 16px' : '28px 60px', background: C.offWhite, fontFamily: INSIGHTS_FONT }}>
      <style>{`
        .funds-hscroll::-webkit-scrollbar { height: 6px; }
        .funds-hscroll::-webkit-scrollbar-track { background: ${C.gray50}; border-radius: 3px; }
        .funds-hscroll::-webkit-scrollbar-thumb { background: ${C.gray200}; border-radius: 3px; }
        .funds-hscroll::-webkit-scrollbar-thumb:hover { background: ${C.gray300}; }
      `}</style>

      <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', flexDirection: isMobile ? 'column' : 'row', gap: 12 }}>
        <div>
          <h3 style={{ fontFamily: INSIGHTS_FONT, fontSize: isMobile ? 20 : 24, fontWeight: 700, color: C.gray900, marginBottom: 4, letterSpacing: '-0.02em' }}>Longhorn Fund Performance</h3>
          <p style={{ fontFamily: INSIGHTS_FONT, fontSize: 13, color: C.gray500 }}>Use the arrows or drag to explore. Click any card for its full performance history.</p>
        </div>
        <button onClick={() => onNavigate && onNavigate('tools')} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px',
          background: C.red, color: C.white, fontWeight: 700, fontSize: 12,
          borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: font.sans,
          whiteSpace: 'nowrap', transition: 'all 0.2s', flexShrink: 0,
        }}
          onMouseEnter={e => e.currentTarget.style.background = C.redHover}
          onMouseLeave={e => e.currentTarget.style.background = C.red}
        ><Calculator size={14} /> ROI Calculator</button>
      </div>

      <div style={{ position: 'relative' }}>
        {/* Left arrow */}
        <button onClick={() => scrollByCard(-1)} aria-label="Scroll left" style={{
          position: 'absolute', left: isMobile ? 4 : -18, top: '50%', transform: 'translateY(-50%)',
          width: isMobile ? 36 : 44, height: isMobile ? 36 : 44, borderRadius: '50%', background: C.white,
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)', border: `1px solid ${C.gray100}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: C.gray700, zIndex: 5, transition: 'all 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = C.red; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = C.white; e.currentTarget.style.color = C.gray700; }}
        ><ChevronLeft size={20} /></button>

        {/* Right arrow */}
        <button onClick={() => scrollByCard(1)} aria-label="Scroll right" style={{
          position: 'absolute', right: isMobile ? 4 : -18, top: '50%', transform: 'translateY(-50%)',
          width: isMobile ? 36 : 44, height: isMobile ? 36 : 44, borderRadius: '50%', background: C.white,
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)', border: `1px solid ${C.gray100}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: C.gray700, zIndex: 5, transition: 'all 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = C.red; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = C.white; e.currentTarget.style.color = C.gray700; }}
        ><ChevronRight size={20} /></button>

      <div ref={scrollRef} className="funds-hscroll" style={{
        display: 'flex', gap: 16, overflowX: 'auto', overflowY: 'hidden',
        scrollSnapType: 'x mandatory', paddingBottom: 16, scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch',
      }}>
        {fundNames.map((fundName) => {
          const rows = (fundsData[fundName] || []).slice().sort((a, b) => (a.date || '').localeCompare(b.date || ''));
          if (rows.length === 0) return null;
          const latest = rows[rows.length - 1];
          const earliest = rows[0];
          const fundYield = Number(latest.fundNetAnnualYield) || 0;
          const bmYield = Number(latest.benchMarkMetric) || 0;
          const inflation = Number(latest.Inflation) || 0;
          const outperf = fundYield - bmYield;
          const realReturn = fundYield - inflation;
          const startYield = Number(earliest.fundNetAnnualYield) || 0;
          const yieldChange = fundYield - startYield;
          const cardWidth = isMobile ? 'calc(100vw - 56px)' : 380;

          /* Quarter-over-quarter: find the row ~3 months before latest */
          const prevQIdx = Math.max(0, rows.length - 4);
          const prevQYield = Number(rows[prevQIdx].fundNetAnnualYield) || 0;
          const qoqChange = fundYield - prevQYield;

          // Build latest-period summary sentence
          const trendWord = yieldChange >= 0.5 ? 'trending upward' : yieldChange <= -0.5 ? 'trending downward' : 'holding steady';
          const vsBmWord = outperf >= 0 ? `outperforming its ${latest.benchMark || 'benchmark'} by ${outperf.toFixed(2)} pp` : `trailing its ${latest.benchMark || 'benchmark'} by ${Math.abs(outperf).toFixed(2)} pp`;
          const realWord = realReturn >= 0 ? `beating inflation by ${realReturn.toFixed(2)} pp` : `below inflation by ${Math.abs(realReturn).toFixed(2)} pp`;

          return (
            <div
              key={fundName}
              onClick={() => setSelectedFund(fundName)}
              style={{
                flex: `0 0 ${cardWidth}`, width: cardWidth, scrollSnapAlign: 'start',
                padding: isMobile ? 18 : 22, borderRadius: 14, background: C.white,
                border: `1px solid ${C.gray100}`, cursor: 'pointer',
                transition: 'all 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                e.currentTarget.style.borderColor = C.red;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
                e.currentTarget.style.borderColor = C.gray100;
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14, gap: 12 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <div style={{ width: 4, height: 20, borderRadius: 2, background: C.red, flexShrink: 0 }} />
                    <h3 style={{ fontFamily: INSIGHTS_FONT, fontSize: isMobile ? 15 : 16, fontWeight: 700, color: C.gray900, letterSpacing: '-0.02em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{fundName}</h3>
                  </div>
                  <p style={{ fontFamily: INSIGHTS_FONT, fontSize: 11, color: C.gray400, marginLeft: 14 }}>
                    As at {fmtDate(latest.date)}
                  </p>
                </div>
                <div style={{
                  padding: '4px 10px', borderRadius: 6,
                  background: qoqChange >= 0 ? `${C.green}15` : `${C.red}15`,
                  fontSize: 11, fontWeight: 700,
                  color: qoqChange >= 0 ? C.green : C.red,
                  whiteSpace: 'nowrap',
                }}>
                  {qoqChange >= 0 ? '▲' : '▼'} {qoqChange >= 0 ? '+' : ''}{qoqChange.toFixed(2)}% QoQ
                </div>
              </div>

              {/* Big yield number */}
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: C.gray400, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Fund Net Annual Yield</div>
                <div style={{ fontSize: 32, fontWeight: 800, color: C.green, letterSpacing: '-0.02em', lineHeight: 1.1 }}>{fundYield.toFixed(2)}%</div>
              </div>

              {/* Plain-English summary */}
              <div style={{
                padding: '12px 14px', borderRadius: 10, background: C.gray50,
                border: `1px solid ${C.gray100}`, marginBottom: 12,
              }}>
                <p style={{ fontFamily: INSIGHTS_FONT, fontSize: 12, color: C.gray600, lineHeight: 1.6, margin: 0 }}>
                  The fund is <b style={{ color: C.gray900 }}>{trendWord}</b>, currently <b style={{ color: outperf >= 0 ? C.green : C.red }}>{vsBmWord}</b> and <b style={{ color: realReturn >= 0 ? C.green : C.red }}>{realWord}</b>.
                </p>
              </div>

              {/* Comparison row */}
              <div style={{ display: 'flex', gap: 8, paddingTop: 12, borderTop: `1px solid ${C.gray100}` }}>
                {[
                  { label: latest.benchMark || 'Benchmark', value: bmYield, color: C.navy },
                  { label: 'Inflation', value: inflation, color: '#E0A500' },
                ].map(s => (
                  <div key={s.label} style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 10, color: C.gray400, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: s.color }}>{s.value.toFixed(2)}%</div>
                  </div>
                ))}
                <div style={{ alignSelf: 'center', fontSize: 11, fontWeight: 700, color: C.red, whiteSpace: 'nowrap' }}>
                  View Details →
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   FUND BENCHMARK CHART — 3-line time-series
   Plots fundNetAnnualYield, benchMarkMetric, Inflation
   over time using the date as the x-axis
   ══════════════════════════════════════════════ */
function FundBenchmarkChart({ fundName, rows, isMobile }) {
  const [hoverIdx, setHoverIdx] = useState(null);
  const svgRef = useRef(null);

  if (!rows || rows.length === 0) {
    return <div style={{ padding: 20, color: C.gray400, fontSize: 13 }}>No data for {fundName}</div>;
  }

  const W = 380;
  const H = 150;
  const padL = 34;
  const padR = 20;
  const padT = 10;
  const padB = 26;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  const series = [
    { key: 'fundNetAnnualYield', label: 'Fund Net Annual Yield', color: C.red,       width: 1.6, dash: null },
    { key: 'benchMarkMetric',    label: rows[0].benchMark || 'Benchmark', color: C.navy, width: 1.4, dash: null },
    { key: 'Inflation',          label: 'Inflation',           color: '#E0A500',   width: 1.4, dash: '5,4' },
  ];

  const allValues = rows.flatMap(r => series.map(s => Number(r[s.key])).filter(v => !isNaN(v)));
  const rawMin = Math.min(...allValues);
  const rawMax = Math.max(...allValues);
  const span = rawMax - rawMin || 1;
  const yMin = Math.max(0, Math.floor((rawMin - span * 0.1) / 5) * 5);
  const yMax = Math.ceil((rawMax + span * 0.1) / 5) * 5;
  const yRange = yMax - yMin || 1;

  const xFor = (i) => padL + (rows.length === 1 ? innerW / 2 : (i / (rows.length - 1)) * innerW);
  const yFor = (v) => padT + innerH - ((v - yMin) / yRange) * innerH;

  const toLinePath = (key) => {
    const pts = rows.map((r, i) => `${xFor(i)},${yFor(Number(r[key]))}`);
    return `M ${pts.join(' L ')}`;
  };

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(t => yMin + t * yRange);

  const fmtTick = (d) => {
    if (!d) return '';
    const dt = new Date(d + 'T00:00:00');
    return dt.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' });
  };
  const tickStep = Math.max(1, Math.ceil(rows.length / 5));
  const xTickIdx = rows.map((_, i) => i).filter(i => i % tickStep === 0 || i === rows.length - 1);

  const handleMove = (e) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * W;
    const relX = x - padL;
    if (relX < 0 || relX > innerW) { setHoverIdx(null); return; }
    const idx = rows.length === 1 ? 0 : Math.round((relX / innerW) * (rows.length - 1));
    setHoverIdx(Math.max(0, Math.min(rows.length - 1, idx)));
  };
  const handleLeave = () => setHoverIdx(null);
  const hover = hoverIdx != null ? rows[hoverIdx] : null;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <div style={{ width: 4, height: 18, borderRadius: 2, background: C.red }} />
        <h3 style={{ fontFamily: INSIGHTS_FONT, fontSize: isMobile ? 14 : 15, fontWeight: 700, color: C.gray900, letterSpacing: '-0.02em' }}>{fundName}</h3>
      </div>
      <p style={{ fontFamily: INSIGHTS_FONT, fontSize: 10, color: C.gray400, marginLeft: 14, marginBottom: 10 }}>
        {fmtTick(rows[0].date)} → {fmtTick(rows[rows.length - 1].date)}
      </p>

      <div style={{ position: 'relative' }}>
        <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }} onMouseMove={handleMove} onMouseLeave={handleLeave}>
          <defs>
            {series.map(s => (
              <marker key={s.key} id={`arrow-${s.key}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill={s.color} />
              </marker>
            ))}
          </defs>

          {yTicks.map((v, i) => {
            const y = yFor(v);
            return (
              <g key={i}>
                <line x1={padL} y1={y} x2={W - padR} y2={y} stroke={C.gray100} strokeWidth="0.5" strokeDasharray="3,4" />
                <text x={padL - 5} y={y + 3} textAnchor="end" fontSize="9" fill={C.gray500} fontFamily={INSIGHTS_FONT}>{v.toFixed(0)}%</text>
              </g>
            );
          })}

          {xTickIdx.map(i => (
            <text key={i} x={xFor(i)} y={H - 12} textAnchor="middle" fontSize="8" fill={C.gray500} fontFamily={INSIGHTS_FONT}>
              {fmtTick(rows[i].date)}
            </text>
          ))}

          {series.map(s => (
            <path key={s.key} d={toLinePath(s.key)} fill="none" stroke={s.color} strokeWidth={s.width} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={s.dash || undefined} markerEnd={`url(#arrow-${s.key})`} />
          ))}

          {hover && (
            <>
              <line x1={xFor(hoverIdx)} y1={padT} x2={xFor(hoverIdx)} y2={padT + innerH} stroke={C.gray300} strokeWidth="0.5" strokeDasharray="3,3" />
              {series.map(s => {
                const v = Number(hover[s.key]);
                if (isNaN(v)) return null;
                return <circle key={s.key} cx={xFor(hoverIdx)} cy={yFor(v)} r="3.5" fill={s.color} stroke="#fff" strokeWidth="1.5" />;
              })}
            </>
          )}
        </svg>

        {hover && (
          <div style={{
            position: 'absolute', top: 6,
            left: hoverIdx > rows.length / 2 ? 10 : 'auto',
            right: hoverIdx > rows.length / 2 ? 'auto' : 10,
            background: C.white, border: `1px solid ${C.gray200}`, borderRadius: 8,
            padding: '8px 10px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            fontFamily: INSIGHTS_FONT, fontSize: 10, minWidth: 160, pointerEvents: 'none',
          }}>
            <div style={{ fontWeight: 700, color: C.gray900, marginBottom: 4 }}>{fmtTick(hover.date)}</div>
            {series.map(s => {
              const v = Number(hover[s.key]);
              if (isNaN(v)) return null;
              return (
                <div key={s.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 2 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 8, height: 3, background: s.color, borderRadius: 1 }} />
                    <span style={{ color: C.gray600 }}>{s.label}</span>
                  </div>
                  <span style={{ fontWeight: 700, color: s.color }}>{v.toFixed(2)}%</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 14, marginTop: 8 }}>
        {series.map(s => (
          <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="18" height="6">
              <line x1="0" y1="3" x2="18" y2="3" stroke={s.color} strokeWidth={s.width} strokeDasharray={s.dash || undefined} strokeLinecap="round" />
            </svg>
            <span style={{ fontFamily: INSIGHTS_FONT, fontSize: 10, fontWeight: 600, color: C.gray600 }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════
   MARKET SNAPSHOT CARDS — ALL LIVE API DATA
   2-row horizontal-scrollable, equal-sized cards
   APIs: foreign-exchange, all-share-index, monetary-policyrate,
         inflation-rate, grz-securities
   ══════════════════════════════════════════════ */
function MarketSnapshotCards({ isMobile }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    Promise.allSettled([
      cachedFetch('/api/foreign-exchange/'),
      cachedFetch('/api/all-share-index-benchmark/'),
      cachedFetch('/api/monetary-policyrate-benchmark/'),
      cachedFetch('/api/inflation-rate-benchmark/'),
      cachedFetch('/api/grz-securities-benchmark/'),
    ]).then(([fxRes, asiRes, mprRes, infRes, grzRes]) => {
      if (cancelled) return;
      const result = [];

      /* USD/ZMW from foreign-exchange */
      if (fxRes.status === 'fulfilled') {
        const fxRows = Array.isArray(fxRes.value) ? fxRes.value : fxRes.value.results || [];
        const usd = fxRows.find(r => (r.currency || '').toUpperCase() === 'USD');
        if (usd) {
          const pct12 = Number(usd.percentChangeFrom12monthsAgo) || 0;
          const zmwUp = pct12 < 0;
          result.push({
            label: 'USD / ZMW',
            value: `K${Number(usd.midRate).toFixed(2)}`,
            change: `12M ${pct12 >= 0 ? '+' : ''}${pct12.toFixed(2)}%`,
            negative: !zmwUp,
            date: usd.date,
          });
        }
        /* Add other FX pairs (exclude ZMW) */
        fxRows.filter(r => {
          const cur = (r.currency || '').toUpperCase();
          return cur !== 'USD' && cur !== 'ZMW';
        }).forEach(r => {
          const pct = Number(r.percentChangeFromPreviousRate) || 0;
          const dir = (r.direction || '').toLowerCase();
          const zmwGained = dir.includes('zmw-up') || dir.includes('zmw up');
          result.push({
            label: `${r.currency} / ZMW`,
            value: `K${Number(r.midRate).toFixed(2)}`,
            change: `${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%`,
            negative: !zmwGained,
            date: r.date,
          });
        });
      }

      /* LuSE ASI */
      if (asiRes.status === 'fulfilled') {
        const d = asiRes.value;
        const dir = (d.direction || '').toLowerCase();
        result.push({
          label: 'LuSE ASI',
          value: d.allShareIndex != null ? Number(d.allShareIndex).toLocaleString('en', { maximumFractionDigits: 2 }) : '—',
          change: d.change != null ? `${Number(d.change) >= 0 ? '+' : ''}${Number(d.change).toFixed(2)}%` : '—',
          negative: dir === 'down',
          date: d.date,
        });
      }

      /* Monetary Policy Rate */
      if (mprRes.status === 'fulfilled') {
        const d = mprRes.value;
        const dir = (d.direction || '').toLowerCase();
        result.push({
          label: 'Monetary Policy Rate',
          value: d.monetaryPolicyRate != null ? `${Number(d.monetaryPolicyRate).toFixed(1)}%` : '—',
          change: d.change || '—',
          negative: dir === 'up',
          date: d.date,
        });
      }

      /* Inflation Rate */
      if (infRes.status === 'fulfilled') {
        const d = infRes.value;
        const dir = (d.direction || '').toLowerCase();
        result.push({
          label: 'Inflation Rate',
          value: d.inflation != null ? `${Number(d.inflation).toFixed(1)}%` : '—',
          change: d.change || '—',
          negative: dir === 'up',
          date: d.date,
        });
      }

      /* GRZ Securities — one card each */
      if (grzRes.status === 'fulfilled') {
        const securities = Array.isArray(grzRes.value) ? grzRes.value : [];
        const nameMap = {
          '182-tbill': '182-Day T-Bill',
          '364-tbill': '364-Day T-Bill',
          '5-year-bond': '5-Year Bond',
          '10-year-bond': '10-Year Bond',
          '2-year-bond': '2-Year Bond',
          '3-year-bond': '3-Year Bond',
          '7-year-bond': '7-Year Bond',
          '15-year-bond': '15-Year Bond',
          '91-tbill': '91-Day T-Bill',
        };
        securities.forEach(s => {
          const dir = (s.direction || '').toLowerCase();
          result.push({
            label: nameMap[s.securityName] || s.securityName,
            value: s.yieldRate != null ? `${Number(s.yieldRate).toFixed(2)}%` : '—',
            change: s.change || '—',
            negative: dir === 'up',
            date: s.date,
          });
        });
      }

      setCards(result);
      setLoading(false);
    });

    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return <div style={{ padding: 40, textAlign: 'center', color: C.gray400, fontSize: 14, fontFamily: INSIGHTS_FONT }}>Loading market data…</div>;
  }
  if (cards.length === 0) {
    return <div style={{ padding: 24, textAlign: 'center', color: C.gray500, fontFamily: INSIGHTS_FONT }}>Unable to load market data.</div>;
  }

  /* Split into 2 rows for desktop display */
  const half = Math.ceil(cards.length / 2);
  const row1 = cards.slice(0, half);
  const row2 = cards.slice(half);

  const CARD_W = isMobile ? 175 : 220;

  const renderCard = (c) => {
    const isUp = !c.negative;
    const accentColor = isUp ? C.green : '#DC2626';
    const bgTint = isUp ? 'rgba(22,163,74,0.04)' : 'rgba(220,38,38,0.04)';
    return (
      <div key={c.label} style={{
        flex: `0 0 ${CARD_W}px`, width: CARD_W, padding: '18px 16px', borderRadius: 14,
        background: C.white, border: `1px solid ${C.gray100}`, scrollSnapAlign: 'start',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Subtle colored corner accent */}
        <div style={{ position: 'absolute', top: -12, right: -12, width: 56, height: 56, borderRadius: '50%', background: bgTint, pointerEvents: 'none' }} />

        {/* Label row with direction indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, position: 'relative' }}>
          <div style={{ fontFamily: INSIGHTS_FONT, fontSize: 10, color: C.gray400, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{c.label}</div>
          {/* Direction arrow circle */}
          <div style={{
            width: 24, height: 24, borderRadius: '50%',
            background: `${accentColor}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <div style={{
              width: 0, height: 0,
              borderLeft: '4px solid transparent', borderRight: '4px solid transparent',
              borderBottom: isUp ? `6px solid ${accentColor}` : 'none',
              borderTop: !isUp ? `6px solid ${accentColor}` : 'none',
            }} />
          </div>
        </div>

        {/* Value */}
        <div style={{ fontFamily: INSIGHTS_FONT, fontSize: 22, fontWeight: 800, color: C.gray900, letterSpacing: '-0.02em', marginBottom: 6, lineHeight: 1.1 }}>{c.value}</div>

        {/* Change badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          padding: '3px 8px', borderRadius: 6,
          background: `${accentColor}10`,
          fontFamily: INSIGHTS_FONT, fontSize: 11, fontWeight: 700, color: accentColor,
        }}>
          <span style={{ fontSize: 9 }}>{isUp ? '▲' : '▼'}</span>
          {c.change}
        </div>

        {/* Subtle bottom accent bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${accentColor}40, transparent)` }} />
      </div>
    );
  };

  return (
    <div style={{ position: 'relative' }}>
      <style>{`
        .mkt-hscroll::-webkit-scrollbar { height: 5px; }
        .mkt-hscroll::-webkit-scrollbar-track { background: ${C.gray50}; border-radius: 3px; }
        .mkt-hscroll::-webkit-scrollbar-thumb { background: ${C.gray200}; border-radius: 3px; }
      `}</style>

      {/* Left arrow */}
      <button onClick={() => { const el = scrollRef.current; if (el) el.scrollBy({ left: -CARD_W * 2, behavior: 'smooth' }); }} style={{
        position: 'absolute', left: isMobile ? 2 : -16, top: '50%', transform: 'translateY(-50%)',
        width: 36, height: 36, borderRadius: '50%', background: C.white,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)', border: `1px solid ${C.gray100}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: C.gray700, zIndex: 5,
      }}><ChevronLeft size={18} /></button>

      {/* Right arrow */}
      <button onClick={() => { const el = scrollRef.current; if (el) el.scrollBy({ left: CARD_W * 2, behavior: 'smooth' }); }} style={{
        position: 'absolute', right: isMobile ? 2 : -16, top: '50%', transform: 'translateY(-50%)',
        width: 36, height: 36, borderRadius: '50%', background: C.white,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)', border: `1px solid ${C.gray100}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: C.gray700, zIndex: 5,
      }}><ChevronRight size={18} /></button>

      <div ref={scrollRef} className="mkt-hscroll" style={{
        overflowX: 'auto', overflowY: 'hidden', scrollSnapType: 'x mandatory',
        scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch', paddingBottom: 8,
      }}>
        {/* Row 1 */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
          {row1.map(renderCard)}
        </div>
        {/* Row 2 */}
        {row2.length > 0 && (
          <div style={{ display: 'flex', gap: 10 }}>
            {row2.map(renderCard)}
          </div>
        )}
      </div>
    </div>
  );
}

function InsightsPage({ onNavigate }) {
  const [tab, setTab] = useState('funds');
  const [selectedNews, setSelectedNews] = useState(null);
  const isMobile = useIsMobile();
  const tabs = ['Funds', 'Markets', 'News & Events'];
  const tabKeys = ['funds', 'markets', 'news'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 64px)' }}>
      {/* Ticker above banner */}
      <MarketTicker />
      {/* Header with tabs */}
      <div style={{ background: HEADER_GRADIENT, padding: isMobile ? '24px 20px' : '32px 60px' }}>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'flex-end', gap: isMobile ? 16 : 0 }}>
          <div>
            <h1 style={{ fontFamily: INSIGHTS_FONT, fontSize: isMobile ? 22 : 30, fontWeight: 700, color: C.white, marginBottom: 4, letterSpacing: '-0.02em' }}>Insights & Market Data</h1>
            <p style={{ fontSize: isMobile ? 12 : 14, color: 'rgba(255,255,255,0.5)' }}>Longhorn fund performance vs market instruments</p>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {tabs.map((t, idx) => (
              <button key={t} onClick={() => setTab(tabKeys[idx])} style={{
                padding: '8px 18px', border: 'none', cursor: 'pointer', fontFamily: font.sans,
                fontSize: 13, fontWeight: tab === tabKeys[idx] ? 700 : 500, borderRadius: '8px 8px 0 0',
                color: tab === tabKeys[idx] ? C.navy : 'rgba(255,255,255,0.7)',
                background: tab === tabKeys[idx] ? C.white : 'rgba(255,255,255,0.1)',
                transition: 'all 0.2s',
              }}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ MARKETS TAB ═══ */}
      {tab === 'markets' && (
        <div style={{ flex: 1, padding: isMobile ? '20px 16px' : '28px 60px', background: C.offWhite, fontFamily: INSIGHTS_FONT }}>
          <h3 style={{ fontFamily: INSIGHTS_FONT, fontSize: 20, fontWeight: 700, color: C.gray900, marginBottom: 16, letterSpacing: '-0.02em' }}>Market Snapshot</h3>
          <MarketSnapshotCards isMobile={isMobile} />
        </div>
      )}

      {/* ═══ FUNDS TAB ═══ */}
      {tab === 'funds' && <FundsTab isMobile={isMobile} onNavigate={onNavigate} />}

      {/* ═══ NEWS & EVENTS TAB ═══ */}
      {tab === 'news' && (
        <div style={{ flex: 1, padding: isMobile ? '20px 16px' : '28px 60px', background: C.offWhite }}>
          <h3 style={{ fontFamily: font.serif, fontSize: 20, fontWeight: 700, color: C.gray900, marginBottom: 20 }}>Latest News & Events</h3>
          <NewsCarousel items={newsItems} onSelect={setSelectedNews} />
          {/* News detail modal */}
          {selectedNews && (
            <div onClick={() => setSelectedNews(null)} style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
              zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
            }}>
              <div onClick={e => e.stopPropagation()} style={{
                background: '#fff', borderRadius: 20, maxWidth: 560, width: '100%',
                overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.2)', position: 'relative',
              }}>
                <button onClick={() => setSelectedNews(null)} style={{
                  position: 'absolute', top: 16, right: 16, width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10,
                }}><X size={18} style={{ color: '#374151' }} /></button>
                <div style={{ height: 140, background: `linear-gradient(135deg, ${C.navy}, ${C.navyLight})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Newspaper size={40} style={{ color: 'rgba(255,255,255,0.3)' }} />
                </div>
                <div style={{ padding: '28px 32px' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: C.red, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{selectedNews.cat}</span>
                  <h2 style={{ fontFamily: font.serif, fontSize: 22, fontWeight: 700, color: C.gray900, marginTop: 8, marginBottom: 12, lineHeight: 1.3 }}>{selectedNews.title}</h2>
                  <div style={{ fontSize: 12, color: C.gray400, marginBottom: 16 }}>{selectedNews.date}</div>
                  <div style={{ width: 32, height: 3, borderRadius: 2, background: C.red, marginBottom: 16 }} />
                  <p style={{ fontSize: 15, color: C.gray600, lineHeight: 1.8 }}>{selectedNews.excerpt}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
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
  const isMobile = useIsMobile();
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
      zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isMobile ? 12 : 24,
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
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
          <div style={{
            width: isMobile ? '100%' : 220, minHeight: isMobile ? 200 : 280, flexShrink: 0,
            background: hasPhoto ? 'none' : `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: isMobile ? '20px 20px 0 0' : '20px 0 0 20px', overflow: 'hidden',
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
/*  TEAM CAROUSEL                              */
/* ═══════════════════════════════════════════ */
function TeamCarousel({ members, accentColor, onSelect }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);
  const isMobile = useIsMobile();
  const perPage = isMobile ? 1 : 3;

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % members.length);
    }, 5000);
  }, [members.length]);

  useEffect(() => { startTimer(); return () => clearInterval(timerRef.current); }, [startTimer]);

  const goTo = (idx) => { setCurrent(idx); startTimer(); };
  const prev = () => goTo((current - 1 + members.length) % members.length);
  const next = () => goTo((current + 1) % members.length);

  const visible = Array.from({ length: perPage }, (_, offset) => members[(current + offset) % members.length]);

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${perPage}, 1fr)`, gap: isMobile ? 12 : 22 }}>
        {visible.map((m, i) => (
          <div key={`${m.name}-${m.role}-${i}`} style={{ animation: 'teamFadeIn 0.5s ease both', animationDelay: `${i * 0.1}s` }}>
            <TeamCard member={m} accentColor={accentColor} onSelect={onSelect} />
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button onClick={prev} style={{
        position: 'absolute', left: isMobile ? -8 : -22, top: '40%', transform: 'translateY(-50%)',
        width: isMobile ? 36 : 44, height: isMobile ? 36 : 44, borderRadius: '50%', background: C.white,
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)', border: `1px solid ${C.gray100}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: C.gray600, zIndex: 5, transition: 'all 0.2s',
      }}
        onMouseEnter={e => { e.currentTarget.style.background = accentColor; e.currentTarget.style.color = '#fff'; }}
        onMouseLeave={e => { e.currentTarget.style.background = C.white; e.currentTarget.style.color = C.gray600; }}
      ><ChevronLeft size={20} /></button>

      <button onClick={next} style={{
        position: 'absolute', right: isMobile ? -8 : -22, top: '40%', transform: 'translateY(-50%)',
        width: isMobile ? 36 : 44, height: isMobile ? 36 : 44, borderRadius: '50%', background: C.white,
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)', border: `1px solid ${C.gray100}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: C.gray600, zIndex: 5, transition: 'all 0.2s',
      }}
        onMouseEnter={e => { e.currentTarget.style.background = accentColor; e.currentTarget.style.color = '#fff'; }}
        onMouseLeave={e => { e.currentTarget.style.background = C.white; e.currentTarget.style.color = C.gray600; }}
      ><ChevronRight size={20} /></button>

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 24 }}>
        {members.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{
            width: current === i ? 24 : 8, height: 8,
            borderRadius: current === i ? 4 : 50,
            border: 'none', cursor: 'pointer', padding: 0,
            background: current === i ? accentColor : C.gray200,
            transition: 'all 0.3s ease',
          }} />
        ))}
      </div>

      <style>{`
        @keyframes teamFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes teamProgress { from { width: 0%; } to { width: 100%; } }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════ */
/*  NEWS CAROUSEL                              */
/* ═══════════════════════════════════════════ */
function NewsCarousel({ items, onSelect }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);
  const isMobile = useIsMobile();
  const perPage = isMobile ? 1 : 3;

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % items.length);
    }, 5000);
  }, [items.length]);

  useEffect(() => { startTimer(); return () => clearInterval(timerRef.current); }, [startTimer]);

  const goTo = (idx) => { setCurrent(idx); startTimer(); };
  const prev = () => goTo((current - 1 + items.length) % items.length);
  const next = () => goTo((current + 1) % items.length);

  const visible = Array.from({ length: perPage }, (_, offset) => ({
    item: items[(current + offset) % items.length],
    idx: (current + offset) % items.length,
  }));

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${perPage}, 1fr)`, gap: isMobile ? 12 : 20 }}>
        {visible.map(({ item, idx }, i) => (
          <div key={`${item.title}-${idx}-${i}`} onClick={() => onSelect && onSelect(item)} style={{
            background: C.white, borderRadius: 12, overflow: 'hidden',
            border: `1px solid ${C.gray100}`, transition: 'all 0.25s', cursor: 'pointer',
            animation: 'teamFadeIn 0.5s ease both', animationDelay: `${i * 0.1}s`,
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={{ height: 120, background: `linear-gradient(135deg, ${C.navy}, ${C.navyLight})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Newspaper size={28} style={{ color: 'rgba(255,255,255,0.3)' }} />
            </div>
            <div style={{ padding: 18 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: C.red, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.cat}</span>
              <h3 style={{ fontFamily: font.serif, fontSize: 15, fontWeight: 700, color: C.gray900, marginTop: 6, marginBottom: 8, lineHeight: 1.3 }}>{item.title}</h3>
              <p style={{ fontSize: 12, color: C.gray500, lineHeight: 1.5 }}>{item.excerpt}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                <span style={{ fontSize: 11, color: C.gray400 }}>{item.date}</span>
                <span style={{ fontSize: 11, color: C.red, fontWeight: 600 }}>Read More →</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button onClick={prev} style={{
        position: 'absolute', left: isMobile ? -8 : -22, top: '40%', transform: 'translateY(-50%)',
        width: isMobile ? 36 : 44, height: isMobile ? 36 : 44, borderRadius: '50%', background: C.white,
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)', border: `1px solid ${C.gray100}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: C.gray600, zIndex: 5, transition: 'all 0.2s',
      }}
        onMouseEnter={e => { e.currentTarget.style.background = C.navy; e.currentTarget.style.color = '#fff'; }}
        onMouseLeave={e => { e.currentTarget.style.background = C.white; e.currentTarget.style.color = C.gray600; }}
      ><ChevronLeft size={20} /></button>

      <button onClick={next} style={{
        position: 'absolute', right: isMobile ? -8 : -22, top: '40%', transform: 'translateY(-50%)',
        width: isMobile ? 36 : 44, height: isMobile ? 36 : 44, borderRadius: '50%', background: C.white,
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)', border: `1px solid ${C.gray100}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: C.gray600, zIndex: 5, transition: 'all 0.2s',
      }}
        onMouseEnter={e => { e.currentTarget.style.background = C.navy; e.currentTarget.style.color = '#fff'; }}
        onMouseLeave={e => { e.currentTarget.style.background = C.white; e.currentTarget.style.color = C.gray600; }}
      ><ChevronRight size={20} /></button>

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 24 }}>
        {items.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{
            width: current === i ? 24 : 8, height: 8,
            borderRadius: current === i ? 4 : 50,
            border: 'none', cursor: 'pointer', padding: 0,
            background: current === i ? C.red : C.gray200,
            transition: 'all 0.3s ease',
          }} />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════ */
/*  ABOUT PAGE                                */
/* ═══════════════════════════════════════════ */
function AboutPage({ initialTab }) {
  const [tab, setTab] = useState(initialTab || 'about');
  const [teamTab, setTeamTab] = useState('board');
  const [selectedMember, setSelectedMember] = useState(null);
  const isMobile = useIsMobile();
  const tabs = [{ k: 'about', l: 'About Us' }, { k: 'team', l: 'Our Team' }, { k: 'governance', l: 'Governance' }, { k: 'values', l: 'Core Values' }];

  useEffect(() => { if (initialTab) setTab(initialTab); }, [initialTab]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 64px)' }}>
      <div style={{ background: HEADER_GRADIENT, padding: isMobile ? '24px 20px' : '32px 60px' }}>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'flex-end', gap: isMobile ? 16 : 0 }}>
          <div>
            <h1 style={{ fontFamily: font.serif, fontSize: isMobile ? 22 : 30, fontWeight: 700, color: C.white }}>About Longhorn Associates</h1>
            <p style={{ fontSize: isMobile ? 12 : 14, color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>SEC & PIA Licensed Investment Management Company</p>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {tabs.map(t => (
              <button key={t.k} onClick={() => setTab(t.k)} style={{
                padding: '8px 18px', border: 'none', cursor: 'pointer', fontFamily: font.sans,
                fontSize: 13, fontWeight: tab === t.k ? 700 : 500, borderRadius: '8px 8px 0 0',
                color: tab === t.k ? C.navy : 'rgba(255,255,255,0.7)',
                background: tab === t.k ? C.white : 'rgba(255,255,255,0.1)',
                transition: 'all 0.2s',
              }}>{t.l}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, padding: isMobile ? '20px 16px' : '32px 60px', background: C.offWhite }}>

        {/* About Us */}
        {tab === 'about' && (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr', gap: 32 }}>
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
            {/* Board / Management toggle */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
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
              <TeamCarousel members={boardOfDirectors} accentColor={C.red} onSelect={setSelectedMember} />
            )}

            {/* Management */}
            {teamTab === 'mgmt' && (
              <TeamCarousel members={managementTeam} accentColor={C.navyLight} onSelect={setSelectedMember} />
            )}

            {/* Bio Modal */}
            {selectedMember && (
              <TeamModal member={selectedMember} accentColor={teamTab === 'board' ? C.red : C.navyLight} onClose={() => setSelectedMember(null)} />
            )}
          </div>
        )}

        {/* Core Values — unchanged */}
        {tab === 'values' && (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: 16 }}>
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
  const isMobile = useIsMobile();
  const iS = { width: '100%', padding: '11px 14px', borderRadius: 8, border: `1.5px solid ${C.gray200}`, fontSize: 14, fontFamily: font.sans, outline: 'none', color: C.gray800, background: C.white };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 64px)' }}>
      <div style={{ background: HEADER_GRADIENT, padding: isMobile ? '24px 20px' : '32px 60px' }}>
        <h1 style={{ fontFamily: font.serif, fontSize: isMobile ? 22 : 30, fontWeight: 700, color: C.white }}>Contact Us</h1>
        <p style={{ fontSize: isMobile ? 12 : 14, color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>Visit any of our 4 branches or get in touch online</p>
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.4fr', background: C.white }}>
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
/*  PORTAL PAGE — Login + Onboarding Wizard    */
/*  Lookup APIs, conditional KYC, FormData     */
/*  submission per Unit Trust Build Guide      */
/* ═══════════════════════════════════════════ */

/* ── Shared form styles (module-level) ── */
const portalStyles = {
  input: { width: '100%', padding: '10px 14px', borderRadius: 8, border: `1.5px solid ${C.gray200}`, fontSize: 13, fontFamily: font.sans, outline: 'none', color: C.gray800, background: C.white },
  label: { display: 'block', fontSize: 11, fontWeight: 600, color: C.gray600, marginBottom: 4 },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
};

/* ── InputField — MUST be outside PortalRegister to avoid focus loss ── */
function PortalInputField({ label, name, type = 'text', required, placeholder, value, onChange, options, error, fieldErr }) {
  const S = portalStyles;
  const resolvedErr = error || (fieldErr ? fieldErr(`mainKycForm.${name}`) : null);
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={S.label}>{label} {required && <span style={{ color: C.red }}>*</span>}</label>
      {options ? (
        <select value={value || ''} onChange={e => onChange(e.target.value)} style={{ ...S.input, background: C.white }}>
          <option value="">Select…</option>
          {options.map(o => {
            const val = typeof o === 'object' ? (o.value || o.id || o.name || o.label) : o;
            const display = typeof o === 'object' ? (o.name || o.label || o.value || o.id) : o;
            return <option key={val} value={val}>{display}</option>;
          })}
        </select>
      ) : (
        <input type={type} placeholder={placeholder} value={value || ''} onChange={e => onChange(e.target.value)} style={S.input}
          onFocus={e => e.target.style.borderColor = C.red} onBlur={e => e.target.style.borderColor = C.gray200} />
      )}
      {resolvedErr && <div style={{ fontSize: 11, color: C.red, marginTop: 3 }}>{resolvedErr}</div>}
    </div>
  );
}

/* ── FileField — MUST be outside PortalRegister to avoid focus loss ── */
function PortalFileField({ label, name, required, hint, file, onFileChange, fieldErr }) {
  const S = portalStyles;
  const resolvedErr = fieldErr ? fieldErr(`mainKycForm.${name}`) : null;
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={S.label}>{label} {required && <span style={{ color: C.red }}>*</span>} {hint && <span style={{ color: C.gray400, fontWeight: 400 }}>({hint})</span>}</label>
      <div style={{
        padding: '12px 16px', borderRadius: 10, border: `1.5px dashed ${file ? C.green : C.gray300}`,
        background: file ? `${C.green}08` : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'all 0.2s', cursor: 'pointer', position: 'relative',
      }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: file ? C.green : C.gray700 }}>
            {file ? file.name : 'Choose file…'}
          </div>
          {!file && <div style={{ fontSize: 11, color: C.gray400, marginTop: 2 }}>PDF, JPG, or PNG (max 5MB)</div>}
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, color: file ? C.green : C.red }}>{file ? '✓ Uploaded' : '+ Upload'}</div>
        <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => onFileChange(name, e.target.files[0])} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
      </div>
      {resolvedErr && <div style={{ fontSize: 11, color: C.red, marginTop: 3 }}>{resolvedErr}</div>}
    </div>
  );
}

function PortalPage() {
  const [tab, setTab] = useState('login');
  const isMobile = useIsMobile();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 64px)', background: C.offWhite }}>
      <div style={{ background: HEADER_GRADIENT, padding: isMobile ? '24px 20px' : '32px 60px', textAlign: 'center' }}>
        <div style={{ fontFamily: font.serif, fontSize: 26, fontWeight: 800, color: C.white, marginBottom: 4 }}>
          <span style={{ color: '#FFD0D5' }}>Longhorn</span> Trust
        </div>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Investor Onboarding Portal</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', background: C.gray50, borderRadius: 10, padding: 3, width: isMobile ? '100%' : 360 }}>
          {['login', 'register'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: '10px 0', borderRadius: 8, border: 'none', cursor: 'pointer',
              fontFamily: font.sans, fontWeight: 600, fontSize: 14,
              background: tab === t ? C.navy : 'transparent',
              color: tab === t ? C.white : C.gray400, transition: 'all 0.2s',
            }}>{t === 'login' ? 'Sign In' : 'Register'}</button>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, padding: isMobile ? '20px 16px' : '24px 60px', maxWidth: tab === 'login' ? 480 : 720, margin: '0 auto', width: '100%' }}>
        {tab === 'login' ? <PortalLogin /> : <PortalRegister isMobile={isMobile} />}
      </div>
      <p style={{ textAlign: 'center', fontSize: 10, color: C.gray400, padding: '12px 0' }}>256-bit SSL · Regulated by SEC & PIA Zambia</p>
    </div>
  );
}

function PortalLogin() {
  return (
    <div style={{ background: C.white, borderRadius: 16, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', textAlign: 'center', marginTop: 8 }}>
      <div style={{ width: 64, height: 64, borderRadius: '50%', background: `${C.navy}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
        <LogIn size={28} style={{ color: C.navy }} />
      </div>
      <h3 style={{ fontFamily: font.serif, fontSize: 20, fontWeight: 700, color: C.gray900, marginBottom: 8 }}>Sign In to Your Account</h3>
      <p style={{ fontSize: 14, color: C.gray500, lineHeight: 1.6, marginBottom: 20 }}>Access your Longhorn Trust portal to manage your investments, track performance, and view your portfolio.</p>
      <a href="https://longsmart.longhorn-associates.com/web/login" target="_blank" rel="noopener noreferrer" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        width: '100%', padding: '14px 0', background: C.red, color: C.white,
        fontWeight: 700, fontSize: 14, borderRadius: 8, textDecoration: 'none',
        fontFamily: font.sans, transition: 'all 0.2s',
      }}
        onMouseEnter={e => e.currentTarget.style.background = C.redHover}
        onMouseLeave={e => e.currentTarget.style.background = C.red}
      ><LogIn size={16} /> Sign In to Longhorn Trust</a>
      <p style={{ fontSize: 12, color: C.gray400, marginTop: 10 }}>You will be redirected to the secure login portal</p>
    </div>
  );
}

function PortalRegister({ isMobile }) {
  const S = portalStyles;
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [errors, setErrors] = useState({});

  const [lookups, setLookups] = useState(null);
  const [lookupErr, setLookupErr] = useState(false);

  const [product, setProduct] = useState('');
  const [applicantType, setApplicantType] = useState('');
  const [kyc, setKyc] = useState({});
  const [files, setFiles] = useState({});
  const [unitTrust, setUnitTrust] = useState({ fundName: '', beneficiary: false, beneficiaryName: '', relationshipWithBeneficiary: '', beneficiaryDOB: '' });
  const [credit, setCredit] = useState({ loanType: '', loanAmount: '' });

  useEffect(() => {
    let cancelled = false;
    const endpoints = ['products', 'applicant-types', 'nationalities', 'genders', 'funds', 'loan-types', 'sales-people'];
    Promise.allSettled(
      endpoints.map(ep => cachedFetch(`/api/onboarding/lookups/${ep}/`))
    ).then(results => {
      if (cancelled) return;
      const data = {};
      endpoints.forEach((ep, i) => {
        const key = ep.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
        data[key] = results[i].status === 'fulfilled' ? (Array.isArray(results[i].value) ? results[i].value : results[i].value.results || []) : [];
      });
      if (Object.values(data).every(v => v.length === 0)) setLookupErr(true);
      else setLookups(data);
    });
    return () => { cancelled = true; };
  }, []);

  const totalSteps = 4;
  const kycUpdate = (key, val) => setKyc(prev => ({ ...prev, [key]: val }));
  const fileUpdate = (key, file) => setFiles(prev => ({ ...prev, [key]: file }));

  const isIndividual = applicantType === 'Individual';
  const isCompany = applicantType === 'Company';
  const isUnitTrust = (product || '').replace(/\s/g, '').toLowerCase().includes('unittrust');
  const isCredit = (product || '').replace(/\s/g, '').toLowerCase().includes('credit');
  const isStockBroking = (product || '').replace(/\s/g, '').toLowerCase().includes('stock');

  /* Nested error accessor */
  const fieldErr = useCallback((fieldPath) => {
    if (!errors || typeof errors !== 'object') return null;
    const parts = fieldPath.split('.');
    let val = errors;
    for (const p of parts) {
      if (!val || typeof val !== 'object') return null;
      val = val[p];
    }
    if (Array.isArray(val)) return val[0];
    if (typeof val === 'string') return val;
    return null;
  }, [errors]);

  /* ── SUBMIT — follows guide §16 exactly ── */
  const handleSubmit = async () => {
    setSubmitting(true);
    setErrors({});
    const fd = new FormData();

    /* 1. Top-level fields */
    fd.append('product', product);
    fd.append('applicantType', applicantType);

    /* 2. All mainKycForm fields — only append fields that have values */
    const kycFields = isIndividual
      ? ['firstName','middleName','lastName','emailAddress','phoneNumber','DOB','gender','nationality',
         'IDNumber','IDType','physicalAddress','employer','employeeNumber','sourceOfIncome','salesPerson',
         'bankName','bankAccountNumber','bankAccountName','bankBranchName',
         'nextOfKin','nextOfKinPhone','relationshipWithNextOfKin']
      : ['companyName','companyIDNumber','contactPerson','contactPersonPhone','contactPersonEmail',
         'emailAddress','phoneNumber','nationality','IDType','physicalAddress','salesPerson',
         'bankName','bankAccountNumber','bankAccountName','bankBranchName'];

    kycFields.forEach(k => {
      const v = kyc[k];
      if (v !== undefined && v !== null && v !== '') fd.append(`mainKycForm[${k}]`, v);
    });
    fd.append('mainKycForm[declaration]', kyc.declaration === 'true' ? 'true' : 'false');

    /* 3. Files — only when selected */
    if (files.copyOfId) fd.append('mainKycForm[copyOfId]', files.copyOfId);
    if (files.passportSizePhoto) fd.append('mainKycForm[passportSizePhoto]', files.passportSizePhoto);
    if (files.proofOfResidence) fd.append('mainKycForm[proofOfResidence]', files.proofOfResidence);
    if (files.referenceLetter) fd.append('mainKycForm[referenceLetter]', files.referenceLetter);

    /* 4. Unit Trust account request */
    if (isUnitTrust) {
      fd.append('unitTrustApplication[accountRequests][0][fundName]', unitTrust.fundName);
      fd.append('unitTrustApplication[accountRequests][0][beneficiary]', String(unitTrust.beneficiary));
      if (unitTrust.beneficiary) {
        fd.append('unitTrustApplication[accountRequests][0][beneficiaryName]', unitTrust.beneficiaryName);
        fd.append('unitTrustApplication[accountRequests][0][relationshipWithBeneficiary]', unitTrust.relationshipWithBeneficiary);
        fd.append('unitTrustApplication[accountRequests][0][beneficiaryDOB]', unitTrust.beneficiaryDOB);
      }
    }

    /* 5. Credit application */
    if (isCredit) {
      if (credit.loanType) fd.append('loanApplication[loanType]', credit.loanType);
      if (credit.loanAmount) fd.append('loanApplication[loanAmount]', credit.loanAmount);
    }

    try {
      /* Debug: log all FormData entries (remove after testing) */
      console.log('=== SUBMISSION DEBUG ===');
      for (const [key, val] of fd.entries()) {
        console.log(`  ${key}:`, val instanceof File ? `[File: ${val.name}]` : val);
      }

      /* Product-specific registration endpoints */
      const registerUrls = {
        'Unit Trust': '/api/onboarding/register/unit-trust/',
        'UnitTrust': '/api/onboarding/register/unit-trust/',
        'Credit Application': '/api/onboarding/register/credit-application/',
        'CreditApplication': '/api/onboarding/register/credit-application/',
        'Stock Broking': '/api/onboarding/register/stock-broking/',
        'StockBroking': '/api/onboarding/register/stock-broking/',
      };
      const url = registerUrls[product];
      if (!url) { setErrors({ _general: 'Unknown product selected.' }); setSubmitting(false); return; }
      const res = await fetch(url, { method: 'POST', body: fd });
      const data = await res.json();
      if (res.ok) {
        setSuccess(data);
      } else {
        console.log('=== BACKEND ERRORS ===', JSON.stringify(data, null, 2));
        setErrors(data);
        if (data.mainKycForm) setStep(2);
        else if (data.unitTrustApplication || data.loanApplication) setStep(3);
      }
    } catch (err) {
      setErrors({ _general: 'Network error. Please check your connection and try again.' });
    }
    setSubmitting(false);
  };

  /* Shorthand for InputField with common props */
  const IF = (props) => <PortalInputField {...props} fieldErr={fieldErr} />;
  const FF = (props) => <PortalFileField {...props} file={files[props.name]} onFileChange={fileUpdate} fieldErr={fieldErr} />;

  /* ── Loading / Error / Success states ── */
  if (lookupErr) {
    return (
      <div style={{ background: C.white, borderRadius: 16, padding: 32, textAlign: 'center', marginTop: 8 }}>
        <AlertTriangle size={28} style={{ color: C.red, marginBottom: 8 }} />
        <div style={{ fontSize: 14, color: C.gray600 }}>Unable to load registration data. Please try again later.</div>
      </div>
    );
  }
  if (!lookups) {
    return (
      <div style={{ background: C.white, borderRadius: 16, padding: 40, textAlign: 'center', marginTop: 8 }}>
        <div style={{ fontSize: 14, color: C.gray400 }}>Loading registration form…</div>
      </div>
    );
  }
  if (success) {
    return (
      <div style={{ background: C.white, borderRadius: 16, padding: 40, textAlign: 'center', marginTop: 8, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: `${C.green}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <CheckCircle size={32} style={{ color: C.green }} />
        </div>
        <h3 style={{ fontFamily: font.serif, fontSize: 22, fontWeight: 700, color: C.gray900, marginBottom: 8 }}>Application Submitted!</h3>
        <p style={{ fontSize: 14, color: C.gray500, marginBottom: 20, lineHeight: 1.6 }}>Your onboarding application has been received.</p>
        <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 8, padding: '16px 28px', borderRadius: 12, background: C.gray50, border: `1px solid ${C.gray100}`, marginBottom: 20, textAlign: 'left' }}>
          {[['Reference', success.reference], ['Status', success.status], ['Product', success.productName], ['Type', success.applicantTypeName]].map(([l, v]) => v && (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', gap: 24 }}>
              <span style={{ fontSize: 12, color: C.gray400, fontWeight: 600 }}>{l}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: l === 'Status' ? C.green : C.navy }}>{v}</span>
            </div>
          ))}
        </div>
        <div>
          <button onClick={() => { setSuccess(null); setStep(1); setProduct(''); setApplicantType(''); setKyc({}); setFiles({}); setUnitTrust({ fundName: '', beneficiary: false, beneficiaryName: '', relationshipWithBeneficiary: '', beneficiaryDOB: '' }); setCredit({ loanType: '', loanAmount: '' }); }} style={{
            padding: '12px 28px', background: C.navy, color: C.white, fontWeight: 700, fontSize: 14,
            borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: font.sans,
          }}>Submit Another Application</button>
        </div>
      </div>
    );
  }

  /* ═══ WIZARD ═══ */
  return (
    <div style={{ background: C.white, borderRadius: 16, padding: isMobile ? 20 : 32, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginTop: 8 }}>
      {/* Progress bar */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
        {Array.from({ length: totalSteps }, (_, i) => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i + 1 <= step ? C.red : C.gray200, transition: 'background 0.3s' }} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <h3 style={{ fontFamily: font.serif, fontSize: 17, fontWeight: 700, color: C.gray900, marginBottom: 2 }}>
            {step === 1 ? 'Choose Product' : step === 2 ? 'KYC Details' : step === 3 ? (isUnitTrust ? 'Fund Selection & Documents' : isCredit ? 'Loan Details & Documents' : 'Upload Documents') : 'Review & Submit'}
          </h3>
          <p style={{ fontSize: 12, color: C.gray400 }}>Step {step} of {totalSteps}</p>
        </div>
      </div>

      {errors._general && (
        <div style={{ padding: '10px 14px', borderRadius: 8, background: `${C.red}10`, border: `1px solid ${C.red}30`, marginBottom: 16 }}>
          <p style={{ fontSize: 12, color: C.red, fontWeight: 600 }}>{errors._general}</p>
        </div>
      )}

      {/* ─── STEP 1: Product & Applicant Type ─── */}
      {step === 1 && (
        <div>
          {IF({ label: 'Product', name: 'product', required: true, options: lookups.products, value: product, onChange: v => { setProduct(v); setKyc({}); setFiles({}); } })}
          {IF({ label: 'Applicant Type', name: 'applicantType', required: true, options: lookups.applicantTypes, value: applicantType, onChange: v => { setApplicantType(v); setKyc({}); } })}
          {product && applicantType && (
            <div style={{ padding: '12px 16px', borderRadius: 10, background: C.gray50, border: `1px solid ${C.gray100}`, marginTop: 12, marginBottom: 16 }}>
              <p style={{ fontSize: 12, color: C.gray600 }}>
                You are applying for <b style={{ color: C.navy }}>{product}</b> as {applicantType === 'Individual' ? 'an' : 'a'} <b style={{ color: C.navy }}>{applicantType}</b>.
                {isUnitTrust && ' You will select a fund and optionally add a beneficiary.'}
                {isCredit && ' You will also select a loan type.'}
                {isStockBroking && ' Only KYC information and documents are required.'}
              </p>
            </div>
          )}
          <button disabled={!product || !applicantType} onClick={() => setStep(2)} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            width: '100%', padding: '12px 0', background: (!product || !applicantType) ? C.gray300 : C.navy, color: C.white,
            fontWeight: 700, fontSize: 14, borderRadius: 8, border: 'none', cursor: (!product || !applicantType) ? 'not-allowed' : 'pointer',
            fontFamily: font.sans, marginTop: 8, transition: 'all 0.2s',
          }}>Next: KYC Details <ChevronRight size={14} /></button>
        </div>
      )}

      {/* ─── STEP 2: KYC Details ─── */}
      {step === 2 && (
        <div>
          {isIndividual && (
            <>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.navy, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Personal Details</div>
              <div style={S.grid2}>
                {IF({ label: 'First Name', name: 'firstName', required: true, value: kyc.firstName, onChange: v => kycUpdate('firstName', v) })}
                {IF({ label: 'Middle Name', name: 'middleName', value: kyc.middleName, onChange: v => kycUpdate('middleName', v) })}
              </div>
              {IF({ label: 'Last Name', name: 'lastName', required: true, value: kyc.lastName, onChange: v => kycUpdate('lastName', v) })}
              <div style={S.grid2}>
                {IF({ label: 'Date of Birth', name: 'DOB', type: 'date', required: true, value: kyc.DOB, onChange: v => kycUpdate('DOB', v) })}
                {IF({ label: 'Gender', name: 'gender', required: true, options: lookups.genders, value: kyc.gender, onChange: v => kycUpdate('gender', v) })}
              </div>
              {IF({ label: 'Nationality', name: 'nationality', required: true, options: lookups.nationalities, value: kyc.nationality, onChange: v => kycUpdate('nationality', v) })}

              <div style={{ fontSize: 12, fontWeight: 700, color: C.navy, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 16, marginBottom: 10 }}>Contact Details</div>
              <div style={S.grid2}>
                {IF({ label: 'Email Address', name: 'emailAddress', type: 'email', required: true, value: kyc.emailAddress, onChange: v => kycUpdate('emailAddress', v) })}
                {IF({ label: 'Phone Number', name: 'phoneNumber', required: true, placeholder: '+260 97...', value: kyc.phoneNumber, onChange: v => kycUpdate('phoneNumber', v) })}
              </div>
              {IF({ label: 'Physical Address', name: 'physicalAddress', required: true, value: kyc.physicalAddress, onChange: v => kycUpdate('physicalAddress', v) })}

              <div style={{ fontSize: 12, fontWeight: 700, color: C.navy, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 16, marginBottom: 10 }}>Identification</div>
              <div style={S.grid2}>
                {IF({ label: 'ID Type', name: 'IDType', required: true, options: ['NRC', 'Passport', "Driver's License"], value: kyc.IDType, onChange: v => kycUpdate('IDType', v) })}
                {IF({ label: 'ID Number', name: 'IDNumber', required: true, placeholder: 'e.g. 123456/10/1', value: kyc.IDNumber, onChange: v => kycUpdate('IDNumber', v) })}
              </div>

              <div style={{ fontSize: 12, fontWeight: 700, color: C.navy, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 16, marginBottom: 10 }}>Employment & Source of Funds</div>
              <div style={S.grid2}>
                {IF({ label: 'Employer', name: 'employer', value: kyc.employer, onChange: v => kycUpdate('employer', v) })}
                {IF({ label: 'Employee Number', name: 'employeeNumber', value: kyc.employeeNumber, onChange: v => kycUpdate('employeeNumber', v) })}
              </div>
              {IF({ label: 'Source of Income', name: 'sourceOfIncome', required: true, placeholder: 'e.g. Salary, Business', value: kyc.sourceOfIncome, onChange: v => kycUpdate('sourceOfIncome', v) })}

              <div style={{ fontSize: 12, fontWeight: 700, color: C.navy, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 16, marginBottom: 10 }}>Banking Details</div>
              <div style={S.grid2}>
                {IF({ label: 'Bank Name', name: 'bankName', required: true, value: kyc.bankName, onChange: v => kycUpdate('bankName', v) })}
                {IF({ label: 'Branch Name', name: 'bankBranchName', value: kyc.bankBranchName, onChange: v => kycUpdate('bankBranchName', v) })}
              </div>
              <div style={S.grid2}>
                {IF({ label: 'Account Number', name: 'bankAccountNumber', required: true, value: kyc.bankAccountNumber, onChange: v => kycUpdate('bankAccountNumber', v) })}
                {IF({ label: 'Account Name', name: 'bankAccountName', required: true, value: kyc.bankAccountName, onChange: v => kycUpdate('bankAccountName', v) })}
              </div>

              <div style={{ fontSize: 12, fontWeight: 700, color: C.navy, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 16, marginBottom: 10 }}>Sales & Next of Kin</div>
              {IF({ label: 'Sales Person', name: 'salesPerson', options: lookups.salesPeople, value: kyc.salesPerson, onChange: v => kycUpdate('salesPerson', v) })}
              <div style={S.grid2}>
                {IF({ label: 'Next of Kin', name: 'nextOfKin', required: true, value: kyc.nextOfKin, onChange: v => kycUpdate('nextOfKin', v) })}
                {IF({ label: 'Next of Kin Phone', name: 'nextOfKinPhone', required: true, value: kyc.nextOfKinPhone, onChange: v => kycUpdate('nextOfKinPhone', v) })}
              </div>
              {IF({ label: 'Relationship', name: 'relationshipWithNextOfKin', required: true, placeholder: 'e.g. Spouse, Sibling', value: kyc.relationshipWithNextOfKin, onChange: v => kycUpdate('relationshipWithNextOfKin', v) })}
            </>
          )}
          {isCompany && (
            <>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.navy, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Company Details</div>
              {IF({ label: 'Company Name', name: 'companyName', required: true, value: kyc.companyName, onChange: v => kycUpdate('companyName', v) })}
              {IF({ label: 'Company ID / Registration Number', name: 'companyIDNumber', required: true, value: kyc.companyIDNumber, onChange: v => kycUpdate('companyIDNumber', v) })}
              <div style={S.grid2}>
                {IF({ label: 'Contact Person', name: 'contactPerson', required: true, value: kyc.contactPerson, onChange: v => kycUpdate('contactPerson', v) })}
                {IF({ label: 'Contact Person Phone', name: 'contactPersonPhone', required: true, value: kyc.contactPersonPhone, onChange: v => kycUpdate('contactPersonPhone', v) })}
              </div>
              {IF({ label: 'Contact Person Email', name: 'contactPersonEmail', type: 'email', value: kyc.contactPersonEmail, onChange: v => kycUpdate('contactPersonEmail', v) })}

              <div style={{ fontSize: 12, fontWeight: 700, color: C.navy, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 16, marginBottom: 10 }}>Contact & Identification</div>
              <div style={S.grid2}>
                {IF({ label: 'Company Email', name: 'emailAddress', type: 'email', required: true, value: kyc.emailAddress, onChange: v => kycUpdate('emailAddress', v) })}
                {IF({ label: 'Company Phone', name: 'phoneNumber', required: true, value: kyc.phoneNumber, onChange: v => kycUpdate('phoneNumber', v) })}
              </div>
              <div style={S.grid2}>
                {IF({ label: 'Nationality', name: 'nationality', required: true, options: lookups.nationalities, value: kyc.nationality, onChange: v => kycUpdate('nationality', v) })}
                {IF({ label: 'ID Type', name: 'IDType', required: true, options: ['Certificate of Incorporation', 'Business Registration'], value: kyc.IDType, onChange: v => kycUpdate('IDType', v) })}
              </div>
              {IF({ label: 'Physical Address', name: 'physicalAddress', required: true, value: kyc.physicalAddress, onChange: v => kycUpdate('physicalAddress', v) })}

              <div style={{ fontSize: 12, fontWeight: 700, color: C.navy, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 16, marginBottom: 10 }}>Banking Details</div>
              {IF({ label: 'Sales Person', name: 'salesPerson', options: lookups.salesPeople, value: kyc.salesPerson, onChange: v => kycUpdate('salesPerson', v) })}
              <div style={S.grid2}>
                {IF({ label: 'Bank Name', name: 'bankName', required: true, value: kyc.bankName, onChange: v => kycUpdate('bankName', v) })}
                {IF({ label: 'Branch Name', name: 'bankBranchName', value: kyc.bankBranchName, onChange: v => kycUpdate('bankBranchName', v) })}
              </div>
              <div style={S.grid2}>
                {IF({ label: 'Account Number', name: 'bankAccountNumber', required: true, value: kyc.bankAccountNumber, onChange: v => kycUpdate('bankAccountNumber', v) })}
                {IF({ label: 'Account Name', name: 'bankAccountName', required: true, value: kyc.bankAccountName, onChange: v => kycUpdate('bankAccountName', v) })}
              </div>
            </>
          )}
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button onClick={() => setStep(1)} style={{ flex: 1, padding: '12px 0', borderRadius: 8, border: `1.5px solid ${C.gray200}`, background: 'transparent', color: C.gray600, fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: font.sans }}>Back</button>
            <button onClick={() => setStep(3)} style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '12px 0', background: C.navy, color: C.white, fontWeight: 700, fontSize: 14, borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: font.sans }}>Next <ChevronRight size={14} /></button>
          </div>
        </div>
      )}

      {/* ─── STEP 3: Unit Trust + Documents ─── */}
      {step === 3 && (
        <div>
          {isUnitTrust && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.navy, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Fund Selection</div>
              {IF({ label: 'Fund Name', name: 'fundName', required: true, options: lookups.funds, value: unitTrust.fundName, onChange: v => setUnitTrust(p => ({ ...p, fundName: v })) })}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <label style={{ fontSize: 13, color: C.gray700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input type="checkbox" checked={unitTrust.beneficiary} onChange={e => setUnitTrust(p => ({ ...p, beneficiary: e.target.checked, beneficiaryName: e.target.checked ? p.beneficiaryName : '', relationshipWithBeneficiary: e.target.checked ? p.relationshipWithBeneficiary : '', beneficiaryDOB: e.target.checked ? p.beneficiaryDOB : '' }))} style={{ accentColor: C.red }} />
                  Add a beneficiary to this account
                </label>
              </div>
              {unitTrust.beneficiary && (
                <div style={{ padding: '14px 16px', borderRadius: 10, background: C.gray50, border: `1px solid ${C.gray100}`, marginBottom: 12 }}>
                  {IF({ label: 'Beneficiary Name', name: 'beneficiaryName', required: true, value: unitTrust.beneficiaryName, onChange: v => setUnitTrust(p => ({ ...p, beneficiaryName: v })) })}
                  <div style={S.grid2}>
                    {IF({ label: 'Relationship', name: 'relationshipWithBeneficiary', required: true, value: unitTrust.relationshipWithBeneficiary, onChange: v => setUnitTrust(p => ({ ...p, relationshipWithBeneficiary: v })), placeholder: 'e.g. Child, Spouse' })}
                    {IF({ label: 'Beneficiary DOB', name: 'beneficiaryDOB', type: 'date', required: true, value: unitTrust.beneficiaryDOB, onChange: v => setUnitTrust(p => ({ ...p, beneficiaryDOB: v })) })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Credit application fields */}
          {isCredit && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.navy, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Loan Details</div>
              <div style={S.grid2}>
                {IF({ label: 'Loan Type', name: 'loanType', required: true, options: lookups.loanTypes, value: credit.loanType, onChange: v => setCredit(p => ({ ...p, loanType: v })) })}
                {IF({ label: 'Loan Amount (ZMW)', name: 'loanAmount', type: 'number', required: true, placeholder: 'e.g. 50000', value: credit.loanAmount, onChange: v => setCredit(p => ({ ...p, loanAmount: v })) })}
              </div>
            </div>
          )}

          <div style={{ fontSize: 12, fontWeight: 700, color: C.navy, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Upload Documents</div>
          {FF({ label: isCompany ? 'Copy of NRC (Contact Person)' : 'Copy of ID (NRC / Passport)', name: 'copyOfId', required: true })}
          {isIndividual && FF({ label: 'Passport Size Photo', name: 'passportSizePhoto', required: true })}
          {isIndividual && (
            <div style={{ padding: '10px 14px', borderRadius: 8, background: `${C.navy}08`, border: `1px solid ${C.navy}15`, marginBottom: 12 }}>
              <p style={{ fontSize: 11, color: C.gray600, lineHeight: 1.5 }}>
                <b>Note:</b> Please upload at least one of the following — a <b>Reference Letter</b> or <b>Proof of Residence</b> (e.g. utility bill). If you provide one, the other is not required.
              </p>
            </div>
          )}
          {isIndividual && (
            <div style={S.grid2}>
              {FF({ label: 'Reference Letter', name: 'referenceLetter', hint: 'optional if POR provided' })}
              {FF({ label: 'Proof of Residence', name: 'proofOfResidence', hint: 'optional if RL provided' })}
            </div>
          )}
          {isCompany && (
            <>
              {FF({ label: 'Certificate of Registration', name: 'referenceLetter', required: true })}
              {FF({ label: 'Proof of Residence', name: 'proofOfResidence' })}
            </>
          )}

          <div style={{ fontSize: 12, fontWeight: 700, color: C.navy, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 16, marginBottom: 8 }}>Declaration</div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
            <input type="checkbox" checked={kyc.declaration === 'true'} onChange={e => kycUpdate('declaration', e.target.checked ? 'true' : '')} style={{ marginTop: 3, accentColor: C.red }} />
            <label style={{ fontSize: 12, color: C.gray600, lineHeight: 1.5, cursor: 'pointer' }} onClick={() => kycUpdate('declaration', kyc.declaration === 'true' ? '' : 'true')}>
              I declare that all information provided is true and accurate to the best of my knowledge. I understand that providing false information may result in my application being rejected.
            </label>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button onClick={() => setStep(2)} style={{ flex: 1, padding: '12px 0', borderRadius: 8, border: `1.5px solid ${C.gray200}`, background: 'transparent', color: C.gray600, fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: font.sans }}>Back</button>
            <button onClick={() => setStep(4)} style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '12px 0', background: C.navy, color: C.white, fontWeight: 700, fontSize: 14, borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: font.sans }}>Review Application <ChevronRight size={14} /></button>
          </div>
        </div>
      )}

      {/* ─── STEP 4: Review & Submit ─── */}
      {step === 4 && (
        <div>
          <div style={{ fontSize: 12, color: C.gray500, marginBottom: 16, lineHeight: 1.5 }}>Please review your application details before submitting.</div>
          {[
            { title: 'Application', rows: [['Product', product], ['Applicant Type', applicantType]] },
            { title: isIndividual ? 'Personal Details' : 'Company Details', rows: isIndividual
              ? [['Name', [kyc.firstName, kyc.middleName, kyc.lastName].filter(Boolean).join(' ')], ['Email', kyc.emailAddress], ['Phone', kyc.phoneNumber], ['DOB', kyc.DOB], ['Gender', kyc.gender], ['Nationality', kyc.nationality], ['ID', `${kyc.IDType || ''} — ${kyc.IDNumber || ''}`], ['Address', kyc.physicalAddress]]
              : [['Company', kyc.companyName], ['Reg. No.', kyc.companyIDNumber], ['Contact', kyc.contactPerson], ['Email', kyc.emailAddress], ['Phone', kyc.phoneNumber], ['Address', kyc.physicalAddress]]
            },
            { title: 'Banking', rows: [['Bank', kyc.bankName], ['Account', `${kyc.bankAccountName || ''} — ${kyc.bankAccountNumber || ''}`]] },
            ...(isUnitTrust ? [{ title: 'Unit Trust', rows: [['Fund', unitTrust.fundName], ['Beneficiary', unitTrust.beneficiary ? `${unitTrust.beneficiaryName} (${unitTrust.relationshipWithBeneficiary})` : 'None']] }] : []),
            ...(isCredit ? [{ title: 'Credit Application', rows: [['Loan Type', credit.loanType], ['Loan Amount', credit.loanAmount ? `K ${Number(credit.loanAmount).toLocaleString()}` : '—']] }] : []),
            { title: 'Documents', rows: [
              [isCompany ? 'NRC (Contact Person)' : 'Copy of ID', files.copyOfId ? files.copyOfId.name : '—'],
              ...(isIndividual ? [['Passport Photo', files.passportSizePhoto ? files.passportSizePhoto.name : '—']] : []),
              [isCompany ? 'Certificate of Registration' : 'Reference Letter', files.referenceLetter ? files.referenceLetter.name : '—'],
              ['Proof of Residence', files.proofOfResidence ? files.proofOfResidence.name : '—'],
            ]},
          ].map(section => (
            <div key={section.title} style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.navy, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>{section.title}</div>
              <div style={{ padding: '10px 14px', borderRadius: 10, background: C.gray50, border: `1px solid ${C.gray100}` }}>
                {section.rows.filter(([, v]) => v).map(([label, value]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: `1px solid ${C.gray100}` }}>
                    <span style={{ fontSize: 12, color: C.gray400, fontWeight: 500 }}>{label}</span>
                    <span style={{ fontSize: 12, color: C.gray800, fontWeight: 600, textAlign: 'right', maxWidth: '60%', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <button onClick={() => setStep(3)} style={{ flex: 1, padding: '12px 0', borderRadius: 8, border: `1.5px solid ${C.gray200}`, background: 'transparent', color: C.gray600, fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: font.sans }}>Back</button>
            <button disabled={submitting} onClick={handleSubmit} style={{
              flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '13px 0', background: submitting ? C.gray400 : C.red, color: C.white,
              fontWeight: 700, fontSize: 14, borderRadius: 8, border: 'none',
              cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: font.sans, transition: 'all 0.2s',
            }}>
              {submitting ? 'Submitting…' : 'Submit Application'} {!submitting && <ArrowRight size={14} />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


/* ═══════════════════════════════════════════ */
/*  TOOLS PAGE (Calculator standalone)        */
/* ═══════════════════════════════════════════ */
function ToolsPage({ onNavigate }) {
  const isMobile = useIsMobile();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 64px)' }}>
      <MarketTicker />
      <div style={{
        background: HEADER_GRADIENT,
        padding: isMobile ? '24px 20px' : '32px 60px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.03) 60px, rgba(255,255,255,0.03) 61px)`,
          pointerEvents: 'none'
        }} />
        <h1 style={{ fontFamily: font.serif, fontSize: 30, fontWeight: 700, color: C.white, position: 'relative' }}>ROI Calculator</h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginTop: 6, position: 'relative' }}>Project your investment growth across our 7 Unit Trust funds</p>
      </div>
      <div style={{ flex: 1, padding: isMobile ? '20px 16px' : '32px 60px', background: C.offWhite }}>
        <ReturnCalculator onNavigate={onNavigate} />
      </div>
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

function ServicesPage({ onNavigate, serviceId }) {
  const [detailId, setDetailId] = useState(null);
  const detail = servicesList.find(s => s.id === detailId);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (serviceId) {
      setTimeout(() => {
        const el = document.getElementById(`svc-${serviceId}`);
        if (el) {
          /* Find the scrollable parent (scrollRef div) instead of using scrollIntoView
             which can scroll the entire viewport on mobile and hide the nav bar */
          const scrollParent = el.closest('[data-scroll-container]') || el.closest('div[style*="overflow"]');
          if (scrollParent) {
            const elRect = el.getBoundingClientRect();
            const parentRect = scrollParent.getBoundingClientRect();
            scrollParent.scrollTo({ top: scrollParent.scrollTop + elRect.top - parentRect.top - 10, behavior: 'smooth' });
          } else {
            el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }
      }, 300);
    }
  }, [serviceId]);

  /* ── Service Detail View ── */
  if (detail) {
    const Icon = detail.icon;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 64px)' }}>
        <MarketTicker />
        <div style={{ background: HEADER_GRADIENT, padding: '32px 60px' }}>
          <button onClick={() => setDetailId(null)} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 6,
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
            color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: font.sans, marginBottom: 16,
          }}>
            <ChevronLeft size={14} /> Back to Services
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: `${detail.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon size={28} style={{ color: '#fff' }} />
            </div>
            <div>
              <h1 style={{ fontFamily: font.serif, fontSize: 28, fontWeight: 700, color: C.white }}>{detail.label}</h1>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>{detail.tagline}</p>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, padding: isMobile ? '20px 16px' : '40px 60px', background: C.offWhite }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.6fr 1fr', gap: 32 }}>
            <div>
              <img src={detail.image} alt={detail.label} style={{ width: '100%', height: 280, objectFit: 'cover', borderRadius: 16, marginBottom: 28 }} />
              <h2 style={{ fontFamily: font.serif, fontSize: 22, fontWeight: 700, color: C.gray900, marginBottom: 16 }}>About This Service</h2>
              <p style={{ fontSize: 15, color: C.gray600, lineHeight: 1.8, marginBottom: 24 }}>{detail.desc}</p>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: C.gray900, marginBottom: 14 }}>Key Features</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 32 }}>
                {detail.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <CheckCircle size={14} style={{ color: detail.color, marginTop: 3, flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: C.gray600, lineHeight: 1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => onNavigate('contact')} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px',
                background: detail.color, color: C.white, fontWeight: 700, fontSize: 14,
                borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: font.sans,
              }}>Enquire Now <ArrowRight size={14} /></button>
            </div>
            <div>
              <div style={{ padding: 24, borderRadius: 16, background: C.white, border: `1px solid ${C.gray100}`, marginBottom: 20 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: C.gray900, marginBottom: 16 }}>How It Works</h3>
                {[
                  { step: 1, text: 'Contact our team for a personalised consultation' },
                  { step: 2, text: 'Receive a tailored proposal and strategy' },
                  { step: 3, text: 'Complete onboarding documentation' },
                  { step: 4, text: 'Begin your investment journey with expert support' },
                ].map(({ step, text }) => (
                  <div key={step} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: `${detail.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: font.serif, fontWeight: 700, fontSize: 14, color: detail.color, flexShrink: 0 }}>{step}</div>
                    <p style={{ fontSize: 13, color: C.gray600, lineHeight: 1.6, marginTop: 6 }}>{text}</p>
                  </div>
                ))}
              </div>
              <div style={{ padding: 24, borderRadius: 16, background: `linear-gradient(135deg, ${C.navy}, ${C.navyDark})`, color: C.white }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Need Help Choosing?</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: 16 }}>Our advisors can help you find the right service for your goals.</p>
                <button onClick={() => onNavigate('contact')} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px',
                  background: C.red, color: C.white, fontWeight: 700, fontSize: 13,
                  borderRadius: 6, border: 'none', cursor: 'pointer', fontFamily: font.sans,
                }}>Talk to an Advisor <ArrowRight size={14} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 64px)' }}>
      <MarketTicker />
      {/* Header */}
      <div style={{
        background: HEADER_GRADIENT,
        padding: isMobile ? '24px 20px' : '40px 60px', position: 'relative', overflow: 'hidden',
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
      <div style={{ flex: 1, padding: isMobile ? '20px 16px' : '40px 60px', background: C.offWhite }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {servicesList.map(({ id, icon: Icon, label, tagline, desc, features, color, image }, i) => (
            <div key={id} id={`svc-${id}`} style={{
              display: 'grid', gridTemplateColumns: isMobile ? '1fr' : (i % 2 === 0 ? '1fr 1.6fr' : '1.6fr 1fr'),
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
                <button onClick={() => setDetailId(id)} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px',
                  background: color, color: C.white, fontWeight: 700, fontSize: 13,
                  borderRadius: 6, border: 'none', cursor: 'pointer', fontFamily: font.sans,
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >Read More <ArrowRight size={14} /></button>
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
    </div>
  );
}

/* ═══════════════════════════════════════════ */
/*  CAREERS PAGE                               */
/* ═══════════════════════════════════════════ */
const jobListings = [
  { title: 'Investment Analyst', dept: 'Investments', location: 'Lusaka', type: 'Full-time', desc: 'Join our investment team to research and analyse market opportunities across equity, fixed income, and alternative asset classes. CFA or ACCA qualification preferred.' },
  { title: 'Client Relationship Manager', dept: 'Client Services', location: 'Lusaka', type: 'Full-time', desc: 'Build and maintain strong client relationships, manage portfolios, and provide personalised investment guidance to our growing client base.' },
  { title: 'Branch Manager', dept: 'Operations', location: 'Kitwe', type: 'Full-time', desc: 'Lead our Copperbelt branch operations, drive business development, and ensure excellent service delivery across all product lines.' },
  { title: 'IT Systems Administrator', dept: 'Technology', location: 'Lusaka', type: 'Full-time', desc: 'Manage and maintain our technology infrastructure including Longhorn Trust platform, data analytics tools, and cybersecurity systems.' },
];

function CareersPage({ onNavigate }) {
  const [selectedJob, setSelectedJob] = useState(null);
  const isMobile = useIsMobile();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 64px)' }}>
      <MarketTicker />
      <div style={{ background: HEADER_GRADIENT, padding: isMobile ? '24px 20px' : '40px 60px' }}>
        <h1 style={{ fontFamily: font.serif, fontSize: isMobile ? 22 : 30, fontWeight: 700, color: C.white }}>Careers at Longhorn</h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>Join our team and help build Zambia's financial future</p>
      </div>

      <div style={{ flex: 1, padding: isMobile ? '20px 16px' : '32px 60px', background: C.offWhite }}>
        {/* Intro */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: 32, marginBottom: 36 }}>
          <div>
            <div style={{ width: 40, height: 3, background: C.red, borderRadius: 2, marginBottom: 16 }} />
            <h2 style={{ fontFamily: font.serif, fontSize: 24, fontWeight: 700, color: C.gray900, marginBottom: 12 }}>Why Work With Us?</h2>
            <p style={{ fontSize: 15, color: C.gray600, lineHeight: 1.8, marginBottom: 16 }}>At Longhorn Associates, we believe in investing in our people as much as we invest for our clients. We offer a collaborative, growth-oriented environment where your expertise makes a real impact on Zambia's financial landscape.</p>
            {['Competitive compensation & benefits', 'Professional development & CFA support', 'Collaborative, innovative culture', 'Direct impact on Zambia\'s financial growth'].map(f => (
              <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                <CheckCircle size={14} style={{ color: C.green }} />
                <span style={{ fontSize: 14, color: C.gray600, fontWeight: 500 }}>{f}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[{ val: '50+', sub: 'Team Members' }, { val: '4', sub: 'Office Locations' }, { val: '15+', sub: 'Years Growing' }, { val: '100%', sub: 'Zambian Owned' }].map(({ val, sub }) => (
              <div key={sub} style={{ padding: 20, borderRadius: 14, background: C.white, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'center' }}>
                <div style={{ fontFamily: font.serif, fontSize: 24, fontWeight: 800, color: C.navy }}>{val}</div>
                <div style={{ fontSize: 12, color: C.gray400, marginTop: 4, fontWeight: 600 }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Job Listings */}
        <h2 style={{ fontFamily: font.serif, fontSize: 22, fontWeight: 700, color: C.gray900, marginBottom: 20 }}>Open Positions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {jobListings.map((job, i) => (
            <div key={i} onClick={() => setSelectedJob(selectedJob === i ? null : i)} style={{
              background: C.white, borderRadius: 12, border: `1px solid ${selectedJob === i ? C.red : C.gray100}`,
              overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${C.red}12`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Briefcase size={20} style={{ color: C.red }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: C.gray900 }}>{job.title}</div>
                    <div style={{ fontSize: 12, color: C.gray500, marginTop: 2 }}>{job.dept} · {job.location} · {job.type}</div>
                  </div>
                </div>
                <ChevronDown size={18} style={{ color: C.gray400, transform: selectedJob === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </div>
              {selectedJob === i && (
                <div style={{ padding: '0 24px 20px', borderTop: `1px solid ${C.gray100}`, marginTop: -4, paddingTop: 16 }}>
                  <p style={{ fontSize: 14, color: C.gray600, lineHeight: 1.7, marginBottom: 16 }}>{job.desc}</p>
                  <button onClick={(e) => { e.stopPropagation(); onNavigate('contact'); }} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px',
                    background: C.red, color: C.white, fontWeight: 700, fontSize: 13,
                    borderRadius: 6, border: 'none', cursor: 'pointer', fontFamily: font.sans,
                  }}>Apply Now <ArrowRight size={14} /></button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* General application CTA */}
        <div style={{
          marginTop: 32, padding: '36px 40px', borderRadius: 16, textAlign: 'center',
          background: `linear-gradient(135deg, ${C.navy}, ${C.navyDark})`,
        }}>
          <h3 style={{ fontFamily: font.serif, fontSize: 22, fontWeight: 700, color: C.white, marginBottom: 10 }}>Don't See Your Role?</h3>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, marginBottom: 20 }}>Send us your CV and we'll keep you in mind for future opportunities.</p>
          <button onClick={() => onNavigate('contact')} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px',
            background: C.red, color: C.white, fontWeight: 700, fontSize: 14,
            borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: font.sans,
          }}>Send Your CV <ArrowRight size={14} /></button>
        </div>
      </div>
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
  const [aboutTab, setAboutTab] = useState('about');
  const [serviceId, setServiceId] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const scrollRef = useRef(null);
  const isMobile = useIsMobile();

  const navigate = useCallback((p, fId, tab) => {
    if (p === 'fund') {
      setPage('fund');
      setFundId(fId || 'fixed-income');
    } else if (p === 'about') {
      setPage('about');
      setAboutTab(tab || 'about');
    } else if (p === 'products' && fId) {
      setPage('products');
      setServiceId(fId);
    } else {
      setPage(p);
      if (p === 'products') setServiceId(null);
    }
    setDropdown(null);
    setMobileMenu(false);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, []);

  const navItems = [
    { label: 'About', hasDropdown: true, items: [
      { label: 'About Us', action: () => navigate('about', null, 'about') },
      { label: 'Governance', action: () => navigate('about', null, 'governance') },
      { label: 'Our Team', action: () => navigate('about', null, 'team') },
      { label: 'Core Values', action: () => navigate('about', null, 'values') },
    ]},
    { label: 'Products', hasDropdown: true, items: [
      { label: 'Pension Fund Management', action: () => navigate('products', 'pension') },
      { label: 'Unit Trust Fund Management', action: () => navigate('products', 'unit-trust') },
      { label: 'Credit', action: () => navigate('products', 'credit') },
      { label: 'Securities & Stock Broking', action: () => navigate('products', 'securities') },
      { label: 'Consultancy & Advisory', action: () => navigate('products', 'advisory') },
      { label: 'Risk Management', action: () => navigate('products', 'risk') },
    ]},
    { label: 'Insights', action: () => navigate('insights') },
    { label: 'ROI Calculator', action: () => navigate('tools') },
    { label: 'Careers', action: () => navigate('careers') },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden', fontFamily: font.sans, background: C.white, WebkitFontSmoothing: 'antialiased' }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } input[type="range"] { height: 4px; } input[type="range"]::-webkit-slider-thumb { width: 16px; height: 16px; }
        @media (max-width: 768px) {
          .resp-grid-2 { grid-template-columns: 1fr !important; }
          .resp-grid-3 { grid-template-columns: 1fr !important; }
          .resp-grid-4 { grid-template-columns: 1fr 1fr !important; }
          .resp-grid-6 { grid-template-columns: repeat(3, 1fr) !important; }
          .resp-flex-col { flex-direction: column !important; }
          .resp-hide { display: none !important; }
        }
      `}</style>

      {/* ── TOP NAV ── */}
      <nav style={{
        height: 64, minHeight: 64, background: C.white, borderBottom: `1px solid ${C.gray100}`,
        display: 'flex', alignItems: 'center', padding: isMobile ? '0 16px' : '0 40px', zIndex: 200, position: 'relative',
      }}>
        {/* Logo */}
        <div onClick={() => navigate('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/logo.jpeg" alt="Longhorn Associates" style={{ height: isMobile ? 42 : 54, width: 'auto', objectFit: 'contain' }}
            onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
          <div style={{ display: 'none', alignItems: 'center', gap: 3 }}>
            <span style={{ fontFamily: font.serif, fontSize: isMobile ? 18 : 22, fontWeight: 800, color: C.red }}>Longhorn</span>
            <span style={{ fontFamily: font.sans, fontSize: isMobile ? 11 : 14, fontWeight: 600, color: C.navy, marginTop: 2 }}>Associates</span>
          </div>
        </div>

        {/* Desktop nav links */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginLeft: 'auto' }}>
            {navItems.map(item => (
              <div key={item.label} style={{ position: 'relative' }}
                onMouseEnter={() => item.hasDropdown && setDropdown(item.label)}
                onMouseLeave={() => setDropdown(null)}
              >
                <button onClick={item.action} style={{
                  display: 'flex', alignItems: 'center', gap: 4, padding: '8px 16px',
                  fontSize: 14, fontWeight: 500, color: C.gray600, background: 'none',
                  border: 'none', cursor: 'pointer', fontFamily: font.sans, transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = C.navy}
                  onMouseLeave={e => e.currentTarget.style.color = C.gray600}
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown size={14} />}
                </button>
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
                        border: 'none', cursor: 'pointer', fontFamily: font.sans, transition: 'all 0.15s',
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
            >Signup / Login <ArrowUpRight size={12} /></button>
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button onClick={() => setMobileMenu(!mobileMenu)} style={{
            marginLeft: 'auto', width: 40, height: 40, borderRadius: 8, border: 'none',
            background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: C.gray700,
          }}>
            {mobileMenu ? <X size={22} /> : <Menu size={22} />}
          </button>
        )}
      </nav>

      {/* Mobile menu overlay */}
      {isMobile && mobileMenu && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0, bottom: 0,
          background: C.white, zIndex: 199, overflowY: 'auto',
          animation: 'mobileSlideDown 0.25s ease both',
        }}>
          <style>{`@keyframes mobileSlideDown { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }`}</style>
          <div style={{ padding: '16px 20px' }}>
            {navItems.map(item => (
              <div key={item.label} style={{ borderBottom: `1px solid ${C.gray100}` }}>
                <button onClick={() => { if (item.action) { item.action(); } else { setDropdown(dropdown === item.label ? null : item.label); } }} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
                  padding: '14px 0', fontSize: 15, fontWeight: 600, color: C.gray800,
                  background: 'none', border: 'none', cursor: 'pointer', fontFamily: font.sans,
                }}>
                  {item.label}
                  {item.hasDropdown && <ChevronDown size={16} style={{ transform: dropdown === item.label ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />}
                </button>
                {item.hasDropdown && dropdown === item.label && (
                  <div style={{ paddingBottom: 8 }}>
                    {item.items.map(sub => (
                      <button key={sub.label} onClick={sub.action} style={{
                        display: 'block', width: '100%', textAlign: 'left', padding: '10px 16px',
                        fontSize: 14, fontWeight: 500, color: C.gray600, background: 'transparent',
                        border: 'none', cursor: 'pointer', fontFamily: font.sans,
                      }}>{sub.label}</button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button onClick={() => navigate('portal')} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              width: '100%', padding: '14px 0', background: C.red, color: C.white,
              fontWeight: 700, fontSize: 14, borderRadius: 8, border: 'none', cursor: 'pointer',
              fontFamily: font.sans, marginTop: 16,
            }}>Signup / Login <ArrowUpRight size={14} /></button>
          </div>
        </div>
      )}

      {/* ── PAGE CONTENT ── */}
      <div ref={scrollRef} data-scroll-container="true" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {page === 'home' && <HomePage onNavigate={navigate} />}
        {page === 'fund' && <FundDetailPage fundId={fundId} onNavigate={navigate} />}
        {page === 'products' && <ServicesPage onNavigate={navigate} serviceId={serviceId} />}
        {page === 'insights' && <InsightsPage onNavigate={navigate} />}
        {page === 'about' && <AboutPage initialTab={aboutTab} />}
        {page === 'contact' && <ContactPage />}
        {page === 'tools' && <ToolsPage onNavigate={navigate} />}
        {page === 'portal' && <PortalPage />}
        {page === 'careers' && <CareersPage onNavigate={navigate} />}
      </div>
    </div>
  );
}