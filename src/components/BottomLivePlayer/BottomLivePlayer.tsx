import { useContext } from 'react';
import { IonButton, IonButtons, IonIcon, IonText, IonTitle, IonToolbar, isPlatform } from '@ionic/react';
import { closeCircle, ellipse, pause, play, reload } from 'ionicons/icons';
import { Link } from 'react-router-dom';

import { VideoPlayerContext } from '../../contexts/VideoPlayer';
import { VideoPlayerContextModel } from '../../models/videoplayer.model';
import { EventTimeContext } from '../../contexts/EventTime';
import { EventTimeContextModel } from '../../models/event.model';
import { EventTimeStatus } from '../../utils/eventTimeUtils';

import './BottomLivePlayer.css';

type Props = {
    eventId: string;
    eventImageUrl: string;
};

const formatTime = (totalSeconds: number) => {
    if (totalSeconds) {
        const rawHours = Math.floor(totalSeconds / 3600);
        const rawMinutes = Math.floor((totalSeconds / 60) % 60);
        const rawSeconds = Math.floor(totalSeconds % 60);

        const hours = rawHours > 0 ? (rawHours < 10 ? `0${rawHours}:` : `${rawHours}:`) : '';
        const minutes = rawMinutes < 10 ? `0${rawMinutes}` : rawMinutes;
        const seconds = rawSeconds < 10 ? `0${rawSeconds}` : rawSeconds;
        return `${hours}${minutes}:${seconds}`;
    }
    return '00:00';
}

const BottomLivePlayer = ({ eventId, eventImageUrl }: Props) => {
    const { isVideoPlaying, playedSeconds, videoDuration, isBottomPlayerVisible, isVideoEnded, pauseVideo, toggleVideoPlay, closeBottomPlayer } = useContext(VideoPlayerContext) as VideoPlayerContextModel;
    const { timeStatus } = useContext(EventTimeContext) as EventTimeContextModel;

    const isLive = timeStatus === EventTimeStatus.TODAY_LIVE;

    const onCloseBottomPlayer = () => {
        pauseVideo();
        closeBottomPlayer();
    };

    return (
        <>
            {isBottomPlayerVisible ? <div className="bottom-video-container">
                <Link to={`/event/${eventId}/live`} style={{ height: '100%' }}>
                    <div className="player-image" style={{ backgroundImage: `url(${eventImageUrl})` }}></div>
                </Link>
                <IonToolbar color="light" className="bottom-toolbar">
                    <IonButtons slot="start">
                        <IonButton
                            color="primary"
                            fill="clear"
                            shape="round"
                            onClick={toggleVideoPlay}
                        >
                            <IonIcon slot="icon-only" icon={isVideoEnded ? reload : (isVideoPlaying ? pause : play)} />
                        </IonButton>
                    </IonButtons>
                    <IonTitle style={{
                        fontSize: 16,
                        paddingLeft: isPlatform('ios') ? 40 : 0,
                        paddingRight: 0,
                    }}>
                        <div className="time-container" style={{
                            flexDirection: isLive ? 'column' : 'row',
                            justifyContent: isLive ? 'center' : 'flex-start',
                            alignItems: isLive ? 'flex-start' : 'center',
                        }}>
                            <div style={{ width: 60, height: 15, fontSize: 15 }}>
                                {formatTime(playedSeconds)}
                            </div>
                            {!isLive && videoDuration && <div style={{ fontSize: 11, height: 16 }}>
                                {' / ' + formatTime(videoDuration)}
                            </div>}
                            {isLive && <div>
                                <IonText color="danger">In Diretta</IonText>
                                <IonIcon style={{ fontSize: 10, marginLeft: 5 }} color="danger" className="blinking" icon={ellipse} />
                            </div>}
                        </div>
                    </IonTitle>
                    <IonButtons slot="end">
                        <IonButton
                            color="dark"
                            size="small"
                            className="close-button"
                            fill="clear"
                            shape="round"
                            onClick={onCloseBottomPlayer}
                        >
                            <IonIcon size="small" slot="icon-only" icon={closeCircle} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </div> : <></>}
        </>
    );
};

export default BottomLivePlayer;