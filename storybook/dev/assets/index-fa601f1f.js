import{g as D}from"./_commonjsHelpers-cf6b954f.js";import"./iframe-d6f03620.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},t=new Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="9f69469d-fc06-492f-afd7-8e200fd9406f",e._sentryDebugIdIdentifier="sentry-dbid-9f69469d-fc06-492f-afd7-8e200fd9406f")}catch{}})();function A(e,t){for(var n=0;n<t.length;n++){const u=t[n];if(typeof u!="string"&&!Array.isArray(u)){for(const o in u)if(o!=="default"&&!(o in e)){const f=Object.getOwnPropertyDescriptor(u,o);f&&Object.defineProperty(e,o,f.get?f:{enumerable:!0,get:()=>u[o]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}var m={},T={get exports(){return m},set exports(e){m=e}},r={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var y=Symbol.for("react.element"),V=Symbol.for("react.portal"),F=Symbol.for("react.fragment"),U=Symbol.for("react.strict_mode"),q=Symbol.for("react.profiler"),L=Symbol.for("react.provider"),M=Symbol.for("react.context"),N=Symbol.for("react.forward_ref"),z=Symbol.for("react.suspense"),B=Symbol.for("react.memo"),H=Symbol.for("react.lazy"),E=Symbol.iterator;function W(e){return e===null||typeof e!="object"?null:(e=E&&e[E]||e["@@iterator"],typeof e=="function"?e:null)}var $={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},j=Object.assign,C={};function p(e,t,n){this.props=e,this.context=t,this.refs=C,this.updater=n||$}p.prototype.isReactComponent={};p.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};p.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function O(){}O.prototype=p.prototype;function S(e,t,n){this.props=e,this.context=t,this.refs=C,this.updater=n||$}var b=S.prototype=new O;b.constructor=S;j(b,p.prototype);b.isPureReactComponent=!0;var k=Array.isArray,x=Object.prototype.hasOwnProperty,g={current:null},I={key:!0,ref:!0,__self:!0,__source:!0};function P(e,t,n){var u,o={},f=null,s=null;if(t!=null)for(u in t.ref!==void 0&&(s=t.ref),t.key!==void 0&&(f=""+t.key),t)x.call(t,u)&&!I.hasOwnProperty(u)&&(o[u]=t[u]);var c=arguments.length-2;if(c===1)o.children=n;else if(1<c){for(var i=Array(c),a=0;a<c;a++)i[a]=arguments[a+2];o.children=i}if(e&&e.defaultProps)for(u in c=e.defaultProps,c)o[u]===void 0&&(o[u]=c[u]);return{$$typeof:y,type:e,key:f,ref:s,props:o,_owner:g.current}}function G(e,t){return{$$typeof:y,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function w(e){return typeof e=="object"&&e!==null&&e.$$typeof===y}function J(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var R=/\/+/g;function v(e,t){return typeof e=="object"&&e!==null&&e.key!=null?J(""+e.key):t.toString(36)}function _(e,t,n,u,o){var f=typeof e;(f==="undefined"||f==="boolean")&&(e=null);var s=!1;if(e===null)s=!0;else switch(f){case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case y:case V:s=!0}}if(s)return s=e,o=o(s),e=u===""?"."+v(s,0):u,k(o)?(n="",e!=null&&(n=e.replace(R,"$&/")+"/"),_(o,t,n,"",function(a){return a})):o!=null&&(w(o)&&(o=G(o,n+(!o.key||s&&s.key===o.key?"":(""+o.key).replace(R,"$&/")+"/")+e)),t.push(o)),1;if(s=0,u=u===""?".":u+":",k(e))for(var c=0;c<e.length;c++){f=e[c];var i=u+v(f,c);s+=_(f,t,n,i,o)}else if(i=W(e),typeof i=="function")for(e=i.call(e),c=0;!(f=e.next()).done;)f=f.value,i=u+v(f,c++),s+=_(f,t,n,i,o);else if(f==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return s}function d(e,t,n){if(e==null)return e;var u=[],o=0;return _(e,u,"","",function(f){return t.call(n,f,o++)}),u}function K(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var l={current:null},h={transition:null},Q={ReactCurrentDispatcher:l,ReactCurrentBatchConfig:h,ReactCurrentOwner:g};r.Children={map:d,forEach:function(e,t,n){d(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return d(e,function(){t++}),t},toArray:function(e){return d(e,function(t){return t})||[]},only:function(e){if(!w(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};r.Component=p;r.Fragment=F;r.Profiler=q;r.PureComponent=S;r.StrictMode=U;r.Suspense=z;r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Q;r.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var u=j({},e.props),o=e.key,f=e.ref,s=e._owner;if(t!=null){if(t.ref!==void 0&&(f=t.ref,s=g.current),t.key!==void 0&&(o=""+t.key),e.type&&e.type.defaultProps)var c=e.type.defaultProps;for(i in t)x.call(t,i)&&!I.hasOwnProperty(i)&&(u[i]=t[i]===void 0&&c!==void 0?c[i]:t[i])}var i=arguments.length-2;if(i===1)u.children=n;else if(1<i){c=Array(i);for(var a=0;a<i;a++)c[a]=arguments[a+2];u.children=c}return{$$typeof:y,type:e.type,key:o,ref:f,props:u,_owner:s}};r.createContext=function(e){return e={$$typeof:M,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:L,_context:e},e.Consumer=e};r.createElement=P;r.createFactory=function(e){var t=P.bind(null,e);return t.type=e,t};r.createRef=function(){return{current:null}};r.forwardRef=function(e){return{$$typeof:N,render:e}};r.isValidElement=w;r.lazy=function(e){return{$$typeof:H,_payload:{_status:-1,_result:e},_init:K}};r.memo=function(e,t){return{$$typeof:B,type:e,compare:t===void 0?null:t}};r.startTransition=function(e){var t=h.transition;h.transition={};try{e()}finally{h.transition=t}};r.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")};r.useCallback=function(e,t){return l.current.useCallback(e,t)};r.useContext=function(e){return l.current.useContext(e)};r.useDebugValue=function(){};r.useDeferredValue=function(e){return l.current.useDeferredValue(e)};r.useEffect=function(e,t){return l.current.useEffect(e,t)};r.useId=function(){return l.current.useId()};r.useImperativeHandle=function(e,t,n){return l.current.useImperativeHandle(e,t,n)};r.useInsertionEffect=function(e,t){return l.current.useInsertionEffect(e,t)};r.useLayoutEffect=function(e,t){return l.current.useLayoutEffect(e,t)};r.useMemo=function(e,t){return l.current.useMemo(e,t)};r.useReducer=function(e,t,n){return l.current.useReducer(e,t,n)};r.useRef=function(e){return l.current.useRef(e)};r.useState=function(e){return l.current.useState(e)};r.useSyncExternalStore=function(e,t,n){return l.current.useSyncExternalStore(e,t,n)};r.useTransition=function(){return l.current.useTransition()};r.version="18.2.0";(function(e){e.exports=r})(T);const Y=D(m),ee=A({__proto__:null,default:Y},[m]);export{Y as R,ee as a,m as r};
//# sourceMappingURL=index-fa601f1f.js.map
