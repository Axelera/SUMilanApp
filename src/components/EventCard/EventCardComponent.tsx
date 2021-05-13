import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonGrid,
    IonIcon,
    IonRow,
} from "@ionic/react";
import { fileTrayFull, help, logoYoutube } from "ionicons/icons";
import { EventComponentWithRouteProps } from "../../pages/Event/event.model";
import EventTimeComponent from "../EventTime/EventTimeComponent";
import './EventCardComponent.css';

const maxDescriptionLength = 90;

const EventDescription = (props: {description: string}) => {
    let res = props.description;
    if (res.length > maxDescriptionLength) {
        res = res.substring(0, maxDescriptionLength).trim() + '...';
    }
    return (
        <div>{res}</div>
    );
};

const EventCardComponent: React.FC<EventComponentWithRouteProps> = (props: EventComponentWithRouteProps) => {
    const event = props.event;

    const cardButtonClickHandler = (ev: any, page: string) => {
        ev.stopPropagation();
        props.history.push(`/event/${event.id}/${page}`);
    };

    return (
        <IonCard key={event.id} onClick={() => {
            props.history.push(`/event/${event.id}/info`);
        }}  button={true}>
            <div className="card-image" style={{ backgroundImage: `url(${event.imageUrl}` }}></div>
            <IonCardHeader>
                <IonCardTitle>
                    {event.title}
                </IonCardTitle>
                <IonCardSubtitle>
                    {event.type.toUpperCase()}
                </IonCardSubtitle>
                <EventTimeComponent date={event.date} duration={event.duration}/>
            </IonCardHeader>
            <IonCardContent>
                <EventDescription description={event.description as string} />
                <IonGrid className="event-actions-grid">
                    <IonRow>
                        <IonCol>
                            <IonButton fill="clear" onClick={(ev) => cardButtonClickHandler(ev, 'live')} color="tertiary">
                                <IonIcon slot="icon-only" icon={logoYoutube} />
                            </IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton fill="clear" onClick={(ev) => cardButtonClickHandler(ev, 'mentimeter')} color="tertiary">
                                <IonIcon slot="icon-only" icon={help} />
                            </IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton fill="clear" onClick={(ev) => cardButtonClickHandler(ev, 'slides')} color="tertiary">
                                <IonIcon slot="icon-only" icon={fileTrayFull} />
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>

            </IonCardContent>
        </IonCard>
    );
};

export default EventCardComponent;