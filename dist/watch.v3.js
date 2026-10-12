(function(root){
 const limit=2700;
 function orderForDay(items,start,today){const d=Math.max(0,Math.floor((new Date(today+'T12:00:00')-new Date(start+'T12:00:00'))/86400000));let ordered=[...items];if(Math.floor(d/items.length)%2)ordered.reverse();const offset=d%items.length;return ordered.slice(offset).concat(ordered.slice(0,offset))}
 function countSeconds(total,last,current,seeking=false){if(seeking||!Number.isFinite(current)||!Number.isFinite(last))return total;const delta=current-last;return delta>=0&&delta<=5?Math.min(limit,total+delta):total}
 function normalizeWatch(v,date,ids){if(!v||v.date!==date||!Array.isArray(v.order)||v.order.length!==ids.length||new Set(v.order).size!==ids.length||v.order.some(id=>!ids.includes(id)))return null;return {date,order:v.order,index:Number.isInteger(v.index)&&v.index>=0&&v.index<ids.length?v.index:0,part:Number.isInteger(v.part)&&v.part>=0&&v.part<12?v.part:0,position:Number.isFinite(v.position)&&v.position>=0?v.position:0,elapsed:Number.isFinite(v.elapsed)?Math.max(0,Math.min(limit,v.elapsed)):0}}
 root.WatchMath={limit,orderForDay,countSeconds,normalizeWatch};if(typeof module!=='undefined')module.exports=root.WatchMath;
})(typeof globalThis!=='undefined'?globalThis:this);
