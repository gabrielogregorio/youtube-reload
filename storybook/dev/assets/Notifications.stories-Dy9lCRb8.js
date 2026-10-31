import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{d as t,f as n}from"./react-redux-rmF_8mjr.js";import{n as r}from"./iframe-C90GZkX_.js";import{n as i,t as a}from"./Notify-B3r7fRdO.js";var o,s,c,l,u,d,f,p,m;function h(){return(h=e((()=>{i(),n(),o=r(),{expect:s,waitFor:c}=__STORYBOOK_MODULE_TEST__,l=()=>(0,o.jsx)(`div`,{className:`relative h-[28rem]`,children:(0,o.jsx)(`div`,{className:`flex justify-end h-14 items-center`,children:(0,o.jsx)(a,{})})}),u={title:`Notifications/Bell`,component:l,beforeEach:()=>{t.clear()}},d={},f={play:async({canvas:e,canvasElement:t,userEvent:n})=>{await n.click(await e.findByRole(`button`,{name:/Open notifications/})),await s(e.getByRole(`dialog`,{name:`Notifications`})).toBeVisible(),await n.click(t.querySelector(`#notify-backdrop`)),await c(()=>s(e.queryByRole(`dialog`)).toBeNull())}},p={play:async({canvas:e,userEvent:t})=>{await t.click(await e.findByRole(`button`,{name:/Open notifications/})),await s(e.getByRole(`dialog`,{name:`Notifications`})).toBeVisible()}},m=[`WithUnread`,`OpenAndCloseOnTheBackdrop`,`OpenPanel`],d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvas,
    canvasElement,
    userEvent
  }) => {
    await userEvent.click(await canvas.findByRole('button', {
      name: /Open notifications/
    }));
    await expect(canvas.getByRole('dialog', {
      name: 'Notifications'
    })).toBeVisible();
    await userEvent.click(canvasElement.querySelector('#notify-backdrop') as HTMLElement);
    await waitFor(() => expect(canvas.queryByRole('dialog')).toBeNull());
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.click(await canvas.findByRole('button', {
      name: /Open notifications/
    }));
    await expect(canvas.getByRole('dialog', {
      name: 'Notifications'
    })).toBeVisible();
  }
}`,...p.parameters?.docs?.source}}}})))()}h();export{f as OpenAndCloseOnTheBackdrop,p as OpenPanel,d as WithUnread,m as __namedExportsOrder,u as default};