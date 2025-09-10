### GlassWipeSlider

Wipe transition slider component.

```tsx
<GlassWipeSlider
  slides={[
    { content: <Slide1 />, background: 'bg1.jpg' },
    { content: <Slide2 />, background: 'bg2.jpg' }
  ]}
  autoplay={true}
  duration={3000}
/>
```

**Props:**
- `slides?: SlideData[]` - Slider slides
- `autoplay?: boolean` - Enable autoplay
- `duration?: number` - Slide duration in ms
