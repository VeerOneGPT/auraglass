import{G as t}from"./GlassFormBuilder-C-h8cYIf.js";import{f as e}from"./index-CLSxArU-.js";import"./iframe-RUtdSKzJ.js";import"./preload-helper-PPVm8Dsz.js";import"./GlassButton-CAKBtO-m.js";import"./LiquidGlassMaterial-CS0N5Fl0.js";import"./LiquidGlassLayerProvider-DYmjkfis.js";import"./a11y-DU_VtjUJ.js";import"./GlassPredictiveEngine-BQtpA8PP.js";import"./GlassAchievementSystem-31ZLL-si.js";import"./OptimizedGlassCore-CjzTE9Za.js";import"./deviceCapabilities-Dx64UrcL.js";import"./GlassBiometricAdaptation-kIc4N-Bi.js";import"./MotionPreferenceContext-CmK-gS-Y.js";import"./GlassEyeTracking-Cwe8caHt.js";import"./GlassSpatialAudio-D2eTdUS-.js";import"./MotionFramer-CTBIvrMG.js";import"./utilsCore-WpAa6X-i.js";import"./GlassInput-Bm70jdXp.js";import"./GlassCard-Bs_8JlYu.js";import"./GlassBadge-CxvoTPPG.js";import"./GlassSelect-Bpre1S3q.js";import"./index-CqeJAxVA.js";import"./index-BAYueI2a.js";import"./index-CWG1rEj-.js";import"./FocusTrap-CW7p9MHt.js";import"./GlassCheckbox-sBCBFkHN.js";import"./components-Bw6vlnuA.js";import"./GlassTextarea-BlXyzJ3E.js";import"./index-ByImX2pa.js";const T={title:"Workflows/Glass Form Builder",component:t,parameters:{layout:"centered",docs:{description:{component:"A glass morphism glassformbuilder component."}}},argTypes:{schema:{control:"object",description:"Form schema with sections and fields"},values:{control:"object",description:"Current form values"},variant:{control:"select",options:["default","compact","wizard","inline"],description:"Form variant"},size:{control:"select",options:["sm","md","lg"],description:"Form size"},loading:{control:"boolean",description:"Whether form is loading"},disabled:{control:"boolean",description:"Whether form is disabled"}},args:{schema:[{id:"personal",title:"Personal Information",fields:[{id:"firstName",type:"text",label:"First Name",placeholder:"Enter your first name",required:!0},{id:"email",type:"email",label:"Email",placeholder:"Enter your email",required:!0},{id:"message",type:"textarea",label:"Message",placeholder:"Enter your message"}]}],values:{},variant:"default",size:"md",loading:!1,disabled:!1,onChange:e(),onSubmit:e()}},a={args:{schema:[{id:"contact",title:"Contact Form",fields:[{id:"name",type:"text",label:"Full Name",placeholder:"Enter your full name",required:!0},{id:"email",type:"email",label:"Email Address",placeholder:"Enter your email",required:!0},{id:"subject",type:"select",label:"Subject",options:[{value:"general",label:"General Inquiry"},{value:"support",label:"Technical Support"},{value:"sales",label:"Sales"}]}]}],values:{},onChange:e(),onSubmit:e()}},r={args:{schema:[{id:"personal",title:"Personal Information",fields:[{id:"firstName",type:"text",label:"First Name",placeholder:"Enter your first name"},{id:"lastName",type:"text",label:"Last Name",placeholder:"Enter your last name"}]}],values:{},variant:"compact",onChange:e(),onSubmit:e()}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    schema: [{
      id: 'contact',
      title: 'Contact Form',
      fields: [{
        id: 'name',
        type: 'text',
        label: 'Full Name',
        placeholder: 'Enter your full name',
        required: true
      }, {
        id: 'email',
        type: 'email',
        label: 'Email Address',
        placeholder: 'Enter your email',
        required: true
      }, {
        id: 'subject',
        type: 'select',
        label: 'Subject',
        options: [{
          value: 'general',
          label: 'General Inquiry'
        }, {
          value: 'support',
          label: 'Technical Support'
        }, {
          value: 'sales',
          label: 'Sales'
        }]
      }]
    }],
    values: {},
    onChange: fn(),
    onSubmit: fn()
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    schema: [{
      id: 'personal',
      title: 'Personal Information',
      fields: [{
        id: 'firstName',
        type: 'text',
        label: 'First Name',
        placeholder: 'Enter your first name'
      }, {
        id: 'lastName',
        type: 'text',
        label: 'Last Name',
        placeholder: 'Enter your last name'
      }]
    }],
    values: {},
    variant: 'compact',
    onChange: fn(),
    onSubmit: fn()
  }
}`,...r.parameters?.docs?.source}}};const W=["Default","Variants"];export{a as Default,r as Variants,W as __namedExportsOrder,T as default};
