const VERSION='__CUIUDO_VERSION__',CACHE='cuiudo-library-'+VERSION,SHELL=__CUIUDO_SHELL__;
const scoped=file=>new URL(file,self.registration.scope).href;
self.addEventListener('install',event=>event.waitUntil((async()=>{const cache=await caches.open(CACHE);for(const file of SHELL){const response=await fetch(scoped(file),{cache:'reload'});if(!response.ok)throw Error('Não foi possível preparar '+file);await cache.put(scoped(file),response)}await self.skipWaiting()})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{await self.clients.claim();for(const name of await caches.keys())if(name.startsWith('cuiudo-library-')&&name!==CACHE)await caches.delete(name)})()));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 event.respondWith((async()=>{
  const url=new URL(event.request.url),sameOrigin=url.origin===self.location.origin;
  const staticRequest=['script','style','image','font','audio','video'].includes(event.request.destination)||/\.(?:m?js|css|png|jpe?g|webp|gif|svg|ico|woff2?|ttf|otf|glb|gltf)$/i.test(url.pathname);
  if(!sameOrigin&&(!staticRequest||event.request.headers.has('authorization')))return fetch(event.request);
  const cache=await caches.open(CACHE),cached=await cache.match(event.request);
  if(!sameOrigin){if(cached)return cached;const response=await fetch(event.request);if(response.ok||response.type==='opaque')await cache.put(event.request,response.clone());return response}
  if(!self.navigator.onLine&&cached)return cached;
  try{const response=await fetch(event.request);if(response.ok)await cache.put(event.request,response.clone());else if(response.status>=500&&cached)return cached;return response}catch(error){if(cached)return cached;if(event.request.mode==='navigate'&&(url.pathname.endsWith('/')||url.pathname.endsWith('index.html')||url.pathname.endsWith('indice_resumos.html'))){const shell=await cache.match(scoped('index.html'));if(shell)return shell}throw error}
 })());
});
self.addEventListener('message',event=>{
 if(event.data?.type!=='CACHE_LIBRARY')return;
 const port=event.ports[0];event.waitUntil((async()=>{const cache=await caches.open(CACHE),items=[...new Set(event.data.files)].filter(file=>{try{const u=new URL(file,self.registration.scope);return u.protocol==='https:'||u.origin===self.location.origin}catch{return false}}),failed=[];let next=0,done=0;
  async function worker(){while(next<items.length){const item=items[next++],url=new URL(item,self.registration.scope);try{let response;try{response=await fetch(url.href,{cache:'reload',mode:url.origin===self.location.origin?'same-origin':'cors'})}catch{response=await fetch(url.href,{mode:'no-cors'})}if(!response.ok&&response.type!=='opaque')throw Error('HTTP '+response.status);await cache.put(url.href,response);if(/text\/css/i.test(response.headers.get('content-type')||'')){const css=await(await cache.match(url.href)).text();for(const match of css.matchAll(/url\(\s*['"]?([^)'"\s]+)['"]?\s*\)/g)){if(match[1].startsWith('data:'))continue;try{const asset=new URL(match[1],url);const font=await fetch(asset.href,{mode:'cors'});if(font.ok)await cache.put(asset.href,font)}catch{}}}}catch{failed.push({file:item,required:url.origin===self.location.origin})}done++;port?.postMessage({done,total:items.length})}}
  await Promise.all([worker(),worker(),worker()]);port?.postMessage({complete:true,failed,version:VERSION});
 })());
});
