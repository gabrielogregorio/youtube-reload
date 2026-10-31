import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{S as t,a as n,s as r,x as i}from"./react-redux-rmF_8mjr.js";import{i as a,n as o,r as s}from"./iframe-C90GZkX_.js";import{a as c,c as l,i as u,n as d,o as f,r as p,s as m,t as h}from"./navbar-BsiEyrMv.js";var g,_,v,y,b,x,S,C,w;function T(){return(T=e((()=>{l(),t(),n(),s(),u(),f(),d(),g=o(),{expect:_}=__STORYBOOK_MODULE_TEST__,v={title:`Navigation/Menu`,component:h},y={},b={play:async({canvas:e,userEvent:t})=>{let n=e.getByRole(`button`,{name:`Likes`});await t.click(n),await _(n).toHaveAccessibleName(`Likes`)}},x={render:()=>(0,g.jsx)(c,{})},S={render:()=>(0,g.jsx)(p,{})},C={render:()=>(0,g.jsx)(m,{}),play:async({canvas:e,userEvent:t})=>{let n=e.getByRole(`combobox`,{name:`Language`});await t.selectOptions(n,i.Portuguese),await _(a.getState().features.languageFeature.language).toBe(i.Portuguese),a.dispatch(r(i.English))}},w=[`Menu`,`OpensAnotherScreen`,`Brand`,`PageHeader`,`Language`],y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvas,
    userEvent
  }) => {
    const likes = canvas.getByRole('button', {
      name: 'Likes'
    });
    await userEvent.click(likes);
    await expect(likes).toHaveAccessibleName('Likes');
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <Logo />
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <Header />
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <LanguageSwitcher />,
  play: async ({
    canvas,
    userEvent
  }) => {
    const language = canvas.getByRole('combobox', {
      name: 'Language'
    });
    await userEvent.selectOptions(language, LanguageEnum.Portuguese);
    await expect(store.getState().features.languageFeature.language).toBe(LanguageEnum.Portuguese);
    store.dispatch(setLanguage(LanguageEnum.English));
  }
}`,...C.parameters?.docs?.source}}}})))()}T();export{x as Brand,C as Language,y as Menu,b as OpensAnotherScreen,S as PageHeader,w as __namedExportsOrder,v as default};