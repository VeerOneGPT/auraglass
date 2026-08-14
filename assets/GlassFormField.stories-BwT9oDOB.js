import{j as r}from"./iframe-C5od7h8K.js";import{G as t}from"./GlassInput-C3lvf2LQ.js";import{G as s}from"./GlassFormField-DqXwkv7z.js";import"./preload-helper-PPVm8Dsz.js";import"./LiquidGlassMaterial-Ctjdw0yC.js";import"./LiquidGlassLayerProvider-CDXyPgOp.js";import"./a11y-Co-fZPBs.js";import"./GlassButton-BQ2_2aMX.js";import"./GlassPredictiveEngine-D3IPKk2l.js";import"./GlassAchievementSystem-BdTN2ZRZ.js";import"./OptimizedGlassCore-BH_bCKS0.js";import"./deviceCapabilities-DOrAHvyM.js";import"./GlassBiometricAdaptation-D45hhFYh.js";import"./MotionPreferenceContext-B6IRqqi_.js";import"./GlassEyeTracking-rz27-Djb.js";import"./GlassSpatialAudio-DL83-SMg.js";import"./MotionFramer-BGrNwvQ8.js";import"./utilsCore-DaMeHdht.js";import"./GlassValidationMessage-BOwpgm4-.js";import"./components-CZ1LEnog.js";const y={title:"Controls/Inputs/Glass Form Field",component:s,parameters:{layout:"centered",previewSurface:"component"}},e={render:()=>r.jsx("div",{style:{width:"min(440px, calc(100vw - 48px))"},children:r.jsx(s,{label:"Workspace name",htmlFor:"workspace-name",description:"This appears in navigation and shared links.",required:!0,children:r.jsx(t,{id:"workspace-name",defaultValue:"Northstar Studio","aria-label":"Workspace name",fullWidth:!0})})})},a={render:()=>r.jsx("div",{style:{width:"min(440px, calc(100vw - 48px))"},children:r.jsx(s,{label:"Workspace slug",htmlFor:"workspace-slug",error:"Use lowercase letters, numbers, and hyphens only.",children:r.jsx(t,{id:"workspace-slug",defaultValue:"Northstar Studio","aria-invalid":!0,"aria-label":"Workspace slug",state:"error",fullWidth:!0})})})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
