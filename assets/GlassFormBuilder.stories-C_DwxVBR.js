import{G as t}from"./GlassFormBuilder-DnlTFUtg.js";import{f as e}from"./index-CLSxArU-.js";import"./iframe-BFA0g0qN.js";import"./preload-helper-PPVm8Dsz.js";import"./GlassButton-CyIdTMV0.js";import"./LiquidGlassMaterial-DzuCWRKv.js";import"./LiquidGlassLayerProvider-CeJy3V3-.js";import"./a11y-Cv_WjuHB.js";import"./GlassPredictiveEngine-8BZqwFEm.js";import"./GlassAchievementSystem-CxNINDoB.js";import"./OptimizedGlassCore-B6ORHt-z.js";import"./deviceCapabilities-C7gFfV9s.js";import"./GlassBiometricAdaptation-kOIwgdi_.js";import"./MotionPreferenceContext-BWez_rUG.js";import"./GlassEyeTracking-CKWtrLQP.js";import"./GlassSpatialAudio-YFyb9m2V.js";import"./MotionFramer-CG1iq59V.js";import"./utilsCore-BH7PBVN9.js";import"./GlassInput-Dv9Nl1Zo.js";import"./GlassCard-CDJc5Dil.js";import"./GlassBadge-BoRBPfZt.js";import"./GlassSelect-DsVYZdg9.js";import"./index-NYTm1c38.js";import"./index-BPQcfUBO.js";import"./index-CWG1rEj-.js";import"./FocusTrap-R2xSC04t.js";import"./GlassCheckbox-DM5LFC0A.js";import"./components-GID40uyS.js";import"./GlassTextarea-DDD_ynU4.js";import"./index-ByImX2pa.js";const T={title:"Workflows/Glass Form Builder",component:t,parameters:{layout:"centered",docs:{description:{component:"A glass morphism glassformbuilder component."}}},argTypes:{schema:{control:"object",description:"Form schema with sections and fields"},values:{control:"object",description:"Current form values"},variant:{control:"select",options:["default","compact","wizard","inline"],description:"Form variant"},size:{control:"select",options:["sm","md","lg"],description:"Form size"},loading:{control:"boolean",description:"Whether form is loading"},disabled:{control:"boolean",description:"Whether form is disabled"}},args:{schema:[{id:"personal",title:"Personal Information",fields:[{id:"firstName",type:"text",label:"First Name",placeholder:"Enter your first name",required:!0},{id:"email",type:"email",label:"Email",placeholder:"Enter your email",required:!0},{id:"message",type:"textarea",label:"Message",placeholder:"Enter your message"}]}],values:{},variant:"default",size:"md",loading:!1,disabled:!1,onChange:e(),onSubmit:e()}},a={args:{schema:[{id:"contact",title:"Contact Form",fields:[{id:"name",type:"text",label:"Full Name",placeholder:"Enter your full name",required:!0},{id:"email",type:"email",label:"Email Address",placeholder:"Enter your email",required:!0},{id:"subject",type:"select",label:"Subject",options:[{value:"general",label:"General Inquiry"},{value:"support",label:"Technical Support"},{value:"sales",label:"Sales"}]}]}],values:{},onChange:e(),onSubmit:e()}},r={args:{schema:[{id:"personal",title:"Personal Information",fields:[{id:"firstName",type:"text",label:"First Name",placeholder:"Enter your first name"},{id:"lastName",type:"text",label:"Last Name",placeholder:"Enter your last name"}]}],values:{},variant:"compact",onChange:e(),onSubmit:e()}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
