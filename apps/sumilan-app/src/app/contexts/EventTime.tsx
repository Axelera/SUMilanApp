import { createContext, useEffect, useState } from "react";
import { DateTime } from "luxon";

import { EventTimeContextModel } from "../models/event.model";
import { getEventTimeStatus, getMillisUntilLive, getMillisUntilPassed } from "../utils/eventTimeUtils";
import { EventTimeStatus } from "@sumilan-app/api";

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
        if (timeStatus === EventTimeStatus.TodayScheduled) {
            timeout = setTimeout(() => {
                setTimeStatus(getEventTimeStatus(dt, duration));
            }, (getMillisUntilLive(dt) + 1));
        } else if (timeStatus === EventTimeStatus.TodayLive) {
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