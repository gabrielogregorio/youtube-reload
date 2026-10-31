import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{n as t}from"./iframe-C90GZkX_.js";import{n,r}from"./helpers-Z9deSQt7.js";import{a as i,c as a,d as o,f as s,i as c,n as l,o as u,r as d,s as f,t as p}from"./generatePlaylists-Cnab5ii8.js";var m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M;function N(){return(N=e((()=>{c(),u(),a(),l(),s(),n(),m=t(),{expect:h,fn:g,userEvent:_,within:v}=__STORYBOOK_MODULE_TEST__,y=e=>(0,m.jsx)(`ul`,{className:`w-72 list-none`,children:(0,m.jsx)(i,{...e})}),b={title:`Music/Card`,component:y,args:{playlistLocal:r[0],sendReaction:g(),reaction:o.none,index:0}},x={play:async({canvas:e,args:t,userEvent:n})=>{await n.click(e.getByRole(`button`,{name:/Like/})),await h(t.sendReaction).toHaveBeenCalledWith(r[0].id,o.like)}},S={args:{reaction:o.like}},C={args:{reaction:o.unlike}},w={args:{playlistLocal:{...r[1],title:`A very long song title that keeps going to prove that the card holds the layout without breaking`}}},T={render:()=>(0,m.jsx)(d,{cards:r})},E={render:()=>(0,m.jsx)(f,{text:`Like`,title:`Like`,ariaLabel:`Like`,variant:`blue`,isSelected:!1,sendReaction:g()})},D={render:()=>(0,m.jsx)(f,{text:`Like`,title:`Like`,ariaLabel:`Like`,variant:`blue`,isSelected:!0,sendReaction:g()})},O={render:()=>(0,m.jsx)(f,{text:`Ignore`,title:`Ignore`,ariaLabel:`Ignore`,variant:`red`,isSelected:!1,sendReaction:g()})},k={render:()=>(0,m.jsx)(f,{text:`Ignore`,title:`Ignore`,ariaLabel:`Ignore`,variant:`red`,isSelected:!0,sendReaction:g()})},A=g(),j={render:()=>(0,m.jsx)(p,{generateRandomPlaylist:A}),play:async({canvasElement:e})=>{await _.click(v(e).getByRole(`button`,{name:`Generate Playlist`})),await h(A).toHaveBeenCalledOnce()}},M=[`NotRated`,`Liked`,`Ignored`,`LongTitle`,`Playlist`,`LikeButton`,`LikeButtonSelected`,`IgnoreButton`,`IgnoreButtonSelected`,`GenerateButton`],x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvas,
    args,
    userEvent: user
  }) => {
    await user.click(canvas.getByRole('button', {
      name: /Like/
    }));
    await expect(args.sendReaction).toHaveBeenCalledWith(realSongs[0].id, ReactionEnum.like);
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    reaction: ReactionEnum.like
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    reaction: ReactionEnum.unlike
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    playlistLocal: {
      ...realSongs[1],
      title: 'A very long song title that keeps going to prove that the card holds the layout without breaking'
    }
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <Cards cards={realSongs} />
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <ReactButton text="Like" title="Like" ariaLabel="Like" variant="blue" isSelected={false} sendReaction={fn()} />
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <ReactButton text="Like" title="Like" ariaLabel="Like" variant="blue" isSelected sendReaction={fn()} />
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <ReactButton text="Ignore" title="Ignore" ariaLabel="Ignore" variant="red" isSelected={false} sendReaction={fn()} />
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <ReactButton text="Ignore" title="Ignore" ariaLabel="Ignore" variant="red" isSelected sendReaction={fn()} />
}`,...k.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <GeneratePlaylist generateRandomPlaylist={generateRandomPlaylist} />,
  play: async ({
    canvasElement
  }) => {
    await userEvent.click(within(canvasElement).getByRole('button', {
      name: 'Generate Playlist'
    }));
    await expect(generateRandomPlaylist).toHaveBeenCalledOnce();
  }
}`,...j.parameters?.docs?.source}}}})))()}N();export{j as GenerateButton,O as IgnoreButton,k as IgnoreButtonSelected,C as Ignored,E as LikeButton,D as LikeButtonSelected,S as Liked,w as LongTitle,x as NotRated,T as Playlist,M as __namedExportsOrder,b as default};