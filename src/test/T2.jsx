import React from "react";
import Silk from "./Silk";
import "./Silk.css";

const T2 = () => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
      }}
    >
      <Silk
        speed={5}
        scale={1}
        color="##3c3c44"
        noiseIntensity={1}
        rotation={0}
      />
    </div>
  );
};

export default T2;
