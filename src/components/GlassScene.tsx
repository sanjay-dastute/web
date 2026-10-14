"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

function Sculpture() {
  const ref = useRef<Mesh>(null);
  useFrame((state, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.15;
    // Lean gently toward the pointer.
    ref.current.rotation.x += (state.pointer.y * 0.35 - ref.current.rotation.x) * 0.04;
    ref.current.rotation.z += (-state.pointer.x * 0.25 - ref.current.rotation.z) * 0.04;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={ref} scale={1.15}>
        <torusKnotGeometry args={[1, 0.36, 220, 40, 2, 3]} />
        <MeshTransmissionMaterial
          samples={6}
          resolution={512}
          thickness={1.2}
          roughness={0.05}
          transmission={1}
          ior={1.35}
          chromaticAberration={0.06}
          anisotropy={0.2}
          distortion={0.25}
          distortionScale={0.4}
          temporalDistortion={0.08}
          color="#eef4fb"
          background={undefined}
        />
      </mesh>
    </Float>
  );
}

export default function GlassScene() {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 6], fov: 40 }} gl={{ alpha: true, antialias: true }}>
      <Sculpture />
      {/* Studio-light environment built in-scene - no external HDR fetch. */}
      <Environment resolution={256}>
        <Lightformer intensity={3} position={[0, 4, -6]} scale={[12, 3, 1]} color="#ffffff" />
        <Lightformer intensity={2} position={[-6, 0, -2]} rotation-y={Math.PI / 2} scale={[10, 4, 1]} color="#bcd3ee" />
        <Lightformer intensity={2} position={[6, -1, -2]} rotation-y={-Math.PI / 2} scale={[10, 4, 1]} color="#426188" />
        <Lightformer intensity={1.5} position={[0, -5, 2]} rotation-x={-Math.PI / 2} scale={[10, 10, 1]} color="#e9f1f9" />
      </Environment>
    </Canvas>
  );
}
