const state={
  step:1,vehicle:null,serviceType:null,pkg:null,addons:{},date:null,time:null,customer:{}
};

const vehicles={
  sedan:{name:'Sedan',icon:'🚗',desc:'Traditional sedan body style.',tier:'standard'},
  tworow:{name:'Two-Row SUV / Crossover',icon:'🚙',desc:'SUVs and crossovers with up to two seating rows.',tier:'standard'},
  truck:{name:'Truck',icon:'🛻',desc:'Pickup trucks.',tier:'large'},
  threerow:{name:'Three-Row SUV',icon:'🚐',desc:'SUVs with a third seating row.',tier:'large'},
  motorcycle:{name:'Motorcycle',icon:'🏍️',desc:'Motorcycle detailing.',tier:'motorcycle'},
  utv:{name:'UTV / Side-by-Side',icon:'🏁',desc:'Side-by-side and off-road vehicle detailing.',tier:'utv'},
  boat:{name:'Boat',icon:'🚤',desc:'Boat detailing priced by linear foot.',tier:'boat'},
  rv:{name:'RV / Trailer / Commercial Truck',icon:'🚚',desc:'Large-vehicle detailing priced by linear foot.',tier:'rv'}
};

const packages={
  standard:{
    interior:[
      {id:'mini-interior',name:'Mini Interior Detail',price:95,mins:60,desc:'A light interior reset for vehicles in generally good condition.',items:['Light vacuum including cracks and crevices','Interior window cleaning','All hard surfaces wiped down','Light seat cleaning / leather upholstery','Light door-jamb wipe down'],note:'Vehicles requiring deep cleaning may need a more comprehensive service.'},
      {id:'full-interior',name:'Full Interior Detail',price:225,mins:120,desc:'A comprehensive interior cleaning focused on surfaces, seats, crevices, mats, and glass.',items:['Full vacuum including cracks and crevices','Steam cleaning all vents and hard surfaces','All hard surfaces scrubbed and cleaned','Seat cleaning / leather upholstery','Floor mat removal and cleaning','All crevices cleaned and blown out with air','Door-jamb cleaning','Interior window cleaning']}
    ],
    exterior:[
      {id:'mini-exterior',name:'Mini Exterior Detail',price:95,mins:60,desc:'A light exterior refresh for vehicles in generally good condition.',items:['Wheel and tire cleaning / tire shine','Bug removal','Snow foam hand wash','Exterior window cleaning'],note:'Vehicles with excessive dirt and grime may require a more comprehensive service.'},
      {id:'full-exterior',name:'Full Exterior Detail',price:150,mins:120,desc:'A deeper exterior clean with added paint and trim protection.',items:['Wheel and tire cleaning / dressing','Wheel well cleaning / dressing','Bug and tar removal','Snow foam hand wash','Exterior window cleaning','3-month paint protection sealant','Exterior plastics dressed with UV protection']}
    ],
    both:[
      {id:'mini-bundle',name:'Mini Interior + Exterior',price:160,mins:120,desc:'Complete light interior and exterior refresh in one appointment.',items:['MINI EXTERIOR: wheel/tire cleaning + tire shine, bug removal, snow foam hand wash, exterior windows','MINI INTERIOR: light vacuum, interior windows, hard-surface wipe-down, light seat/leather cleaning, light door-jamb wipe-down','$30 bundle savings'],note:'Mini details are intended for vehicles in generally good condition requiring only light cleaning.'},
      {id:'full-bundle',name:'Full Interior + Exterior',price:325,mins:240,desc:'Complete interior and exterior detail with added exterior protection.',items:['FULL EXTERIOR: wheel/tire cleaning + dressing, wheel wells, bug/tar removal, snow foam hand wash, exterior windows, 3-month sealant, UV dressing','FULL INTERIOR: full vacuum, steam cleaning, scrubbed hard surfaces, seat/leather cleaning, floor mats, crevices, door jambs, interior windows','$50 bundle savings']}
    ]
  },
  large:{
    interior:[
      {id:'mini-interior',name:'Mini Interior Detail',price:95,mins:60,desc:'A light interior reset for trucks and three-row SUVs.',items:['Light vacuum including cracks and crevices','Interior window cleaning','All hard surfaces wiped down','Light seat cleaning / leather upholstery','Light door-jamb wipe down']},
      {id:'full-interior',name:'Full Interior Detail',price:275,mins:180,desc:'A comprehensive interior detail with added time for larger cabins and third-row seating.',items:['Full vacuum including cracks and crevices','Steam cleaning all vents and hard surfaces','All hard surfaces scrubbed and cleaned','Seat cleaning / leather upholstery','Floor mat removal and cleaning','All crevices cleaned and blown out with air','Door-jamb cleaning','Interior window cleaning']}
    ],
    exterior:[
      {id:'mini-exterior',name:'Mini Exterior Detail',price:95,mins:60,desc:'A light exterior refresh for trucks and three-row SUVs.',items:['Wheel and tire cleaning / tire shine','Bug removal','Snow foam hand wash','Exterior window cleaning']},
      {id:'full-exterior',name:'Full Exterior Detail',price:175,mins:120,desc:'A deeper exterior clean with added paint and trim protection.',items:['Wheel and tire cleaning / dressing','Wheel well cleaning / dressing','Bug and tar removal','Snow foam hand wash','Exterior window cleaning','3-month paint protection sealant','Exterior plastics dressed with UV protection']}
    ],
    both:[
      {id:'mini-bundle',name:'Mini Interior + Exterior',price:160,mins:120,desc:'Complete light interior and exterior refresh in one appointment.',items:['MINI EXTERIOR: wheel/tire cleaning + tire shine, bug removal, snow foam hand wash, exterior windows','MINI INTERIOR: light vacuum, interior windows, hard-surface wipe-down, light seat/leather cleaning, light door-jamb wipe-down','$30 bundle savings']},
      {id:'full-bundle',name:'Full Interior + Exterior',price:400,mins:300,desc:'Complete interior and exterior detail for a truck or three-row SUV.',items:['FULL EXTERIOR: wheel/tire cleaning + dressing, wheel wells, bug/tar removal, snow foam hand wash, exterior windows, 3-month sealant, UV dressing','FULL INTERIOR: full vacuum, steam cleaning, scrubbed hard surfaces, seat/leather cleaning, floor mats, crevices, door jambs, interior windows','$50 bundle savings']}
    ]
  }
};

