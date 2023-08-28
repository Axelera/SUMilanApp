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

import EventTimeComponent from '../../../components/EventTime/EventTimeComponent';
import { EventComponentProps } from "../../../models/event.model";
import BottomLivePlayer from '../../../components/BottomLivePlayer/BottomLivePlayer';
import TicketsButton from '../../../components/TicketsButton/TicketsButton';
import { getEventType } from '../../../utils/events';
import Speaker from '../../../components/Speaker/Speaker';

import './Info.css';

const Info: React.FC<EventComponentProps> = ({ event }) => {
    const { t } = useTranslation();

    return (
        <IonPage>
            <IonContent
                style={{
                    '--padding-top': '20px',
                    '--padding-bottom': '80px', // ~ tickets button height + position
                }}
            >
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
                            components={{
                                a: ({
                                    node, href, children, ...props
                                }) => <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>,
                            }}
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
                <TicketsButton
                    ticketsUrl={event.tickets_url}
                    ticketsType={event.tickets_type}
                />
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