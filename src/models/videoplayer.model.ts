export interface VideoPlayerContextModel {
    isVideoPlaying: boolean;
    isBottomPlayerVisible: boolean;
    playedSeconds: number;
    videoDuration?: number;
    playVideo: (showBottomPlayer?: boolean) => any;
    pauseVideo: () => any;
    toggleVideoPlay: () => any;
    openBottomPlayer: () => any;
    closeBottomPlayer: () => any;
    setPlayedSeconds: (seconds: number) => any;
    setVideoDuration: (seconds: number) => any;
}