const addons=[
  {id:'sealant',cat:'exterior',name:'Paint Protection Sealant',price:30,mins:30,desc:'Similar to traditional waxes, this durable coating boosts shine and helps guard against UV rays, dirt, road grime, and water spots for up to three months with proper care.'},
  {id:'clay',cat:'exterior',name:'Clay Bar Treatment',price:45,mins:30,desc:'Removes embedded contaminants regular washing cannot, such as industrial fallout, tree sap, brake dust, and overspray. Leaves paint smoother and better prepared for protection.'},
  {id:'engine',cat:'exterior',name:'Engine Bay Detail',price:45,mins:30,desc:'Safely removes built-up dust, dirt, grease, and grime from under the hood, then conditions plastic and rubber components for a fresh, detailed finish.'},
  {id:'wheelwell',cat:'exterior',name:'Wheel Well Cleaning',price:45,mins:30,desc:'Removes built-up mud, road grime, salt, and debris from wheel wells for a cleaner, more finished appearance.'},
  {id:'enhance',cat:'exterior',name:'Paint Enhancement',vehiclePrice:{standard:190,large:285},vehicleMins:{standard:120,large:180},desc:'A light polishing service designed to improve gloss and overall appearance. Helps reduce the look of minor swirl marks, light scratches, and dullness.'},
  {id:'correction',cat:'quote',name:'Paint Correction',quote:true,minsLabel:'Approx. 8–10 hours',desc:'Machine polishing used to remove or significantly reduce deeper swirl marks, scratches, oxidation, and other paint imperfections. Final price depends on paint condition.'},
  {id:'ceramic',cat:'quote',name:'Ceramic Coating',quote:true,minsLabel:'Duration TBD',desc:'A long-lasting protective layer that bonds to your paint and helps repel water, dirt, road grime, UV rays, and light chemical contaminants.'},
  {id:'carpet',cat:'interior',name:'Carpet Shampoo & Heated Extraction',price:95,mins:60,desc:'Deep-cleans carpets with shampoo and heated extraction to lift dirt, odors, and embedded grime.'},
  {id:'fabricseat',cat:'interior',name:'Fabric Seat Shampoo & Heated Extraction',perUnit:18,minsPerUnit:15,unit:'seat',desc:'Deep-cleans fabric seats with shampoo and heated extraction to lift dirt, odors, and embedded grime.'},
  {id:'leatherseat',cat:'interior',name:'Leather Seat Cleaning & Conditioning',perUnit:18,minsPerUnit:12,unit:'seat',desc:'Gently removes dirt, body oils, and buildup, then conditions leather to help protect against drying and cracking.'},
  {id:'floormat',cat:'interior',name:'Carpet Floor Mat Deep Cleaning',perUnit:15,minsPerUnit:12,unit:'mat',desc:'Shampoos carpet floor mats and uses heated extraction to lift dirt, odors, embedded grime, and common stains.'},
  {id:'steam',cat:'interior',name:'Steam Cleaning – Hard Surfaces',price:45,mins:30,desc:'Uses steam to deep-clean and refresh hard interior surfaces, vents, panels, cupholders, and other high-touch areas.'},
  {id:'headliner',cat:'interior',name:'Headliner Spot Cleaning',price:40,mins:30,desc:'Gently targets stains, marks, and buildup on the headliner without over-saturating the delicate overhead material.'},
  {id:'odor',cat:'interior',name:'Odor Elimination Treatment',price:40,mins:30,desc:'Targets lingering odors from food, smoke, pets, and everyday use and includes ozone treatment.'},
  {id:'pethair',cat:'interior',name:'Heavy Pet Hair Removal',price:95,mins:60,desc:'Reserved for heavy pet-hair saturation. Removes stubborn hair from seats, carpets, mats, and hard-to-reach areas. Priced per hour.'},
  {id:'carseat',cat:'interior',name:'Child Car Seat Cleaning',perUnit:20,unit:'car seat',minsPerUnit:18,desc:'Detailed cleaning for child car seats including vacuuming, spot treatment, and steam cleaning of fabric and hard surfaces.'}
];

