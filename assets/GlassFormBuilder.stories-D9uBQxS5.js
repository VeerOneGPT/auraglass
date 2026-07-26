import{G as t}from"./GlassFormBuilder-DvKQi50E.js";import{f as e}from"./index-CLSxArU-.js";import"./iframe-BV8WJU8h.js";import"./preload-helper-PPVm8Dsz.js";import"./GlassButton-CjVbNaAs.js";import"./LiquidGlassMaterial-7YYkh0Ce.js";import"./LiquidGlassLayerProvider-CA4_-dNY.js";import"./a11y-D5FIiDtF.js";import"./GlassPredictiveEngine-CnrmABYd.js";import"./GlassAchievementSystem-CB2uc4Sn.js";import"./OptimizedGlassCore-BD9yuy9d.js";import"./deviceCapabilities-DRffs9sK.js";import"./GlassBiometricAdaptation-GpA_mzR3.js";import"./MotionPreferenceContext-DWgmOiwo.js";import"./GlassEyeTracking-BTnyyeP7.js";import"./GlassSpatialAudio-DJ8ZGp-r.js";import"./MotionFramer-xe4SmWDC.js";import"./utilsCore-BWvKUqjD.js";import"./GlassInput-DBapXyTT.js";import"./GlassCard-BRjTWt6b.js";import"./GlassBadge-DOdgI1N1.js";import"./GlassSelect-Bn6WrsUt.js";import"./index-Bu4WDBxY.js";import"./index-eQEAScCb.js";import"./index-CWG1rEj-.js";import"./FocusTrap-BisbyruW.js";import"./GlassCheckbox-Cozo9TRt.js";import"./components-Bw-NSi0r.js";import"./GlassTextarea-BkeDh_jZ.js";import"./index-ByImX2pa.js";const T={title:"Workflows/Glass Form Builder",component:t,parameters:{layout:"centered",docs:{description:{component:"A glass morphism glassformbuilder component."}}},argTypes:{schema:{control:"object",description:"Form schema with sections and fields"},values:{control:"object",description:"Current form values"},variant:{control:"select",options:["default","compact","wizard","inline"],description:"Form variant"},size:{control:"select",options:["sm","md","lg"],description:"Form size"},loading:{control:"boolean",description:"Whether form is loading"},disabled:{control:"boolean",description:"Whether form is disabled"}},args:{schema:[{id:"personal",title:"Personal Information",fields:[{id:"firstName",type:"text",label:"First Name",placeholder:"Enter your first name",required:!0},{id:"email",type:"email",label:"Email",placeholder:"Enter your email",required:!0},{id:"message",type:"textarea",label:"Message",placeholder:"Enter your message"}]}],values:{},variant:"default",size:"md",loading:!1,disabled:!1,onChange:e(),onSubmit:e()}},a={args:{schema:[{id:"contact",title:"Contact Form",fields:[{id:"name",type:"text",label:"Full Name",placeholder:"Enter your full name",required:!0},{id:"email",type:"email",label:"Email Address",placeholder:"Enter your email",required:!0},{id:"subject",type:"select",label:"Subject",options:[{value:"general",label:"General Inquiry"},{value:"support",label:"Technical Support"},{value:"sales",label:"Sales"}]}]}],values:{},onChange:e(),onSubmit:e()}},r={args:{schema:[{id:"personal",title:"Personal Information",fields:[{id:"firstName",type:"text",label:"First Name",placeholder:"Enter your first name"},{id:"lastName",type:"text",label:"Last Name",placeholder:"Enter your last name"}]}],values:{},variant:"compact",onChange:e(),onSubmit:e()}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
