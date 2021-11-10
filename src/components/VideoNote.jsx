import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button } from "react-native";
import { Camera } from "expo-camera";
import { Video } from "expo-av";
import RecordingAreaWrapper from "./RecordingAreaWrapper";

const VideoNote = () => {
  const [hasAudioPermission, setHasAudioPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [record, setRecord] = useState(null);
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  //useEffect async new code for video - start
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
      const audioStatus = await Camera.requestMicrophonePermissionsAsync();
      setHasAudioPermission(audioStatus.status === "granted");
    })();
  }, []);

  const takeVideo = async () => {
    if (camera) {
      const data = await camera.recordAsync({
        maxDuration: 600,
        mute: false,
        videoBitrate: 5000000,
      });
      setRecord(data.uri);
      console.log(data.uri);
    }
  };

  const stopVideo = async () => {
    camera.stopRecording();
  };

  if (hasCameraPermission === null || hasAudioPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false || hasAudioPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      {record ? (
        <RecordingAreaWrapper>
          <Video
            ref={video}
            // style={styles.video}

            style={{ width: "100%", height: "100%" }}
            source={{
              uri: record,
            }}
            useNativeControls
            resizeMode="contain"
            // isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
          <View>
            <Button
              title={status.isPlaying ? "Pause" : "Play"}
              onPress={() =>
                status.isPlaying
                  ? video.current.pauseAsync()
                  : video.current.playAsync()
              }
            />
          </View>
        </RecordingAreaWrapper>
      ) : (
        <RecordingAreaWrapper>
          <Camera
            ref={(ref) => setCamera(ref)}
            // style={styles.fixedRatio}
            type={type}
            ratio={"4:3"}
            style={{ width: "100%", height: "100%" }}
          />

          <View style={{ position: "absolute", color: "#fff" }}>
            <Button
              title="Flip Video00"
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            />
          </View>

          <Button
            title="Take video"
            onPress={() => takeVideo()}
            style={{ position: "absolute" }}
          />
          <Button title="Stop Video" onPress={() => stopVideo()} />
        </RecordingAreaWrapper>
      )}
    </>
  );
};

export default VideoNote;
