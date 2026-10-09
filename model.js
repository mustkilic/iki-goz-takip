(function(root){
  const dateKey=(d=new Date())=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  const parseDate=s=>new Date(s+'T12:00:00');
  function addMonths(s,n){const d=parseDate(s);const day=d.getDate();d.setDate(1);d.setMonth(d.getMonth()+n);d.setDate(Math.min(day,new Date(d.getFullYear(),d.getMonth()+1,0).getDate()));return dateKey(d)}
  const formatDate=s=>parseDate(s).toLocaleDateString('tr-TR',{day:'numeric',month:'long',year:'numeric'});
  const validDate=s=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&dateKey(parseDate(s))===s;
  function normalize(x){const defaults={eye:'left',start:dateKey(),headset:'Trust Exa 21494',minutes:null,prescribed:false,extension:false,note:'',records:[]};if(!x||typeof x!=='object')return defaults;return {...defaults,eye:x.eye==='right'?'right':'left',start:validDate(x.start)?x.start:defaults.start,headset:typeof x.headset==='string'?x.headset.slice(0,100):defaults.headset,minutes:Number.isInteger(x.minutes)&&x.minutes>=1&&x.minutes<=180?x.minutes:null,prescribed:x.prescribed===true,extension:x.extension===true,note:typeof x.note==='string'?x.note.slice(0,2000):'',records:Array.isArray(x.records)?x.records.filter(r=>r&&validDate(r.date)&&Number.isFinite(r.minutes)&&r.minutes>0&&r.minutes<=180).map(r=>({date:r.date,minutes:r.minutes,note:typeof r.note==='string'?r.note.slice(0,2000):'',id:typeof r.id==='string'?r.id:Math.random().toString(36).slice(2)})):[]}}
  const clamp=(v,a,b,fallback)=>Number.isFinite(v)?Math.max(a,Math.min(b,v)):fallback;
  function normalizeLayout(v){v=v&&typeof v==='object'?v:{};const point=p=>({x:clamp(p?.x,.25,.75,.5),y:clamp(p?.y,.25,.75,.5)});return {left:point(v.left),right:point(v.right),size:clamp(v.size,.35,.8,.6),aspect:clamp(v.aspect,1,4,0),saved:v.saved===true}}
  const normalizeBase=normalize;
  root.GoZ={dateKey,addMonths,formatDate,validDate,normalizeLayout,normalize:x=>({...normalizeBase(x),layout:normalizeLayout(x?.layout)})};if(typeof module!=='undefined')module.exports=root.GoZ;
})(typeof globalThis!=='undefined'?globalThis:this);