function money(n){return '$'+Math.round(n||0)}
function vehicleTier(){return vehicles[state.vehicle]?.tier||state.vehicle}
function timeText(m){
  if(!m)return '—';
  const h=Math.floor(m/60),r=Math.round(m%60);
  return h?(r?`${h} hr ${r} min`:`${h} hr`):`${r} min`
}
function currentPackage(){
  if(!state.vehicle||!state.serviceType) return null;
  const arr=packages[vehicleTier()]?.[state.serviceType]||[];
  return arr.find(x=>x.id===state.pkg)||null
}
function addonPrice(a,val){
  const q=typeof val==='number'?val:1;
  if(a.quote)return 0;
  if(a.vehiclePrice)return a.vehiclePrice[vehicleTier()]||0;
  if(a.perUnit)return a.perUnit*q;
  return a.price||0
}
function addonMins(a,val){
  const q=typeof val==='number'?val:1;
  if(a.quote)return 0;
  if(a.vehicleMins)return a.vehicleMins[vehicleTier()]||0;
  if(a.minsPerUnit)return a.minsPerUnit*q;
  return a.mins||0
}
function totals(){
  const p=currentPackage(); let price=p?.price||0,mins=p?.mins||0,quote=false;
  Object.entries(state.addons).forEach(([id,val])=>{
    if(!val)return; const a=addons.find(x=>x.id===id); if(!a)return;
    if(a.quote){quote=true;return}
    price+=addonPrice(a,val); mins+=addonMins(a,val);
  });
  return {price,mins,quote}
}
function updateSummary(){
  const p=currentPackage(),t=totals();
  document.getElementById('sumLine').textContent=[vehicles[state.vehicle]?.name,p?.name].filter(Boolean).join(' • ')||'Start your booking';
  document.getElementById('sumPrice').textContent=money(t.price)+(t.quote?' + quote':'');
  document.getElementById('sumTime').textContent=timeText(t.mins)+(t.quote?' + TBD':'');
}
function renderProgress(){
  const p=document.getElementById('progress');p.innerHTML='';
  for(let i=1;i<=7;i++){const s=document.createElement('span');if(i<=state.step)s.className='on';p.appendChild(s)}
}
function go(step){
  state.step=step;
  document.querySelectorAll('.step').forEach(el=>el.classList.toggle('active',Number(el.dataset.step)===step));
  renderProgress();
  updateSummary();

  const active=document.querySelector(`.step[data-step="${step}"]`);
  if(active){
    requestAnimationFrame(()=>{
      active.scrollIntoView({behavior:'smooth',block:'start'});
    });
  }
}
function renderVehicles(){
  const g=document.getElementById('vehicleGrid');g.innerHTML='';
  Object.entries(vehicles).forEach(([id,v])=>{
    const c=document.createElement('div');c.className='card choice'+(state.vehicle===id?' selected':'');
    c.innerHTML=`<div class="icon">${v.icon}</div><h2>${v.name}</h2><p>${v.desc}</p>`;
    c.onclick=()=>{
      state.vehicle=id;
      state.serviceType=null;
      state.pkg=null;
      state.addons={};
      state.date=null;
      state.time=null;

      // Show the selected state briefly, then move directly into Step 2.
      document.getElementById('vehicleNext').disabled=false;
      renderVehicles();
      updateSummary();

      setTimeout(()=>{
        renderServiceTypes();
        go(2);
      },180);
    };
    g.appendChild(c)
  })
}
function renderServiceTypes(){
  const g=document.getElementById('serviceTypeGrid');g.innerHTML='';
  const v=state.vehicle;
  let opts=[];
  if(vehicleTier()==='standard'||vehicleTier()==='large'){
    opts=[
      {id:'interior',name:'Interior',desc:'Choose Mini Interior or Full Interior.'},
      {id:'exterior',name:'Exterior',desc:'Choose Mini Exterior or Full Exterior.'},
      {id:'both',name:'Interior + Exterior',desc:'Book both together and automatically receive your bundle savings.'}
    ];
  }else if(v==='motorcycle'){
    opts=[{id:'exterior',name:'Exterior',desc:'Motorcycle exterior detail.'}]
  }else if(v==='utv'){
    opts=[{id:'exterior',name:'Exterior',desc:'UTV exterior detail.'},{id:'both',name:'Interior + Exterior',desc:'Complete UTV detail.'}]
  }else if(v==='boat'||v==='rv'){
    opts=[{id:'interior',name:'Interior',desc:'Interior service.'},{id:'exterior',name:'Exterior',desc:'Exterior service.'},{id:'both',name:'Interior + Exterior',desc:'Complete inside-and-out service.'}]
  }
  opts.forEach(o=>{
    const c=document.createElement('div');c.className='card choice'+(state.serviceType===o.id?' selected':'');
    c.innerHTML=`<h2>${o.name}</h2><p>${o.desc}</p>`;
    c.onclick=()=>{
      state.serviceType=o.id;
      state.pkg=null;
      state.addons={};
      document.getElementById('typeNext').disabled=false;
      renderServiceTypes();
      updateSummary();

      setTimeout(()=>{
        renderPackages();
        go(3);
      },180);
    };
    g.appendChild(c)
  });
  document.getElementById('typeNext').disabled=!state.serviceType;
}
function specialPackages(){
  const v=vehicleTier(),t=state.serviceType;
  if(v==='motorcycle'){
    return [{id:'moto',name:'Motorcycle Exterior Detail',price:95,mins:60,desc:'A careful exterior detail for your motorcycle.',items:['Wheel and tire cleaning / tire shine','Pre-wash','Bug removal','Snow foam hand wash','Exterior surface and glass cleaning']}]
  }
  if(v==='utv'){
    if(t==='exterior')return [{id:'utv-ext',name:'UTV Exterior Detail',price:95,mins:120,desc:'An exterior clean for your side-by-side or UTV.',items:['Wheel and tire cleaning / tire shine','Pre-wash','Bug removal','Snow foam hand wash','Exterior window cleaning']}]
    return [{id:'utv-full',name:'UTV Interior + Exterior Detail',price:180,mins:120,desc:'A complete inside-and-out detail for your side-by-side.',items:['Exterior wash and cleaning','Full vacuum','Interior glass cleaning','Hard surfaces scrubbed and cleaned','Seat cleaning','Crevice cleaning and blow-out']}]
  }
  if(v==='boat'){
    const name=t==='both'?'Boat Interior + Exterior Detail':`Boat ${t[0].toUpperCase()+t.slice(1)} Detail`;
    return [{id:'boat-special',name,price:0,mins:0,desc:'Boat pricing is based on linear feet. Final duration is confirmed based on size and condition.',items:['Length-based pricing','Final timing confirmed after size/condition review'],special:'Boat calculator will be connected in production.'}]
  }
  if(v==='rv'){
    const map={exterior:{name:'Exterior Detail',perFt:10,minsPer10:45},interior:{name:'Interior Detail',perFt:20,minsPer10:45},both:{name:'Interior + Exterior Detail',perFt:30,minsPer10:90}};
    const x=map[t];
    return [{id:'rv-special',name:x.name,price:0,mins:0,desc:`${money(x.perFt)} per linear foot. ${x.minsPer10} minutes per 10 feet.`,items:['Length-based pricing and duration','Live website calculator in production'],special:'RV length calculator will be connected in production.'}]
  }
  return [];
}
function renderPackages(){
  const g=document.getElementById('packageGrid');g.innerHTML='';
  document.getElementById('packageLead').textContent=`Showing ${state.serviceType} options for ${vehicles[state.vehicle].name}.`;
  const arr=(packages[vehicleTier()]?.[state.serviceType])||specialPackages();
  arr.forEach(p=>{
    const c=document.createElement('div');c.className='card choice'+(state.pkg===p.id?' selected':'');
    c.innerHTML=`<h2>${p.name}</h2><div class="meta">${p.price?`<span class="pill blue">${money(p.price)}</span>`:'<span class="pill blue">Calculated by size</span>'}${p.mins?`<span class="pill">${timeText(p.mins)}</span>`:'<span class="pill">Time based on size</span>'}</div><p>${p.desc}</p><ul class="list">${(p.items||[]).map(i=>`<li>${i}</li>`).join('')}</ul>${p.note?`<div class="note">${p.note}</div>`:''}${p.special?`<div class="note">${p.special}</div>`:''}`;
    c.dataset.package=p.id||p.name;
    c.onclick=()=>{
      state.pkg=p.id;
      state.addons={};
      document.getElementById('packageNext').disabled=false;
      renderPackages();
      updateSummary();

      setTimeout(()=>{
        renderAddons();
        go(4);
      },180);
    };
    g.appendChild(c)
  });
  document.getElementById('packageNext').disabled=!state.pkg;
}
function relevantAddons(){
  if(!(vehicleTier()==='standard'||vehicleTier()==='large'))return [];
  let cats=[];
  if(state.serviceType==='interior')cats=['interior'];
  if(state.serviceType==='exterior')cats=['exterior','quote'];
  if(state.serviceType==='both')cats=['interior','exterior','quote'];
  return addons.filter(a=>cats.includes(a.cat)).filter(a=>{
    if((state.pkg==='full-exterior'||state.pkg==='full-bundle')&&['sealant','wheelwell'].includes(a.id))return false;
    return true;
  })
}
function renderAddonCard(a){
  const val=state.addons[a.id]||0;
  const selected=!!val;
  const priceLabel=a.quote?'Request estimate':a.vehiclePrice?money(a.vehiclePrice[vehicleTier()]):a.perUnit?`${money(a.perUnit)} / ${a.unit}`:money(a.price);
  const timeLabel=a.quote?a.minsLabel:a.vehicleMins?timeText(a.vehicleMins[vehicleTier()]):a.minsPerUnit?`${a.minsPerUnit} min / ${a.unit}`:timeText(a.mins);

  const c=document.createElement('div');
  c.className='card addon-card'+(selected?' selected':'');
  c.innerHTML=`<div class="addon-top"><div><h3>${a.name}</h3><div class="meta"><span class="pill blue">${priceLabel}</span><span class="pill">${timeLabel}</span></div><p>${a.desc}</p></div>${a.perUnit?'':`<div class="add-toggle" aria-label="Select add-on"></div>`}</div>${a.perUnit?`<div class="qtyrow"><label style="margin:0">Quantity</label><input type="number" min="0" value="${val||0}" inputmode="numeric"></div>`:''}`;

  if(a.perUnit){
    const inp=c.querySelector('input');
    inp.oninput=()=>{
      const q=Math.max(0,Number(inp.value||0));
      state.addons[a.id]=q||false;
      c.classList.toggle('selected',q>0);
      updateSummary();
    };
  }else{
    c.onclick=(e)=>{
      if(e.target.closest('input'))return;
      state.addons[a.id]=!state.addons[a.id];
      renderAddons();
      updateSummary();
    };
  }
  return c;
}

