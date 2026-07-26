import{G as t}from"./GlassFormBuilder-CCq0l0P2.js";import{f as e}from"./index-CLSxArU-.js";import"./iframe-BAC2UkgQ.js";import"./preload-helper-PPVm8Dsz.js";import"./GlassButton-Dueixor7.js";import"./LiquidGlassMaterial-BPY78dVD.js";import"./LiquidGlassLayerProvider-B5K6qh4Z.js";import"./a11y-B30kvJhb.js";import"./GlassPredictiveEngine-CF0bnvkU.js";import"./GlassAchievementSystem-3uRy6PnB.js";import"./OptimizedGlassCore-BYrwxk4f.js";import"./deviceCapabilities-DalvrUkp.js";import"./GlassBiometricAdaptation-BESjg4Ec.js";import"./MotionPreferenceContext-DJhM1DEi.js";import"./GlassEyeTracking-8pBZtmX5.js";import"./GlassSpatialAudio-Db_fiUGN.js";import"./MotionFramer-GR5JBSd5.js";import"./utilsCore-CioBa_x1.js";import"./GlassInput-B7Ie83lj.js";import"./GlassCard-B9W1Kh-k.js";import"./GlassBadge-A1pYWLsN.js";import"./GlassSelect-nk8MMOfZ.js";import"./index-DXwFw2-c.js";import"./index-CdgSPNBD.js";import"./index-CWG1rEj-.js";import"./FocusTrap-h9sPXFqt.js";import"./GlassCheckbox-B9_q2TJF.js";import"./components-COhHezpN.js";import"./GlassTextarea-CactppEP.js";import"./index-ByImX2pa.js";const T={title:"Workflows/Glass Form Builder",component:t,parameters:{layout:"centered",docs:{description:{component:"A glass morphism glassformbuilder component."}}},argTypes:{schema:{control:"object",description:"Form schema with sections and fields"},values:{control:"object",description:"Current form values"},variant:{control:"select",options:["default","compact","wizard","inline"],description:"Form variant"},size:{control:"select",options:["sm","md","lg"],description:"Form size"},loading:{control:"boolean",description:"Whether form is loading"},disabled:{control:"boolean",description:"Whether form is disabled"}},args:{schema:[{id:"personal",title:"Personal Information",fields:[{id:"firstName",type:"text",label:"First Name",placeholder:"Enter your first name",required:!0},{id:"email",type:"email",label:"Email",placeholder:"Enter your email",required:!0},{id:"message",type:"textarea",label:"Message",placeholder:"Enter your message"}]}],values:{},variant:"default",size:"md",loading:!1,disabled:!1,onChange:e(),onSubmit:e()}},a={args:{schema:[{id:"contact",title:"Contact Form",fields:[{id:"name",type:"text",label:"Full Name",placeholder:"Enter your full name",required:!0},{id:"email",type:"email",label:"Email Address",placeholder:"Enter your email",required:!0},{id:"subject",type:"select",label:"Subject",options:[{value:"general",label:"General Inquiry"},{value:"support",label:"Technical Support"},{value:"sales",label:"Sales"}]}]}],values:{},onChange:e(),onSubmit:e()}},r={args:{schema:[{id:"personal",title:"Personal Information",fields:[{id:"firstName",type:"text",label:"First Name",placeholder:"Enter your first name"},{id:"lastName",type:"text",label:"Last Name",placeholder:"Enter your last name"}]}],values:{},variant:"compact",onChange:e(),onSubmit:e()}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
