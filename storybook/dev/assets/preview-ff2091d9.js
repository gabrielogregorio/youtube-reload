import{c as Y}from"./_commonjsHelpers-3b64f33a.js";import"./iframe-6398b68d.js";import"../sb-preview/runtime.js";(function(){try{var s=typeof window<"u"?window:typeof I<"u"?I:typeof self<"u"?self:{},t=new Error().stack;t&&(s._sentryDebugIds=s._sentryDebugIds||{},s._sentryDebugIds[t]="3a9dcd2f-ad5e-4346-9189-5c34a6c5f1dd",s._sentryDebugIdIdentifier="sentry-dbid-3a9dcd2f-ad5e-4346-9189-5c34a6c5f1dd")}catch{}})();const{addons:V}=__STORYBOOK_MODULE_PREVIEW_API__,{once:K,logger:W}=__STORYBOOK_MODULE_CLIENT_LOGGER__,{FORCE_REMOUNT:T,STORY_RENDER_PHASE_CHANGED:$,SET_CURRENT_STORY:z,IGNORED_EXCEPTION:H}=__STORYBOOK_MODULE_CORE_EVENTS__,{global:g}=__STORYBOOK_MODULE_GLOBAL__;var X=(s=>(s.DONE="done",s.ERROR="error",s.ACTIVE="active",s.WAITING="waiting",s))(X||{}),m={CALL:"storybook/instrumenter/call",SYNC:"storybook/instrumenter/sync",START:"storybook/instrumenter/start",BACK:"storybook/instrumenter/back",GOTO:"storybook/instrumenter/goto",NEXT:"storybook/instrumenter/next",END:"storybook/instrumenter/end"},A={start:!1,back:!1,goto:!1,next:!1,end:!1},P=new Error("This function ran after the play function completed. Did you forget to `await` it?"),N=s=>Object.prototype.toString.call(s)==="[object Object]",J=s=>Object.prototype.toString.call(s)==="[object Module]",q=s=>{if(!N(s)&&!J(s))return!1;if(s.constructor===void 0)return!0;let t=s.constructor.prototype;return!(!N(t)||Object.prototype.hasOwnProperty.call(t,"isPrototypeOf")===!1)},Q=s=>{try{return new s.constructor}catch{return{}}},w=()=>({renderPhase:void 0,isDebugging:!1,isPlaying:!1,isLocked:!1,cursor:0,calls:[],shadowCalls:[],callRefsByResult:new Map,chainedCallIds:new Set,ancestors:[],playUntil:void 0,resolvers:{},syncTimeout:void 0}),D=(s,t=!1)=>{let e=(t?s.shadowCalls:s.calls).filter(o=>o.retain);if(!e.length)return;let c=new Map(Array.from(s.callRefsByResult.entries()).filter(([,o])=>o.retain));return{cursor:e.length,calls:e,callRefsByResult:c}},Z=class{constructor(){this.initialized=!1,this.channel=V.getChannel(),this.state=g.window.parent.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER_STATE__||{};let s=({storyId:i,isPlaying:n=!0,isDebugging:r=!1})=>{let l=this.getState(i);this.setState(i,{...w(),...D(l,r),shadowCalls:r?l.shadowCalls:[],chainedCallIds:r?l.chainedCallIds:new Set,playUntil:r?l.playUntil:void 0,isPlaying:n,isDebugging:r}),this.sync(i)};this.channel.on(T,s),this.channel.on($,({storyId:i,newPhase:n})=>{let{isDebugging:r}=this.getState(i);this.setState(i,{renderPhase:n}),n==="preparing"&&r&&s({storyId:i}),n==="playing"&&s({storyId:i,isDebugging:r}),n==="played"&&this.setState(i,{isLocked:!1,isPlaying:!1,isDebugging:!1}),n==="errored"&&this.setState(i,{isLocked:!1,isPlaying:!1})}),this.channel.on(z,()=>{this.initialized?this.cleanup():this.initialized=!0});let t=({storyId:i,playUntil:n})=>{this.getState(i).isDebugging||this.setState(i,({calls:l})=>({calls:[],shadowCalls:l.map(u=>({...u,status:"waiting"})),isDebugging:!0}));let r=this.getLog(i);this.setState(i,({shadowCalls:l})=>{var f;if(n||!r.length)return{playUntil:n};let u=l.findIndex(_=>_.id===r[0].callId);return{playUntil:(f=l.slice(0,u).filter(_=>_.interceptable&&!_.ancestors.length).slice(-1)[0])==null?void 0:f.id}}),this.channel.emit(T,{storyId:i,isDebugging:!0})},e=({storyId:i})=>{var l;let n=this.getLog(i).filter(u=>!u.ancestors.length),r=n.reduceRight((u,f,_)=>u>=0||f.status==="waiting"?u:_,-1);t({storyId:i,playUntil:(l=n[r-1])==null?void 0:l.callId})},c=({storyId:i,callId:n})=>{var d;let{calls:r,shadowCalls:l,resolvers:u}=this.getState(i),f=r.find(({id:p})=>p===n),_=l.find(({id:p})=>p===n);if(!f&&_&&Object.values(u).length>0){let p=(d=this.getLog(i).find(h=>h.status==="waiting"))==null?void 0:d.callId;_.id!==p&&this.setState(i,{playUntil:_.id}),Object.values(u).forEach(h=>h())}else t({storyId:i,playUntil:n})},o=({storyId:i})=>{var r;let{resolvers:n}=this.getState(i);if(Object.values(n).length>0)Object.values(n).forEach(l=>l());else{let l=(r=this.getLog(i).find(u=>u.status==="waiting"))==null?void 0:r.callId;l?t({storyId:i,playUntil:l}):a({storyId:i})}},a=({storyId:i})=>{this.setState(i,{playUntil:void 0,isDebugging:!1}),Object.values(this.getState(i).resolvers).forEach(n=>n())};this.channel.on(m.START,t),this.channel.on(m.BACK,e),this.channel.on(m.GOTO,c),this.channel.on(m.NEXT,o),this.channel.on(m.END,a)}getState(s){return this.state[s]||w()}setState(s,t){let e=this.getState(s),c=typeof t=="function"?t(e):t;this.state={...this.state,[s]:{...e,...c}},g.window.parent.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER_STATE__=this.state}cleanup(){this.state=Object.entries(this.state).reduce((t,[e,c])=>{let o=D(c);return o&&(t[e]=Object.assign(w(),o)),t},{});let s={controlStates:A,logItems:[]};this.channel.emit(m.SYNC,s),g.window.parent.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER_STATE__=this.state}getLog(s){let{calls:t,shadowCalls:e}=this.getState(s),c=[...e];t.forEach((a,i)=>{c[i]=a});let o=new Set;return c.reduceRight((a,i)=>(i.args.forEach(n=>{n!=null&&n.__callId__&&o.add(n.__callId__)}),i.path.forEach(n=>{n.__callId__&&o.add(n.__callId__)}),(i.interceptable||i.exception)&&!o.has(i.id)&&(a.unshift({callId:i.id,status:i.status,ancestors:i.ancestors}),o.add(i.id)),a),[])}instrument(s,t){if(!q(s))return s;let{mutate:e=!1,path:c=[]}=t;return Object.keys(s).reduce((o,a)=>{let i=s[a];return typeof i!="function"?(o[a]=this.instrument(i,{...t,path:c.concat(a)}),o):typeof i.__originalFn__=="function"?(o[a]=i,o):(o[a]=(...n)=>this.track(a,i,n,t),o[a].__originalFn__=i,Object.defineProperty(o[a],"name",{value:a,writable:!1}),Object.keys(i).length>0&&Object.assign(o[a],this.instrument({...i},{...t,path:c.concat(a)})),o)},e?s:Q(s))}track(s,t,e,c){var p,h,y,k;let o=((p=e==null?void 0:e[0])==null?void 0:p.__storyId__)||((k=(y=(h=g.__STORYBOOK_PREVIEW__)==null?void 0:h.selectionStore)==null?void 0:y.selection)==null?void 0:k.storyId),{cursor:a,ancestors:i}=this.getState(o);this.setState(o,{cursor:a+1});let n=`${i.slice(-1)[0]||o} [${a}] ${s}`,{path:r=[],intercept:l=!1,retain:u=!1}=c,f=typeof l=="function"?l(s,r):l,_={id:n,cursor:a,storyId:o,ancestors:i,path:r,method:s,args:e,interceptable:f,retain:u},d=(f&&!i.length?this.intercept:this.invoke).call(this,t,_,c);return this.instrument(d,{...c,mutate:!0,path:[{__callId__:_.id}]})}intercept(s,t,e){let{chainedCallIds:c,isDebugging:o,playUntil:a}=this.getState(t.storyId),i=c.has(t.id);return!o||i||a?(a===t.id&&this.setState(t.storyId,{playUntil:void 0}),this.invoke(s,t,e)):new Promise(n=>{this.setState(t.storyId,({resolvers:r})=>({isLocked:!1,resolvers:{...r,[t.id]:n}}))}).then(()=>(this.setState(t.storyId,n=>{let{[t.id]:r,...l}=n.resolvers;return{isLocked:!0,resolvers:l}}),this.invoke(s,t,e)))}invoke(s,t,e){let{callRefsByResult:c,renderPhase:o}=this.getState(t.storyId),a=r=>{var l,u;if(c.has(r))return c.get(r);if(r instanceof Array)return r.map(a);if(r instanceof Date)return{__date__:{value:r.toISOString()}};if(r instanceof Error){let{name:f,message:_,stack:d}=r;return{__error__:{name:f,message:_,stack:d}}}if(r instanceof RegExp){let{flags:f,source:_}=r;return{__regexp__:{flags:f,source:_}}}if(r instanceof g.window.HTMLElement){let{prefix:f,localName:_,id:d,classList:p,innerText:h}=r,y=Array.from(p);return{__element__:{prefix:f,localName:_,id:d,classNames:y,innerText:h}}}return typeof r=="function"?{__function__:{name:r.name}}:typeof r=="symbol"?{__symbol__:{description:r.description}}:typeof r=="object"&&((l=r==null?void 0:r.constructor)!=null&&l.name)&&((u=r==null?void 0:r.constructor)==null?void 0:u.name)!=="Object"?{__class__:{name:r.constructor.name}}:Object.prototype.toString.call(r)==="[object Object]"?Object.fromEntries(Object.entries(r).map(([f,_])=>[f,a(_)])):r},i={...t,args:t.args.map(a)};t.path.forEach(r=>{r!=null&&r.__callId__&&this.setState(t.storyId,({chainedCallIds:l})=>({chainedCallIds:new Set(Array.from(l).concat(r.__callId__))}))});let n=r=>{if(r instanceof Error){let{name:l,message:u,stack:f,callId:_=t.id}=r,d={name:l,message:u,stack:f,callId:_};if(this.update({...i,status:"error",exception:d}),this.setState(t.storyId,p=>({callRefsByResult:new Map([...Array.from(p.callRefsByResult.entries()),[r,{__callId__:t.id,retain:t.retain}]])})),t.ancestors.length)throw Object.prototype.hasOwnProperty.call(r,"callId")||Object.defineProperty(r,"callId",{value:t.id}),r;if(r!==P)throw W.warn(r),H}throw r};try{if(o==="played"&&!t.retain)throw P;let r=(e.getArgs?e.getArgs(t,this.getState(t.storyId)):t.args).map(u=>typeof u!="function"||Object.keys(u).length?u:(...f)=>{let{cursor:_,ancestors:d}=this.getState(t.storyId);this.setState(t.storyId,{cursor:0,ancestors:[...d,t.id]});let p=()=>this.setState(t.storyId,{cursor:_,ancestors:d}),h=!1;try{let y=u(...f);return y instanceof Promise?(h=!0,y.finally(p)):y}finally{h||p()}}),l=s(...r);return l&&["object","function","symbol"].includes(typeof l)&&this.setState(t.storyId,u=>({callRefsByResult:new Map([...Array.from(u.callRefsByResult.entries()),[l,{__callId__:t.id,retain:t.retain}]])})),this.update({...i,status:l instanceof Promise?"active":"done"}),l instanceof Promise?l.then(u=>(this.update({...i,status:"done"}),u),n):l}catch(r){return n(r)}}update(s){this.channel.emit(m.CALL,s),this.setState(s.storyId,({calls:t})=>{let e=t.concat(s).reduce((c,o)=>Object.assign(c,{[o.id]:o}),{});return{calls:Object.values(e).sort((c,o)=>c.id.localeCompare(o.id,void 0,{numeric:!0}))}}),this.sync(s.storyId)}sync(s){let t=()=>{var l;let{isLocked:e,isPlaying:c}=this.getState(s),o=this.getLog(s),a=(l=o.filter(({ancestors:u})=>!u.length).find(u=>u.status==="waiting"))==null?void 0:l.callId,i=o.some(u=>u.status==="active");if(e||i||o.length===0){let u={controlStates:A,logItems:o};this.channel.emit(m.SYNC,u);return}let n=o.some(u=>u.status==="done"||u.status==="error"),r={controlStates:{start:n,back:n,goto:!0,next:c,end:c},logItems:o,pausedAt:a};this.channel.emit(m.SYNC,r)};this.setState(s,({syncTimeout:e})=>(clearTimeout(e),{syncTimeout:setTimeout(t,0)}))}};function x(s,t={}){var e,c,o,a;try{let i=!1,n=!1;return(c=(e=g.window.location)==null?void 0:e.search)!=null&&c.includes("instrument=true")?i=!0:(a=(o=g.window.location)==null?void 0:o.search)!=null&&a.includes("instrument=false")&&(n=!0),g.window.parent===g.window&&!i||n?s:(g.window.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER__||(g.window.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER__=new Z),g.window.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER__.instrument(s,t))}catch(i){return K.warn(i),s}}var O={};Object.defineProperty(O,"__esModule",{value:!0});O.spyOn=O.mocked=O.fn=U=O.ModuleMocker=void 0;function S(s,t,e){return t in s?Object.defineProperty(s,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):s[t]=e,s}const b="mockConstructor",F=/[\s!-\/:-@\[-`{-~]/,tt=new RegExp(F.source,"g"),et=new Set(["arguments","await","break","case","catch","class","const","continue","debugger","default","delete","do","else","enum","eval","export","extends","false","finally","for","function","if","implements","import","in","instanceof","interface","let","new","null","package","private","protected","public","return","static","super","switch","this","throw","true","try","typeof","var","void","while","with","yield"]);function nt(s,t){let e;switch(t){case 1:e=function(c){return s.apply(this,arguments)};break;case 2:e=function(c,o){return s.apply(this,arguments)};break;case 3:e=function(c,o,a){return s.apply(this,arguments)};break;case 4:e=function(c,o,a,i){return s.apply(this,arguments)};break;case 5:e=function(c,o,a,i,n){return s.apply(this,arguments)};break;case 6:e=function(c,o,a,i,n,r){return s.apply(this,arguments)};break;case 7:e=function(c,o,a,i,n,r,l){return s.apply(this,arguments)};break;case 8:e=function(c,o,a,i,n,r,l,u){return s.apply(this,arguments)};break;case 9:e=function(c,o,a,i,n,r,l,u,f){return s.apply(this,arguments)};break;default:e=function(){return s.apply(this,arguments)};break}return e}function R(s){return Object.prototype.toString.apply(s).slice(8,-1)}function rt(s){const t=R(s);return t==="Function"||t==="AsyncFunction"||t==="GeneratorFunction"?"function":Array.isArray(s)?"array":t==="Object"?"object":t==="Number"||t==="String"||t==="Boolean"||t==="Symbol"?"constant":t==="Map"||t==="WeakMap"||t==="Set"?"collection":t==="RegExp"?"regexp":s===void 0?"undefined":s===null?"null":null}function it(s,t){if(t==="arguments"||t==="caller"||t==="callee"||t==="name"||t==="length"){const e=R(s);return e==="Function"||e==="AsyncFunction"||e==="GeneratorFunction"}return t==="source"||t==="global"||t==="ignoreCase"||t==="multiline"?R(s)==="RegExp":!1}class L{constructor(t){S(this,"_environmentGlobal",void 0),S(this,"_mockState",void 0),S(this,"_mockConfigRegistry",void 0),S(this,"_spyState",void 0),S(this,"_invocationCallCounter",void 0),this._environmentGlobal=t,this._mockState=new WeakMap,this._mockConfigRegistry=new WeakMap,this._spyState=new Set,this._invocationCallCounter=1}_getSlots(t){if(!t)return[];const e=new Set,c=this._environmentGlobal.Object.prototype,o=this._environmentGlobal.Function.prototype,a=this._environmentGlobal.RegExp.prototype,i=Object.prototype,n=Function.prototype,r=RegExp.prototype;for(;t!=null&&t!==c&&t!==o&&t!==a&&t!==i&&t!==n&&t!==r;){const l=Object.getOwnPropertyNames(t);for(let u=0;u<l.length;u++){const f=l[u];if(!it(t,f)){const _=Object.getOwnPropertyDescriptor(t,f);(_!==void 0&&!_.get||t.__esModule)&&e.add(f)}}t=Object.getPrototypeOf(t)}return Array.from(e)}_ensureMockConfig(t){let e=this._mockConfigRegistry.get(t);return e||(e=this._defaultMockConfig(),this._mockConfigRegistry.set(t,e)),e}_ensureMockState(t){let e=this._mockState.get(t);return e||(e=this._defaultMockState(),this._mockState.set(t,e)),e.calls.length>0&&(e.lastCall=e.calls[e.calls.length-1]),e}_defaultMockConfig(){return{mockImpl:void 0,mockName:"jest.fn()",specificMockImpls:[],specificReturnValues:[]}}_defaultMockState(){return{calls:[],instances:[],invocationCallOrder:[],results:[]}}_makeComponent(t,e){if(t.type==="object")return new this._environmentGlobal.Object;if(t.type==="array")return new this._environmentGlobal.Array;if(t.type==="regexp")return new this._environmentGlobal.RegExp("");if(t.type==="constant"||t.type==="collection"||t.type==="null"||t.type==="undefined")return t.value;if(t.type==="function"){const c=t.members&&t.members.prototype&&t.members.prototype.members||{},o=this._getSlots(c),a=this,i=nt(function(...r){const l=a._ensureMockState(n),u=a._ensureMockConfig(n);l.instances.push(this),l.calls.push(r);const f={type:"incomplete",value:void 0};l.results.push(f),l.invocationCallOrder.push(a._invocationCallCounter++);let _,d,p=!1;try{_=(()=>{if(this instanceof n){o.forEach(k=>{if(c[k].type==="function"){const G=this[k];this[k]=a.generateFromMetadata(c[k]),this[k]._protoImpl=G}});const y=u.specificMockImpls.length?u.specificMockImpls.shift():u.mockImpl;return y&&y.apply(this,arguments)}let h=u.specificMockImpls.shift();if(h===void 0&&(h=u.mockImpl),h)return h.apply(this,arguments);if(n._protoImpl)return n._protoImpl.apply(this,arguments)})()}catch(h){throw d=h,p=!0,h}finally{f.type=p?"throw":"return",f.value=p?d:_}return _},t.length||0),n=this._createMockFunction(t,i);return n._isMockFunction=!0,n.getMockImplementation=()=>this._ensureMockConfig(n).mockImpl,typeof e=="function"&&this._spyState.add(e),this._mockState.set(n,this._defaultMockState()),this._mockConfigRegistry.set(n,this._defaultMockConfig()),Object.defineProperty(n,"mock",{configurable:!1,enumerable:!0,get:()=>this._ensureMockState(n),set:r=>this._mockState.set(n,r)}),n.mockClear=()=>(this._mockState.delete(n),n),n.mockReset=()=>(n.mockClear(),this._mockConfigRegistry.delete(n),n),n.mockRestore=()=>(n.mockReset(),e?e():void 0),n.mockReturnValueOnce=r=>n.mockImplementationOnce(()=>r),n.mockResolvedValueOnce=r=>n.mockImplementationOnce(()=>Promise.resolve(r)),n.mockRejectedValueOnce=r=>n.mockImplementationOnce(()=>Promise.reject(r)),n.mockReturnValue=r=>n.mockImplementation(()=>r),n.mockResolvedValue=r=>n.mockImplementation(()=>Promise.resolve(r)),n.mockRejectedValue=r=>n.mockImplementation(()=>Promise.reject(r)),n.mockImplementationOnce=r=>(this._ensureMockConfig(n).specificMockImpls.push(r),n),n.mockImplementation=r=>{const l=this._ensureMockConfig(n);return l.mockImpl=r,n},n.mockReturnThis=()=>n.mockImplementation(function(){return this}),n.mockName=r=>{if(r){const l=this._ensureMockConfig(n);l.mockName=r}return n},n.getMockName=()=>this._ensureMockConfig(n).mockName||"jest.fn()",t.mockImpl&&n.mockImplementation(t.mockImpl),n}else{const c=t.type||"undefined type";throw new Error("Unrecognized type "+c)}}_createMockFunction(t,e){let c=t.name;if(!c)return e;const o="bound ";let a="";if(c&&c.startsWith(o))do c=c.substring(o.length),a=".bind(null)";while(c&&c.startsWith(o));if(c===b)return e;(et.has(c)||/^\d/.test(c))&&(c="$"+c),F.test(c)&&(c=c.replace(tt,"$"));const i="return function "+c+"() {return "+b+".apply(this,arguments);}"+a;return new this._environmentGlobal.Function(b,i)(e)}_generateMock(t,e,c){const o=this._makeComponent(t);return t.refID!=null&&(c[t.refID]=o),this._getSlots(t.members).forEach(a=>{const i=t.members&&t.members[a]||{};i.ref!=null?e.push(function(n){return()=>o[a]=c[n]}(i.ref)):o[a]=this._generateMock(i,e,c)}),t.type!=="undefined"&&t.type!=="null"&&o.prototype&&typeof o.prototype=="object"&&(o.prototype.constructor=o),o}generateFromMetadata(t){const e=[],c={},o=this._generateMock(t,e,c);return e.forEach(a=>a()),o}getMetadata(t,e){const c=e||new Map,o=c.get(t);if(o!=null)return{ref:o};const a=rt(t);if(!a)return null;const i={type:a};if(a==="constant"||a==="collection"||a==="undefined"||a==="null")return i.value=t,i;a==="function"&&(i.name=t.name,t._isMockFunction===!0&&(i.mockImpl=t.getMockImplementation())),i.refID=c.size,c.set(t,i.refID);let n=null;return a!=="array"&&this._getSlots(t).forEach(r=>{if(a==="function"&&t._isMockFunction===!0&&r.match(/^mock/))return;const l=this.getMetadata(t[r],c);l&&(n||(n={}),n[r]=l)}),n&&(i.members=n),i}isMockFunction(t){return!!t&&t._isMockFunction===!0}fn(t){const e=t?t.length:0,c=this._makeComponent({length:e,type:"function"});return t&&c.mockImplementation(t),c}spyOn(t,e,c){if(c)return this._spyOnProperty(t,e,c);if(typeof t!="object"&&typeof t!="function")throw new Error("Cannot spyOn on a primitive value; "+this._typeOf(t)+" given");const o=t[e];if(!this.isMockFunction(o)){if(typeof o!="function")throw new Error("Cannot spy the "+e+" property because it is not a function; "+this._typeOf(o)+" given instead");const a=Object.prototype.hasOwnProperty.call(t,e);let i=Object.getOwnPropertyDescriptor(t,e),n=Object.getPrototypeOf(t);for(;!i&&n!==null;)i=Object.getOwnPropertyDescriptor(n,e),n=Object.getPrototypeOf(n);let r;if(i&&i.get){const l=i.get;r=this._makeComponent({type:"function"},()=>{i.get=l,Object.defineProperty(t,e,i)}),i.get=()=>r,Object.defineProperty(t,e,i)}else r=this._makeComponent({type:"function"},()=>{a?t[e]=o:delete t[e]}),t[e]=r;r.mockImplementation(function(){return o.apply(this,arguments)})}return t[e]}_spyOnProperty(t,e,c="get"){if(typeof t!="object"&&typeof t!="function")throw new Error("Cannot spyOn on a primitive value; "+this._typeOf(t)+" given");if(!t)throw new Error("spyOn could not find an object to spy upon for "+e);if(!e)throw new Error("No property name supplied");let o=Object.getOwnPropertyDescriptor(t,e),a=Object.getPrototypeOf(t);for(;!o&&a!==null;)o=Object.getOwnPropertyDescriptor(a,e),a=Object.getPrototypeOf(a);if(!o)throw new Error(e+" property does not exist");if(!o.configurable)throw new Error(e+" is not declared configurable");if(!o[c])throw new Error("Property "+e+" does not have access type "+c);const i=o[c];if(!this.isMockFunction(i)){if(typeof i!="function")throw new Error("Cannot spy the "+e+" property because it is not a function; "+this._typeOf(i)+" given instead");o[c]=this._makeComponent({type:"function"},()=>{o[c]=i,Object.defineProperty(t,e,o)}),o[c].mockImplementation(function(){return i.apply(this,arguments)})}return Object.defineProperty(t,e,o),o[c]}clearAllMocks(){this._mockState=new WeakMap}resetAllMocks(){this._mockConfigRegistry=new WeakMap,this._mockState=new WeakMap}restoreAllMocks(){this._spyState.forEach(t=>t()),this._spyState=new Set}_typeOf(t){return t==null?""+t:typeof t}mocked(t,e=!1){return t}}var U=O.ModuleMocker=L;const E=new L(Y),st=E.fn.bind(E);O.fn=st;const ot=E.spyOn.bind(E);O.spyOn=ot;const ct=E.mocked.bind(E);O.mocked=ct;const{addons:at}=__STORYBOOK_MODULE_PREVIEW_API__,{global:I}=__STORYBOOK_MODULE_GLOBAL__,{FORCE_REMOUNT:lt,STORY_RENDER_PHASE_CHANGED:ut}=__STORYBOOK_MODULE_CORE_EVENTS__;var v=new U(I),_t=v.fn.bind(v),{action:ft}=x({action:_t},{retain:!0}),B=at.getChannel(),j=new Set,M=[];B.on(lt,()=>M.forEach(s=>{var t;return(t=s==null?void 0:s.mockClear)==null?void 0:t.call(s)}));B.on(ut,({newPhase:s})=>{s==="loading"&&M.forEach(t=>{var e;return(e=t==null?void 0:t.mockClear)==null?void 0:e.call(t)})});var C=(s,t,e)=>{if(j.has(t))return t;j.add(t);try{if(Object.prototype.toString.call(t)==="[object Object]"){for(let[c,o]of Object.entries(t))t[c]=C(s,o,c);return t}if(Array.isArray(t))return t.map((c,o)=>C(s,c,`${e}[${o}]`));if(typeof t=="function"&&t.isAction){Object.defineProperty(t,"name",{value:e,writable:!1}),Object.defineProperty(t,"__storyId__",{value:s,writable:!1});let c=ft(t);return M.push(c),c}}catch{}return t},pt=({id:s,initialArgs:t})=>C(s,t),yt=[pt],{step:mt}=x({step:(s,t,e)=>t(e)},{intercept:!0}),Ot={throwPlayFunctionExceptions:!1};export{yt as argsEnhancers,Ot as parameters,mt as runStep};
//# sourceMappingURL=preview-ff2091d9.js.map