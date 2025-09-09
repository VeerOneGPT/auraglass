'use client';

import { GlassButton } from '../button/GlassButton';

import { cn } from '@/lib/utilsComprehensive';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { createGlassStyle } from '../../core/mixins/glassMixins';
import { Glass } from '../../primitives';
import { Motion } from '../../primitives';
import { IconButton } from '../button/GlassButton';
import { GlassInput } from './GlassInput';

export interface DateRange {
  from: Date | null;
  to: Date | null;
}

export interface GlassDatePickerProps {
  /**
   * Selected date (controlled)
   */
  value?: Date | null;
  /**
   * Default selected date (uncontrolled)
   */
  defaultValue?: Date | null;
  /**
   * Date change handler
   */
  onChange?: (date: Date | null) => void;
  /**
   * Date range mode
   */
  mode?: 'single' | 'range';
  /**
   * Selected date range (for range mode)
   */
  rangeValue?: DateRange;
  /**
   * Default date range (for range mode)
   */
  defaultRangeValue?: DateRange;
  /**
   * Range change handler
   */
  onRangeChange?: (range: DateRange) => void;
  /**
   * Minimum selectable date
   */
  minDate?: Date;
  /**
   * Maximum selectable date
   */
  maxDate?: Date;
  /**
   * Disabled dates
   */
  disabledDates?: Date[] | ((date: Date) => boolean);
  /**
   * Date format string
   */
  format?: string;
  /**
   * Input placeholder
   */
  placeholder?: string;
  /**
   * Component size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Whether the component is disabled
   */
  disabled?: boolean;
  /**
   * Whether the component is required
   */
  required?: boolean;
  /**
   * Error state
   */
  error?: boolean;
  /**
   * Helper text
   */
  helperText?: string;
  /**
   * Error message
   */
  errorMessage?: string;
  /**
   * Show week numbers
   */
  showWeekNumbers?: boolean;
  /**
   * First day of week (0 = Sunday, 1 = Monday)
   */
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * Show today button
   */
  showTodayButton?: boolean;
  /**
   * Show clear button
   */
  showClearButton?: boolean;
  /**
   * Custom date renderer
   */
  renderDate?: (date: Date, isSelected: boolean, isDisabled: boolean) => React.ReactNode;
  /**
   * Locale for date formatting
   */
  locale?: string;
  className?: string;
}

/**
 * GlassDatePicker component
 * Calendar interface with glassmorphism styling and comprehensive date selection
 */
