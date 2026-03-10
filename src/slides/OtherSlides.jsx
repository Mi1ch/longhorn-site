import React, { useState, useMemo } from 'react';
import { CheckCircle, Award, Users, Globe, Target, ArrowRight, Shield, TrendingUp, ChevronRight, Mail, Phone, Clock, Lock, Building2, Eye, Briefcase, MapPin, BarChart2 } from 'lucide-react';
import { allFunds } from './FundsSlide';

const team=[{name:'Loretta Ward',role:'Founder & CEO',ini:'LW'},{name:'David Mwansa',role:'CIO',ini:'DM'},{name:'Chileshe Banda',role:'Head Portfolio Mgmt',ini:'CB'},{name:'Natasha Phiri',role:'Client Relations',ini:'NP'},{name:'Brian Zulu',role:'Risk & Compliance',ini:'BZ'},{name:'Grace Tembo',role:'Senior Analyst',ini:'GT'}];

export function AboutSlide({onNavigate}) {
  const [tab,setTab]=useState(0);
  const tabs=['About','Governance','Team','Values'];
  return (
    <div style={{height:'100%',display:'flex',flexDirection:'column',background:'#fff'}}>
      <div style={{background:'linear-gradient(135deg,#0B1D3A 0%,#132B52 100%)',padding:'18px 48px',flexShrink:0}}>
        <h2 style={{fontFamily:'var(--font-serif)',fontSize:24,fontWeight:700,color:'#fff',margin:0}}>About Longhorn Associates</h2>
        <span style={{fontSize:12,color:'rgba(255,255,255,0.5)'}}>SEC & PIA Licensed Investment Management</span>
      </div>
      <div style={{display:'flex',background:'#0B1D3A',borderBottom:'1px solid rgba(255,255,255,0.08)',padding:'0 48px',flexShrink:0}}>
        {tabs.map((t,i)=>(<button key={t} onClick={()=>setTab(i)} style={{padding:'12px 22px',border:'none',cursor:'pointer',fontFamily:'var(--font-sans)',fontSize:13,fontWeight:tab===i?700:500,background:tab===i?'rgba(255,255,255,0.1)':'transparent',color:tab===i?'#fff':'rgba(255,255,255,0.45)',borderBottom:tab===i?'2px solid #D32F2F':'2px solid transparent'}}>{t}</button>))}
      </div>
      <div style={{flex:1,overflow:'auto',padding:'28px 48px'}}>
        {tab===0&&(<div style={{display:'grid',gridTemplateColumns:'1.3fr 1fr',gap:40,alignItems:'start'}}>
          <div>
            <div style={{width:40,height:3,background:'var(--red)',borderRadius:2,marginBottom:14}}/>
            <h3 style={{fontFamily:'var(--font-serif)',fontSize:22,fontWeight:700,color:'var(--g900)',marginBottom:16}}>Who We Are</h3>
            <p style={{fontSize:14,color:'var(--g600)',lineHeight:1.8,marginBottom:14}}>Longhorn Associates is a SEC and PIA licensed Investment Management Company, providing value-adding investment options for clients in Zambia and globally.</p>
            <p style={{fontSize:14,color:'var(--g600)',lineHeight:1.8,marginBottom:20}}>Zambian wholly-owned with 4 branches nationwide. Our Retail CIS (Unit Trust) houses 7 professionally managed funds.</p>
            {['SEC & PIA Licensed','LuSE Member','Zambian Wholly-Owned','7 Unit Trust Funds','4 Branches Nationwide'].map(f=>(<div key={f} style={{display:'flex',gap:10,alignItems:'center',marginBottom:8}}><CheckCircle size={15} style={{color:'#2E7D32'}}/><span style={{fontSize:14,color:'var(--g600)',fontWeight:500}}>{f}</span></div>))}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
            {[{icon:Award,v:'15+',l:'Years'},{icon:Users,v:'500+',l:'Investors'},{icon:BarChart2,v:'7',l:'Funds'},{icon:MapPin,v:'4',l:'Branches'}].map(({icon:Ic,v,l},i)=>(<div key={l} style={{padding:20,borderRadius:14,background:'var(--off-white)',boxShadow:'var(--shadow)',textAlign:'center',border:'1px solid var(--g100)',marginTop:i%2===1?16:0}}><div style={{width:40,height:40,borderRadius:10,background:'var(--red-light)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 10px'}}><Ic size={18} style={{color:'var(--red)'}}/></div><div style={{fontFamily:'var(--font-serif)',fontSize:22,fontWeight:800,color:'var(--navy)'}}>{v}</div><div style={{fontSize:11,color:'var(--g400)',fontWeight:600,marginTop:2}}>{l}</div></div>))}
          </div>
        </div>)}
        {tab===1&&(<div>
          <div style={{width:40,height:3,background:'var(--red)',borderRadius:2,marginBottom:14}}/>
          <h3 style={{fontFamily:'var(--font-serif)',fontSize:22,fontWeight:700,color:'var(--g900)',marginBottom:16}}>Governance Structure</h3>
          <p style={{fontSize:14,color:'var(--g600)',lineHeight:1.8,marginBottom:20}}>The Unit Trust operates through a tripartite governance structure regulated by the SEC.</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
            {[{role:'Fund Manager',entity:'Longhorn Associates Ltd',desc:'Licensed fund manager making investment decisions.',icon:Briefcase},{role:'Custodian',entity:'Approved Bank',desc:'All investments held by authorised professional custodians.',icon:Shield},{role:'Trustee',entity:'Independent Firm',desc:'Approved independent registered Trustee ensuring compliance.',icon:Eye}].map(g=>(<div key={g.role} style={{padding:24,borderRadius:14,background:'var(--off-white)',border:'1px solid var(--g100)',textAlign:'center'}}><div style={{width:48,height:48,borderRadius:12,background:'var(--navy)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 14px'}}><g.icon size={22} style={{color:'#fff'}}/></div><div style={{fontFamily:'var(--font-serif)',fontSize:16,fontWeight:700,color:'var(--navy)',marginBottom:4}}>{g.role}</div><div style={{fontSize:12,color:'var(--red)',fontWeight:600,marginBottom:8}}>{g.entity}</div><p style={{fontSize:13,color:'var(--g500)',lineHeight:1.6}}>{g.desc}</p></div>))}
          </div>
        </div>)}
        {tab===2&&(<div>
          <div style={{width:40,height:3,background:'var(--red)',borderRadius:2,marginBottom:14}}/>
          <h3 style={{fontFamily:'var(--font-serif)',fontSize:22,fontWeight:700,color:'var(--g900)',marginBottom:20}}>Leadership Team</h3>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
            {team.map(t=>(<div key={t.name} style={{padding:24,borderRadius:14,background:'var(--off-white)',border:'1px solid var(--g100)',textAlign:'center',transition:'all 0.2s'}}>
              <div style={{width:56,height:56,borderRadius:'50%',background:'linear-gradient(135deg,#0B1D3A,#1B3A6B)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 12px',fontFamily:'var(--font-serif)',fontWeight:700,fontSize:18,color:'#fff'}}>{t.ini}</div>
              <div style={{fontSize:15,fontWeight:700,color:'var(--g900)'}}>{t.name}</div><div style={{fontSize:12,color:'var(--red)',fontWeight:600,marginTop:2}}>{t.role}</div>
            </div>))}
          </div>
        </div>)}
        {tab===3&&(<div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginBottom:24}}>
            {[{l:'Our Mission',t:'To enrich society through superior investment services, making professional wealth management accessible to every Zambian.'},{l:'Our Vision',t:'To be the most trusted investment management company in Zambia.'}].map(({l,t})=>(<div key={l} style={{padding:28,borderRadius:16,background:'var(--navy)',color:'#fff'}}><div style={{width:40,height:3,background:'var(--red)',borderRadius:2,marginBottom:14}}/><h3 style={{fontFamily:'var(--font-serif)',fontSize:20,fontWeight:700,marginBottom:10}}>{l}</h3><p style={{fontSize:14,color:'rgba(255,255,255,0.75)',lineHeight:1.7}}>{t}</p></div>))}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14}}>
            {[{I:Shield,l:'Integrity',d:'Transparency in all we do.'},{I:TrendingUp,l:'Performance',d:'Superior, consistent returns.'},{I:Users,l:'Community',d:"Investing in Zambia's prosperity."},{I:Award,l:'Excellence',d:'Highest professional standards.'}].map(({I,l,d})=>(<div key={l} style={{padding:20,borderRadius:12,background:'var(--off-white)',textAlign:'center',border:'1px solid var(--g100)'}}><div style={{width:40,height:40,borderRadius:10,background:'var(--red-light)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 10px'}}><I size={18} style={{color:'var(--red)'}}/></div><div style={{fontWeight:700,color:'var(--g900)',marginBottom:4,fontSize:14}}>{l}</div><div style={{fontSize:12,color:'var(--g500)'}}>{d}</div></div>))}
          </div>
        </div>)}
      </div>
    </div>
  );
}

