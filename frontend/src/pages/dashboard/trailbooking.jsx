import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { instructors } from '../../data/data';

const STYLES = [
  { value:'ballet',        label:'Ballet',         emoji:'🩰', color:'#8b5cf6' },
  { value:'hiphop',        label:'Hip Hop',        emoji:'🎤', color:'#ec4899' },
  { value:'kathak',        label:'Kathak',         emoji:'🪷', color:'#f59e0b' },
  { value:'bharatanatyam', label:'Bharatanatyam',  emoji:'🌺', color:'#10b981' },
  { value:'contemporary',  label:'Contemporary',   emoji:'🌊', color:'#0ea5e9' },
  { value:'salsa',         label:'Salsa',          emoji:'💃', color:'#ef4444' },
];

const SLOTS = [
  { value:'morning',   label:'Morning',   sub:'7:00 AM – 9:00 AM',   icon:'🌅' },
  { value:'afternoon', label:'Afternoon', sub:'12:00 PM – 2:00 PM',  icon:'☀️' },
  { value:'evening',   label:'Evening',   sub:'6:00 PM – 8:00 PM',   icon:'🌙' },
  { value:'weekend',   label:'Weekend',   sub:'Sat & Sun, 9 AM – 1 PM', icon:'📅' },
];

export default function TrialBooking() {
  const nav = useNavigate();
  const loc = useLocation();
  const formRef = useRef(null);

  const [form, setForm]       = useState({ name:'', email:'', phone:'', age:'', style:'', instructor: loc.state?.instructorName||'', slot:'', date:'', goals:'' });
  const [errs, setErrs]       = useState({});
  const [step, setStep]       = useState(0);       // 0=form, 1=loading, 2=success
  const [focused, setFocused] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
      const el = document.getElementById('trial-form-anchor');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }, []);

  const today = new Date().toISOString().split('T')[0];
  const activeInst = instructors.filter(i => i.status === 'Active');

  const set = (k, v) => { setForm(p=>({...p,[k]:v})); setErrs(p=>({...p,[k]:''})); };
  const hc  = e => set(e.target.name, e.target.value);

  const validate = () => {
    const e={};
    if (!form.name.trim())                                e.name  = 'Required';
    if (!/\S+@\S+\.\S+/.test(form.email))                 e.email = 'Invalid email';
    if (form.phone.replace(/\D/,'').length<10)             e.phone = 'Min 10 digits';
    if (!form.style)                                       e.style = 'Pick a style';
    if (!form.slot)                                        e.slot  = 'Pick a time';
    if (!form.date)                                        e.date  = 'Pick a date';
    return e;
  };

  const submit = e => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) { setErrs(v); return; }
    setStep(1);
    setTimeout(() => setStep(2), 1800);
  };

  const selectedStyle = STYLES.find(s => s.value === form.style);
  const selectedInst  = instructors.find(i => i.name === form.instructor);

  /* ── Loading Screen ── */
  if (step === 1) return (
    <div style={S.loadWrap}>
      <div style={S.loadCard}>
        <div style={S.loadRing}><div style={S.loadSpinner}/></div>
        <p style={S.loadTxt}>Confirming your trial booking…</p>
        <p style={S.loadSub}>Hang tight, this'll just take a second ✨</p>
      </div>
      <style>{anim}</style>
    </div>
  );

  /* ── Success Screen ── */
  if (step === 2) return (
    <div style={S.page}>
      <div style={S.successWrap}>
        {/* Confetti dots */}
        {[...Array(12)].map((_,i)=>(
          <div key={i} style={{...S.dot, background:['#f472b6','#a78bfa','#34d399','#fbbf24','#60a5fa'][i%5], top:`${10+Math.random()*80}%`, left:`${5+Math.random()*90}%`, animationDelay:`${i*0.15}s`}} />
        ))}
        <div style={S.successCard}>
          <div style={S.checkRing}>
            <svg width="40" height="40" viewBox="0 0 40 40"><polyline points="8,20 16,28 32,12" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <h1 style={S.successH1}>You're All Set! 🎉</h1>
          <p style={S.successSub}>
            Hi <strong>{form.name}</strong>! Your free trial for
            <span style={{color:'#8b5cf6'}}> {selectedStyle?.label}</span> is booked.
            We'll call <strong>{form.phone}</strong> within 24 hrs to confirm.
          </p>

          <div style={S.summaryBox}>
            {[
              ['👤 Name',       form.name],
              ['📧 Email',      form.email],
              ['💃 Style',      selectedStyle?.label],
              ['👩‍🏫 Instructor', form.instructor || 'Best available'],
              ['🕐 Time',       SLOTS.find(s=>s.value===form.slot)?.label + ' · ' + SLOTS.find(s=>s.value===form.slot)?.sub],
              ['📅 Date',       form.date],
            ].filter(([,v])=>v).map(([k,v])=>(
              <div key={k} style={S.sumRow}>
                <span style={S.sumKey}>{k}</span>
                <span style={S.sumVal}>{v}</span>
              </div>
            ))}
          </div>

          <div style={S.freeBadge}>🎁 100% FREE — No payment needed</div>

          <div style={S.successBtns}>
            <button style={S.btnOutline} onClick={()=>{setStep(0);setForm({name:'',email:'',phone:'',age:'',style:'',instructor:'',slot:'',date:'',goals:''});}}>Book Another</button>
            <button style={S.btnPrimary} onClick={()=>nav('/')}>Go to Dashboard →</button>
          </div>
        </div>
      </div>
      <style>{anim}</style>
    </div>
  );

  /* ── Main Form ── */
  return (
    <div style={S.page}>
      {/* ── HERO ── */}
      <div style={S.hero}>
        <div style={S.heroOrb1}/><div style={S.heroOrb2}/><div style={S.heroOrb3}/>
        <div style={S.heroGrid}/>
        <div style={{...S.heroContent, opacity: mounted?1:0, transform: mounted?'none':'translateY(24px)'}}>
          <button style={S.backPill} onClick={()=>nav(-1)}>← Back</button>
          <div style={S.freeTag}>🎁 Completely FREE · No Credit Card</div>
          <h1 style={S.heroH1}>
            Book Your <br/>
            <span style={S.heroGrad}>Free Trial Class</span>
          </h1>
          <p style={S.heroSub}>Experience world-class dance instruction — zero commitment, zero cost</p>
          <div style={S.heroStats}>
            {[['500+','Happy Students'],['15+','Expert Instructors'],['100%','Satisfaction'],['24hr','Response Time']].map(([n,l])=>(
              <div key={l} style={S.heroStat}><strong>{n}</strong><span>{l}</span></div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={S.body} id="trial-form-anchor">

        {/* ── FORM COLUMN ── */}
        <div style={{...S.formCol, opacity:mounted?1:0, transform:mounted?'none':'translateX(-20px)'}}>

          {/* Section header */}
          <div style={S.formHeader}>
            <div style={S.formHeaderDot}/>
            <div>
              <h2 style={S.formH2}>Get Started Today</h2>
              <p style={S.formP}>Fill out the form below and we'll contact you to schedule your free trial</p>
            </div>
          </div>

          <form onSubmit={submit} noValidate ref={formRef}>

            {/* ── Personal Info ── */}
            <div style={S.section}>
              <div style={S.sectionLabel}><span style={S.sNum}>01</span> Personal Information</div>
              <div style={S.fieldRow}>
                <Field label="Full Name" req>
                  <input style={inp(errs.name,focused==='name')} name="name" value={form.name}
                    onChange={hc} onFocus={()=>setFocused('name')} onBlur={()=>setFocused('')}
                    placeholder="e.g. Aria Sharma"/>
                  {errs.name && <Err>{errs.name}</Err>}
                </Field>
                <Field label="Email Address" req>
                  <input style={inp(errs.email,focused==='email')} name="email" type="email" value={form.email}
                    onChange={hc} onFocus={()=>setFocused('email')} onBlur={()=>setFocused('')}
                    placeholder="your@email.com"/>
                  {errs.email && <Err>{errs.email}</Err>}
                </Field>
              </div>
              <div style={S.fieldRow}>
                <Field label="Phone Number" req>
                  <input style={inp(errs.phone,focused==='phone')} name="phone" type="tel" value={form.phone}
                    onChange={hc} onFocus={()=>setFocused('phone')} onBlur={()=>setFocused('')}
                    placeholder="+91 98765 43210"/>
                  {errs.phone && <Err>{errs.phone}</Err>}
                </Field>
                <Field label="Age" opt>
                  <input style={inp('',focused==='age')} name="age" type="number" min="4" max="80" value={form.age}
                    onChange={hc} onFocus={()=>setFocused('age')} onBlur={()=>setFocused('')}
                    placeholder="e.g. 18"/>
                </Field>
              </div>
            </div>

            {/* ── Dance Style ── */}
            <div style={S.section}>
              <div style={S.sectionLabel}><span style={S.sNum}>02</span> Dance Style Interest</div>
              <div style={S.styleGrid}>
                {STYLES.map(s=>(
                  <button key={s.value} type="button"
                    style={{...S.styleCard, ...(form.style===s.value ? {...S.styleCardOn, '--sc':s.color, borderColor:s.color, background:`${s.color}18`} : {})}}
                    onClick={()=>set('style',s.value)}>
                    <span style={S.styleEmoji}>{s.emoji}</span>
                    <span style={{...S.styleName, ...(form.style===s.value?{color:s.color}:{})}}>{s.label}</span>
                    {form.style===s.value && <span style={{...S.styleTick, background:s.color}}>✓</span>}
                  </button>
                ))}
              </div>
              {errs.style && <Err>{errs.style}</Err>}
            </div>

            {/* ── Instructor ── */}
            <div style={S.section}>
              <div style={S.sectionLabel}><span style={S.sNum}>03</span> Preferred Instructor <span style={S.optTag}>optional</span></div>
              <div style={S.instGrid}>
                {/* Any instructor */}
                <button type="button" style={{...S.instCard,...(!form.instructor?S.instCardOn:{})}}
                  onClick={()=>set('instructor','')}>
                  <div style={{...S.instAvatar, background:'linear-gradient(135deg,#6366f1,#8b5cf6)'}}>🎲</div>
                  <div style={S.instInfo}>
                    <strong style={S.instName}>Any Available</strong>
                    <span style={S.instSpec}>Best match for your style</span>
                  </div>
                  {!form.instructor && <span style={S.instCheck}>✓</span>}
                </button>
                {activeInst.map(inst=>(
                  <button key={inst.id} type="button"
                    style={{...S.instCard,...(form.instructor===inst.name?S.instCardOn:{})}}
                    onClick={()=>set('instructor',inst.name)}>
                    <div style={{...S.instAvatar, background:inst.avatar, overflow:'hidden', padding:0}}>
                      <img src={inst.image} alt={inst.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                    </div>
                    <div style={S.instInfo}>
                      <strong style={S.instName}>{inst.name}</strong>
                      <span style={S.instSpec}>{inst.specialization}</span>
                      <span style={S.instMeta}>⭐ {inst.rating} &nbsp;·&nbsp; {inst.experience} &nbsp;·&nbsp; {inst.students} students</span>
                    </div>
                    {form.instructor===inst.name && <span style={S.instCheck}>✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Schedule ── */}
            <div style={S.section}>
              <div style={S.sectionLabel}><span style={S.sNum}>04</span> Schedule Your Trial</div>
              <div style={S.fieldRow}>
                <Field label="Preferred Date" req>
                  <input style={inp(errs.date,focused==='date')} name="date" type="date" min={today} value={form.date}
                    onChange={hc} onFocus={()=>setFocused('date')} onBlur={()=>setFocused('')}/>
                  {errs.date && <Err>{errs.date}</Err>}
                </Field>
                <div>
                  <div style={S.fieldLabel}>Time Preference <span style={S.reqStar}>*</span></div>
                  <div style={S.slotGrid}>
                    {SLOTS.map(sl=>(
                      <button key={sl.value} type="button"
                        style={{...S.slotBtn,...(form.slot===sl.value?S.slotBtnOn:{})}}
                        onClick={()=>set('slot',sl.value)}>
                        <span style={S.slotIcon}>{sl.icon}</span>
                        <div style={S.slotTxt}>
                          <strong style={{fontSize:'.82rem'}}>{sl.label}</strong>
                          <small style={{color:form.slot===sl.value?'#a78bfa':'#aaa',fontSize:'.68rem'}}>{sl.sub}</small>
                        </div>
                      </button>
                    ))}
                  </div>
                  {errs.slot && <Err>{errs.slot}</Err>}
                </div>
              </div>
            </div>

            {/* ── Goals ── */}
            <div style={S.section}>
              <div style={S.sectionLabel}><span style={S.sNum}>05</span> Anything Else? <span style={S.optTag}>optional</span></div>
              <textarea style={inp('',focused==='goals',true)} name="goals" rows={3} value={form.goals}
                onChange={hc} onFocus={()=>setFocused('goals')} onBlur={()=>setFocused('')}
                placeholder="Share your goals, concerns, or questions for the instructor…"/>
            </div>

            {/* ── Submit ── */}
            <div style={S.submitWrap}>
              <button type="submit" style={S.submitBtn}>
                <span>Book My Free Trial →</span>
              </button>
              <p style={S.submitNote}>✅ No payment &nbsp;·&nbsp; 📞 We confirm by phone &nbsp;·&nbsp; 🔓 Cancel anytime</p>
            </div>

          </form>
        </div>

        {/* ── SIDEBAR ── */}
        <div style={{...S.sidebar, opacity:mounted?1:0, transform:mounted?'none':'translateX(20px)'}}>

          {/* FREE badge */}
          <div style={S.freePill}>
            <div style={S.freeAmt}>FREE</div>
            <p style={S.freeTxt}>Your first trial class, on us</p>
            <span style={S.freeSub}>No credit card · No commitment</span>
          </div>

          {/* What to expect */}
          <div style={S.sCard}>
            <h4 style={S.sCardH}>What to Expect</h4>
            {[
              ['🎯','30-min personalised session'],
              ['📊','Skill-level assessment'],
              ['🕺','Learn basic techniques'],
              ['🗣️','Chat about your goals'],
              ['🏫','Full studio tour'],
              ['⭐','100% satisfaction guarantee'],
            ].map(([ic,tx])=>(
              <div key={tx} style={S.perkRow}>
                <span style={S.perkIc}>{ic}</span>
                <span style={S.perkTx}>{tx}</span>
              </div>
            ))}
          </div>

          {/* Instructor preview — live */}
          {selectedInst && (
            <div style={S.sCard}>
              <h4 style={S.sCardH}>Your Instructor</h4>
              <div style={S.instPreviewImg}>
                <img src={selectedInst.image} alt={selectedInst.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                <div style={S.instPreviewGrad}/>
                <div style={S.instPreviewBadge}>{selectedInst.rating} ⭐</div>
              </div>
              <div style={S.instPreviewInfo}>
                <strong style={{display:'block',color:'#1a1a2e',fontSize:'1rem',marginBottom:4}}>{selectedInst.name}</strong>
                <span style={{display:'block',fontSize:'.8rem',color:'#7c3aed',marginBottom:8}}>{selectedInst.specialization}</span>
                <div style={S.instMiniStats}>
                  <span>🏆 {selectedInst.experience}</span>
                  <span>👥 {selectedInst.students}+ students</span>
                </div>
              </div>
            </div>
          )}

          {/* Contact */}
          <div style={{...S.sCard,...S.contactCard}}>
            <h4 style={{...S.sCardH,color:'#fff'}}>Questions? We're Here</h4>
            {[['📞','+91 98765 43210'],['✉️','hello@rhythmique.in'],['🕐','Mon – Sat  ·  9 AM – 7 PM']].map(([ic,tx])=>(
              <div key={tx} style={S.contactRow}><span>{ic}</span><span style={S.contactTx}>{tx}</span></div>
            ))}
          </div>
        </div>

      </div>
      <style>{anim}</style>
    </div>
  );
}

/* ── small helpers ── */
const Field = ({label,req,opt,children})=>(
  <div style={{display:'flex',flexDirection:'column',gap:6}}>
    <div style={S.fieldLabel}>{label}{req&&<span style={S.reqStar}> *</span>}{opt&&<span style={S.optTag}> optional</span>}</div>
    {children}
  </div>
);
const Err = ({children})=><span style={S.errMsg}>{children}</span>;

const inp = (err,focused,ta=false) => ({
  width:'100%', padding:'12px 14px',
  border:`1.8px solid ${err?'#f87171':focused?'#8b5cf6':'#e4e4ef'}`,
  borderRadius:10, fontSize:'.93rem', color:'#1a1a2e',
  background: focused?'#fff':'#f9f9ff',
  outline:'none', fontFamily:'inherit',
  boxShadow: focused?'0 0 0 3px rgba(139,92,246,.12)':'none',
  transition:'all .2s',
  resize: ta?'vertical':'none',
  minHeight: ta?80:'auto',
});

/* ── styles object ── */
const S = {
  page:   { minHeight:'100vh', background:'#f0f0f7', fontFamily:"'Inter','Segoe UI',sans-serif" },

  /* hero */
  hero:   { position:'relative', minHeight:480, background:'linear-gradient(135deg,#0d0d1a 0%,#1a0533 40%,#0d1a2e 100%)', display:'flex', alignItems:'center', justifyContent:'center', padding:'60px 24px 80px', overflow:'hidden' },
  heroOrb1:{ position:'absolute', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(139,92,246,.5),transparent 70%)', top:-120, left:-120, pointerEvents:'none' },
  heroOrb2:{ position:'absolute', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(236,72,153,.4),transparent 70%)', bottom:-100, right:-80, pointerEvents:'none' },
  heroOrb3:{ position:'absolute', width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle,rgba(14,165,233,.3),transparent 70%)', top:'50%', left:'50%', transform:'translate(-50%,-50%)', pointerEvents:'none' },
  heroGrid:{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)', backgroundSize:'44px 44px', pointerEvents:'none' },
  heroContent:{ position:'relative', zIndex:2, textAlign:'center', maxWidth:700, transition:'all .7s ease' },
  backPill:{ display:'inline-flex', alignItems:'center', gap:6, padding:'8px 18px', borderRadius:100, background:'rgba(255,255,255,.1)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,.15)', color:'#fff', fontSize:'.82rem', cursor:'pointer', marginBottom:24, transition:'background .2s' },
  freeTag: { display:'inline-block', padding:'6px 18px', borderRadius:100, background:'linear-gradient(135deg,#10b981,#059669)', color:'#fff', fontSize:'.78rem', fontWeight:700, marginBottom:20, letterSpacing:.3 },
  heroH1:  { fontSize:'clamp(2rem,5vw,3.4rem)', fontWeight:900, color:'#fff', margin:'0 0 16px', lineHeight:1.15 },
  heroGrad:{ background:'linear-gradient(135deg,#c084fc,#f472b6,#fb923c)', WebkitBackgroundClip:'text', backgroundClip:'text', color:'transparent' },
  heroSub: { color:'rgba(255,255,255,.75)', fontSize:'1.05rem', margin:'0 0 36px' },
  heroStats:{ display:'flex', justifyContent:'center', flexWrap:'wrap', gap:28 },
  heroStat:{ display:'flex', flexDirection:'column', alignItems:'center', gap:2, color:'#fff' },

  /* body */
  body:  { display:'grid', gridTemplateColumns:'1fr 340px', gap:28, maxWidth:1160, margin:'0 auto', padding:'36px 20px 80px', alignItems:'start' },

  /* form col */
  formCol:{ display:'flex', flexDirection:'column', gap:0, transition:'all .6s ease' },
  formHeader:{ display:'flex', alignItems:'flex-start', gap:16, background:'#fff', borderRadius:'20px 20px 0 0', padding:'28px 32px 24px', borderBottom:'1px solid #f0f0f8' },
  formHeaderDot:{ width:44, height:44, borderRadius:12, background:'linear-gradient(135deg,#8b5cf6,#ec4899)', flexShrink:0, marginTop:2 },
  formH2:{ fontSize:'1.4rem', color:'#1a1a2e', margin:'0 0 4px', fontWeight:800 },
  formP: { color:'#888', margin:0, fontSize:'.88rem' },

  section:{ background:'#fff', padding:'24px 32px', borderBottom:'1px solid #f4f4f8' },
  sectionLabel:{ display:'flex', alignItems:'center', gap:10, fontSize:'.8rem', fontWeight:700, color:'#555', letterSpacing:.8, textTransform:'uppercase', marginBottom:16 },
  sNum:{ width:24, height:24, borderRadius:6, background:'linear-gradient(135deg,#8b5cf6,#ec4899)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.72rem', fontWeight:800, flexShrink:0 },

  fieldRow:{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:16 },
  fieldLabel:{ fontSize:'.8rem', fontWeight:600, color:'#444', marginBottom:6 },
  reqStar:{ color:'#ef4444' },
  optTag:{ fontSize:'.72rem', color:'#bbb', fontWeight:400, marginLeft:4 },
  errMsg:{ fontSize:'.73rem', color:'#f87171', fontWeight:600, marginTop:3, display:'block' },

  /* style cards */
  styleGrid:{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(110px,1fr))', gap:10 },
  styleCard:{ display:'flex', flexDirection:'column', alignItems:'center', gap:6, padding:'14px 8px', borderRadius:14, border:'2px solid #e4e4ef', background:'#f9f9ff', cursor:'pointer', transition:'all .2s', position:'relative' },
  styleCardOn:{ transform:'translateY(-2px)', boxShadow:'0 8px 24px rgba(0,0,0,.1)' },
  styleEmoji:{ fontSize:'1.8rem' },
  styleName:{ fontSize:'.78rem', fontWeight:700, color:'#555', transition:'color .2s' },
  styleTick:{ position:'absolute', top:6, right:6, width:18, height:18, borderRadius:'50%', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.6rem', fontWeight:800 },

  /* instructor cards */
  instGrid:{ display:'flex', flexDirection:'column', gap:8, maxHeight:320, overflowY:'auto', paddingRight:4 },
  instCard:{ display:'flex', alignItems:'center', gap:12, padding:'10px 14px', borderRadius:12, border:'2px solid #e4e4ef', background:'#f9f9ff', cursor:'pointer', transition:'all .2s', position:'relative', textAlign:'left' },
  instCardOn:{ borderColor:'#8b5cf6', background:'#f5f0ff', boxShadow:'0 4px 16px rgba(139,92,246,.15)' },
  instAvatar:{ width:46, height:46, borderRadius:'50%', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem' },
  instInfo:{ flex:1, minWidth:0 },
  instName:{ display:'block', fontSize:'.88rem', color:'#1a1a2e', marginBottom:2 },
  instSpec:{ display:'block', fontSize:'.74rem', color:'#888' },
  instMeta:{ display:'block', fontSize:'.72rem', color:'#f59e0b', marginTop:2 },
  instCheck:{ width:24, height:24, borderRadius:'50%', background:'#8b5cf6', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.7rem', fontWeight:800, flexShrink:0 },

  /* slots */
  slotGrid:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 },
  slotBtn: { display:'flex', alignItems:'center', gap:8, padding:'10px 12px', borderRadius:10, border:'2px solid #e4e4ef', background:'#f9f9ff', cursor:'pointer', transition:'all .2s', textAlign:'left' },
  slotBtnOn:{ borderColor:'#8b5cf6', background:'#f5f0ff' },
  slotIcon:{ fontSize:'1.2rem', flexShrink:0 },
  slotTxt: { display:'flex', flexDirection:'column', gap:1 },

  /* submit */
  submitWrap:{ background:'#fff', borderRadius:'0 0 20px 20px', padding:'24px 32px 32px' },
  submitBtn: { width:'100%', padding:'15px', borderRadius:14, background:'linear-gradient(135deg,#7c3aed,#be185d)', color:'#fff', border:'none', fontSize:'1rem', fontWeight:800, cursor:'pointer', boxShadow:'0 6px 24px rgba(124,58,237,.4)', transition:'all .25s', letterSpacing:.3 },
  submitNote:{ textAlign:'center', fontSize:'.76rem', color:'#aaa', margin:'14px 0 0', lineHeight:1.7 },

  /* sidebar */
  sidebar:{ display:'flex', flexDirection:'column', gap:16, transition:'all .6s .1s ease' },
  freePill:{ borderRadius:18, background:'linear-gradient(135deg,#1a0533,#0d1a2e)', padding:'28px 24px', textAlign:'center', boxShadow:'0 8px 32px rgba(0,0,0,.15)' },
  freeAmt: { fontSize:'3.5rem', fontWeight:900, background:'linear-gradient(135deg,#c084fc,#f472b6)', WebkitBackgroundClip:'text', backgroundClip:'text', color:'transparent', marginBottom:6 },
  freeTxt: { color:'rgba(255,255,255,.85)', fontSize:'.88rem', margin:'0 0 4px' },
  freeSub: { color:'rgba(255,255,255,.4)', fontSize:'.73rem' },

  sCard:    { background:'#fff', borderRadius:18, padding:'22px', boxShadow:'0 4px 20px rgba(0,0,0,.06)' },
  sCardH:   { fontSize:'.88rem', fontWeight:800, color:'#1a1a2e', margin:'0 0 16px' },
  perkRow:  { display:'flex', alignItems:'flex-start', gap:10, marginBottom:10 },
  perkIc:   { fontSize:'1rem', flexShrink:0, marginTop:1 },
  perkTx:   { fontSize:'.83rem', color:'#555', lineHeight:1.4 },

  instPreviewImg: { height:140, borderRadius:12, overflow:'hidden', position:'relative', marginBottom:14 },
  instPreviewGrad:{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,.4),transparent)' },
  instPreviewBadge:{ position:'absolute', bottom:8, right:8, padding:'3px 10px', borderRadius:100, background:'rgba(255,255,255,.9)', fontSize:'.72rem', fontWeight:700, color:'#1a1a2e' },
  instPreviewInfo:{ padding:'0 2px' },
  instMiniStats:{ display:'flex', gap:12, flexWrap:'wrap' },

  contactCard:{ background:'linear-gradient(135deg,#1a0533,#0d1a2e)' },
  contactRow: { display:'flex', alignItems:'center', gap:10, marginBottom:10 },
  contactTx:  { fontSize:'.83rem', color:'rgba(255,255,255,.75)' },

  /* loading */
  loadWrap:{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'linear-gradient(135deg,#0d0d1a,#1a0533)' },
  loadCard:{ textAlign:'center', padding:40 },
  loadRing:{ width:80, height:80, borderRadius:'50%', background:'rgba(139,92,246,.15)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px' },
  loadSpinner:{ width:44, height:44, borderRadius:'50%', border:'3px solid rgba(139,92,246,.3)', borderTopColor:'#8b5cf6', animation:'spin .8s linear infinite' },
  loadTxt:{ color:'#fff', fontSize:'1.2rem', fontWeight:700, margin:'0 0 8px' },
  loadSub:{ color:'rgba(255,255,255,.5)', fontSize:'.88rem', margin:0 },

  /* success */
  successWrap:{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:24, position:'relative', overflow:'hidden', background:'linear-gradient(135deg,#f0f0f7,#f9f0ff)' },
  dot:{ position:'absolute', width:10, height:10, borderRadius:'50%', animation:'floatUp 4s ease-in-out infinite' },
  successCard:{ background:'#fff', borderRadius:24, padding:'48px 40px', maxWidth:520, width:'100%', boxShadow:'0 24px 80px rgba(0,0,0,.12)', position:'relative', zIndex:2, textAlign:'center' },
  checkRing:  { width:80, height:80, borderRadius:'50%', background:'linear-gradient(135deg,#10b981,#059669)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px', boxShadow:'0 8px 28px rgba(16,185,129,.4)', animation:'popIn .5s cubic-bezier(.175,.885,.32,1.275)' },
  successH1:  { fontSize:'1.8rem', color:'#1a1a2e', margin:'0 0 12px', fontWeight:800 },
  successSub: { fontSize:'.93rem', color:'#666', lineHeight:1.7, margin:'0 0 28px' },
  summaryBox: { background:'#f9f9ff', borderRadius:14, padding:'20px 22px', marginBottom:20, textAlign:'left' },
  sumRow:     { display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #f0f0f0', fontSize:'.83rem', gap:12 },
  sumKey:     { color:'#aaa', flexShrink:0 },
  sumVal:     { color:'#1a1a2e', fontWeight:600, textAlign:'right' },
  freeBadge:  { display:'inline-block', padding:'8px 20px', borderRadius:100, background:'linear-gradient(135deg,#10b981,#059669)', color:'#fff', fontSize:'.78rem', fontWeight:700, marginBottom:24 },
  successBtns:{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' },
  btnOutline: { padding:'11px 22px', borderRadius:10, border:'2px solid #8b5cf6', color:'#8b5cf6', background:'#fff', fontWeight:700, cursor:'pointer', transition:'all .2s' },
  btnPrimary: { padding:'11px 22px', borderRadius:10, background:'linear-gradient(135deg,#7c3aed,#be185d)', color:'#fff', border:'none', fontWeight:700, cursor:'pointer', boxShadow:'0 4px 16px rgba(124,58,237,.3)', transition:'all .25s' },
};

const anim = `
  @keyframes spin    { to { transform:rotate(360deg); } }
  @keyframes popIn   { from{transform:scale(0);opacity:0} to{transform:scale(1);opacity:1} }
  @keyframes floatUp { 0%,100%{transform:translateY(0) rotate(0deg);opacity:.6} 50%{transform:translateY(-30px) rotate(180deg);opacity:1} }
  * { box-sizing:border-box; }
  .tb-form-col form { display:flex; flex-direction:column; }

  /* Responsive */
  @media(max-width:900px){
    div[style*="gridTemplateColumns: 1fr 340px"]{
      grid-template-columns:1fr !important;
    }
  }
  button:hover{ filter:brightness(1.05); }
`;
