// GlitteringStars.jsx
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function GlitteringStars({ count = 2000 }) {
  const mesh = useRef();

  const { positions, opacities } = useMemo(() => {
    const positions = [];
    const opacities = [];

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 300;
      const y = (Math.random() - 0.5) * 300;
      const z = -Math.random() * 300;
      positions.push(x, y, z);
      opacities.push(Math.random());
    }

    return {
      positions: new Float32Array(positions),
      opacities: new Float32Array(opacities),
    };
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const attr = mesh.current.geometry.attributes;
    for (let i = 0; i < count; i++) {
      attr.opacity.array[i] = 0.5 + 0.5 * Math.sin(time * 2 + i);
    }
    attr.opacity.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-opacity"
          array={opacities}
          count={opacities.length}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1.2}
        color="white"
        sizeAttenuation
        transparent
      />
    </points>
  );
}
