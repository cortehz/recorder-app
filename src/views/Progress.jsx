import React, { useEffect, useState, useRef } from "react";
import { Text, View, StyleSheet, Animated, Button } from "react-native";
import Constants from "expo-constants";

const Progress = () => {
  const counter = useRef(new Animated.Value(0)).current;
  const countInterval = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    countInterval.current = setInterval(() => setCount((old) => old + 1), 1000);
    return () => {
      clearInterval(countInterval);
    };
  }, []);

  useEffect(() => {
    load(count);
    if (count >= 600) {
      setCount(600);
      clearInterval(countInterval);
    }
  }, [count]);

  const load = (count) => {
    Animated.timing(counter, {
      toValue: count,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const width = counter.interpolate({
    inputRange: [600, 0],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <Text>Loading....</Text>
      <View style={styles.progressBar}>
        <Animated.View
          style={
            ([StyleSheet.absoluteFill], { backgroundColor: "#8BED4F", width })
          }
        ></Animated.View>
        <Text style={{ color: "#000" }}>{count}%</Text>
      </View>
    </View>
  );
};

export default Progress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  progressBar: {
    height: 20,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "white",
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 5,
  },
});
