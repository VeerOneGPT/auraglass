### Cookie Components

#### CompactCookieNotice

Minimal cookie consent notice.

```tsx
<CompactCookieNotice
  onAccept={handleAccept}
  onDecline={handleDecline}
/>
```

#### CookieConsent

Full-featured cookie consent dialog.

```tsx
<CookieConsent
  categories={cookieCategories}
  onAccept={handleAccept}
  onDecline={handleDecline}
/>
```

#### GlobalCookieConsent

Global cookie consent management.

```tsx
<GlobalCookieConsent
  settings={consentSettings}
  onSettingsChange={handleSettingsChange}
/>
```
