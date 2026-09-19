const DB_NAME="OfflineVideoDB", STORE="videos";
let db;

const $=id=>document.getElementById(id);

function openDB(){
 return new Promise((resolve,reject)=>{
  const r=indexedDB.open(DB_NAME,1);
  r.onupgradeneeded=()=>r.result.createObjectStore(STORE,{keyPath:"id",autoIncrement:true});
  r.onsuccess=()=>{db=r.result;resolve()};
  r.onerror=()=>reject(r.error);
 });
}
function allVideos(){
 return new Promise((resolve,reject)=>{
  const r=db.transaction(STORE,"readonly").objectStore(STORE).getAll();
  r.onsuccess=()=>resolve(r.result);
  r.onerror=()=>reject(r.error);
 });
}
function addVideo(v){
 return new Promise((resolve,reject)=>{
  const r=db.transaction(STORE,"readwrite").objectStore(STORE).add(v);
  r.onsuccess=()=>resolve(r.result);
  r.onerror=()=>reject(r.error);
 });
}
function removeVideo(id){
 return new Promise((resolve,reject)=>{
  const r=db.transaction(STORE,"readwrite").objectStore(STORE).delete(id);
  r.onsuccess=resolve;r.onerror=()=>reject(r.error);
 });
}
function clearVideos(){
 return new Promise((resolve,reject)=>{
  const r=db.transaction(STORE,"readwrite").objectStore(STORE).clear();
  r.onsuccess=resolve;r.onerror=()=>reject(r.error);
 });
}
function fileName(url){
 try{return decodeURIComponent(new URL(url).pathname.split("/").pop())||"Video"}catch{return "Video"}
}
function render(){
 allVideos().then(items=>{
  const box=$("videos"); box.innerHTML="";
  if(!items.length){box.innerHTML='<p class="muted">No downloaded videos yet.</p>';return}
  items.reverse().forEach(item=>{
   const div=document.createElement("div");div.className="video";
   const video=document.createElement("video");video.controls=true;video.playsInline=true;
   const blobUrl=URL.createObjectURL(item.blob); video.src=blobUrl;
   const meta=document.createElement("div");meta.className="meta";
   const name=document.createElement("span");name.className="name";name.textContent=item.name;
   const del=document.createElement("button");del.className="delete";del.textContent="Delete";
   del.onclick=async()=>{await removeVideo(item.id);URL.revokeObjectURL(blobUrl);render()};
   meta.append(name,del);div.append(video,meta);box.append(div);
  });
 });
}

$("download").onclick=async()=>{
 const url=$("url").value.trim();
 const status=$("status");
 if(!url){status.className="err";status.textContent="Paste a direct video URL first.";return}
 try{
  new URL(url);
 }catch{status.className="err";status.textContent="Invalid URL.";return}
 status.className="";status.textContent="Downloading...";
 $("download").disabled=true;
 try{
  const res=await fetch(url);
  if(!res.ok) throw new Error("Server returned "+res.status);
  const type=res.headers.get("content-type")||"";
  if(!type.startsWith("video/") && !/\.(mp4|webm|ogg)(\?|$)/i.test(url))
   throw new Error("This does not look like a direct video file.");
  const blob=await res.blob();
  await addVideo({name:fileName(url),blob,type:blob.type||type,created:Date.now()});
  $("url").value="";
  status.className="ok";status.textContent="Saved for offline playback.";
  render();
 }catch(e){
  status.className="err";
  status.textContent="Download failed. The server may block browser downloads (CORS) or the URL may not be a direct video file.";
 }finally{$("download").disabled=false}
};

$("clear").onclick=async()=>{if(confirm("Delete all saved videos?")){await clearVideos();render()}};

openDB().then(render).catch(()=>{$("status").textContent="Local storage is unavailable in this browser."});
