import{j as e}from"./iframe-C5od7h8K.js";import{G as a}from"./GlassDateField-DQix2W2p.js";import{G as s}from"./GlassFieldGroup-BReABPiM.js";import{G as r}from"./GlassTimeField-CLHJ96Fp.js";import"./preload-helper-PPVm8Dsz.js";import"./components-CZ1LEnog.js";import"./GlassInput-C3lvf2LQ.js";import"./LiquidGlassMaterial-Ctjdw0yC.js";import"./LiquidGlassLayerProvider-CDXyPgOp.js";import"./a11y-Co-fZPBs.js";import"./GlassButton-BQ2_2aMX.js";import"./GlassPredictiveEngine-D3IPKk2l.js";import"./GlassAchievementSystem-BdTN2ZRZ.js";import"./OptimizedGlassCore-BH_bCKS0.js";import"./deviceCapabilities-DOrAHvyM.js";import"./GlassBiometricAdaptation-D45hhFYh.js";import"./MotionPreferenceContext-B6IRqqi_.js";import"./GlassEyeTracking-rz27-Djb.js";import"./GlassSpatialAudio-DL83-SMg.js";import"./MotionFramer-BGrNwvQ8.js";import"./utilsCore-DaMeHdht.js";const T={title:"Controls/Inputs/Glass Field Group",component:s,parameters:{layout:"centered",previewSurface:"component"}},l={render:()=>e.jsx("div",{style:{width:"min(680px, calc(100vw - 48px))"},children:e.jsxs(s,{legend:"Launch window",description:"Choose the date and time when the release becomes available.",columns:2,children:[e.jsx(a,{label:"Date",defaultValue:"2026-09-18",fullWidth:!0}),e.jsx(r,{label:"Time",defaultValue:"09:30",fullWidth:!0})]})})},t={render:()=>e.jsx("div",{style:{width:"min(860px, calc(100vw - 48px))"},children:e.jsxs(s,{legend:"Milestones",columns:3,children:[e.jsx(a,{label:"Review",defaultValue:"2026-09-11",fullWidth:!0}),e.jsx(a,{label:"Launch",defaultValue:"2026-09-18",fullWidth:!0}),e.jsx(a,{label:"Retrospective",defaultValue:"2026-09-25",fullWidth:!0})]})})};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    width: "min(680px, calc(100vw - 48px))"
  }}>
      <GlassFieldGroup legend="Launch window" description="Choose the date and time when the release becomes available." columns={2}>
        <GlassDateField label="Date" defaultValue="2026-09-18" fullWidth />
        <GlassTimeField label="Time" defaultValue="09:30" fullWidth />
      </GlassFieldGroup>
    </div>
}`,...l.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    width: "min(860px, calc(100vw - 48px))"
  }}>
      <GlassFieldGroup legend="Milestones" columns={3}>
        <GlassDateField label="Review" defaultValue="2026-09-11" fullWidth />
        <GlassDateField label="Launch" defaultValue="2026-09-18" fullWidth />
        <GlassDateField label="Retrospective" defaultValue="2026-09-25" fullWidth />
      </GlassFieldGroup>
    </div>
}`,...t.parameters?.docs?.source}}};const y=["Default","ThreeColumns"];export{l as Default,t as ThreeColumns,y as __namedExportsOrder,T as default};
