/* eslint-disable react/no-unknown-property */
import { useFrame, useThree } from "@react-three/fiber";
import { forwardRef, useMemo, useRef, useLayoutEffect } from "react";
import { Color } from "three";

// convert hex → RGB
const hexToRGB = (hex) => {
  hex = hex.replace("#", "");
  return [
    parseInt(hex.slice(0, 2), 16) / 255,
    parseInt(hex.slice(2, 4), 16) / 255,
    parseInt(hex.slice(4, 6), 16) / 255,
  ];
};

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
uniform float uTime;
uniform vec3  uColor;

void main() {
  float wave = sin(vUv.y * 10.0 + uTime * 1.5) * 0.3;
  vec3 finalColor = uColor + wave;
  gl_FragColor = vec4(finalColor, 1.0);
}
`;

const Plane = forwardRef(function Plane({ uniforms }, ref) {
  const { viewport } = useThree();

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.scale.set(viewport.width, viewport.height, 1);
    }
  }, [viewport]);

  useFrame((_, delta) => {
    uniforms.uTime.value += delta;
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
});

const SilkC = () => {
  const ref = useRef();

  const uniforms = useMemo(() => {
    return {
      uTime: { value: 0 },
      uColor: { value: new Color(...hexToRGB("#7B7481")) },
    };
  }, []);

  // animate color pulse
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const r = (Math.sin(t * 0.6) + 1) / 2;
    const g = (Math.sin(t * 0.9 + 2) + 1) / 2;
    const b = (Math.sin(t * 1.2 + 4) + 1) / 2;
    uniforms.uColor.value.setRGB(r, g, b);
  });

  // ❗ IMPORTANT: DO NOT RETURN CANVAS HERE  
  return <Plane ref={ref} uniforms={uniforms} />;
};

export default SilkC;
