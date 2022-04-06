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

const Mentimeter: React.FC<EventComponentProps> = (props: EventComponentProps) => {
    const { t } = useTranslation();

    return (
        <IonPage>
            <EventHeaderComponent event={props.event} />
            <IonContent>
                <div style={{ width: '100%', textAlign: 'center', margin: '20px 0' }}>
                    <IonButton
                        href={props.event.votingUrl}
                        target="_blank"
                    >
                        {t('EVENT.MENTIMETER.noQuestions')}
                    </IonButton>
                </div>
                <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
                    <iframe
                        title={`menti-${props.event.id}`}
                        sandbox='allow-scripts allow-same-origin allow-forms'
                        allowFullScreen={true}
                        height='100%'
                        width='100%'
                        src={props.event.votingUrl}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0}}
                    ></iframe>
                </div>
            </IonContent>
            <IonFooter>
                <BottomLivePlayer
                    eventId={props.event.identifier}
                    eventImageUrl={props.event.imageUrl}
                />
            </IonFooter>
        </IonPage>
    );
};

export default Mentimeter;