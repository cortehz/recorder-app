import React, { useState, useEffect, useContext } from "react";
import { Camera } from "expo-camera";
import { View, TouchableOpacity, Button, Text, Image } from "react-native";
import { Audio } from "expo-av";
import RecordingAreaWrapper from "./RecordingAreaWrapper";
import { CameraContext } from "../store/CameraContext";
import { getRecordingTimestamp, borderColor } from "../utils";
import Svg, { Path, Rect } from "react-native-svg";
import { CameraIcon } from "./Icons";
import { styles } from "./VideoNote";

let recording = new Audio.Recording();

const AudioNote = () => {
  const [hasAudioPermission, setHasAudioPermission] = useState(null);
  const [recordingAudio, setRecordingAudio] = useState(null);
  const [recordingAudioUri, setRecordingAudioUri] = useState(null);
  const [audioSound, setAudioSound] = useState(null);
  const [duration, setDuration] = useState(null);
  const [metering, setMetering] = useState(null);
  const [recordingState, setRecordingState] = useState({
    isRecording: null,
    recordingDuration: null,
    ismetering2: 0,
  });
  const [cameraOn, setCameraOn] = useContext(CameraContext);

  //audio recording
  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      await recording.prepareToRecordAsync({
        maxDuration: 6,
        quality: Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
        isMeteringEnabled: true,
        android: {
          extension: ".m4a",
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
        ios: {
          extension: ".caf",
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
      });

      recording.setOnRecordingStatusUpdate(_updateScreenForRecordingStatus);

      await recording.startAsync();
      setRecordingAudio(true);

      const status = await recording.getStatusAsync();
      console.log(status);
      if (status.isRecording) {
        setDuration(status.durationMillis);
        setMetering(status.metering);
      }
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    try {
      const status = await recording.getStatusAsync();
      console.log(status);
      if (status.isRecording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecordingAudioUri(uri);
      }
      // await recording.stopAndUnloadAsync();

      setRecordingAudio(false);
    } catch (error) {
      console.error("Failed to stop recording", error);
    }
  }

  async function pauseRecording() {
    console.log("Pausing recording..");

    try {
      await recording.pauseAsync();
      const pause = await recording.getStatusAsync();
      setRecordingAudio(false);
      console.log(pause);
    } catch (error) {
      console.log(error);
    }

    recording.getStatusAsync();

    console.log("Recording paused");
  }

  async function playSound() {
    try {
      const { sound } = await Audio.Sound.createAsync({
        uri: recordingAudioUri,
      });
      setAudioSound(sound);

      console.log("Playing Sound");
      await sound.playAsync();
    } catch (error) {
      // An error occurred!
      console.log("something happened");
    }
  }

  const _updateScreenForRecordingStatus = (status) => {
    if (status.canRecord) {
      setRecordingState({
        isRecording: status.isRecording,
        recordingDuration: status.durationMillis,
        ismetering2: status.metering,
      });
    } else if (status.isDoneRecording) {
      setRecordingState({
        isRecording: false,
        recordingDuration: status.durationMillis,
        ismetering2: status.metering,
      });
    }
  };

  useEffect(() => {
    (async () => {
      const audioStatus = await Camera.requestMicrophonePermissionsAsync();
      setHasAudioPermission(audioStatus.status === "granted");
    })();
  }, []);

  return (
    <>
      <RecordingAreaWrapper>
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#ccc",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: `${
              recordingState.isRecording || recordingAudioUri ? 2 : 0
            }`,

            borderColor: borderColor(
              recordingState.isRecording,
              recordingAudioUri
            ),
          }}
        >
          <Text style={{ fontSize: 24 }}>600</Text>
        </View>

        <View
          style={{
            position: "absolute",
            color: "#fff",
            right: 10,
            top: "20%",
          }}
        >
          <TouchableOpacity onPress={() => {}} style={styles.icons}>
            <Image source={require("./assets/settings-4-line.png")} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCameraOn((prev) => !prev);
            }}
            style={styles.icon}
          >
            <Image source={require("./assets/video-add-line.png")} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setCameraOn((prev) => !prev);
            }}
            style={styles.icons}
          >
            <Image source={require("./assets/mic-off-line.png")} />
          </TouchableOpacity>
        </View>
      </RecordingAreaWrapper>
      <Text>{getRecordingTimestamp(recordingState.recordingDuration)}</Text>
      <Text>
        {recordingState.ismetering2 !== 0
          ? recordingState.ismetering2
          : Math.abs(recordingState.ismetering2)}
      </Text>
      <Svg width="100" height="10" style={{ marginTop: -10 }}>
        <Rect width="100" height="10" fill="#ccc" rx="0" ry="0"></Rect>
        <Rect width="20" height="10" fill="#0078bc" rx="0" ry="0"></Rect>
      </Svg>
      <View>
        <Button
          title={recordingAudio ? "Stop Recording" : "Start Recording"}
          onPress={recordingAudio ? stopRecording : startRecording}
        />
      </View>
      {recordingAudioUri ? (
        <Button title="Play audio" onPress={playSound} />
      ) : null}
    </>
  );
};

export default AudioNote;
