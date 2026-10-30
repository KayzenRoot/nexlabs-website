"use client";

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import {
  BoxGeometry,
  BufferGeometry,
  DataTexture,
  CatmullRomCurve3,
  Color,
  DoubleSide,
  EquirectangularReflectionMapping,
  EdgesGeometry,
  ExtrudeGeometry,
  SRGBColorSpace,
  Float32BufferAttribute,
  Group,
  InstancedMesh,
  LinearFilter,
  Matrix4,
  Material,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  MeshBasicMaterial,
  Object3D,
  PlaneGeometry,
  RGBAFormat,
  ShapeGeometry,
  SphereGeometry,
  Texture,
  TextureLoader,
  TubeGeometry,
  UnsignedByteType,
  Vector3,
} from "three";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { precisionBladesGeometry, precisionBladesTransform } from "../brand/precision-blades";
import { getMotionScale, livingOrganismMotion } from "../experience/living-organism";
import type { HeroQualityTier } from "../experience/quality-tier";
import styles from "./static-hero.module.css";

interface HeroSceneProps {
  tier: Exclude<HeroQualityTier, "STATIC">;
  onReady: () => void;
  onFailure: (reason: unknown) => void;
}

interface SceneInstanceTransform {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  color?: string;
}

/** Packs repeated static detail into one draw call while preserving its transforms and color accents. */
function useSceneInstances(
  geometry: BufferGeometry,
  material: Material,
  transforms: SceneInstanceTransform[],
) {
  const instances = useMemo(
    () => new InstancedMesh(geometry, material, transforms.length),
    [geometry, material, transforms.length],
  );

  useLayoutEffect(() => {
    const dummy = new Object3D();
    transforms.forEach((transform, index) => {
      dummy.position.set(...transform.position);
      dummy.rotation.set(...(transform.rotation ?? [0, 0, 0]));
      dummy.scale.set(...(transform.scale ?? [1, 1, 1]));
      dummy.updateMatrix();
      instances.setMatrixAt(index, dummy.matrix);
      if (transform.color) instances.setColorAt(index, new Color(transform.color));
    });
    instances.instanceMatrix.needsUpdate = true;
    if (instances.instanceColor) instances.instanceColor.needsUpdate = true;
    instances.computeBoundingSphere();
  }, [instances, transforms]);

  useEffect(() => () => instances.dispose(), [instances]);
  return instances;
}

/**
 * Synchronizes the render loop with page visibility and converts WebGL context
 * loss into the shared scene-failure path.
 */
function SceneLifecycle({ onFailure }: Pick<HeroSceneProps, "onFailure">) {
  const { gl, invalidate, setFrameloop } = useThree();

  useEffect(() => {
    let motionFrameTimer: number | undefined;
    const stopMotionUpdates = () => {
      if (motionFrameTimer !== undefined) {
        window.clearTimeout(motionFrameTimer);
        motionFrameTimer = undefined;
      }
    };
    const scheduleMotionUpdate = () => {
      if (motionFrameTimer !== undefined || document.visibilityState === "hidden") return;
      motionFrameTimer = window.setTimeout(() => {
        motionFrameTimer = undefined;
        if (document.visibilityState !== "hidden") {
          invalidate();
          scheduleMotionUpdate();
        }
      }, 1000 / 30);
    };
    const syncVisibility = () => {
      if (document.visibilityState === "hidden") {
        stopMotionUpdates();
        setFrameloop("never");
        return;
      }

      setFrameloop("demand");
      invalidate();
      scheduleMotionUpdate();
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
      stopMotionUpdates();
    };
  }, [gl, invalidate, onFailure, setFrameloop]);

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
      bevelSegments: 3,
      bevelSize: 3,
      bevelThickness: 3,
      curveSegments: 3,
      depth: 38,
      steps: 1,
    });

    geometry.center();
    geometry.scale(0.0115, -0.0115, 0.0115);
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    return geometry;
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);
  return geometry;
}

/** Adds a chrome reflection coordinate to the front plane of the exact N silhouette. */
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
    const uvs = face.getAttribute("uv");
    if (bounds && positions && uvs) {
      const width = Math.max(bounds.max.x - bounds.min.x, 0.001);
      const height = Math.max(bounds.max.y - bounds.min.y, 0.001);
      for (let index = 0; index < positions.count; index += 1) {
        const x = (positions.getX(index) - bounds.min.x) / width;
        const y = (positions.getY(index) - bounds.min.y) / height;
        uvs.setXY(index, x * 0.58 + (1 - y) * 0.42, y);
      }
      uvs.needsUpdate = true;
    }
    return face;
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);
  return geometry;
}

/** Creates a deterministic diagonal softbox reflection for the N's chrome face. */
function createChromeFaceMap() {
  const width = 512;
  const height = 256;
  const pixels = new Uint8Array(width * height * 4);
  const stops = [
    [0, [48, 61, 70]],
    [0.075, [226, 239, 244]],
    [0.145, [76, 92, 102]],
    [0.235, [248, 253, 255]],
    [0.315, [111, 128, 137]],
    [0.405, [232, 245, 250]],
    [0.49, [58, 76, 87]],
    [0.57, [252, 255, 255]],
    [0.66, [88, 107, 118]],
    [0.75, [219, 238, 245]],
    [0.835, [50, 71, 83]],
    [0.915, [242, 250, 253]],
    [1, [67, 83, 92]],
  ] as const;

  for (let y = 0; y < height; y += 1) {
    const vertical = y / (height - 1);
    for (let x = 0; x < width; x += 1) {
      const position = x / (width - 1);
      const right = stops.findIndex(([offset]) => offset >= position);
      const previous = stops[Math.max(0, right - 1)];
      const next = stops[Math.max(0, right)];
      const amount = next[0] === previous[0] ? 0 : (position - previous[0]) / (next[0] - previous[0]);
      const verticalFalloff = 0.91 + Math.cos((vertical - 0.48) * Math.PI) * 0.09;
      const offset = (y * width + x) * 4;
      for (let channel = 0; channel < 3; channel += 1) {
        const value = previous[1][channel] + (next[1][channel] - previous[1][channel]) * amount;
        pixels[offset + channel] = Math.round(value * verticalFalloff);
      }
      pixels[offset + 3] = 255;
    }
  }

  const texture = new DataTexture(pixels, width, height, RGBAFormat, UnsignedByteType);
  texture.colorSpace = SRGBColorSpace;
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  texture.needsUpdate = true;
  return texture;
}


