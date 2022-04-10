import React from "react";
import {
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
} from "@ionic/react";

import EventTimeComponent from "../../../components/EventTime/EventTimeComponent";
import { EventTimeProvider } from "../../../contexts/EventTime";
import { Events } from "@sumilan-app/api";
import { getEventType } from "../../../utils/events";

import './EventChoice.css';

type Props = {
    event: Partial<Events>;
    onClick: (event: Partial<Events>) => void;
};

const EventChoice: React.FC<Props> = ({ event, onClick }) => {

    const cardClickHandler = (ev: React.MouseEvent<HTMLIonCardElement, MouseEvent>) => {
        ev.stopPropagation();
        onClick(event);
    };

    return (
        <EventTimeProvider date={event.start_timestamp} duration={event.duration || 0}>
            <IonCard
                key={event.id}
                onClick={cardClickHandler}
                button={true}
                className="event-card"
            >
                <div className="card-image" style={{ backgroundImage: `url(${event.event_image_url}` }}></div>
                <IonCardHeader>
                    <IonCardTitle>
                        {event.event_title}
                    </IonCardTitle>
                    <IonCardSubtitle>
                        {getEventType(event.event_type)}
                    </IonCardSubtitle>
                    <EventTimeComponent date={event.start_timestamp} duration={event.duration || 0} />
                </IonCardHeader>
            </IonCard>
        </EventTimeProvider>
    );
};

export default EventChoice;