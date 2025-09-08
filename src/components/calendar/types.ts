import React from 'react';

export interface GlassCalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: Date;
  onChange?: (date: Date) => void;
  variant?: 'default' | 'minimal' | 'fullscreen';
  size?: 'sm' | 'md' | 'lg';
  glassVariant?: 'frosted' | 'dynamic' | 'clear' | 'tinted' | 'luminous';
  blurStrength?: 'none' | 'light' | 'standard' | 'heavy';
  showNavigation?: boolean;
  showToday?: boolean;
  disabledDates?: Date[];
  minDate?: Date;
  maxDate?: Date;
  locale?: string;
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}
