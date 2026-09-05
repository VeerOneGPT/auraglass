import{j as e}from"./iframe-D7NmxSe9.js";import{G as a}from"./GlassDateField-sPAreN1L.js";import{G as s}from"./GlassFieldGroup-BOJx0Kor.js";import{G as r}from"./GlassTimeField-D7UTV_qE.js";import"./preload-helper-PPVm8Dsz.js";import"./components-BOfJuyi9.js";import"./GlassInput-C40RiGmW.js";import"./LiquidGlassMaterial-BoYaHFKo.js";import"./LiquidGlassLayerProvider-DfdCh4M5.js";import"./a11y-AzHiXVvX.js";import"./GlassButton-DbfMCI8K.js";import"./GlassPredictiveEngine-CPP6qRJT.js";import"./GlassAchievementSystem-7xtabjAo.js";import"./OptimizedGlassCore-KF10QAKi.js";import"./deviceCapabilities-BxFGwbZv.js";import"./GlassBiometricAdaptation-BrsiCRsK.js";import"./MotionPreferenceContext-Dh_pw3dF.js";import"./GlassEyeTracking-DzuX2A4f.js";import"./GlassSpatialAudio-CHgsb7_H.js";import"./MotionFramer-CT2AYNyT.js";import"./utilsCore-yCJLgS2C.js";const T={title:"Controls/Inputs/Glass Field Group",component:s,parameters:{layout:"centered",previewSurface:"component"}},l={render:()=>e.jsx("div",{style:{width:"min(680px, calc(100vw - 48px))"},children:e.jsxs(s,{legend:"Launch window",description:"Choose the date and time when the release becomes available.",columns:2,children:[e.jsx(a,{label:"Date",defaultValue:"2026-09-18",fullWidth:!0}),e.jsx(r,{label:"Time",defaultValue:"09:30",fullWidth:!0})]})})},t={render:()=>e.jsx("div",{style:{width:"min(860px, calc(100vw - 48px))"},children:e.jsxs(s,{legend:"Milestones",columns:3,children:[e.jsx(a,{label:"Review",defaultValue:"2026-09-11",fullWidth:!0}),e.jsx(a,{label:"Launch",defaultValue:"2026-09-18",fullWidth:!0}),e.jsx(a,{label:"Retrospective",defaultValue:"2026-09-25",fullWidth:!0})]})})};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
