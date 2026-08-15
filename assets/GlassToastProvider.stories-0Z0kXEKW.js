import{j as t,r as n}from"./iframe-LDZ2lzKB.js";import{G as c}from"./GlassButton-DZX4OdrU.js";import{a,b as m,u as l}from"./GlassToast-CKdHwQL9.js";import"./preload-helper-PPVm8Dsz.js";import"./LiquidGlassMaterial-CaM6UWgN.js";import"./LiquidGlassLayerProvider-CBLYPWsv.js";import"./a11y-Bm8A_Ibc.js";import"./GlassPredictiveEngine-DghIb6M7.js";import"./GlassAchievementSystem-B1AxFMcz.js";import"./OptimizedGlassCore-e1josnyx.js";import"./deviceCapabilities-DS6lz9Jr.js";import"./GlassBiometricAdaptation-BEoES9VD.js";import"./MotionPreferenceContext-YEn8QOBK.js";import"./GlassEyeTracking-B-vCk5-d.js";import"./GlassSpatialAudio-CiNSZr8_.js";import"./MotionFramer-Bx5TbHkD.js";import"./utilsCore-DCZK9AvP.js";import"./components-DD_B3kCE.js";const z={title:"Data + Visualization/Glass Toast Provider",component:a,parameters:{layout:"fullscreen",previewSurface:"component"},args:{children:null}},p=({seed:e})=>{const{addToast:s}=l(),i=n.useRef(!1);return n.useEffect(()=>{i.current||(i.current=!0,s({title:"Workspace published",description:"Northstar Studio is now available to every collaborator.",type:"success",duration:0}))},[s,e]),t.jsx(c,{type:"button",onClick:()=>s({title:"Changes saved",description:"Your workspace settings are up to date.",type:"info",duration:0}),children:"Show another toast"})},d=({children:e})=>t.jsx("div",{style:{minHeight:"100vh",display:"grid",placeItems:"center",padding:32,boxSizing:"border-box"},children:e}),o={name:"GlassToastProvider",render:()=>t.jsx(a,{position:"bottom-right",duration:0,children:t.jsx(d,{children:t.jsx(p,{seed:"provider"})})})},r={name:"GlassToastViewport",render:()=>t.jsx(a,{position:"bottom-right",duration:0,children:t.jsxs(d,{children:[t.jsx(p,{seed:"viewport"}),t.jsx(m,{position:"top-right"})]})})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: "GlassToastProvider",
  render: () => <ToastProvider position="bottom-right" duration={0}>
      <StoryStage>
        <ToastLauncher seed="provider" />
      </StoryStage>
    </ToastProvider>
}`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  name: "GlassToastViewport",
  render: () => <ToastProvider position="bottom-right" duration={0}>
      <StoryStage>
        <ToastLauncher seed="viewport" />
        <ToastViewport position="top-right" />
      </StoryStage>
    </ToastProvider>
}`,...r.parameters?.docs?.source}}};const C=["GlassToastProvider","GlassToastViewport"];export{o as GlassToastProvider,r as GlassToastViewport,C as __namedExportsOrder,z as default};
