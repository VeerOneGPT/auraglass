# AuraGlass Storybook

This Storybook showcases all 200+ components in the AuraGlass design system, providing interactive documentation and testing capabilities.

## Features

- **Complete Component Coverage**: Stories for all 219 components
- **Interactive Controls**: Test component variants, sizes, and states
- **Glassmorphism Theme**: Consistent glassmorphism styling throughout
- **Accessibility Testing**: Built-in a11y checks and guidelines
- **Design System Integration**: Connected to the full theme system
- **Responsive Testing**: Viewport controls for mobile/desktop testing

## Getting Started

### Local Development

```bash
# Start Storybook in development mode
pnpm run storybook

# Build for production
pnpm run build-storybook
```

Storybook will be available at `http://localhost:6006`

### Component Categories

- **Primitives**: Core glass components (GlassCore, OptimizedGlass)
- **Layout**: Containers, grids, flexbox components
- **Navigation**: Headers, sidebars, tabs, breadcrumbs
- **Forms**: Inputs, buttons, selects, form components
- **Data Display**: Cards, tables, charts, lists
- **Modals**: Dialogs, drawers, tooltips, popovers
- **Interactive**: Carousels, file uploads, search, etc.
- **Dashboard**: KPI cards, widgets, analytics components
- **Specialized**: Animations, backgrounds, surfaces

## Story Structure

Each component story includes:

- **Default**: Basic usage example
- **Variants**: Different visual styles
- **Sizes**: Available size options
- **States**: Loading, disabled, hover states
- **Interactive**: Clickable and dynamic examples
- **Showcase**: Premium examples with advanced features

## Custom Controls

The stories include comprehensive controls for:

- **Glass Properties**: Variant, intensity, blur, opacity
- **Layout**: Size, spacing, alignment
- **Interaction**: Hover, click, focus states
- **Accessibility**: ARIA labels, keyboard navigation
- **Theme**: Color schemes, dark/light mode

## Automated Generation

The story files were generated using the automated script in `scripts/generate-stories.js`. This script:

- Scans all component files
- Creates basic story templates
- Applies appropriate controls based on component type
- Generates consistent documentation

## Testing & QA

Use Storybook for:

- **Visual Regression Testing**: Compare component appearances
- **Interaction Testing**: Test user flows and states
- **Accessibility Auditing**: Check a11y compliance
- **Cross-browser Testing**: Verify consistent behavior
- **Performance Testing**: Monitor component rendering

## Deployment

Storybook is automatically deployed to GitHub Pages on:

- **Main Branch**: Production deployment at `https://storybook.aura-glass.auraone.com`
- **Pull Requests**: Preview deployments for review

## Contributing

When adding new components:

1. Create the component file
2. Run `node scripts/generate-stories.js` to generate a basic story
3. Enhance the story with component-specific examples
4. Test in Storybook before committing

## Theme Integration

All stories use the AuraGlass ThemeProvider to ensure:

- Consistent glassmorphism styling
- Proper theme variable application
- Responsive behavior
- Accessibility features