/** Renders the selected Precision Blades N with tier-scaled living motion. */
function PrecisionBladesN({
  tier,
  environment,
}: {
  tier: HeroSceneProps["tier"];
  environment: Texture;
}) {
  const geometry = useHeroGeometry();
  const faceGeometry = useHeroFaceGeometry();
  const faceMap = useMemo(createChromeFaceMap, []);
  const edgeGeometry = useMemo(() => new EdgesGeometry(geometry, 18), [geometry]);
  const faceDepth = (geometry.boundingBox?.max.z ?? 0.253) + 0.003;
  const mark = useRef<Group>(null);
  const materials = useMemo(
    () => [
      new MeshPhysicalMaterial({
        color: new Color("#e7f1f4"),
        metalness: 0.96,
        roughness: 0.15,
        clearcoat: 0.98,
        clearcoatRoughness: 0.08,
        emissive: new Color("#040d18"),
        emissiveIntensity: 0.08,
        envMap: environment,
        envMapIntensity: 2.7,
        side: DoubleSide,
      }),
      new MeshBasicMaterial({
        color: "#ffffff",
        map: faceMap,
        toneMapped: false,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        side: DoubleSide,
      }),
      new MeshBasicMaterial({
        color: "#c5eaff",
        transparent: true,
        opacity: 0.035,
        toneMapped: false,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -2,
        side: DoubleSide,
      }),
    ],
    [environment, faceMap],
  );
  useEffect(() => () => {
    materials.forEach((material) => material.dispose());
    edgeGeometry.dispose();
    faceMap.dispose();
  }, [edgeGeometry, faceMap, materials]);

  useFrame(({ clock }) => {
    if (!mark.current) return;
    const amplitude = getMotionScale(tier);
    mark.current.position.y = Math.sin(clock.elapsedTime * 0.3) * 0.012 * amplitude;
  });

  return (
    <group
      ref={mark}
      position={[3.1, 0.42, 0.3]}
      rotation={[0.02, -0.1, 0]}
      scale={1.15}
    >
      <mesh geometry={geometry} material={materials[0]} castShadow={false} receiveShadow={false} />
      <mesh geometry={faceGeometry} material={materials[1]} position={[0, 0, faceDepth]} scale={[0.965, 0.965, 1]} castShadow={false} receiveShadow={false} />
      <mesh geometry={faceGeometry} material={materials[2]} position={[0, 0, faceDepth + 0.004]} scale={[0.965, 0.965, 1]} castShadow={false} receiveShadow={false} />
      <lineSegments geometry={edgeGeometry} position={[0, 0, 0.001]}>
        <lineBasicMaterial color="#94dfff" transparent opacity={0.42} depthWrite={false} />
      </lineSegments>
      <pointLight color="#e8f8ff" intensity={14} distance={4.8} decay={2} position={[-0.72, 0.76, 1.45]} />
      <pointLight color="#5db7ff" intensity={8} distance={5} decay={2} position={[0.88, -0.2, 1.25]} />
      <pointLight color="#ffffff" intensity={10} distance={4.3} decay={2} position={[0.12, 1.35, 0.9]} />
    </group>
  );
}

