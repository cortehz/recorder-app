import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Button, Text } from "react-native";
import { Camera } from "expo-camera";
import { Audio } from "expo-av";
import RecordingAreaWrapper from "./RecordingAreaWrapper";
import RecordingButton from "./RecordingButton";

const AudioNote = () => {
  const [hasAudioPermission, setHasAudioPermission] = useState(null);
  const [recordingAudio, setRecordingAudio] = useState(null);
  const [recordingAudioUri, setRecordingAudioUri] = useState(null);
  const [audioSound, setAudioSound] = useState(null);

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
      const { recording } = await Audio.Recording.createAsync({
        maxDuration: 600,
        quality: Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
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
      setRecordingAudio(recording);

      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecordingAudio(undefined);
    await recordingAudio.stopAndUnloadAsync();
    const uri = recordingAudio.getURI();

    setRecordingAudioUri(uri);
    console.log("Recording stopped and stored at", uri);
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

  useEffect(() => {
    (async () => {
      const audioStatus = await Camera.requestMicrophonePermissionsAsync();
      setHasAudioPermission(audioStatus.status === "granted");
    })();
  }, []);

  return (
    <>
      <RecordingAreaWrapper>
        <View style={{ width: "100%", height: "100%" }}>
          <Text style={{ fontSize: 24 }}>600</Text>
        </View>
      </RecordingAreaWrapper>
      {/* <TouchableOpacity
        style={{
          backgroundColor: "red",
          width: "100%",
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
        onPress={() => {}}
      > */}
      <View>
        <Button
          title={recordingAudio ? "Stop Recording" : "Start Recording"}
          onPress={recordingAudio ? stopRecording : startRecording}
        />
      </View>
      {/* </TouchableOpacity> */}
      {recordingAudioUri ? (
        <Button title="Play audio" onPress={playSound} />
      ) : null}
    </>
  );
};

export default AudioNote;
