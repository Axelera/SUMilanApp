import {
    IonButton,
    IonContent,
    IonIcon,
    IonPage,
    IonText,
} from '@ionic/react';
import { refresh } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';

import { EventComponentProps, EventTimeContextModel } from '../../../models/event.model';
import VideoPlayer from '../../../components/VideoPlayer/VideoPlayer';
import { EventTimeContext } from '../../../contexts/EventTime';
import StreamingUrlList from '../../../components/StreamingUrlList/StreamingUrlList';
import { Event_Time_Status } from '@sumilan-app/api';

import './Live.css';

const Live: React.FC<EventComponentProps> = ({ event }) => {
    const { t } = useTranslation();
    const { timeStatus: eventTimeStatus } = useContext(EventTimeContext) as EventTimeContextModel;

    const reloadPage = () => {
        window.location.reload();
    };

    return (
        <IonPage>
            <IonContent
                style={{
                    '--padding-top': '20px',
                }}
            >
                <div style={{ width: '100%', textAlign: 'center' }}>
                    <IonText>
                        <span style={{ verticalAlign: 'sub' }}>{t('EVENT.LIVE.noLive')}</span>
                    </IonText>
                    <IonButton
                        shape="round"
                        fill="clear"
                        onClick={reloadPage}
                    >
                        <IonIcon slot="icon-only" icon={refresh} />
                    </IonButton>
                </div>
                <VideoPlayer
                    videoUrl={event.video_url as string}
                />
                <div>
                    <IonText color="medium">
                        <h4 style={{ marginLeft: 10 }}>{t('EVENT.LIVE.availablePlatforms')}</h4>
                    </IonText>
                    <StreamingUrlList event={event} />
                </div>
                {event.room_url && eventTimeStatus !== Event_Time_Status.Passed ?
                    <div style={{ textAlign: 'center', marginTop: 20 }}>
                        <IonButton href={event.room_url} target="_blank">{t('EVENT.LIVE.networkingButton')}</IonButton>
                    </div>
                    : null
                }
            </IonContent>
        </IonPage>
    );
};

export default Live;