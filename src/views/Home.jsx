import React, { useState, useEffect, useRef } from "react";
import { Text, View, Button, Image } from "react-native";
import { useTranslation } from "react-i18next";
import Progress from "./Progress";
import Counter from "../components/CountDown";

const Home = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [username, setUsername] = React.useState("Johnny boy");
  return (
    <View>
      <Text>
        {t("hello")} {username}
      </Text>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          onPress={() => navigation.navigate("Notifications")}
          title="Go to notification"
        />
      </View>

      {/* <Progress /> */}

      <Counter />
    </View>
  );
};

export default Home;
