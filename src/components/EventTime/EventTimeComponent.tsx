import {
    IonChip,
    IonIcon,
    IonLabel,
} from '@ionic/react';
import { ellipse, timeOutline } from 'ionicons/icons';
import { DateTime } from "luxon";
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { EventTimeStatus, formatTimeDuration } from '../../utils/eventTimeUtils';
import { EventTimeContext } from '../../contexts/EventTime';
import { EventTimeContextModel } from '../../models/event.model';

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
    const { timeStatus: eventTimeStatus } = useContext(EventTimeContext) as EventTimeContextModel;

    const { t } = useTranslation();

    if (eventTimeStatus === EventTimeStatus.PASSED) {
        // yesterday or before
        return (
            <TimeContainer>
                {dt.toLocaleString(dateFormat)} ({formatTimeDuration(props.duration)})
            </TimeContainer>
        );
    } else if (eventTimeStatus === EventTimeStatus.TODAY_SCHEDULED) {
        return (
            <TimeContainer>
                {t('EVENT.Time.today', { time: dt.toLocaleString(DateTime.TIME_24_SIMPLE) })} ({formatTimeDuration(props.duration)})
            </TimeContainer>
        );
    } else if (eventTimeStatus === EventTimeStatus.TODAY_PASSED) {
        return (
            <TimeContainer>
                {t('EVENT.Time.today', { time: dt.toLocaleString(DateTime.TIME_24_SIMPLE) })} ({t('EVENT.Time.ended', { time: dt.plus({ minutes: props.duration }).toLocaleString(DateTime.TIME_24_SIMPLE) })})
            </TimeContainer>
        );
    } else if (eventTimeStatus === EventTimeStatus.TODAY_LIVE) {
        return (
            <span>
                <IonChip style={{ marginLeft: 0 }} color="danger" outline>
                    <IonLabel>
                        LIVE
                    </IonLabel>
                    <IonIcon icon={ellipse} style={{ fontSize: '12px' }} className="blinking" />
                </IonChip>
                ({t('EVENT.Time.ends', {
                    duration: formatTimeDuration(props.duration),
                    time: dt.plus({ minutes: props.duration }).toLocaleString(DateTime.TIME_24_SIMPLE),
                })})
            </span>
        );
    } else if (eventTimeStatus === EventTimeStatus.SCHEDULED) {
        return (
            <TimeContainer>
                {dt.toLocaleString(dateFormat)} ({formatTimeDuration(props.duration)})
            </TimeContainer>
        );
    }
    return null;
};

export default EventTimeComponent