import{j as r}from"./iframe-LDZ2lzKB.js";import{G as t}from"./GlassInput-C0OsWLIJ.js";import{G as s}from"./GlassFormField-D_OB9AJ8.js";import"./preload-helper-PPVm8Dsz.js";import"./LiquidGlassMaterial-CaM6UWgN.js";import"./LiquidGlassLayerProvider-CBLYPWsv.js";import"./a11y-Bm8A_Ibc.js";import"./GlassButton-DZX4OdrU.js";import"./GlassPredictiveEngine-DghIb6M7.js";import"./GlassAchievementSystem-B1AxFMcz.js";import"./OptimizedGlassCore-e1josnyx.js";import"./deviceCapabilities-DS6lz9Jr.js";import"./GlassBiometricAdaptation-BEoES9VD.js";import"./MotionPreferenceContext-YEn8QOBK.js";import"./GlassEyeTracking-B-vCk5-d.js";import"./GlassSpatialAudio-CiNSZr8_.js";import"./MotionFramer-Bx5TbHkD.js";import"./utilsCore-DCZK9AvP.js";import"./GlassValidationMessage-li1jd-co.js";import"./components-DD_B3kCE.js";const y={title:"Controls/Inputs/Glass Form Field",component:s,parameters:{layout:"centered",previewSurface:"component"}},e={render:()=>r.jsx("div",{style:{width:"min(440px, calc(100vw - 48px))"},children:r.jsx(s,{label:"Workspace name",htmlFor:"workspace-name",description:"This appears in navigation and shared links.",required:!0,children:r.jsx(t,{id:"workspace-name",defaultValue:"Northstar Studio","aria-label":"Workspace name",fullWidth:!0})})})},a={render:()=>r.jsx("div",{style:{width:"min(440px, calc(100vw - 48px))"},children:r.jsx(s,{label:"Workspace slug",htmlFor:"workspace-slug",error:"Use lowercase letters, numbers, and hyphens only.",children:r.jsx(t,{id:"workspace-slug",defaultValue:"Northstar Studio","aria-invalid":!0,"aria-label":"Workspace slug",state:"error",fullWidth:!0})})})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    width: "min(440px, calc(100vw - 48px))"
  }}>
      <GlassFormField label="Workspace name" htmlFor="workspace-name" description="This appears in navigation and shared links." required>
        <GlassInput id="workspace-name" defaultValue="Northstar Studio" aria-label="Workspace name" fullWidth />
      </GlassFormField>
    </div>
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    width: "min(440px, calc(100vw - 48px))"
  }}>
      <GlassFormField label="Workspace slug" htmlFor="workspace-slug" error="Use lowercase letters, numbers, and hyphens only.">
        <GlassInput id="workspace-slug" defaultValue="Northstar Studio" aria-invalid={true} aria-label="Workspace slug" state="error" fullWidth />
      </GlassFormField>
    </div>
}`,...a.parameters?.docs?.source}}};const j=["Default","WithValidationError"];export{e as Default,a as WithValidationError,j as __namedExportsOrder,y as default};
