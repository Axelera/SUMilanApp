import { IonButton, IonIcon, IonText } from '@ionic/react';
import { close, ellipse, pause, play } from 'ionicons/icons';
import { useContext } from 'react';

import { VideoPlayerContext } from '../../contexts/VideoPlayer';
import { VideoPlayerContextModel } from '../../models/videoplayer.model';

import './BottomLivePlayer.css';

type Props = {
    isLive?: boolean;
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
    return '0:00';
}

const BottomLivePlayer = ({ isLive }: Props) => {
    const { isVideoPlaying, playedSeconds, videoDuration, toggleVideoPlay, closeBottomPlayer } = useContext(VideoPlayerContext) as VideoPlayerContextModel;

    const onCloseBottomPlayer = () => {
        toggleVideoPlay();
        closeBottomPlayer();
    };

    return (
        <div className="bottom-video-container">
            <IonButton
                fill="clear"
                shape="round"
                onClick={toggleVideoPlay}
            >
                <IonIcon slot="icon-only" icon={isVideoPlaying ? pause : play} />
            </IonButton>
            <span style={{ width: '100%' }}>
                {formatTime(playedSeconds)} {!isLive && videoDuration ? ' / ' + formatTime(videoDuration) : ''}
                {isLive && <IonText color="danger">
                    <span className="live-indicator">
                        In Diretta
                        <IonIcon style={{ fontSize: 10, marginLeft: 5 }} color="danger" className="blinking" icon={ellipse} />
                    </span>
                </IonText>}
            </span>
            <IonButton
                className="close-button"
                fill="clear"
                shape="round"
                onClick={onCloseBottomPlayer}
            >
                <IonIcon slot="icon-only" icon={close} />
            </IonButton>
        </div>
    );
};

export default BottomLivePlayer;