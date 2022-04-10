import {
    IonButton,
    IonContent,
    IonFooter,
    IonPage,
} from '@ionic/react';
import { useTranslation } from 'react-i18next';

import BottomLivePlayer from '../../../components/BottomLivePlayer/BottomLivePlayer';
import EventHeaderComponent from '../../../components/EventHeader/EventHeaderComponent';
import { EventComponentProps } from '../../../models/event.model';

const Mentimeter: React.FC<EventComponentProps> = ({ event }) => {
    const { t } = useTranslation();

    return (
        <IonPage>
            <EventHeaderComponent event={event} />
            <IonContent>
                <div style={{ width: '100%', textAlign: 'center', margin: '20px 0' }}>
                    <IonButton
                        href={event.voting_url as string}
                        target="_blank"
                    >
                        {t('EVENT.MENTIMETER.noQuestions')}
                    </IonButton>
                </div>
                <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
                    <iframe
                        title={`menti-${event.id}`}
                        sandbox='allow-scripts allow-same-origin allow-forms'
                        allowFullScreen={true}
                        height='100%'
                        width='100%'
                        src={event.voting_url as string}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                    ></iframe>
                </div>
            </IonContent>
            <IonFooter>
                <BottomLivePlayer
                    eventId={event.identifier}
                    eventImageUrl={event.event_image_url as string}
                />
            </IonFooter>
        </IonPage>
    );
};

export default Mentimeter;