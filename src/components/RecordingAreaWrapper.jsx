import React from "react";
import { View } from "react-native";

const RecordingAreaWrapper = ({ children }) => {
  return (
    <View style={{ width: 350, height: 350, position: "relative" }}>
      {children}
    </View>
  );
};

export default RecordingAreaWrapper;
