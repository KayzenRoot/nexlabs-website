"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  BufferGeometry,
  CatmullRomCurve3,
  Color,
  DoubleSide,
  ExtrudeGeometry,
  Float32BufferAttribute,
  Group,
  Mesh,
  MeshPhysicalMaterial,
  TubeGeometry,
  Vector3,
} from "three";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { precisionBladesGeometry, precisionBladesTransform } from "../brand/precision-blades";
import { getMotionScale, livingOrganismMotion } from "../experience/living-organism";
import type { HeroQualityTier } from "../experience/quality-tier";
import styles from "./static-hero.module.css";

interface HeroSceneProps {
  tier: Exclude<HeroQualityTier, "STATIC">;
  onReady: () => void;
  onFailure: (reason: unknown) => void;
}

/**
 * Synchronizes the render loop with page visibility and converts WebGL context
 * loss into the shared scene-failure path.
 */
function SceneLifecycle({ onFailure }: Pick<HeroSceneProps, "onFailure">) {
  const { gl, setFrameloop } = useThree();

  useEffect(() => {
    const syncVisibility = () => {
      setFrameloop(document.visibilityState === "hidden" ? "never" : "always");
    };
    const onContextLost = (event: Event) => {
      event.preventDefault();
      onFailure(new Error("The WebGL context was lost."));
    };

    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    gl.domElement.addEventListener("webglcontextlost", onContextLost, false);

    return () => {
      document.removeEventListener("visibilitychange", syncVisibility);
      gl.domElement.removeEventListener("webglcontextlost", onContextLost, false);
    };
  }, [gl, onFailure, setFrameloop]);

  return null;
}

/**
 * Builds the extruded 3D N directly from the canonical Precision Blades SVG
 * geometry so flat and spatial brand forms stay structurally aligned.
 */
function useHeroGeometry() {
  return useMemo(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 335 335"><path d="${precisionBladesGeometry.silhouette}" transform="${precisionBladesTransform}" /></svg>`;
    const paths = new SVGLoader().parse(svg).paths;
    const shapes = paths.flatMap((path) => path.toShapes());
    const geometry = new ExtrudeGeometry(shapes, {
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 1.6,
      bevelThickness: 1.2,
      curveSegments: 2,
      depth: 8,
      steps: 1,
    });

    geometry.center();
      geometry.scale(0.0115, -0.0115, 0.0115);
    geometry.computeVertexNormals();
    return geometry;
  }, []);
}

/** Renders the selected Precision Blades N with tier-scaled living motion. */
function PrecisionBladesN({ tier }: { tier: HeroSceneProps["tier"] }) {
  const geometry = useHeroGeometry();
  const mark = useRef<Mesh>(null);
  const material = useMemo(
    () =>
      new MeshPhysicalMaterial({
        color: new Color("#dce8f5"),
        metalness: 0.82,
        roughness: 0.2,
        clearcoat: 0.9,
        clearcoatRoughness: 0.15,
        emissive: new Color("#144d9d"),
        emissiveIntensity: 0.12,
        side: DoubleSide,
      }),
    [],
  );

  useFrame(({ clock }, delta) => {
    if (!mark.current) return;
    const amplitude = getMotionScale(tier);
    mark.current.position.y = Math.sin(clock.elapsedTime * 0.43) * 0.025 * amplitude;
    material.emissiveIntensity = 0.08 + (0.05 * (1 + Math.sin(clock.elapsedTime * 0.6))) / 2;
    material.roughness = 0.18 + Math.min(delta, 0.05) * 0.08;
  });

  return (
    <mesh
      ref={mark}
      geometry={geometry}
      material={material}
      position={[3.2, 0.28, 0.22]}
      scale={1}
      castShadow={false}
      receiveShadow={false}
    />
  );
}

