import {
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
} from "@ionic/react";

import { EventModel } from "../../../models/event.model";
import EventTimeComponent from "../../../components/EventTime/EventTimeComponent";
import { EventTimeProvider } from "../../../contexts/EventTime";

import './EventChoice.css';

type Props = {
    event: EventModel;
    onClick: (event: EventModel) => any;
};

const EventChoice: React.FC<Props> = ({ event, onClick }) => {

    const cardClickHandler = (ev: any) => {
        ev.stopPropagation();
        onClick(event);
    };

    return (
        <EventTimeProvider date={event.date} duration={event.duration}>
            <IonCard
                key={event.id}
                onClick={cardClickHandler}
                button={true}
                className="event-card"
            >
                <div className="card-image" style={{ backgroundImage: `url(${event.imageUrl}` }}></div>
                <IonCardHeader>
                    <IonCardTitle>
                        {event.title}
                    </IonCardTitle>
                    <IonCardSubtitle>
                        {event.type.toUpperCase()}
                    </IonCardSubtitle>
                    <EventTimeComponent date={event.date} duration={event.duration} />
                </IonCardHeader>
            </IonCard>
        </EventTimeProvider>
    );
};

export default EventChoice;