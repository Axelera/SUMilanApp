import { useContext } from 'react';
import {
    IonContent,
    IonFooter,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonPage,
} from '@ionic/react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { useTranslation } from 'react-i18next';

import EventHeaderComponent from '../../../components/EventHeader/EventHeaderComponent';
import EventTimeComponent from '../../../components/EventTime/EventTimeComponent';
import { EventComponentProps, EventTimeContextModel } from "../../../models/event.model";
import BottomLivePlayer from '../../../components/BottomLivePlayer/BottomLivePlayer';
import { EventTimeContext } from '../../../contexts/EventTime';
import TicketsButton from '../../../components/TicketsButton/TicketsButton';
import { getEventType } from '../../../utils/events';
import { EventTimeStatus, TicketsType } from '@sumilan-app/api';
import Speaker from '../../../components/Speaker/Speaker';

import './Info.css';

const Info: React.FC<EventComponentProps> = ({ event }) => {
    const { timeStatus: eventTimeStatus } = useContext(EventTimeContext) as EventTimeContextModel;
    const { t } = useTranslation();

    return (
        <IonPage>
            <EventHeaderComponent event={event} />
            <IonContent>
                <div style={{ width: '100%' }}>
                    <div className="event-image" style={{ backgroundImage: `url(${event.event_image_url})` }}></div>
                </div>
                <IonItem lines="none" className="event-name">
                    <IonLabel style={{ marginBottom: 0, whiteSpace: 'unset' }}>
                        <h2><b>{event.event_title}</b></h2>
                        <p>{getEventType(event.event_type)}</p>
                    </IonLabel>
                </IonItem>
                <IonItem lines="none">
                    <IonLabel style={{ marginTop: 0 }}>
                        <EventTimeComponent
                            date={event.start_timestamp}
                            duration={event.duration as number}
                        />
                    </IonLabel>
                </IonItem>
                <IonItem>
                    <div>
                        <ReactMarkdown
                            rehypePlugins={[rehypeRaw]}
                            children={event.event_description?.replace(/\\n/g, '\n') || ''}
                        />
                    </div>
                </IonItem>
                {event.relators.length > 0 &&
                    <IonList style={{ marginBottom: 5 }}>
                        <IonListHeader style={{ paddingLeft: 10 }}>{t('EVENT.INFO.relators')}</IonListHeader>
                        {event.relators.map((relator, index) =>
                            <Speaker key={index} speaker={relator} />
                        )}
                    </IonList>
                }
                {event.moderators.length > 0 &&
                    <IonList style={{ marginBottom: 66 }}>
                        <IonListHeader style={{ paddingLeft: 10 }}>{t('EVENT.INFO.moderators')}</IonListHeader>
                        {event.moderators.map((moderator, index) =>
                            <Speaker key={index} speaker={moderator} />
                        )}
                    </IonList>
                }
                {event.tickets_url && event.eventbrite_event_id
                    && eventTimeStatus !== EventTimeStatus.Passed
                    && eventTimeStatus !== EventTimeStatus.TodayPassed
                    && <TicketsButton
                        ticketsUrl={event.tickets_url as string}
                        ticketsType={event.tickets_type as TicketsType}
                        ebEventId={event.eventbrite_event_id as string}
                    />
                }
            </IonContent>
            <IonFooter>
                <BottomLivePlayer
                    eventId={event.identifier}
                    eventImageUrl={event.event_image_url || ''}
                />
            </IonFooter>
        </IonPage>
    );
};

export default Info;