/** Renders the luminous portal chamber and structural energy rails around the N. */
function Chamber({ tier }: { tier: HeroSceneProps["tier"] }) {
  const rails = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (rails.current) {
      rails.current.rotation.z = Math.sin(clock.elapsedTime * 0.21) * 0.008;
    }
  });

  return (
    <group position={[3.2, 0.15, -0.8]}>
      <group ref={rails}>
        {[1.85, 2.05, 2.42].map((radius, index) => (
          <mesh
            key={radius}
            position={[0, index === 2 ? 1.82 : index === 0 ? -1.62 : 1.31, 0]}
            rotation={[0.06, 0, 0]}
          >
            <torusGeometry args={[radius, index === 1 ? 0.025 : 0.04, 8, tier === "FULL" ? 112 : 56]} />
            <meshBasicMaterial
              color={index === 1 ? "#54dfff" : "#287cff"}
              transparent
              opacity={index === 1 ? 0.8 : 0.55}
            />
          </mesh>
        ))}
        {Array.from({ length: tier === "FULL" ? 18 : 10 }, (_, index) => {
          const angle = (index / (tier === "FULL" ? 18 : 10)) * Math.PI * 2;
          const radius = 2.18;
          return (
            <mesh
              key={index}
              position={[Math.cos(angle) * radius, 0.12, Math.sin(angle) * 0.28]}
            >
              <boxGeometry args={[0.018, 3.45, 0.018]} />
              <meshBasicMaterial color="#4e9bff" transparent opacity={0.24} />
            </mesh>
          );
        })}
      </group>
      <pointLight color="#42cfff" intensity={tier === "FULL" ? 9 : 5} distance={8} position={[0, 0.3, 1.5]} />
      <pointLight color="#315fff" intensity={tier === "FULL" ? 7 : 3.5} distance={9} position={[-2.2, 1.3, -0.2]} />
    </group>
  );
}

/** Renders the slowly evolving globe/network motif required by the Home master. */
function GlobalNetwork({ tier }: { tier: HeroSceneProps["tier"] }) {
  const globe = useRef<Group>(null);

  useFrame((_, delta) => {
    if (globe.current) globe.current.rotation.y += delta * livingOrganismMotion.globeRotation;
  });

  return (
    <group ref={globe} position={[-2.45, 0.25, -1.4]}>
      <mesh>
        <sphereGeometry args={[0.82, tier === "FULL" ? 26 : 16, tier === "FULL" ? 18 : 12]} />
        <meshBasicMaterial color="#278dff" wireframe transparent opacity={0.2} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0.35, 0]}>
        <torusGeometry args={[0.84, 0.009, 4, 72]} />
        <meshBasicMaterial color="#54dfff" transparent opacity={0.65} />
      </mesh>
      <mesh rotation={[0.38, 0, 0.18]}>
        <torusGeometry args={[0.88, 0.008, 4, 72]} />
        <meshBasicMaterial color="#3989ff" transparent opacity={0.44} />
      </mesh>
      <pointLight color="#299bff" intensity={tier === "FULL" ? 1.5 : 0.7} distance={3} />
    </group>
  );
}

/** Renders one circulating energy path and its travelling light node. */
function EnergyFilament({
  index,
  tier,
}: {
  index: number;
  tier: HeroSceneProps["tier"];
}) {
  const node = useRef<Mesh>(null);
  const curve = useMemo(() => {
    const sign = index % 2 === 0 ? 1 : -1;
    return new CatmullRomCurve3([
      new Vector3(-8, -1.4 + index * 0.28, -1.8),
      new Vector3(-4.5, 1.4 * sign, -0.6),
      new Vector3(-0.6, -1.1 * sign, 1.4),
      new Vector3(3.1, 1.4 + index * 0.2, -0.7),
      new Vector3(8.2, -0.3 + index * 0.38, 0.8),
    ]);
  }, [index]);
  const geometry = useMemo(() => new TubeGeometry(curve, 96, 0.011, 5, false), [curve]);
  const speed = livingOrganismMotion.energyFlowPerSecond * (1 + index * 0.11);

  useFrame(({ clock }) => {
    if (!node.current) return;
    const progress = (clock.elapsedTime * speed + index * 0.23) % 1;
    node.current.position.copy(curve.getPointAt(progress));
  });

  return (
    <group>
      <mesh geometry={geometry}>
        <meshBasicMaterial color={index % 2 === 0 ? "#1c78ff" : "#56e5ff"} transparent opacity={tier === "FULL" ? 0.48 : 0.28} />
      </mesh>
      <mesh ref={node}>
        <sphereGeometry args={[tier === "FULL" ? 0.045 : 0.03, 8, 6]} />
        <meshBasicMaterial color="#b5f7ff" />
      </mesh>
    </group>
  );
}

