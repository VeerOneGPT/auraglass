import{j as t,r as n}from"./iframe-D7NmxSe9.js";import{G as c}from"./GlassButton-DbfMCI8K.js";import{a,b as m,u as l}from"./GlassToast-Bq7Y_lWj.js";import"./preload-helper-PPVm8Dsz.js";import"./LiquidGlassMaterial-BoYaHFKo.js";import"./LiquidGlassLayerProvider-DfdCh4M5.js";import"./a11y-AzHiXVvX.js";import"./GlassPredictiveEngine-CPP6qRJT.js";import"./GlassAchievementSystem-7xtabjAo.js";import"./OptimizedGlassCore-KF10QAKi.js";import"./deviceCapabilities-BxFGwbZv.js";import"./GlassBiometricAdaptation-BrsiCRsK.js";import"./MotionPreferenceContext-Dh_pw3dF.js";import"./GlassEyeTracking-DzuX2A4f.js";import"./GlassSpatialAudio-CHgsb7_H.js";import"./MotionFramer-CT2AYNyT.js";import"./utilsCore-yCJLgS2C.js";import"./components-BOfJuyi9.js";const z={title:"Data + Visualization/Glass Toast Provider",component:a,parameters:{layout:"fullscreen",previewSurface:"component"},args:{children:null}},p=({seed:e})=>{const{addToast:s}=l(),i=n.useRef(!1);return n.useEffect(()=>{i.current||(i.current=!0,s({title:"Workspace published",description:"Northstar Studio is now available to every collaborator.",type:"success",duration:0}))},[s,e]),t.jsx(c,{type:"button",onClick:()=>s({title:"Changes saved",description:"Your workspace settings are up to date.",type:"info",duration:0}),children:"Show another toast"})},d=({children:e})=>t.jsx("div",{style:{minHeight:"100vh",display:"grid",placeItems:"center",padding:32,boxSizing:"border-box"},children:e}),o={name:"GlassToastProvider",render:()=>t.jsx(a,{position:"bottom-right",duration:0,children:t.jsx(d,{children:t.jsx(p,{seed:"provider"})})})},r={name:"GlassToastViewport",render:()=>t.jsx(a,{position:"bottom-right",duration:0,children:t.jsxs(d,{children:[t.jsx(p,{seed:"viewport"}),t.jsx(m,{position:"top-right"})]})})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
