# AuraGlass final human review — lane B

- Run ID: `runtime-audit-full-20260813055808-cc8820be-2dfa-420c-9fd1-021b0af29598`
- Source fingerprint: `sha256:2df81c5e3b293a1c443acd94ccda78723503e24d6ea91bbf0618f67d37e12002`
- Scope: overall ordinals 126–249 (124 exports; 372 screenshots)
- Viewports: desktop 1440×900, tablet 768×1024, mobile 390×844
- Evidence root: `reports/audit/visual-all`
- Contact inventory: `reports/audit/visual-contact-sheets/inventory.json`
- Provenance: exact 498-target / 1,494-PNG coverage; same-run sidecars 1,494/1,494; original SHA-256 recheck passed; verifier authoritative and same-run.
- Human result: **FAIL** — 78 targets pass all viewports; 46 targets have at least one human-visible defect. Viewport verdicts: 237 PASS / 135 FAIL.

PASS means the captured state has no visible chromatic contamination, overlap, clipping, truncation, or incomplete composition. It does not certify an unrendered constituent hidden behind a closed trigger.

| Ordinal | ID | Desktop | Tablet | Mobile | Human finding |
|---:|---|:---:|:---:|:---:|---|
| 126 | `glass-dialog` | PASS | PASS | PASS | Clean captured dialog state. |
| 127 | `glass-diff-viewer` | PASS | PASS | PASS | Clean and responsive. |
| 128 | `glass-divider` | PASS | PASS | PASS | Clean and readable. |
| 129 | `glass-drag-drop-provider` | PASS | PASS | PASS | Clean captured state. |
| 130 | `glass-draggable` | PASS | PASS | PASS | Clean captured state. |
| 131 | `glass-drawer` | PASS | PASS | PASS | Clean and responsive. |
| 132 | `glass-dropdown-menu` | FAIL | FAIL | FAIL | Closed-state evidence shows only “Open Menu”; menu quality is unproven. |
| 133 | `glass-dropdown-menu-checkbox-item` | FAIL | FAIL | FAIL | Exported constituent is not visible; only closed trigger is captured. |
| 134 | `glass-dropdown-menu-content` | FAIL | FAIL | FAIL | Exported constituent is not visible; only closed trigger is captured. |
| 135 | `glass-dropdown-menu-item` | FAIL | FAIL | FAIL | Exported constituent is not visible; only closed trigger is captured. |
| 136 | `glass-dropdown-menu-label` | FAIL | FAIL | FAIL | Exported constituent is not visible; only closed trigger is captured. |
| 137 | `glass-dropdown-menu-radio-group` | FAIL | FAIL | FAIL | Exported constituent is not visible; only closed trigger is captured. |
| 138 | `glass-dropdown-menu-radio-item` | FAIL | FAIL | FAIL | Exported constituent is not visible; only closed trigger is captured. |
| 139 | `glass-dropdown-menu-separator` | FAIL | FAIL | FAIL | Exported constituent is not visible; only closed trigger is captured. |
| 140 | `glass-dropdown-menu-shortcut` | FAIL | FAIL | FAIL | Exported constituent is not visible; only closed trigger is captured. |
| 141 | `glass-dropdown-menu-sub` | FAIL | FAIL | FAIL | Exported constituent is not visible; only closed trigger is captured. |
| 142 | `glass-dropdown-menu-sub-content` | FAIL | FAIL | FAIL | Exported constituent is not visible; only closed trigger is captured. |
| 143 | `glass-dropdown-menu-sub-trigger` | FAIL | FAIL | FAIL | Exported constituent is not visible; only closed trigger is captured. |
| 144 | `glass-dropdown-menu-trigger` | FAIL | FAIL | FAIL | Closed trigger is visible, but family evidence is insufficient for constituent certification. |
| 145 | `glass-ecommerce-provider` | PASS | PASS | PASS | Clean captured state. |
| 146 | `glass-empty-state` | PASS | PASS | PASS | Clean captured state. |
| 147 | `glass-engine` | PASS | PASS | PASS | Clean captured state. |
| 148 | `glass-engine-demo` | FAIL | FAIL | FAIL | System-blue sliders and checkbox dominate controls; not neutral liquid glass. |
| 149 | `glass-engine-provider` | PASS | PASS | PASS | Clean captured state. |
| 150 | `glass-error-state` | PASS | PASS | PASS | Clean captured state. |
| 151 | `glass-eye-tracking` | PASS | PASS | PASS | Clean captured state. |
| 152 | `glass-eye-tracking-calibration` | PASS | PASS | PASS | Clean captured state. |
| 153 | `glass-eye-tracking-provider` | PASS | PASS | PASS | Clean captured state. |
| 154 | `glass-fab` | PASS | PASS | PASS | Clean captured state. |
| 155 | `glass-facet-search` | PASS | PASS | PASS | Clean and responsive. |
| 156 | `glass-field-group` | PASS | PASS | PASS | Clean and responsive. |
| 157 | `glass-file-explorer` | PASS | PASS | PASS | Clean and responsive. |
| 158 | `glass-file-tree` | PASS | PASS | PASS | Clean and responsive. |
| 159 | `glass-file-upload` | PASS | PASS | PASS | Clean captured state. |
| 160 | `glass-filter-bar` | PASS | PASS | PASS | Clean and responsive. |
| 161 | `glass-filter-panel` | PASS | PASS | PASS | Clean and responsive. |
| 162 | `glass-flex` | PASS | PASS | PASS | Clean and responsive. |
| 163 | `glass-fluid-simulation` | PASS | PASS | PASS | Clean captured state. |
| 164 | `glass-focus-indicators` | PASS | PASS | PASS | Readable neutral controls; no collision. |
| 165 | `glass-focus-ring` | PASS | PASS | PASS | Clean captured state. |
| 166 | `glass-foldable-support` | FAIL | FAIL | FAIL | Blue/cyan-tinted canvas and material framing. |
| 167 | `glass-form` | PASS | PASS | PASS | Clean and responsive. |
| 168 | `glass-form-builder` | PASS | PASS | PASS | Clean and responsive. |
| 169 | `glass-form-field` | PASS | PASS | PASS | Clean and responsive. |
| 170 | `glass-form-stepper` | PASS | PASS | PASS | Clean and responsive. |
| 171 | `glass-form-table` | PASS | PASS | PASS | Clean and responsive. |
| 172 | `glass-form-template` | PASS | PASS | PASS | Clean captured state. |
| 173 | `glass-form-wizard-steps` | PASS | PASS | PASS | Clean captured state. |
| 174 | `glass-fractal-layout` | FAIL | FAIL | FAIL | Tiny illegible diagram in huge empty panel; incomplete/poorly composed. |
| 175 | `glass-gallery` | PASS | PASS | PASS | Content color is legitimate media; glass framing is clean. |
| 176 | `glass-gangenerator` | PASS | PASS | PASS | Clean and responsive. |
| 177 | `glass-gantt-chart` | PASS | PASS | PASS | Clean and responsive. |
| 178 | `glass-gaze-responsive` | PASS | PASS | PASS | Clean captured state. |
| 179 | `glass-gaze-visualization` | PASS | PASS | PASS | Clean captured state. |
| 180 | `glass-generative-art` | PASS | PASS | PASS | Clean and responsive. |
| 181 | `glass-golden-ratio-grid` | PASS | FAIL | FAIL | Tablet/mobile horizontally clip grid; mobile loses most content and labels. |
| 182 | `glass-gradient-picker` | FAIL | FAIL | FAIL | System-blue sliders/controls remain; native/cheap visual treatment. |
| 183 | `glass-grid` | PASS | PASS | PASS | Clean and responsive. |
| 184 | `glass-header` | PASS | PASS | PASS | Clean and responsive. |
| 185 | `glass-heatmap` | PASS | PASS | PASS | Clean captured state. |
| 186 | `glass-high-contrast` | FAIL | FAIL | FAIL | Blue/cyan presentation canvas surrounds the demo. |
| 187 | `glass-hologram` | PASS | PASS | PASS | Clean captured state. |
| 188 | `glass-hover-card` | PASS | PASS | PASS | Clean captured state. |
| 189 | `glass-image-processing-provider` | PASS | PASS | PASS | Clean captured state. |
| 190 | `glass-image-viewer` | PASS | PASS | PASS | Content color is legitimate media; framing is clean. |
| 191 | `glass-infinite-scroll` | PASS | PASS | PASS | Clean and responsive. |
| 192 | `glass-inline-edit` | PASS | PASS | PASS | Clean captured state. |
| 193 | `glass-input` | PASS | PASS | PASS | Clean and responsive. |
| 194 | `glass-intelligent-form-builder` | FAIL | FAIL | FAIL | Blue/cyan story canvas contaminates presentation. |
| 195 | `glass-intelligent-image-uploader` | FAIL | FAIL | FAIL | Blue/cyan canvas and accents contaminate presentation. |
| 196 | `glass-intelligent-search` | FAIL | FAIL | FAIL | Blue/cyan canvas and native-looking filters remain. |
| 197 | `glass-island-layout` | PASS | PASS | PASS | Clean and responsive. |
| 198 | `glass-jsonviewer` | PASS | PASS | PASS | Clean and responsive. |
| 199 | `glass-kanban` | PASS | PASS | FAIL | Mobile clips Development column off-screen. |
| 200 | `glass-kanban-board` | PASS | PASS | PASS | Clean and responsive. |
| 201 | `glass-key-value-editor` | PASS | PASS | PASS | Clean and responsive. |
| 202 | `glass-keyboard-nav` | FAIL | FAIL | FAIL | Strong blue/cyan canvas/material framing. |
| 203 | `glass-kpicard` | PASS | PASS | PASS | Clean captured state. |
| 204 | `glass-label` | PASS | PASS | PASS | Clean captured state. |
| 205 | `glass-lazy-image` | PASS | PASS | PASS | Content color is legitimate media; framing is clean. |
| 206 | `glass-line-chart` | PASS | PASS | PASS | Chart color is semantic data ink; framing is clean. |
| 207 | `glass-link-button` | PASS | PASS | PASS | Clean captured state. |
| 208 | `glass-liquid-transition` | FAIL | FAIL | FAIL | Blue/cyan canvas/material contamination. |
| 209 | `glass-list-view` | PASS | PASS | PASS | Clean and responsive. |
| 210 | `glass-live-cursor-presence` | FAIL | FAIL | FAIL | Blue/cyan canvas/material contamination. |
| 211 | `glass-live-filter` | FAIL | FAIL | FAIL | System-blue slider controls remain. |
| 212 | `glass-loading-skeleton` | PASS | PASS | PASS | Clean captured state. |
| 213 | `glass-loading-state` | PASS | PASS | PASS | Clean captured state. |
| 214 | `glass-magnetic-cursor` | PASS | PASS | PASS | Clean captured state. |
| 215 | `glass-masonry` | PASS | PASS | PASS | Clean and responsive. |
| 216 | `glass-masonry-grid` | PASS | PASS | PASS | Clean and responsive. |
| 217 | `glass-media-controls` | FAIL | FAIL | FAIL | System-blue media slider/control accents remain. |
| 218 | `glass-media-provider` | FAIL | FAIL | FAIL | Cyan glow/tint contaminates provider material. |
| 219 | `glass-mention-list` | PASS | PASS | PASS | Clean captured state. |
| 220 | `glass-menu-primitive` | FAIL | FAIL | FAIL | Native-looking thick black outlined rows; not Apple liquid glass. |
| 221 | `glass-menu-primitive-content` | FAIL | FAIL | FAIL | Native-looking thick black outlined full-width row. |
| 222 | `glass-menu-primitive-item` | FAIL | FAIL | FAIL | Native-looking thick black outlined full-width row. |
| 223 | `glass-menu-primitive-root` | FAIL | FAIL | FAIL | Native-looking thick black outlined full-width row. |
| 224 | `glass-menubar` | PASS | PASS | PASS | Clean and responsive. |
| 225 | `glass-mesh-gradient` | FAIL | FAIL | FAIL | Yellow/gold spiral and dashed overlays create unapproved chromatic presentation. |
| 226 | `glass-message-list` | PASS | PASS | PASS | Clean and responsive. |
| 227 | `glass-meta-dashboard` | FAIL | FAIL | FAIL | Almost blank/incomplete; only stray loading circles visible. |
| 228 | `glass-meta-engine-provider` | FAIL | FAIL | FAIL | Almost blank/incomplete; only stray loading circles visible. |
| 229 | `glass-metric-card` | PASS | PASS | PASS | Clean captured state. |
| 230 | `glass-metric-chip` | PASS | PASS | PASS | Clean captured state. |
| 231 | `glass-metrics-grid` | PASS | PASS | PASS | Clean and responsive. |
| 232 | `glass-mind-map` | PASS | PASS | PASS | Clean and responsive. |
| 233 | `glass-mobile-nav` | FAIL | FAIL | FAIL | System-blue selected navigation icon/indicator remains. |
| 234 | `glass-modal` | PASS | PASS | PASS | Clean and responsive. |
| 235 | `glass-mood-ring` | PASS | PASS | PASS | Clean captured state. |
| 236 | `glass-morphing-engine` | FAIL | FAIL | FAIL | Pink/cyan chromatic material and canvas contamination. |
| 237 | `glass-motion-controller` | PASS | PASS | PASS | Clean captured state. |
| 238 | `glass-motion-controls` | FAIL | FAIL | FAIL | Blue/cyan presentation canvas remains. |
| 239 | `glass-multi-select` | PASS | PASS | PASS | Clean captured state. |
| 240 | `glass-multi-step-form` | PASS | PASS | PASS | Clean and responsive. |
| 241 | `glass-music-visualizer` | FAIL | FAIL | FAIL | System-blue media controls and slider remain. |
| 242 | `glass-navbar` | FAIL | FAIL | FAIL | System-blue selected navigation icon/indicator remains. |
| 243 | `glass-navigation` | FAIL | FAIL | FAIL | System-blue selected navigation icon/indicator remains. |
| 244 | `glass-navigation-menu` | PASS | PASS | PASS | Clean and responsive. |
| 245 | `glass-nebula-clouds` | FAIL | FAIL | FAIL | System-blue checkboxes/sliders remain around legitimate media. |
| 246 | `glass-neuro-feedback` | FAIL | FAIL | FAIL | Essentially empty: only “Attention | 0%”; no substantive glass UI. |
| 247 | `glass-neuro-metrics-dashboard` | FAIL | FAIL | FAIL | Almost blank/incomplete with stray circles/brain control. |
| 248 | `glass-neuro-sync-provider` | FAIL | FAIL | FAIL | Almost blank/incomplete with stray circles/brain control. |
| 249 | `glass-notification-center` | PASS | PASS | PASS | Clean and responsive. |