/** Adds a deliberately simple human silhouette to establish environmental scale. */
function HumanScaleFigure() {
  return (
    <group position={[0.28, -1.65, 0.7]}>
      <mesh position={[0, 0.65, 0]}>
        <sphereGeometry args={[0.105, 8, 6]} />
        <meshBasicMaterial color="#02050a" />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <capsuleGeometry args={[0.12, 0.48, 3, 7]} />
        <meshStandardMaterial color="#050a13" metalness={0.28} roughness={0.62} />
      </mesh>
      <mesh position={[0, -0.13, 0.015]} rotation={[0, 0, 0.04]}>
        <boxGeometry args={[0.075, 0.34, 0.095]} />
        <meshStandardMaterial color="#03060b" />
      </mesh>
      <mesh position={[0.13, -0.13, 0.015]} rotation={[0, 0, -0.04]}>
        <boxGeometry args={[0.075, 0.34, 0.095]} />
        <meshStandardMaterial color="#03060b" />
      </mesh>
      <mesh position={[0, 0.23, 0.11]}>
        <boxGeometry args={[0.02, 0.34, 0.012]} />
        <meshBasicMaterial color="#56cfff" transparent opacity={0.48} />
      </mesh>
    </group>
  );
}

/** Builds the reflective-looking platform rings and restrained holographic panels. */
function FloorAndPanels() {
  return (
    <group>
      <mesh position={[0, -2.12, -0.4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[25, 12]} />
        <meshBasicMaterial color="#071326" transparent opacity={0.33} side={DoubleSide} />
      </mesh>
      {[1.8, 2.42, 3.15].map((radius, index) => (
        <mesh
          key={radius}
          position={[3.2, -2.04 + index * 0.012, -0.2]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[radius, 0.014, 5, 84]} />
          <meshBasicMaterial color={index === 1 ? "#48d9ff" : "#1c65d8"} transparent opacity={0.43 - index * 0.08} />
        </mesh>
      ))}
      <mesh position={[4.85, 0.68, -1.6]} rotation={[0, -0.14, 0]}>
        <planeGeometry args={[1.55, 1.12]} />
        <meshBasicMaterial color="#1161bd" transparent opacity={0.12} side={DoubleSide} />
      </mesh>
      <mesh position={[4.85, 0.68, -1.56]} rotation={[0, -0.14, 0]}>
        <planeGeometry args={[1.42, 1.0]} />
        <meshBasicMaterial color="#80dfff" wireframe transparent opacity={0.3} side={DoubleSide} />
      </mesh>
      {[-0.12, 0.1, 0.32].map((y) => (
        <mesh key={y} position={[4.85, y, -1.52]} rotation={[0, -0.14, 0]}>
          <planeGeometry args={[0.82, 0.012]} />
          <meshBasicMaterial color="#9feaff" transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

/** Creates the bounded, deterministic depth-particle field for the active tier. */
function SceneParticles({ tier }: { tier: HeroSceneProps["tier"] }) {
  const geometry = useMemo(() => {
    const count = livingOrganismMotion.particles[tier];
    const values = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      const seed = index + 1;
      values[index * 3] = Math.sin(seed * 12.9898) * 8.8;
      values[index * 3 + 1] = Math.cos(seed * 5.398) * 2.8;
      values[index * 3 + 2] = Math.sin(seed * 3.117) * 2.6 - 1;
    }
    const buffer = new BufferGeometry();
    buffer.setAttribute("position", new Float32BufferAttribute(values, 3));
    return buffer;
  }, [tier]);
  const field = useRef<Group>(null);
  const motionScale = getMotionScale(tier);

  useFrame(({ clock }) => {
    if (field.current) {
      field.current.position.y =
        Math.sin(clock.elapsedTime * 0.16) * 0.35 * motionScale;
    }
  });

  return (
    <group ref={field}>
      <points geometry={geometry}>
        <pointsMaterial color="#64b9ff" size={0.025} transparent opacity={tier === "FULL" ? 0.74 : 0.42} sizeAttenuation depthWrite={false} />
      </points>
    </group>
  );
}

/**
 * Composes the living laboratory world and applies bounded pointer, scroll and
 * idle motion without moving semantic content into the canvas.
 */
function HolographicWorld({ tier }: { tier: HeroSceneProps["tier"] }) {
  const world = useRef<Group>(null);
  const pointerTarget = useRef({ x: 0, y: 0, scroll: 0 });
  const scale = getMotionScale(tier);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      pointerTarget.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerTarget.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => {
      pointerTarget.current.scroll = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useFrame((state, delta) => {
    if (!world.current) return;
    const { x, y, scroll } = pointerTarget.current;
    const easing = Math.min(delta * 1.2, 0.06);
    const horizontal = x * livingOrganismMotion.pointerParallax * scale;
    const vertical = -y * livingOrganismMotion.pointerParallax * scale;
    world.current.position.x += (horizontal - world.current.position.x) * easing;
    world.current.position.y +=
      (vertical + Math.sin(state.clock.elapsedTime * 0.22) * livingOrganismMotion.cameraBreath * scale - scroll * livingOrganismMotion.scrollDepth - world.current.position.y) * easing;
  });

  return (
    <group ref={world}>
      <ambientLight intensity={1.25} color="#88a9d3" />
      <directionalLight position={[1, 5, 8]} intensity={2.3} color="#e7f5ff" />
      <directionalLight position={[-5, 1, 1]} intensity={2.7} color="#387cff" />
      <Chamber tier={tier} />
      <PrecisionBladesN tier={tier} />
      <GlobalNetwork tier={tier} />
      <HumanScaleFigure />
      <FloorAndPanels />
      <SceneParticles tier={tier} />
      {Array.from({ length: tier === "FULL" ? 4 : 2 }, (_, index) => (
        <EnergyFilament key={index} index={index} tier={tier} />
      ))}
    </group>
  );
}

/**
 * Hosts the lazy React Three Fiber canvas, tier-specific DPR and two-frame
 * readiness handshake used by the poster-to-live crossfade.
 */
export default function HeroScene({ tier, onReady, onFailure }: HeroSceneProps) {
  const dpr: [number, number] = tier === "FULL" ? [1, 1.75] : [1, 1.25];
  const readinessFrame = useRef<number | null>(null);
  const secondReadinessFrame = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (readinessFrame.current !== null) cancelAnimationFrame(readinessFrame.current);
      if (secondReadinessFrame.current !== null) cancelAnimationFrame(secondReadinessFrame.current);
    };
  }, []);

  return (
    <div className={styles.canvasFrame} data-renderer="react-three-fiber">
      <Canvas
        camera={{ position: [0, 0.15, 12], fov: 40, near: 0.1, far: 50 }}
        dpr={dpr}
        frameloop="always"
        gl={{
          alpha: true,
          antialias: tier === "FULL",
          failIfMajorPerformanceCaveat: true,
          powerPreference: tier === "FULL" ? "high-performance" : "low-power",
          preserveDrawingBuffer: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x050914, 0);
          readinessFrame.current = requestAnimationFrame(() => {
            secondReadinessFrame.current = requestAnimationFrame(onReady);
          });
        }}
      >
        <SceneLifecycle onFailure={onFailure} />
        <Suspense fallback={null}>
          <HolographicWorld tier={tier} />
        </Suspense>
      </Canvas>
    </div>
  );
}
