import React, { useState, useEffect } from "react";
import { Text } from "react-native";

const Counter = () => {
  const [isResendEnable, setisResendEnable] = useState(true);
  const [timerCount, setTimer] = useState(20);
  const [activator, setActivator] = useState(Math.random());
  useEffect(() => {
    let interval;
    if (isResendEnable) {
      interval = setInterval(() => {
        if (timerCount > 0) {
          setTimer((lastTimerCount) => {
            lastTimerCount <= 1 && clearInterval(interval);
            return lastTimerCount - 1;
          });
        }
      }, 1000);
    }

    return () => {
      if (isResendEnable) {
        clearInterval(interval);
      }
    };
  }, [activator]);

  return <Text> Resend in {timerCount} sec </Text>;
};

export default Counter;
