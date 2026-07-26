import{G as t}from"./GlassFormBuilder-CBfg3uI2.js";import{f as e}from"./index-CLSxArU-.js";import"./iframe-BZAYu8Ei.js";import"./preload-helper-PPVm8Dsz.js";import"./GlassButton-CYq9mNR8.js";import"./LiquidGlassMaterial-BPSxLi3y.js";import"./LiquidGlassLayerProvider-Co2xcY12.js";import"./a11y-VELzf_WU.js";import"./GlassPredictiveEngine-mA_jGREj.js";import"./GlassAchievementSystem-DyacNQA3.js";import"./OptimizedGlassCore-BDmEdizL.js";import"./deviceCapabilities-g_mENti4.js";import"./GlassBiometricAdaptation-BvJskqmt.js";import"./MotionPreferenceContext-DJhYG_Fr.js";import"./GlassEyeTracking-naTxSBAh.js";import"./GlassSpatialAudio-CZG_7uBE.js";import"./MotionFramer-DDLTGHtx.js";import"./utilsCore-CWe_zLcl.js";import"./GlassInput-eTAMI0eM.js";import"./GlassCard-DV8oUmSc.js";import"./GlassBadge-BxRlJ0ez.js";import"./GlassSelect-l0idy4co.js";import"./index-DqfL0GjR.js";import"./index-D1-LG1zU.js";import"./index-CWG1rEj-.js";import"./FocusTrap-BUSdugbo.js";import"./GlassCheckbox-CjKBplZ-.js";import"./components-DP3SUdaj.js";import"./GlassTextarea-CnmG_iuV.js";import"./index-ByImX2pa.js";const T={title:"Workflows/Glass Form Builder",component:t,parameters:{layout:"centered",docs:{description:{component:"A glass morphism glassformbuilder component."}}},argTypes:{schema:{control:"object",description:"Form schema with sections and fields"},values:{control:"object",description:"Current form values"},variant:{control:"select",options:["default","compact","wizard","inline"],description:"Form variant"},size:{control:"select",options:["sm","md","lg"],description:"Form size"},loading:{control:"boolean",description:"Whether form is loading"},disabled:{control:"boolean",description:"Whether form is disabled"}},args:{schema:[{id:"personal",title:"Personal Information",fields:[{id:"firstName",type:"text",label:"First Name",placeholder:"Enter your first name",required:!0},{id:"email",type:"email",label:"Email",placeholder:"Enter your email",required:!0},{id:"message",type:"textarea",label:"Message",placeholder:"Enter your message"}]}],values:{},variant:"default",size:"md",loading:!1,disabled:!1,onChange:e(),onSubmit:e()}},a={args:{schema:[{id:"contact",title:"Contact Form",fields:[{id:"name",type:"text",label:"Full Name",placeholder:"Enter your full name",required:!0},{id:"email",type:"email",label:"Email Address",placeholder:"Enter your email",required:!0},{id:"subject",type:"select",label:"Subject",options:[{value:"general",label:"General Inquiry"},{value:"support",label:"Technical Support"},{value:"sales",label:"Sales"}]}]}],values:{},onChange:e(),onSubmit:e()}},r={args:{schema:[{id:"personal",title:"Personal Information",fields:[{id:"firstName",type:"text",label:"First Name",placeholder:"Enter your first name"},{id:"lastName",type:"text",label:"Last Name",placeholder:"Enter your last name"}]}],values:{},variant:"compact",onChange:e(),onSubmit:e()}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
