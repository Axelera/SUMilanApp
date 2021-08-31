import React, { createContext, useState } from "react";

import { VideoPlayerContextModel } from "../models/videoplayer.model";

export const VideoPlayerContext = createContext<VideoPlayerContextModel | null>(null);

export const VideoPlayerProvider: React.FC = ({ children }) => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isVideoEnded, setIsVideoEnded] = useState(false);
    const [isBottomPlayerVisible, setIsBottomPlayerVisible] = useState(false);
    const [playedSeconds, setPlayedSeconds] = useState(0);
    const [videoDuration, setVideoDuration] = useState(0);

    const playVideo = (showBottomPlayer?: boolean) => {
        setIsVideoEnded(false);
        setIsVideoPlaying(true);
        if (showBottomPlayer) {
            setIsBottomPlayerVisible(true);
        }
    };

    const pauseVideo = () => {
        setIsVideoPlaying(false);
    };

    const toggleVideoPlay = () => {
        setIsVideoEnded(false);
        setIsVideoPlaying(prevState => !prevState);
    };

    const openBottomPlayer = () => {
        setIsBottomPlayerVisible(true);
    };

    const closeBottomPlayer = () => {
        setIsBottomPlayerVisible(false);
    };

    const onVideoEnded = () => {
        setIsVideoEnded(true);
        setIsVideoPlaying(false);
    };

    return (
        <VideoPlayerContext.Provider value={{
            isVideoPlaying,
            isBottomPlayerVisible,
            playedSeconds,
            videoDuration,
            isVideoEnded,
            playVideo,
            pauseVideo,
            toggleVideoPlay,
            openBottomPlayer,
            closeBottomPlayer,
            setPlayedSeconds,
            setVideoDuration,
            onVideoEnded,
        }}>
            {children}
        </VideoPlayerContext.Provider>
    );
};