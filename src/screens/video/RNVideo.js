import React from 'react';
import {Platform} from 'react-native';
import VideoPlayer from 'react-native-video-player-hp';
import Video from 'react-native-video';

export default function RNVideo(props) {
  const {uri} = props;

  if (Platform.OS === 'android') {
    return <VideoPlayer url={uri} rotateToFullScreen={true} />;
  }

  return (
    <Video
      source={{uri}}
      controls
      paused
      style={{
        width: '100%',
        height: 200,
        backgroundColor: 'black',
        borderRadius: 20,
        overflow: 'hidden',
      }}
      resizeMode="contain"
    />
  );
}
