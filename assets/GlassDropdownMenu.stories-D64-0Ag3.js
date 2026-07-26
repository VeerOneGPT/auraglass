import{j as s,r as i}from"./iframe-W10Ontp8.js";import{G as c}from"./GlassButton-CVmxdPoA.js";import{G as l,a as p,b as u,c as n,d as r,e,f as m,g as h,h as g,i as d}from"./GlassDropdownMenu-CxhnmkZp.js";import"./preload-helper-PPVm8Dsz.js";import"./LiquidGlassMaterial-DB5Hu6PO.js";import"./LiquidGlassLayerProvider-B0fLxmKC.js";import"./a11y-BmzSDA3q.js";import"./GlassPredictiveEngine-B8jT0jcf.js";import"./GlassAchievementSystem-DqjXQLzn.js";import"./OptimizedGlassCore-CadU-ErO.js";import"./deviceCapabilities-BVriTAFX.js";import"./GlassBiometricAdaptation-BlxBxm87.js";import"./MotionPreferenceContext-Db2LoQ9i.js";import"./GlassEyeTracking-BFin3s1L.js";import"./GlassSpatialAudio-4CToH89u.js";import"./MotionFramer-C_AUzSnN.js";import"./utilsCore-Clq-gVdo.js";import"./components-wxrVEbsA.js";import"./Positioner-C4z8oDt_.js";import"./index-CCeIAcJI.js";import"./index-Cim-uDoj.js";import"./index-CWG1rEj-.js";import"./DismissableLayer-Dv71nhMN.js";import"./FocusScope-COqwpC46.js";const H={title:"Navigation/Glass Dropdown Menu",component:l,parameters:{layout:"centered",docs:{description:{component:"A glass morphism dropdown menu system with various menu item types."}}}},S=()=>{const[w,x]=i.useState(!0),[D,j]=i.useState(!1),[G,M]=i.useState("system");return s.jsxs(l,{children:[s.jsx(p,{asChild:!0,children:s.jsx(c,{variant:"outline",children:"Open Menu"})}),s.jsxs(u,{className:"w-56",children:[s.jsx(m,{children:"My Account"}),s.jsx(r,{}),s.jsxs(n,{children:["Profile",s.jsx(e,{children:"⇧⌘P"})]}),s.jsxs(n,{children:["Billing",s.jsx(e,{children:"⌘B"})]}),s.jsxs(n,{children:["Settings",s.jsx(e,{children:"⌘S"})]}),s.jsxs(n,{children:["Keyboard shortcuts",s.jsx(e,{children:"⌘K"})]}),s.jsx(r,{}),s.jsx(h,{checked:w,onCheckedChange:x,children:"Status Bar"}),s.jsx(h,{checked:D,onCheckedChange:j,children:"Activity Bar"}),s.jsx(r,{}),s.jsx(m,{children:"Theme"}),s.jsxs(g,{value:G,onValueChange:M,children:[s.jsx(d,{value:"light",children:"Light"}),s.jsx(d,{value:"dark",children:"Dark"}),s.jsx(d,{value:"system",children:"System"})]}),s.jsx(r,{}),s.jsxs(n,{children:["Log out",s.jsx(e,{children:"⇧⌘Q"})]})]})]})},a={render:()=>s.jsx(S,{})},o={render:()=>s.jsxs(l,{children:[s.jsx(p,{asChild:!0,children:s.jsx(c,{variant:"outline",children:"Menu with Icons"})}),s.jsxs(u,{className:"w-56",children:[s.jsxs(n,{children:[s.jsx("span",{className:"glass-mr-2",children:"📝"}),"New File",s.jsx(e,{children:"⌘N"})]}),s.jsxs(n,{children:[s.jsx("span",{className:"glass-mr-2",children:"📁"}),"Open Folder",s.jsx(e,{children:"⌘O"})]}),s.jsx(r,{}),s.jsxs(n,{children:[s.jsx("span",{className:"glass-mr-2",children:"💾"}),"Save",s.jsx(e,{children:"⌘S"})]}),s.jsxs(n,{children:[s.jsx("span",{className:"glass-mr-2",children:"🔄"}),"Refresh",s.jsx(e,{children:"⌘R"})]})]})]})},t={render:()=>s.jsxs(l,{children:[s.jsx(p,{asChild:!0,children:s.jsx(c,{variant:"outline",children:"Actions"})}),s.jsxs(u,{className:"w-56",children:[s.jsxs(n,{children:[s.jsx("span",{className:"glass-mr-2",children:"✏️"}),"Edit"]}),s.jsxs(n,{children:[s.jsx("span",{className:"glass-mr-2",children:"📋"}),"Duplicate"]}),s.jsx(r,{}),s.jsxs(n,{variant:"destructive",children:[s.jsx("span",{className:"glass-mr-2",children:"🗑️"}),"Delete"]})]})]})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};const J=["Default","WithIcons","DestructiveItems"];export{a as Default,t as DestructiveItems,o as WithIcons,J as __namedExportsOrder,H as default};
