import{j as t,r as n}from"./iframe-C5od7h8K.js";import{G as c}from"./GlassButton-BQ2_2aMX.js";import{a,b as m,u as l}from"./GlassToast-C2IfS5ej.js";import"./preload-helper-PPVm8Dsz.js";import"./LiquidGlassMaterial-Ctjdw0yC.js";import"./LiquidGlassLayerProvider-CDXyPgOp.js";import"./a11y-Co-fZPBs.js";import"./GlassPredictiveEngine-D3IPKk2l.js";import"./GlassAchievementSystem-BdTN2ZRZ.js";import"./OptimizedGlassCore-BH_bCKS0.js";import"./deviceCapabilities-DOrAHvyM.js";import"./GlassBiometricAdaptation-D45hhFYh.js";import"./MotionPreferenceContext-B6IRqqi_.js";import"./GlassEyeTracking-rz27-Djb.js";import"./GlassSpatialAudio-DL83-SMg.js";import"./MotionFramer-BGrNwvQ8.js";import"./utilsCore-DaMeHdht.js";import"./components-CZ1LEnog.js";const z={title:"Data + Visualization/Glass Toast Provider",component:a,parameters:{layout:"fullscreen",previewSurface:"component"},args:{children:null}},p=({seed:e})=>{const{addToast:s}=l(),i=n.useRef(!1);return n.useEffect(()=>{i.current||(i.current=!0,s({title:"Workspace published",description:"Northstar Studio is now available to every collaborator.",type:"success",duration:0}))},[s,e]),t.jsx(c,{type:"button",onClick:()=>s({title:"Changes saved",description:"Your workspace settings are up to date.",type:"info",duration:0}),children:"Show another toast"})},d=({children:e})=>t.jsx("div",{style:{minHeight:"100vh",display:"grid",placeItems:"center",padding:32,boxSizing:"border-box"},children:e}),o={name:"GlassToastProvider",render:()=>t.jsx(a,{position:"bottom-right",duration:0,children:t.jsx(d,{children:t.jsx(p,{seed:"provider"})})})},r={name:"GlassToastViewport",render:()=>t.jsx(a,{position:"bottom-right",duration:0,children:t.jsxs(d,{children:[t.jsx(p,{seed:"viewport"}),t.jsx(m,{position:"top-right"})]})})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
