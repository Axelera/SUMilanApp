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
import { useContext } from 'react';

import EventHeaderComponent from '../../../components/EventHeader/EventHeaderComponent';
import SocialLinkComponent from '../../../components/SocialLinkComponent/SocialLinkComponent';
import { VideoPlayerContext } from '../../../contexts/VideoPlayer';
import { EventComponentProps, EventStreamingUrlModel } from '../../../models/event.model';
import { VideoPlayerContextModel } from '../../../models/videoplayer.model';

import './Live.css';

const Live: React.FC<EventComponentProps> = (props: EventComponentProps) => {
    const { isVideoPlaying, playVideo, pauseVideo, setPlayedSeconds, setVideoDuration, onVideoEnded } = useContext(VideoPlayerContext) as VideoPlayerContextModel;

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

    const onVideoProgress = ({ playedSeconds }: any) => {
        setPlayedSeconds(playedSeconds);
    };

    const onVideoDuration = (seconds: number) => {
        setVideoDuration(seconds);
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
                    playing={isVideoPlaying}
                    controls={true}
                    width="100%"
                    onPlay={playVideo.bind(this, true)}
                    onPause={pauseVideo}
                    onProgress={onVideoProgress}
                    onDuration={onVideoDuration}
                    onEnded={onVideoEnded}
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