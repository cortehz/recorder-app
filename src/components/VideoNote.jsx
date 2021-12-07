import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Camera } from "expo-camera";
import { Video } from "expo-av";
import RecordingAreaWrapper from "./RecordingAreaWrapper";
import { borderColor } from "../utils";
import { CameraContext } from "../store/CameraContext";

const VideoNote = () => {
  const [cameraOn, setCameraOn] = useContext(CameraContext);
  const [hasAudioPermission, setHasAudioPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [record, setRecord] = useState(null);
  const [isRecording, setIsRecording] = useState(null);
  const [muted, setMuted] = useState(false);
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [duration, setDuration] = useState(0);

  //useEffect async new code for video - start
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
      const audioStatus = await Camera.requestMicrophonePermissionsAsync();
      setHasAudioPermission(audioStatus.status === "granted");
    })();
  }, []);
  // const timer = setInterval(() => {
  //   setDuration(duration + 1);
  // }, 1000);

  const takeVideo = async () => {
    if (camera) {
      const data = await camera.recordAsync({
        maxDuration: 6,
        mute: muted,
        videoBitrate: 5000000,
      });
      setIsRecording(true);

      // timer();

      setRecord(data.uri);
      console.log(data);
    }
  };

  const stopVideo = async () => {
    camera.stopRecording();
    setIsRecording(false);
    // clearInterval(timer);
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
            style={{
              width: "100%",
              height: "100%",
              borderColor: borderColor(isRecording, !isRecording),
            }}
            source={{
              uri: record,
            }}
            useNativeControls
            resizeMode="contain"
            // isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
          <View
            style={{
              position: "absolute",
              color: "#fff",
              right: "50%",
              top: "35%",
            }}
          >
            <Button
              title={status.isPlaying ? "Pause" : "Play"}
              onPress={() =>
                status.isPlaying
                  ? video.current.pauseAsync()
                  : video.current.playAsync()
              }
            />
          </View>

          <View style={{}}>
            <Button title="Clear" onPress={() => setRecord(null)} />
          </View>
        </RecordingAreaWrapper>
      ) : (
        <RecordingAreaWrapper>
          <View
            style={{
              borderColor: borderColor(isRecording, !isRecording),
            }}
          >
            <Camera
              ref={(ref) => setCamera(ref)}
              // style={styles.fixedRatio}
              type={type}
              ratio={"4:3"}
              style={{
                width: "100%",
                height: "100%",
                borderColor: borderColor(isRecording, !isRecording),
              }}
            />
          </View>

          <View
            style={{
              position: "absolute",
              color: "#fff",
              right: 10,
              top: "20%",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
              style={styles.icons}
            >
              <Image source={require("./assets/settings-4-line.png")} />
            </TouchableOpacity>
            <TouchableOpacity
              title="settings"
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
              style={styles.icons}
            >
              <Image source={require("./assets/camera-switch-line.png")} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setMuted((prev) => !prev);
              }}
              style={styles.icons}
            >
              {muted ? (
                <Image source={require("./assets/mic-line.png")} />
              ) : (
                <Image source={require("./assets/mic-off-line.png")} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setCameraOn((prev) => !prev);
              }}
              style={styles.icons}
            >
              <Image source={require("./assets/vidicon-line.png")} />
            </TouchableOpacity>
          </View>

          <Text>{duration}</Text>
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

export const styles = StyleSheet.create({
  icons: {
    marginTop: 10,
    marginBottom: 10,
  },
});
