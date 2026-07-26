import{j as s}from"./iframe-W10Ontp8.js";import{aj as i,ai as l,I as o}from"./components-wxrVEbsA.js";import{G as a}from"./GlassLabel-CO4gWTik.js";import{G as n}from"./GlassInput-DeFE52AH.js";import"./preload-helper-PPVm8Dsz.js";import"./a11y-BmzSDA3q.js";import"./LiquidGlassMaterial-DB5Hu6PO.js";import"./LiquidGlassLayerProvider-B0fLxmKC.js";import"./GlassButton-CVmxdPoA.js";import"./GlassPredictiveEngine-B8jT0jcf.js";import"./GlassAchievementSystem-DqjXQLzn.js";import"./OptimizedGlassCore-CadU-ErO.js";import"./deviceCapabilities-BVriTAFX.js";import"./GlassBiometricAdaptation-BlxBxm87.js";import"./MotionPreferenceContext-Db2LoQ9i.js";import"./GlassEyeTracking-BFin3s1L.js";import"./GlassSpatialAudio-4CToH89u.js";import"./MotionFramer-C_AUzSnN.js";import"./utilsCore-Clq-gVdo.js";const A={title:"Controls/Inputs/Glass Label",component:a,parameters:{layout:"centered",previewSurface:"component",docs:{description:{component:"A glass-aware form label with required, icon, description, and state variants."}}},args:{children:"Workspace slug",description:"Lowercase letters, numbers, and hyphens only.",required:!0,enhanced:!0,icon:s.jsx(o,{size:15})}},e={render:r=>s.jsxs("div",{className:"glass-grid glass-w-[min(520px,calc(100vw-48px))] glass-gap-5 glass-rounded-3xl glass-border glass-border-white/25 glass-bg-white/35 glass-p-6 glass-shadow-xl glass-backdrop-blur-xl",children:[s.jsxs("div",{children:[s.jsx(a,{...r,htmlFor:"workspace-slug"}),s.jsx(n,{id:"workspace-slug",placeholder:"revenue-ops",fullWidth:!0})]}),s.jsx(a,{variant:"success",icon:s.jsx(i,{size:15}),description:"The saved value passed validation.",children:"Approved setting"}),s.jsx(a,{variant:"warning",icon:s.jsx(l,{size:15}),description:"This label is readable in warning contexts.",children:"Needs review"})]})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
