import {
    IonAvatar,
    IonContent,
    IonFab,
    IonFabButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonPage,
} from '@ionic/react';
import { headsetOutline, ticketOutline } from 'ionicons/icons';
import EventHeaderComponent from '../../../components/EventHeader/EventHeaderComponent';
import EventTimeComponent from '../../../components/EventTime/EventTimeComponent';
import SocialLinkComponent from '../../../components/SocialLinkComponent/SocialLinkComponent';
import { EventComponentProps, EventRelatorModel, TicketsLinkModel } from "../../../models/event.model";
import './Info.css';

const Relator = (data: { relator: EventRelatorModel }) => {
    const relator = data.relator;
    return (
        <IonItem>
            <IonAvatar slot="start">
                <img src={relator.imageUrl} alt={relator.name} />
            </IonAvatar>
            <IonLabel>
                {relator.name}
            </IonLabel>
            {relator.socialLinks ?
                relator.socialLinks.map((socialLink: { url: string; platform: string; }, index: number) =>
                    <SocialLinkComponent key={index} url={socialLink.url} platform={socialLink.platform} color="secondary" ionicProps={{ slot: 'end' }} />
                )
                : null
            }

        </IonItem>
    )
};

const TicketsButton = (data: { ticketsLink: TicketsLinkModel }) => {
    let icon;

    switch (data.ticketsLink.type) {
        case 'eventbrite':
            icon = ticketOutline;
            break;
        case 'clubhouse':
            icon = headsetOutline;
            break;
        default:
            icon = ticketOutline;
    }

    return <IonFab vertical="bottom" horizontal="center" slot="fixed">
        <IonFabButton color="tertiary" href={data.ticketsLink.url} target="_blank">
            <IonIcon icon={icon} />
        </IonFabButton>
    </IonFab>
};

const Info: React.FC<EventComponentProps> = (props: EventComponentProps) => {

    const event = props.event;

    return (
        <IonPage>
            <EventHeaderComponent event={event} />
            <IonContent>
                <div style={{ width: '100%' }}>
                    <div className="event-image" style={{ backgroundImage: `url(${event.imageUrl})` }}></div>
                </div>
                <IonItem lines="none" className="event-name">
                    <IonLabel style={{ marginBottom: 0 }}>
                        <h2><b>{event.title}</b></h2>
                        <p>{event.type}</p>
                    </IonLabel>
                </IonItem>
                <IonItem lines="none">
                    <IonLabel style={{ marginTop: 0 }}>
                        <EventTimeComponent date={event.date} duration={event.duration} />
                    </IonLabel>
                </IonItem>
                <IonItem style={{ whiteSpace: 'pre-wrap' }}>
                    {event.description}
                </IonItem>
                {event.relators ?
                    (
                        <IonList style={{ marginBottom: 5 }}>
                            <IonListHeader style={{ paddingLeft: 10 }}>Relatori</IonListHeader>
                            {event.relators.map((relator: EventRelatorModel, index: number) => <Relator key={index} relator={relator} />)}
                        </IonList>
                    )
                    :
                    null}
                {event.moderators ?
                    (
                        <IonList style={{ marginBottom: 66 }}>
                            <IonListHeader style={{ paddingLeft: 10 }}>Moderatori</IonListHeader>
                            {event.moderators.map((moderator: EventRelatorModel, index: number) => <Relator key={index} relator={moderator} />)}
                        </IonList>
                    )
                    :
                    null}
                {event.ticketsLink ? <TicketsButton ticketsLink={event.ticketsLink} /> : null}
            </IonContent>
        </IonPage>
    );
};

export default Info;