function renderAddons(){
  const g=document.getElementById('addonGrid');
  g.innerHTML='';
  const note=document.getElementById('addonNote');
  const rel=relevantAddons();

  if(!rel.length){
    note.classList.remove('hidden');
    note.textContent='No additional add-ons are configured for this vehicle category. You can continue to scheduling.';
    g.style.display='grid';
    return;
  }

  note.classList.add('hidden');

  if(state.serviceType==='both'){
    g.style.display='block';

    const interior=rel.filter(a=>a.cat==='interior');
    const exterior=rel.filter(a=>a.cat==='exterior'||a.cat==='quote');

    const makeSection=(title,subtitle,items)=>{
      const section=document.createElement('section');
      section.className='addon-section';
      section.innerHTML=`<div class="addon-section-head"><div class="kicker">${title}</div><h2>${title}</h2><p>${subtitle}</p></div>`;
      const grid=document.createElement('div');
      grid.className='grid';
      items.forEach(a=>grid.appendChild(renderAddonCard(a)));
      section.appendChild(grid);
      return section;
    };

    if(interior.length) g.appendChild(makeSection(
      'Interior Add-ons',
      'Optional upgrades for the inside of your vehicle.',
      interior
    ));

    if(exterior.length) g.appendChild(makeSection(
      'Exterior Add-ons',
      'Optional upgrades for paint, wheels, protection, and the outside of your vehicle.',
      exterior
    ));
  }else{
    g.style.display='grid';
    rel.forEach(a=>g.appendChild(renderAddonCard(a)));
  }
}
function renderCalendar(){
  const g=document.getElementById('calendarDays');g.innerHTML='';
  const blanks=[30,31];
  blanks.forEach(x=>{const d=document.createElement('div');d.className='day disabled';d.textContent=x;g.appendChild(d)});
  for(let d=1;d<=30;d++){
    const btn=document.createElement('button');btn.type='button';btn.className='day'+(state.date===d?' selected':'');
    btn.textContent=d;
    // demo: all dates from Sep 3 onward available
    if(d<3){btn.classList.add('disabled');btn.disabled=true}
    btn.onclick=()=>{state.date=d;state.time=null;renderCalendar();renderTimes();document.getElementById('scheduleNext').disabled=true;updateSummary()};
    g.appendChild(btn)
  }
  [1,2,3].forEach(x=>{const d=document.createElement('div');d.className='day disabled';d.textContent=x;g.appendChild(d)})
}
function renderTimes(){
  const sec=document.getElementById('timeSection'),g=document.getElementById('timeGrid');
  if(!state.date){sec.classList.add('hidden');return}
  sec.classList.remove('hidden');
  document.getElementById('selectedDateLabel').textContent=`Available times — September ${state.date}, 2026`;
  g.innerHTML='';
  const t=totals();
  const base=['8:00 AM','11:30 AM','2:30 PM'];
  const times=t.mins>=300?['8:00 AM']:t.mins>=240?['8:00 AM','11:30 AM']:base;
  times.forEach(tm=>{
    const b=document.createElement('button');b.type='button';b.className='time-slot'+(state.time===tm?' selected':'');b.textContent=tm;
    b.onclick=()=>{state.time=tm;renderTimes();document.getElementById('scheduleNext').disabled=false};
    g.appendChild(b)
  })
}
function renderScheduleLead(){
  const t=totals();
  document.getElementById('scheduleLead').textContent=t.quote?`Your fixed-time services currently total ${timeText(t.mins)} plus quote-based work. We’ll confirm final timing before booking.`:`Your selected services total approximately ${timeText(t.mins)}. Only openings long enough for that appointment are shown.`;
}
function saveCustomer(){
  const ids=['first','last','phone','email','address','city'];
  const missing=ids.filter(id=>!document.getElementById(id).value.trim());
  if(missing.length){document.getElementById('formError').textContent='Please complete all required fields.';return false}
  document.getElementById('formError').textContent='';
  state.customer={
    first:first.value.trim(),last:last.value.trim(),phone:phone.value.trim(),email:email.value.trim(),
    address:address.value.trim(),city:city.value.trim(),year:year.value.trim(),model:model.value.trim(),
    color:color.value.trim(),contact:contact.value,notes:notes.value.trim()
  };
  return true
}
function renderReview(){
  const v=vehicles[state.vehicle],p=currentPackage()||specialPackages().find(x=>x.id===state.pkg),t=totals();
  let addonRows='';
  Object.entries(state.addons).forEach(([id,val])=>{
    if(!val)return;const a=addons.find(x=>x.id===id);if(!a)return;
    addonRows+=`<div class="reviewrow"><span>${a.name}${typeof val==='number'?` × ${val}`:''}</span><strong>${a.quote?'Estimate':money(addonPrice(a,val))}</strong></div>`;
  });
  if(!addonRows)addonRows='<div class="reviewrow"><span>Add-ons</span><strong>None</strong></div>';
  document.getElementById('reviewBooking').innerHTML=`<h2>Your detail</h2>
    <div class="reviewrow"><span>Vehicle</span><strong>${v?.name||''}</strong></div>
    <div class="reviewrow"><span>Service type</span><strong>${state.serviceType||''}</strong></div>
    <div class="reviewrow"><span>Package</span><strong>${p?.name||''}</strong></div>
    ${addonRows}
    <div class="reviewrow"><span>Date</span><strong>September ${state.date}, 2026</strong></div>
    <div class="reviewrow"><span>Time</span><strong>${state.time}</strong></div>
    <div class="totalbox"><div class="reviewrow"><span>Estimated total</span><strong>${money(t.price)}${t.quote?' + quote':''}</strong></div>
    <div class="reviewrow"><span>Estimated duration</span><strong>${timeText(t.mins)}${t.quote?' + TBD':''}</strong></div></div>`;
  document.getElementById('reviewCustomer').innerHTML=`<h2>Your information</h2>
    <div class="reviewrow"><span>Name</span><strong>${state.customer.first} ${state.customer.last}</strong></div>
    <div class="reviewrow"><span>Phone</span><strong>${state.customer.phone}</strong></div>
    <div class="reviewrow"><span>Email</span><strong>${state.customer.email}</strong></div>
    <div class="reviewrow"><span>Service location</span><strong>${state.customer.address}, ${state.customer.city}</strong></div>
    <div class="reviewrow"><span>Vehicle</span><strong>${[state.customer.year,state.customer.model,state.customer.color].filter(Boolean).join(' • ')||'—'}</strong></div>
    <div class="reviewrow"><span>Preferred contact</span><strong>${state.customer.contact}</strong></div>`;
}
document.getElementById('vehicleNext').onclick=()=>{renderServiceTypes();go(2)};
document.getElementById('typeNext').onclick=()=>{renderPackages();go(3)};
document.getElementById('packageNext').onclick=()=>{renderAddons();go(4)};
document.getElementById('addonNext').onclick=()=>{renderScheduleLead();renderCalendar();renderTimes();go(5)};
document.getElementById('scheduleNext').onclick=()=>go(6);
document.getElementById('customerNext').onclick=()=>{if(saveCustomer()){renderReview();go(7)}};
document.querySelectorAll('[data-back]').forEach(btn=>btn.onclick=()=>go(Math.max(1,state.step-1)));
document.getElementById('submitTest').onclick=()=>document.getElementById('success').classList.remove('hidden');
document.getElementById('startOver').onclick=()=>{
  Object.assign(state,{step:1,vehicle:null,serviceType:null,pkg:null,addons:{},date:null,time:null,customer:{}});
  document.querySelectorAll('input,textarea').forEach(el=>el.value='');
  document.getElementById('contact').selectedIndex=0;
  document.getElementById('vehicleNext').disabled=true;
  document.getElementById('typeNext').disabled=true;
  document.getElementById('packageNext').disabled=true;
  document.getElementById('scheduleNext').disabled=true;
  document.getElementById('success').classList.add('hidden');
  renderVehicles();go(1)
};
renderVehicles();renderProgress();updateSummary();


