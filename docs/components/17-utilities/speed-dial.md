### SpeedDial

Expandable floating action button with multiple actions.

```tsx
<SpeedDial>
  <SpeedDialAction icon={<EditIcon />} tooltip="Edit" />
  <SpeedDialAction icon={<DeleteIcon />} tooltip="Delete" />
  <SpeedDialAction icon={<ShareIcon />} tooltip="Share" />
</SpeedDial>
```

**Props:**
- `children?: ReactNode` - Speed dial actions
- `direction?: 'up' | 'down' | 'left' | 'right'` - Expansion direction
