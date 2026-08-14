import{j as t}from"./iframe-C5od7h8K.js";import{G as a}from"./GlassErrorState-4086xCYB.js";import"./preload-helper-PPVm8Dsz.js";import"./components-CZ1LEnog.js";import"./GlassButton-BQ2_2aMX.js";import"./LiquidGlassMaterial-Ctjdw0yC.js";import"./LiquidGlassLayerProvider-CDXyPgOp.js";import"./a11y-Co-fZPBs.js";import"./GlassPredictiveEngine-D3IPKk2l.js";import"./GlassAchievementSystem-BdTN2ZRZ.js";import"./OptimizedGlassCore-BH_bCKS0.js";import"./deviceCapabilities-DOrAHvyM.js";import"./GlassBiometricAdaptation-D45hhFYh.js";import"./MotionPreferenceContext-B6IRqqi_.js";import"./GlassEyeTracking-rz27-Djb.js";import"./GlassSpatialAudio-DL83-SMg.js";import"./MotionFramer-BGrNwvQ8.js";import"./utilsCore-DaMeHdht.js";const E={title:"Data + Visualization/Glass Error State",component:a,parameters:{layout:"centered",previewSurface:"component"},args:{title:"Analytics are temporarily unavailable",description:"We could not refresh this workspace. Your existing data is safe.",retryLabel:"Try again",onRetry:()=>{},details:"Request ID: AG-1048 · Last successful sync: 2 minutes ago"}},e={render:s=>t.jsx("div",{style:{width:"min(620px, calc(100vw - 48px))"},children:t.jsx(a,{...s})})},r={args:{severity:"warning",title:"Some metrics may be delayed",description:"The latest warehouse sync is still processing.",details:void 0},render:s=>t.jsx("div",{style:{width:"min(620px, calc(100vw - 48px))"},children:t.jsx(a,{...s})})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
