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
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { RouteComponentProps } from "react-router";

import EventTimeComponent from "../EventTime/EventTimeComponent";
import { EventTimeProvider } from "../../contexts/EventTime";
import { getEventType } from "../../utils/events";
import { Events } from "@sumilan-app/api";

import './EventCardComponent.css';

interface Props extends RouteComponentProps {
    event?: Partial<Events>;
}

const EventCardComponent: React.FC<Props> = ({ event, history }) => {
    const cardButtonClickHandler = (ev: React.MouseEvent<HTMLIonButtonElement, MouseEvent>, page: string) => {
        ev.stopPropagation();
        history.push(`/event/${event?.identifier}/${page}`);
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

    if (event.video_url) {
        buttons.push(
            <IonButton fill="clear" onClick={(ev) => cardButtonClickHandler(ev, 'live')} color="tertiary">
                <IonIcon slot="icon-only" icon={logoYoutube} />
            </IonButton>
        );
    }

    if (event.voting_url) {
        buttons.push(
            <IonButton fill="clear" onClick={(ev) => cardButtonClickHandler(ev, 'mentimeter')} color="tertiary">
                <IonIcon slot="icon-only" icon={help} />
            </IonButton>
        );
    }

    if (event.slidesCollection?.totalCount && event.slidesCollection?.totalCount > 0) {
        buttons.push(
            <IonButton fill="clear" onClick={(ev) => cardButtonClickHandler(ev, 'slides')} color="tertiary">
                <IonIcon slot="icon-only" icon={fileTrayFull} />
            </IonButton>
        );
    }

    return (
        <EventTimeProvider date={event.start_timestamp} duration={event.duration as number}>
            <IonCard
                key={event.id}
                onClick={() => {
                    history.push(`/event/${event.identifier}/info`);
                }}
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
                    <EventTimeComponent date={event.start_timestamp} duration={event.duration as number} />
                </IonCardHeader>
                <IonCardContent>
                    <div className="event-card-description">
                        <ReactMarkdown
                            rehypePlugins={[rehypeRaw]}
                            children={event.event_description?.split('\n')[0] || ''}
                            components={{
                                p({ children }) {
                                    return (
                                        <span>{children}</span>
                                    )
                                },
                                a({ children }) {
                                    return <span>{children}</span>;
                                },
                                ul({ children }) {
                                    return <span>{children}</span>;
                                },
                                li({ children }) {
                                    return <span>- {children}</span>;
                                },
                            }}
                        />
                    </div>
                    {
                        buttons.length > 0 &&
                        <IonGrid className="event-actions-grid">
                            <IonRow>
                                {buttons.map((button, index) => <IonCol key={index}>{button}</IonCol>)}
                            </IonRow>
                        </IonGrid>
                    }
                </IonCardContent>
            </IonCard>
        </EventTimeProvider>
    );
};

export default EventCardComponent;