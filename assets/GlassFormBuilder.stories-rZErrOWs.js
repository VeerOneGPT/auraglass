import{G as t}from"./GlassFormBuilder-u_Xx3VZ2.js";import{f as e}from"./index-DdjpOZjl.js";import"./iframe-D7NmxSe9.js";import"./preload-helper-PPVm8Dsz.js";import"./GlassButton-DbfMCI8K.js";import"./LiquidGlassMaterial-BoYaHFKo.js";import"./LiquidGlassLayerProvider-DfdCh4M5.js";import"./a11y-AzHiXVvX.js";import"./GlassPredictiveEngine-CPP6qRJT.js";import"./GlassAchievementSystem-7xtabjAo.js";import"./OptimizedGlassCore-KF10QAKi.js";import"./deviceCapabilities-BxFGwbZv.js";import"./GlassBiometricAdaptation-BrsiCRsK.js";import"./MotionPreferenceContext-Dh_pw3dF.js";import"./GlassEyeTracking-DzuX2A4f.js";import"./GlassSpatialAudio-CHgsb7_H.js";import"./MotionFramer-CT2AYNyT.js";import"./utilsCore-yCJLgS2C.js";import"./GlassInput-C40RiGmW.js";import"./GlassCard-f36I-x3H.js";import"./GlassBadge-D1TFmb-I.js";import"./GlassSelect-CpFs1VH0.js";import"./index-DoSupsjb.js";import"./index-COdOBccr.js";import"./index-CWG1rEj-.js";import"./FocusTrap-DrLuxZ1M.js";import"./GlassCheckbox-CYy-nBW8.js";import"./components-BOfJuyi9.js";import"./GlassTextarea-C4-H79PS.js";import"./index-ByImX2pa.js";const T={title:"Workflows/Glass Form Builder",component:t,parameters:{layout:"centered",docs:{description:{component:"A glass morphism glassformbuilder component."}}},argTypes:{schema:{control:"object",description:"Form schema with sections and fields"},values:{control:"object",description:"Current form values"},variant:{control:"select",options:["default","compact","wizard","inline"],description:"Form variant"},size:{control:"select",options:["sm","md","lg"],description:"Form size"},loading:{control:"boolean",description:"Whether form is loading"},disabled:{control:"boolean",description:"Whether form is disabled"}},args:{schema:[{id:"personal",title:"Personal Information",fields:[{id:"firstName",type:"text",label:"First Name",placeholder:"Enter your first name",required:!0},{id:"email",type:"email",label:"Email",placeholder:"Enter your email",required:!0},{id:"message",type:"textarea",label:"Message",placeholder:"Enter your message"}]}],values:{},variant:"default",size:"md",loading:!1,disabled:!1,onChange:e(),onSubmit:e()}},a={args:{schema:[{id:"contact",title:"Contact Form",fields:[{id:"name",type:"text",label:"Full Name",placeholder:"Enter your full name",required:!0},{id:"email",type:"email",label:"Email Address",placeholder:"Enter your email",required:!0},{id:"subject",type:"select",label:"Subject",options:[{value:"general",label:"General Inquiry"},{value:"support",label:"Technical Support"},{value:"sales",label:"Sales"}]}]}],values:{},onChange:e(),onSubmit:e()}},r={args:{schema:[{id:"personal",title:"Personal Information",fields:[{id:"firstName",type:"text",label:"First Name",placeholder:"Enter your first name"},{id:"lastName",type:"text",label:"Last Name",placeholder:"Enter your last name"}]}],values:{},variant:"compact",onChange:e(),onSubmit:e()}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
