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
import { DateTime } from 'luxon';
import { useContext } from 'react';

import EventHeaderComponent from '../../../components/EventHeader/EventHeaderComponent';
import EventTimeComponent from '../../../components/EventTime/EventTimeComponent';
import SocialLinkComponent from '../../../components/SocialLinkComponent/SocialLinkComponent';
import { EventComponentProps, EventRelatorModel, TicketsLinkModel } from "../../../models/event.model";
import avatar from '../../../assets/images/avatar.png';
import { EventTimeStatus, getEventTimeStatus } from '../../../utils/eventTimeUtils';
import BottomLivePlayer from '../../../components/BottomLivePlayer/BottomLivePlayer';
import { VideoPlayerContext } from '../../../contexts/VideoPlayer';
import { VideoPlayerContextModel } from '../../../models/videoplayer.model';

import './Info.css';

const Relator = (data: { relator: EventRelatorModel }) => {
    const relator = data.relator;
    return (
        <IonItem>
            <IonAvatar slot="start">
                <img src={relator.imageUrl ? relator.imageUrl : avatar} alt={relator.name} />
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
    const { isBottomPlayerVisible } = useContext(VideoPlayerContext) as VideoPlayerContextModel;

    const event = props.event;
    const eventTimeStatus = getEventTimeStatus(DateTime.fromISO(event.date), event.duration);

    return (
        <IonPage>
            <EventHeaderComponent event={event} />
            <IonContent>
                <div style={{ width: '100%' }}>
                    <div className="event-image" style={{ backgroundImage: `url(${event.imageUrl})` }}></div>
                </div>
                <IonItem lines="none" className="event-name">
                    <IonLabel style={{ marginBottom: 0, whiteSpace: 'unset' }}>
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
                    {event.description.replaceAll('\\n', '\n')}
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
                {event.ticketsLink && eventTimeStatus !== EventTimeStatus.PASSED && <TicketsButton ticketsLink={event.ticketsLink} />}
                {isBottomPlayerVisible && <div style={{ height: 120 }}></div>}
            </IonContent>
            {isBottomPlayerVisible && <BottomLivePlayer
                isLive={eventTimeStatus === EventTimeStatus.TODAY_LIVE}
            />}
        </IonPage>
    );
};

export default Info;