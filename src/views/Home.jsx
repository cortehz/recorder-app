import React, { useState, useEffect, useRef } from "react";
import { Text, View, Button, Image } from "react-native";
import { useTranslation } from "react-i18next";

import { Audio } from "expo-av";

const Home = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [username, setUsername] = React.useState("Johnny boy");

  //recording
  // const [RecordedURI, SetRecordedURI] = useState("");
  // const [AudioPerm, SetAudioPerm] = useState(false);
  // const [isRecording, SetisRecording] = useState(false);
  // const [isPLaying, SetisPLaying] = useState(false);
  // const Player = useRef(new Audio.Sound());

  // useEffect(() => {
  //   GetPermission();
  // }, []);

  // /

  // const stopRecording = async () => {
  //   try {
  //     await recording.stopAndUnloadAsync();
  //     const result = recording.getURI();
  //     SetRecordedURI(result); // Here is the URI
  //     recording = new Audio.Recording();
  //     SetisRecording(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const playSound = async () => {
  //   try {
  //     const result = await Player.current.loadAsync(
  //       { uri: RecordedURI },
  //       {},
  //       true
  //     );

  //     const response = await Player.current.getStatusAsync();
  //     if (response.isLoaded) {
  //       if (response.isPlaying === false) {
  //         Player.current.playAsync();
  //         SetisPLaying(true);
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const stopSound = async () => {
  //   try {
  //     const checkLoading = await Player.current.getStatusAsync();
  //     if (checkLoading.isLoaded === true) {
  //       await Player.current.stopAsync();
  //       SetisPLaying(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <View>
      {/* <Image
        source={require("./hamburger.png")}
        style={{ width: 30, height: 30, marginTop: 10 }}
      /> */}
      <Text>
        {t("hello")} {username}
      </Text>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          onPress={() => navigation.navigate("Notifications")}
          title="Go to notification"
        />
      </View>

      {/* <Button
        title={isRecording ? "Stop Recording" : "Start Recording"}
        onPress={isRecording ? () => stopRecording() : () => startRecording()}
      />
      <Button
        title="Play Sound"
        onPress={isPLaying ? () => stopSound : () => playSound()}
      />
      <Text>{RecordedURI}</Text> */}
    </View>
  );
};

export default Home;
