import{j as e}from"./iframe-C5od7h8K.js";import{G as s}from"./GlassSelectCompound-B6pYPQFP.js";import"./preload-helper-PPVm8Dsz.js";import"./components-CZ1LEnog.js";import"./MotionFramer-BGrNwvQ8.js";import"./utilsCore-DaMeHdht.js";import"./Positioner-Ddf7I8J2.js";import"./DismissableLayer-CGvhI70w.js";import"./Portal-98BYrBzg.js";import"./index-DyOVB5Nm.js";import"./index-BwcA4rZF.js";import"./index-CWG1rEj-.js";const j={title:"Controls/Inputs/Glass Select Compound",component:s,parameters:{layout:"centered",previewSurface:"component",docs:{description:{component:"The compound Radix-style glass select API with grouped options and portal content."}}}},r=()=>e.jsxs("div",{className:"glass-w-[min(520px,calc(100vw-48px))] glass-rounded-3xl glass-border glass-border-white/25 glass-bg-white/35 glass-p-6 glass-shadow-xl glass-backdrop-blur-xl",children:[e.jsx("label",{className:"glass-mb-2 glass-block glass-text-sm glass-font-medium glass-text-primary",children:"Deployment region"}),e.jsxs(s,{defaultValue:"iad",defaultOpen:!0,children:[e.jsx(s.Trigger,{children:e.jsx(s.Value,{placeholder:"Choose a region"})}),e.jsxs(s.Content,{sideOffset:8,children:[e.jsxs(s.Group,{children:[e.jsx(s.Label,{children:"North America"}),e.jsx(s.Item,{value:"iad",children:"US East - Virginia"}),e.jsx(s.Item,{value:"sfo",children:"US West - San Francisco"})]}),e.jsx(s.Separator,{}),e.jsxs(s.Group,{children:[e.jsx(s.Label,{children:"Europe"}),e.jsx(s.Item,{value:"dub",children:"Europe - Dublin"}),e.jsx(s.Item,{value:"fra",children:"Europe - Frankfurt"})]})]})]}),e.jsx("p",{className:"glass-mt-3 glass-text-sm glass-text-secondary",children:"Portal content is offset from the trigger so it is readable and not clipped by the story frame."})]}),a={render:()=>e.jsx(r,{})},l={render:()=>e.jsx("div",{className:"glass-w-[min(420px,calc(100vw-48px))] glass-rounded-3xl glass-border glass-border-white/25 glass-bg-white/35 glass-p-6 glass-shadow-xl glass-backdrop-blur-xl",children:e.jsxs(s,{defaultValue:"team",children:[e.jsx(s.Trigger,{variant:"minimal",children:e.jsx(s.Value,{placeholder:"Choose scope"})}),e.jsx(s.Content,{sideOffset:8,children:e.jsxs(s.Group,{children:[e.jsx(s.Item,{value:"personal",children:"Personal workspace"}),e.jsx(s.Item,{value:"team",children:"Team workspace"}),e.jsx(s.Item,{value:"enterprise",children:"Enterprise workspace"})]})})]})})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <SelectFrame />
}`,...a.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="glass-w-[min(420px,calc(100vw-48px))] glass-rounded-3xl glass-border glass-border-white/25 glass-bg-white/35 glass-p-6 glass-shadow-xl glass-backdrop-blur-xl">
      <GlassSelectCompound defaultValue="team">
        <GlassSelectCompound.Trigger variant="minimal">
          <GlassSelectCompound.Value placeholder="Choose scope" />
        </GlassSelectCompound.Trigger>
        <GlassSelectCompound.Content sideOffset={8}>
          <GlassSelectCompound.Group>
            <GlassSelectCompound.Item value="personal">
              Personal workspace
            </GlassSelectCompound.Item>
            <GlassSelectCompound.Item value="team">
              Team workspace
            </GlassSelectCompound.Item>
            <GlassSelectCompound.Item value="enterprise">
              Enterprise workspace
            </GlassSelectCompound.Item>
          </GlassSelectCompound.Group>
        </GlassSelectCompound.Content>
      </GlassSelectCompound>
    </div>
}`,...l.parameters?.docs?.source}}};const S=["Default","Minimal"];export{a as Default,l as Minimal,S as __namedExportsOrder,j as default};
