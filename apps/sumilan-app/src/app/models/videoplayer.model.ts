export interface VideoPlayerContextModel {
    isVideoPlaying: boolean;
    isBottomPlayerVisible: boolean;
    playedSeconds: number;
    videoDuration?: number;
    isVideoEnded?: boolean;
    playVideo: (showBottomPlayer?: boolean) => any;
    pauseVideo: () => any;
    toggleVideoPlay: () => any;
    openBottomPlayer: () => any;
    closeBottomPlayer: () => any;
    setPlayedSeconds: (seconds: number) => any;
    setVideoDuration: (seconds: number) => any;
    onVideoEnded: () => any;
}