(()=>{"use strict";var e={812:function(e,t,s){var r=this&&this.__createBinding||(Object.create?function(e,t,s,r){void 0===r&&(r=s);var n=Object.getOwnPropertyDescriptor(t,s);n&&!("get"in n?!t.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return t[s]}}),Object.defineProperty(e,r,n)}:function(e,t,s,r){void 0===r&&(r=s),e[r]=t[s]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var s in e)"default"!==s&&Object.prototype.hasOwnProperty.call(e,s)&&r(t,e,s);return n(t,e),t};Object.defineProperty(t,"__esModule",{value:!0});const a=s(560),u=o(s(72)),i=o(s(520)),c=u.resolve(__dirname,"../../.env.development");i.config({path:c}),t.default={query:async function(e,t){const s=new a.Client({host:process.env.POSTGRES_HOST,port:Number(process.env.POSTGRES_PORT),user:process.env.POSTGRES_USER,database:process.env.POSTGRES_DB,password:process.env.POSTGRES_PASSWORD});try{return await s.connect(),await s.query(e,t)}catch(e){throw console.error(e),e}finally{await s.end()}}}},200:function(e,t,s){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=r(s(224)),o=r(s(812)),a=process.env.PORT||3e3,u=(0,n.default)();function i(e){return e.charAt(0).toUpperCase()+e.slice(1).toLowerCase()}u.use(n.default.json()),u.use(((e,t,s)=>{t.setHeader("Access-Control-Allow-Origin","http://127.0.0.1:5500"),t.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE"),t.setHeader("Access-Control-Allow-Headers","Content-Type"),s()})),u.get("/",((e,t)=>t.status(200).send("hello word"))),u.post("/user",(async(e,t)=>{const{name:s,password:r}=e.body;if(!s&&!r)return t.status(400).send({message:"the name  is obrigatory"});if(s.length<=8)return t.status(400).send({message:"Your name must have at least 8 letters..."});if(r.length<=8)return t.status(400).send({message:"our password must be at least 8 letters long..."});try{const e=i(s);if((await o.default.query("SELECT COUNT(DISTINCT id) FROM users WHERE LOWER(name) = LOWER($1) AND password = $2;",[e,r])).rows[0].count>0)return t.status(200).send({message:"duplicate name, it is not possible to register"});await o.default.query("INSERT INTO users (name,password)\n       VALUES ($1,$2);",[e,r])}catch(e){return t.status(500).send({message:"Failed to register user"})}return t.status(201).send({message:"you registered successfully"})})),u.post("/userlogin",(async(e,t)=>{const{name:s,password:r}=e.body,n=i(s);if(!s)return t.status(400).send({message:"the name  is obrigatory"});try{return(await o.default.query("SELECT COUNT(*) FROM users WHERE LOWER(name) = LOWER($1) AND password = $2",[n,r])).rows[0].count>0?t.status(200).send({message:"Login Successfully "}):t.status(404).send({message:"user not registred"})}catch(e){return t.status(500).send({message:"The search failed!!"})}})),u.listen(a,(()=>{console.log(`Servidor em execução na porta ${a} `)}))},520:e=>{e.exports=require("dotenv")},224:e=>{e.exports=require("express")},560:e=>{e.exports=require("pg")},72:e=>{e.exports=require("path")}},t={};!function s(r){var n=t[r];if(void 0!==n)return n.exports;var o=t[r]={exports:{}};return e[r].call(o.exports,o,o.exports,s),o.exports}(200)})();