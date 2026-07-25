import{G as t}from"./GlassFormBuilder-C73M-_yV.js";import{f as e}from"./index-CLSxArU-.js";import"./iframe-BAivAiT-.js";import"./preload-helper-PPVm8Dsz.js";import"./GlassButton-TTI8l_vP.js";import"./LiquidGlassMaterial-DBiJj4QP.js";import"./LiquidGlassLayerProvider-Dqf6h3Ak.js";import"./a11y-BZ2F0fYk.js";import"./GlassPredictiveEngine-17Rl6a4J.js";import"./GlassAchievementSystem-KVpP9D2R.js";import"./OptimizedGlassCore-DDvvsRHx.js";import"./deviceCapabilities-DtvM-425.js";import"./GlassBiometricAdaptation-Dsov8bSv.js";import"./MotionPreferenceContext-DpssjoF9.js";import"./GlassEyeTracking-dcG8iC3M.js";import"./GlassSpatialAudio-SPhOiv7S.js";import"./MotionFramer-BMXTOpi3.js";import"./utilsCore-CSp3xIfl.js";import"./GlassInput-cm5MpqKX.js";import"./GlassCard-DzhA1j5G.js";import"./GlassBadge-CeC_GAXK.js";import"./GlassSelect-oVCTIyw9.js";import"./index-a-77K4Qo.js";import"./index-C0f1VUjF.js";import"./index-CWG1rEj-.js";import"./FocusTrap-DYPIF6PC.js";import"./GlassCheckbox-CDp8c-8s.js";import"./components-BQktBMzw.js";import"./GlassTextarea-C6Kp5PTT.js";import"./index-ByImX2pa.js";const T={title:"Workflows/Glass Form Builder",component:t,parameters:{layout:"centered",docs:{description:{component:"A glass morphism glassformbuilder component."}}},argTypes:{schema:{control:"object",description:"Form schema with sections and fields"},values:{control:"object",description:"Current form values"},variant:{control:"select",options:["default","compact","wizard","inline"],description:"Form variant"},size:{control:"select",options:["sm","md","lg"],description:"Form size"},loading:{control:"boolean",description:"Whether form is loading"},disabled:{control:"boolean",description:"Whether form is disabled"}},args:{schema:[{id:"personal",title:"Personal Information",fields:[{id:"firstName",type:"text",label:"First Name",placeholder:"Enter your first name",required:!0},{id:"email",type:"email",label:"Email",placeholder:"Enter your email",required:!0},{id:"message",type:"textarea",label:"Message",placeholder:"Enter your message"}]}],values:{},variant:"default",size:"md",loading:!1,disabled:!1,onChange:e(),onSubmit:e()}},a={args:{schema:[{id:"contact",title:"Contact Form",fields:[{id:"name",type:"text",label:"Full Name",placeholder:"Enter your full name",required:!0},{id:"email",type:"email",label:"Email Address",placeholder:"Enter your email",required:!0},{id:"subject",type:"select",label:"Subject",options:[{value:"general",label:"General Inquiry"},{value:"support",label:"Technical Support"},{value:"sales",label:"Sales"}]}]}],values:{},onChange:e(),onSubmit:e()}},r={args:{schema:[{id:"personal",title:"Personal Information",fields:[{id:"firstName",type:"text",label:"First Name",placeholder:"Enter your first name"},{id:"lastName",type:"text",label:"Last Name",placeholder:"Enter your last name"}]}],values:{},variant:"compact",onChange:e(),onSubmit:e()}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
