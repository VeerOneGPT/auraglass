import{j as s}from"./iframe-f4tkjEOL.js";import{aj as i,ai as l,I as o}from"./components-B0CLK4G-.js";import{G as a}from"./GlassLabel-DQzLKHN1.js";import{G as n}from"./GlassInput-BiocOO2N.js";import"./preload-helper-PPVm8Dsz.js";import"./a11y-Bg_rm60C.js";import"./LiquidGlassMaterial-DO2TRWPm.js";import"./LiquidGlassLayerProvider-eyH5R_V_.js";import"./GlassButton-DEnAO805.js";import"./GlassPredictiveEngine-BSwZ3qss.js";import"./GlassAchievementSystem-BkhveWmv.js";import"./OptimizedGlassCore-DCm4UbzZ.js";import"./deviceCapabilities-Bkzt64hZ.js";import"./GlassBiometricAdaptation-YwmGbjEn.js";import"./MotionPreferenceContext-DVaVM-Qk.js";import"./GlassEyeTracking-CrP9E3y1.js";import"./GlassSpatialAudio-KPcipyjc.js";import"./MotionFramer-CH18-5SI.js";import"./utilsCore-C1yA8fLz.js";const A={title:"Controls/Inputs/Glass Label",component:a,parameters:{layout:"centered",previewSurface:"component",docs:{description:{component:"A glass-aware form label with required, icon, description, and state variants."}}},args:{children:"Workspace slug",description:"Lowercase letters, numbers, and hyphens only.",required:!0,enhanced:!0,icon:s.jsx(o,{size:15})}},e={render:r=>s.jsxs("div",{className:"glass-grid glass-w-[min(520px,calc(100vw-48px))] glass-gap-5 glass-rounded-3xl glass-border glass-border-white/25 glass-bg-white/35 glass-p-6 glass-shadow-xl glass-backdrop-blur-xl",children:[s.jsxs("div",{children:[s.jsx(a,{...r,htmlFor:"workspace-slug"}),s.jsx(n,{id:"workspace-slug",placeholder:"revenue-ops",fullWidth:!0})]}),s.jsx(a,{variant:"success",icon:s.jsx(i,{size:15}),description:"The saved value passed validation.",children:"Approved setting"}),s.jsx(a,{variant:"warning",icon:s.jsx(l,{size:15}),description:"This label is readable in warning contexts.",children:"Needs review"})]})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: args => <div className="glass-grid glass-w-[min(520px,calc(100vw-48px))] glass-gap-5 glass-rounded-3xl glass-border glass-border-white/25 glass-bg-white/35 glass-p-6 glass-shadow-xl glass-backdrop-blur-xl">
      <div>
        <GlassLabel {...args} htmlFor="workspace-slug" />
        <GlassInput id="workspace-slug" placeholder="revenue-ops" fullWidth />
      </div>
      <GlassLabel variant="success" icon={<CheckCircle2 size={15} />} description="The saved value passed validation.">
        Approved setting
      </GlassLabel>
      <GlassLabel variant="warning" icon={<AlertTriangle size={15} />} description="This label is readable in warning contexts.">
        Needs review
      </GlassLabel>
    </div>
}`,...e.parameters?.docs?.source}}};const C=["Default"];export{e as Default,C as __namedExportsOrder,A as default};
