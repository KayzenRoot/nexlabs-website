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
  MeshBasicMaterial,
  MeshStandardMaterial,
  ShapeGeometry,
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
  const geometry = useMemo(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 335 335"><path d="${precisionBladesGeometry.silhouette}" transform="${precisionBladesTransform}" /></svg>`;
    const paths = new SVGLoader().parse(svg).paths;
    const shapes = paths.flatMap((path) => path.toShapes());
    const geometry = new ExtrudeGeometry(shapes, {
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 2.4,
      bevelThickness: 2,
      curveSegments: 2,
      depth: 18,
      steps: 1,
    });

    geometry.center();
    geometry.scale(0.0115, -0.0115, 0.0115);
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);
  return geometry;
}

/** Adds a restrained silver/chrome gradient to the front plane of the exact N silhouette. */
function useHeroFaceGeometry() {
  const geometry = useMemo(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 335 335"><path d="${precisionBladesGeometry.silhouette}" transform="${precisionBladesTransform}" /></svg>`;
    const shapes = new SVGLoader().parse(svg).paths.flatMap((path) => path.toShapes());
    const face = new ShapeGeometry(shapes, 4);
    face.center();
    face.scale(0.0115, -0.0115, 0.0115);
    face.computeBoundingBox();
    const bounds = face.boundingBox;
    const positions = face.getAttribute("position");
    if (bounds && positions) {
      const width = Math.max(bounds.max.x - bounds.min.x, 0.001);
      const height = Math.max(bounds.max.y - bounds.min.y, 0.001);
      const stops = [
        [0, new Color("#f6fbff")],
        [0.16, new Color("#5b779f")],
        [0.31, new Color("#eef8ff")],
        [0.47, new Color("#435777")],
        [0.61, new Color("#fbfdff")],
        [0.79, new Color("#799ccb")],
        [1, new Color("#f5faff")],
      ] as const;
      const colors = new Float32Array(positions.count * 3);
      const color = new Color();
      for (let index = 0; index < positions.count; index += 1) {
        const x = (positions.getX(index) - bounds.min.x) / width;
        const y = (positions.getY(index) - bounds.min.y) / height;
        const position = x * 0.72 + (1 - y) * 0.28;
        const right = stops.findIndex(([offset]) => offset >= position);
        const previous = stops[Math.max(0, right - 1)];
        const next = stops[Math.max(0, right)];
        const amount = next[0] === previous[0] ? 0 : (position - previous[0]) / (next[0] - previous[0]);
        color.lerpColors(previous[1], next[1], amount).toArray(colors, index * 3);
      }
      face.setAttribute("color", new Float32BufferAttribute(colors, 3));
    }
    return face;
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);
  return geometry;
}

/** Renders the selected Precision Blades N with tier-scaled living motion. */
function PrecisionBladesN({ tier }: { tier: HeroSceneProps["tier"] }) {
  const geometry = useHeroGeometry();
  const faceGeometry = useHeroFaceGeometry();
  const mark = useRef<Group>(null);
  const materials = useMemo(
    () => [
      new MeshStandardMaterial({
        color: new Color("#526b88"),
        metalness: 0.9,
        roughness: 0.19,
        side: DoubleSide,
      }),
      new MeshBasicMaterial({
        vertexColors: true,
        toneMapped: false,
        side: DoubleSide,
      }),
    ],
    [],
  );
  useEffect(() => () => materials.forEach((material) => material.dispose()), [materials]);

  useFrame(({ clock }) => {
    if (!mark.current) return;
    const amplitude = getMotionScale(tier);
    mark.current.position.y = Math.sin(clock.elapsedTime * 0.3) * 0.012 * amplitude;
  });

  return (
    <group
      ref={mark}
      position={[3.1, 0.42, 0.3]}
      scale={1.1}
    >
      <mesh geometry={geometry} material={materials[0]} castShadow={false} receiveShadow={false} />
      <mesh geometry={faceGeometry} material={materials[1]} position={[0, 0, 0.129]} castShadow={false} receiveShadow={false} />
    </group>
  );
}

