import { DateTime } from "luxon";

export enum EventTimeStatus {
    PASSED,
    TODAY_PASSED,
    TODAY_LIVE,
    TODAY_SCHEDULED,
    SCHEDULED,
}

export const getEventTimeStatus = (date: DateTime, duration: number): EventTimeStatus => {
    const dt = date;
    const now = DateTime.now();
    if (dt.startOf('days') < now.startOf('days')) {
        // yesterday or before
        return EventTimeStatus.PASSED;
    } else if (dt.startOf('days') <= now.startOf('days')) { // === comparison doesn't work
        // today
        const diffInMinutes = dt.diffNow(['minutes']).minutes;
        if (diffInMinutes > 0) {
            return EventTimeStatus.TODAY_SCHEDULED;
        } else if (diffInMinutes <= 0 && diffInMinutes > -duration) {
            return EventTimeStatus.TODAY_LIVE;
        } else if (diffInMinutes < -duration) {
            return EventTimeStatus.TODAY_PASSED;
        }
    }
    // default to tomorrow or later
    return EventTimeStatus.SCHEDULED;
};

export const formatTimeDuration = (duration: number): string => {
    let res = '';
    const hours = Math.floor(duration / 60);
    if (hours) {
        res += `${hours}h`;
    }
    const minutes = duration % 60;
    if (minutes) {
        res += `${minutes}m`;
    }
    return res;
}

export const isEventToday = (date: string): boolean => {
    const dt = DateTime.fromISO(date);
    const now = DateTime.now();
    if (!(dt.startOf('days') < now.startOf('days')) && dt.startOf('days') <= now.startOf('days')) { // === comparison doesn't work
        // today
        return true;
    }
    // default to tomorrow or later
    return false;
};

export const getMillisUntilLive = (date: DateTime): number => {
    const diffInMillis = date.diffNow(['milliseconds']).milliseconds;
    return diffInMillis;
};

export const getMillisUntilPassed = (date: DateTime, duration: number): number => {
    const diffInMinutes = Math.abs(date.diffNow(['minutes']).minutes);
    return (diffInMinutes + duration) * 60 * 1000;
};