import React, { useState, useMemo } from 'react';
import { ArrowRight, CheckCircle, TrendingUp, Shield, Building, PieChart, GraduationCap, Heart, Award, Calculator, FileText, Download } from 'lucide-react';

export const allFunds = [
  { name:'Listed Equities Fund', type:'Equity Fund', desc:'Invests in equities listed on the Lusaka Securities Exchange (LuSE).', fee:'3.5%', risk:'High', ret:'12.4%', size:'K180M', vol:'8.2%', color:'#7B1FA2', icon:TrendingUp },
  { name:'Fixed Income Fund', type:'Bond Fund', desc:'Government securities and listed securities of reputable institutions.', fee:'3.5%', risk:'Low\u2013Med', ret:'8.2%', size:'K250M', vol:'3.5%', color:'#1565C0', icon:Shield },
  { name:'Listed Property Fund', type:'Property', desc:'In-Country & Global property exposure. Exit requires a buyer for your units.', fee:'3.5%', risk:'Med\u2013High', ret:'9.8%', size:'K120M', vol:'5.1%', color:'#2E7D32', icon:Building },
  { name:'Multi Assets Class Fund', type:'Balanced Fund', desc:'Balanced hybrid: equities, bonds, and money market instruments.', fee:'3.5%', risk:'Medium', ret:'10.1%', size:'K200M', vol:'4.8%', color:'#D32F2F', icon:PieChart },
  { name:'Education Fund', type:'Specialty', desc:"Plan for education needs \u2014 yours and your family\'s.", fee:'3.5%', risk:'Medium', ret:'9.5%', size:'K95M', vol:'4.2%', color:'#E65100', icon:GraduationCap },
  { name:'White Coat Fund', type:'Specialty', desc:"Designed for medical personnel\'s financial stability.", fee:'2.5%', risk:'Medium', ret:'8.8%', size:'K45M', vol:'3.9%', color:'#00838F', icon:Heart },
  { name:'Gratuity Fund', type:'Specialty', desc:'Competitive returns via diversified securities portfolio.', fee:'3.5%', risk:'Medium', ret:'9.2%', size:'K78M', vol:'4.0%', color:'#AD1457', icon:Award },
];

