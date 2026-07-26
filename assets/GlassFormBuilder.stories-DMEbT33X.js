import{G as t}from"./GlassFormBuilder-CjuNiuRA.js";import{f as e}from"./index-CLSxArU-.js";import"./iframe-f4tkjEOL.js";import"./preload-helper-PPVm8Dsz.js";import"./GlassButton-DEnAO805.js";import"./LiquidGlassMaterial-DO2TRWPm.js";import"./LiquidGlassLayerProvider-eyH5R_V_.js";import"./a11y-Bg_rm60C.js";import"./GlassPredictiveEngine-BSwZ3qss.js";import"./GlassAchievementSystem-BkhveWmv.js";import"./OptimizedGlassCore-DCm4UbzZ.js";import"./deviceCapabilities-Bkzt64hZ.js";import"./GlassBiometricAdaptation-YwmGbjEn.js";import"./MotionPreferenceContext-DVaVM-Qk.js";import"./GlassEyeTracking-CrP9E3y1.js";import"./GlassSpatialAudio-KPcipyjc.js";import"./MotionFramer-CH18-5SI.js";import"./utilsCore-C1yA8fLz.js";import"./GlassInput-BiocOO2N.js";import"./GlassCard-Bfc5rHWy.js";import"./GlassBadge-Cmt6Z7un.js";import"./GlassSelect-BHsBAC1b.js";import"./index-vzcdQXMp.js";import"./index-CbcsHdKm.js";import"./index-CWG1rEj-.js";import"./FocusTrap-DRgEx7Ay.js";import"./GlassCheckbox-usNUoElZ.js";import"./components-B0CLK4G-.js";import"./GlassTextarea-BGNU7iOZ.js";import"./index-ByImX2pa.js";const T={title:"Workflows/Glass Form Builder",component:t,parameters:{layout:"centered",docs:{description:{component:"A glass morphism glassformbuilder component."}}},argTypes:{schema:{control:"object",description:"Form schema with sections and fields"},values:{control:"object",description:"Current form values"},variant:{control:"select",options:["default","compact","wizard","inline"],description:"Form variant"},size:{control:"select",options:["sm","md","lg"],description:"Form size"},loading:{control:"boolean",description:"Whether form is loading"},disabled:{control:"boolean",description:"Whether form is disabled"}},args:{schema:[{id:"personal",title:"Personal Information",fields:[{id:"firstName",type:"text",label:"First Name",placeholder:"Enter your first name",required:!0},{id:"email",type:"email",label:"Email",placeholder:"Enter your email",required:!0},{id:"message",type:"textarea",label:"Message",placeholder:"Enter your message"}]}],values:{},variant:"default",size:"md",loading:!1,disabled:!1,onChange:e(),onSubmit:e()}},a={args:{schema:[{id:"contact",title:"Contact Form",fields:[{id:"name",type:"text",label:"Full Name",placeholder:"Enter your full name",required:!0},{id:"email",type:"email",label:"Email Address",placeholder:"Enter your email",required:!0},{id:"subject",type:"select",label:"Subject",options:[{value:"general",label:"General Inquiry"},{value:"support",label:"Technical Support"},{value:"sales",label:"Sales"}]}]}],values:{},onChange:e(),onSubmit:e()}},r={args:{schema:[{id:"personal",title:"Personal Information",fields:[{id:"firstName",type:"text",label:"First Name",placeholder:"Enter your first name"},{id:"lastName",type:"text",label:"Last Name",placeholder:"Enter your last name"}]}],values:{},variant:"compact",onChange:e(),onSubmit:e()}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
