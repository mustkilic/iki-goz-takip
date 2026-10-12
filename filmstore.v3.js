(function(root){
  const DB='ikigoz-film-files-1080';
  const urls=new Map();
  function openDb(){return new Promise((ok,bad)=>{const r=indexedDB.open(DB,1);r.onupgradeneeded=()=>{r.result.createObjectStore('files')};r.onsuccess=()=>ok(r.result);r.onerror=()=>bad(r.error)})}
  function req(request){return new Promise((ok,bad)=>{request.onsuccess=()=>ok(request.result);request.onerror=()=>bad(request.error)})}
  function done(tx){return new Promise((ok,bad)=>{tx.oncomplete=()=>ok();tx.onerror=()=>bad(tx.error);tx.onabort=()=>bad(tx.error)})}
  async function row(id){const d=await openDb();return req(d.transaction('files','readonly').objectStore('files').get(id))}
  async function has(id){const item=await row(id);return !!(item&&item.blob&&item.blob.size>100000)}
  async function objectUrl(id){if(urls.has(id))return urls.get(id);const item=await row(id);if(!item?.blob)return null;const url=URL.createObjectURL(item.blob);urls.set(id,url);return url}
  function pieces(film){const list=film.parts&&film.parts.length?film.parts:[film.url];return list.map((url,i)=>({id:url,url,title:film.title+' · parça '+(i+1)+'/'+list.length}))}
  async function countReady(films){let n=0;for(const film of films){let ok=true;for(const piece of pieces(film)){if(!(await has(piece.id)))ok=false}if(ok)n++}return n}
  async function downloadOne(film,onProgress){const res=await fetch(film.url);if(!res.ok||!res.body)throw new Error('İndirilemedi');const total=Number(res.headers.get('content-length'))||0;const reader=res.body.getReader();const parts=[];let got=0;while(true){const step=await reader.read();if(step.done)break;parts.push(step.value);got+=step.value.byteLength;if(onProgress)onProgress(got,total)}const blob=new Blob(parts,{type:'video/mp4'});if(blob.size<100000)throw new Error('Dosya eksik indi');const d=await openDb();const tx=d.transaction('files','readwrite');tx.objectStore('files').put({blob,size:blob.size,savedAt:Date.now()},film.id);await done(tx)}
  async function saveAll(films,onStatus){if(!navigator.storage||!navigator.storage.persist){const err=new Error('unsupported');err.code='unsupported';throw err}const granted=await navigator.storage.persist();if(!granted){const err=new Error('denied');err.code='denied';throw err}const jobs=films.flatMap(pieces);for(let i=0;i<jobs.length;i++){const job=jobs[i];if(await has(job.id)){if(onStatus)onStatus({index:i,total:jobs.length,title:job.title,skipped:true,done:true});continue}await downloadOne(job,(got,size)=>onStatus&&onStatus({index:i,total:jobs.length,title:job.title,got,size,done:false}));if(onStatus)onStatus({index:i,total:jobs.length,title:job.title,done:true})}}
  root.FilmStore={has,objectUrl,countReady,saveAll,persisted:()=>navigator.storage&&navigator.storage.persisted?navigator.storage.persisted():Promise.resolve(false)};
})(typeof globalThis!=='undefined'?globalThis:this);
