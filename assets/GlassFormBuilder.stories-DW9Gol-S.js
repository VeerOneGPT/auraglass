import{G as t}from"./GlassFormBuilder-BQ0gyAGL.js";import{f as e}from"./index-CLSxArU-.js";import"./iframe-W10Ontp8.js";import"./preload-helper-PPVm8Dsz.js";import"./GlassButton-CVmxdPoA.js";import"./LiquidGlassMaterial-DB5Hu6PO.js";import"./LiquidGlassLayerProvider-B0fLxmKC.js";import"./a11y-BmzSDA3q.js";import"./GlassPredictiveEngine-B8jT0jcf.js";import"./GlassAchievementSystem-DqjXQLzn.js";import"./OptimizedGlassCore-CadU-ErO.js";import"./deviceCapabilities-BVriTAFX.js";import"./GlassBiometricAdaptation-BlxBxm87.js";import"./MotionPreferenceContext-Db2LoQ9i.js";import"./GlassEyeTracking-BFin3s1L.js";import"./GlassSpatialAudio-4CToH89u.js";import"./MotionFramer-C_AUzSnN.js";import"./utilsCore-Clq-gVdo.js";import"./GlassInput-DeFE52AH.js";import"./GlassCard-C6L4QERS.js";import"./GlassBadge-BM2BtcO8.js";import"./GlassSelect-BUc39z3J.js";import"./index-CCeIAcJI.js";import"./index-Cim-uDoj.js";import"./index-CWG1rEj-.js";import"./FocusTrap-CX9rDj_x.js";import"./GlassCheckbox-B6bHWqyv.js";import"./components-wxrVEbsA.js";import"./GlassTextarea-DoJMhL69.js";import"./index-ByImX2pa.js";const T={title:"Workflows/Glass Form Builder",component:t,parameters:{layout:"centered",docs:{description:{component:"A glass morphism glassformbuilder component."}}},argTypes:{schema:{control:"object",description:"Form schema with sections and fields"},values:{control:"object",description:"Current form values"},variant:{control:"select",options:["default","compact","wizard","inline"],description:"Form variant"},size:{control:"select",options:["sm","md","lg"],description:"Form size"},loading:{control:"boolean",description:"Whether form is loading"},disabled:{control:"boolean",description:"Whether form is disabled"}},args:{schema:[{id:"personal",title:"Personal Information",fields:[{id:"firstName",type:"text",label:"First Name",placeholder:"Enter your first name",required:!0},{id:"email",type:"email",label:"Email",placeholder:"Enter your email",required:!0},{id:"message",type:"textarea",label:"Message",placeholder:"Enter your message"}]}],values:{},variant:"default",size:"md",loading:!1,disabled:!1,onChange:e(),onSubmit:e()}},a={args:{schema:[{id:"contact",title:"Contact Form",fields:[{id:"name",type:"text",label:"Full Name",placeholder:"Enter your full name",required:!0},{id:"email",type:"email",label:"Email Address",placeholder:"Enter your email",required:!0},{id:"subject",type:"select",label:"Subject",options:[{value:"general",label:"General Inquiry"},{value:"support",label:"Technical Support"},{value:"sales",label:"Sales"}]}]}],values:{},onChange:e(),onSubmit:e()}},r={args:{schema:[{id:"personal",title:"Personal Information",fields:[{id:"firstName",type:"text",label:"First Name",placeholder:"Enter your first name"},{id:"lastName",type:"text",label:"Last Name",placeholder:"Enter your last name"}]}],values:{},variant:"compact",onChange:e(),onSubmit:e()}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
