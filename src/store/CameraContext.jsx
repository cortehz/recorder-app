import React, { useState, createContext } from "react";
import { Camera } from "expo-camera";

export const CameraContext = createContext();

export const CameraProvider = ({ children }) => {
  const [cameraOn, setCameraOn] = useState(true);

  return (
    <CameraContext.Provider value={[cameraOn, setCameraOn]}>
      {children}
    </CameraContext.Provider>
  );
};
