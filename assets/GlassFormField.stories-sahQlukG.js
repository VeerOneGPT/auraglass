import{j as r}from"./iframe-D7NmxSe9.js";import{G as t}from"./GlassInput-C40RiGmW.js";import{G as s}from"./GlassFormField-PBRsoUrv.js";import"./preload-helper-PPVm8Dsz.js";import"./LiquidGlassMaterial-BoYaHFKo.js";import"./LiquidGlassLayerProvider-DfdCh4M5.js";import"./a11y-AzHiXVvX.js";import"./GlassButton-DbfMCI8K.js";import"./GlassPredictiveEngine-CPP6qRJT.js";import"./GlassAchievementSystem-7xtabjAo.js";import"./OptimizedGlassCore-KF10QAKi.js";import"./deviceCapabilities-BxFGwbZv.js";import"./GlassBiometricAdaptation-BrsiCRsK.js";import"./MotionPreferenceContext-Dh_pw3dF.js";import"./GlassEyeTracking-DzuX2A4f.js";import"./GlassSpatialAudio-CHgsb7_H.js";import"./MotionFramer-CT2AYNyT.js";import"./utilsCore-yCJLgS2C.js";import"./GlassValidationMessage-DFdpaAdh.js";import"./components-BOfJuyi9.js";const y={title:"Controls/Inputs/Glass Form Field",component:s,parameters:{layout:"centered",previewSurface:"component"}},e={render:()=>r.jsx("div",{style:{width:"min(440px, calc(100vw - 48px))"},children:r.jsx(s,{label:"Workspace name",htmlFor:"workspace-name",description:"This appears in navigation and shared links.",required:!0,children:r.jsx(t,{id:"workspace-name",defaultValue:"Northstar Studio","aria-label":"Workspace name",fullWidth:!0})})})},a={render:()=>r.jsx("div",{style:{width:"min(440px, calc(100vw - 48px))"},children:r.jsx(s,{label:"Workspace slug",htmlFor:"workspace-slug",error:"Use lowercase letters, numbers, and hyphens only.",children:r.jsx(t,{id:"workspace-slug",defaultValue:"Northstar Studio","aria-invalid":!0,"aria-label":"Workspace slug",state:"error",fullWidth:!0})})})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
