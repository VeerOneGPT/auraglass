import{j as e}from"./iframe-D7NmxSe9.js";import{G as p}from"./GlassButton-DbfMCI8K.js";import{f as r}from"./index-DdjpOZjl.js";import"./preload-helper-PPVm8Dsz.js";import"./LiquidGlassMaterial-BoYaHFKo.js";import"./LiquidGlassLayerProvider-DfdCh4M5.js";import"./a11y-AzHiXVvX.js";import"./GlassPredictiveEngine-CPP6qRJT.js";import"./GlassAchievementSystem-7xtabjAo.js";import"./OptimizedGlassCore-KF10QAKi.js";import"./deviceCapabilities-BxFGwbZv.js";import"./GlassBiometricAdaptation-BrsiCRsK.js";import"./MotionPreferenceContext-Dh_pw3dF.js";import"./GlassEyeTracking-DzuX2A4f.js";import"./GlassSpatialAudio-CHgsb7_H.js";import"./MotionFramer-CT2AYNyT.js";import"./utilsCore-yCJLgS2C.js";import"./index-ByImX2pa.js";function l({reactions:a=[],onReact:c,className:i}){const o=Array.isArray(a)?a:[];return e.jsx("div",{"data-glass-component":!0,className:i,children:e.jsx("div",{className:"glass-flex glass-gap-2",children:o.length===0?e.jsx("span",{className:"glass-text-sm glass-text-secondary",children:"No reactions yet."}):o.map(s=>e.jsxs(p,{variant:"ghost",size:"sm",onClick:()=>c?.(s.key),children:[e.jsx("span",{className:"glass-mr-1",children:s.label}),e.jsx("span",{className:"glass-text-primary-opacity-70",children:s.count})]},s.key))})})}try{l.displayName="GlassReactionBar",l.__docgenInfo={description:"",displayName:"GlassReactionBar",props:{reactions:{defaultValue:{value:"[]"},description:"",name:"reactions",required:!1,type:{name:"Reaction[]"}},onReact:{defaultValue:null,description:"",name:"onReact",required:!1,type:{name:"((key: string) => void) | undefined"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string | undefined"}}}}}catch{}const w={title:"Effects + Advanced/Glass Reaction Bar",component:l,parameters:{layout:"centered",docs:{description:{component:"A glass morphism glassreactionbar component."}}},argTypes:{className:{control:"text",description:"Additional CSS classes"}},args:{className:""}},n={render:a=>e.jsx("div",{className:"glass-neutral-level1 glass-rounded-3xl glass-p-6",children:e.jsx(l,{...a})}),args:{reactions:[{key:"like",label:"👍",count:12},{key:"love",label:"❤️",count:8},{key:"laugh",label:"😂",count:5},{key:"wow",label:"😮",count:3},{key:"sad",label:"😢",count:1}],className:"",onReact:r()}},t={args:{reactions:[{key:"thumbs_up",label:"👍",count:42},{key:"heart",label:"❤️",count:38},{key:"fire",label:"🔥",count:27},{key:"clap",label:"👏",count:19},{key:"rocket",label:"🚀",count:15},{key:"thinking",label:"🤔",count:7},{key:"eyes",label:"👀",count:4}],onReact:r()}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: args => <div className="glass-neutral-level1 glass-rounded-3xl glass-p-6">
      <GlassReactionBar {...args} />
    </div>,
  args: {
    reactions: [{
      key: 'like',
      label: '👍',
      count: 12
    }, {
      key: 'love',
      label: '❤️',
      count: 8
    }, {
      key: 'laugh',
      label: '😂',
      count: 5
    }, {
      key: 'wow',
      label: '😮',
      count: 3
    }, {
      key: 'sad',
      label: '😢',
      count: 1
    }],
    className: '',
    onReact: fn()
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    reactions: [{
      key: 'thumbs_up',
      label: '👍',
      count: 42
    }, {
      key: 'heart',
      label: '❤️',
      count: 38
    }, {
      key: 'fire',
      label: '🔥',
      count: 27
    }, {
      key: 'clap',
      label: '👏',
      count: 19
    }, {
      key: 'rocket',
      label: '🚀',
      count: 15
    }, {
      key: 'thinking',
      label: '🤔',
      count: 7
    }, {
      key: 'eyes',
      label: '👀',
      count: 4
    }],
    onReact: fn()
  }
}`,...t.parameters?.docs?.source}}};const S=["Default","PopularReactions"];export{n as Default,t as PopularReactions,S as __namedExportsOrder,w as default};
