import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { courses } from '../data/data';

const BATCHES = [
  { value:'morning',   label:'Morning',   sub:'7:00 AM – 9:00 AM',   icon:'🌅' },
  { value:'afternoon', label:'Afternoon', sub:'12:00 PM – 2:00 PM',  icon:'☀️' },
  { value:'evening',   label:'Evening',   sub:'6:00 PM – 8:00 PM',   icon:'🌙' },
  { value:'weekend',   label:'Weekend',   sub:'Sat & Sun, 9 AM – 1 PM', icon:'📅' },
];

const STEPS = [
  { id:1, label:'Personal Info', icon:'👤' },
  { id:2, label:'Course & Batch', icon:'💃' },
  { id:3, label:'Review & Submit', icon:'✅' },
];

export default function Enroll() {
  const location = useLocation();
  const nav      = useNavigate();
  const preId    = location.state?.courseId ? String(location.state.courseId) : '';

  const [step, setStep]       = useState(1);
  const [dir, setDir]         = useState('fwd');
  const [anim, setAnim]       = useState(false);
  const [phase, setPhase]     = useState(0); // 0=form, 1=loading, 2=success
  const [errs, setErrs]       = useState({});
  const [focused, setFocused] = useState('');
  const [mounted, setMounted] = useState(false);

  const [form, setForm] = useState({
    fullName:'', email:'', phone:'', age:'',
    emergencyContact:'', courseId:preId,
    batch:'', startDate:'', experience:'', goals:'', agree:false,
  });

  useEffect(()=>{ setTimeout(()=>setMounted(true),50); window.scrollTo(0,0); },[]);
  useEffect(()=>{
    const el = document.getElementById('enroll-anchor');
    if (el) el.scrollIntoView({ behavior:'smooth', block:'start' });
  },[step]);

  const course = courses.find(c => String(c.id) === form.courseId);
  const today  = new Date().toISOString().split('T')[0];

  const set = (k,v) => { setForm(p=>({...p,[k]:v})); setErrs(p=>({...p,[k]:''})); };
  const hc  = e => { const {name,value,type,checked}=e.target; set(name, type==='checkbox'?checked:value); };

  /* ── Validators ── */
  const v1 = () => {
    const e={};
    if (!form.fullName.trim())             e.fullName = 'Required';
    if (!/\S+@\S+\.\S+/.test(form.email))  e.email = 'Invalid email';
    if (form.phone.replace(/\D/g,'').length<10) e.phone = 'Min 10 digits';
    if (!form.age || +form.age<4 || +form.age>80) e.age = 'Valid age (4–80)';
    return e;
  };
  const v2 = () => {
    const e={};
    if (!form.courseId)  e.courseId  = 'Select a course';
    if (!form.batch)    e.batch    = 'Select a batch';
    if (!form.startDate) e.startDate= 'Pick a date';
    return e;
  };
  const v3 = () => {
    const e={};
    if (!form.agree) e.agree = 'You must agree';
    return e;
  };

  const goTo = n => {
    if (anim) return;
    setDir(n > step ? 'fwd' : 'back');
    setAnim(true);
    setTimeout(()=>{ setStep(n); setAnim(false); },220);
  };

  const next = () => {
    const errs = step===1?v1():step===2?v2():v3();
    if (Object.keys(errs).length) { setErrs(errs); return; }
    if (step < 3) goTo(step+1);
    else { setPhase(1); setTimeout(()=>setPhase(2),1800); }
  };

  const back = () => { if (step>1) goTo(step-1); };
  const batchObj = BATCHES.find(b=>b.value===form.batch);

  /* ── Loading ── */
  if (phase===1) return (
    <div style={L.wrap}>
      <div style={L.card}>
        <div style={L.ring}><div style={L.spin}/></div>
        <p style={L.txt}>Processing your enrollment…</p>
        <p style={L.sub}>Just a moment ✨</p>
      </div>
      <style>{animCSS}</style>
    </div>
  );

  /* ── Success ── */
  if (phase===2) return (
    <div style={X.page}>
      <div style={X.wrap}>
        {[...Array(14)].map((_,i)=>(
          <div key={i} style={{...X.dot,
            background:['#f472b6','#a78bfa','#34d399','#fbbf24','#60a5fa','#f87171'][i%6],
            top:`${8+Math.random()*84}%`, left:`${3+Math.random()*94}%`,
            animationDelay:`${i*.12}s`, animationDuration:`${3+Math.random()*2}s`
          }}/>
        ))}
        <div style={X.card}>
          <div style={X.checkRing}>
            <svg width="40" height="40" viewBox="0 0 40 40"><polyline points="8,20 16,28 32,12" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <h1 style={X.h1}>Enrollment Confirmed! 🎉</h1>
          <p style={X.sub}>
            Welcome to <strong>Rhythmique</strong>, {form.fullName}!<br/>
            Your enrollment for <span style={{color:'#8b5cf6',fontWeight:700}}>{course?.name}</span> has been received.
          </p>

          <div style={X.sumBox}>
            <h3 style={X.sumH}>Enrollment Details</h3>
            {[
              ['👤 Student',    form.fullName],
              ['📧 Email',      form.email],
              ['📞 Phone',      form.phone],
              ['💃 Course',     course?.name],
              ['👩‍🏫 Instructor', course?.instructor],
              ['📊 Level',      course?.level],
              ['🕐 Batch',      batchObj?.label+' · '+batchObj?.sub],
              ['📅 Start Date', form.startDate],
              ['💰 Monthly Fee',`₹${course?.fee?.toLocaleString()}`],
            ].filter(([,v])=>v).map(([k,v])=>(
              <div key={k} style={X.row}><span style={X.rk}>{k}</span><span style={X.rv}>{v}</span></div>
            ))}
          </div>

          <div style={X.btns}>
            <button style={X.btnO} onClick={()=>nav('/courses')}>← Browse Courses</button>
            <button style={X.btnP} onClick={()=>nav('/')}>Go to Dashboard →</button>
          </div>
        </div>
      </div>
      <style>{animCSS}</style>
    </div>
  );

  /* ── Main ── */
  return (
    <div style={S.page}>

      {/* ─── HERO ─── */}
      <div style={S.hero}>
        <div style={S.orb1}/><div style={S.orb2}/><div style={S.orb3}/>
        <div style={S.grid}/>
        <div style={{...S.heroCont, opacity:mounted?1:0, transform:mounted?'none':'translateY(20px)'}}>
          <button style={S.backPill} onClick={()=>nav('/courses')}>← Back to Courses</button>
          <h1 style={S.heroH1}>Begin Your <span style={S.heroGrad}>Dance Journey</span></h1>
          <p style={S.heroSub}>Complete your enrollment in just 3 simple steps</p>
        </div>
      </div>

      {/* ─── STEPPER ─── */}
      <div style={S.stepperBar} id="enroll-anchor">
        <div style={S.stepper}>
          {STEPS.map((s,i)=>(
            <React.Fragment key={s.id}>
              <div style={{...S.sItem, cursor:step>s.id?'pointer':'default'}} onClick={()=>step>s.id&&goTo(s.id)}>
                <div style={{...S.sCircle, ...(step===s.id?S.sCircleOn:{}), ...(step>s.id?S.sCircleDone:{})}}>
                  {step>s.id ? '✓' : s.icon}
                </div>
                <span style={{...S.sLabel, ...(step===s.id?{color:'#8b5cf6',fontWeight:700}:{}), ...(step>s.id?{color:'#10b981'}:{})}}>{s.label}</span>
              </div>
              {i<2 && <div style={{...S.sLine,...(step>s.id?{background:'#10b981'}:{})}}/>}
            </React.Fragment>
          ))}
        </div>
        <div style={S.progBar}><div style={{...S.progFill, width:`${step===1?0:step===2?50:100}%`}}/></div>
        <p style={S.stepHint}>Step {step} of 3 — {STEPS[step-1].label}</p>
      </div>

      {/* ─── BODY ─── */}
      <div style={S.body}>

        {/* Form Column */}
        <div style={{...S.formWrap, opacity:mounted?1:0, transform:mounted?'none':'translateX(-16px)'}}>
          <div className={anim?(dir==='fwd'?'ep-out-l':'ep-out-r'):'ep-in'} style={S.formCard}>

            {/* ── Step 1: Personal ── */}
            {step===1 && (
              <>
                <SectionHead num="01" icon="👤" title="Personal Information" sub="Tell us about yourself" />
                <div style={S.secBody}>
                  <div style={S.row2}>
                    <Field label="Full Name" req focused={focused==='fn'}>
                      <input style={inp(errs.fullName,focused==='fn')} name="fullName" value={form.fullName} onChange={hc}
                        onFocus={()=>setFocused('fn')} onBlur={()=>setFocused('')} placeholder="e.g. Aria Sharma"/>
                      {errs.fullName && <Err>{errs.fullName}</Err>}
                    </Field>
                    <Field label="Email Address" req focused={focused==='em'}>
                      <input style={inp(errs.email,focused==='em')} name="email" type="email" value={form.email} onChange={hc}
                        onFocus={()=>setFocused('em')} onBlur={()=>setFocused('')} placeholder="you@email.com"/>
                      {errs.email && <Err>{errs.email}</Err>}
                    </Field>
                  </div>
                  <div style={S.row2}>
                    <Field label="Phone Number" req focused={focused==='ph'}>
                      <input style={inp(errs.phone,focused==='ph')} name="phone" type="tel" value={form.phone} onChange={hc}
                        onFocus={()=>setFocused('ph')} onBlur={()=>setFocused('')} placeholder="+91 98765 43210"/>
                      {errs.phone && <Err>{errs.phone}</Err>}
                    </Field>
                    <Field label="Age" req focused={focused==='age'}>
                      <input style={inp(errs.age,focused==='age')} name="age" type="number" min="4" max="80" value={form.age} onChange={hc}
                        onFocus={()=>setFocused('age')} onBlur={()=>setFocused('')} placeholder="e.g. 18"/>
                      {errs.age && <Err>{errs.age}</Err>}
                    </Field>
                  </div>
                  <div style={S.row2}>
                    <Field label="Emergency Contact" opt>
                      <input style={inp('',focused==='ec')} name="emergencyContact" type="tel" value={form.emergencyContact}
                        onChange={hc} onFocus={()=>setFocused('ec')} onBlur={()=>setFocused('')} placeholder="Guardian's phone"/>
                    </Field>
                  </div>
                </div>
              </>
            )}

            {/* ── Step 2: Course ── */}
            {step===2 && (
              <>
                <SectionHead num="02" icon="💃" title="Course & Batch" sub="Pick your course, batch, and start date" />
                <div style={S.secBody}>
                  {/* Course cards */}
                  <div style={{marginBottom:20}}>
                    <div style={S.fLabel}>Select Course <span style={S.reqS}>*</span></div>
                    <div style={S.courseGrid}>
                      {courses.map(c => {
                        const on = form.courseId===String(c.id);
                        return (
                          <div key={c.id}
                            style={{...S.courseCard, ...(on ? {borderColor:c.accent, background:`${c.accent}10`, boxShadow:`0 8px 28px ${c.accent}25`} : {})}}
                            onClick={()=>set('courseId',String(c.id))}>
                            <div style={S.courseImgWrap}>
                              <img src={c.image} alt={c.name} style={S.courseImg}/>
                              <div style={S.courseOverlay}/>
                              <span style={{...S.courseBadge, background:c.accent}}>{c.level}</span>
                            </div>
                            <div style={S.courseInfo}>
                              <strong style={S.courseName}>{c.name}</strong>
                              <span style={S.courseInst}>👩‍🏫 {c.instructor}</span>
                              <div style={S.courseBottom}>
                                <span style={{...S.courseFee,color:c.accent}}>₹{c.fee.toLocaleString()}<small>/mo</small></span>
                                <span style={S.courseDur}>⏱ {c.duration}</span>
                              </div>
                            </div>
                            {on && <div style={{...S.courseCheck, background:c.accent}}>✓</div>}
                          </div>
                        );
                      })}
                    </div>
                    {errs.courseId && <Err>{errs.courseId}</Err>}
                  </div>

                  {/* Batch */}
                  <div style={{marginBottom:20}}>
                    <div style={S.fLabel}>Preferred Batch <span style={S.reqS}>*</span></div>
                    <div style={S.batchGrid}>
                      {BATCHES.map(b=>{
                        const on = form.batch===b.value;
                        return (
                          <button key={b.value} type="button"
                            style={{...S.batchCard,...(on?S.batchCardOn:{})}}
                            onClick={()=>set('batch',b.value)}>
                            <span style={S.batchIcon}>{b.icon}</span>
                            <div>
                              <strong style={{fontSize:'.84rem',display:'block'}}>{b.label}</strong>
                              <small style={{color:on?'#a78bfa':'#aaa',fontSize:'.7rem'}}>{b.sub}</small>
                            </div>
                            {on && <span style={S.batchTick}>✓</span>}
                          </button>
                        );
                      })}
                    </div>
                    {errs.batch && <Err>{errs.batch}</Err>}
                  </div>

                  <div style={S.row2}>
                    <Field label="Start Date" req>
                      <input style={inp(errs.startDate,focused==='sd')} name="startDate" type="date" min={today}
                        value={form.startDate} onChange={hc} onFocus={()=>setFocused('sd')} onBlur={()=>setFocused('')}/>
                      {errs.startDate && <Err>{errs.startDate}</Err>}
                    </Field>
                    <Field label="Experience Level" opt>
                      <select style={inp('',focused==='exp')} name="experience" value={form.experience} onChange={hc}
                        onFocus={()=>setFocused('exp')} onBlur={()=>setFocused('')}>
                        <option value="">Select level</option>
                        <option value="none">No prior experience</option>
                        <option value="beginner">Beginner (&lt;1 year)</option>
                        <option value="intermediate">Intermediate (1–3 yrs)</option>
                        <option value="advanced">Advanced (3+ yrs)</option>
                      </select>
                    </Field>
                  </div>

                  <Field label="Your Dance Goals" opt>
                    <textarea style={inp('',focused==='g',true)} name="goals" rows={3} value={form.goals} onChange={hc}
                      onFocus={()=>setFocused('g')} onBlur={()=>setFocused('')}
                      placeholder="e.g. I want to learn Bharatanatyam for cultural events…"/>
                  </Field>
                </div>
              </>
            )}

            {/* ── Step 3: Review ── */}
            {step===3 && (
              <>
                <SectionHead num="03" icon="✅" title="Review & Confirm" sub="Double-check everything before submitting" />
                <div style={S.secBody}>
                  {/* Personal review */}
                  <ReviewBlock title="👤 Personal Details" onEdit={()=>goTo(1)}>
                    <ReviewGrid items={[
                      ['Name',form.fullName],['Email',form.email],['Phone',form.phone],
                      ['Age',form.age?`${form.age} yrs`:''],
                      form.emergencyContact&&['Emergency',form.emergencyContact]
                    ].filter(Boolean)}/>
                  </ReviewBlock>

                  {/* Course review */}
                  <ReviewBlock title="💃 Course Details" onEdit={()=>goTo(2)}>
                    {course && (
                      <div style={S.rvCourseBanner}>
                        <img src={course.image} alt={course.name} style={S.rvCourseImg}/>
                        <div style={{flex:1}}>
                          <strong style={{display:'block',fontSize:'.95rem',color:'#1a1a2e'}}>{course.name}</strong>
                          <span style={{fontSize:'.75rem',color:course.accent,fontWeight:600}}>{course.level}</span>
                          <span style={{display:'block',fontSize:'.75rem',color:'#888'}}>👩‍🏫 {course.instructor}</span>
                        </div>
                        <div style={{textAlign:'right',flexShrink:0}}>
                          <strong style={{display:'block',color:'#be185d',fontSize:'1.1rem'}}>₹{course.fee.toLocaleString()}</strong>
                          <small style={{color:'#aaa'}}>/month</small>
                        </div>
                      </div>
                    )}
                    <ReviewGrid items={[
                      ['Batch', batchObj ? `${batchObj.icon} ${batchObj.label} · ${batchObj.sub}` : ''],
                      ['Start Date',form.startDate],
                      form.experience&&['Experience',form.experience.charAt(0).toUpperCase()+form.experience.slice(1)],
                    ].filter(Boolean)} />
                    {form.goals && (
                      <div style={S.rvGoals}>
                        <span style={{fontSize:'.72rem',color:'#aaa'}}>🎯 Goals</span>
                        <p style={{margin:'4px 0 0',fontSize:'.85rem',color:'#555',fontStyle:'italic',lineHeight:1.5}}>{form.goals}</p>
                      </div>
                    )}
                  </ReviewBlock>

                  {/* Terms */}
                  <label style={{...S.termsBox,...(errs.agree?{borderColor:'#f87171'}:{})}}>
                    <input type="checkbox" name="agree" checked={form.agree} onChange={hc}
                      style={{width:18,height:18,accentColor:'#8b5cf6',flexShrink:0,marginTop:2,cursor:'pointer'}}/>
                    <span style={{fontSize:'.84rem',color:'#555',lineHeight:1.5}}>
                      I agree to the <a href="#!" onClick={e=>e.preventDefault()} style={{color:'#8b5cf6'}}>Terms & Conditions</a> and{' '}
                      <a href="#!" onClick={e=>e.preventDefault()} style={{color:'#8b5cf6'}}>Privacy Policy</a>
                    </span>
                  </label>
                  {errs.agree && <Err>{errs.agree}</Err>}
                </div>
              </>
            )}

            {/* ── Nav ── */}
            <div style={S.nav}>
              {step>1 ? (
                <button style={S.navBack} onClick={back}>← Previous</button>
              ) : (
                <button style={S.navBack} onClick={()=>nav('/courses')}>← Courses</button>
              )}
              <button style={S.navNext} onClick={next}>
                {step===3 ? '🎉 Submit Enrollment' : `Next: ${STEPS[step].label} →`}
              </button>
            </div>

          </div>
        </div>

        {/* ── Sidebar ── */}
        <div style={{...S.sidebar,opacity:mounted?1:0,transform:mounted?'none':'translateX(16px)'}}>

          {/* Course preview */}
          {course ? (
            <div style={S.sCard}>
              <div style={S.prevImgW}>
                <img src={course.image} alt={course.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                <div style={S.prevGrad}/>
                <span style={{...S.prevBadge,background:course.accent}}>{course.level}</span>
              </div>
              <div style={{padding:'18px 20px'}}>
                <h3 style={{fontSize:'1.1rem',color:'#1a1a2e',margin:'0 0 6px',fontWeight:800}}>{course.name}</h3>
                <p style={{fontSize:'.82rem',color:'#888',lineHeight:1.5,margin:'0 0 14px'}}>{course.desc}</p>
                <div style={{display:'flex',flexDirection:'column',gap:5,marginBottom:14}}>
                  {[['⏱',`${course.duration}/class`],['👩‍🏫',course.instructor],['👥',`${course.students} students`]].map(([i,t])=>(
                    <span key={t} style={{fontSize:'.78rem',color:'#666'}}>{i} {t}</span>
                  ))}
                </div>
                <div style={{display:'flex',justifyContent:'space-between',borderTop:'1px solid #f0f0f0',paddingTop:12}}>
                  <span style={{fontSize:'.78rem',color:'#aaa'}}>Monthly Fee</span>
                  <strong style={{fontSize:'1.3rem',color:'#be185d'}}>₹{course.fee.toLocaleString()}</strong>
                </div>
              </div>
            </div>
          ) : (
            <div style={{...S.sCard,padding:'40px 20px',textAlign:'center'}}>
              <span style={{fontSize:'2.5rem',display:'block',marginBottom:10}}>💃</span>
              <p style={{color:'#bbb',fontSize:'.88rem',margin:0}}>Select a course to preview</p>
            </div>
          )}

          {/* Perks */}
          <div style={{...S.sCard, padding:'20px 22px'}}>
            <h4 style={S.sCardH}>What's Included</h4>
            {['Expert instructor-led classes','Practice materials & music library','Flexible batch timings','Performance workshop access','Completion certificate'].map(p=>(
              <div key={p} style={{display:'flex',alignItems:'center',gap:10,marginBottom:9}}>
                <span style={{color:'#10b981',fontWeight:800,flexShrink:0}}>✓</span>
                <span style={{fontSize:'.82rem',color:'#555'}}>{p}</span>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div style={{...S.sCard, background:'linear-gradient(135deg,#1a0533,#0d1a2e)', padding:'20px 22px'}}>
            <h4 style={{...S.sCardH,color:'#fff'}}>Need Help?</h4>
            {[['📞','+91 98765 43210'],['✉️','hello@rhythmique.in'],['🕐','Mon – Sat · 9 AM – 7 PM']].map(([i,t])=>(
              <p key={t} style={{color:'rgba(255,255,255,.7)',fontSize:'.83rem',margin:'0 0 6px'}}>{i} {t}</p>
            ))}
          </div>
        </div>
      </div>
      <style>{animCSS}</style>
    </div>
  );
}

/* ── Helpers ── */
const Field = ({label,req,opt,children})=>(
  <div style={{display:'flex',flexDirection:'column',gap:6}}>
    <div style={S.fLabel}>{label}{req&&<span style={S.reqS}> *</span>}{opt&&<span style={{fontSize:'.72rem',color:'#bbb',fontWeight:400,marginLeft:4}}> optional</span>}</div>
    {children}
  </div>
);
const Err = ({children})=><span style={{fontSize:'.73rem',color:'#f87171',fontWeight:600,marginTop:2,display:'block'}}>{children}</span>;

const SectionHead = ({num,icon,title,sub})=>(
  <div style={S.secHead}>
    <div style={S.secNum}>{num}</div>
    <span style={{fontSize:'1.6rem'}}>{icon}</span>
    <div><h2 style={{fontSize:'1.25rem',color:'#1a1a2e',margin:'0 0 2px',fontWeight:800}}>{title}</h2><p style={{color:'#888',margin:0,fontSize:'.85rem'}}>{sub}</p></div>
  </div>
);

const ReviewBlock = ({title,onEdit,children})=>(
  <div style={S.rvBlock}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
      <span style={{fontWeight:700,color:'#8b5cf6',fontSize:'.84rem'}}>{title}</span>
      <button style={S.editBtn} onClick={onEdit}>Edit</button>
    </div>
    {children}
  </div>
);

const ReviewGrid = ({items})=>(
  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
    {items.map(([k,v])=>v&&(
      <div key={k} style={{display:'flex',flexDirection:'column',gap:2}}>
        <span style={{fontSize:'.72rem',color:'#aaa'}}>{k}</span>
        <strong style={{fontSize:'.86rem',color:'#1a1a2e'}}>{v}</strong>
      </div>
    ))}
  </div>
);

const inp = (err,foc,ta=false)=>({
  width:'100%', padding:'12px 14px',
  border:`1.8px solid ${err?'#f87171':foc?'#8b5cf6':'#e4e4ef'}`,
  borderRadius:10, fontSize:'.93rem', color:'#1a1a2e',
  background:foc?'#fff':'#f9f9ff', outline:'none', fontFamily:'inherit',
  boxShadow:foc?'0 0 0 3px rgba(139,92,246,.12)':'none',
  transition:'all .2s', resize:ta?'vertical':'none', minHeight:ta?80:'auto',
});

/* ── Style Objects ── */
const S = {
  page:{ minHeight:'100vh', background:'#f0f0f7', fontFamily:"'Inter','Segoe UI',sans-serif" },

  hero:{ position:'relative', minHeight:360, background:'linear-gradient(135deg,#0d0d1a 0%,#1a0533 40%,#0d1a2e 100%)', display:'flex', alignItems:'center', justifyContent:'center', padding:'52px 24px 72px', overflow:'hidden' },
  orb1:{ position:'absolute', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(139,92,246,.45),transparent 70%)', top:-130, left:-120, pointerEvents:'none' },
  orb2:{ position:'absolute', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(236,72,153,.35),transparent 70%)', bottom:-110, right:-80, pointerEvents:'none' },
  orb3:{ position:'absolute', width:280, height:280, borderRadius:'50%', background:'radial-gradient(circle,rgba(14,165,233,.25),transparent 70%)', top:'45%', left:'50%', transform:'translate(-50%,-50%)', pointerEvents:'none' },
  grid:{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)', backgroundSize:'44px 44px', pointerEvents:'none' },
  heroCont:{ position:'relative', zIndex:2, textAlign:'center', maxWidth:660, transition:'all .7s ease' },
  backPill:{ display:'inline-flex', alignItems:'center', gap:6, padding:'8px 18px', borderRadius:100, background:'rgba(255,255,255,.1)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,.15)', color:'#fff', fontSize:'.82rem', cursor:'pointer', marginBottom:24, transition:'background .2s' },
  heroH1:{ fontSize:'clamp(1.8rem,5vw,3.2rem)', fontWeight:900, color:'#fff', margin:'0 0 14px', lineHeight:1.15 },
  heroGrad:{ background:'linear-gradient(135deg,#c084fc,#f472b6,#fb923c)', WebkitBackgroundClip:'text', backgroundClip:'text', color:'transparent' },
  heroSub:{ color:'rgba(255,255,255,.75)', fontSize:'1.02rem', margin:0 },

  /* stepper */
  stepperBar:{ background:'#fff', borderBottom:'1px solid #eee', padding:'22px 24px 0', position:'sticky', top:0, zIndex:50, boxShadow:'0 2px 12px rgba(0,0,0,.06)' },
  stepper:{ display:'flex', alignItems:'center', justifyContent:'center', maxWidth:550, margin:'0 auto 14px' },
  sItem:{ display:'flex', flexDirection:'column', alignItems:'center', gap:5, flex:1 },
  sCircle:{ width:44, height:44, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1rem', fontWeight:700, background:'#eef0f6', color:'#aaa', transition:'all .3s', border:'2.5px solid #e0e2ee' },
  sCircleOn:{ background:'linear-gradient(135deg,#8b5cf6,#ec4899)', color:'#fff', borderColor:'transparent', boxShadow:'0 4px 18px rgba(139,92,246,.4)', transform:'scale(1.1)' },
  sCircleDone:{ background:'#10b981', color:'#fff', borderColor:'transparent' },
  sLabel:{ fontSize:'.76rem', color:'#aaa', fontWeight:500, whiteSpace:'nowrap', transition:'color .3s' },
  sLine:{ flex:1, height:2, background:'#e0e2ee', margin:'0 4px', marginBottom:22, transition:'background .4s' },
  progBar:{ maxWidth:550, margin:'0 auto', height:3, background:'#eef0f6', borderRadius:4, overflow:'hidden' },
  progFill:{ height:'100%', background:'linear-gradient(90deg,#8b5cf6,#ec4899)', borderRadius:4, transition:'width .4s ease' },
  stepHint:{ textAlign:'center', fontSize:'.78rem', color:'#aaa', margin:'8px 0 14px', fontWeight:500 },

  /* body */
  body:{ display:'grid', gridTemplateColumns:'1fr 350px', gap:28, maxWidth:1180, margin:'0 auto', padding:'32px 20px 80px', alignItems:'start' },

  formWrap:{ transition:'all .6s ease' },
  formCard:{ background:'#fff', borderRadius:20, boxShadow:'0 6px 32px rgba(0,0,0,.08)', overflow:'hidden' },

  secHead:{ display:'flex', alignItems:'center', gap:12, padding:'24px 32px', borderBottom:'1px solid #f4f4f8' },
  secNum:{ width:28, height:28, borderRadius:8, background:'linear-gradient(135deg,#8b5cf6,#ec4899)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.72rem', fontWeight:800, flexShrink:0 },
  secBody:{ padding:'24px 32px 28px', display:'flex', flexDirection:'column', gap:18 },

  row2:{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:16 },
  fLabel:{ fontSize:'.8rem', fontWeight:600, color:'#444', marginBottom:6 },
  reqS:{ color:'#ef4444' },

  /* courses grid */
  courseGrid:{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:12 },
  courseCard:{ display:'flex', gap:14, padding:12, borderRadius:14, border:'2px solid #e4e4ef', cursor:'pointer', background:'#f9f9ff', transition:'all .25s', position:'relative', alignItems:'stretch' },
  courseImgWrap:{ width:72, height:72, borderRadius:10, overflow:'hidden', position:'relative', flexShrink:0 },
  courseImg:{ width:'100%', height:'100%', objectFit:'cover' },
  courseOverlay:{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(0,0,0,.05),transparent)' },
  courseBadge:{ position:'absolute', bottom:4, left:4, padding:'2px 7px', borderRadius:6, color:'#fff', fontSize:'.55rem', fontWeight:700 },
  courseInfo:{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', gap:3 },
  courseName:{ fontSize:'.9rem', color:'#1a1a2e' },
  courseInst:{ fontSize:'.72rem', color:'#888' },
  courseBottom:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:2 },
  courseFee:{ fontWeight:800, fontSize:'.88rem' },
  courseDur:{ fontSize:'.7rem', color:'#aaa' },
  courseCheck:{ position:'absolute', top:8, right:8, width:22, height:22, borderRadius:'50%', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.6rem', fontWeight:800 },

  /* batch */
  batchGrid:{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(175px,1fr))', gap:10 },
  batchCard:{ display:'flex', alignItems:'center', gap:10, padding:'12px 14px', borderRadius:10, border:'2px solid #e4e4ef', background:'#f9f9ff', cursor:'pointer', transition:'all .2s', textAlign:'left', position:'relative' },
  batchCardOn:{ borderColor:'#8b5cf6', background:'#f5f0ff' },
  batchIcon:{ fontSize:'1.3rem', flexShrink:0 },
  batchTick:{ width:20, height:20, borderRadius:'50%', background:'#8b5cf6', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.6rem', fontWeight:800, position:'absolute', top:6, right:6 },

  /* review */
  rvBlock:{ background:'#f8f9fc', borderRadius:14, padding:'18px 20px', border:'1px solid #ececf4' },
  editBtn:{ background:'none', border:'1px solid #8b5cf6', color:'#8b5cf6', borderRadius:6, padding:'3px 10px', fontSize:'.72rem', cursor:'pointer', transition:'all .2s', fontWeight:600 },
  rvCourseBanner:{ display:'flex', alignItems:'center', gap:12, background:'#fff', borderRadius:10, padding:12, border:'1px solid #e4e4ef', marginBottom:12 },
  rvCourseImg:{ width:60, height:44, borderRadius:8, objectFit:'cover', flexShrink:0 },
  rvGoals:{ marginTop:12, padding:'10px 14px', background:'#fff', borderRadius:8, border:'1px solid #e4e4ef' },

  termsBox:{ display:'flex', alignItems:'flex-start', gap:10, padding:14, borderRadius:10, border:'1.5px solid #e4e4ef', background:'#f9f9ff', cursor:'pointer', transition:'border-color .2s', marginTop:4 },

  /* nav */
  nav:{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'18px 32px 24px', borderTop:'1px solid #f0f0f0', background:'#fafbff', gap:12, flexWrap:'wrap' },
  navBack:{ display:'inline-flex', alignItems:'center', gap:6, padding:'12px 22px', borderRadius:12, border:'2px solid #e0e2ee', background:'#fff', color:'#666', fontWeight:600, fontSize:'.9rem', cursor:'pointer', transition:'all .2s', whiteSpace:'nowrap' },
  navNext:{ display:'inline-flex', alignItems:'center', gap:8, padding:'13px 28px', borderRadius:12, background:'linear-gradient(135deg,#7c3aed,#be185d)', color:'#fff', border:'none', fontWeight:800, fontSize:'.95rem', cursor:'pointer', boxShadow:'0 6px 24px rgba(124,58,237,.4)', transition:'all .25s', whiteSpace:'nowrap', letterSpacing:.3 },

  /* sidebar */
  sidebar:{ display:'flex', flexDirection:'column', gap:16, transition:'all .6s .1s ease' },
  sCard:{ background:'#fff', borderRadius:18, boxShadow:'0 4px 20px rgba(0,0,0,.06)', overflow:'hidden' },
  sCardH:{ fontSize:'.88rem', fontWeight:800, color:'#1a1a2e', margin:'0 0 14px' },
  prevImgW:{ position:'relative', height:150 },
  prevGrad:{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,.35),transparent)' },
  prevBadge:{ position:'absolute', bottom:8, left:8, padding:'3px 10px', borderRadius:100, color:'#fff', fontSize:'.7rem', fontWeight:700 },
};

/* loading styles */
const L = {
  wrap:{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'linear-gradient(135deg,#0d0d1a,#1a0533)', fontFamily:"'Inter',sans-serif" },
  card:{ textAlign:'center', padding:40 },
  ring:{ width:80, height:80, borderRadius:'50%', background:'rgba(139,92,246,.15)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px' },
  spin:{ width:44, height:44, borderRadius:'50%', border:'3px solid rgba(139,92,246,.3)', borderTopColor:'#8b5cf6', animation:'spin .8s linear infinite' },
  txt:{ color:'#fff', fontSize:'1.2rem', fontWeight:700, margin:'0 0 8px' },
  sub:{ color:'rgba(255,255,255,.5)', fontSize:'.88rem', margin:0 },
};

/* success styles */
const X = {
  page:{ minHeight:'100vh', fontFamily:"'Inter',sans-serif" },
  wrap:{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:24, position:'relative', overflow:'hidden', background:'linear-gradient(135deg,#f0f0f7,#f9f0ff)' },
  dot:{ position:'absolute', width:10, height:10, borderRadius:'50%', animation:'floatUp 4s ease-in-out infinite' },
  card:{ background:'#fff', borderRadius:24, padding:'48px 40px', maxWidth:540, width:'100%', boxShadow:'0 24px 80px rgba(0,0,0,.12)', position:'relative', zIndex:2, textAlign:'center' },
  checkRing:{ width:80, height:80, borderRadius:'50%', background:'linear-gradient(135deg,#10b981,#059669)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px', boxShadow:'0 8px 28px rgba(16,185,129,.4)', animation:'popIn .5s cubic-bezier(.175,.885,.32,1.275)' },
  h1:{ fontSize:'1.8rem', color:'#1a1a2e', margin:'0 0 12px', fontWeight:800 },
  sub:{ fontSize:'.93rem', color:'#666', lineHeight:1.7, margin:'0 0 28px' },
  sumBox:{ background:'#f9f9ff', borderRadius:14, padding:'20px 22px', marginBottom:28, textAlign:'left' },
  sumH:{ fontSize:'.88rem', color:'#8b5cf6', margin:'0 0 14px', fontWeight:700 },
  row:{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #f0f0f0', fontSize:'.83rem', gap:12 },
  rk:{ color:'#aaa', flexShrink:0 },
  rv:{ color:'#1a1a2e', fontWeight:600, textAlign:'right' },
  btns:{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' },
  btnO:{ padding:'12px 22px', borderRadius:10, border:'2px solid #8b5cf6', color:'#8b5cf6', background:'#fff', fontWeight:700, cursor:'pointer', transition:'all .2s' },
  btnP:{ padding:'12px 22px', borderRadius:10, background:'linear-gradient(135deg,#7c3aed,#be185d)', color:'#fff', border:'none', fontWeight:700, cursor:'pointer', boxShadow:'0 4px 16px rgba(124,58,237,.3)', transition:'all .25s' },
};

const animCSS = `
  * { box-sizing:border-box; }
  @keyframes spin    { to { transform:rotate(360deg); } }
  @keyframes popIn   { from{transform:scale(0);opacity:0} to{transform:scale(1);opacity:1} }
  @keyframes floatUp { 0%,100%{transform:translateY(0) rotate(0deg);opacity:.6} 50%{transform:translateY(-30px) rotate(180deg);opacity:1} }
  .ep-in    { animation: epIn .22s ease both; }
  .ep-out-l { animation: epOutL .22s ease both; }
  .ep-out-r { animation: epOutR .22s ease both; }
  @keyframes epIn   { from{opacity:0;transform:translateX(24px)} to{opacity:1;transform:none} }
  @keyframes epOutL { from{opacity:1;transform:none} to{opacity:0;transform:translateX(-24px)} }
  @keyframes epOutR { from{opacity:1;transform:none} to{opacity:0;transform:translateX(24px)} }
  button:hover{ filter:brightness(1.06); }
  @media(max-width:960px){
    div[style*="gridTemplateColumns: 1fr 350px"],
    div[style*="gridTemplateColumns:1fr 350px"]{
      grid-template-columns:1fr !important;
    }
  }
`;
