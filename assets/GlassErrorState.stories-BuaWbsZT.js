import{j as t}from"./iframe-D7NmxSe9.js";import{G as a}from"./GlassErrorState-BLdxwBm5.js";import"./preload-helper-PPVm8Dsz.js";import"./components-BOfJuyi9.js";import"./GlassButton-DbfMCI8K.js";import"./LiquidGlassMaterial-BoYaHFKo.js";import"./LiquidGlassLayerProvider-DfdCh4M5.js";import"./a11y-AzHiXVvX.js";import"./GlassPredictiveEngine-CPP6qRJT.js";import"./GlassAchievementSystem-7xtabjAo.js";import"./OptimizedGlassCore-KF10QAKi.js";import"./deviceCapabilities-BxFGwbZv.js";import"./GlassBiometricAdaptation-BrsiCRsK.js";import"./MotionPreferenceContext-Dh_pw3dF.js";import"./GlassEyeTracking-DzuX2A4f.js";import"./GlassSpatialAudio-CHgsb7_H.js";import"./MotionFramer-CT2AYNyT.js";import"./utilsCore-yCJLgS2C.js";const E={title:"Data + Visualization/Glass Error State",component:a,parameters:{layout:"centered",previewSurface:"component"},args:{title:"Analytics are temporarily unavailable",description:"We could not refresh this workspace. Your existing data is safe.",retryLabel:"Try again",onRetry:()=>{},details:"Request ID: AG-1048 · Last successful sync: 2 minutes ago"}},e={render:s=>t.jsx("div",{style:{width:"min(620px, calc(100vw - 48px))"},children:t.jsx(a,{...s})})},r={args:{severity:"warning",title:"Some metrics may be delayed",description:"The latest warehouse sync is still processing.",details:void 0},render:s=>t.jsx("div",{style:{width:"min(620px, calc(100vw - 48px))"},children:t.jsx(a,{...s})})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: args => <div style={{
    width: "min(620px, calc(100vw - 48px))"
  }}>
      <GlassErrorState {...args} />
    </div>
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    severity: "warning",
    title: "Some metrics may be delayed",
    description: "The latest warehouse sync is still processing.",
    details: undefined
  },
  render: args => <div style={{
    width: "min(620px, calc(100vw - 48px))"
  }}>
      <GlassErrorState {...args} />
    </div>
}`,...r.parameters?.docs?.source}}};const G=["Default","Warning"];export{e as Default,r as Warning,G as __namedExportsOrder,E as default};