const wizardSteps=['vehicle','service','package','addons','schedule','info','review'];

function stepElement(name){
  const candidates=[
    document.getElementById('step-'+name),
    document.getElementById(name+'Step'),
    document.querySelector(`[data-step="${name}"]`)
  ];
  return candidates.find(Boolean);
}

function smoothToStep(name){
  const el=stepElement(name);
  if(el) setTimeout(()=>el.scrollIntoView({behavior:'smooth',block:'start'}),120);
}

function progressIndex(name){ return Math.max(0,wizardSteps.indexOf(name)); }

function setProgress(name){
  const idx=progressIndex(name);
  document.querySelectorAll('.progress-step').forEach((el,i)=>{
    el.classList.toggle('active',i===idx);
    el.classList.toggle('done',i<idx);
  });
}

function ensureStepSummary(step,nameGetter){
  const el=stepElement(step);
  if(!el) return;
  let box=el.querySelector('.completed-summary');
  if(!box){
    box=document.createElement('div');
    box.className='completed-summary hidden';
    el.prepend(box);
  }
  const label=nameGetter();
  if(!label) return;
  box.innerHTML=`<div><span class="summary-check">✓</span><strong>${label}</strong></div><button type="button" class="edit-step" data-edit="${step}">Edit</button>`;
  box.classList.remove('hidden');
}

