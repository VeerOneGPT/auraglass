### GlassFormBuilder

Dynamic form builder with drag-and-drop field configuration, validation, and conditional logic.

```tsx
const formSchema = [
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Tell us about yourself',
    fields: [
      {
        id: 'name',
        type: 'text',
        label: 'Full Name',
        placeholder: 'Enter your full name',
        required: true,
        validation: {
          minLength: 2,
          maxLength: 50
        }
      },
      {
        id: 'email',
        type: 'email',
        label: 'Email Address',
        placeholder: 'Enter your email',
        required: true
      },
      {
        id: 'age',
        type: 'number',
        label: 'Age',
        placeholder: 'Enter your age',
        validation: {
          min: 18,
          max: 100
        }
      }
    ]
  },
  {
    id: 'preferences',
    title: 'Preferences',
    description: 'Customize your experience',
    collapsible: true,
    fields: [
      {
        id: 'theme',
        type: 'select',
        label: 'Theme',
        options: [
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark' },
          { value: 'auto', label: 'Auto' }
        ],
        defaultValue: 'auto'
      },
      {
        id: 'notifications',
        type: 'checkbox',
        label: 'Enable Notifications',
        defaultValue: true
      }
    ]
  }
];

<GlassFormBuilder
  schema={formSchema}
  values={formValues}
  onChange={(values) => {
    setFormValues(values);
    console.log('Form values:', values);
  }}
  onSubmit={(values) => {
    console.log('Form submitted:', values);
    // Handle form submission
  }}
  onValidate={(values) => {
    const errors: FormError = {};
    if (!values.email?.includes('@')) {
      errors.email = 'Please enter a valid email address';
    }
    return errors;
  }}
  variant="default"
  size="md"
/>
```

**Props:**
- `schema?: FormSection[]` - Form schema with sections and fields
- `values?: FormValue` - Current form values
- `errors?: FormError` - Form validation errors
- `onChange?: (values: FormValue) => void` - Values change handler
- `onSubmit?: (values: FormValue) => void` - Form submission handler
- `onValidate?: (values: FormValue) => FormError` - Custom validation function
- `variant?: 'default' | 'compact' | 'wizard' | 'inline'` - Form layout variant
- `size?: 'sm' | 'md' | 'lg'` - Form size
- `loading?: boolean` - Loading state
- `disabled?: boolean` - Disabled state
- `submitButtonText?: string` - Custom submit button text
- `cancelButtonText?: string` - Custom cancel button text
- `showProgress?: boolean` - Show form completion progress
- `autoSave?: boolean` - Enable auto-save functionality
- `className?: string` - Additional CSS classes

**FormField Interface:**
- `id: string` - Unique field identifier
- `type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'file'` - Field type
- `label: string` - Field label
- `placeholder?: string` - Field placeholder
- `description?: string` - Field description
- `required?: boolean` - Required field
- `disabled?: boolean` - Disabled field
- `options?: { value: string; label: string }[]` - Select/radio options
- `validation?: { min?, max?, minLength?, maxLength?, pattern?, custom? }` - Validation rules
- `defaultValue?: any` - Default field value
- `conditional?: { field: string; operator: string; value: any }` - Conditional logic
- `layout?: { width?: 'full' | 'half' | 'third' | 'quarter'; order?: number }` - Layout options

**FormSection Interface:**
- `id: string` - Unique section identifier
- `title: string` - Section title
- `description?: string` - Section description
- `fields: FormField[]` - Section fields
- `collapsible?: boolean` - Section can be collapsed
- `defaultExpanded?: boolean` - Section initially expanded
