if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,c)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let o={};const t=e=>n(e,r),l={module:{uri:r},exports:o,require:t};i[r]=Promise.all(s.map((e=>l[e]||t(e)))).then((e=>(c(...e),o)))}}define(["./workbox-1616146e"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-d8b79bde.css",revision:null},{url:"assets/index-efebc82e.js",revision:null},{url:"index.html",revision:"9abafb7b3b1bc05728c111825bb678b1"},{url:"registerSW.js",revision:"be3935bb69cc3a05e855af2cec2815c8"},{url:"favicon.ico",revision:"df7700616b500967e2c0f2c2a725d2d8"},{url:"icon.png",revision:"083553530041d487c43298064c832aa4"},{url:"icon-512x512.png",revision:"076cc83bcc5511060ea1b1b32a944c77"},{url:"manifest.webmanifest",revision:"8cf13cd46818acb32e23a8cf25572dbe"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
//# sourceMappingURL=sw.js.map
