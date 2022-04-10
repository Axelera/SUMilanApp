import {
    IonChip,
    IonIcon,
    IonLabel,
} from '@ionic/react';
import { ellipse, timeOutline } from 'ionicons/icons';
import { DateTime } from "luxon";
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { formatTimeDuration } from '../../utils/eventTimeUtils';
import { EventTimeContext } from '../../contexts/EventTime';
import { EventTimeContextModel } from '../../models/event.model';
import { EventTimeStatus } from '@sumilan-app/api';

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

const TimeContainer: React.FC = ({ children }) => {
    return (
        <p className="time-container"><TimeIcon />{children}</p>
    );
};

const EventTimeComponent: React.FC<EventTimeProps> = ({ date, duration }) => {
    const dt = DateTime.fromISO(date);
    const { timeStatus: eventTimeStatus } = useContext(EventTimeContext) as EventTimeContextModel;

    const { t } = useTranslation();

    if (eventTimeStatus === EventTimeStatus.Passed) {
        // yesterday or before
        return (
            <TimeContainer>
                {dt.toLocaleString(dateFormat)} ({formatTimeDuration(duration)})
            </TimeContainer>
        );
    } else if (eventTimeStatus === EventTimeStatus.TodayScheduled) {
        return (
            <TimeContainer>
                {t('EVENT.Time.today', { time: dt.toLocaleString(DateTime.TIME_24_SIMPLE) })} ({formatTimeDuration(duration)})
            </TimeContainer>
        );
    } else if (eventTimeStatus === EventTimeStatus.TodayPassed) {
        return (
            <TimeContainer>
                {t('EVENT.Time.today', { time: dt.toLocaleString(DateTime.TIME_24_SIMPLE) })} ({t('EVENT.Time.ended', { time: dt.plus({ minutes: duration }).toLocaleString(DateTime.TIME_24_SIMPLE) })})
            </TimeContainer>
        );
    } else if (eventTimeStatus === EventTimeStatus.TodayLive) {
        return (
            <span>
                <IonChip style={{ marginLeft: 0 }} color="danger" outline>
                    <IonLabel>
                        LIVE
                    </IonLabel>
                    <IonIcon icon={ellipse} style={{ fontSize: '12px' }} className="blinking" />
                </IonChip>
                ({t('EVENT.Time.ends', {
                    duration: formatTimeDuration(duration),
                    time: dt.plus({ minutes: duration }).toLocaleString(DateTime.TIME_24_SIMPLE),
                })})
            </span>
        );
    } else if (eventTimeStatus === EventTimeStatus.Scheduled) {
        return (
            <TimeContainer>
                {dt.toLocaleString(dateFormat)} ({formatTimeDuration(duration)})
            </TimeContainer>
        );
    }
    return null;
};

export default EventTimeComponent