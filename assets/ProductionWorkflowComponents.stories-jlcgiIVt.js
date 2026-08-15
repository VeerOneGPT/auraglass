import{j as e}from"./iframe-LDZ2lzKB.js";import{G as l}from"./GlassPageTabs-qXJXBSwJ.js";import{G as r}from"./GlassLoadingState-HTmdrlYb.js";import{G as o}from"./GlassEmptyState-B11M9Tam.js";import{G as i}from"./GlassErrorState-D8QhcpTy.js";import{G as n}from"./GlassCard-DSATkVcg.js";import{G as t}from"./GlassFilterBar-nFX5avD4.js";import{G as d}from"./GlassButton-DZX4OdrU.js";import{G as m}from"./GlassSearchField-HOR5v9ab.js";import{G as p}from"./GlassCombobox-C1FfiR1y.js";import{G as c}from"./GlassFieldGroup-BY-yIMr0.js";import{G as a}from"./GlassFormField-D_OB9AJ8.js";import{G as g}from"./GlassDateField-DgpCRHWS.js";import{G as u}from"./GlassTimeField-BO8pEmjs.js";import{G}from"./GlassValidationMessage-li1jd-co.js";import"./preload-helper-PPVm8Dsz.js";import"./components-DD_B3kCE.js";import"./OptimizedGlassCore-e1josnyx.js";import"./deviceCapabilities-DS6lz9Jr.js";import"./LiquidGlassMaterial-CaM6UWgN.js";import"./LiquidGlassLayerProvider-CBLYPWsv.js";import"./a11y-Bm8A_Ibc.js";import"./GlassPredictiveEngine-DghIb6M7.js";import"./GlassAchievementSystem-B1AxFMcz.js";import"./GlassBiometricAdaptation-BEoES9VD.js";import"./MotionPreferenceContext-YEn8QOBK.js";import"./GlassEyeTracking-B-vCk5-d.js";import"./GlassSpatialAudio-CiNSZr8_.js";import"./MotionFramer-Bx5TbHkD.js";import"./utilsCore-DCZK9AvP.js";import"./GlassInput-C0OsWLIJ.js";const K={title:"3.2/Production Workflow Components",parameters:{layout:"fullscreen"}},s={render:()=>e.jsx("main",{className:"glass-min-h-screen glass-bg-slate-950 glass-p-8 glass-text-primary",children:e.jsx("div",{className:"glass-mx-auto glass-max-w-6xl glass-space-y-6",children:e.jsx(l,{tabs:[{value:"overview",label:"Overview",badge:"Live",panel:e.jsxs("div",{className:"glass-grid glass-gap-4 md:glass-grid-cols-3",children:[e.jsx(r,{label:"Syncing usage",variant:"progress",progress:64}),e.jsx(o,{variant:"compact",title:"No exceptions",description:"All workflow checks are clear."}),e.jsx(i,{severity:"warning",title:"One webhook delayed",description:"Retry the integration when the provider responds.",onRetry:()=>{}})]})},{value:"filters",label:"Filters",panel:e.jsxs(n,{className:"glass-space-y-4 glass-p-4",children:[e.jsx(t,{filters:[{id:"status",label:"Status",value:"Open"},{id:"owner",label:"Owner",value:"Design"}],actions:e.jsx(d,{size:"sm",children:"Apply"})}),e.jsx(m,{label:"Search workflows",placeholder:"Search workflows",value:"",onChange:()=>{}}),e.jsx(p,{label:"Owner",options:[{value:"ana",label:"Ana",group:"Design"},{value:"bo",label:"Bo",group:"Engineering"},{value:"cy",label:"Cy",group:"Support"}]})]})},{value:"schedule",label:"Schedule",panel:e.jsxs(c,{legend:"Release window",description:"Set the publish date and owner-visible validation.",columns:2,children:[e.jsx(a,{label:"Date",htmlFor:"story-date",children:e.jsx(g,{id:"story-date",label:"Date"})}),e.jsx(a,{label:"Time",htmlFor:"story-time",children:e.jsx(u,{id:"story-time",label:"Time"})}),e.jsx(G,{tone:"success",children:"Release window saved."})]})}]})})})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