function collapseStep(step,nextStep,labelFn){
  const el=stepElement(step);
  if(el){
    ensureStepSummary(step,labelFn);
    el.classList.add('step-complete');
  }
  setProgress(nextStep);
  smoothToStep(nextStep);
}

document.addEventListener('click',(e)=>{
  const edit=e.target.closest('.edit-step');
  if(edit){
    const step=edit.dataset.edit;
    const el=stepElement(step);
    if(el){
      el.classList.remove('step-complete');
      setProgress(step);
      smoothToStep(step);
    }
  }

  const prog=e.target.closest('.progress-step');
  if(prog && prog.dataset.progress){
    const target=prog.dataset.progress;
    const el=stepElement(target);
    if(el){
      el.classList.remove('step-complete');
      setProgress(target);
      smoothToStep(target);
    }
  }
});



document.addEventListener('click',(e)=>{
  const vehicleCard=e.target.closest('[data-vehicle]');
  if(vehicleCard){
    setTimeout(()=>{
      collapseStep('vehicle','service',()=>vehicles[state.vehicle]?.name||'Vehicle selected');
    },80);
    return;
  }

  const serviceCard=e.target.closest('[data-service]');
  if(serviceCard){
    setTimeout(()=>{
      const label=state.serviceType==='both'?'Interior + Exterior':state.serviceType==='interior'?'Interior':'Exterior';
      collapseStep('service','package',()=>label);
    },80);
    return;
  }

  const packageCard=e.target.closest('[data-package]');
  if(packageCard){
    setTimeout(()=>{
      const p=getSelectedPackage?getSelectedPackage():null;
      collapseStep('package','addons',()=>p?.name||'Package selected');
    },80);
  }
});