function PerformanceChart({ height=200, color='#D32F2F' }) {
  const points = useMemo(() => { const pts=[]; let v=30; for(let i=0;i<=100;i+=2){v+=(Math.random()-0.42)*4;v=Math.max(10,Math.min(95,v));pts.push({x:i,y:v});} return pts; }, []);
  const path = points.map((p,i)=>(i===0?'M':'L')+p.x*5+','+(height-(p.y/100)*(height-30))).join(' ');
  const fill = path+' L500,'+height+' L0,'+height+' Z';
  return (<svg viewBox={'0 0 500 '+height} style={{ width:'100%', height }}><defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.15"/><stop offset="100%" stopColor={color} stopOpacity="0"/></linearGradient></defs>{[0.25,0.5,0.75].map(r=>(<line key={r} x1="0" y1={height*r} x2="500" y2={height*r} stroke="rgba(0,0,0,0.05)" strokeDasharray="4 4"/>))}<path d={fill} fill="url(#cg)"/><path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>);
}

export default function FundsSlide({ onNavigate }) {
  const [sel,setSel]=useState(0);
  const [tab,setTab]=useState(0);
  const fund=allFunds[sel];
  const Icon=fund.icon;
  const tabs=['Overview','Performance','Project Returns','Documents','How to Invest'];
  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', background:'#fff' }}>
      <div style={{ background:'linear-gradient(135deg,#0B1D3A 0%,#132B52 100%)', padding:'18px 48px', display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:16 }}>
          <div style={{ width:42, height:42, borderRadius:10, background:fund.color+'30', border:'1px solid '+fund.color+'60', display:'flex', alignItems:'center', justifyContent:'center' }}><Icon size={20} style={{ color:'#fff' }}/></div>
          <div><h2 style={{ fontFamily:'var(--font-serif)', fontSize:24, fontWeight:700, color:'#fff', margin:0 }}>{fund.name}</h2><span style={{ fontSize:12, color:'rgba(255,255,255,0.5)', fontWeight:600 }}>{fund.type} \u00b7 {fund.risk} Risk</span></div>
        </div>
        <div style={{ display:'flex', gap:6 }}>{allFunds.map((f,i)=>(<button key={f.name} onClick={()=>{setSel(i);setTab(0);}} style={{ width:8, height:8, borderRadius:'50%', background:sel===i?'#D32F2F':'rgba(255,255,255,0.2)', border:'none', cursor:'pointer', padding:0 }} title={f.name}/>))}</div>
      </div>
      <div style={{ display:'flex', background:'#0B1D3A', borderBottom:'1px solid rgba(255,255,255,0.08)', padding:'0 48px', flexShrink:0 }}>
        {tabs.map((t,i)=>(<button key={t} onClick={()=>setTab(i)} style={{ padding:'12px 20px', border:'none', cursor:'pointer', fontFamily:'var(--font-sans)', fontSize:13, fontWeight:tab===i?700:500, background:tab===i?'rgba(255,255,255,0.1)':'transparent', color:tab===i?'#fff':'rgba(255,255,255,0.45)', borderBottom:tab===i?'2px solid #D32F2F':'2px solid transparent' }}>{t}</button>))}
      </div>
      <div style={{ flex:1, overflow:'hidden' }}>
        {tab===0 && (<div style={{ height:'100%', display:'flex' }}>
          <div style={{ flex:1, padding:'24px 32px', overflowY:'auto' }}>
            <p style={{ fontSize:14, color:'var(--g600)', lineHeight:1.8, marginBottom:20 }}>{fund.desc}</p>
            <h4 style={{ fontSize:12, fontWeight:700, color:'var(--g800)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>Fund Benefits</h4>
            {['Competitive returns aimed at maximising investor value','Regular income with access to invested funds','Professional management by qualified team','Full transparency via online platform','High liquidity \u2014 short redemption turnaround','Diversification across asset classes'].map(b=>(<div key={b} style={{ display:'flex', gap:10, alignItems:'flex-start', marginBottom:8 }}><CheckCircle size={14} style={{ color:'#2E7D32', marginTop:2, flexShrink:0 }}/><span style={{ fontSize:13, color:'var(--g600)', lineHeight:1.5 }}>{b}</span></div>))}
            <div style={{ marginTop:20, padding:16, borderRadius:10, background:'var(--off-white)', border:'1px solid var(--g200)' }}>
              <div style={{ fontSize:11, fontWeight:700, color:'var(--g400)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6 }}>Minimum Investment</div>
              <div style={{ fontFamily:'var(--font-serif)', fontSize:20, fontWeight:700, color:'var(--red)' }}>K500 lump sum or K100/month</div>
              <div style={{ fontSize:12, color:'var(--g400)', marginTop:4 }}>Via bank transfer, cheque, DDAC mandate, or payroll deduction</div>
            </div>
          </div>
          <div style={{ width:220, padding:'24px 20px', borderLeft:'1px solid var(--g200)', background:'var(--off-white)', display:'flex', flexDirection:'column', justifyContent:'center', gap:16 }}>
            {[{l:'Annual Return',v:fund.ret,c:'var(--red)'},{l:'Fund Size',v:fund.size,c:'var(--navy)'},{l:'Volatility',v:fund.vol,c:'var(--g600)'},{l:'Expense Ratio',v:fund.fee,c:'var(--g600)'}].map(m=>(<div key={m.l}><div style={{ fontSize:11, color:'var(--g400)', fontWeight:600, marginBottom:2 }}>{m.l}</div><div style={{ fontFamily:'var(--font-serif)', fontSize:22, fontWeight:800, color:m.c }}>{m.v}</div></div>))}
            <button className="btn-primary" onClick={()=>onNavigate(2)} style={{ width:'100%', justifyContent:'center', fontSize:13, padding:'10px 16px', marginTop:8 }}>Project Returns <ArrowRight size={13}/></button>
          </div>
        </div>)}
        {tab===1 && (<div style={{ height:'100%', display:'flex' }}>
          <div style={{ flex:1, padding:'24px 32px', display:'flex', flexDirection:'column', justifyContent:'center' }}><PerformanceChart height={220} color={fund.color}/></div>
          <div style={{ width:220, padding:'24px 20px', borderLeft:'1px solid var(--g200)', background:'var(--off-white)', display:'flex', flexDirection:'column', justifyContent:'center', gap:16 }}>
            {[{l:'Annual Return',v:fund.ret,c:'var(--red)'},{l:'Fund Size',v:fund.size,c:'var(--navy)'},{l:'Volatility',v:fund.vol,c:'var(--g600)'},{l:'Expense Ratio',v:fund.fee,c:'var(--g600)'}].map(m=>(<div key={m.l}><div style={{ fontSize:11, color:'var(--g400)', fontWeight:600, marginBottom:2 }}>{m.l}</div><div style={{ fontFamily:'var(--font-serif)', fontSize:22, fontWeight:800, color:m.c }}>{m.v}</div></div>))}
          </div>
        </div>)}
        {tab>=2 && (<div style={{ height:'100%', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16, padding:40 }}>
          <h3 style={{ fontFamily:'var(--font-serif)', fontSize:20, color:'var(--g800)' }}>{tabs[tab]}</h3>
          <p style={{ fontSize:14, color:'var(--g500)', textAlign:'center', maxWidth:400 }}>This section is coming soon.</p>
          <button className="btn-primary" onClick={()=>onNavigate(tab===2?2:5)}>Explore <ArrowRight size={14}/></button>
        </div>)}
      </div>
      <div style={{ padding:'10px 48px', borderTop:'1px solid var(--g200)', display:'flex', gap:6, overflowX:'auto', flexShrink:0, background:'var(--g50)' }}>
        {allFunds.map((f,i)=>{const FI=f.icon;return(<button key={f.name} onClick={()=>{setSel(i);setTab(0);}} style={{display:'flex',alignItems:'center',gap:6,padding:'8px 16px',borderRadius:8,border:sel===i?'2px solid '+f.color:'1px solid var(--g200)',background:sel===i?f.color+'08':'#fff',cursor:'pointer',fontFamily:'var(--font-sans)',fontSize:12,fontWeight:sel===i?700:500,color:sel===i?f.color:'var(--g600)',whiteSpace:'nowrap',transition:'all 0.2s'}}><FI size={13}/>{f.name}</button>);})}
      </div>
      <div style={{ background:'#0B1D3A', padding:'10px 32px', display:'flex', alignItems:'center', borderTop:'1px solid rgba(255,255,255,0.08)', flexShrink:0 }}>
        <div style={{ background:'#D32F2F', padding:'4px 14px', borderRadius:4, fontSize:11, fontWeight:700, color:'#fff', marginRight:20, whiteSpace:'nowrap' }}>Market Updates</div>
        {[{l:'LuSE ASI',v:'+9.4%',c:'#4CAF50'},{l:'USD/ZMW',v:'27.10',c:'#FFC107'},{l:'10Y Bond',v:'16.8%',c:'#FF7043'},{l:'Inflation',v:'13.2%',c:'#90CAF9'}].map((d,i)=>(<div key={d.l} style={{flex:1,display:'flex',alignItems:'center',gap:10,justifyContent:'center',borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none',padding:'0 16px'}}><span style={{fontSize:11,color:'rgba(255,255,255,0.5)',fontWeight:600}}>{d.l}</span><div style={{width:3,height:3,borderRadius:'50%',background:d.c}}/><span style={{fontSize:13,fontWeight:700,color:d.c}}>{d.v}</span></div>))}
      </div>
    </div>
  );
}
