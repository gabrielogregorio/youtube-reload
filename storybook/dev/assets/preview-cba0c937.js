(function(){try{var e=typeof window<"u"?window:typeof d<"u"?d:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},t=new e.Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="cd2f3f3e-21e1-4b00-989a-0650496ee526",e._sentryDebugIdIdentifier="sentry-dbid-cd2f3f3e-21e1-4b00-989a-0650496ee526")}catch{}})();const{global:d}=__STORYBOOK_MODULE_GLOBAL__,{addons:a}=__STORYBOOK_MODULE_PREVIEW_API__,{STORY_CHANGED:g}=__STORYBOOK_MODULE_CORE_EVENTS__;var h="storybook/highlight",r="storybookHighlight",f=`${h}/add`,b=`${h}/reset`,{document:i}=d,O=(e="#FF4785",t="dashed")=>`
  outline: 2px ${t} ${e};
  outline-offset: 2px;
  box-shadow: 0 0 0 6px rgba(255,255,255,0.6);
`,I=e=>({outline:`2px dashed ${e}`,outlineOffset:2,boxShadow:"0 0 0 6px rgba(255,255,255,0.6)"}),l=a.getChannel(),y=e=>{let t=r;s();let n=Array.from(new Set(e.elements)),o=i.createElement("style");o.setAttribute("id",t),o.innerHTML=n.map(_=>`${_}{
          ${O(e.color,e.style)}
         }`).join(" "),i.head.appendChild(o)},s=()=>{var n;let e=r,t=i.getElementById(e);t&&((n=t.parentNode)==null||n.removeChild(t))};l.on(g,s);l.on(b,s);l.on(f,y);export{I as highlightObject,O as highlightStyle};
