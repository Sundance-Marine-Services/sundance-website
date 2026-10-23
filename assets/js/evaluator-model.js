(function (root) {
  'use strict';
  const VERSION = 2;
  const num = (id, label, unit, direction = 'min', note = '') => ({id, label, unit, direction, type:'number', mandatory:true, weight:1, note});
  const yes = (id, label, note = '') => ({id, label, type:'boolean', direction:'yes', unit:'', mandatory:true, weight:1, note});
  const profiles = [
    {id:'ports',name:'Ports & project cargo',description:'Berth, handling, storage and onward movement.',criteria:[num('cargoMass','Heaviest cargo item','t'),num('cargoLength','Maximum cargo length accommodated','m'),num('berthDepth','Available berth depth','m'),num('quayCapacity','Accepted quay bearing capacity','t/m²','min','Use the applicable engineering assessment, including load distribution.'),num('laydown','Available laydown area','m²'),yes('handlingPlan','Handling and storage method accepted')]},
    {id:'heavy',name:'Heavy transport & load-out',description:'Transport systems, deck loading and marine interfaces.',criteria:[num('transportCapacity','Transport package payload','t'),num('bargeDeck','Usable barge deck area','m²'),num('bargeLoading','Accepted deck loading','t/m²'),yes('loadout','Load-out / ballast plan accepted'),yes('seafastening','Sea-fastening / voyage engineering accepted')]},
    {id:'shallow',name:'Shallow water & nearshore',description:'Access, tide, seabed and positioning suitability.',criteria:[num('workingDepth','Accepted working water depth','m'),num('draft','Maximum operating draft','m','max','Compare with the project draft limit, including required clearance.'),yes('seabed','Site-specific seabed / geotechnical basis accepted'),yes('positioning','Positioning / mooring method accepted'),yes('access','Tidal and channel access confirmed')]},
    {id:'deep',name:'Deep-offshore support',description:'Configuration-specific depth, positioning and lifting checks.',criteria:[num('workingDepth','Accepted working water depth','m'),num('rovDepth','ROV system depth rating','m'),num('larsDepth','TMS / umbilical / LARS working reach','m'),num('liftCapacity','Crane capacity in operating configuration','t','min','Use the load chart at required radius/depth and operating conditions, not brochure maximum.'),yes('dp','Project DP assurance requirements accepted'),yes('metocean','Operating window / metocean basis accepted')]},
    {id:'imr',name:'Subsea IMR / ROV',description:'Inspection, maintenance and repair spread selection.',criteria:[num('rovDepth','ROV system depth rating','m'),num('larsDepth','TMS / umbilical / LARS working reach','m'),num('deckArea','Usable deck area','m²'),yes('tooling','Scope-specific intervention tooling confirmed'),yes('survey','Survey / inspection deliverables defined'),yes('integration','Vessel and specialist spread interfaces accepted')]},
    {id:'installation',name:'Subsea installation',description:'Lifting, placement, rigging and completion interfaces.',criteria:[num('workingDepth','Accepted working water depth','m'),num('liftCapacity','Crane capacity in operating configuration','t'),yes('liftPlan','Installation / lift engineering accepted'),yes('rigging','Rigging configuration and evidence accepted'),yes('tolerances','Survey / placement tolerances achievable'),yes('completion','Completion / handover requirements defined')]},
    {id:'diving',name:'Diving / DSV / MSV',description:'Diving systems, rescue arrangements and vessel support.',criteria:[num('diveDepth','Accepted diving operating depth','m'),num('satPersons','SAT system capacity','persons'),num('beds','Total accommodation','berths'),num('deckArea','Usable deck area','m²'),yes('diveMode','Required diving mode and system accepted'),yes('rescue','Hyperbaric rescue / emergency arrangements accepted'),yes('competence','Personnel competence evidence accepted')]},
    {id:'towing',name:'Towing / anchor handling',description:'Tow engineering, pull, gear and route readiness.',criteria:[num('bollardPull','Certified continuous bollard pull','t'),num('gearMbl','Tow gear minimum breaking load','t'),num('endurance','Available endurance','days'),yes('towPlan','Tow / rig-move engineering accepted'),yes('route','Route, weather limits and contingency agreed'),yes('gear','Winch / tow gear configuration accepted')]},
    {id:'logistics',name:'Offshore marine logistics',description:'Supply cycles, capacities and shore-base interfaces.',criteria:[num('deckCargo','Deck cargo capacity','t'),num('deckArea','Usable deck area','m²'),num('persons','Personnel transport capacity','persons'),num('cycle','Supply / sailing cycle time','days','max'),yes('shore','Shore-base and cargo interfaces confirmed'),yes('schedule','Availability covers required operating window')]},
    {id:'infrastructure',name:'Energy infrastructure',description:'Development concepts, delivery partners and readiness.',criteria:[yes('basis','Field / concept basis sufficiently defined'),yes('export','Oil / gas evacuation route identified'),yes('feed','FEED scope and interfaces defined'),yes('fabrication','Fabrication capability and delivery basis reviewed'),yes('drilling','Drilling access / rig suitability reviewed'),yes('commissioning','Commissioning and handover scope defined')]}
  ];
  const evidenceStates = ['missing','claimed','documented','accepted','expired'];
  const environments = ['Port / terminal','Inland / sheltered water','Nearshore / shallow water','Deep offshore','Mixed campaign'];
  const text = (v, n = 3000) => typeof v === 'string' ? v.slice(0,n) : '';
  const numeric = v => v === '' || v == null ? null : typeof v === 'boolean' ? NaN : Number(v);
  function criteriaFor(state) {
    const unique = new Map();
    for (const p of profiles.filter(p => state.modules.includes(p.id))) for (const c of p.criteria) if (!unique.has(c.id)) unique.set(c.id,{...c});
    for (const c of state.custom || []) unique.set(c.id,{...c});
    return [...unique.values()].map(c => ({...c,...state.settings[c.id]}));
  }
  function blankCandidate(id) {return {id,name:'',source:'',available:'unknown',capabilities:{},cost:{operatingDays:'',operatingRate:'',standbyDays:'',standbyRate:'',transitDays:'',transitRate:'',dailyOps:'',mobilisation:'',demobilisation:'',other:'',exclusions:''},notes:''};}
  function blank() {return {version:VERSION,project:{name:'',environment:environments[2],location:'',waterDepth:'',currency:'USD',duration:'',basis:'',notes:'',revision:'1'},modules:['imr'],custom:[],settings:{},requirements:{},candidates:[blankCandidate('option-1'),blankCandidate('option-2')]};}
  function example(id='imr') {
    const state=blank();state.modules=[id];state.project.name='Illustrative '+profiles.find(p=>p.id===id).name+' assessment';state.project.environment=id==='ports'?'Port / terminal':id==='deep'?'Deep offshore':environments[2];state.project.location='Fictional West African project';state.project.duration='30';state.project.basis='Same fictional 30-day scope; USD; taxes excluded. Figures are examples, not market quotations.';
    const sample={cargoMass:90,cargoLength:18,berthDepth:8,quayCapacity:6,laydown:1600,transportCapacity:160,bargeDeck:900,bargeLoading:7,workingDepth:id==='deep'?1200:35,draft:3,rovDepth:300,larsDepth:300,liftCapacity:80,deckArea:650,diveDepth:150,satPersons:9,beds:80,bollardPull:100,gearMbl:240,endurance:21,deckCargo:500,persons:40,cycle:5};
    for (const c of criteriaFor(state)) {
      state.requirements[c.id]={value:c.type==='boolean'?'yes':String(sample[c.id]||100),source:'Fictional project input, revision 1'};
      state.candidates.forEach((o,i)=>{o.capabilities[c.id]={value:c.type==='boolean'?'yes':String(Number((c.direction==='max'?(sample[c.id]||100)*(i?1.1:.9):(sample[c.id]||100)*(i?.8:1.1)).toFixed(2))),evidence:i?'claimed':'accepted',reference:i?'Illustrative supplier claim':'Fictional accepted evidence for demonstration'};});
    }
    state.candidates.forEach((o,i)=>{o.name=i?'Illustrative Package B':'Illustrative Package A';o.source='Fictional example — no actual vessel or supplier';o.available='yes';o.cost={operatingDays:'30',operatingRate:i?'14000':'16500',standbyDays:'0',standbyRate:'0',transitDays:'0',transitRate:'0',dailyOps:'1800',mobilisation:'60000',demobilisation:'25000',other:'0',exclusions:'Taxes excluded; fictional USD figures.'};});return state;
  }
  const costKeys=['operatingDays','operatingRate','standbyDays','standbyRate','transitDays','transitRate','dailyOps','mobilisation','demobilisation','other'];
  function costOf(cost) {
    const errors=[], values={};
    for(const k of costKeys){const n=numeric(cost[k]);if(n===null)errors.push(k+' is missing');else if(!Number.isFinite(n)||n<0)errors.push(k+' must be a non-negative number');values[k]=n;}
    if(errors.length)return {total:null,errors,days:null};
    const v=values,days=v.operatingDays+v.standbyDays+v.transitDays;
    const total=v.operatingDays*v.operatingRate+v.standbyDays*v.standbyRate+v.transitDays*v.transitRate+days*v.dailyOps+v.mobilisation+v.demobilisation+v.other;
    if(!Number.isFinite(total))return {total:null,errors:['Cost exceeds supported range'],days};
    return {total,errors,days};
  }
  function evaluate(state) {
    const criteria=criteriaFor(state), projectIssues=[];
    if(!state.modules.length&&!state.custom.length)projectIssues.push('Choose at least one work package or custom criterion.');
    if(!state.project.name.trim())projectIssues.push('Enter a project name.');
    if(!state.project.basis.trim())projectIssues.push('Define a common scope and cost basis before comparing offers.');
    if(!state.project.duration || !Number.isFinite(Number(state.project.duration)) || Number(state.project.duration)<=0)projectIssues.push('Enter a positive campaign duration.');
    return {criteria,projectIssues,candidates:state.candidates.map(o=>{
      let total=0,earned=0,evidenced=0;const rows=[];
      for(const c of criteria){
        const req=state.requirements[c.id]||{}, cap=o.capabilities[c.id]||{};
        let status='unknown', message='Candidate input missing'; const n=numeric(req.value),a=numeric(cap.value);
        if(req.na===true){rows.push({criterion:c,status:'na',message:'Not applicable: '+(req.reason||'reason missing'),req,cap});continue;}
        if(c.type==='boolean'){
          if(!['yes','no'].includes(req.value)){status='incomplete';message='Requirement incomplete';}
          else if(!['yes','no'].includes(cap.value)){status='unknown';}
          else {status=cap.value===req.value?'pass':'fail';message=status==='pass'?'Matches entered requirement':'Does not match entered requirement';}
        }else if(n===null||!Number.isFinite(n)||n<0){status='incomplete';message='Requirement incomplete or invalid';}
        else if(a===null||!Number.isFinite(a)||a<0){status='unknown';message='Candidate input missing or invalid';}
        else {status=(c.direction==='max'?a<=n:a>=n)?'pass':'fail';message=status==='pass'?'Meets entered threshold':'Outside entered threshold';}
        const weight=Number(c.weight)||0; total+=weight;
        if(status==='pass')earned+=weight;
        if(['pass','fail'].includes(status)&&cap.evidence==='accepted'&&text(cap.reference).trim())evidenced+=weight;
        if((cap.evidence==='missing'||cap.evidence==='expired')&&status==='pass'){status='unknown';message=cap.evidence==='expired'?'Supporting evidence expired':'Supporting evidence missing';earned-=weight;}
        rows.push({criterion:c,status,message,req,cap});
      }
      const gateRows=rows.filter(r=>r.criterion.mandatory && r.status!=='na');
      let status=gateRows.some(r=>r.status==='fail')?'Does not meet':gateRows.some(r=>r.status==='incomplete')?'Requirements incomplete':gateRows.some(r=>r.status==='unknown')?'Insufficient evidence / data':gateRows.some(r=>r.cap.evidence!=='accepted'||!text(r.cap.reference).trim())?'Evidence review needed':'Meets entered requirements';
      if(!criteria.length)status='No criteria selected';
      else if(rows.every(r=>r.status==='na'))status='No applicable criteria';
      else if(!gateRows.length)status='No mandatory gates set';
      if(rows.some(r=>r.status==='na'&&!text(r.req.reason).trim()))status='Applicability reason missing';
      if(!o.name.trim())status='Candidate name missing';
      if(o.available==='no')status='Unavailable';else if(o.available!=='yes'&&status==='Meets entered requirements')status='Availability unconfirmed';
      if(projectIssues.length&&status==='Meets entered requirements')status='Project definition incomplete';
      const cost=costOf(o.cost), duration=numeric(state.project.duration);
      if(cost.days!==null&&duration!==null&&duration>0&&cost.days!==duration)cost.errors.push('Billable day total differs from campaign duration. Explain the difference in the cost basis.');
      return {id:o.id,name:o.name,status,score:total?Math.round(earned/total*100):null,confidence:total?Math.round(evidenced/total*100):null,rows,cost};
    })};
  }
  function validateImport(raw) {
    if(!raw||typeof raw!=='object'||Array.isArray(raw)||raw.version!==VERSION)throw Error('Unsupported project file. Use a version 2 evaluator JSON file.');
    if(!Array.isArray(raw.modules)||raw.modules.some(id=>!profiles.some(p=>p.id===id)))throw Error('Unknown work package.');
    if(!Array.isArray(raw.candidates)||raw.candidates.length<1||raw.candidates.length>4)throw Error('A project needs one to four candidates.');
    const state=blank();state.modules=[...new Set(raw.modules)];
    if(!raw.project||typeof raw.project!=='object')throw Error('Project context is missing.');
    for(const key of Object.keys(state.project))state.project[key]=text(raw.project[key]);
    if(!environments.includes(state.project.environment))throw Error('Unknown operating environment.');
    if(!['USD','NGN','EUR','GBP'].includes(state.project.currency))throw Error('Unsupported currency.');
    if(!Array.isArray(raw.custom||[])||(raw.custom||[]).length>30)throw Error('Maximum 30 custom criteria.');
    state.custom=(raw.custom||[]).map((c,i)=>{if(!c||!['number','boolean'].includes(c.type)||!text(c.label,160).trim())throw Error('Invalid custom criterion.');return {id:'custom-'+i,label:text(c.label,160),unit:text(c.unit,30),type:c.type,direction:c.type==='boolean'?'yes':c.direction==='max'?'max':'min',weight:1,mandatory:true,note:text(c.note)};});
    const originalIds=(raw.custom||[]).map(c=>c.id);const remap=id=>{const i=originalIds.indexOf(id);return i<0?id:'custom-'+i;};
    const ids=criteriaFor(state).map(c=>c.id), reqs=raw.requirements||{},settings=raw.settings||{};
    for(const [old,value] of Object.entries(reqs)){const id=remap(old);if(!ids.includes(id)||!value||typeof value!=='object')continue;state.requirements[id]={value:text(value.value,100),source:text(value.source),na:value.na===true,reason:text(value.reason)};}
    for(const [old,value] of Object.entries(settings)){const id=remap(old);if(!ids.includes(id)||!value||typeof value!=='object')continue;const w=Number(value.weight);if(!Number.isFinite(w)||w<0||w>10)throw Error('Criterion weights must be between 0 and 10.');state.settings[id]={mandatory:value.mandatory!==false,weight:w};}
    state.candidates=raw.candidates.map((v,i)=>{if(!v||typeof v!=='object')throw Error('Invalid candidate.');const o=blankCandidate('option-'+(i+1));o.name=text(v.name,160);o.source=text(v.source);o.notes=text(v.notes);o.available=['yes','no','unknown'].includes(v.available)?v.available:'unknown';for(const [old,c] of Object.entries(v.capabilities||{})){const id=remap(old);if(ids.includes(id)&&c&&typeof c==='object')o.capabilities[id]={value:text(c.value,100),evidence:evidenceStates.includes(c.evidence)?c.evidence:'missing',reference:text(c.reference)};}for(const k of Object.keys(o.cost))o.cost[k]=text(v.cost&&v.cost[k]);return o;});
    return state;
  }
  function summary(state,now=new Date()) {
    const evaluation=evaluate(state), lines=['SUNDANCE MARINE & ENERGY PROJECT EVALUATOR','Screening summary | Methodology 2.0 | '+now.toISOString().slice(0,10),'',state.project.name||'Untitled assessment','Revision: '+state.project.revision,'Environment: '+state.project.environment,'Location: '+state.project.location,'Actual water depth (m): '+state.project.waterDepth,'Modules: '+profiles.filter(p=>state.modules.includes(p.id)).map(p=>p.name).join('; '),'Campaign duration: '+state.project.duration+' days','Currency: '+state.project.currency,'Common cost basis: '+state.project.basis,'Project notes: '+state.project.notes,''];
    if(evaluation.projectIssues.length)lines.push('PROJECT GAPS',...evaluation.projectIssues.map(x=>'- '+x),'');
    for(const c of evaluation.candidates){const input=state.candidates.find(x=>x.id===c.id);lines.push(c.name||'Unnamed candidate',c.status,'Input match: '+(c.score===null?'n/a':c.score+'%')+' | Accepted evidence: '+(c.confidence===null?'n/a':c.confidence+'%'),'Entered source: '+input.source,'Availability: '+input.available,'Estimated entered cost: '+(c.cost.total===null?'Incomplete':state.project.currency+' '+c.cost.total.toLocaleString('en-US')),'Exclusions / cost notes: '+input.cost.exclusions,...c.cost.errors.map(x=>'- '+x));for(const r of c.rows)lines.push('- '+r.criterion.label+' ['+(r.criterion.mandatory?'mandatory':'optional')+', weight '+r.criterion.weight+']: '+r.message+' | Requirement '+(r.req.value||'unknown')+' '+r.criterion.unit+' | Candidate '+(r.cap.value||'unknown')+' | Evidence '+(r.cap.evidence||'missing')+' | Requirement source '+(r.req.source||'not supplied')+' | Evidence reference '+(r.cap.reference||'not supplied'));lines.push('Candidate notes / next actions: '+input.notes,'');}
    lines.push('METHOD','Each active criterion contributes its assigned weight (0–10). A matched input earns that weight; incomplete, missing and failed inputs earn zero. Not-applicable criteria are excluded and require a reason. Mandatory failures cannot be offset by scores or price. Accepted evidence percentages measure recorded user judgements, not independent verification.','Cost = operating days × rate + standby days × rate + transit days × rate + all billable days × daily operations allowance + mobilisation + demobilisation + other lump sums. Currency is common to all candidates; no exchange rates or market prices are supplied.','Screening output based on user-entered information. It does not establish engineering acceptance, certification or current availability. Fictional examples are illustrative.','Sundance Technologies West Africa Limited | contact@sundance.com.ng | sundance.com.ng');return lines.join('\n');
  }
  const api={VERSION,profiles,environments,evidenceStates,criteriaFor,blank,blankCandidate,example,costOf,evaluate,validateImport,summary};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.SundanceEvaluator=api;
})(typeof window==='undefined'?globalThis:window);