const articles=[
  {title:'Investor General Meeting 2024',date:'Dec 2024',cat:'Events',excerpt:'Annual meeting reviewing fund performance.'},
  {title:'Client Engagement Seminar',date:'Nov 2024',cat:'Events',excerpt:'Interactive seminar on investment strategies.'},
  {title:'Understanding the 7 Unit Trust Funds',date:'Jan 2025',cat:'Education',excerpt:'Guide to each fund, fees, risks.'},
  {title:'Education Fund: Rising School Fees',date:'Oct 2024',cat:'Education',excerpt:'Build a growth fund for education.'},
  {title:'White Coat Fund for Medical Staff',date:'Sep 2024',cat:'Funds',excerpt:'Lowest fee at 2.5% p.a.'},
];

export function InsightsSlide({onNavigate}) {
  const [tab,setTab]=useState(0);
  return (
    <div style={{height:'100%',display:'flex',flexDirection:'column',background:'#fff'}}>
      <div style={{background:'linear-gradient(135deg,#0B1D3A 0%,#132B52 100%)',padding:'18px 48px',flexShrink:0}}><h2 style={{fontFamily:'var(--font-serif)',fontSize:24,fontWeight:700,color:'#fff',margin:0}}>Insights & Market Data</h2></div>
      <div style={{display:'flex',background:'#0B1D3A',borderBottom:'1px solid rgba(255,255,255,0.08)',padding:'0 48px',flexShrink:0}}>
        {['Markets','Funds','Economy','Education'].map((t,i)=>(<button key={t} onClick={()=>setTab(i)} style={{padding:'12px 22px',border:'none',cursor:'pointer',fontFamily:'var(--font-sans)',fontSize:13,fontWeight:tab===i?700:500,background:tab===i?'rgba(255,255,255,0.1)':'transparent',color:tab===i?'#fff':'rgba(255,255,255,0.45)',borderBottom:tab===i?'2px solid #D32F2F':'2px solid transparent'}}>{t}</button>))}
      </div>
      <div style={{flex:1,overflow:'auto',padding:'24px 32px'}}>
        <h3 style={{fontFamily:'var(--font-serif)',fontSize:18,fontWeight:700,color:'var(--g900)',marginBottom:16}}>Insights & Events</h3>
        <div style={{display:'flex',gap:16,overflowX:'auto',paddingBottom:8}}>
          {articles.map(a=>(<div key={a.title} style={{width:260,minWidth:260,borderRadius:12,overflow:'hidden',border:'1px solid var(--g100)',boxShadow:'var(--shadow)',background:'#fff',transition:'all 0.25s',cursor:'pointer'}} onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';}} onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';}}>
            <div style={{height:6,background:'var(--red)'}}/>
            <div style={{padding:16}}><div style={{display:'inline-block',padding:'3px 10px',borderRadius:4,background:'var(--navy-pale)',fontSize:10,fontWeight:700,color:'var(--navy)',marginBottom:8,textTransform:'uppercase'}}>{a.cat}</div><h4 style={{fontFamily:'var(--font-serif)',fontSize:14,fontWeight:700,color:'var(--g900)',marginBottom:6,lineHeight:1.4}}>{a.title}</h4><p style={{fontSize:12,color:'var(--g500)',lineHeight:1.5,marginBottom:8}}>{a.excerpt}</p><div style={{fontSize:11,color:'var(--g400)'}}>{a.date}</div></div>
          </div>))}
        </div>
      </div>
    </div>
  );
}

