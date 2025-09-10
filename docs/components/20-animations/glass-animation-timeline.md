### GlassAnimationTimeline

Complex animation timeline for coordinated multi-element animations.

```tsx
<GlassAnimationTimeline
  timeline={[
    {
      selector: '.hero-title',
      animation: { type: 'slideIn', direction: 'left', duration: 600 },
      startTime: 0
    },
    {
      selector: '.hero-subtitle',
      animation: { type: 'fadeIn', duration: 400 },
      startTime: 300
    }
  ]}
>
  <div className="hero-title">Title</div>
  <div className="hero-subtitle">Subtitle</div>
</GlassAnimationTimeline>
```

**Props:**
- `timeline: TimelineItem[]` - Animation timeline configuration
- `className?: string` - Additional CSS classes
