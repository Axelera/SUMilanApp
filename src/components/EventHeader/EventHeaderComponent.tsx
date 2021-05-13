import {
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonButton,
    IonIcon,
} from '@ionic/react';
import { ellipse } from 'ionicons/icons';
import { DateTime } from 'luxon';
import { EventComponentProps } from '../../pages/Event/event.model';
import { EventTimeStatus, getEventTimeStatus } from '../../utils/eventTimeUtils';
import './EventHeaderComponent.css';

const EventHeaderComponent: React.FC<EventComponentProps> = (props: EventComponentProps) => {
    const date = DateTime.fromISO(props.event.date);
    
    const liveIndicator = () => {
        if (getEventTimeStatus(date, props.event.duration) === EventTimeStatus.TODAY_LIVE) {
            return (
                <IonButtons slot="end">
                    <IonButton color="danger">
                        <IonIcon slot="icon-only" icon={ellipse} size="small" className="blinking" />
                    </IonButton>
                </IonButtons>
            );
        }
    };

    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/home" />
                </IonButtons>
                <IonTitle>{props.event.title}</IonTitle>
                {liveIndicator()}
            </IonToolbar>
        </IonHeader>
    );
};

export default EventHeaderComponent;