"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { ExtrudeGeometry, type Group } from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { MARK_PATH, MARK_VIEWBOX } from "@/lib/logo";

/** The hexagon mark, extruded from the traced logo path and centred on the origin. */
function useMarkGeometry() {
  return useMemo(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MARK_VIEWBOX}"><path d="${MARK_PATH}"/></svg>`;
    const shapes = new SVGLoader().parse(svg).paths.flatMap((p) => SVGLoader.createShapes(p));
    // Keep bevels inside the narrow gaps between the interlocking logo strokes.
    const geo = new ExtrudeGeometry(shapes, { depth: 50, bevelEnabled: true, bevelThickness: 4, bevelSize: 2, bevelSegments: 4, curveSegments: 24 });
    geo.center();
    // Bring it to ~2.4 world units wide. SVG y runs down, so flip it with a half-turn about X:
    // a negative scale would mirror the mesh, reverse face winding and render the caps black.
    geo.scale(1 / 190, 1 / 190, 1 / 190);
    geo.rotateX(Math.PI);
    return geo;
  }, []);
}

function Mark({ onReady }: { onReady?: () => void }) {
  const ref = useRef<Group>(null);
  const geometry = useMarkGeometry();
  const ready = useRef(false);
  useEffect(() => () => geometry.dispose(), [geometry]);
  useFrame((state) => {
    if (!ready.current) {
      ready.current = true;
      onReady?.();
    }
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    // Sway rather than spin, so the mark stays readable; lean toward the pointer.
    ref.current.rotation.y += (Math.sin(t * 0.45) * 0.45 + state.pointer.x * 0.35 - ref.current.rotation.y) * 0.05;
    ref.current.rotation.x += (-state.pointer.y * 0.3 - ref.current.rotation.x) * 0.05;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.9}>
      <group ref={ref}>
        <mesh geometry={geometry}>
          {/* Glossy candy finish in the logo red. Transmission glass read as near-black over the
              transparent canvas, so the depth comes from clearcoat and the studio lights instead. */}
          <meshPhysicalMaterial color="#ff214f" roughness={0.22} metalness={0.05} clearcoat={1} clearcoatRoughness={0.08} sheen={0.6} sheenColor="#ff6b88" iridescence={0.25} />
        </mesh>
      </group>
    </Float>
  );
}

/** `active` false stops the render loop entirely (used while the hero is scrolled out of view). */
export default function GlassScene({ active = true, onReady }: { active?: boolean; onReady?: () => void }) {
  return (
    <Canvas frameloop={active ? "always" : "never"} dpr={[1, 1.75]} camera={{ position: [0, 0, 6], fov: 40 }} gl={{ alpha: true, antialias: true }}>
      <Mark onReady={onReady} />
      {/* Direct lights so the mark never renders unlit if the environment map fails (seen on software GL). */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} />
      <directionalLight position={[-4, -2, 3]} intensity={0.8} color="#ff6b88" />
      {/* Studio-light environment built in-scene - no external HDR fetch. */}
      <Environment resolution={256}>
        <Lightformer intensity={3} position={[0, 4, -6]} scale={[12, 3, 1]} color="#ffffff" />
        <Lightformer intensity={2} position={[-6, 0, -2]} rotation-y={Math.PI / 2} scale={[10, 4, 1]} color="#ff6b88" />
        <Lightformer intensity={2.5} position={[6, -1, -2]} rotation-y={-Math.PI / 2} scale={[10, 4, 1]} color="#ff214f" />
        <Lightformer intensity={1.5} position={[0, -5, 2]} rotation-x={-Math.PI / 2} scale={[10, 10, 1]} color="#fff4f6" />
      </Environment>
    </Canvas>
  );
}
