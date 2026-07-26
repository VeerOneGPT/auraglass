import{G as t}from"./GlassFormBuilder-CdicgcJZ.js";import{f as e}from"./index-CLSxArU-.js";import"./iframe-Clyy8eH9.js";import"./preload-helper-PPVm8Dsz.js";import"./GlassButton-BCcVvOAV.js";import"./LiquidGlassMaterial-BCAkrbX0.js";import"./LiquidGlassLayerProvider-3KvbeORN.js";import"./a11y-CEv8m6an.js";import"./GlassPredictiveEngine-BedB9Z1y.js";import"./GlassAchievementSystem-CkQWckTk.js";import"./OptimizedGlassCore-C_nAhdQS.js";import"./deviceCapabilities-D-Yur_0b.js";import"./GlassBiometricAdaptation-C4AP0-tD.js";import"./MotionPreferenceContext-CIHSRKSN.js";import"./GlassEyeTracking-tZUAZ7k1.js";import"./GlassSpatialAudio-C5tTGnmJ.js";import"./MotionFramer-DEHsckCP.js";import"./utilsCore-B1LLz5w0.js";import"./GlassInput-DgDvYU7s.js";import"./GlassCard-BasOoN0G.js";import"./GlassBadge-CTFmL-fb.js";import"./GlassSelect-CpiTy66T.js";import"./index-Dawh5Oef.js";import"./index-9eTjYU5f.js";import"./index-CWG1rEj-.js";import"./FocusTrap-Bf2Fqk6H.js";import"./GlassCheckbox-CC4r5vvw.js";import"./components-BFpahfv9.js";import"./GlassTextarea-hUNzFhVo.js";import"./index-ByImX2pa.js";const T={title:"Workflows/Glass Form Builder",component:t,parameters:{layout:"centered",docs:{description:{component:"A glass morphism glassformbuilder component."}}},argTypes:{schema:{control:"object",description:"Form schema with sections and fields"},values:{control:"object",description:"Current form values"},variant:{control:"select",options:["default","compact","wizard","inline"],description:"Form variant"},size:{control:"select",options:["sm","md","lg"],description:"Form size"},loading:{control:"boolean",description:"Whether form is loading"},disabled:{control:"boolean",description:"Whether form is disabled"}},args:{schema:[{id:"personal",title:"Personal Information",fields:[{id:"firstName",type:"text",label:"First Name",placeholder:"Enter your first name",required:!0},{id:"email",type:"email",label:"Email",placeholder:"Enter your email",required:!0},{id:"message",type:"textarea",label:"Message",placeholder:"Enter your message"}]}],values:{},variant:"default",size:"md",loading:!1,disabled:!1,onChange:e(),onSubmit:e()}},a={args:{schema:[{id:"contact",title:"Contact Form",fields:[{id:"name",type:"text",label:"Full Name",placeholder:"Enter your full name",required:!0},{id:"email",type:"email",label:"Email Address",placeholder:"Enter your email",required:!0},{id:"subject",type:"select",label:"Subject",options:[{value:"general",label:"General Inquiry"},{value:"support",label:"Technical Support"},{value:"sales",label:"Sales"}]}]}],values:{},onChange:e(),onSubmit:e()}},r={args:{schema:[{id:"personal",title:"Personal Information",fields:[{id:"firstName",type:"text",label:"First Name",placeholder:"Enter your first name"},{id:"lastName",type:"text",label:"Last Name",placeholder:"Enter your last name"}]}],values:{},variant:"compact",onChange:e(),onSubmit:e()}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
