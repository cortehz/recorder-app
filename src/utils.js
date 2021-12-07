export const getMMSSFromMillis = (millis) => {
  const totalSeconds = millis / 1000;
  const seconds = Math.floor(totalSeconds % 60);
  const minutes = Math.floor(totalSeconds / 60);

  const padWithZero = (number) => {
    const string = number.toString();
    if (number < 10) {
      return "0" + string;
    }
    return string;
  };
  return padWithZero(minutes) + ":" + padWithZero(seconds);
};

export const getRecordingTimestamp = (recordingDuration) => {
  if (recordingDuration != null) {
    return `${getMMSSFromMillis(recordingDuration)}`;
  }
  return `${getMMSSFromMillis(0)}`;
};

export const borderColor = (isRecording, recordingUri) => {
  if (isRecording) {
    return "red";
  } else if (recordingUri) {
    return "blue";
  }
};