/** Renders the luminous portal chamber and structural energy rails around the N. */
function Chamber({ tier }: { tier: HeroSceneProps["tier"] }) {
  const rails = useRef<Group>(null);
  const detailSegments = tier === "FULL" ? 144 : 80;
  const ribCount = tier === "FULL" ? 36 : 20;
  const ribGeometry = useMemo(() => new BoxGeometry(0.16, 5.42, 0.24), []);
  const ribMaterial = useMemo(
    () => new MeshPhysicalMaterial({
      color: "#ffffff",
      metalness: 0.88,
      roughness: 0.24,
      clearcoat: 0.78,
      clearcoatRoughness: 0.14,
      emissive: "#0a1930",
      emissiveIntensity: 0.22,
      vertexColors: true,
    }),
    [],
  );
  const ribTransforms = useMemo(
    () => Array.from({ length: ribCount }, (_, index): SceneInstanceTransform | null => {
      const angle = (index / ribCount) * Math.PI * 2;
      if (Math.sin(angle) > 0.42) return null;
      const radius = 3.52;
      return {
        position: [Math.cos(angle) * radius, 0.02, Math.sin(angle) * radius - 0.06],
        rotation: [0, -angle, 0],
        color: index % 6 === 0 ? "#c0f5ff" : index % 3 === 0 ? "#75b4d4" : "#43799d",
      };
    }).filter((transform): transform is SceneInstanceTransform => transform !== null),
    [ribCount],
  );
  const ribInstances = useSceneInstances(ribGeometry, ribMaterial, ribTransforms);
  const outerRibTransforms = useMemo(
    () => Array.from({ length: tier === "FULL" ? 24 : 12 }, (_, index): SceneInstanceTransform | null => {
      const count = tier === "FULL" ? 24 : 12;
      const angle = (index / count) * Math.PI * 2;
      if (Math.sin(angle) > 0.58) return null;
      const radius = 4.24;
      return {
        position: [Math.cos(angle) * radius, 0.08, Math.sin(angle) * radius - 0.48],
        rotation: [0, -angle, 0],
        scale: [0.62, 1, 0.62],
        color: index % 6 === 0 ? "#72d5ff" : "#3976a9",
      };
    }).filter((transform): transform is SceneInstanceTransform => transform !== null),
    [tier],
  );
  const outerRibs = useSceneInstances(ribGeometry, ribMaterial, outerRibTransforms);
  const shellPanelGeometry = useMemo(() => new BoxGeometry(1.24, 4.45, 0.2), []);
  const shellPanelMaterial = useMemo(
    () => new MeshPhysicalMaterial({
      color: "#ffffff",
      metalness: 0.9,
      roughness: 0.3,
      clearcoat: 0.72,
      clearcoatRoughness: 0.16,
      emissive: "#0b2a44",
      emissiveIntensity: 0.3,
      vertexColors: true,
    }),
    [],
  );
  const shellPanelTransforms = useMemo(
    () => Array.from({ length: tier === "FULL" ? 24 : 12 }, (_, index): SceneInstanceTransform | null => {
      const count = tier === "FULL" ? 24 : 12;
      const angle = (index / count) * Math.PI * 2;
      if (Math.sin(angle) > 0.58) return null;
      const radius = 3.18;
      return {
        position: [Math.cos(angle) * radius, 0.02, Math.sin(angle) * radius - 0.12],
        rotation: [0, Math.PI / 2 - angle, 0],
        color: index % 4 === 0 ? "#63849a" : index % 2 ? "#456b82" : "#34576e",
      };
    }).filter((transform): transform is SceneInstanceTransform => transform !== null),
    [tier],
  );
  const shellPanelInstances = useSceneInstances(shellPanelGeometry, shellPanelMaterial, shellPanelTransforms);
  const axialCount = tier === "FULL" ? 13 : 7;
  const axialGeometry = useMemo(() => new BoxGeometry(0.04, 5.56, 0.075), []);
  const axialMaterial = useMemo(
    () => new MeshBasicMaterial({
      color: "#ffffff",
      transparent: true,
      opacity: tier === "FULL" ? 0.92 : 0.72,
      vertexColors: true,
    }),
    [tier],
  );
  const axialTransforms = useMemo(
    () => Array.from({ length: axialCount }, (_, index): SceneInstanceTransform => ({
      position: [-4.5 + index * (9 / (axialCount - 1)), 0.12, -0.22],
      color: index % 3 ? "#4aa5ff" : "#c0f6ff",
    })),
    [axialCount],
  );
  const axialInstances = useSceneInstances(axialGeometry, axialMaterial, axialTransforms);

  useEffect(() => () => {
    ribGeometry.dispose();
    ribMaterial.dispose();
    shellPanelGeometry.dispose();
    shellPanelMaterial.dispose();
    axialGeometry.dispose();
    axialMaterial.dispose();
  }, [axialGeometry, axialMaterial, ribGeometry, ribMaterial, shellPanelGeometry, shellPanelMaterial]);

  useFrame(({ clock }) => {
    if (rails.current) rails.current.rotation.y = Math.sin(clock.elapsedTime * 0.12) * 0.006;
  });

  return (
    <group position={[3.1, 0.12, -1.1]} scale={[0.94, 1, 0.94]}>
      <mesh position={[0, 0.03, -0.58]}>
        <cylinderGeometry args={[4.12, 4.12, 5.5, detailSegments, 1, true]} />
        <meshBasicMaterial color="#164574" transparent opacity={0.16} depthWrite={false} side={DoubleSide} />
      </mesh>
      <mesh position={[0, 0.04, -0.54]}>
        <cylinderGeometry args={[3.06, 3.06, 4.9, detailSegments, 1, true]} />
        <meshBasicMaterial color="#1761a1" transparent opacity={0.12} depthWrite={false} side={DoubleSide} />
      </mesh>
      <mesh position={[0, 0.04, -0.48]}>
        <cylinderGeometry args={[4.18, 4.18, 5.42, detailSegments, 1, true, Math.PI * 0.64, Math.PI * 0.72]} />
        <meshPhysicalMaterial
          color="#0a2038"
          metalness={0.78}
          roughness={0.3}
          clearcoat={0.58}
          clearcoatRoughness={0.22}
          emissive="#0b315a"
          emissiveIntensity={0.52}
          transparent
          opacity={0.38}
          depthWrite={false}
          side={DoubleSide}
        />
      </mesh>
      <group ref={rails}>
        {[
          [2.08, 2.38], [2.22, 2.34], [2.38, 2.26], [2.55, 2.12], [2.78, 1.74],
          [3.16, 2.34], [3.38, 2.4], [3.58, 2.48], [3.82, 2.55], [4.08, 2.48], [4.3, 2.34],
          [2.86, -1.72], [3.02, -1.9], [3.22, -2.38], [3.42, -2.56],
          [3.62, -2.52], [3.82, -2.42], [4.04, -2.28], [4.22, -2.12],
        ].map(([radius, y], index) => (
          <mesh key={`${radius}-${y}`} position={[0, y, -0.06]} rotation={[Math.PI / 2 + 0.035, 0, 0]}>
            <torusGeometry args={[radius, index % 4 === 1 ? 0.086 : 0.068, 10, detailSegments]} />
            <meshPhysicalMaterial
              color={index % 5 === 0 ? "#94b8cf" : index % 2 ? "#315b7c" : "#1d3e60"}
              metalness={0.96}
              roughness={index % 3 === 1 ? 0.18 : 0.24}
              clearcoat={0.92}
              clearcoatRoughness={0.1}
              emissive={index % 3 === 1 ? "#14508b" : "#092648"}
              emissiveIntensity={index % 5 === 0 ? 0.62 : 0.34}
              envMapIntensity={1.35}
            />
          </mesh>
        ))}
        <primitive object={ribInstances} />
        <primitive object={outerRibs} />
        <primitive object={shellPanelInstances} />
        <primitive object={axialInstances} />
        {[ -4.35, 4.35 ].map((x, index) => (
          <group key={"gantry-" + index} position={[x, 0.02, -1.75]}>
            <mesh>
              <boxGeometry args={[0.16, 5.05, 0.2]} />
              <meshStandardMaterial color="#102a46" metalness={0.92} roughness={0.24} emissive="#0b3765" emissiveIntensity={0.72} />
            </mesh>
            <mesh position={[index === 0 ? 0.1 : -0.1, 0, 0.12]}>
              <boxGeometry args={[0.025, 4.82, 0.025]} />
              <meshBasicMaterial color="#4bbcff" transparent opacity={0.72} />
            </mesh>
          </group>
        ))}
        {[-2.38, 2.48].map((y, index) => (
          <mesh key={"gantry-cross-" + index} position={[0, y, -1.78]}>
            <boxGeometry args={[9.15, 0.19, 0.24]} />
            <meshStandardMaterial color="#112c49" metalness={0.9} roughness={0.26} emissive="#0a3b6d" emissiveIntensity={0.68} />
          </mesh>
        ))}
        {[3.48, 3.76, 4.06, 4.36].map((radius, index) => (
          <mesh key={"crown-ring-" + index} position={[0, 2.18, -0.1]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, index === 1 ? 0.092 : 0.064, 10, detailSegments]} />
            <meshPhysicalMaterial
              color={index === 1 ? "#b8d1df" : "#315b80"}
              metalness={0.97}
              roughness={0.18}
              clearcoat={0.96}
              clearcoatRoughness={0.08}
              emissive={index === 1 ? "#2b91d8" : "#103f7a"}
              emissiveIntensity={index === 1 ? 0.82 : 0.48}
              envMapIntensity={1.6}
            />
          </mesh>
        ))}
        {[-2.9, 2.9].map((x, index) => (
          <group key={"front-spine-" + index} position={[x, 0.1, 0.32]}>
            <mesh>
              <boxGeometry args={[0.16, 5.28, 0.28]} />
              <meshPhysicalMaterial color="#15283b" metalness={0.98} roughness={0.18} clearcoat={0.9} emissive="#081b31" emissiveIntensity={0.4} />
            </mesh>
            <mesh position={[index === 0 ? 0.071 : -0.071, 0, 0.148]}>
              <boxGeometry args={[0.035, 5.06, 0.028]} />
              <meshBasicMaterial color="#b5f5ff" transparent opacity={0.94} />
            </mesh>
            <mesh position={[index === 0 ? -0.058 : 0.058, 0, 0.15]}>
              <boxGeometry args={[0.026, 4.88, 0.024]} />
              <meshBasicMaterial color="#287cff" transparent opacity={0.86} />
            </mesh>
          </group>
        ))}
        {[-2.72, 2.72].map((x, index) => (
          <group key={"axial-core-" + index} position={[x, 0.16, -0.34]}>
            <mesh>
              <cylinderGeometry args={[0.12, 0.12, 5.18, 10]} />
              <meshBasicMaterial color="#1e75d0" transparent opacity={0.16} depthWrite={false} />
            </mesh>
            <mesh>
              <cylinderGeometry args={[0.032, 0.032, 5.34, 8]} />
              <meshBasicMaterial color="#9ceeff" transparent opacity={0.82} />
            </mesh>
          </group>
        ))}
        {[-1, 1].map((side) => (
          <group key={"outer-lab-pylon-" + side} position={[side * 5.25, 0.04, 0.55]}>
            <mesh>
              <boxGeometry args={[0.42, 5.62, 0.4]} />
              <meshPhysicalMaterial
                color="#405a68"
                metalness={0.96}
                roughness={0.2}
                clearcoat={0.92}
                clearcoatRoughness={0.1}
                emissive="#10334d"
                emissiveIntensity={0.52}
              />
            </mesh>
            <mesh position={[-side * 0.17, 0, 0.22]}>
              <boxGeometry args={[0.034, 5.38, 0.03]} />
              <meshBasicMaterial color="#a1f0ff" transparent opacity={0.9} />
            </mesh>
            <mesh position={[side * 0.17, 0, 0.22]}>
              <boxGeometry args={[0.028, 5.16, 0.028]} />
              <meshBasicMaterial color="#62aaff" transparent opacity={0.82} />
            </mesh>
            {[-2.62, -1.3, 1.3, 2.62].map((y) => (
              <mesh key={"crossbar-" + y} position={[0, y, -0.02]}>
                <boxGeometry args={[0.94, 0.1, 0.3]} />
                <meshStandardMaterial
                  color="#1b3851"
                  metalness={0.94}
                  roughness={0.24}
                  emissive="#0b3156"
                  emissiveIntensity={0.36}
                />
              </mesh>
            ))}
          </group>
        ))}
      </group>
      <mesh position={[0, 0.18, -1.02]}>
        <cylinderGeometry args={[0.06, 0.56, 4.25, 20, 1, true]} />
        <meshBasicMaterial color="#65cfff" transparent opacity={tier === "FULL" ? 0.16 : 0.09} side={DoubleSide} />
      </mesh>
    </group>
  );
}

