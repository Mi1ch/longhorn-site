import React, { useState, useMemo } from 'react';
import { ArrowRight, Calculator, CheckCircle } from 'lucide-react';
import { allFunds } from './FundsSlide';

function Chart({height=160,color='#2E7D32'}){
  const pts=useMemo(()=>{const p=[];let v=30;for(let i=0;i<=100;i+=2){v+=(Math.random()-0.42)*4;v=Math.max(10,Math.min(95,v));p.push({x:i,y:v});}return p;},[]);
  const path=pts.map((p,i)=>(i===0?'M':'L')+p.x*5+','+(height-(p.y/100)*(height-30))).join(' ');
  return(<svg viewBox={'0 0 500 '+height} style={{width:'100%',height}}><defs><linearGradient id="cg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.15"/><stop offset="100%" stopColor={color} stopOpacity="0"/></linearGradient></defs><path d={path+' L500,'+height+' L0,'+height+' Z'} fill="url(#cg2)"/><path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"/></svg>);
}

export default function CalculatorSlide({onNavigate}){
  const [fund,setFund]=useState('Multi Assets Class Fund');
  const [init,setInit]=useState(20000);
  const [monthly,setMonthly]=useState(2000);
  const [horizon,setHorizon]=useState(5);
  const [scenario,setScenario]=useState('balanced');
  const rates={historical:0.10,conservative:0.06,balanced:0.09,optimistic:0.13};
  const r=rates[scenario];
  const totalInvested=init+monthly*12*horizon;
  const median=Math.round(init*Math.pow(1+r,horizon)+monthly*((Math.pow(1+r/12,horizon*12)-1)/(r/12)));
  const best=Math.round(median*1.15);
  const low=Math.round(median*0.87);

  return(
    <div style={{height:'100%',display:'flex',flexDirection:'column',background:'#fff'}}>
      <div style={{background:'linear-gradient(135deg,#0B1D3A 0%,#132B52 100%)',padding:'18px 48px',display:'flex',alignItems:'center',flexShrink:0}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div style={{width:40,height:40,borderRadius:10,background:'rgba(255,255,255,0.1)',display:'flex',alignItems:'center',justifyContent:'center'}}><Calculator size={20} style={{color:'#fff'}}/></div>
          <div><h2 style={{fontFamily:'var(--font-serif)',fontSize:24,fontWeight:700,color:'#fff',margin:0}}>Return Projection Calculator</h2><span style={{fontSize:12,color:'rgba(255,255,255,0.5)'}}>Estimate your potential investment growth</span></div>
        </div>
      </div>
      <div style={{flex:1,display:'grid',gridTemplateColumns:'1fr 1.3fr',overflow:'hidden'}}>
        <div style={{padding:'28px 36px',borderRight:'1px solid var(--g200)',overflowY:'auto'}}>
          <h3 style={{fontSize:14,fontWeight:700,color:'var(--g800)',marginBottom:20}}>Fund: <span style={{color:'var(--red)'}}>{fund}</span></h3>
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <div><label className="f-label">Fund</label><select value={fund} onChange={e=>setFund(e.target.value)} className="f-input">{allFunds.map(f=><option key={f.name}>{f.name}</option>)}</select></div>
            <div><label className="f-label">Initial Investment</label><div style={{position:'relative'}}><span style={{position:'absolute',left:14,top:'50%',transform:'translateY(-50%)',fontSize:14,color:'var(--g400)',fontWeight:600}}>K</span><input type="number" value={init} onChange={e=>setInit(+e.target.value)} className="f-input" style={{paddingLeft:32}}/></div></div>
            <div><label className="f-label">Monthly Contribution</label><div style={{position:'relative'}}><span style={{position:'absolute',left:14,top:'50%',transform:'translateY(-50%)',fontSize:14,color:'var(--g400)',fontWeight:600}}>K</span><input type="number" value={monthly} onChange={e=>setMonthly(+e.target.value)} className="f-input" style={{paddingLeft:32}}/></div></div>
            <div><label className="f-label">Horizon</label><div style={{display:'flex',gap:8}}>{[3,5,10,15,20].map(y=>(<button key={y} onClick={()=>setHorizon(y)} style={{flex:1,padding:'10px 0',borderRadius:8,border:horizon===y?'2px solid var(--red)':'1.5px solid var(--g200)',background:horizon===y?'var(--red-light)':'#fff',color:horizon===y?'var(--red)':'var(--g600)',fontFamily:'var(--font-sans)',fontWeight:700,fontSize:14,cursor:'pointer'}}>{y}Y</button>))}</div></div>
            <div style={{marginTop:4}}><label className="f-label">Scenario</label>{['historical','conservative','balanced','optimistic'].map(s=>(<label key={s} style={{display:'flex',alignItems:'center',gap:10,marginBottom:8,cursor:'pointer',fontSize:14,color:scenario===s?'var(--red)':'var(--g600)',fontWeight:scenario===s?700:500}}><div style={{width:18,height:18,borderRadius:'50%',border:'2px solid '+(scenario===s?'var(--red)':'var(--g300)'),display:'flex',alignItems:'center',justifyContent:'center'}}>{scenario===s&&<div style={{width:8,height:8,borderRadius:'50%',background:'var(--red)'}}/>}</div><input type="radio" name="sc" checked={scenario===s} onChange={()=>setScenario(s)} style={{display:'none'}}/>{s.charAt(0).toUpperCase()+s.slice(1)}</label>))}</div>
            <button className="btn-primary" style={{width:'100%',justifyContent:'center',background:'var(--navy)'}}>Calculate <ArrowRight size={14}/></button>
          </div>
        </div>
        <div style={{padding:'28px 36px',overflowY:'auto',display:'flex',flexDirection:'column',justifyContent:'center'}}>
          <div style={{background:'var(--navy)',borderRadius:14,padding:'18px 24px',display:'flex',alignItems:'center',justifyContent:'center',gap:12,marginBottom:28}}>
            <span style={{fontSize:14,color:'rgba(255,255,255,0.6)',fontWeight:600}}>Projected Range</span>
            <span style={{fontFamily:'var(--font-serif)',fontSize:28,fontWeight:800,color:'#4CAF50'}}>K {low.toLocaleString()}</span>
            <span style={{fontSize:16,color:'rgba(255,255,255,0.3)'}}>&#8212;</span>
            <span style={{fontFamily:'var(--font-serif)',fontSize:28,fontWeight:800,color:'#4CAF50'}}>K {best.toLocaleString()}</span>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:16,marginBottom:28}}>
            {[{l:'Median',v:'K '+median.toLocaleString(),c:'var(--navy)'},{l:'Total Invested',v:'K '+totalInvested.toLocaleString(),c:'var(--g600)'},{l:'Best Case',v:'K '+best.toLocaleString(),c:'#2E7D32'}].map(m=>(<div key={m.l} style={{padding:16,borderRadius:10,background:'var(--off-white)',border:'1px solid var(--g100)'}}><div style={{fontSize:11,color:'var(--g400)',fontWeight:600,marginBottom:4,textTransform:'uppercase'}}>{m.l}</div><div style={{fontFamily:'var(--font-serif)',fontSize:22,fontWeight:800,color:m.c}}>{m.v}</div></div>))}
          </div>
          <Chart height={160} color="#2E7D32"/>
          <div style={{display:'flex',gap:12,marginTop:24,justifyContent:'flex-end'}}>
            <button className="btn-primary" onClick={()=>onNavigate(6)}>Start Investing <ArrowRight size={14}/></button>
          </div>
          <p style={{fontSize:11,color:'var(--g400)',fontStyle:'italic',marginTop:16,textAlign:'center'}}>Projections are estimates only. Past performance is not indicative of future results.</p>
        </div>
      </div>
      <div style={{background:'#0B1D3A',padding:'10px 32px',display:'flex',alignItems:'center',borderTop:'1px solid rgba(255,255,255,0.08)',flexShrink:0}}>
        <div style={{background:'#D32F2F',padding:'4px 14px',borderRadius:4,fontSize:11,fontWeight:700,color:'#fff',marginRight:20}}>Market Updates</div>
        {[{l:'LuSE ASI',v:'+9.4%',c:'#4CAF50'},{l:'USD/ZMW',v:'27.10',c:'#FFC107'},{l:'10Y Bond',v:'16.8%',c:'#FF7043'}].map((d,i)=>(<div key={d.l} style={{flex:1,display:'flex',alignItems:'center',gap:10,justifyContent:'center',borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none'}}><span style={{fontSize:11,color:'rgba(255,255,255,0.5)',fontWeight:600}}>{d.l}</span><span style={{fontSize:13,fontWeight:700,color:d.c}}>{d.v}</span></div>))}
      </div>
    </div>
  );
}
