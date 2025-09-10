### GlassFormTemplate

Pre-configured form layout template.

```tsx
<GlassFormTemplate
  title="Contact Form"
  onSubmit={handleSubmit}
>
  <GlassInput label="Name" placeholder="Your name" />
  <GlassInput label="Email" type="email" />
  <GlassTextarea label="Message" />
  <GlassButton type="submit">Send</GlassButton>
</GlassFormTemplate>
```

**Props:**
- `title?: string` - Form title
- `onSubmit?: (data: any) => void` - Submit handler
