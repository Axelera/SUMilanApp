import {
    IonAvatar,
    IonContent,
    IonFab,
    IonFabButton,
    IonFooter,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonPage,
} from '@ionic/react';
import { headsetOutline, ticketOutline } from 'ionicons/icons';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';

import EventHeaderComponent from '../../../components/EventHeader/EventHeaderComponent';
import EventTimeComponent from '../../../components/EventTime/EventTimeComponent';
import SocialLinkComponent from '../../../components/SocialLinkComponent/SocialLinkComponent';
import { EventComponentProps, EventRelatorModel, EventTimeContextModel, TicketsLinkModel } from "../../../models/event.model";
import avatar from '../../../../assets/images/avatar.png';
import { EventTimeStatus } from '../../../utils/eventTimeUtils';
import BottomLivePlayer from '../../../components/BottomLivePlayer/BottomLivePlayer';
import { TicketsLinkType } from '../../../models/types.model';
import { EventTimeContext } from '../../../contexts/EventTime';

import './Info.css';

const Relator = (data: { relator: EventRelatorModel }) => {
    const relator = data.relator;
    return (
        <IonItem>
            <IonAvatar slot="start">
                <img src={relator.imageUrl ? relator.imageUrl : avatar} alt={relator.name} />
            </IonAvatar>
            <IonLabel>
                <h2>{relator.name}</h2>
                {relator.description && <p>{relator.description}</p>}
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
        case TicketsLinkType.EVENTBRITE:
            icon = ticketOutline;
            break;
        case TicketsLinkType.CLUBHOUSE:
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
    const { timeStatus: eventTimeStatus } = useContext(EventTimeContext) as EventTimeContextModel;
    const { t } = useTranslation();

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
                <IonItem>
                    <div>
                        <ReactMarkdown rehypePlugins={[rehypeRaw]} children={event.description.replace(/\\n/g, '\n')} />
                    </div>
                </IonItem>
                {event.relators ?
                    (
                        <IonList style={{ marginBottom: 5 }}>
                            <IonListHeader style={{ paddingLeft: 10 }}>{t('EVENT.INFO.relators')}</IonListHeader>
                            {event.relators.map((relator: EventRelatorModel, index: number) => <Relator key={index} relator={relator} />)}
                        </IonList>
                    )
                    :
                    null}
                {event.moderators ?
                    (
                        <IonList style={{ marginBottom: 66 }}>
                            <IonListHeader style={{ paddingLeft: 10 }}>{t('EVENT.INFO.moderators')}</IonListHeader>
                            {event.moderators.map((moderator: EventRelatorModel, index: number) => <Relator key={index} relator={moderator} />)}
                        </IonList>
                    )
                    :
                    null}
                {event.ticketsLink
                    && eventTimeStatus !== EventTimeStatus.PASSED
                    && eventTimeStatus !== EventTimeStatus.TODAY_PASSED
                    && <TicketsButton ticketsLink={event.ticketsLink} />}
            </IonContent>
            <IonFooter>
                <BottomLivePlayer
                    eventId={event.identifier}
                    eventImageUrl={event.imageUrl}
                />
            </IonFooter>
        </IonPage>
    );
};

export default Info;