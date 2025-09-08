'use client';

import { cn } from '@/lib/utilsComprehensive';
import {
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    Clock,
    MapPin,
    Users
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { Motion } from '../../primitives';
import { GlassButton } from '../button';
import { CardContent, CardHeader, CardTitle, GlassCard } from '../card';

export interface CalendarEvent {
    id: string;
    title: string;
    date: Date;
    startTime?: string;
    endTime?: string;
    description?: string;
    location?: string;
    attendees?: string[];
    type?: 'meeting' | 'event' | 'reminder' | 'task';
    color?: string;
}

export interface GlassCalendarProps {
    /**
     * Currently selected date
     */
    selectedDate?: Date;
    /**
     * Callback when date is selected
     */
    onDateSelect?: (date: Date) => void;
    /**
     * Events to display on the calendar
     */
    events?: CalendarEvent[];
    /**
     * Calendar view mode
     */
    view?: 'month' | 'week' | 'day';
    /**
     * Show events in calendar cells
     */
    showEvents?: boolean;
    /**
     * Highlight today's date
     */
    showToday?: boolean;
    /**
     * Show weekend days
     */
    showWeekends?: boolean;
    /**
     * Custom date formatting
     */
    dateFormat?: 'short' | 'long' | 'numeric';
    /**
     * Locale for date formatting
     */
    locale?: string;
    /**
     * Minimum selectable date
     */
    minDate?: Date;
    /**
     * Maximum selectable date
     */
    maxDate?: Date;
    /**
     * Custom className
     */
    className?: string;
    /**
     * Loading state
     */
    loading?: boolean;
}

/**
 * GlassCalendar component
 * A full-featured calendar with glassmorphism styling and event support
 */
export const GlassCalendar: React.FC<GlassCalendarProps> = ({
    selectedDate,
    onDateSelect,
    events = [],
    view = 'month',
    showEvents = true,
    showToday = true,
    showWeekends = true,
    dateFormat = 'short',
    locale = 'en-US',
    minDate,
    maxDate,
    className,
    loading = false,
    ...props
}) => {
    const [currentDate, setCurrentDate] = useState(selectedDate || new Date());
    const [selectedDateState, setSelectedDateState] = useState<Date | null>(selectedDate || null);

    // Get events for a specific date - OPTIMIZED with memoization
    const eventsByDate = useMemo(() => {
        const eventMap = new Map<string, CalendarEvent[]>();
        
        if (!events || !Array.isArray(events)) return eventMap;
        
        events.forEach(event => {
            const eventDate = new Date(event.date);
            const dateKey = eventDate.toDateString();
            
            if (!eventMap.has(dateKey)) {
                eventMap.set(dateKey, []);
            }
            eventMap.get(dateKey)!.push(event);
        });
        
        return eventMap;
    }, [events]);
    
    const getEventsForDate = (date: Date) => {
        return eventsByDate.get(date.toDateString()) || [];
    };

    // Get month data
    const monthData = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        const weeks: Date[][] = [];
        let currentWeek: Date[] = [];
        const currentDateIter = new Date(startDate);

        while (currentDateIter <= lastDay || currentWeek.length < 7) {
            currentWeek.push(new Date(currentDateIter));

            if (currentWeek.length === 7) {
                weeks.push([...currentWeek]);
                currentWeek = [];
            }

            currentDateIter.setDate(currentDateIter.getDate() + 1);
        }

        if (currentWeek.length > 0) {
            weeks.push(currentWeek);
        }

        return {
            year,
            month,
            monthName: new Intl.DateTimeFormat(locale, { month: 'long' }).format(currentDate),
            weeks
        };
    }, [currentDate, locale]);

    // Navigate to previous/next month
    const navigateMonth = (direction: 'prev' | 'next') => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            if (direction === 'prev') {
                newDate.setMonth(newDate.getMonth() - 1);
            } else {
                newDate.setMonth(newDate.getMonth() + 1);
            }
            return newDate;
        });
    };

    // Check if date is today
    const isToday = (date: Date) => {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    };

    // Check if date is selected
    const isSelected = (date: Date) => {
        return selectedDateState && date.toDateString() === selectedDateState.toDateString();
    };

    // Check if date is in current month
    const isCurrentMonth = (date: Date) => {
        return date.getMonth() === currentDate.getMonth();
    };

    // Check if date is disabled
    const isDisabled = (date: Date) => {
        if (minDate && date < minDate) return true;
        if (maxDate && date > maxDate) return true;
        return false;
    };

    // Handle date click
    const handleDateClick = (date: Date) => {
        if (isDisabled(date)) return;

        setSelectedDateState(date);
        onDateSelect?.(date);
    };

    // Get event type color
    const getEventColor = (event: CalendarEvent) => {
        if (event.color) return event.color;

        switch (event.type) {
            case 'meeting': return 'bg-blue-500/80';
            case 'event': return 'bg-green-500/80';
            case 'reminder': return 'bg-yellow-500/80';
            case 'task': return 'bg-purple-500/80';
            default: return 'bg-gray-500/80';
        }
    };

    // Loading skeleton
    if (loading) {
        return (
            <GlassCard className={cn('p-6', className)}>
                <div className="animate-pulse space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="h-8 bg-white/20 rounded w-32"></div>
                        <div className="flex gap-2">
                            <div className="w-8 h-8 bg-white/20 rounded"></div>
                            <div className="w-8 h-8 bg-white/20 rounded"></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                        {Array.from({ length: 35 }).map((_, i) => (
                            <div key={i} className="aspect-square bg-white/10 rounded-lg"></div>
                        ))}
                    </div>
                </div>
            </GlassCard>
        );
    }

    return (
        <div className="w-full">
            <GlassCard className={cn('glass-base backdrop-blur-lg bg-glass-surface-primary border-glass-border-default shadow-glass-3 overflow-hidden', className)} {...props}>
                {/* Calendar Header */}
                <CardHeader className="border-b border-white/10">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
                            <CalendarIcon className="w-6 h-6" />
                            {monthData.monthName} {monthData.year}
                        </CardTitle>

                        <div className="flex items-center gap-2">
                            <GlassButton
                                variant="ghost"
                                size="sm"
                                onClick={() => navigateMonth('prev')}
                                disabled={loading}
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </GlassButton>

                            <GlassButton
                                variant="ghost"
                                size="sm"
                                onClick={() => setCurrentDate(new Date())}
                                disabled={loading}
                            >
                                Today
                            </GlassButton>

                            <GlassButton
                                variant="ghost"
                                size="sm"
                                onClick={() => navigateMonth('next')}
                                disabled={loading}
                            >
                                <ChevronRight className="w-4 h-4" />
                            </GlassButton>
                        </div>
                    </div>
                </CardHeader>

                {/* Calendar Grid */}
                <CardContent className="p-4">
                    {/* Week day headers */}
                    <div className="grid grid-cols-7 gap-2 mb-4">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => {
                            const isWeekend = (index === 0 || index === 6);
                            if (!showWeekends && isWeekend) return null;

                            return (
                                <div
                                    key={day}
                                    className={cn(
                                        'text-center text-sm font-medium py-2 rounded-lg',
                                        isWeekend ? 'text-white/60' : 'text-white/80'
                                    )}
                                >
                                    {day}
                                </div>
                            );
                        })}
                    </div>

                    {/* Calendar days */}
                    <div className="grid grid-cols-7 gap-2">
                        {monthData.weeks.flat().map((date, index) => {
                            const dateKey = date.toDateString();
                            const dayEvents = eventsByDate.get(dateKey) || [];
                            const hasEvents = dayEvents.length > 0;
                            const isWeekend = date.getDay() === 0 || date.getDay() === 6;

                            if (!showWeekends && isWeekend) return null;

                            return (
                                <div
                                    key={`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`}
                                    className="aspect-square"
                                >
                                    <button
                                        onClick={() => handleDateClick(date)}
                                        disabled={isDisabled(date)}
                                        className={cn(
                                            'w-full h-full rounded-lg transition-all duration-200',
                                            'flex flex-col items-center justify-start p-1',
                                            'hover:bg-white/10 focus:bg-white/15 focus:outline-none hover:scale-105',
                                            'disabled:opacity-50 disabled:cursor-not-allowed',
                                            {
                                                'glass-base backdrop-blur-md bg-glass-surface-primary border-glass-border-primary': isSelected(date),
                                                'glass-base backdrop-blur-sm bg-glass-surface-secondary border-glass-border-default': isToday(date) && showToday && !isSelected(date),
                                                'text-white/60': !isCurrentMonth(date),
                                                'text-white/90': isCurrentMonth(date),
                                            }
                                        )}
                                    >
                                        <span className="text-sm font-medium leading-none">
                                            {date.getDate()}
                                        </span>

                                        {/* Events indicator */}
                                        {showEvents && hasEvents && (
                                            <div className="flex flex-col gap-0.5 mt-1 w-full">
                                                {dayEvents.slice(0, 2).map((event) => (
                                                    <div
                                                        key={event.id}
                                                        className={cn(
                                                            'w-full h-1 rounded-full',
                                                            getEventColor(event)
                                                        )}
                                                    />
                                                ))}
                                                {dayEvents.length > 2 && (
                                                    <div className="w-full text-xs text-white/60 text-center">
                                                        +{dayEvents.length - 2}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    {/* Selected date events */}
                    {selectedDateState && showEvents && (
                        <div className="mt-6 pt-4 border-t border-white/10">
                            <h3 className="text-lg font-semibold text-white mb-3">
                                Events for {selectedDateState.toLocaleDateString(locale, { weekday: 'long', month: 'long', day: 'numeric' })}
                            </h3>

                            <div className="space-y-3">
                                {(eventsByDate.get(selectedDateState.toDateString()) || []).map((event) => (
                                    <div key={event.id} className="w-full">
                                        <GlassCard
                                            className="glass-base backdrop-blur-md bg-glass-surface-secondary border-glass-border-default shadow-glass-1 p-4 hover:shadow-glass-2 hover:bg-glass-surface-primary transition-all cursor-pointer"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className={cn('w-3 h-3 rounded-full mt-2 flex-shrink-0', getEventColor(event))} />

                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-medium text-white text-sm">{event.title}</h4>

                                                    <div className="flex items-center gap-4 mt-2 text-xs text-white/70">
                                                        {event.startTime && (
                                                            <div className="flex items-center gap-1">
                                                                <Clock className="w-3 h-3" />
                                                                {event.startTime}
                                                                {event.endTime && ` - ${event.endTime}`}
                                                            </div>
                                                        )}

                                                        {event.location && (
                                                            <div className="flex items-center gap-1">
                                                                <MapPin className="w-3 h-3" />
                                                                {event.location}
                                                            </div>
                                                        )}

                                                        {event.attendees && event.attendees.length > 0 && (
                                                            <div className="flex items-center gap-1">
                                                                <Users className="w-3 h-3" />
                                                                {event.attendees.length} attendee{event.attendees.length !== 1 ? 's' : ''}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {event.description && (
                                                        <p className="text-xs text-white/60 mt-2 line-clamp-2">
                                                            {event.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </GlassCard>
                                    </div>
                                ))}

                                {(eventsByDate.get(selectedDateState.toDateString()) || []).length === 0 && (
                                    <div className="text-center text-white/50 py-8">
                                        No events scheduled for this date
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </CardContent>
            </GlassCard>
        </div>
    );
};

// Calendar Event Card Component
export interface GlassCalendarEventCardProps {
    event: CalendarEvent;
    compact?: boolean;
    onClick?: () => void;
    className?: string;
}

export const GlassCalendarEventCard: React.FC<GlassCalendarEventCardProps> = ({
    event,
    compact = false,
    onClick,
    className
}) => {
    const getEventTypeIcon = (type?: string) => {
        switch (type) {
            case 'meeting': return <Users className="w-4 h-4" />;
            case 'event': return <CalendarIcon className="w-4 h-4" />;
            case 'reminder': return <Clock className="w-4 h-4" />;
            default: return <CalendarIcon className="w-4 h-4" />;
        }
    };

    const getEventColor = (event: CalendarEvent) => {
        if (event.color) return event.color;

        switch (event.type) {
            case 'meeting': return 'border-l-blue-500';
            case 'event': return 'border-l-green-500';
            case 'reminder': return 'border-l-yellow-500';
            case 'task': return 'border-l-purple-500';
            default: return 'border-l-gray-500';
        }
    };

    if (compact) {
        return (
            <div
                className={cn(
                    'flex items-center gap-2 p-2 rounded-lg border-l-4 bg-white/5',
                    getEventColor(event),
                    onClick && 'cursor-pointer hover:bg-white/10 transition-colors',
                    className
                )}
                onClick={onClick}
            >
                {getEventTypeIcon(event.type)}
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{event.title}</p>
                    {event.startTime && (
                        <p className="text-xs text-white/60">{event.startTime}</p>
                    )}
                </div>
            </div>
        );
    }

    return (
        <GlassCard
            variant="outline"
            className={cn(
                'p-4',
                onClick && 'cursor-pointer hover:bg-white/5 transition-colors',
                className
            )}
            onClick={onClick}
        >
            <div className="flex items-start gap-3">
                <div className={cn('p-2 rounded-lg bg-white/10', getEventColor(event).replace('border-l-', 'text-'))}>
                    {getEventTypeIcon(event.type)}
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white">{event.title}</h3>

                    <div className="flex items-center gap-4 mt-2 text-sm text-white/70">
                        <div className="flex items-center gap-1">
                            <CalendarIcon className="w-4 h-4" />
                            {event.date.toLocaleDateString()}
                        </div>

                        {event.startTime && (
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {event.startTime}
                                {event.endTime && ` - ${event.endTime}`}
                            </div>
                        )}

                        {event.location && (
                            <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {event.location}
                            </div>
                        )}
                    </div>

                    {event.description && (
                        <p className="text-sm text-white/60 mt-2">{event.description}</p>
                    )}

                    {event.attendees && event.attendees.length > 0 && (
                        <div className="flex items-center gap-1 mt-2">
                            <Users className="w-4 h-4 text-white/60" />
                            <span className="text-sm text-white/60">
                                {event.attendees.join(', ')}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </GlassCard>
    );
};

export default GlassCalendar;
