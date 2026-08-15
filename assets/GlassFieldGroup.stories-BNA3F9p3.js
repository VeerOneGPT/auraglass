import{j as e}from"./iframe-LDZ2lzKB.js";import{G as a}from"./GlassDateField-DgpCRHWS.js";import{G as s}from"./GlassFieldGroup-BY-yIMr0.js";import{G as r}from"./GlassTimeField-BO8pEmjs.js";import"./preload-helper-PPVm8Dsz.js";import"./components-DD_B3kCE.js";import"./GlassInput-C0OsWLIJ.js";import"./LiquidGlassMaterial-CaM6UWgN.js";import"./LiquidGlassLayerProvider-CBLYPWsv.js";import"./a11y-Bm8A_Ibc.js";import"./GlassButton-DZX4OdrU.js";import"./GlassPredictiveEngine-DghIb6M7.js";import"./GlassAchievementSystem-B1AxFMcz.js";import"./OptimizedGlassCore-e1josnyx.js";import"./deviceCapabilities-DS6lz9Jr.js";import"./GlassBiometricAdaptation-BEoES9VD.js";import"./MotionPreferenceContext-YEn8QOBK.js";import"./GlassEyeTracking-B-vCk5-d.js";import"./GlassSpatialAudio-CiNSZr8_.js";import"./MotionFramer-Bx5TbHkD.js";import"./utilsCore-DCZK9AvP.js";const T={title:"Controls/Inputs/Glass Field Group",component:s,parameters:{layout:"centered",previewSurface:"component"}},l={render:()=>e.jsx("div",{style:{width:"min(680px, calc(100vw - 48px))"},children:e.jsxs(s,{legend:"Launch window",description:"Choose the date and time when the release becomes available.",columns:2,children:[e.jsx(a,{label:"Date",defaultValue:"2026-09-18",fullWidth:!0}),e.jsx(r,{label:"Time",defaultValue:"09:30",fullWidth:!0})]})})},t={render:()=>e.jsx("div",{style:{width:"min(860px, calc(100vw - 48px))"},children:e.jsxs(s,{legend:"Milestones",columns:3,children:[e.jsx(a,{label:"Review",defaultValue:"2026-09-11",fullWidth:!0}),e.jsx(a,{label:"Launch",defaultValue:"2026-09-18",fullWidth:!0}),e.jsx(a,{label:"Retrospective",defaultValue:"2026-09-25",fullWidth:!0})]})})};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
