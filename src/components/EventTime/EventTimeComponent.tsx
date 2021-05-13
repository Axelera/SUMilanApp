import {
    IonChip,
    IonIcon,
    IonLabel,
} from '@ionic/react';
import { ellipse, timeOutline } from 'ionicons/icons';
import { DateTime } from "luxon";
import { getEventTimeStatus, EventTimeStatus } from '../../utils/eventTimeUtils';
import './EventTimeComponent.css';

const dateFormat = Object.assign({}, DateTime.DATETIME_MED);
delete dateFormat.year; // do not display year

interface EventTimeProps {
    date: string;
    duration: number; // in minutes
}

const TimeIcon = () => {
    return <IonIcon icon={timeOutline} className="time-icon" />;
};

const TimeContainer = (props: any) => {
    return (
        <p className="time-container"><TimeIcon />{props.children}</p>
    );
};

const EventTimeComponent: React.FC<EventTimeProps> = (props: EventTimeProps) => {
    const dt = DateTime.fromISO(props.date);
    const eventTimeStatus = getEventTimeStatus(dt, props.duration);
    if (eventTimeStatus === EventTimeStatus.PASSED) {
        // yesterday or before
        return (
            <TimeContainer>
                {dt.toLocaleString(dateFormat)}
            </TimeContainer>
        );
    } else if (eventTimeStatus === EventTimeStatus.TODAY_SCHEDULED || eventTimeStatus === EventTimeStatus.TODAY_PASSED) {
        return (
            <TimeContainer>
                Oggi alle {dt.toLocaleString(DateTime.TIME_24_SIMPLE)}
            </TimeContainer>
        );
    } else if (eventTimeStatus === EventTimeStatus.TODAY_LIVE) {
        return (
            <IonChip style={{ marginLeft: 0 }} color="danger" outline>
                <IonLabel>
                    LIVE
                    </IonLabel>
                <IonIcon icon={ellipse} style={{ fontSize: '12px' }} className="blinking" />
            </IonChip>
        );
    } else if (eventTimeStatus === EventTimeStatus.SCHEDULED) {
        return (
            <TimeContainer>
                {dt.toLocaleString(dateFormat)}
            </TimeContainer>
        );
    }
    return null;
};

export default EventTimeComponent