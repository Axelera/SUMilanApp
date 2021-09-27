import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonIcon,
    IonPage,
    IonRow,
    IonText,
} from '@ionic/react';
import { refresh } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';

import EventHeaderComponent from '../../../components/EventHeader/EventHeaderComponent';
import SocialLinkComponent from '../../../components/SocialLinkComponent/SocialLinkComponent';
import { EventComponentProps, EventStreamingUrlModel } from '../../../models/event.model';
import { SocialLinkType } from '../../../models/types.model';
import VideoPlayer from '../../../components/VideoPlayer/VideoPlayer';

import './Live.css';

const StreamingUrl = (item: { streamingUrl: EventStreamingUrlModel }) => {
    const streamingUrl = item.streamingUrl;
    return (
        <IonCol className="streaming-url-col">
            <SocialLinkComponent url={streamingUrl.url} platform={streamingUrl.platform} color="secondary" />
        </IonCol>
    );
};

const Live: React.FC<EventComponentProps> = (props: EventComponentProps) => {
    const { t } = useTranslation();

    const reloadPage = () => {
        window.location.reload();
    };

    return (
        <IonPage>
            <EventHeaderComponent event={props.event} />
            <IonContent>
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
                    videoUrl={props.event.videoUrl}
                />
                <div>
                    <IonText color="medium">
                        <h4 style={{ marginLeft: 10 }}>{t('EVENT.LIVE.availablePlatforms')}</h4>
                    </IonText>
                    <IonGrid>
                        <IonRow>
                            <StreamingUrl streamingUrl={{
                                platform: SocialLinkType.YOUTUBE,
                                url: props.event.videoUrl as string
                            }} />
                            {props.event.streamingUrls && props.event.streamingUrls.map((streamingUrl: EventStreamingUrlModel, index: number) => <StreamingUrl key={index} streamingUrl={streamingUrl} />)}
                        </IonRow>
                    </IonGrid>
                </div>
                {props.event.roomUrl ?
                    <div style={{ textAlign: 'center', marginTop: 20 }}>
                        <IonButton href={props.event.roomUrl} target="_blank">{t('EVENT.LIVE.networkingButton')}</IonButton>
                    </div>
                    : null
                }
            </IonContent>
        </IonPage>
    );
};

export default Live;