const branches=[
  {name:'Head Office \u2014 Lusaka',addr:'Ground Floor, Gardenview Office Park\nPlot 1146/15, Lagos Road, Rhodespark',ph:'+260 211 25 25 40'},
  {name:'Ndola Branch',addr:'Mwasumina Road, Plot 32\nItawa, Ndola',ph:'+260 956 55 22 38'},
  {name:'Kitwe Branch',addr:'Unit E, 2nd Floor, Bldg 2\nECL Business Park, Kitwe',ph:'+260 950 85 36 41'},
  {name:'Solwezi Branch',addr:'Plot 133, Independence Ave\nNew Jaids Complex, Solwezi',ph:'+260 95 337 8634'},
];

export function ContactSlide({onNavigate}) {
  const [form,setForm]=useState({name:'',email:'',phone:'',service:'',message:''});
  const [sent,setSent]=useState(false);
  return (
    <div style={{height:'100%',display:'flex',flexDirection:'column',background:'#fff'}}>
      <div style={{background:'linear-gradient(135deg,#0B1D3A 0%,#132B52 100%)',padding:'18px 48px',flexShrink:0}}>
        <h2 style={{fontFamily:'var(--font-serif)',fontSize:24,fontWeight:700,color:'#fff',margin:0}}>Contact Our Team</h2>
        <span style={{fontSize:12,color:'rgba(255,255,255,0.5)'}}>Visit any of our 4 branches or send a message</span>
      </div>
      <div style={{flex:1,display:'grid',gridTemplateColumns:'1fr 1.5fr',overflow:'hidden'}}>
        <div style={{padding:'20px 24px',overflowY:'auto',background:'#0B1D3A',color:'#fff'}}>
          {branches.map(b=>(<div key={b.name} style={{marginBottom:10,padding:12,borderRadius:10,background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.1)'}}><div style={{display:'flex',alignItems:'center',gap:5,marginBottom:4}}><Building2 size={11}/><span style={{fontSize:12,fontWeight:700}}>{b.name}</span></div><div style={{fontSize:11,color:'rgba(255,255,255,0.7)',lineHeight:1.5,whiteSpace:'pre-line',marginBottom:4}}>{b.addr}</div><div style={{display:'flex',alignItems:'center',gap:4,fontSize:11,fontWeight:600}}><Phone size={9}/>{b.ph}</div></div>))}
          <div style={{marginTop:8,padding:10,borderRadius:8,background:'rgba(255,255,255,0.08)'}}><div style={{display:'flex',alignItems:'center',gap:5,marginBottom:3}}><Mail size={11}/><span style={{fontSize:11,fontWeight:700}}>Email</span></div><div style={{fontSize:11,color:'rgba(255,255,255,0.9)'}}>info@longhorn-associates.com</div></div>
          <div style={{marginTop:8,padding:10,borderRadius:8,background:'rgba(255,255,255,0.08)'}}><div style={{display:'flex',alignItems:'center',gap:5,marginBottom:3}}><Globe size={11}/><span style={{fontSize:11,fontWeight:700}}>Website</span></div><div style={{fontSize:11,color:'rgba(255,255,255,0.9)'}}>www.longhorn-associates.com</div></div>
        </div>
        <div style={{padding:'24px 40px',overflowY:'auto'}}>
          {sent?(<div style={{textAlign:'center',padding:'60px 0'}}><div style={{width:64,height:64,borderRadius:'50%',background:'#E8F5E9',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px'}}><CheckCircle size={32} style={{color:'#2E7D32'}}/></div><h3 style={{fontFamily:'var(--font-serif)',fontSize:22,color:'var(--g900)',marginBottom:8}}>Sent!</h3><p style={{color:'var(--g500)',marginBottom:20}}>We will respond within 1 business day.</p><button className="btn-primary" onClick={()=>setSent(false)}>Send Another</button></div>):(
            <>
              <h3 style={{fontFamily:'var(--font-serif)',fontSize:20,color:'var(--g900)',marginBottom:18}}>Send a Message</h3>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14}}>
                {[{k:'name',l:'Full Name'},{k:'email',l:'Email'}].map(({k,l})=>(<div key={k}><label className="f-label">{l}</label><input className="f-input" value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})}/></div>))}
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14}}>
                <div><label className="f-label">Phone</label><input className="f-input" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></div>
                <div><label className="f-label">Service</label><select className="f-input" value={form.service} onChange={e=>setForm({...form,service:e.target.value})}><option value="">Select...</option>{['Unit Trust','Portfolio Management','Pension Fund','Advisory','Wealth Management','General'].map(s=><option key={s}>{s}</option>)}</select></div>
              </div>
              <div style={{marginBottom:16}}><label className="f-label">Message</label><textarea className="f-input" rows={3} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} style={{resize:'vertical'}}/></div>
              <button className="btn-primary" onClick={()=>setSent(true)}>Send Message <ArrowRight size={14}/></button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function PortalSlide() {
  const [tab,setTab]=useState('login');
  const [step,setStep]=useState(1);
  return (
    <div style={{height:'100%',display:'flex',alignItems:'center',justifyContent:'center',background:'var(--off-white)',position:'relative',overflow:'hidden'}}>
      <div style={{width:'100%',maxWidth:460,position:'relative',zIndex:1,padding:'0 24px'}}>
        <div style={{textAlign:'center',marginBottom:24}}>
          <div style={{width:52,height:52,borderRadius:12,background:'var(--navy)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 10px'}}><Lock size={22} style={{color:'#fff'}}/></div>
          <h3 style={{fontFamily:'var(--font-serif)',fontSize:20,fontWeight:700,color:'var(--g900)',marginBottom:4}}>SIMS Investor Portal</h3>
          <p style={{fontSize:13,color:'var(--g400)'}}>Secure access to your investments</p>
        </div>
        <div style={{display:'flex',background:'var(--g100)',borderRadius:10,padding:3,marginBottom:16}}>
          {['login','register'].map(t=>(<button key={t} onClick={()=>{setTab(t);setStep(1);}} style={{flex:1,padding:'9px 0',borderRadius:8,border:'none',cursor:'pointer',fontFamily:'var(--font-sans)',fontWeight:600,fontSize:14,background:tab===t?'var(--red)':'transparent',color:tab===t?'#fff':'var(--g500)',transition:'all 0.2s'}}>{t==='login'?'Sign In':'Register'}</button>))}
        </div>
        <div style={{background:'#fff',borderRadius:16,padding:28,border:'1px solid var(--g200)',boxShadow:'var(--shadow-lg)'}}>
          {tab==='login'?(
            <>
              <h3 style={{fontFamily:'var(--font-serif)',fontSize:18,color:'var(--g900)',marginBottom:16}}>Welcome Back</h3>
              <div style={{display:'flex',flexDirection:'column',gap:12}}>
                {[{l:'Email',t:'email',p:'your@email.com'},{l:'Password',t:'password',p:'password'}].map(({l,t,p})=>(<div key={l}><label className="f-label">{l}</label><input type={t} placeholder={p} className="f-input"/></div>))}
                <div style={{textAlign:'right',marginTop:-4}}><a href="#" style={{fontSize:12,color:'var(--red)',fontWeight:600}}>Forgot password?</a></div>
                <button className="btn-primary" style={{width:'100%',justifyContent:'center'}}>Sign In</button>
              </div>
            </>
          ):(
            <>
              <div style={{display:'flex',gap:6,marginBottom:16}}>{[1,2,3].map(s=>(<div key={s} style={{flex:1,height:3,borderRadius:2,background:s<=step?'var(--red)':'var(--g200)'}}/>))}</div>
              <h3 style={{fontFamily:'var(--font-serif)',fontSize:17,color:'var(--g900)',marginBottom:3}}>{step===1?'Personal Details':step===2?'Investment Profile':'Upload Documents'}</h3>
              <p style={{fontSize:12,color:'var(--g400)',marginBottom:14}}>Step {step} of 3</p>
              {step===1&&(<div style={{display:'flex',flexDirection:'column',gap:10}}><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>{['First Name','Last Name'].map(l=>(<div key={l}><label className="f-label">{l}</label><input className="f-input"/></div>))}</div>{['Email','Phone','NRC / Passport'].map(l=>(<div key={l}><label className="f-label">{l}</label><input className="f-input"/></div>))}<button className="btn-primary" onClick={()=>setStep(2)} style={{width:'100%',justifyContent:'center',marginTop:4}}>Next <ChevronRight size={14}/></button></div>)}
              {step===2&&(<div style={{display:'flex',flexDirection:'column',gap:10}}><div><label className="f-label">Fund</label><select className="f-input">{allFunds.map(f=><option key={f.name}>{f.name}</option>)}</select></div><div><label className="f-label">Amount (ZMW)</label><input type="number" placeholder="Min K500 / K100 monthly" className="f-input"/></div><div style={{display:'flex',gap:8,marginTop:4}}><button style={{flex:1,padding:'10px',borderRadius:8,border:'1.5px solid var(--g300)',background:'transparent',color:'var(--g600)',fontWeight:600,cursor:'pointer',fontFamily:'var(--font-sans)'}} onClick={()=>setStep(1)}>Back</button><button className="btn-primary" onClick={()=>setStep(3)} style={{flex:2,justifyContent:'center'}}>Next <ChevronRight size={14}/></button></div></div>)}
              {step===3&&(<div style={{display:'flex',flexDirection:'column',gap:8}}>{['Copy of ID (NRC/Passport)','Passport Photo','Reference Letter','Proof of Residence'].map(l=>(<div key={l} style={{padding:12,borderRadius:8,border:'1.5px dashed var(--g300)',textAlign:'center',cursor:'pointer'}} onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--red)';e.currentTarget.style.background='var(--red-pale)';}} onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--g300)';e.currentTarget.style.background='transparent';}}><div style={{fontSize:12,fontWeight:700,color:'var(--g800)'}}>{l}</div><div style={{fontSize:10,color:'var(--red)',fontWeight:600}}>+ Upload</div></div>))}<div style={{display:'flex',gap:8,marginTop:4}}><button style={{flex:1,padding:'10px',borderRadius:8,border:'1.5px solid var(--g300)',background:'transparent',color:'var(--g600)',fontWeight:600,cursor:'pointer',fontFamily:'var(--font-sans)'}} onClick={()=>setStep(2)}>Back</button><button className="btn-primary" onClick={()=>alert('Submitted!')} style={{flex:2,justifyContent:'center'}}>Submit</button></div></div>)}
            </>
          )}
        </div>
        <p style={{textAlign:'center',fontSize:10,color:'var(--g400)',marginTop:12}}>256-bit SSL \u00b7 Regulated by SEC & PIA Zambia</p>
      </div>
    </div>
  );
}
