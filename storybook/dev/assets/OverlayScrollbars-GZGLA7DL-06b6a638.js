import{r as oe,R as vr}from"./index-1f252b91.js";import"./_commonjsHelpers-3e03c431.js";import"./iframe-cdd95871.js";import"../sb-preview/runtime.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},t=new Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="ee507709-512d-4cf1-9300-4a07eb8b40b3",e._sentryDebugIdIdentifier="sentry-dbid-ee507709-512d-4cf1-9300-4a07eb8b40b3")}catch{}})();function B(e,t){if(xt(e))for(let r=0;r<e.length&&t(e[r],r,e)!==!1;r++);else e&&B(Object.keys(e),r=>t(e[r],r,e));return e}function re(e,t){let r=Te(t);if(me(t)||r){let l=r?"":{};if(e){let n=window.getComputedStyle(e,null);l=r?yr(e,n,t):t.reduce((o,i)=>(o[i]=yr(e,n,i),o),l)}return l}e&&B(fe(t),l=>kl(e,l,t[l]))}var ge=(e,t)=>{let{o:r,u:l,_:n}=e,o=r,i,s=(a,c)=>{let d=o,f=a,p=c||(l?!l(d,f):d!==f);return(p||n)&&(o=f,i=d),[o,p,i]};return[t?a=>s(t(o,i),a):s,a=>[o,!!a,i]]},lt=()=>typeof window<"u",Fr=lt()&&Node.ELEMENT_NODE,{toString:yl,hasOwnProperty:Mt}=Object.prototype,Pe=e=>e===void 0,St=e=>e===null,ml=e=>Pe(e)||St(e)?`${e}`:yl.call(e).replace(/^\[object (.+)\]$/,"$1").toLowerCase(),_e=e=>typeof e=="number",Te=e=>typeof e=="string",Qt=e=>typeof e=="boolean",ye=e=>typeof e=="function",me=e=>Array.isArray(e),et=e=>typeof e=="object"&&!me(e)&&!St(e),xt=e=>{let t=!!e&&e.length,r=_e(t)&&t>-1&&t%1==0;return me(e)||!ye(e)&&r?t>0&&et(e)?t-1 in e:!0:!1},Xt=e=>{if(!e||!et(e)||ml(e)!=="object")return!1;let t,r="constructor",l=e[r],n=l&&l.prototype,o=Mt.call(e,r),i=n&&Mt.call(n,"isPrototypeOf");if(l&&!o&&!i)return!1;for(t in e);return Pe(t)||Mt.call(e,t)},vt=e=>{let t=HTMLElement;return e?t?e instanceof t:e.nodeType===Fr:!1},Ot=e=>{let t=Element;return e?t?e instanceof t:e.nodeType===Fr:!1},er=(e,t,r)=>e.indexOf(t,r),W=(e,t,r)=>(!r&&!Te(t)&&xt(t)?Array.prototype.push.apply(e,t):e.push(t),e),Fe=e=>{let t=Array.from,r=[];return t&&e?t(e):(e instanceof Set?e.forEach(l=>{W(r,l)}):B(e,l=>{W(r,l)}),r)},tr=e=>!!e&&e.length===0,Ce=(e,t,r)=>{B(e,l=>l&&l.apply(void 0,t||[])),!r&&(e.length=0)},Ct=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),fe=e=>e?Object.keys(e):[],K=(e,t,r,l,n,o,i)=>{let s=[t,r,l,n,o,i];return(typeof e!="object"||St(e))&&!ye(e)&&(e={}),B(s,a=>{B(fe(a),c=>{let d=a[c];if(e===d)return!0;let f=me(d);if(d&&(Xt(d)||f)){let p=e[c],u=p;f&&!me(p)?u=[]:!f&&!Xt(p)&&(u={}),e[c]=K(u,d)}else e[c]=d})}),e},rr=e=>{for(let t in e)return!1;return!0},jr=(e,t,r,l)=>{if(Pe(l))return r?r[e]:t;r&&(Te(l)||_e(l))&&(r[e]=l)},te=(e,t,r)=>{if(Pe(r))return e?e.getAttribute(t):null;e&&e.setAttribute(t,r)},se=(e,t)=>{e&&e.removeAttribute(t)},Ne=(e,t,r,l)=>{if(r){let n=te(e,t)||"",o=new Set(n.split(" "));o[l?"add":"delete"](r);let i=Fe(o).join(" ").trim();te(e,t,i)}},Sl=(e,t,r)=>{let l=te(e,t)||"";return new Set(l.split(" ")).has(r)},we=(e,t)=>jr("scrollLeft",0,e,t),Ae=(e,t)=>jr("scrollTop",0,e,t),Wt=lt()&&Element.prototype,qr=(e,t)=>{let r=[],l=t?Ot(t)?t:null:document;return l?W(r,l.querySelectorAll(e)):r},xl=(e,t)=>{let r=t?Ot(t)?t:null:document;return r?r.querySelector(e):null},gt=(e,t)=>Ot(e)?(Wt.matches||Wt.msMatchesSelector).call(e,t):!1,lr=e=>e?Fe(e.childNodes):[],He=e=>e?e.parentElement:null,Je=(e,t)=>{if(Ot(e)){let r=Wt.closest;if(r)return r.call(e,t);do{if(gt(e,t))return e;e=He(e)}while(e)}return null},Ol=(e,t,r)=>{let l=e&&Je(e,t),n=e&&xl(r,l),o=Je(n,t)===l;return l&&n?l===e||n===e||o&&Je(Je(e,r),t)!==l:!1},nr=(e,t,r)=>{if(r&&e){let l=t,n;xt(r)?(n=document.createDocumentFragment(),B(r,o=>{o===l&&(l=o.previousSibling),n.appendChild(o)})):n=r,t&&(l?l!==t&&(l=l.nextSibling):l=e.firstChild),e.insertBefore(n,l||null)}},ve=(e,t)=>{nr(e,null,t)},Cl=(e,t)=>{nr(He(e),e,t)},gr=(e,t)=>{nr(He(e),e&&e.nextSibling,t)},Oe=e=>{if(xt(e))B(Fe(e),t=>Oe(t));else if(e){let t=He(e);t&&t.removeChild(e)}},Ve=e=>{let t=document.createElement("div");return e&&te(t,"class",e),t},Xr=e=>{let t=Ve();return t.innerHTML=e.trim(),B(lr(t),r=>Oe(r))},Ut=e=>e.charAt(0).toUpperCase()+e.slice(1),El=()=>Ve().style,$l=["-webkit-","-moz-","-o-","-ms-"],Il=["WebKit","Moz","O","MS","webkit","moz","o","ms"],_t={},Tt={},Al=e=>{let t=Tt[e];if(Ct(Tt,e))return t;let r=Ut(e),l=El();return B($l,n=>{let o=n.replace(/-/g,"");return!(t=[e,n+e,o+r,Ut(o)+r].find(i=>l[i]!==void 0))}),Tt[e]=t||""},nt=e=>{if(lt()){let t=_t[e]||window[e];return Ct(_t,e)||(B(Il,r=>(t=t||window[r+Ut(e)],!t)),_t[e]=t),t}},Ll=nt("MutationObserver"),hr=nt("IntersectionObserver"),Ke=nt("ResizeObserver"),Wr=nt("cancelAnimationFrame"),Ur=nt("requestAnimationFrame"),ht=lt()&&window.setTimeout,Jt=lt()&&window.clearTimeout,Hl=/[^\x20\t\r\n\f]+/g,Jr=(e,t,r)=>{let l=e&&e.classList,n,o=0,i=!1;if(l&&t&&Te(t)){let s=t.match(Hl)||[];for(i=s.length>0;n=s[o++];)i=!!r(l,n)&&i}return i},ir=(e,t)=>{Jr(e,t,(r,l)=>r.remove(l))},Le=(e,t)=>(Jr(e,t,(r,l)=>r.add(l)),ir.bind(0,e,t)),Et=(e,t,r,l)=>{if(e&&t){let n=!0;return B(r,o=>{let i=l?l(e[o]):e[o],s=l?l(t[o]):t[o];i!==s&&(n=!1)}),n}return!1},Kr=(e,t)=>Et(e,t,["w","h"]),Yr=(e,t)=>Et(e,t,["x","y"]),Pl=(e,t)=>Et(e,t,["t","r","b","l"]),wr=(e,t,r)=>Et(e,t,["width","height"],r&&(l=>Math.round(l))),be=()=>{},Ue=e=>{let t,r=e?ht:Ur,l=e?Jt:Wr;return[n=>{l(t),t=r(n,ye(e)?e():e)},()=>l(t)]},or=(e,t)=>{let r,l,n,o=be,{v:i,g:s,p:a}=t||{},c=function(u){o(),Jt(r),r=l=void 0,o=be,e.apply(this,u)},d=u=>a&&l?a(l,u):u,f=()=>{o!==be&&c(d(n)||n)},p=function(){let u=Fe(arguments),v=ye(i)?i():i;if(_e(v)&&v>=0){let C=ye(s)?s():s,L=_e(C)&&C>=0,$=v>0?ht:Ur,h=v>0?Jt:Wr,m=d(u)||u,A=c.bind(0,m);o();let H=$(A,v);o=()=>h(H),L&&!r&&(r=ht(f,C)),l=n=m}else c(u)};return p.m=f,p},Rl={opacity:1,zindex:1},ot=(e,t)=>{let r=t?parseFloat(e):parseInt(e,10);return r===r?r:0},zl=(e,t)=>!Rl[e.toLowerCase()]&&_e(t)?`${t}px`:t,yr=(e,t,r)=>t!=null?t[r]||t.getPropertyValue(r):e.style[r],kl=(e,t,r)=>{try{let{style:l}=e;Pe(l[t])?l.setProperty(t,r):l[t]=zl(t,r)}catch{}},tt=e=>re(e,"direction")==="rtl",mr=(e,t,r)=>{let l=t?`${t}-`:"",n=r?`-${r}`:"",o=`${l}top${n}`,i=`${l}right${n}`,s=`${l}bottom${n}`,a=`${l}left${n}`,c=re(e,[o,i,s,a]);return{t:ot(c[o],!0),r:ot(c[i],!0),b:ot(c[s],!0),l:ot(c[a],!0)}},{round:Sr}=Math,ar={w:0,h:0},rt=e=>e?{w:e.offsetWidth,h:e.offsetHeight}:ar,bt=e=>e?{w:e.clientWidth,h:e.clientHeight}:ar,wt=e=>e?{w:e.scrollWidth,h:e.scrollHeight}:ar,yt=e=>{let t=parseFloat(re(e,"height"))||0,r=parseFloat(re(e,"width"))||0;return{w:r-Sr(r),h:t-Sr(t)}},xe=e=>e.getBoundingClientRect(),at,Ml=()=>{if(Pe(at)){at=!1;try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get(){at=!0}}))}catch{}}return at},Zr=e=>e.split(" "),_l=(e,t,r,l)=>{B(Zr(t),n=>{e.removeEventListener(n,r,l)})},Q=(e,t,r,l)=>{var n;let o=Ml(),i=(n=o&&l&&l.S)!=null?n:o,s=l&&l.$||!1,a=l&&l.C||!1,c=[],d=o?{passive:i,capture:s}:s;return B(Zr(t),f=>{let p=a?u=>{e.removeEventListener(f,p,s),r&&r(u)}:r;W(c,_l.bind(null,e,f,p,s)),e.addEventListener(f,p,d)}),Ce.bind(0,c)},Gr=e=>e.stopPropagation(),Qr=e=>e.preventDefault(),Tl={x:0,y:0},Dt=e=>{let t=e?xe(e):0;return t?{x:t.left+window.pageYOffset,y:t.top+window.pageXOffset}:Tl},xr=(e,t)=>{B(me(t)?t:[t],e)},sr=e=>{let t=new Map,r=(o,i)=>{if(o){let s=t.get(o);xr(a=>{s&&s[a?"delete":"clear"](a)},i)}else t.forEach(s=>{s.clear()}),t.clear()},l=(o,i)=>{if(Te(o)){let c=t.get(o)||new Set;return t.set(o,c),xr(d=>{ye(d)&&c.add(d)},i),r.bind(0,o,i)}Qt(i)&&i&&r();let s=fe(o),a=[];return B(s,c=>{let d=o[c];d&&W(a,l(c,d))}),Ce.bind(0,a)},n=(o,i)=>{let s=t.get(o);B(Fe(s),a=>{i&&!tr(i)?a.apply(0,i):a()})};return l(e||{}),[l,r,n]},Or=e=>JSON.stringify(e,(t,r)=>{if(ye(r))throw new Error;return r}),Dl={paddingAbsolute:!1,showNativeOverlaidScrollbars:!1,update:{elementEvents:[["img","load"]],debounce:[0,33],attributes:null,ignoreMutation:null},overflow:{x:"scroll",y:"scroll"},scrollbars:{theme:"os-theme-dark",visibility:"auto",autoHide:"never",autoHideDelay:1300,dragScroll:!0,clickScroll:!1,pointers:["mouse","touch","pen"]}},el=(e,t)=>{let r={},l=fe(t).concat(fe(e));return B(l,n=>{let o=e[n],i=t[n];if(et(o)&&et(i))K(r[n]={},el(o,i)),rr(r[n])&&delete r[n];else if(Ct(t,n)&&i!==o){let s=!0;if(me(o)||me(i))try{Or(o)===Or(i)&&(s=!1)}catch{}s&&(r[n]=i)}}),r},tl="os-environment",rl=`${tl}-flexbox-glue`,Bl=`${rl}-max`,ll="os-scrollbar-hidden",Bt="data-overlayscrollbars-initialize",he="data-overlayscrollbars",nl=`${he}-overflow-x`,il=`${he}-overflow-y`,Ye="overflowVisible",Nl="scrollbarHidden",Cr="scrollbarPressed",mt="updating",ze="data-overlayscrollbars-viewport",Nt="arrange",ol="scrollbarHidden",Ze=Ye,Kt="data-overlayscrollbars-padding",Vl=Ze,Er="data-overlayscrollbars-content",cr="os-size-observer",Fl=`${cr}-appear`,jl=`${cr}-listener`,ql="os-trinsic-observer",Xl="os-no-css-vars",Wl="os-theme-none",ce="os-scrollbar",Ul=`${ce}-rtl`,Jl=`${ce}-horizontal`,Kl=`${ce}-vertical`,al=`${ce}-track`,dr=`${ce}-handle`,Yl=`${ce}-visible`,Zl=`${ce}-cornerless`,$r=`${ce}-transitionless`,Ir=`${ce}-interaction`,Ar=`${ce}-unusable`,Lr=`${ce}-auto-hidden`,Hr=`${ce}-wheel`,Gl=`${al}-interactive`,Ql=`${dr}-interactive`,sl={},je=()=>sl,en=e=>{let t=[];return B(me(e)?e:[e],r=>{let l=fe(r);B(l,n=>{W(t,sl[n]=r[n])})}),t},tn="__osOptionsValidationPlugin",rn="__osSizeObserverPlugin",ur="__osScrollbarsHidingPlugin",ln="__osClickScrollPlugin",Vt,Pr=(e,t,r,l)=>{ve(e,t);let n=bt(t),o=rt(t),i=yt(r);return l&&Oe(t),{x:o.h-n.h+i.h,y:o.w-n.w+i.w}},nn=e=>{let t=!1,r=Le(e,ll);try{t=re(e,Al("scrollbar-width"))==="none"||window.getComputedStyle(e,"::-webkit-scrollbar").getPropertyValue("display")==="none"}catch{}return r(),t},on=(e,t)=>{let r="hidden";re(e,{overflowX:r,overflowY:r,direction:"rtl"}),we(e,0);let l=Dt(e),n=Dt(t);we(e,-999);let o=Dt(t);return{i:l.x===n.x,n:n.x!==o.x}},an=(e,t)=>{let r=Le(e,rl),l=xe(e),n=xe(t),o=wr(n,l,!0),i=Le(e,Bl),s=xe(e),a=xe(t),c=wr(a,s,!0);return r(),i(),o&&c},sn=()=>{let{body:e}=document,t=Xr(`<div class="${tl}"><div></div></div>`)[0],r=t.firstChild,[l,,n]=sr(),[o,i]=ge({o:Pr(e,t,r),u:Yr},Pr.bind(0,e,t,r,!0)),[s]=i(),a=nn(t),c={x:s.x===0,y:s.y===0},d={elements:{host:null,padding:!a,viewport:$=>a&&$===$.ownerDocument.body&&$,content:!1},scrollbars:{slot:!0},cancel:{nativeScrollbarsOverlaid:!1,body:null}},f=K({},Dl),p=K.bind(0,{},f),u=K.bind(0,{},d),v={k:s,A:c,I:a,L:re(t,"zIndex")==="-1",B:on(t,r),V:an(t,r),Y:l.bind(0,"z"),j:l.bind(0,"r"),N:u,q:$=>K(d,$)&&u(),F:p,G:$=>K(f,$)&&p(),X:K({},d),U:K({},f)},C=window.addEventListener,L=or($=>n($?"z":"r"),{v:33,g:99});if(se(t,"style"),Oe(t),C("resize",L.bind(0,!1)),!a&&(!c.x||!c.y)){let $;C("resize",()=>{let h=je()[ur];$=$||h&&h.R(),$&&$(v,o,L.bind(0,!0))})}return v},de=()=>(Vt||(Vt=sn()),Vt),fr=(e,t)=>ye(t)?t.apply(0,e):t,cn=(e,t,r,l)=>{let n=Pe(l)?r:l;return fr(e,n)||t.apply(0,e)},cl=(e,t,r,l)=>{let n=Pe(l)?r:l,o=fr(e,n);return!!o&&(vt(o)?o:t.apply(0,e))},dn=(e,t,r)=>{let{nativeScrollbarsOverlaid:l,body:n}=r||{},{A:o,I:i}=de(),{nativeScrollbarsOverlaid:s,body:a}=t,c=l??s,d=Pe(n)?a:n,f=(o.x||o.y)&&c,p=e&&(St(d)?!i:d);return!!f||!!p},pr=new WeakMap,un=(e,t)=>{pr.set(e,t)},fn=e=>{pr.delete(e)},dl=e=>pr.get(e),Rr=(e,t)=>e?t.split(".").reduce((r,l)=>r&&Ct(r,l)?r[l]:void 0,e):void 0,Yt=(e,t,r)=>l=>[Rr(e,l),r||Rr(t,l)!==void 0],ul=e=>{let t=e;return[()=>t,r=>{t=K({},t,r)}]},st="tabindex",ct=Ve.bind(0,""),Ft=e=>{ve(He(e),lr(e)),Oe(e)},pn=e=>{let t=de(),{N:r,I:l}=t,n=je()[ur],o=n&&n.T,{elements:i}=r(),{host:s,padding:a,viewport:c,content:d}=i,f=vt(e),p=f?{}:e,{elements:u}=p,{host:v,padding:C,viewport:L,content:$}=u||{},h=f?e:p.target,m=gt(h,"textarea"),A=h.ownerDocument,H=A.documentElement,T=h===A.body,z=A.defaultView,P=cn.bind(0,[h]),F=cl.bind(0,[h]),Z=fr.bind(0,[h]),j=P.bind(0,ct,c),R=F.bind(0,ct,d),y=j(L),b=y===h,x=b&&T,g=!b&&R($),w=!b&&vt(y)&&y===g,E=w&&!!Z(d),S=E?j():y,O=E?g:R(),I=x?H:w?S:y,N=m?P(ct,s,v):h,k=x?I:N,_=w?O:g,q=A.activeElement,X=!b&&z.top===z&&q===h,M={W:h,Z:k,J:I,K:!b&&F(ct,a,C),tt:_,nt:!b&&!l&&o&&o(t),ot:x?H:I,st:x?A:I,et:z,ct:A,rt:m,it:T,lt:f,ut:b,dt:w,ft:(ee,ue)=>Sl(I,b?he:ze,b?ue:ee),_t:(ee,ue,ie)=>Ne(I,b?he:ze,b?ue:ee,ie)},V=fe(M).reduce((ee,ue)=>{let ie=M[ue];return W(ee,ie&&!He(ie)?ie:!1)},[]),U=ee=>ee?er(V,ee)>-1:null,{W:J,Z:Y,K:le,J:D,tt:G,nt:ne}=M,ae=[()=>{se(Y,he),se(Y,Bt),se(J,Bt),T&&(se(H,he),se(H,Bt))}],De=m&&U(Y),Re=m?J:lr([G,D,le,Y,J].find(ee=>U(ee)===!1)),qe=x?J:G||D;return[M,()=>{te(Y,he,b?"viewport":"host"),te(le,Kt,""),te(G,Er,""),b||te(D,ze,"");let ee=T&&!b?Le(He(h),ll):be;if(De&&(gr(J,Y),W(ae,()=>{gr(Y,J),Oe(Y)})),ve(qe,Re),ve(Y,le),ve(le||Y,!b&&D),ve(D,G),W(ae,()=>{ee(),se(le,Kt),se(G,Er),se(D,nl),se(D,il),se(D,ze),U(G)&&Ft(G),U(D)&&Ft(D),U(le)&&Ft(le)}),l&&!b&&(Ne(D,ze,ol,!0),W(ae,se.bind(0,D,ze))),ne&&(Cl(D,ne),W(ae,Oe.bind(0,ne))),X){let ue=te(D,st);te(D,st,"-1"),D.focus();let ie=()=>ue?te(D,st,ue):se(D,st),Be=Q(A,"pointerdown keydown",()=>{ie(),Be()});W(ae,[ie,Be])}else q&&q.focus&&q.focus();Re=0},Ce.bind(0,ae)]},bn=(e,t)=>{let{tt:r}=e,[l]=t;return n=>{let{V:o}=de(),{ht:i}=l(),{vt:s}=n,a=(r||!o)&&s;return a&&re(r,{height:i?"":"100%"}),{gt:a,wt:a}}},vn=(e,t)=>{let[r,l]=t,{Z:n,K:o,J:i,ut:s}=e,[a,c]=ge({u:Pl,o:mr()},mr.bind(0,n,"padding",""));return(d,f,p)=>{let[u,v]=c(p),{I:C,V:L}=de(),{bt:$}=r(),{gt:h,wt:m,yt:A}=d,[H,T]=f("paddingAbsolute");(h||v||!L&&m)&&([u,v]=a(p));let z=!s&&(T||A||v);if(z){let P=!H||!o&&!C,F=u.r+u.l,Z=u.t+u.b,j={marginRight:P&&!$?-F:0,marginBottom:P?-Z:0,marginLeft:P&&$?-F:0,top:P?-u.t:0,right:P?$?-u.r:"auto":0,left:P?$?"auto":-u.l:0,width:P?`calc(100% + ${F}px)`:""},R={paddingTop:P?u.t:0,paddingRight:P?u.r:0,paddingBottom:P?u.b:0,paddingLeft:P?u.l:0};re(o||i,j),re(i,R),l({K:u,St:!P,P:o?R:K({},j,R)})}return{xt:z}}},{max:Zt}=Math,ke=Zt.bind(0,0),fl="visible",zr="hidden",gn=42,dt={u:Kr,o:{w:0,h:0}},hn={u:Yr,o:{x:zr,y:zr}},wn=(e,t)=>{let r=window.devicePixelRatio%1!==0?1:0,l={w:ke(e.w-t.w),h:ke(e.h-t.h)};return{w:l.w>r?l.w:0,h:l.h>r?l.h:0}},ut=e=>e.indexOf(fl)===0,yn=(e,t)=>{let[r,l]=t,{Z:n,K:o,J:i,nt:s,ut:a,_t:c,it:d,et:f}=e,{k:p,V:u,I:v,A:C}=de(),L=je()[ur],$=!a&&!v&&(C.x||C.y),h=d&&a,[m,A]=ge(dt,yt.bind(0,i)),[H,T]=ge(dt,wt.bind(0,i)),[z,P]=ge(dt),[F,Z]=ge(dt),[j]=ge(hn),R=(E,S)=>{if(re(i,{height:""}),S){let{St:O,K:I}=r(),{$t:N,D:k}=E,_=yt(n),q=bt(n),X=re(i,"boxSizing")==="content-box",M=O||X?I.b+I.t:0,V=!(C.x&&X);re(i,{height:q.h+_.h+(N.x&&V?k.x:0)-M})}},y=(E,S)=>{let O=!v&&!E?gn:0,I=(J,Y,le)=>{let D=re(i,J),G=(S?S[J]:D)==="scroll";return[D,G,G&&!v?Y?O:le:0,Y&&!!O]},[N,k,_,q]=I("overflowX",C.x,p.x),[X,M,V,U]=I("overflowY",C.y,p.y);return{Ct:{x:N,y:X},$t:{x:k,y:M},D:{x:_,y:V},M:{x:q,y:U}}},b=(E,S,O,I)=>{let N=(M,V)=>{let U=ut(M),J=V&&U&&M.replace(`${fl}-`,"")||"";return[V&&!U?M:"",ut(J)?"hidden":J]},[k,_]=N(O.x,S.x),[q,X]=N(O.y,S.y);return I.overflowX=_&&q?_:k,I.overflowY=X&&k?X:q,y(E,I)},x=(E,S,O,I)=>{let{D:N,M:k}=E,{x:_,y:q}=k,{x:X,y:M}=N,{P:V}=r(),U=S?"marginLeft":"marginRight",J=S?"paddingLeft":"paddingRight",Y=V[U],le=V.marginBottom,D=V[J],G=V.paddingBottom;I.width=`calc(100% + ${M+-1*Y}px)`,I[U]=-M+Y,I.marginBottom=-X+le,O&&(I[J]=D+(q?M:0),I.paddingBottom=G+(_?X:0))},[g,w]=L?L.H($,u,i,s,r,y,x):[()=>$,()=>[be]];return(E,S,O)=>{let{gt:I,Ot:N,wt:k,xt:_,vt:q,yt:X}=E,{ht:M,bt:V}=r(),[U,J]=S("showNativeOverlaidScrollbars"),[Y,le]=S("overflow"),D=U&&C.x&&C.y,G=!a&&!u&&(I||k||N||J||q),ne=ut(Y.x),ae=ut(Y.y),De=ne||ae,Re=A(O),qe=T(O),ee=P(O),ue=Z(O),ie;if(J&&v&&c(ol,Nl,!D),G&&(ie=y(D),R(ie,M)),I||_||k||X||J){De&&c(Ze,Ye,!1);let[Ee,$e]=w(D,V,ie),[pe,Qe]=Re=m(O),[Ie,hl]=qe=H(O),Rt=bt(i),zt=Ie,kt=Rt;Ee(),(hl||Qe||J)&&$e&&!D&&g($e,Ie,pe,V)&&(kt=bt(i),zt=wt(i));let wl={w:ke(Zt(Ie.w,zt.w)+pe.w),h:ke(Zt(Ie.h,zt.h)+pe.h)},br={w:ke((h?f.innerWidth:kt.w+ke(Rt.w-Ie.w))+pe.w),h:ke((h?f.innerHeight+pe.h:kt.h+ke(Rt.h-Ie.h))+pe.h)};ue=F(br),ee=z(wn(wl,br),O)}let[Be,Ge]=ue,[Xe,We]=ee,[$t,It]=qe,[At,Lt]=Re,Se={x:Xe.w>0,y:Xe.h>0},it=ne&&ae&&(Se.x||Se.y)||ne&&Se.x&&!Se.y||ae&&Se.y&&!Se.x;if(_||X||Lt||It||Ge||We||le||J||G){let Ee={marginRight:0,marginBottom:0,marginLeft:0,width:"",overflowY:"",overflowX:""},$e=b(D,Se,Y,Ee),pe=g($e,$t,At,V);a||x($e,V,pe,Ee),G&&R($e,M),a?(te(n,nl,Ee.overflowX),te(n,il,Ee.overflowY)):re(i,Ee)}Ne(n,he,Ye,it),Ne(o,Kt,Vl,it),a||Ne(i,ze,Ze,De);let[Ht,Pt]=j(y(D).Ct);return l({Ct:Ht,zt:{x:Be.w,y:Be.h},Tt:{x:Xe.w,y:Xe.h},Et:Se}),{It:Pt,At:Ge,Lt:We}}},kr=(e,t,r)=>{let l={},n=t||{},o=fe(e).concat(fe(n));return B(o,i=>{let s=e[i],a=n[i];l[i]=!!(r||s||a)}),l},mn=(e,t)=>{let{W:r,J:l,_t:n,ut:o}=e,{I:i,A:s,V:a}=de(),c=!i&&(s.x||s.y),d=[bn(e,t),vn(e,t),yn(e,t)];return(f,p,u)=>{let v=kr(K({gt:!1,xt:!1,yt:!1,vt:!1,At:!1,Lt:!1,It:!1,Ot:!1,wt:!1},p),{},u),C=c||!a,L=C&&we(l),$=C&&Ae(l);n("",mt,!0);let h=v;return B(d,m=>{h=kr(h,m(h,f,!!u)||{},u)}),we(l,L),Ae(l,$),n("",mt),o||(we(r,0),Ae(r,0)),h}},Sn=(e,t,r)=>{let l,n=!1,o=()=>{n=!0},i=s=>{if(r){let a=r.reduce((c,d)=>{if(d){let[f,p]=d,u=p&&f&&(s?s(f):qr(f,e));u&&u.length&&p&&Te(p)&&W(c,[u,p.trim()],!0)}return c},[]);B(a,c=>B(c[0],d=>{let f=c[1],p=l.get(d)||[];if(e.contains(d)){let u=Q(d,f,v=>{n?(u(),l.delete(d)):t(v)});l.set(d,W(p,u))}else Ce(p),l.delete(d)}))}};return r&&(l=new WeakMap,i()),[o,i]},Mr=(e,t,r,l)=>{let n=!1,{Ht:o,Pt:i,Dt:s,Mt:a,Rt:c,kt:d}=l||{},f=or(()=>{n&&r(!0)},{v:33,g:99}),[p,u]=Sn(e,f,s),v=o||[],C=i||[],L=v.concat(C),$=(m,A)=>{let H=c||be,T=d||be,z=new Set,P=new Set,F=!1,Z=!1;if(B(m,j=>{let{attributeName:R,target:y,type:b,oldValue:x,addedNodes:g,removedNodes:w}=j,E=b==="attributes",S=b==="childList",O=e===y,I=E&&Te(R)?te(y,R):0,N=I!==0&&x!==I,k=er(C,R)>-1&&N;if(t&&(S||!O)){let _=!E,q=E&&N,X=q&&a&&gt(y,a),M=(X?!H(y,R,x,I):_||q)&&!T(j,!!X,e,l);B(g,V=>z.add(V)),B(w,V=>z.add(V)),Z=Z||M}!t&&O&&N&&!H(y,R,x,I)&&(P.add(R),F=F||k)}),z.size>0&&u(j=>Fe(z).reduce((R,y)=>(W(R,qr(j,y)),gt(y,j)?W(R,y):R),[])),t)return!A&&Z&&r(!1),[!1];if(P.size>0||F){let j=[Fe(P),F];return!A&&r.apply(0,j),j}},h=new Ll(m=>$(m));return h.observe(e,{attributes:!0,attributeOldValue:!0,attributeFilter:L,subtree:t,childList:t,characterData:t}),n=!0,[()=>{n&&(p(),h.disconnect(),n=!1)},()=>{if(n){f.m();let m=h.takeRecords();return!tr(m)&&$(m,!0)}}]},ft=3333333,pt=e=>e&&(e.height||e.width),pl=(e,t,r)=>{let{Bt:l=!1,Vt:n=!1}=r||{},o=je()[rn],{B:i}=de(),s=Xr(`<div class="${cr}"><div class="${jl}"></div></div>`)[0],a=s.firstChild,c=tt.bind(0,e),[d]=ge({o:void 0,_:!0,u:(v,C)=>!(!v||!pt(v)&&pt(C))}),f=v=>{let C=me(v)&&v.length>0&&et(v[0]),L=!C&&Qt(v[0]),$=!1,h=!1,m=!0;if(C){let[A,,H]=d(v.pop().contentRect),T=pt(A),z=pt(H);$=!H||!T,h=!z&&T,m=!$}else L?[,m]=v:h=v===!0;if(l&&m){let A=L?v[0]:tt(s);we(s,A?i.n?-ft:i.i?0:ft:ft),Ae(s,ft)}$||t({gt:!L,Yt:L?v:void 0,Vt:!!h})},p=[],u=n?f:!1;return[()=>{Ce(p),Oe(s)},()=>{if(Ke){let v=new Ke(f);v.observe(a),W(p,()=>{v.disconnect()})}else if(o){let[v,C]=o.O(a,f,n);u=v,W(p,C)}if(l){let[v]=ge({o:void 0},c);W(p,Q(s,"scroll",C=>{let L=v(),[$,h,m]=L;h&&(ir(a,"ltr rtl"),$?Le(a,"rtl"):Le(a,"ltr"),f([!!$,h,m])),Gr(C)}))}u&&(Le(s,Fl),W(p,Q(s,"animationstart",u,{C:!!Ke}))),(Ke||o)&&ve(e,s)}]},xn=e=>e.h===0||e.isIntersecting||e.intersectionRatio>0,On=(e,t)=>{let r,l=Ve(ql),n=[],[o]=ge({o:!1}),i=(a,c)=>{if(a){let d=o(xn(a)),[,f]=d;if(f)return!c&&t(d),[d]}},s=(a,c)=>{if(a&&a.length>0)return i(a.pop(),c)};return[()=>{Ce(n),Oe(l)},()=>{if(hr)r=new hr(a=>s(a),{root:e}),r.observe(l),W(n,()=>{r.disconnect()});else{let a=()=>{let f=rt(l);i(f)},[c,d]=pl(l,a);W(n,c),d(),a()}ve(e,l)},()=>{if(r)return s(r.takeRecords(),!0)}]},_r=`[${he}]`,Cn=`[${ze}]`,jt=["tabindex"],Tr=["wrap","cols","rows"],qt=["id","class","style","open"],En=(e,t,r)=>{let l,n,o,{Z:i,J:s,tt:a,rt:c,ut:d,ft:f,_t:p}=e,{V:u}=de(),[v]=ge({u:Kr,o:{w:0,h:0}},()=>{let b=f(Ze,Ye),x=f(Nt,""),g=x&&we(s),w=x&&Ae(s);p(Ze,Ye),p(Nt,""),p("",mt,!0);let E=wt(a),S=wt(s),O=yt(s);return p(Ze,Ye,b),p(Nt,"",x),p("",mt),we(s,g),Ae(s,w),{w:S.w+E.w+O.w,h:S.h+E.h+O.h}}),C=c?Tr:qt.concat(Tr),L=or(r,{v:()=>l,g:()=>n,p(b,x){let[g]=b,[w]=x;return[fe(g).concat(fe(w)).reduce((E,S)=>(E[S]=g[S]||w[S],E),{})]}}),$=b=>{B(b||jt,x=>{if(er(jt,x)>-1){let g=te(i,x);Te(g)?te(s,x,g):se(s,x)}})},h=(b,x)=>{let[g,w]=b,E={vt:w};return t({ht:g}),!x&&r(E),E},m=({gt:b,Yt:x,Vt:g})=>{let w=!b||g?r:L,E=!1;if(x){let[S,O]=x;E=O,t({bt:S})}w({gt:b,yt:E})},A=(b,x)=>{let[,g]=v(),w={wt:g};return g&&!x&&(b?r:L)(w),w},H=(b,x,g)=>{let w={Ot:x};return x?!g&&L(w):d||$(b),w},[T,z,P]=a||!u?On(i,h):[be,be,be],[F,Z]=d?[be,be]:pl(i,m,{Vt:!0,Bt:!0}),[j,R]=Mr(i,!1,H,{Pt:qt,Ht:qt.concat(jt)}),y=d&&Ke&&new Ke(m.bind(0,{gt:!0}));return y&&y.observe(i),$(),[()=>{T(),F(),o&&o[0](),y&&y.disconnect(),j()},()=>{Z(),z()},()=>{let b={},x=R(),g=P(),w=o&&o[1]();return x&&K(b,H.apply(0,W(x,!0))),g&&K(b,h.apply(0,W(g,!0))),w&&K(b,A.apply(0,W(w,!0))),b},b=>{let[x]=b("update.ignoreMutation"),[g,w]=b("update.attributes"),[E,S]=b("update.elementEvents"),[O,I]=b("update.debounce"),N=S||w,k=_=>ye(x)&&x(_);if(N&&(o&&(o[1](),o[0]()),o=Mr(a||s,!0,A,{Ht:C.concat(g||[]),Dt:E,Mt:_r,kt:(_,q)=>{let{target:X,attributeName:M}=_;return(!q&&M&&!d?Ol(X,_r,Cn):!1)||!!Je(X,`.${ce}`)||!!k(_)}})),I)if(L.m(),me(O)){let _=O[0],q=O[1];l=_e(_)&&_,n=_e(q)&&q}else _e(O)?(l=O,n=!1):(l=!1,n=!1)}]},Dr={x:0,y:0},$n=e=>({K:{t:0,r:0,b:0,l:0},St:!1,P:{marginRight:0,marginBottom:0,marginLeft:0,paddingTop:0,paddingRight:0,paddingBottom:0,paddingLeft:0},zt:Dr,Tt:Dr,Ct:{x:"hidden",y:"hidden"},Et:{x:!1,y:!1},ht:!1,bt:tt(e.Z)}),In=(e,t)=>{let r=Yt(t,{}),[l,n,o]=sr(),[i,s,a]=pn(e),c=ul($n(i)),[d,f]=c,p=mn(i,c),u=(m,A,H)=>{let T=fe(m).some(z=>m[z])||!rr(A)||H;return T&&o("u",[m,A,H]),T},[v,C,L,$]=En(i,f,m=>u(p(r,m),{},!1)),h=d.bind(0);return h.jt=m=>l("u",m),h.Nt=()=>{let{W:m,J:A}=i,H=we(m),T=Ae(m);C(),s(),we(A,H),Ae(A,T)},h.qt=i,[(m,A)=>{let H=Yt(t,m,A);return $(H),u(p(H,L(),A),m,!!A)},h,()=>{n(),v(),a()}]},{round:Br}=Math,An=e=>{let{width:t,height:r}=xe(e),{w:l,h:n}=rt(e);return{x:Br(t)/l||1,y:Br(r)/n||1}},Ln=(e,t,r)=>{let l=t.scrollbars,{button:n,isPrimary:o,pointerType:i}=e,{pointers:s}=l;return n===0&&o&&l[r?"dragScroll":"clickScroll"]&&(s||[]).includes(i)},Hn=(e,t)=>Q(e,"mousedown",Q.bind(0,t,"click",Gr,{C:!0,$:!0}),{$:!0}),Nr="pointerup pointerleave pointercancel lostpointercapture",Pn=(e,t,r,l,n,o,i)=>{let{B:s}=de(),{Ft:a,Gt:c,Xt:d}=l,f=`scroll${i?"Left":"Top"}`,p=`client${i?"X":"Y"}`,u=i?"width":"height",v=i?"left":"top",C=i?"w":"h",L=i?"x":"y",$=(h,m)=>A=>{let{Tt:H}=o(),T=rt(c)[C]-rt(a)[C],z=m*A/T*H[L],P=tt(d)&&i?s.n||s.i?1:-1:1;n[f]=h+z*P};return Q(c,"pointerdown",h=>{let m=Je(h.target,`.${dr}`)===a,A=m?a:c;if(Ne(t,he,Cr,!0),Ln(h,e,m)){let H=!m&&h.shiftKey,T=()=>xe(a),z=()=>xe(c),P=(S,O)=>(S||T())[v]-(O||z())[v],F=$(n[f]||0,1/An(n)[L]),Z=h[p],j=T(),R=z(),y=j[u],b=P(j,R)+y/2,x=Z-R[v],g=m?0:x-b,w=S=>{Ce(E),A.releasePointerCapture(S.pointerId)},E=[Ne.bind(0,t,he,Cr),Q(r,Nr,w),Q(r,"selectstart",S=>Qr(S),{S:!1}),Q(c,Nr,w),Q(c,"pointermove",S=>{let O=S[p]-Z;(m||H)&&F(g+O)})];if(H)F(g);else if(!m){let S=je()[ln];S&&W(E,S.O(F,P,g,y,x))}A.setPointerCapture(h.pointerId)}})},Rn=(e,t)=>(r,l,n,o,i,s)=>{let{Xt:a}=r,[c,d]=Ue(333),f=!!i.scrollBy,p=!0;return Ce.bind(0,[Q(a,"pointerenter",()=>{l(Ir,!0)}),Q(a,"pointerleave pointercancel",()=>{l(Ir)}),Q(a,"wheel",u=>{let{deltaX:v,deltaY:C,deltaMode:L}=u;f&&p&&L===0&&He(a)===o&&i.scrollBy({left:v,top:C,behavior:"smooth"}),p=!1,l(Hr,!0),c(()=>{p=!0,l(Hr)}),Qr(u)},{S:!1,$:!0}),Hn(a,n),Pn(e,o,n,r,i,t,s),d])},{min:Gt,max:Vr,abs:zn,round:kn}=Math,bl=(e,t,r,l)=>{if(l){let s=r?"x":"y",{Tt:a,zt:c}=l,d=c[s],f=a[s];return Vr(0,Gt(1,d/(d+f)))}let n=r?"width":"height",o=xe(e)[n],i=xe(t)[n];return Vr(0,Gt(1,o/i))},Mn=(e,t,r,l,n,o)=>{let{B:i}=de(),s=o?"x":"y",a=o?"Left":"Top",{Tt:c}=l,d=kn(c[s]),f=zn(r[`scroll${a}`]),p=o&&n,u=i.i?f:d-f,v=Gt(1,(p?u:f)/d),C=bl(e,t,o);return 1/C*(1-C)*v},_n=(e,t,r)=>{let{N:l,L:n}=de(),{scrollbars:o}=l(),{slot:i}=o,{ct:s,W:a,Z:c,J:d,lt:f,ot:p,it:u,ut:v}=t,{scrollbars:C}=f?{}:e,{slot:L}=C||{},$=cl([a,c,d],()=>v&&u?a:c,i,L),h=(g,w,E)=>{let S=E?Le:ir;B(g,O=>{S(O.Xt,w)})},m=(g,w)=>{B(g,E=>{let[S,O]=w(E);re(S,O)})},A=(g,w,E)=>{m(g,S=>{let{Ft:O,Gt:I}=S;return[O,{[E?"width":"height"]:`${(100*bl(O,I,E,w)).toFixed(3)}%`}]})},H=(g,w,E)=>{let S=E?"X":"Y";m(g,O=>{let{Ft:I,Gt:N,Xt:k}=O,_=Mn(I,N,p,w,tt(k),E);return[I,{transform:_===_?`translate${S}(${(100*_).toFixed(3)}%)`:""}]})},T=[],z=[],P=[],F=(g,w,E)=>{let S=Qt(E),O=S?E:!0,I=S?!E:!0;O&&h(z,g,w),I&&h(P,g,w)},Z=g=>{A(z,g,!0),A(P,g)},j=g=>{H(z,g,!0),H(P,g)},R=g=>{let w=g?Jl:Kl,E=g?z:P,S=tr(E)?$r:"",O=Ve(`${ce} ${w} ${S}`),I=Ve(al),N=Ve(dr),k={Xt:O,Gt:I,Ft:N};return n||Le(O,Xl),ve(O,I),ve(I,N),W(E,k),W(T,[Oe.bind(0,O),r(k,F,s,c,p,g)]),k},y=R.bind(0,!0),b=R.bind(0,!1),x=()=>{ve($,z[0].Xt),ve($,P[0].Xt),ht(()=>{F($r)},300)};return y(),b(),[{Ut:Z,Wt:j,Zt:F,Jt:{Kt:z,Qt:y,tn:m.bind(0,z)},nn:{Kt:P,Qt:b,tn:m.bind(0,P)}},x,Ce.bind(0,T)]},Tn=(e,t,r,l)=>{let n,o,i,s,a,c=0,d=ul({}),[f]=d,[p,u]=Ue(),[v,C]=Ue(),[L,$]=Ue(100),[h,m]=Ue(100),[A,H]=Ue(()=>c),[T,z,P]=_n(e,r.qt,Rn(t,r)),{Z:F,J:Z,ot:j,st:R,ut:y,it:b}=r.qt,{Jt:x,nn:g,Zt:w,Ut:E,Wt:S}=T,{tn:O}=x,{tn:I}=g,N=M=>{let{Xt:V}=M,U=y&&!b&&He(V)===Z&&V;return[U,{transform:U?`translate(${we(j)}px, ${Ae(j)}px)`:""}]},k=(M,V)=>{if(H(),M)w(Lr);else{let U=()=>w(Lr,!0);c>0&&!V?A(U):U()}},_=()=>{s=o,s&&k(!0)},q=[$,H,m,C,u,P,Q(F,"pointerover",_,{C:!0}),Q(F,"pointerenter",_),Q(F,"pointerleave",()=>{s=!1,o&&k(!1)}),Q(F,"pointermove",()=>{n&&p(()=>{$(),k(!0),h(()=>{n&&k(!1)})})}),Q(R,"scroll",M=>{v(()=>{S(r()),i&&k(!0),L(()=>{i&&!s&&k(!1)})}),l(M),y&&O(N),y&&I(N)})],X=f.bind(0);return X.qt=T,X.Nt=z,[(M,V,U)=>{let{At:J,Lt:Y,It:le,yt:D}=U,{A:G}=de(),ne=Yt(t,M,V),ae=r(),{Tt:De,Ct:Re,bt:qe}=ae,[ee,ue]=ne("showNativeOverlaidScrollbars"),[ie,Be]=ne("scrollbars.theme"),[Ge,Xe]=ne("scrollbars.visibility"),[We,$t]=ne("scrollbars.autoHide"),[It]=ne("scrollbars.autoHideDelay"),[At,Lt]=ne("scrollbars.dragScroll"),[Se,it]=ne("scrollbars.clickScroll"),Ht=J||Y||D,Pt=le||Xe,Ee=ee&&G.x&&G.y,$e=(pe,Qe)=>{let Ie=Ge==="visible"||Ge==="auto"&&pe==="scroll";return w(Yl,Ie,Qe),Ie};if(c=It,ue&&w(Wl,Ee),Be&&(w(a),w(ie,!0),a=ie),$t&&(n=We==="move",o=We==="leave",i=We!=="never",k(!i,!0)),Lt&&w(Ql,At),it&&w(Gl,Se),Pt){let pe=$e(Re.x,!0),Qe=$e(Re.y,!1);w(Zl,!(pe&&Qe))}Ht&&(E(ae),S(ae),w(Ar,!De.x,!0),w(Ar,!De.y,!1),w(Ul,qe&&!b))},X,Ce.bind(0,q)]},vl=(e,t,r)=>{ye(e)&&e(t||void 0,r||void 0)},Me=(e,t,r)=>{let{F:l,N:n,Y:o,j:i}=de(),s=je(),a=vt(e),c=a?e:e.target,d=dl(c);if(t&&!d){let f=!1,p=y=>{let b=je()[tn],x=b&&b.O;return x?x(y,!0):y},u=K({},l(),p(t)),[v,C,L]=sr(r),[$,h,m]=In(e,u),[A,H,T]=Tn(e,u,h,y=>L("scroll",[R,y])),z=(y,b)=>$(y,!!b),P=z.bind(0,{},!0),F=o(P),Z=i(P),j=y=>{fn(c),F(),Z(),T(),m(),f=!0,L("destroyed",[R,!!y]),C()},R={options(y,b){if(y){let x=b?l():{},g=el(u,K(x,p(y)));rr(g)||(K(u,g),z(g))}return K({},u)},on:v,off:(y,b)=>{y&&b&&C(y,b)},state(){let{zt:y,Tt:b,Ct:x,Et:g,K:w,St:E,bt:S}=h();return K({},{overflowEdge:y,overflowAmount:b,overflowStyle:x,hasOverflow:g,padding:w,paddingAbsolute:E,directionRTL:S,destroyed:f})},elements(){let{W:y,Z:b,K:x,J:g,tt:w,ot:E,st:S}=h.qt,{Jt:O,nn:I}=H.qt,N=_=>{let{Ft:q,Gt:X,Xt:M}=_;return{scrollbar:M,track:X,handle:q}},k=_=>{let{Kt:q,Qt:X}=_,M=N(q[0]);return K({},M,{clone:()=>{let V=N(X());return A({},!0,{}),V}})};return K({},{target:y,host:b,padding:x||g,viewport:g,content:w||g,scrollOffsetElement:E,scrollEventElement:S,scrollbarHorizontal:k(O),scrollbarVertical:k(I)})},update:y=>z({},y),destroy:j.bind(0)};return h.jt((y,b,x)=>{A(b,x,y)}),un(c,R),B(fe(s),y=>vl(s[y],0,R)),dn(h.qt.it,n().cancel,!a&&e.cancel)?(j(!0),R):(h.Nt(),H.Nt(),L("initialized",[R]),h.jt((y,b,x)=>{let{gt:g,yt:w,vt:E,At:S,Lt:O,It:I,wt:N,Ot:k}=y;L("updated",[R,{updateHints:{sizeChanged:g,directionChanged:w,heightIntrinsicChanged:E,overflowEdgeChanged:S,overflowAmountChanged:O,overflowStyleChanged:I,contentMutation:N,hostMutation:k},changedOptions:b,force:x}])}),R.update(!0),R)}return d};Me.plugin=e=>{B(en(e),t=>vl(t,Me))};Me.valid=e=>{let t=e&&e.elements,r=ye(t)&&t();return Xt(r)&&!!dl(r.target)};Me.env=()=>{let{k:e,A:t,I:r,B:l,V:n,L:o,X:i,U:s,N:a,q:c,F:d,G:f}=de();return K({},{scrollbarsSize:e,scrollbarsOverlaid:t,scrollbarsHiding:r,rtlScrollBehavior:l,flexboxGlue:n,cssCustomProperties:o,staticDefaultInitialization:i,staticDefaultOptions:s,getDefaultInitialization:a,setDefaultInitialization:c,getDefaultOptions:d,setDefaultOptions:f})};var Dn=()=>{if(typeof window>"u"){let c=()=>{};return[c,c]}let e,t,r=window,l=typeof r.requestIdleCallback=="function",n=r.requestAnimationFrame,o=r.cancelAnimationFrame,i=l?r.requestIdleCallback:n,s=l?r.cancelIdleCallback:o,a=()=>{s(e),o(t)};return[(c,d)=>{a(),e=i(l?()=>{a(),t=n(c)}:c,typeof d=="object"?d:{timeout:2233})},a]},Bn=e=>{let{options:t,events:r,defer:l}=e||{},[n,o]=oe.useMemo(Dn,[]),i=oe.useRef(null),s=oe.useRef(l),a=oe.useRef(t),c=oe.useRef(r);return oe.useEffect(()=>{s.current=l},[l]),oe.useEffect(()=>{let{current:d}=i;a.current=t,Me.valid(d)&&d.options(t||{},!0)},[t]),oe.useEffect(()=>{let{current:d}=i;c.current=r,Me.valid(d)&&d.on(r||{},!0)},[r]),oe.useEffect(()=>()=>{var d;o(),(d=i.current)==null||d.destroy()},[]),oe.useMemo(()=>[d=>{let f=i.current;if(Me.valid(f))return;let p=s.current,u=a.current||{},v=c.current||{},C=()=>i.current=Me(d,u,v);p?n(C,p):C()},()=>i.current],[])},Nn=(e,t)=>{let{element:r="div",options:l,events:n,defer:o,children:i,...s}=e,a=r,c=oe.useRef(null),d=oe.useRef(null),[f,p]=Bn({options:l,events:n,defer:o});return oe.useEffect(()=>{let{current:u}=c,{current:v}=d;return u&&v&&f({target:u,elements:{viewport:v,content:v}}),()=>{var C;return(C=p())==null?void 0:C.destroy()}},[f,r]),oe.useImperativeHandle(t,()=>({osInstance:p,getElement:()=>c.current}),[]),vr.createElement(a,{"data-overlayscrollbars-initialize":"",ref:c,...s},vr.createElement("div",{ref:d},i))},gl=oe.forwardRef(Nn),Xn=gl,Wn=gl;export{Xn as OverlayScrollbars,Wn as default};
//# sourceMappingURL=OverlayScrollbars-GZGLA7DL-06b6a638.js.map
