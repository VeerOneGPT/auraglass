import{j as s,r as c}from"./iframe-C5od7h8K.js";import{G as d}from"./GlassButton-BQ2_2aMX.js";import{G as l,a as p,b as i,c as n,d as r,e,f as u,g as M,h as x,i as j,j as g,k as S,l as m}from"./GlassDropdownMenu-DfRiVRSK.js";import"./preload-helper-PPVm8Dsz.js";import"./LiquidGlassMaterial-Ctjdw0yC.js";import"./LiquidGlassLayerProvider-CDXyPgOp.js";import"./a11y-Co-fZPBs.js";import"./GlassPredictiveEngine-D3IPKk2l.js";import"./GlassAchievementSystem-BdTN2ZRZ.js";import"./OptimizedGlassCore-BH_bCKS0.js";import"./deviceCapabilities-DOrAHvyM.js";import"./GlassBiometricAdaptation-D45hhFYh.js";import"./MotionPreferenceContext-B6IRqqi_.js";import"./GlassEyeTracking-rz27-Djb.js";import"./GlassSpatialAudio-DL83-SMg.js";import"./MotionFramer-BGrNwvQ8.js";import"./utilsCore-DaMeHdht.js";import"./components-CZ1LEnog.js";import"./Positioner-Ddf7I8J2.js";import"./DismissableLayer-CGvhI70w.js";import"./FocusScope-D6BemALI.js";import"./Portal-98BYrBzg.js";import"./index-DyOVB5Nm.js";import"./index-BwcA4rZF.js";import"./index-CWG1rEj-.js";const U={title:"Navigation/Glass Dropdown Menu",component:l,parameters:{layout:"centered",docs:{description:{component:"A glass morphism dropdown menu system with various menu item types."}}}},N=()=>{const[h,w]=c.useState(!0),[D,G]=c.useState("system");return s.jsxs(l,{defaultOpen:!0,className:"glass-relative glass-w-56",children:[s.jsx(p,{asChild:!0,children:s.jsx(d,{variant:"outline",children:"Open Menu"})}),s.jsxs(i,{className:"glass-w-56",contained:!0,portalled:!1,children:[s.jsx(u,{children:"My Account"}),s.jsx(r,{}),s.jsxs(n,{children:["Profile",s.jsx(e,{children:"⇧⌘P"})]}),s.jsxs(M,{defaultOpen:!0,children:[s.jsx(x,{children:"More tools"}),s.jsx(j,{contained:!0,portalled:!1,className:"glass-mt-2 glass-w-full",style:{position:"relative",left:0,top:0,transform:"none"},children:s.jsx(n,{children:"Import workspace"})})]}),s.jsx(r,{}),s.jsx(g,{checked:h,onCheckedChange:w,children:"Status Bar"}),s.jsx(r,{}),s.jsx(u,{children:"Theme"}),s.jsxs(S,{value:D,onValueChange:G,children:[s.jsx(m,{value:"light",children:"Light"}),s.jsx(m,{value:"system",children:"System"})]})]})]})},a={render:()=>s.jsx(N,{})},o={render:()=>s.jsxs(l,{children:[s.jsx(p,{asChild:!0,children:s.jsx(d,{variant:"outline",children:"Menu with Icons"})}),s.jsxs(i,{className:"w-56",children:[s.jsxs(n,{children:[s.jsx("span",{className:"glass-mr-2",children:"📝"}),"New File",s.jsx(e,{children:"⌘N"})]}),s.jsxs(n,{children:[s.jsx("span",{className:"glass-mr-2",children:"📁"}),"Open Folder",s.jsx(e,{children:"⌘O"})]}),s.jsx(r,{}),s.jsxs(n,{children:[s.jsx("span",{className:"glass-mr-2",children:"💾"}),"Save",s.jsx(e,{children:"⌘S"})]}),s.jsxs(n,{children:[s.jsx("span",{className:"glass-mr-2",children:"🔄"}),"Refresh",s.jsx(e,{children:"⌘R"})]})]})]})},t={render:()=>s.jsxs(l,{children:[s.jsx(p,{asChild:!0,children:s.jsx(d,{variant:"outline",children:"Actions"})}),s.jsxs(i,{className:"w-56",children:[s.jsxs(n,{children:[s.jsx("span",{className:"glass-mr-2",children:"✏️"}),"Edit"]}),s.jsxs(n,{children:[s.jsx("span",{className:"glass-mr-2",children:"📋"}),"Duplicate"]}),s.jsx(r,{}),s.jsxs(n,{variant:"destructive",children:[s.jsx("span",{className:"glass-mr-2",children:"🗑️"}),"Delete"]})]})]})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <BasicDropdown />
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <GlassDropdownMenu>
      <GlassDropdownMenuTrigger asChild>
        <GlassButton variant="outline">Menu with Icons</GlassButton>
      </GlassDropdownMenuTrigger>

      <GlassDropdownMenuContent className="w-56">
        <GlassDropdownMenuItem>
          <span className="glass-mr-2">📝</span>
          New File
          <GlassDropdownMenuShortcut>⌘N</GlassDropdownMenuShortcut>
        </GlassDropdownMenuItem>

        <GlassDropdownMenuItem>
          <span className="glass-mr-2">📁</span>
          Open Folder
          <GlassDropdownMenuShortcut>⌘O</GlassDropdownMenuShortcut>
        </GlassDropdownMenuItem>

        <GlassDropdownMenuSeparator />

        <GlassDropdownMenuItem>
          <span className="glass-mr-2">💾</span>
          Save
          <GlassDropdownMenuShortcut>⌘S</GlassDropdownMenuShortcut>
        </GlassDropdownMenuItem>

        <GlassDropdownMenuItem>
          <span className="glass-mr-2">🔄</span>
          Refresh
          <GlassDropdownMenuShortcut>⌘R</GlassDropdownMenuShortcut>
        </GlassDropdownMenuItem>
      </GlassDropdownMenuContent>
    </GlassDropdownMenu>
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <GlassDropdownMenu>
      <GlassDropdownMenuTrigger asChild>
        <GlassButton variant="outline">Actions</GlassButton>
      </GlassDropdownMenuTrigger>

      <GlassDropdownMenuContent className="w-56">
        <GlassDropdownMenuItem>
          <span className="glass-mr-2">✏️</span>
          Edit
        </GlassDropdownMenuItem>

        <GlassDropdownMenuItem>
          <span className="glass-mr-2">📋</span>
          Duplicate
        </GlassDropdownMenuItem>

        <GlassDropdownMenuSeparator />

        <GlassDropdownMenuItem variant="destructive">
          <span className="glass-mr-2">🗑️</span>
          Delete
        </GlassDropdownMenuItem>
      </GlassDropdownMenuContent>
    </GlassDropdownMenu>
}`,...t.parameters?.docs?.source}}};const X=["Default","WithIcons","DestructiveItems"];export{a as Default,t as DestructiveItems,o as WithIcons,X as __namedExportsOrder,U as default};