/** Renders the slowly evolving globe/network motif required by the Home master. */
function GlobalNetwork({ tier }: { tier: HeroSceneProps["tier"] }) {
  const globe = useRef<Group>(null);
  const networkLinks = useMemo(() => {
    const columns = tier === "FULL" ? 9 : 6;
    const rows = tier === "FULL" ? 7 : 5;
    const radius = 1.115;
    const at = (row: number, column: number) => {
      const latitude = -1.16 + (row / (rows - 1)) * 2.32;
      const longitude = (column / columns) * Math.PI * 2 + (row % 2) * 0.06;
      return new Vector3(
        radius * Math.cos(latitude) * Math.cos(longitude),
        radius * Math.sin(latitude),
        radius * Math.cos(latitude) * Math.sin(longitude),
      );
    };
    const values: number[] = [];
    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        const point = at(row, column);
        const nextLongitude = at(row, (column + 1) % columns);
        values.push(point.x, point.y, point.z, nextLongitude.x, nextLongitude.y, nextLongitude.z);
        if (row < rows - 1) {
          const nextLatitude = at(row + 1, column);
          values.push(point.x, point.y, point.z, nextLatitude.x, nextLatitude.y, nextLatitude.z);
          const diagonal = at(row + 1, (column + (row % 2 ? columns - 1 : 1)) % columns);
          values.push(point.x, point.y, point.z, diagonal.x, diagonal.y, diagonal.z);
        }
      }
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new Float32BufferAttribute(values, 3));
    return geometry;
  }, [tier]);
  const nodeGeometry = useMemo(() => new SphereGeometry(1, 6, 4), []);
  const nodeMaterial = useMemo(
    () => new MeshBasicMaterial({ color: "#ffffff", vertexColors: true }),
    [],
  );
  const nodeTransforms = useMemo(
    () => Array.from({ length: tier === "FULL" ? 63 : 28 }, (_, index): SceneInstanceTransform => {
      const latitude = -1.16 + (index % 7) * 0.38;
      const longitude = Math.floor(index / 7) * Math.PI / 3 + (index % 3) * 0.2;
      const radius = 1.09;
      return {
        position: [
          radius * Math.cos(latitude) * Math.cos(longitude),
          radius * Math.sin(latitude),
          radius * Math.cos(latitude) * Math.sin(longitude),
        ],
        scale: [0.023 + (index % 3) * 0.008, 0.023 + (index % 3) * 0.008, 0.023 + (index % 3) * 0.008],
        color: index % 4 === 0 ? "#dcfaff" : "#6de2ff",
      };
    }),
    [tier],
  );
  const nodeInstances = useSceneInstances(nodeGeometry, nodeMaterial, nodeTransforms);

  useEffect(() => () => {
    nodeGeometry.dispose();
    nodeMaterial.dispose();
    networkLinks.dispose();
  }, [networkLinks, nodeGeometry, nodeMaterial]);

  useFrame((_, delta) => {
    if (globe.current) globe.current.rotation.y += delta * livingOrganismMotion.globeRotation;
  });

  return (
    <group ref={globe} position={[-1.42, 0.58, 0.58]} scale={1.28}>
      <mesh>
        <sphereGeometry args={[1.2, tier === "FULL" ? 44 : 26, tier === "FULL" ? 32 : 18]} />
        <meshBasicMaterial color="#168dff" transparent opacity={0.27} side={DoubleSide} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.055, tier === "FULL" ? 48 : 26, tier === "FULL" ? 36 : 18]} />
        <meshPhysicalMaterial color="#0c315e" metalness={0.56} roughness={0.24} transparent opacity={0.94} emissive="#073c7a" emissiveIntensity={1.08} envMapIntensity={1.65} clearcoat={0.72} clearcoatRoughness={0.12} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.075, tier === "FULL" ? 32 : 18, tier === "FULL" ? 24 : 14]} />
        <meshBasicMaterial color="#47baff" wireframe transparent opacity={0.3} />
      </mesh>
      <lineSegments geometry={networkLinks}>
        <lineBasicMaterial color="#76dcff" transparent opacity={tier === "FULL" ? 0.64 : 0.42} />
      </lineSegments>
      {[
        { position: [-0.45, 0.34, 0.91] as [number, number, number], scale: [0.78, 0.48, 0.14] as [number, number, number], rotation: [0.12, -0.24, 0.1] as [number, number, number] },
        { position: [0.08, 0.55, 0.82] as [number, number, number], scale: [0.54, 0.35, 0.13] as [number, number, number], rotation: [-0.18, 0.12, -0.22] as [number, number, number] },
        { position: [0.46, -0.12, 0.91] as [number, number, number], scale: [0.68, 0.44, 0.13] as [number, number, number], rotation: [0.1, 0.36, 0.2] as [number, number, number] },
        { position: [-0.25, -0.5, 0.82] as [number, number, number], scale: [0.64, 0.34, 0.12] as [number, number, number], rotation: [-0.16, -0.18, 0.28] as [number, number, number] },
      ].map((mass, index) => (
          <mesh key={"continent-" + index} position={mass.position} rotation={mass.rotation} scale={mass.scale}>
          <icosahedronGeometry args={[0.34, 1]} />
          <meshPhysicalMaterial color={index % 2 ? "#2584db" : "#46a7ec"} metalness={0.18} roughness={0.4} transparent opacity={0.74} emissive={index % 2 ? "#1768c1" : "#258de2"} emissiveIntensity={0.62} clearcoat={0.45} />
        </mesh>
      ))}
      <primitive object={nodeInstances} />
      <mesh rotation={[Math.PI / 2, 0.35, 0]}>
        <torusGeometry args={[0.84, 0.012, 5, 80]} />
        <meshBasicMaterial color="#8deeff" transparent opacity={0.76} />
      </mesh>
      <mesh rotation={[0.38, 0, 0.18]}>
        <torusGeometry args={[0.88, 0.008, 4, 72]} />
        <meshBasicMaterial color="#3989ff" transparent opacity={0.44} />
      </mesh>
      <mesh rotation={[0.7, 0.52, -0.22]}>
        <torusGeometry args={[1.27, 0.014, 5, tier === "FULL" ? 96 : 48]} />
        <meshBasicMaterial color="#c4f7ff" transparent opacity={0.72} />
      </mesh>
      <mesh rotation={[0.1, -0.55, 0.86]}>
        <torusGeometry args={[1.31, 0.011, 5, tier === "FULL" ? 88 : 44]} />
        <meshBasicMaterial color="#4f9fff" transparent opacity={0.62} />
      </mesh>
      <mesh rotation={[0.4, -0.18, 0.5]}>
        <torusGeometry args={[1.42, 0.008, 4, tier === "FULL" ? 88 : 44]} />
        <meshBasicMaterial color="#4bdcff" transparent opacity={0.45} />
      </mesh>
      <pointLight color="#299bff" intensity={tier === "FULL" ? 3.4 : 1.6} distance={5.5} position={[0, 0.05, 0.2]} />
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
    const side = index % 2 === 0 ? 1 : -1;
    const lane = Math.floor(index / 2);
    const spread = lane * 0.24;
    return new CatmullRomCurve3([
      new Vector3(side > 0 ? 6.65 + spread : -3.3 - spread, -1.55 + spread * 0.25, -2.3),
      new Vector3(side > 0 ? 7.05 + spread : -3.65 - spread, -0.65 + spread * 0.2, -1.3),
      new Vector3(side > 0 ? 7.65 + spread : -4.05 - spread, 0.35 + spread * 0.2, -0.25),
      new Vector3(side > 0 ? 8.35 + spread : -4.8 - spread, 0.95 + spread * 0.2, 0.65),
      new Vector3(side > 0 ? 9.2 + spread : -5.85 - spread, 0.2 + spread * 0.3, 1.35),
    ]);
  }, [index]);
  const geometry = useMemo(
    () => new TubeGeometry(curve, 96, tier === "FULL" ? 0.03 : 0.018, 6, false),
    [curve, tier],
  );
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
        <meshBasicMaterial color={index % 2 === 0 ? "#1c78ff" : "#56e5ff"} transparent opacity={tier === "FULL" ? 0.58 : 0.3} toneMapped={false} />
      </mesh>
      <mesh ref={node}>
        <sphereGeometry args={[tier === "FULL" ? 0.046 : 0.026, 8, 6]} />
        <meshBasicMaterial color="#b5f7ff" />
      </mesh>
    </group>
  );
}

