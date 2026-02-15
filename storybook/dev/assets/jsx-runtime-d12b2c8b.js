import"./iframe-fe9fabdf.js";import{r as l}from"./index-ee878efb.js";(function(){try{var r=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},e=new r.Error().stack;e&&(r._sentryDebugIds=r._sentryDebugIds||{},r._sentryDebugIds[e]="961e3fc4-fdfc-4389-9224-9c266b4afae2",r._sentryDebugIdIdentifier="sentry-dbid-961e3fc4-fdfc-4389-9224-9c266b4afae2")}catch{}})();var a={exports:{}},n={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var u=l,_=Symbol.for("react.element"),c=Symbol.for("react.fragment"),y=Object.prototype.hasOwnProperty,b=u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,m={key:!0,ref:!0,__self:!0,__source:!0};function p(r,e,s){var t,o={},f=null,i=null;s!==void 0&&(f=""+s),e.key!==void 0&&(f=""+e.key),e.ref!==void 0&&(i=e.ref);for(t in e)y.call(e,t)&&!m.hasOwnProperty(t)&&(o[t]=e[t]);if(r&&r.defaultProps)for(t in e=r.defaultProps,e)o[t]===void 0&&(o[t]=e[t]);return{$$typeof:_,type:r,key:f,ref:i,props:o,_owner:b.current}}n.Fragment=c;n.jsx=p;n.jsxs=p;a.exports=n;var d=a.exports;const j=d.Fragment,v=d.jsx,w=d.jsxs;export{j as F,w as a,v as j};