(() => {
  const STEPS = ['vehicle','service','package','addons','schedule','info','review'];

  function findStep(name){
    return document.getElementById('step-'+name)
      || document.getElementById(name+'Step')
      || document.querySelector(`[data-step="${name}"]`);
  }

  function scrollToStep(name){
    const el=findStep(name);
    if(!el) return;
    requestAnimationFrame(() => {
      setTimeout(() => el.scrollIntoView({behavior:'smooth', block:'start'}), 120);
    });
  }

  function progress(name){
    const idx=STEPS.indexOf(name);
    document.querySelectorAll('.progress-step').forEach((el,i)=>{
      el.classList.toggle('active',i===idx);
      el.classList.toggle('done',i<idx);
      if(i<idx) el.querySelector('span') && (el.querySelector('span').textContent='✓');
      else el.querySelector('span') && (el.querySelector('span').textContent=String(i+1));
    });
  }

  function selectedPackageName(){
    try{
      if(typeof getSelectedPackage==='function'){
        const p=getSelectedPackage();
        if(p) return p.name || p.title || 'Package selected';
      }
    }catch(e){}
    return 'Package selected';
  }

  function summaryText(step){
    if(step==='vehicle'){
      try{return vehicles[state.vehicle]?.name || 'Vehicle selected'}catch(e){return 'Vehicle selected'}
    }
    if(step==='service'){
      try{
        if(state.serviceType==='both') return 'Interior + Exterior';
        if(state.serviceType==='interior') return 'Interior';
        if(state.serviceType==='exterior') return 'Exterior';
      }catch(e){}
      return 'Service selected';
    }
    if(step==='package') return selectedPackageName();
    return 'Completed';
  }

  function addSummary(step){
    const el=findStep(step);
    if(!el) return;
    let box=el.querySelector('.completed-summary');
    if(!box){
      box=document.createElement('div');
      box.className='completed-summary';
      el.prepend(box);
    }
    box.innerHTML=`
      <div class="completed-summary-left">
        <span class="summary-check">✓</span>
        <div><small>${step.charAt(0).toUpperCase()+step.slice(1)}</small><strong>${summaryText(step)}</strong></div>
      </div>
      <button type="button" class="edit-step" data-edit-step="${step}">Edit</button>`;
  }

  function complete(step,next){
    const el=findStep(step);
    if(el){
      addSummary(step);
      el.classList.add('guided-complete');
    }
    const nextEl=findStep(next);
    if(nextEl){
      nextEl.classList.add('guided-reveal');
      progress(next);
      scrollToStep(next);
    }
  }

  function edit(step){
    const idx=STEPS.indexOf(step);
    STEPS.forEach((s,i)=>{
      const el=findStep(s);
      if(el && i>=idx) el.classList.remove('guided-complete');
    });
    progress(step);
    scrollToStep(step);
  }

  // Observe the actual state after existing click handlers run.
  document.addEventListener('click',(event)=>{
    const editBtn=event.target.closest('[data-edit-step]');
    if(editBtn){
      event.preventDefault();
      event.stopPropagation();
      edit(editBtn.dataset.editStep);
      return;
    }

    const before={
      vehicle: window.state?.vehicle,
      service: window.state?.serviceType,
      package: window.state?.packageId || window.state?.package || window.state?.pkg
    };

    setTimeout(()=>{
      if(window.state?.vehicle && window.state.vehicle!==before.vehicle){
        complete('vehicle','service');
        return;
      }
      if(window.state?.serviceType && window.state.serviceType!==before.service){
        complete('service','package');
        return;
      }
      const pkg=window.state?.packageId || window.state?.package || window.state?.pkg;
      if(pkg && pkg!==before.package){
        complete('package','addons');
      }
    }, 40);
  }, true);

  // Progress buttons become navigation shortcuts to completed/available steps.
  document.addEventListener('click',(event)=>{
    const btn=event.target.closest('.progress-step');
    if(!btn) return;
    const name=btn.dataset.progress;
    if(name && findStep(name)) edit(name);
  });

  // Add "Why customers choose this" benefits to package cards after they're rendered.
  function addPackageBenefits(){
    const root=findStep('package');
    if(!root) return;
    root.querySelectorAll('.card').forEach(card=>{
      if(card.querySelector('.package-benefits')) return;
      const benefits=document.createElement('div');
      benefits.className='package-benefits';
      benefits.innerHTML=`
        <div class="benefit-title">Why customers choose this</div>
        <div>✓ Clear upfront pricing</div>
        <div>✓ Professional mobile service</div>
        <div>✓ Built around your vehicle type</div>`;
      card.appendChild(benefits);
    });
  }

  const packageRoot=findStep('package');
  if(packageRoot){
    new MutationObserver(addPackageBenefits).observe(packageRoot,{childList:true,subtree:true});
    addPackageBenefits();
  }

  // Review-page reassurance banner.
  function addReviewBanner(){
    const review=findStep('review');
    if(!review || review.querySelector('.review-ready-banner')) return;
    const banner=document.createElement('div');
    banner.className='review-ready-banner';
    banner.innerHTML=`
      <span class="review-ready-check">✓</span>
      <div>
        <strong>Almost done.</strong>
        <p>Review your detail, appointment information, and total below before submitting.</p>
      </div>`;
    review.prepend(banner);
  }
  addReviewBanner();

  // Start at vehicle.
  progress('vehicle');
})();


