import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonPage,
    IonRow,
    IonText,
} from '@ionic/react';
import ReactPlayer from 'react-player';
import EventHeaderComponent from '../../../components/EventHeader/EventHeaderComponent';
import SocialLinkComponent from '../../../components/SocialLinkComponent/SocialLinkComponent';
import { EventComponentProps, EventStreamingUrlModel } from '../../../models/event.model';
import './Live.css';

const Live: React.FC<EventComponentProps> = (props: EventComponentProps) => {

    const StreamingUrl = (item: { streamingUrl: EventStreamingUrlModel }) => {
        const streamingUrl = item.streamingUrl;
        return (
            <IonCol className="streaming-url-col">
                <SocialLinkComponent url={streamingUrl.url} platform={streamingUrl.platform} color="secondary" />
            </IonCol>
        );
    };

    return (
        <IonPage>
            <EventHeaderComponent event={props.event} />
            <IonContent>
                <ReactPlayer url={props.event.videoUrl} controls={true} width="100%" />
                {props.event.streamingUrls ?
                    <div>
                        <IonText color="medium">
                            <h4 style={{ marginLeft: 10 }}>Trovi lo streaming anche su</h4>
                        </IonText>
                        <IonGrid>
                            <IonRow>
                                {props.event.streamingUrls.map((streamingUrl: EventStreamingUrlModel, index: number) => <StreamingUrl key={index} streamingUrl={streamingUrl} />)}
                            </IonRow>
                        </IonGrid>
                    </div>
                    : null
                }
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