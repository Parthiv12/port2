import React from "react";
import { Canvas } from "@react-three/fiber";
import SilkC from "./SilkC";
import LightRays from "../../backgroundM/LightRays";
import "./t3.css";

const T3 = () => {
  return (
    <div className="t3-wrapper">
      
      {/* BACKGROUND LAYER 1 — Silk Shader */}
      <div className="t3-bg">
        <Canvas
          dpr={[1, 2]}
          frameloop="always"
          gl={{ antialias: true }}
          camera={{ position: [0, 0, 1], fov: 75 }}
        >
          <SilkC />
        </Canvas>
      </div>

      {/* BACKGROUND LAYER 2 — Light Rays Overlay */}
      <div className="t3-rays">
        <LightRays />
      </div>

      {/* FOREGROUND CONTENT */}
      <div className="t3-content">
        <h1 className="t3-title">CRAZY MODE</h1>
        <p>Silk + LightRays + Pulsing RGB + Scroll Fade</p>
      </div>

    </div>
  );
};

export default T3;
