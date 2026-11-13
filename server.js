// npm i ws && node server.js
const http=require('http'),fs=require('fs'),path=require('path'),{WebSocketServer}=require('ws');
const s=http.createServer((q,r)=>{const f=path.join(__dirname,q.url==='/'?'index.html':path.basename(q.url.split('?')[0]));
fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);return r.end()}r.writeHead(200,{'Content-Type':f.endsWith('.js')?'text/javascript':'text/html'});r.end(d)})});
const w=new WebSocketServer({server:s});let n=0;
w.on('connection',c=>{c._socket.setNoDelay(true);c.id=++n;c.send(JSON.stringify({t:'id',id:c.id}));
c.on('message',m=>{m=m.toString();for(const o of w.clients)if(o!==c&&o.readyState===1)o.send(m)});
c.on('close',()=>{const b=JSON.stringify({t:'bye',id:c.id});for(const o of w.clients)if(o.readyState===1)o.send(b)})});
s.listen(3000,'0.0.0.0',()=>console.log('Brauzerda oching: http://TELEFON_IP:3000'));
