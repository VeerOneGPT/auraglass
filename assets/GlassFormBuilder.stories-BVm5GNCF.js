import{G as t}from"./GlassFormBuilder-CeIbuvBE.js";import{f as e}from"./index-CLSxArU-.js";import"./iframe-S1igmbXx.js";import"./preload-helper-PPVm8Dsz.js";import"./GlassButton-DlHU-OLN.js";import"./LiquidGlassMaterial-DvRcBXs4.js";import"./LiquidGlassLayerProvider-DM1kB0qd.js";import"./a11y-BR0xbTwL.js";import"./GlassPredictiveEngine-CY9rUktt.js";import"./GlassAchievementSystem-DWnEGO00.js";import"./OptimizedGlassCore-ClPJjaHD.js";import"./deviceCapabilities-BxnB5h_c.js";import"./GlassBiometricAdaptation-5h-8AMwT.js";import"./MotionPreferenceContext-DC1zrsZ8.js";import"./GlassEyeTracking-CDO9DFwA.js";import"./GlassSpatialAudio-BOJttSt0.js";import"./MotionFramer-DNt9f2ph.js";import"./utilsCore-BXgb8Uvr.js";import"./GlassInput-D-ThfBHX.js";import"./GlassCard-BiwfgDcr.js";import"./GlassBadge-B-Nsx8Nb.js";import"./GlassSelect-BjVUM3wJ.js";import"./index-BV6htE9n.js";import"./index-BFlJrS15.js";import"./index-CWG1rEj-.js";import"./FocusTrap-V-ZVhHZW.js";import"./GlassCheckbox-BvUOlf8w.js";import"./components-BRAv81QP.js";import"./GlassTextarea-Cl6InHot.js";import"./index-ByImX2pa.js";const T={title:"Workflows/Glass Form Builder",component:t,parameters:{layout:"centered",docs:{description:{component:"A glass morphism glassformbuilder component."}}},argTypes:{schema:{control:"object",description:"Form schema with sections and fields"},values:{control:"object",description:"Current form values"},variant:{control:"select",options:["default","compact","wizard","inline"],description:"Form variant"},size:{control:"select",options:["sm","md","lg"],description:"Form size"},loading:{control:"boolean",description:"Whether form is loading"},disabled:{control:"boolean",description:"Whether form is disabled"}},args:{schema:[{id:"personal",title:"Personal Information",fields:[{id:"firstName",type:"text",label:"First Name",placeholder:"Enter your first name",required:!0},{id:"email",type:"email",label:"Email",placeholder:"Enter your email",required:!0},{id:"message",type:"textarea",label:"Message",placeholder:"Enter your message"}]}],values:{},variant:"default",size:"md",loading:!1,disabled:!1,onChange:e(),onSubmit:e()}},a={args:{schema:[{id:"contact",title:"Contact Form",fields:[{id:"name",type:"text",label:"Full Name",placeholder:"Enter your full name",required:!0},{id:"email",type:"email",label:"Email Address",placeholder:"Enter your email",required:!0},{id:"subject",type:"select",label:"Subject",options:[{value:"general",label:"General Inquiry"},{value:"support",label:"Technical Support"},{value:"sales",label:"Sales"}]}]}],values:{},onChange:e(),onSubmit:e()}},r={args:{schema:[{id:"personal",title:"Personal Information",fields:[{id:"firstName",type:"text",label:"First Name",placeholder:"Enter your first name"},{id:"lastName",type:"text",label:"Last Name",placeholder:"Enter your last name"}]}],values:{},variant:"compact",onChange:e(),onSubmit:e()}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