/** Adds a human-scale visitor silhouette grounded in the chamber platform. */
function HumanScaleFigure() {
  return (
    <group position={[-1.18, -1.58, 3.5]} scale={1.48}>
      <mesh position={[0, 0.65, 0]}>
        <sphereGeometry args={[0.105, 10, 8]} />
        <meshBasicMaterial color="#02050a" />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <capsuleGeometry args={[0.13, 0.48, 4, 8]} />
        <meshStandardMaterial color="#071321" metalness={0.68} roughness={0.34} emissive="#071a2c" emissiveIntensity={0.18} />
      </mesh>
      <mesh position={[0, 0.28, -0.11]}>
        <boxGeometry args={[0.24, 0.34, 0.13]} />
        <meshStandardMaterial color="#050d18" metalness={0.82} roughness={0.26} emissive="#07172a" emissiveIntensity={0.12} />
      </mesh>
      <mesh position={[0, 0.48, 0]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.055, 0.29, 3, 6]} />
        <meshStandardMaterial color="#040a12" metalness={0.58} roughness={0.36} />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh key={"arm-" + side} position={[side * 0.19, 0.29, 0.015]} rotation={[0, 0, side * -0.14]}>
          <capsuleGeometry args={[0.052, 0.29, 3, 6]} />
          <meshStandardMaterial color="#071321" metalness={0.72} roughness={0.34} emissive="#07182b" emissiveIntensity={0.12} />
        </mesh>
      ))}
      <mesh position={[-0.075, -0.12, 0.03]} rotation={[0, 0, 0.035]}>
        <capsuleGeometry args={[0.045, 0.31, 3, 6]} />
        <meshStandardMaterial color="#03070d" metalness={0.55} roughness={0.42} />
      </mesh>
      <mesh position={[0.075, -0.12, 0.03]} rotation={[0, 0, -0.035]}>
        <capsuleGeometry args={[0.045, 0.31, 3, 6]} />
        <meshStandardMaterial color="#03070d" metalness={0.55} roughness={0.42} />
      </mesh>
      <mesh position={[0, 0.23, 0.11]}>
        <boxGeometry args={[0.026, 0.38, 0.014]} />
        <meshBasicMaterial color="#82cfff" transparent opacity={0.38} />
      </mesh>
      <mesh position={[0, -0.31, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.31, 0.012, 4, 32]} />
        <meshBasicMaterial color="#65dcff" transparent opacity={0.78} />
      </mesh>
    </group>
  );
}

