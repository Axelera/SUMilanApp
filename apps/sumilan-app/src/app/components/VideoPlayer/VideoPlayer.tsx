import { useContext } from "react";
import { IonIcon } from "@ionic/react";
import { ellipsisHorizontal } from "ionicons/icons";
import ReactPlayer from "react-player";
import { Resizable } from "re-resizable";

import { VideoPlayerContext } from "../../contexts/VideoPlayer";
import { VideoPlayerContextModel } from "../../models/videoplayer.model";

import './VideoPlayer.css';

type Props = {
    videoUrl?: string;
};

const INITIAL_HEIGHT = 360;

const VideoPlayer: React.FC<Props> = ({ videoUrl }) => {
    const { isVideoPlaying, playVideo, pauseVideo, setPlayedSeconds, setVideoDuration, onVideoEnded } = useContext(VideoPlayerContext) as VideoPlayerContextModel;

    const onVideoProgress = ({ playedSeconds }: any) => {
        setPlayedSeconds(playedSeconds);
    };

    const onVideoDuration = (seconds: number) => {
        setVideoDuration(seconds);
    };

    return (
        <Resizable
            defaultSize={{
                width: '100%',
                height: INITIAL_HEIGHT,
            }}
            minHeight={INITIAL_HEIGHT}
            minWidth="100%"
            maxWidth="100%"
            bounds="window"
            enable={{
                top: false,
                right: false,
                bottom: true,
                left: false,
                topRight: false,
                bottomRight: false,
                bottomLeft: false,
                topLeft: false,
            }}
            handleComponent={{
                bottom: (
                    <div className="bottom-handle-container">
                        <IonIcon icon={ellipsisHorizontal} />
                    </div>
                ),
            }}
        >
            <ReactPlayer
                url={videoUrl}
                playing={isVideoPlaying}
                controls={true}
                width="100%"
                height="100%"
                onPlay={playVideo.bind(this, true)}
                onPause={pauseVideo}
                onProgress={onVideoProgress}
                onDuration={onVideoDuration}
                onEnded={onVideoEnded}
            />
        </Resizable>
    );
};

export default VideoPlayer;