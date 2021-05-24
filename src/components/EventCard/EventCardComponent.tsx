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
    IonSkeletonText,
} from "@ionic/react";
import { fileTrayFull, help, logoYoutube, timeOutline } from "ionicons/icons";
import { EventComponentWithRouteProps } from "../../models/event.model";
import EventTimeComponent from "../EventTime/EventTimeComponent";
import './EventCardComponent.css';

const EventCardComponent: React.FC<EventComponentWithRouteProps> = (props: EventComponentWithRouteProps) => {
    const event = props.event;

    const cardButtonClickHandler = (ev: any, page: string) => {
        ev.stopPropagation();
        props.history.push(`/event/${event?.identifier}/${page}`);
    };

    if (!event) {
        return (
            <IonCard className="event-card">
                <div className="card-image">
                    <IonSkeletonText animated style={{ height: '100%', width: '100%' }} />
                </div>
                <IonCardHeader>
                    <IonCardTitle>
                        <IonSkeletonText animated style={{ width: 175, height: 20 }} />
                    </IonCardTitle>
                    <IonCardSubtitle>
                        <IonSkeletonText animated style={{ width: 75, height: 15 }} />
                    </IonCardSubtitle>
                    <div className="time-container-loading"><IonIcon icon={timeOutline} /><IonSkeletonText animated style={{ width: 100 }} /></div>
                </IonCardHeader>
                <IonCardContent>
                    <IonSkeletonText animated style={{ width: '100%', marginBottom: 8 }} />
                    <IonSkeletonText animated style={{ width: '100%', marginBottom: 8 }} />
                    <IonSkeletonText animated style={{ width: '100%', marginBottom: 8 }} />
                    <IonSkeletonText animated style={{ width: '80%' }} />
                    <IonGrid className="event-actions-grid">
                        <IonRow>
                            <IonCol>
                                <IonButton fill="clear" color="medium">
                                    <IonIcon slot="icon-only" icon={logoYoutube} />
                                </IonButton>
                            </IonCol>
                            <IonCol>
                                <IonButton fill="clear" color="medium">
                                    <IonIcon slot="icon-only" icon={help} />
                                </IonButton>
                            </IonCol>
                            <IonCol>
                                <IonButton fill="clear" color="medium">
                                    <IonIcon slot="icon-only" icon={fileTrayFull} />
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>

                </IonCardContent>
            </IonCard>
        );
    }

    const buttons = [];

    if (event.videoUrl) {
        buttons.push(
            <IonButton fill="clear" onClick={(ev) => cardButtonClickHandler(ev, 'live')} color="tertiary">
                <IonIcon slot="icon-only" icon={logoYoutube} />
            </IonButton>
        );
    }

    if (event.votingUrl) {
        buttons.push(
            <IonButton fill="clear" onClick={(ev) => cardButtonClickHandler(ev, 'mentimeter')} color="tertiary">
                <IonIcon slot="icon-only" icon={help} />
            </IonButton>
        );
    }

    if ((event.slides && event.slides.length > 0) || (event.preSlides && event.preSlides.length > 0)) {
        buttons.push(
            <IonButton fill="clear" onClick={(ev) => cardButtonClickHandler(ev, 'slides')} color="tertiary">
                <IonIcon slot="icon-only" icon={fileTrayFull} />
            </IonButton>
        );
    }

    return (
        <IonCard key={event.id} onClick={() => {
            props.history.push(`/event/${event.identifier}/info`);
        }} button={true} className="event-card">
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
            <IonCardContent>
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.description}</div>
                {
                    buttons.length > 0 ?
                        <IonGrid className="event-actions-grid">
                            <IonRow>
                                {buttons.map((button: any, index: number) => <IonCol key={index}>{button}</IonCol>)}
                            </IonRow>
                        </IonGrid>
                        : null
                }
            </IonCardContent>
        </IonCard>
    );
};

export default EventCardComponent;