/** Renders the luminous portal chamber and structural energy rails around the N. */
function Chamber({ tier }: { tier: HeroSceneProps["tier"] }) {
  const rails = useRef<Group>(null);
  const segments = tier === "FULL" ? 24 : 12;

  useFrame(({ clock }) => {
    if (rails.current) {
      rails.current.rotation.z = Math.sin(clock.elapsedTime * 0.21) * 0.008;
    }
  });

  return (
    <group position={[3.1, 0.12, -1.1]} scale={[0.8, 1, 0.9]}>
      {/* A translucent outer shell gives the portal a true cylindrical read. */}
      <mesh position={[0, 0.03, -0.58]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[2.78, 2.78, 4.25, segments, 1, true]} />
        <meshPhysicalMaterial color="#0a2450" metalness={0.48} roughness={0.27} transparent opacity={0.19} side={DoubleSide} envMapIntensity={0.7} />
      </mesh>
      <mesh position={[0, 0.04, -0.56]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[2.79, 0.018, 6, tier === "FULL" ? 112 : 56]} />
        <meshBasicMaterial color="#76dfff" transparent opacity={0.42} />
      </mesh>
      <group ref={rails}>
        {[2.28, 2.5, 2.76].map((radius, index) => (
          <mesh
            key={radius}
            position={[0, index === 2 ? 2.1 : index === 0 ? -2.02 : 1.72, 0]}
            rotation={[Math.PI / 2 + 0.035, 0, 0]}
          >
            <torusGeometry args={[radius, index === 1 ? 0.025 : 0.04, 8, tier === "FULL" ? 128 : 64]} />
            <meshBasicMaterial
              color={index === 1 ? "#54dfff" : "#287cff"}
              transparent
              opacity={index === 1 ? 0.8 : 0.55}
            />
          </mesh>
        ))}
        {Array.from({ length: tier === "FULL" ? 24 : 12 }, (_, index) => {
          const angle = (index / (tier === "FULL" ? 24 : 12)) * Math.PI * 2;
          const radius = 2.57;
          return (
            <mesh
              key={index}
              position={[Math.cos(angle) * radius, 0.1, Math.sin(angle) * 0.68]}
              rotation={[0, -angle, 0]}
            >
              <boxGeometry args={[0.018, 4.05, 0.018]} />
              <meshBasicMaterial color={index % 3 === 0 ? "#b6f4ff" : "#4e9bff"} transparent opacity={index % 3 === 0 ? 0.52 : 0.26} />
            </mesh>
          );
        })}
      </group>
      <mesh position={[0, 0.16, -0.95]}>
        <cylinderGeometry args={[0.045, 0.42, 3.6, 16, 1, true]} />
        <meshBasicMaterial color="#8deaff" transparent opacity={tier === "FULL" ? 0.14 : 0.08} side={DoubleSide} />
      </mesh>
      <pointLight color="#42cfff" intensity={tier === "FULL" ? 13 : 7} distance={9} position={[0, 0.4, 1.4]} />
      <pointLight color="#315fff" intensity={tier === "FULL" ? 9 : 4.5} distance={10} position={[-2.7, 1.6, -0.3]} />
      <pointLight color="#b7f5ff" intensity={tier === "FULL" ? 5 : 2.5} distance={7} position={[1.8, 2.15, 0.6]} />
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
    <group ref={globe} position={[5.95, 0.34, -1.85]} scale={1.16}>
      <mesh>
        <sphereGeometry args={[1.04, tier === "FULL" ? 32 : 20, tier === "FULL" ? 24 : 14]} />
        <meshPhysicalMaterial color="#0b3978" metalness={0.45} roughness={0.32} transparent opacity={0.56} emissive="#052357" emissiveIntensity={0.32} envMapIntensity={0.8} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.055, tier === "FULL" ? 24 : 14, tier === "FULL" ? 16 : 10]} />
        <meshBasicMaterial color="#42aaff" wireframe transparent opacity={0.34} />
      </mesh>
      {Array.from({ length: tier === "FULL" ? 28 : 14 }, (_, index) => {
        const latitude = -1.05 + (index % 7) * 0.34;
        const longitude = Math.floor(index / 7) * Math.PI / 2 + (index % 3) * 0.2;
        const radius = 1.06;
        const point = new Vector3(
          radius * Math.cos(latitude) * Math.cos(longitude),
          radius * Math.sin(latitude),
          radius * Math.cos(latitude) * Math.sin(longitude),
        );
        return <mesh key={index} position={point}>
          <sphereGeometry args={[0.025 + (index % 3) * 0.006, 6, 4]} />
          <meshBasicMaterial color={index % 4 === 0 ? "#dcfaff" : "#6de2ff"} />
        </mesh>;
      })}
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
  useEffect(() => () => geometry.dispose(), [geometry]);
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
    <group position={[-0.85, -1.65, 0.7]}>
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
  const panelPlacements: Array<[number, number, number, number, number]> = [
    [-4.6, 0.72, -1.15, 1.36, 0.94],
    [4.72, 1.2, -2.6, 1.28, 0.88],
    [5.45, -0.2, -1.5, 1.02, 0.7],
  ];

  return (
    <group>
      <mesh position={[0, -2.14, -1.6]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[28, 26]} />
        <meshPhysicalMaterial color="#071326" metalness={0.28} roughness={0.36} transparent opacity={0.82} side={DoubleSide} envMapIntensity={0.12} />
      </mesh>
      {Array.from({ length: 13 }, (_, index) => (
        <mesh key={`floor-long-${index}`} position={[-9 + index * 1.5, -2.125, -1.2]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.012, 24]} />
          <meshBasicMaterial color="#3183d8" transparent opacity={0.2} side={DoubleSide} />
        </mesh>
      ))}
      {Array.from({ length: 8 }, (_, index) => (
        <mesh key={`floor-cross-${index}`} position={[0, -2.122, -10 + index * 2.3]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[28, 0.012]} />
          <meshBasicMaterial color="#4c9be8" transparent opacity={0.16} side={DoubleSide} />
        </mesh>
      ))}
      {[2.15, 2.55, 3.2, 4.05].map((radius, index) => (
        <mesh
          key={radius}
          position={[3.1, -2.04 + index * 0.012, -0.2]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[radius, 0.014, 5, 84]} />
          <meshBasicMaterial color={index === 1 ? "#48d9ff" : "#1c65d8"} transparent opacity={0.43 - index * 0.08} />
        </mesh>
      ))}
      {panelPlacements.map(([x, y, z, w, h], index) => (
        <group key={index} position={[x, y, z]} rotation={[0, index === 0 ? 0.2 : -0.16, index === 2 ? -0.05 : 0]}>
          <mesh>
            <planeGeometry args={[w, h]} />
            <meshPhysicalMaterial color="#083472" metalness={0.24} roughness={0.32} transparent opacity={0.2} side={DoubleSide} />
          </mesh>
          <mesh position={[0, 0, 0.015]}>
            <planeGeometry args={[w * 0.94, h * 0.9]} />
            <meshBasicMaterial color="#4ccfff" wireframe transparent opacity={0.2} side={DoubleSide} />
          </mesh>
          {[-0.22, -0.04, 0.14, 0.3].map((lineY, lineIndex) => (
            <mesh key={lineIndex} position={[-w * (lineIndex % 2 ? 0.02 : 0.1), lineY * h, 0.025]}>
              <planeGeometry args={[w * (0.72 - lineIndex * 0.09), 0.009]} />
              <meshBasicMaterial color={lineIndex === 0 ? "#bbf5ff" : "#43a8ff"} transparent opacity={0.44} />
            </mesh>
          ))}
          <pointLight color="#27a7ff" intensity={0.42} distance={3} />
        </group>
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
  useEffect(() => () => geometry.dispose(), [geometry]);
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
      <ambientLight intensity={tier === "FULL" ? 0.84 : 0.72} color="#88a9d3" />
      <hemisphereLight args={["#b5e5ff", "#061020", 1.15]} />
      <directionalLight position={[1, 5, 8]} intensity={tier === "FULL" ? 3.2 : 2.2} color="#e7f5ff" />
      <directionalLight position={[-5, 1, 1]} intensity={tier === "FULL" ? 3.4 : 2.1} color="#387cff" />
      <directionalLight position={[5, 3, -4]} intensity={tier === "FULL" ? 2 : 1.1} color="#55cfff" />
      <pointLight position={[2.6, 3.4, 7.5]} intensity={tier === "FULL" ? 38 : 22} distance={18} decay={2} color="#f5fdff" />
      <pointLight position={[4.2, -0.2, 6.5]} intensity={tier === "FULL" ? 24 : 14} distance={15} decay={2} color="#68cfff" />
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
