import { DateTime } from "luxon";

import { Event_Time_Status } from "@sumilan-app/api";

export const getEventTimeStatus = (date: DateTime, duration: number): Event_Time_Status => {
    const dt = date;
    const now = DateTime.now();
    if (dt.startOf('day') < now.startOf('day')) {
        // yesterday or before
        return Event_Time_Status.Passed;
    } else if (dt.startOf('day') <= now.startOf('day')) { // === comparison doesn't work
        // today
        const diffInMinutes = dt.diffNow(['minutes']).minutes;
        if (diffInMinutes > 0) {
            return Event_Time_Status.TodayScheduled;
        } else if (diffInMinutes <= 0 && diffInMinutes > -duration) {
            return Event_Time_Status.TodayLive;
        } else if (diffInMinutes < -duration) {
            return Event_Time_Status.TodayPassed;
        }
    }
    // default to tomorrow or later
    return Event_Time_Status.Scheduled;
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

export const getMillisUntilLive = (date: DateTime): number => {
    const diffInMillis = date.diffNow(['milliseconds']).milliseconds;
    return diffInMillis;
};

export const getMillisUntilPassed = (date: DateTime, duration: number): number => {
    const diffInMinutes = Math.abs(date.diffNow(['minutes']).minutes);
    return (diffInMinutes + duration) * 60 * 1000;
};