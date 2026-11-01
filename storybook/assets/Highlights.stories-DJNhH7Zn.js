import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{n as t}from"./iframe-DqKA2Mlg.js";import{i as n,r}from"./useCurrentScreen-Yf2YRyGW.js";import{n as i,t as a}from"./FloatingActionButtons-CPt_7aYY.js";import{n as o,t as s}from"./helpers-Z9deSQt7.js";var c,l,u,d,f,p,m,h,g;function _(){return(_=e((()=>{n(),i(),o(),c=t(),{fn:l}=__STORYBOOK_MODULE_TEST__,u={title:`Highlights/Daily carousel`,component:r},d={beforeEach:s(`2026-01-01T12:00:00`),play:async({canvas:e})=>{await e.findByRole(`heading`,{name:`New Year`})}},f={beforeEach:s(`2026-10-31T12:00:00`),play:async({canvas:e})=>{await e.findByRole(`heading`,{name:`Halloween`})}},p={beforeEach:s(`2026-12-25T12:00:00`),play:async({canvas:e})=>{await e.findByRole(`heading`,{name:`Christmas`})}},m={beforeEach:s(`2026-06-16T12:00:00`)},h={render:()=>(0,c.jsx)(`div`,{className:`relative h-72`,children:(0,c.jsx)(a,{generateRandomPlaylist:l()})})},g=[`NewYear`,`Halloween`,`Christmas`,`OrdinaryDay`,`ShortcutButtons`],d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  beforeEach: freezeDate('2026-01-01T12:00:00'),
  play: async ({
    canvas
  }) => {
    await canvas.findByRole('heading', {
      name: 'New Year'
    });
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  beforeEach: freezeDate('2026-10-31T12:00:00'),
  play: async ({
    canvas
  }) => {
    await canvas.findByRole('heading', {
      name: 'Halloween'
    });
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  beforeEach: freezeDate('2026-12-25T12:00:00'),
  play: async ({
    canvas
  }) => {
    await canvas.findByRole('heading', {
      name: 'Christmas'
    });
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  beforeEach: freezeDate('2026-06-16T12:00:00')
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div className="relative h-72">
      <FloatingActionButtons generateRandomPlaylist={fn()} />
    </div>
}`,...h.parameters?.docs?.source}}}})))()}_();export{p as Christmas,f as Halloween,d as NewYear,m as OrdinaryDay,h as ShortcutButtons,g as __namedExportsOrder,u as default};