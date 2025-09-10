### GlassChatInput

Advanced chat input component with attachments, formatting, voice messages, and emoji support.

```tsx
<GlassChatInput
  placeholder="Type your message..."
  enableAttachments={true}
  enableVoice={true}
  enableEmoji={true}
  enableFormatting={true}
  enableMentions={true}
  maxLength={1000}
  maxFileSize={10 * 1024 * 1024} // 10MB
  acceptedFileTypes="image/*,video/*,audio/*,.pdf,.doc,.docx"
  showCharCount={true}
  autoResize={true}
  onSendMessage={(content, attachments) => {
    console.log('Sending:', content, attachments);
  }}
  onTyping={(isTyping) => {
    console.log('Typing:', isTyping);
  }}
/>
```

**Props:**
- `placeholder?: string` - Input placeholder text
- `enableAttachments?: boolean` - Enable file attachments
- `enableVoice?: boolean` - Enable voice messages
- `enableEmoji?: boolean` - Enable emoji picker
- `enableFormatting?: boolean` - Enable rich text formatting
- `enableMentions?: boolean` - Enable user mentions
- `maxLength?: number` - Maximum character count
- `maxFileSize?: number` - Maximum file size in bytes
- `acceptedFileTypes?: string` - Accepted file types
- `showCharCount?: boolean` - Show character count
- `autoResize?: boolean` - Auto-resize textarea
- `disabled?: boolean` - Disabled state
- `loading?: boolean` - Loading state
- `onSendMessage?: (content: string, attachments?: ChatAttachment[]) => void` - Send message handler
- `onTyping?: (isTyping: boolean) => void` - Typing indicator handler
- `onAttachmentAdd?: (attachment: ChatAttachment) => void` - Attachment add handler
- `onAttachmentRemove?: (id: string) => void` - Attachment remove handler
- `className?: string` - Additional CSS classes

**ChatAttachment Interface:**
- `id: string` - Unique attachment identifier
- `file: File` - File object
- `type: 'image' | 'video' | 'audio' | 'file'` - Attachment type
- `preview?: string` - Preview URL for media files
- `size: number` - File size in bytes
