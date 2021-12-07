import React, { useEffect, useState, useRef, useContext } from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";
import { Video, Audio, AVPlaybackStatus } from "expo-av";
import VideoNote from "../components/VideoNote";
import AudioNote from "../components/AudioNote";
import { CameraContext } from "../store/CameraContext";

const CreateNote = () => {
  const [cameraOn, setCameraOn] = useContext(CameraContext);

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {cameraOn ? <VideoNote /> : <AudioNote />}
        {/* <TouchableOpacity
          // style={styles.button}
          onPress={() => {
            setCameraOn((prev) => !prev);
          }}
        >
          {cameraOn ? <Text>Turnoff camera</Text> : <Text>Turnon camera</Text>}
        </TouchableOpacity> */}
      </View>
    </>
  );
};

export default CreateNote;
