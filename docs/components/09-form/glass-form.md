### GlassForm

Complete form system with react-hook-form integration, validation states, and glassmorphism styling.

```tsx
import { useForm } from 'react-hook-form';

function MyForm() {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  });

  return (
    <GlassForm {...form}>
      <GlassFormField name="name">
        <GlassFormItem>
          <GlassFormLabel>Name</GlassFormLabel>
          <GlassFormControl>
            <GlassInput placeholder="Enter your name" />
          </GlassFormControl>
          <GlassFormMessage />
        </GlassFormItem>
      </GlassFormField>

      <GlassFormField name="email">
        <GlassFormItem>
          <GlassFormLabel>Email</GlassFormLabel>
          <GlassFormControl>
            <GlassInput type="email" placeholder="Enter your email" />
          </GlassFormControl>
          <GlassFormMessage />
        </GlassFormItem>
      </GlassFormField>

      <GlassButton type="submit">Submit</GlassButton>
    </GlassForm>
  );
}
```

**Props:**
- `children: ReactNode` - Form content
- All react-hook-form FormProvider props

**Components:**
- `GlassFormField` - Form field wrapper with validation
- `GlassFormItem` - Form item container with spacing
- `GlassFormLabel` - Form label with error states
- `GlassFormControl` - Form control wrapper
- `GlassFormDescription` - Form field description
- `GlassFormMessage` - Form validation message
