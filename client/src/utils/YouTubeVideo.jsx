import React from 'react';
import YouTube from 'react-youtube';

const YouTubeVideo = ({video_id}) => {
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1,
        },
    };

    const onVideoReady = (event) => {
        event.target.pauseVideo();
    };

    return (
        <YouTube videoId={video_id} opts={opts} onReady={onVideoReady} />
    );
};

export default YouTubeVideo;
