import{j as e}from"./iframe-C5od7h8K.js";import{G as l}from"./GlassPageTabs-C7Esjp7r.js";import{G as r}from"./GlassLoadingState-DLFEu483.js";import{G as o}from"./GlassEmptyState-CMxwna12.js";import{G as i}from"./GlassErrorState-4086xCYB.js";import{G as n}from"./GlassCard-B7bX2maq.js";import{G as t}from"./GlassFilterBar-jgH04ITM.js";import{G as d}from"./GlassButton-BQ2_2aMX.js";import{G as m}from"./GlassSearchField-H-js42MG.js";import{G as p}from"./GlassCombobox-BaR79EDt.js";import{G as c}from"./GlassFieldGroup-BReABPiM.js";import{G as a}from"./GlassFormField-DqXwkv7z.js";import{G as g}from"./GlassDateField-DQix2W2p.js";import{G as u}from"./GlassTimeField-CLHJ96Fp.js";import{G}from"./GlassValidationMessage-BOwpgm4-.js";import"./preload-helper-PPVm8Dsz.js";import"./components-CZ1LEnog.js";import"./OptimizedGlassCore-BH_bCKS0.js";import"./deviceCapabilities-DOrAHvyM.js";import"./LiquidGlassMaterial-Ctjdw0yC.js";import"./LiquidGlassLayerProvider-CDXyPgOp.js";import"./a11y-Co-fZPBs.js";import"./GlassPredictiveEngine-D3IPKk2l.js";import"./GlassAchievementSystem-BdTN2ZRZ.js";import"./GlassBiometricAdaptation-D45hhFYh.js";import"./MotionPreferenceContext-B6IRqqi_.js";import"./GlassEyeTracking-rz27-Djb.js";import"./GlassSpatialAudio-DL83-SMg.js";import"./MotionFramer-BGrNwvQ8.js";import"./utilsCore-DaMeHdht.js";import"./GlassInput-C3lvf2LQ.js";const K={title:"3.2/Production Workflow Components",parameters:{layout:"fullscreen"}},s={render:()=>e.jsx("main",{className:"glass-min-h-screen glass-bg-slate-950 glass-p-8 glass-text-primary",children:e.jsx("div",{className:"glass-mx-auto glass-max-w-6xl glass-space-y-6",children:e.jsx(l,{tabs:[{value:"overview",label:"Overview",badge:"Live",panel:e.jsxs("div",{className:"glass-grid glass-gap-4 md:glass-grid-cols-3",children:[e.jsx(r,{label:"Syncing usage",variant:"progress",progress:64}),e.jsx(o,{variant:"compact",title:"No exceptions",description:"All workflow checks are clear."}),e.jsx(i,{severity:"warning",title:"One webhook delayed",description:"Retry the integration when the provider responds.",onRetry:()=>{}})]})},{value:"filters",label:"Filters",panel:e.jsxs(n,{className:"glass-space-y-4 glass-p-4",children:[e.jsx(t,{filters:[{id:"status",label:"Status",value:"Open"},{id:"owner",label:"Owner",value:"Design"}],actions:e.jsx(d,{size:"sm",children:"Apply"})}),e.jsx(m,{label:"Search workflows",placeholder:"Search workflows",value:"",onChange:()=>{}}),e.jsx(p,{label:"Owner",options:[{value:"ana",label:"Ana",group:"Design"},{value:"bo",label:"Bo",group:"Engineering"},{value:"cy",label:"Cy",group:"Support"}]})]})},{value:"schedule",label:"Schedule",panel:e.jsxs(c,{legend:"Release window",description:"Set the publish date and owner-visible validation.",columns:2,children:[e.jsx(a,{label:"Date",htmlFor:"story-date",children:e.jsx(g,{id:"story-date",label:"Date"})}),e.jsx(a,{label:"Time",htmlFor:"story-time",children:e.jsx(u,{id:"story-time",label:"Time"})}),e.jsx(G,{tone:"success",children:"Release window saved."})]})}]})})})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <main className="glass-min-h-screen glass-bg-slate-950 glass-p-8 glass-text-primary">
      <div className="glass-mx-auto glass-max-w-6xl glass-space-y-6">
        <GlassPageTabs tabs={[{
        value: "overview",
        label: "Overview",
        badge: "Live",
        panel: <div className="glass-grid glass-gap-4 md:glass-grid-cols-3">
                  <GlassLoadingState label="Syncing usage" variant="progress" progress={64} />
                  <GlassEmptyState variant="compact" title="No exceptions" description="All workflow checks are clear." />
                  <GlassErrorState severity="warning" title="One webhook delayed" description="Retry the integration when the provider responds." onRetry={() => undefined} />
                </div>
      }, {
        value: "filters",
        label: "Filters",
        panel: <GlassCard className="glass-space-y-4 glass-p-4">
                  <GlassFilterBar filters={[{
            id: "status",
            label: "Status",
            value: "Open"
          }, {
            id: "owner",
            label: "Owner",
            value: "Design"
          }]} actions={<GlassButton size="sm">Apply</GlassButton>} />
                  <GlassSearchField label="Search workflows" placeholder="Search workflows" value="" onChange={() => undefined} />
                  <GlassCombobox label="Owner" options={[{
            value: "ana",
            label: "Ana",
            group: "Design"
          }, {
            value: "bo",
            label: "Bo",
            group: "Engineering"
          }, {
            value: "cy",
            label: "Cy",
            group: "Support"
          }]} />
                </GlassCard>
      }, {
        value: "schedule",
        label: "Schedule",
        panel: <GlassFieldGroup legend="Release window" description="Set the publish date and owner-visible validation." columns={2}>
                  <GlassFormField label="Date" htmlFor="story-date">
                    <GlassDateField id="story-date" label="Date" />
                  </GlassFormField>
                  <GlassFormField label="Time" htmlFor="story-time">
                    <GlassTimeField id="story-time" label="Time" />
                  </GlassFormField>
                  <GlassValidationMessage tone="success">
                    Release window saved.
                  </GlassValidationMessage>
                </GlassFieldGroup>
      }]} />
      </div>
    </main>
}`,...s.parameters?.docs?.source}}};const Q=["WorkflowSurface"];export{s as WorkflowSurface,Q as __namedExportsOrder,K as default};