/* Beastman booking persistence + inspection acknowledgement */
const BEASTMAN_BOOKING_STORAGE_KEY = 'beastmanBookingStateV1';

function saveBookingState(){
  try{
    localStorage.setItem(BEASTMAN_BOOKING_STORAGE_KEY, JSON.stringify(state));
  }catch(e){}
}

function restoreBookingState(){
  try{
    const raw = localStorage.getItem(BEASTMAN_BOOKING_STORAGE_KEY);
    if(!raw) return;
    const saved = JSON.parse(raw);
    if(saved && typeof saved === 'object'){
      Object.assign(state, saved);
    }
  }catch(e){}
}

function clearBookingState(){
  try{ localStorage.removeItem(BEASTMAN_BOOKING_STORAGE_KEY); }catch(e){}
}

function updateInspectionSubmitState(){
  const ack = document.getElementById('inspectionAck');
  if(!ack) return;

  const submit =
    document.getElementById('submitBooking') ||
    document.querySelector('button[type="submit"]') ||
    [...document.querySelectorAll('button')].find(b => /book|submit|confirm/i.test(b.textContent||''));

  if(submit){
    submit.disabled = !ack.checked;
    submit.classList.toggle('disabled-by-ack', !ack.checked);
  }
}

document.addEventListener('change', (e)=>{
  if(e.target && e.target.id === 'inspectionAck'){
    updateInspectionSubmitState();
  }
  setTimeout(saveBookingState, 0);
});

document.addEventListener('input', ()=>{
  setTimeout(saveBookingState, 0);
});

document.addEventListener('click', ()=>{
  setTimeout(saveBookingState, 50);
});

window.addEventListener('beforeunload', saveBookingState);

document.addEventListener('DOMContentLoaded', ()=>{
  restoreBookingState();

  try{
    if(typeof renderVehicles === 'function') renderVehicles();
    if(typeof renderServiceTypes === 'function') renderServiceTypes();
    if(typeof renderPackages === 'function') renderPackages();
    if(typeof renderAddons === 'function') renderAddons();
    if(typeof renderCalendar === 'function') renderCalendar();
    if(typeof renderProgress === 'function') renderProgress();
    if(typeof updateSummary === 'function') updateSummary();
  }catch(e){}

  const ack = document.getElementById('inspectionAck');
  if(ack){
    ack.checked = false;
    ack.addEventListener('change', updateInspectionSubmitState);
    updateInspectionSubmitState();
  }
});