export const GlassDatePicker = forwardRef<HTMLDivElement, GlassDatePickerProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      mode = 'single',
      rangeValue,
      defaultRangeValue,
      onRangeChange,
      minDate,
      maxDate,
      disabledDates,
      format = 'MM/dd/yyyy',
      placeholder = 'Select date...',
      size = 'md',
      disabled = false,
      required = false,
      error = false,
      helperText,
      errorMessage,
      showWeekNumbers = false,
      firstDayOfWeek = 0,
      showTodayButton = true,
      showClearButton = true,
      renderDate,
      locale = 'en-US',
      className,
      ...props
    },
    ref
  ) => {
    // Internal state for uncontrolled mode
    const [internalValue, setInternalValue] = useState<Date | null>(defaultValue || null);
    const [internalRangeValue, setInternalRangeValue] = useState<DateRange>(
      defaultRangeValue || { from: null, to: null }
    );

    // Calendar state
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [inputValue, setInputValue] = useState('');

    // Refs
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Determine current values
    const currentDate = value !== undefined ? value : internalValue;
    const currentRange = rangeValue !== undefined ? rangeValue : internalRangeValue;

    // Format date
    const formatDate = (date: Date): string => {
      return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(date);
    };

    // Parse date from string
    const parseDate = (dateString: string): Date | null => {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? null : date;
    };

    // Update input value when date changes
    useEffect(() => {
      if (mode === 'single') {
        setInputValue(currentDate ? formatDate(currentDate) : '');
      } else {
        const { from, to } = currentRange;
        if (from && to) {
          setInputValue(`${formatDate(from)} - ${formatDate(to)}`);
        } else if (from) {
          setInputValue(formatDate(from));
        } else {
          setInputValue('');
        }
      }
    }, [currentDate, currentRange, mode, locale]);

    // Handle date selection
    const handleDateSelect = (date: Date) => {
      if (isDateDisabled(date)) return;

      if (mode === 'single') {
        const newValue = date;
        if (value === undefined) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
        setIsOpen(false);
      } else {
        const { from, to } = currentRange;

        if (!from || (from && to)) {
          // Start new range
          const newRange = { from: date, to: null };
          if (rangeValue === undefined) {
            setInternalRangeValue(newRange);
          }
          onRangeChange?.(newRange);
        } else {
          // Complete range
          const newRange = date < from
            ? { from: date, to: from }
            : { from, to: date };
          if (rangeValue === undefined) {
            setInternalRangeValue(newRange);
          }
          onRangeChange?.(newRange);
          setIsOpen(false);
        }
      }
    };

    // Check if date is disabled
    const isDateDisabled = (date: Date): boolean => {
      if (minDate && date < minDate) return true;
      if (maxDate && date > maxDate) return true;

      if (Array.isArray(disabledDates)) {
        return disabledDates.some(disabledDate =>
          date.toDateString() === disabledDate.toDateString()
        );
      }

      if (typeof disabledDates === 'function') {
        return disabledDates(date);
      }

      return false;
    };

    // Check if date is selected
    const isDateSelected = (date: Date): boolean => {
      if (mode === 'single') {
        return currentDate ? date.toDateString() === currentDate.toDateString() : false;
      } else {
        const { from, to } = currentRange;
        if (from && to) {
          return date >= from && date <= to;
        }
        return from ? date.toDateString() === from.toDateString() : false;
      }
    };

    // Check if date is in range (for range mode)
    const isDateInRange = (date: Date): boolean => {
      if (mode !== 'range') return false;
      const { from, to } = currentRange;
      return from && to ? date > from && date < to : false;
    };

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);

      if (mode === 'single') {
        const parsedDate = parseDate(newValue);
        if (parsedDate && !isDateDisabled(parsedDate)) {
          if (value === undefined) {
            setInternalValue(parsedDate);
          }
          onChange?.(parsedDate);
          setCurrentMonth(parsedDate);
        }
      }
    };

    // Handle clear
    const handleClear = () => {
      if (mode === 'single') {
        if (value === undefined) {
          setInternalValue(null);
        }
        onChange?.(null);
      } else {
        const newRange = { from: null, to: null };
        if (rangeValue === undefined) {
          setInternalRangeValue(newRange);
        }
        onRangeChange?.(newRange);
      }
      setInputValue('');
    };

    // Handle today button
    const handleToday = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (!isDateDisabled(today)) {
        handleDateSelect(today);
        setCurrentMonth(today);
      }
    };

    // Generate calendar days
    const generateCalendarDays = () => {
      const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
      const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
      const startOfWeek = new Date(startOfMonth);
      startOfWeek.setDate(startOfMonth.getDate() - ((startOfMonth.getDay() - firstDayOfWeek + 7) % 7));

      const days: Date[] = [];
      const current = new Date(startOfWeek);

      // Generate 6 weeks (42 days) to ensure consistent calendar size
      for (let i = 0; i < 42; i++) {
        days.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }

      return days;
    };

    // Get month names
    const getMonthNames = () => {
      return Array.from({ length: 12 }, (_, i) =>
        new Intl.DateTimeFormat(locale, { month: 'long' }).format(new Date(2000, i, 1))
      );
    };

    // Get day names
    const getDayNames = () => {
      const baseDate = new Date(2000, 0, 2); // A Sunday
      return Array.from({ length: 7 }, (_, i) => {
        const date = new Date(baseDate);
        date.setDate(baseDate.getDate() + ((i + firstDayOfWeek) % 7));
        return new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date);
      });
    };

    // Navigate months
    const navigateMonth = (direction: 'prev' | 'next') => {
      setCurrentMonth(prev => {
        const newMonth = new Date(prev);
        newMonth.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
        return newMonth;
      });
    };

    // Close on outside click
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [isOpen]);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.focus();
      } else if (e.key === 'Enter') {
        setIsOpen(true);
      }
    };

    const calendarDays = generateCalendarDays();
    const monthNames = getMonthNames();
    const dayNames = getDayNames();

    return (
      <div ref={containerRef} className={cn('glass-datepicker relative', className)} {...props}>
        <div ref={ref}>
          <GlassInput
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            size={size}
            disabled={disabled}
            required={required}
            state={error ? 'error' : 'default'}
            helperText={error && errorMessage ? errorMessage : helperText}
            rightIcon={
              <GlassButton
                type="button"
                className="p-1 rounded hover:bg-muted/20 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                disabled={disabled}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </GlassButton>
            }
            clearable={showClearButton && (mode === 'single' ? !!currentDate : !!(currentRange.from || currentRange.to))}
            onClear={handleClear}
          />
        </div>

        {/* Calendar Popup */}
        {isOpen && (
          <Motion preset="slideDown" duration={200} className="absolute top-full left-0 z-50 mt-2">
            <Glass
              variant="frosted"
              rounded="lg"
              className="w-80 border border-border/20 p-4"
            >
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <IconButton
                  icon="‹"
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateMonth('prev')}
                  aria-label="Previous month"
                />

                <div className="flex items-center gap-2">
                  <select
                    value={currentMonth.getMonth()}
                    onChange={(e) => setCurrentMonth(new Date(currentMonth.getFullYear(), parseInt(e.target.value), 1))}
                    className="bg-transparent border border-border/20 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-primary/20"
                  >
                    {monthNames.map((month, index) => (
                      <option key={month} value={index}>
                        {month}
                      </option>
                    ))}
                  </select>

                  <select
                    value={currentMonth.getFullYear()}
                    onChange={(e) => setCurrentMonth(new Date(parseInt(e.target.value), currentMonth.getMonth(), 1))}
                    className="bg-transparent border border-border/20 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-primary/20"
                  >
                    {Array.from({ length: 201 }, (_, i) => 1900 + i).map(year => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                <IconButton
                  icon="›"
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateMonth('next')}
                  aria-label="Next month"
                />
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {showWeekNumbers && <div className="text-xs text-muted-foreground p-2 text-center">Wk</div>}
                {dayNames.map(day => (
                  <div key={day} className="text-xs text-muted-foreground p-2 text-center font-medium">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 6 }, (_, weekIndex) => (
                  <React.Fragment key={weekIndex}>
                    {showWeekNumbers && (
                      <div className="text-xs text-muted-foreground p-2 text-center">
                        {/* Week number calculation would go here */}
                        {weekIndex + 1}
                      </div>
                    )}
                    {calendarDays.slice(weekIndex * 7, (weekIndex + 1) * 7).map(date => {
                      const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
                      const isSelected = isDateSelected(date);
                      const isDisabled = isDateDisabled(date);
                      const isInRange = isDateInRange(date);
                      const isToday = date.toDateString() === new Date().toDateString();

                      return (
                        <GlassButton
                          key={date.toISOString()}
                          type="button"
                          className={cn(
                            'p-2 text-sm rounded transition-colors relative',
                            'hover:bg-muted/20 focus:bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary/20',
                            {
                              'text-muted-foreground': !isCurrentMonth,
                              'bg-primary text-primary-foreground': isSelected,
                              'bg-primary/20': isInRange,
                              'opacity-50 cursor-not-allowed': isDisabled,
                              'font-bold': isToday,
                            }
                          )}
                          onClick={() => handleDateSelect(date)}
                          disabled={isDisabled}
                          aria-label={formatDate(date)}
                        >
                          {renderDate ? renderDate(date, isSelected, isDisabled) : date.getDate()}
                          {isToday && !isSelected && (
                            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                          )}
                        </GlassButton>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>

              {/* Footer Actions */}
              {(showTodayButton || showClearButton) && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/20">
                  {showTodayButton && (
                    <GlassButton
                      variant="ghost"
                      size="sm"
                      onClick={handleToday}
                    >
                      Today
                    </GlassButton>
                  )}

                  {showClearButton && (
                    <GlassButton
                      variant="ghost"
                      size="sm"
                      onClick={handleClear}
                    >
                      Clear
                    </GlassButton>
                  )}
                </div>
              )}
            </Glass>
          </Motion>
        )}
      </div>
    );
  }
);

GlassDatePicker.displayName = 'GlassDatePicker';

// DateRange interface is already exported above
