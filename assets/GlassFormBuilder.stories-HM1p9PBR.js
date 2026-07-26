import{G as t}from"./GlassFormBuilder-DLz4sSVK.js";import{f as e}from"./index-CLSxArU-.js";import"./iframe-BMm1MGu9.js";import"./preload-helper-PPVm8Dsz.js";import"./GlassButton-CNSOEo_p.js";import"./LiquidGlassMaterial-SI7ENZKq.js";import"./LiquidGlassLayerProvider-BNP_P3nK.js";import"./a11y-F3D1DgXY.js";import"./GlassPredictiveEngine-B7-aJxlj.js";import"./GlassAchievementSystem-CkobLubC.js";import"./OptimizedGlassCore-DBJBrrOp.js";import"./deviceCapabilities-CXTyCnkw.js";import"./GlassBiometricAdaptation-B3BGuWWc.js";import"./MotionPreferenceContext-BhIAYt0o.js";import"./GlassEyeTracking-BfYY-K7H.js";import"./GlassSpatialAudio-B1GD6I0-.js";import"./MotionFramer-D73T7jvH.js";import"./utilsCore-BBRCHwws.js";import"./GlassInput--6X6yvR_.js";import"./GlassCard-BpwNhXLp.js";import"./GlassBadge-CyRT09XL.js";import"./GlassSelect-j_tPL0qA.js";import"./index-C4IL4NqJ.js";import"./index-RDS6nrQR.js";import"./index-CWG1rEj-.js";import"./FocusTrap-Dq1ehZqv.js";import"./GlassCheckbox-BSFYXTH5.js";import"./components-hyZkTYrM.js";import"./GlassTextarea-BRSeUga-.js";import"./index-ByImX2pa.js";const T={title:"Workflows/Glass Form Builder",component:t,parameters:{layout:"centered",docs:{description:{component:"A glass morphism glassformbuilder component."}}},argTypes:{schema:{control:"object",description:"Form schema with sections and fields"},values:{control:"object",description:"Current form values"},variant:{control:"select",options:["default","compact","wizard","inline"],description:"Form variant"},size:{control:"select",options:["sm","md","lg"],description:"Form size"},loading:{control:"boolean",description:"Whether form is loading"},disabled:{control:"boolean",description:"Whether form is disabled"}},args:{schema:[{id:"personal",title:"Personal Information",fields:[{id:"firstName",type:"text",label:"First Name",placeholder:"Enter your first name",required:!0},{id:"email",type:"email",label:"Email",placeholder:"Enter your email",required:!0},{id:"message",type:"textarea",label:"Message",placeholder:"Enter your message"}]}],values:{},variant:"default",size:"md",loading:!1,disabled:!1,onChange:e(),onSubmit:e()}},a={args:{schema:[{id:"contact",title:"Contact Form",fields:[{id:"name",type:"text",label:"Full Name",placeholder:"Enter your full name",required:!0},{id:"email",type:"email",label:"Email Address",placeholder:"Enter your email",required:!0},{id:"subject",type:"select",label:"Subject",options:[{value:"general",label:"General Inquiry"},{value:"support",label:"Technical Support"},{value:"sales",label:"Sales"}]}]}],values:{},onChange:e(),onSubmit:e()}},r={args:{schema:[{id:"personal",title:"Personal Information",fields:[{id:"firstName",type:"text",label:"First Name",placeholder:"Enter your first name"},{id:"lastName",type:"text",label:"Last Name",placeholder:"Enter your last name"}]}],values:{},variant:"compact",onChange:e(),onSubmit:e()}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
