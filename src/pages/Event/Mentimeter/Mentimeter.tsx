import {
    IonButton,
    IonContent,
    IonPage,
} from '@ionic/react';
import { DateTime } from 'luxon';

import BottomLivePlayer from '../../../components/BottomLivePlayer/BottomLivePlayer';
import EventHeaderComponent from '../../../components/EventHeader/EventHeaderComponent';
import { EventComponentProps } from '../../../models/event.model';
import { EventTimeStatus, getEventTimeStatus } from '../../../utils/eventTimeUtils';

const Mentimeter: React.FC<EventComponentProps> = (props: EventComponentProps) => {
    return (
        <IonPage>
            <EventHeaderComponent event={props.event} />
            <IonContent>
                <div style={{ width: '100%', textAlign: 'center', margin: '20px 0' }}>
                    <IonButton
                        href={props.event.votingUrl}
                        target="_blank"
                    >
                        Non riesci a vedere le domande?
                    </IonButton>
                </div>
                <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
                    <iframe
                        title={`menti-${props.event.id}`}
                        sandbox='allow-scripts allow-same-origin'
                        allowFullScreen={true}
                        height='100%'
                        width='100%'
                        src={props.event.votingUrl}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', }}
                    ></iframe>
                </div>
                {props.showBottomPlayer && <div style={{ height: 120 }}></div>}
            </IonContent>
            {props.showBottomPlayer && <BottomLivePlayer
                isLive={getEventTimeStatus(DateTime.fromISO(props.event.date), props.event.duration) === EventTimeStatus.TODAY_LIVE}
                isVideoPlaying={props.isVideoPlaying}
                playedSeconds={props.playedSeconds as number}
                onTogglePlaying={props.onToggleVideoPlaying}
                onCloseBottomPlayer={props.onCloseBottomPlayer}
                videoDuration={props.videoDuration}
            />}
        </IonPage>
    );
};

export default Mentimeter;