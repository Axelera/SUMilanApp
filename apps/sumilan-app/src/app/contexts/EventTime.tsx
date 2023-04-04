import { createContext, useEffect, useState } from "react";
import { DateTime } from "luxon";

import { EventTimeContextModel } from "../models/event.model";
import { getEventTimeStatus, getMillisUntilLive, getMillisUntilPassed } from "../utils/eventTimeUtils";
import { Event_Time_Status } from "@sumilan-app/api";

export const EventTimeContext = createContext<EventTimeContextModel | null>(null);

type Props = {
    date: string;
    duration: number;
};

export const EventTimeProvider: React.FC<Props> = ({ children, date, duration }) => {
    const dt = DateTime.fromISO(date);
    const [timeStatus, setTimeStatus] = useState(getEventTimeStatus(dt, duration));

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (timeStatus === Event_Time_Status.TodayScheduled) {
            timeout = setTimeout(() => {
                setTimeStatus(getEventTimeStatus(dt, duration));
            }, (getMillisUntilLive(dt) + 1));
        } else if (timeStatus === Event_Time_Status.TodayLive) {
            timeout = setTimeout(() => {
                setTimeStatus(getEventTimeStatus(dt, duration));
            }, (getMillisUntilPassed(dt, duration) + 1));
        }
        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        };
    }, [timeStatus, dt, duration]);

    return (
        <EventTimeContext.Provider value={{ timeStatus }}>
            {children}
        </EventTimeContext.Provider>
    );
};