/** Adds restrained console banks to establish the scale of the surrounding lab. */
function LaboratoryConsoleBay({ side }: { side: -1 | 1 }) {
  const screenOffsets = [-0.72, 0, 0.72];

  return (
    <group
      position={[side * 6.55 + (side === 1 ? 1.75 : 0), side === 1 ? -1.25 : -1.05, 0.72]}
      rotation={[0, side * -0.18, 0]}
      scale={[1.16, 1.2, 1.08]}
    >
      <mesh position={[0, 0.26, 0]}>
        <boxGeometry args={[3.1, 0.52, 1.16]} />
        <meshPhysicalMaterial color="#0a1c31" metalness={0.94} roughness={0.22} emissive="#0b2d52" emissiveIntensity={0.58} />
      </mesh>
      <mesh position={[0, 0.52, -0.02]}>
        <boxGeometry args={[3.18, 0.1, 1.2]} />
        <meshStandardMaterial color="#173a5c" metalness={0.96} roughness={0.17} emissive="#0b5b9a" emissiveIntensity={0.82} />
      </mesh>
      <mesh position={[0, 0.04, 0.49]}>
        <boxGeometry args={[2.95, 0.036, 0.036]} />
        <meshBasicMaterial color="#77e5ff" transparent opacity={0.9} />
      </mesh>
      {screenOffsets.map((x, index) => (
        <group key={index} position={[x, 0.79, -0.14]} rotation={[-0.2, 0, side * 0.035]}>
          <mesh position={[0, 0, -0.045]}>
            <boxGeometry args={[0.76, 0.58, 0.11]} />
            <meshStandardMaterial color="#17456d" metalness={0.88} roughness={0.2} emissive="#1162a7" emissiveIntensity={0.72} />
          </mesh>
          <mesh position={[0, 0, 0.005]}>
            <planeGeometry args={[0.66, 0.48]} />
            <meshBasicMaterial color="#1763a6" transparent opacity={0.78} />
          </mesh>
          {[-0.105, -0.025, 0.055, 0.135].map((y, lineIndex) => (
            <mesh key={lineIndex} position={[-0.04, y, 0.012]}>
              <planeGeometry args={[0.4 + (lineIndex % 2) * 0.12, 0.012]} />
              <meshBasicMaterial color={lineIndex === 0 ? "#d1faff" : "#69c9ff"} transparent opacity={lineIndex === 0 ? 0.92 : 0.78} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

/** Builds two recessed architectural planes so the hero reads as a laboratory volume. */
function LaboratoryBackplanes({ tier }: { tier: HeroSceneProps["tier"] }) {
  const beamGeometry = useMemo(() => new BoxGeometry(1, 1, 1), []);
  const beamMaterial = useMemo(
    () => new MeshPhysicalMaterial({
      color: "#ffffff",
      metalness: 0.84,
      roughness: 0.3,
      clearcoat: 0.72,
      clearcoatRoughness: 0.18,
      emissive: "#071c34",
      emissiveIntensity: tier === "FULL" ? 0.36 : 0.22,
      vertexColors: true,
    }),
    [tier],
  );
  const transforms = useMemo(() => {
    const planes = tier === "FULL"
      ? [{ halfWidth: 8.8, halfHeight: 2.65, z: -3.7 }, { halfWidth: 10.2, halfHeight: 3.05, z: -6.5 }]
      : [{ halfWidth: 8.8, halfHeight: 2.65, z: -3.7 }];
    return planes.flatMap(({ halfWidth, halfHeight, z }, planeIndex) => {
      const postHeight = halfHeight * 2;
      const frameColor = planeIndex === 0 ? "#427eae" : "#285b8a";
      const accentColor = planeIndex === 0 ? "#80dcff" : "#438dca";
      const frame: SceneInstanceTransform[] = [
        { position: [-halfWidth, 0, z], scale: [0.12, postHeight, 0.14], color: frameColor },
        { position: [halfWidth, 0, z], scale: [0.12, postHeight, 0.14], color: frameColor },
        { position: [0, halfHeight, z], scale: [halfWidth * 2, 0.105, 0.14], color: accentColor },
        { position: [0, -halfHeight, z], scale: [halfWidth * 2, 0.12, 0.18], color: frameColor },
        { position: [-halfWidth * 0.52, 0, z], scale: [0.046, postHeight * 0.88, 0.075], color: frameColor },
        { position: [halfWidth * 0.52, 0, z], scale: [0.046, postHeight * 0.88, 0.075], color: frameColor },
        { position: [-halfWidth * 0.26, 0, z], scale: [0.035, postHeight * 0.82, 0.065], color: accentColor },
        { position: [halfWidth * 0.26, 0, z], scale: [0.035, postHeight * 0.82, 0.065], color: frameColor },
        { position: [-halfWidth * 0.78, 0, z], scale: [0.035, postHeight * 0.82, 0.065], color: frameColor },
        { position: [halfWidth * 0.78, 0, z], scale: [0.035, postHeight * 0.82, 0.065], color: accentColor },
        { position: [0, halfHeight * 0.44, z], scale: [halfWidth * 1.72, 0.028, 0.08], color: accentColor },
        { position: [0, halfHeight * 0.12, z], scale: [halfWidth * 1.82, 0.022, 0.065], color: frameColor },
        { position: [0, -halfHeight * 0.12, z], scale: [halfWidth * 1.82, 0.022, 0.065], color: accentColor },
        { position: [0, -halfHeight * 0.42, z], scale: [halfWidth * 1.62, 0.024, 0.08], color: frameColor },
      ];
      return frame;
    });
  }, [tier]);
  const beams = useSceneInstances(beamGeometry, beamMaterial, transforms);
  const panelGeometry = useMemo(() => new BoxGeometry(1, 1, 1), []);
  const panelMaterial = useMemo(
    () => new MeshPhysicalMaterial({
      color: "#ffffff",
      metalness: 0.76,
      roughness: 0.32,
      clearcoat: 0.62,
      clearcoatRoughness: 0.2,
      emissive: "#0a1e37",
      emissiveIntensity: tier === "FULL" ? 0.9 : 0.66,
      transparent: true,
      opacity: 0.92,
      vertexColors: true,
    }),
    [],
  );
  const wallPanels = useMemo(() => {
    const planes = tier === "FULL"
      ? [{ z: -3.84, columns: 7, halfWidth: 8.8 }, { z: -6.62, columns: 7, halfWidth: 10.2 }]
      : [{ z: -3.84, columns: 7, halfWidth: 8.8 }];
    return planes.flatMap(({ z, columns, halfWidth }, planeIndex) =>
      Array.from({ length: columns * 2 }, (_, index): SceneInstanceTransform => {
        const row = Math.floor(index / columns);
        const column = index % columns;
        const width = (halfWidth * 2) / columns;
        const x = -halfWidth + width * (column + 0.5);
        const y = row === 0 ? 1.28 : -1.28;
        return {
          position: [x, y, z],
          scale: [width * 0.92, 1.14, planeIndex === 0 ? 0.12 : 0.08],
          color: planeIndex === 0
            ? column % 3 === 0 ? "#173a5d" : "#102a45"
            : column % 3 === 0 ? "#0f2b48" : "#0a2038",
        };
      }),
    );
  }, [tier]);
  const wallPanelInstances = useSceneInstances(panelGeometry, panelMaterial, wallPanels);

  useEffect(() => () => {
    beamGeometry.dispose();
    beamMaterial.dispose();
    panelGeometry.dispose();
    panelMaterial.dispose();
  }, [beamGeometry, beamMaterial, panelGeometry, panelMaterial]);

  return <>
    <primitive object={wallPanelInstances} />
    <primitive object={beams} />
  </>;
}

/** Builds the reflective-looking platform rings and restrained holographic panels. */

function FloorGuideLines() {
  const geometry = useMemo(() => new PlaneGeometry(1, 1), []);
  const material = useMemo(
    () => new MeshBasicMaterial({
      color: "#ffffff",
      transparent: true,
      opacity: 0.3,
      side: DoubleSide,
      vertexColors: true,
    }),
    [],
  );
  const transforms = useMemo(() => [
    ...Array.from({ length: 17 }, (_, index): SceneInstanceTransform => ({
      position: [-10 + index * 1.25, -2.115, -1.2],
      rotation: [-Math.PI / 2, 0, 0],
      scale: [0.016, 28, 1],
      color: index % 4 === 0 ? "#49baff" : "#2266b5",
    })),
    ...Array.from({ length: 10 }, (_, index): SceneInstanceTransform => ({
      position: [0, -2.112, -11 + index * 2.45],
      rotation: [-Math.PI / 2, 0, 0],
      scale: [30, 0.016, 1],
      color: "#2b74bd",
    })),
    ...Array.from({ length: 12 }, (_, index): SceneInstanceTransform => ({
      position: [3.08, -1.897, -0.2],
      rotation: [-Math.PI / 2, 0, (index / 12) * Math.PI],
      scale: [0.014, 9.8, 1],
      color: index % 3 === 0 ? "#89e8ff" : "#236fbd",
    })),
  ], []);
  const lines = useSceneInstances(geometry, material, transforms);

  useEffect(() => () => {
    geometry.dispose();
    material.dispose();
  }, [geometry, material]);

  return <primitive object={lines} />;
}

const holographicPanelPlacements: Array<[number, number, number, number, number]> = [
  [5.85, 1.57, -1.1, 2.6, 1.8],
  [10.4, 1.15, -0.92, 3.5, 2.35],
  [13.45, -0.58, -0.35, 2.65, 1.8],
  [-2.72, 0.88, -0.72, 2.35, 1.68],
];

interface HolographicPanelRect {
  panel: number;
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
}

function buildHolographicPanelGeometry(rectangles: HolographicPanelRect[], depth = 0) {
  const parts = rectangles.map((rectangle) => {
    const [x, y, z, , ] = holographicPanelPlacements[rectangle.panel];
    const panelGroup = new Object3D();
    panelGroup.position.set(x, y, z);
    panelGroup.rotation.set(0, rectangle.panel === 0 ? 0.2 : -0.16, rectangle.panel === 2 ? -0.05 : 0);
    panelGroup.updateMatrix();

    const localPlane = new Object3D();
    localPlane.position.set(rectangle.x, rectangle.y, rectangle.z);
    localPlane.updateMatrix();

    const geometry = depth > 0
      ? new BoxGeometry(rectangle.width, rectangle.height, depth)
      : new PlaneGeometry(rectangle.width, rectangle.height);
    geometry.applyMatrix4(new Matrix4().multiplyMatrices(panelGroup.matrix, localPlane.matrix));
    return geometry;
  });
  const geometry = mergeGeometries(parts, false);
  parts.forEach((part) => part.dispose());
  if (!geometry) throw new Error("Holographic panel geometry could not be merged.");
  return geometry;
}

function HolographicPanelBank({ environment }: { environment: Texture }) {
  const panelRects = useMemo(
    () => holographicPanelPlacements.map(([, , , width, height], panel) => ({ panel, width, height })),
    [],
  );
  const geometry = useMemo(() => {
    const rectsFor = (
      factory: (panel: number, width: number, height: number) => HolographicPanelRect[],
    ) => panelRects.flatMap(({ panel, width, height }) => factory(panel, width, height));

    const backplates = buildHolographicPanelGeometry(
      rectsFor((panel, width, height) => [{ panel, x: 0, y: 0, z: -0.035, width: width + 0.14, height: height + 0.14 }]),
      0.14,
    );
    const glassFaces = buildHolographicPanelGeometry(rectsFor((panel, width, height) => [{ panel, x: 0, y: 0, z: 0, width, height }]));
    const innerGlass = buildHolographicPanelGeometry(rectsFor((panel, width, height) => [{ panel, x: 0, y: 0, z: -0.02, width: width * 0.94, height: height * 0.92 }]));
    const wireframes = buildHolographicPanelGeometry(rectsFor((panel, width, height) => [{ panel, x: 0, y: 0, z: 0.015, width: width * 0.94, height: height * 0.9 }]));
    const horizontalFrames = buildHolographicPanelGeometry(rectsFor((panel, width, height) => [
      { panel, x: 0, y: height / 2, z: 0.03, width, height: 0.035 },
      { panel, x: 0, y: -height / 2, z: 0.03, width, height: 0.035 },
    ]));
    const verticalFrames = buildHolographicPanelGeometry(rectsFor((panel, width, height) => [
      { panel, x: -width / 2, y: 0, z: 0.03, width: 0.035, height },
      { panel, x: width / 2, y: 0, z: 0.03, width: 0.035, height },
      { panel, x: -width / 2, y: 0, z: 0.022, width: 0.014, height: height * 0.92 },
      { panel, x: width / 2, y: 0, z: 0.022, width: 0.014, height: height * 0.92 },
    ]));
    const highlightLines = buildHolographicPanelGeometry(rectsFor((panel, width, height) => [{
      panel, x: -width * 0.1, y: -0.34 * height, z: 0.025, width: width * 0.76, height: 0.016,
    }]));
    const telemetryLines = buildHolographicPanelGeometry(rectsFor((panel, width, height) =>
      [-0.2, -0.06, 0.08, 0.22, 0.36].map((lineY, index) => ({
        panel,
        x: -width * (index % 2 ? 0.02 : 0.1),
        y: lineY * height,
        z: 0.025,
        width: width * (0.76 - ((index + 1) % 3) * 0.12),
        height: (index + 1) % 3 === 0 ? 0.016 : 0.009,
      })),
    ));

    return { backplates, glassFaces, innerGlass, wireframes, horizontalFrames, verticalFrames, highlightLines, telemetryLines };
  }, [panelRects]);
  const materials = useMemo(
    () => ({
      backplates: new MeshPhysicalMaterial({ color: "#164d79", metalness: 0.72, roughness: 0.22, clearcoat: 0.9, clearcoatRoughness: 0.1, emissive: "#08305a", emissiveIntensity: 0.34, envMap: environment, envMapIntensity: 0.62, transparent: true, opacity: 0.54, side: DoubleSide, depthWrite: false }),
      glassFaces: new MeshPhysicalMaterial({ color: "#3d83b6", metalness: 0.36, roughness: 0.16, clearcoat: 0.96, clearcoatRoughness: 0.06, envMap: environment, envMapIntensity: 0.82, transparent: true, opacity: 0.3, side: DoubleSide, depthWrite: false }),
      innerGlass: new MeshPhysicalMaterial({ color: "#061b35", metalness: 0.28, roughness: 0.2, clearcoat: 0.84, clearcoatRoughness: 0.11, envMap: environment, envMapIntensity: 0.48, transparent: true, opacity: 0.34, side: DoubleSide, depthWrite: false }),
      wireframes: new MeshBasicMaterial({ color: "#68dfff", wireframe: true, transparent: true, opacity: 0.5, side: DoubleSide, depthWrite: false }),
      horizontalFrames: new MeshBasicMaterial({ color: "#d6fbff", transparent: true, opacity: 0.94, side: DoubleSide }),
      verticalFrames: new MeshBasicMaterial({ color: "#5dbbff", transparent: true, opacity: 0.86, side: DoubleSide }),
      highlightLines: new MeshBasicMaterial({ color: "#e1fbff", transparent: true, opacity: 0.94, side: DoubleSide }),
      telemetryLines: new MeshBasicMaterial({ color: "#67c8ff", transparent: true, opacity: 0.72, side: DoubleSide }),
    }),
    [environment],
  );

  useEffect(() => () => {
    Object.values(geometry).forEach((item) => item.dispose());
    Object.values(materials).forEach((item) => item.dispose());
  }, [geometry, materials]);

  return (
    <group>
      {Object.entries(geometry).map(([key, item]) => (
        <mesh key={key} geometry={item} material={materials[key as keyof typeof materials]} />
      ))}
    </group>
  );
}

function FloorAndPanels({
  tier,
  environment,
}: {
  tier: HeroSceneProps["tier"];
  environment: Texture;
}) {
  const platformMaterials = useMemo(
    () => [
      new MeshPhysicalMaterial({ color: "#07101d", metalness: 0.96, roughness: 0.21, clearcoat: 0.62, clearcoatRoughness: 0.16, envMap: environment, envMapIntensity: 0.55, emissive: "#07182e", emissiveIntensity: 0.3 }),
      new MeshPhysicalMaterial({ color: "#0b1a2c", metalness: 0.97, roughness: 0.18, clearcoat: 0.76, clearcoatRoughness: 0.12, envMap: environment, envMapIntensity: 0.62, emissive: "#09264a", emissiveIntensity: 0.28 }),
      new MeshPhysicalMaterial({ color: "#030913", metalness: 0.98, roughness: 0.16, clearcoat: 0.82, clearcoatRoughness: 0.1, envMap: environment, envMapIntensity: 0.7, emissive: "#0a2b55", emissiveIntensity: 0.34 }),
      new MeshBasicMaterial({ color: "#030609", side: DoubleSide }),
    ],
    [environment],
  );
  useEffect(() => () => platformMaterials.forEach((material) => material.dispose()), [platformMaterials]);

  return (
    <group>
      <mesh position={[0, -2.14, -1.6]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[28, 26]} />
        <primitive object={platformMaterials[3]} attach="material" />
      </mesh>
      <mesh position={[3.08, -2.075, -0.2]}>
        <cylinderGeometry args={[5.02, 5.28, 0.16, 112, 1]} />
        <primitive object={platformMaterials[0]} attach="material" />
      </mesh>
      <mesh position={[3.08, -2.005, -0.2]}>
        <cylinderGeometry args={[4.02, 4.18, 0.09, 112, 1]} />
        <primitive object={platformMaterials[1]} attach="material" />
      </mesh>
      <mesh position={[3.08, -1.957, -0.2]}>
        <cylinderGeometry args={[3.02, 3.18, 0.055, 112, 1]} />
        <primitive object={platformMaterials[2]} attach="material" />
      </mesh>
      <FloorGuideLines />
      {[1.22, 1.42, 1.66, 1.9, 2.12, 2.38, 2.66, 2.92, 3.18, 3.44, 3.72, 4.02, 4.3, 4.56, 4.82, 5.08, 5.34, 5.58].map((radius, index) => (
        <mesh key={radius} position={[3.08, -1.858 + index * 0.008, -0.2]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, index % 5 === 0 ? 0.065 : 0.035, 8, 144]} />
          <meshBasicMaterial color={index % 4 === 0 ? "#c6f5ff" : index % 2 ? "#286ac5" : "#51b7eb"} transparent opacity={index % 4 === 0 ? 0.62 : Math.max(0.2, 0.42 - index * 0.008)} />
        </mesh>
      ))}
      <mesh position={[3.08, -1.924, -0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[5.12, 0.095, 7, 120]} />
        <meshBasicMaterial color="#3e98ee" transparent opacity={0.48} />
      </mesh>
      {[-5.35, 5.35].map((x, index) => (
        <group key={x}>
          <mesh position={[x, -2.034, 2.3]}>
            <boxGeometry args={[0.1, 0.048, 12.2]} />
            <meshBasicMaterial color={index === 0 ? "#328cff" : "#5adfff"} transparent opacity={0.76} />
          </mesh>
          <mesh position={[x, -2.008, 2.3]}>
            <boxGeometry args={[0.26, 0.018, 12.2]} />
            <meshBasicMaterial color="#0f3b6c" transparent opacity={0.74} />
          </mesh>
        </group>
      ))}
      {[-7.4, -6.35, -4.55, 4.55, 6.35, 7.4].map((x, index) => (
        <group key={"floor-runway-" + x} position={[x, -2.095, 2.65]}>
          <mesh>
            <boxGeometry args={[index % 3 === 0 ? 0.12 : 0.065, 0.03, 7.2]} />
            <meshBasicMaterial color={index % 2 ? "#286ac5" : "#8ceaff"} transparent opacity={index % 2 ? 0.58 : 0.74} />
          </mesh>
          <mesh position={[0, -0.018, 0]}>
            <boxGeometry args={[0.3, 0.016, 7.4]} />
            <meshBasicMaterial color="#0b2850" transparent opacity={0.58} />
          </mesh>
        </group>
      ))}
      <LaboratoryBackplanes tier={tier} />
      <HolographicPanelBank environment={environment} />
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

/** Places the text-generated laboratory environment behind the live geometry. */
function CinematicBackdrop({
  environment,
  tier,
}: {
  environment: Texture;
  tier: HeroSceneProps["tier"];
}) {
  const { scene } = useThree();

  useEffect(() => {
    const previousBackground = scene.background;
    const previousBackgroundIntensity = scene.backgroundIntensity;
    const previousEnvironment = scene.environment;
    const previousEnvironmentIntensity = scene.environmentIntensity;
    environment.colorSpace = SRGBColorSpace;
    environment.needsUpdate = true;
    scene.background = environment;
    scene.backgroundIntensity = tier === "FULL" ? 0.72 : 0.56;
    scene.environment = environment;
    scene.environmentIntensity = tier === "FULL" ? 1.2 : 0.9;

    return () => {
      if (scene.background === environment) scene.background = previousBackground;
      scene.backgroundIntensity = previousBackgroundIntensity;
      if (scene.environment === environment) scene.environment = previousEnvironment;
      scene.environmentIntensity = previousEnvironmentIntensity;
    };
  }, [environment, scene, tier]);

  return null;
}

/**
 * Composes the living laboratory world and applies bounded pointer, scroll and
 * idle motion without moving semantic content into the canvas.
 */
function SceneReadiness({ onReady }: Pick<HeroSceneProps, "onReady">) {
  useEffect(() => {
    let secondFrame: number | null = null;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(onReady);
    });

    return () => {
      cancelAnimationFrame(firstFrame);
      if (secondFrame !== null) cancelAnimationFrame(secondFrame);
    };
  }, [onReady]);

  return null;
}

function HolographicWorld({
  tier,
  onReady,
}: Pick<HeroSceneProps, "tier" | "onReady">) {
  const backdrop = useLoader(TextureLoader, "/generated/home/hero-lab-environment-360.webp");
  const environment = useMemo(() => {
    const reflection = backdrop.clone();
    reflection.mapping = EquirectangularReflectionMapping;
    reflection.colorSpace = SRGBColorSpace;
    reflection.needsUpdate = true;
    return reflection;
  }, [backdrop]);
  const world = useRef<Group>(null);
  const pointerTarget = useRef({ x: 0, y: 0, scroll: 0 });
  const scale = getMotionScale(tier);
  useEffect(() => () => environment.dispose(), [environment]);
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
      <SceneReadiness onReady={onReady} />
      <CinematicBackdrop environment={environment} tier={tier} />
      <ambientLight intensity={tier === "FULL" ? 0.48 : 0.4} color="#7899c3" />
      <hemisphereLight args={["#a8dcff", "#020710", 0.82]} />
      <directionalLight position={[1, 5, 8]} intensity={tier === "FULL" ? 2.2 : 1.55} color="#d9efff" />
      <directionalLight position={[-5, 1, 1]} intensity={tier === "FULL" ? 3.2 : 1.9} color="#287aff" />
      <directionalLight position={[5, 3, -4]} intensity={tier === "FULL" ? 2.7 : 1.5} color="#55cfff" />
      <directionalLight position={[-1, 4, -6]} intensity={tier === "FULL" ? 1.9 : 1} color="#6daaff" />
      <pointLight position={[2.6, 3.4, 7.5]} intensity={tier === "FULL" ? 22 : 13} distance={18} decay={2} color="#e7f7ff" />
      <pointLight position={[4.2, -0.2, 6.5]} intensity={tier === "FULL" ? 12 : 7} distance={15} decay={2} color="#3ebdff" />
      {tier === "FULL" ? (
        <>
          <BlenderChamberModel environment={environment} />
          <FloorGuideLines />
          <HolographicPanelBank environment={environment} />
          <LaboratoryConsoleBay side={-1} />
          <LaboratoryConsoleBay side={1} />
        </>
      ) : (
        <>
          <Chamber tier={tier} />
          <LaboratoryConsoleBay side={-1} />
          <LaboratoryConsoleBay side={1} />
          <FloorAndPanels environment={environment} tier={tier} />
        </>
      )}
      <PrecisionBladesN environment={environment} tier={tier} />
      <GlobalNetwork tier={tier} />
      <HumanScaleFigure />
      <SceneParticles tier={tier} />
      {Array.from({ length: tier === "FULL" ? 6 : 3 }, (_, index) => (
        <EnergyFilament key={index} index={index} tier={tier} />
      ))}
    </group>
  );
}

/** Loads Blender-authored chamber architecture into the existing Home Canvas. */
function BlenderChamberModel({ environment }: { environment: Texture }) {
  const { scene } = useLoader(GLTFLoader, "/generated/home/blender/hero-lab-structure-r17.glb");
  const chamber = useMemo(() => {
    scene.traverse((object) => {
      if (!(object instanceof Mesh)) return;
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      for (const material of materials) {
        if (!(material instanceof MeshStandardMaterial) || material.name !== "Graphite metallic floor") continue;
        material.color.set("#000205");
        material.metalness = 0.08;
        material.roughness = 0.94;
        material.envMap = environment;
        material.envMapIntensity = 0.012;
        material.emissive.set("#000000");
        material.emissiveIntensity = 0;
        material.needsUpdate = true;
      }
    });
    return scene;
  }, [environment, scene]);

  return (
    <primitive
      object={chamber}
      position={[3.08, -1.82, -1.1]}
      scale={[0.96, 0.76, 0.96]}
      dispose={null}
    />
  );
}


/**
 * Hosts the lazy React Three Fiber canvas, tier-specific DPR and two-frame
 * readiness handshake used by the poster-to-live crossfade.
 */
export default function HeroScene({ tier, onReady, onFailure }: HeroSceneProps) {
  const dpr: [number, number] = tier === "FULL" ? [1, 1.5] : [1, 1.25];

  return (
    <div className={styles.canvasFrame} data-renderer="react-three-fiber">
      <Canvas
        camera={{ position: [0, 0.15, 12], fov: 40, near: 0.1, far: 50 }}
        dpr={dpr}
        frameloop="demand"
        gl={{
          alpha: true,
          antialias: tier === "FULL",
          failIfMajorPerformanceCaveat: true,
          powerPreference: tier === "FULL" ? "high-performance" : "low-power",
          preserveDrawingBuffer: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x050914, 0);
        }}
      >
        <SceneLifecycle onFailure={onFailure} />
        <Suspense fallback={null}>
          <HolographicWorld onReady={onReady} tier={tier} />
        </Suspense>
      </Canvas>
    </div>
  );
}
