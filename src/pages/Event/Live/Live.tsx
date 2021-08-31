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
import ReactPlayer from 'react-player';
import EventHeaderComponent from '../../../components/EventHeader/EventHeaderComponent';
import SocialLinkComponent from '../../../components/SocialLinkComponent/SocialLinkComponent';
import { EventModel, EventStreamingUrlModel } from '../../../models/event.model';
import './Live.css';

type Props = {
    event: EventModel;
    isVideoPlaying?: boolean;
    onPlayVideo: () => any;
    onPauseVideo: () => any;
    onPlayedSeconds: (seconds: number) => any;
    onVideoDuration: (duration: number) => any;
};

const Live: React.FC<Props> = (props: Props) => {

    const StreamingUrl = (item: { streamingUrl: EventStreamingUrlModel }) => {
        const streamingUrl = item.streamingUrl;
        return (
            <IonCol className="streaming-url-col">
                <SocialLinkComponent url={streamingUrl.url} platform={streamingUrl.platform} color="secondary" />
            </IonCol>
        );
    };

    const reloadPage = () => {
        window.location.reload();
    };

    const onPlayVideo = () => {
        props.onPlayVideo();
    };

    const onPauseVideo = () => {
        props.onPauseVideo();
    };

    const onVideoProgress = ({ playedSeconds }: any) => {
        if (props.onPlayedSeconds) {
            props.onPlayedSeconds(playedSeconds);
        }
    };

    const onVideoDuration = (seconds: number) => {
        props.onVideoDuration(seconds);
    };

    return (
        <IonPage>
            <EventHeaderComponent event={props.event} />
            <IonContent>
                <div style={{ width: '100%', textAlign: 'center' }}>
                    <IonText>
                        <span style={{ verticalAlign: 'sub' }}>Non vedi la diretta?</span>
                    </IonText>
                    <IonButton
                        shape="round"
                        fill="clear"
                        onClick={reloadPage}
                    >
                        <IonIcon slot="icon-only" icon={refresh} />
                    </IonButton>
                </div>
                <ReactPlayer
                    url={props.event.videoUrl}
                    playing={props.isVideoPlaying}
                    controls={true}
                    width="100%"
                    onPlay={onPlayVideo}
                    onPause={onPauseVideo}
                    onProgress={onVideoProgress}
                    onDuration={onVideoDuration}
                />
                <div>
                    <IonText color="medium">
                        <h4 style={{ marginLeft: 10 }}>Trovi lo streaming anche su</h4>
                    </IonText>
                    <IonGrid>
                        <IonRow>
                            <StreamingUrl streamingUrl={{
                                platform: 'youtube',
                                url: props.event.videoUrl as string
                            }} />
                            {props.event.streamingUrls && props.event.streamingUrls.map((streamingUrl: EventStreamingUrlModel, index: number) => <StreamingUrl key={index} streamingUrl={streamingUrl} />)}
                        </IonRow>
                    </IonGrid>
                </div>
                {props.event.roomUrl ?
                    <div style={{ textAlign: 'center', marginTop: 20 }}>
                        <IonButton href={props.event.roomUrl} target="_blank">Stanza networking</IonButton>
                    </div>
                    : null
                }
            </IonContent>
        </IonPage>
    );
};

export default Live;