"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  BoxGeometry,
  BufferGeometry,
  CatmullRomCurve3,
  Color,
  DoubleSide,
  EquirectangularReflectionMapping,
  ExtrudeGeometry,
  DataTexture,
  RGBAFormat,
  SRGBColorSpace,
  Float32BufferAttribute,
  Group,
  InstancedMesh,
  Matrix4,
  Material,
  Mesh,
  MeshPhysicalMaterial,
  MeshBasicMaterial,
  Object3D,
  PlaneGeometry,
  ShapeGeometry,
  SphereGeometry,
  TubeGeometry,
  Vector3,
} from "three";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";
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
        [0, new Color("#17395f")],
        [0.08, new Color("#9fc9e8")],
        [0.17, new Color("#eefaff")],
        [0.25, new Color("#315b82")],
        [0.34, new Color("#102641")],
        [0.43, new Color("#a8ddfa")],
        [0.51, new Color("#f7fdff")],
        [0.59, new Color("#1d3857")],
        [0.68, new Color("#d3f1ff")],
        [0.77, new Color("#326792")],
        [0.86, new Color("#e9f8ff")],
        [0.94, new Color("#18385d")],
        [1, new Color("#8db6d5")],
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


/** Builds a tiny studio-strip environment map so chrome reflects authored chamber lights. */
function useChromeEnvironmentMap() {
  const environment = useMemo(() => {
    const width = 256;
    const height = 128;
    const data = new Uint8Array(width * height * 4);
    const softboxes = [
      { center: 0.09, width: 0.035, color: [43, 122, 255], power: 0.75 },
      { center: 0.27, width: 0.055, color: [194, 235, 255], power: 0.95 },
      { center: 0.5, width: 0.08, color: [29, 69, 121], power: 0.84 },
      { center: 0.71, width: 0.052, color: [215, 248, 255], power: 0.98 },
      { center: 0.91, width: 0.03, color: [52, 151, 255], power: 0.85 },
    ];
    for (let y = 0; y < height; y += 1) {
      const v = y / height;
      for (let x = 0; x < width; x += 1) {
        const u = x / width;
        let red = 3 + Math.max(0, 1 - Math.abs(v - 0.48) * 2) * 7;
        let green = 7 + Math.max(0, 1 - Math.abs(v - 0.48) * 2) * 13;
        let blue = 17 + Math.max(0, 1 - Math.abs(v - 0.48) * 2) * 30;
        for (const strip of softboxes) {
          const falloff = Math.exp(-(((u - strip.center) / strip.width) ** 2)) * strip.power;
          const verticalMask = 0.42 + 0.58 * Math.sin(Math.PI * Math.min(1, Math.max(0, (v - 0.04) / 0.92)));
          red += strip.color[0] * falloff * verticalMask;
          green += strip.color[1] * falloff * verticalMask;
          blue += strip.color[2] * falloff * verticalMask;
        }
        const rim = Math.exp(-(((v - 0.11) / 0.035) ** 2)) + Math.exp(-(((v - 0.89) / 0.04) ** 2));
        red += 35 * rim;
        green += 125 * rim;
        blue += 190 * rim;
        const offset = (y * width + x) * 4;
        data[offset] = Math.min(255, red);
        data[offset + 1] = Math.min(255, green);
        data[offset + 2] = Math.min(255, blue);
        data[offset + 3] = 255;
      }
    }
    const texture = new DataTexture(data, width, height, RGBAFormat);
    texture.mapping = EquirectangularReflectionMapping;
    texture.colorSpace = SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }, []);

  useEffect(() => () => environment.dispose(), [environment]);
  return environment;
}

/** Renders the selected Precision Blades N with tier-scaled living motion. */
function PrecisionBladesN({ tier }: { tier: HeroSceneProps["tier"] }) {
  const geometry = useHeroGeometry();
  const faceGeometry = useHeroFaceGeometry();
  const environment = useChromeEnvironmentMap();
  const mark = useRef<Group>(null);
  const materials = useMemo(
    () => [
      new MeshPhysicalMaterial({
        color: new Color("#8fa6bb"),
        metalness: 0.98,
        roughness: 0.12,
        clearcoat: 0.68,
        clearcoatRoughness: 0.08,
        emissive: new Color("#12345d"),
        emissiveIntensity: 0.36,
        envMap: environment,
        envMapIntensity: 2.15,
        side: DoubleSide,
      }),
      new MeshPhysicalMaterial({
        color: "#d0e5f3",
        metalness: 0.98,
        roughness: 0.16,
        clearcoat: 0.92,
        clearcoatRoughness: 0.08,
        envMap: environment,
        envMapIntensity: 2.8,
        vertexColors: true,
        side: DoubleSide,
      }),
    ],
    [environment],
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
      scale={1.15}
    >
      <mesh geometry={geometry} material={materials[0]} castShadow={false} receiveShadow={false} />
      <mesh geometry={faceGeometry} material={materials[1]} position={[0, 0, 0.129]} castShadow={false} receiveShadow={false} />
      <pointLight color="#d8f5ff" intensity={5.5} distance={3.8} position={[-0.72, 0.76, 1.45]} />
      <pointLight color="#46aaff" intensity={7} distance={4.2} position={[0.88, -0.2, 1.25]} />
      <pointLight color="#effcff" intensity={3.5} distance={3.5} position={[0.12, 1.35, 0.9]} />
    </group>
  );
}

/** Renders the luminous portal chamber and structural energy rails around the N. */
function Chamber({ tier }: { tier: HeroSceneProps["tier"] }) {
  const rails = useRef<Group>(null);
  const detailSegments = tier === "FULL" ? 112 : 64;
  const ribCount = tier === "FULL" ? 28 : 16;
  const ribGeometry = useMemo(() => new BoxGeometry(0.04, 5.15, 0.052), []);
  const ribMaterial = useMemo(
    () => new MeshBasicMaterial({
      color: "#ffffff",
      transparent: true,
      opacity: 0.46,
      vertexColors: true,
    }),
    [],
  );
  const ribTransforms = useMemo(
    () => Array.from({ length: ribCount }, (_, index): SceneInstanceTransform => {
      const angle = (index / ribCount) * Math.PI * 2;
      const radius = 3.52;
      return {
        position: [Math.cos(angle) * radius, 0.02, Math.sin(angle) * radius - 0.06],
        rotation: [0, -angle, 0],
        color: index % 6 === 0 ? "#b5f1ff" : index % 3 === 0 ? "#5595c7" : "#2d6397",
      };
    }),
    [ribCount],
  );
  const ribInstances = useSceneInstances(ribGeometry, ribMaterial, ribTransforms);
  const outerRibTransforms = useMemo(
    () => Array.from({ length: tier === "FULL" ? 18 : 10 }, (_, index): SceneInstanceTransform => {
      const angle = (index / (tier === "FULL" ? 18 : 10)) * Math.PI * 2;
      const radius = 4.08;
      return {
        position: [Math.cos(angle) * radius, 0.08, Math.sin(angle) * radius - 0.48],
        rotation: [0, -angle, 0],
        scale: [0.62, 1, 0.62],
        color: index % 6 === 0 ? "#72d5ff" : "#3976a9",
      };
    }),
    [tier],
  );
  const outerRibs = useSceneInstances(ribGeometry, ribMaterial, outerRibTransforms);
  const axialCount = tier === "FULL" ? 17 : 9;
  const axialGeometry = useMemo(() => new BoxGeometry(0.026, 5.16, 0.034), []);
  const axialMaterial = useMemo(
    () => new MeshBasicMaterial({
      color: "#ffffff",
      transparent: true,
      opacity: 0.82,
      vertexColors: true,
    }),
    [],
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
    axialGeometry.dispose();
    axialMaterial.dispose();
  }, [axialGeometry, axialMaterial, ribGeometry, ribMaterial]);

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
      <group ref={rails}>
        {[
          [2.2, 2.38], [2.38, 2.26], [2.55, 2.12], [2.78, 1.74],
          [3.52, 2.45], [3.88, 2.57], [4.12, 2.42],
          [3.02, -1.84], [3.22, -2.38], [3.42, -2.56],
          [3.72, -2.43], [4.02, -2.3],
        ].map(([radius, y], index) => (
          <mesh key={radius} position={[0, y, -0.06]} rotation={[Math.PI / 2 + 0.035, 0, 0]}>
            <torusGeometry args={[radius, index % 3 === 1 ? 0.042 : 0.062, 8, detailSegments]} />
            <meshBasicMaterial color={index % 4 === 0 ? "#d5faff" : index % 3 === 1 ? "#78d7ff" : index % 2 ? "#49a5ff" : "#286ce0"} transparent opacity={index % 3 === 1 ? 0.82 : 0.66} />
          </mesh>
        ))}
        <primitive object={ribInstances} />
        <primitive object={outerRibs} />
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
            <boxGeometry args={[8.85, 0.12, 0.18]} />
            <meshStandardMaterial color="#112c49" metalness={0.9} roughness={0.26} emissive="#0a3b6d" emissiveIntensity={0.68} />
          </mesh>
        ))}
        {[3.55, 3.88, 4.16].map((radius, index) => (
          <mesh key={"crown-ring-" + index} position={[0, 2.18, -0.1]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, index === 1 ? 0.065 : 0.035, 8, detailSegments]} />
            <meshBasicMaterial color={index === 1 ? "#c1f6ff" : "#347cff"} transparent opacity={index === 1 ? 0.88 : 0.66} />
          </mesh>
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
  }, [nodeGeometry, nodeMaterial]);

  useFrame((_, delta) => {
    if (globe.current) globe.current.rotation.y += delta * livingOrganismMotion.globeRotation;
  });

  return (
    <group ref={globe} position={[6.5, 0.58, -1.55]} scale={2.36}>
      <mesh>
        <sphereGeometry args={[1.17, tier === "FULL" ? 36 : 22, tier === "FULL" ? 28 : 16]} />
        <meshBasicMaterial color="#168dff" transparent opacity={0.11} side={DoubleSide} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.06, tier === "FULL" ? 40 : 22, tier === "FULL" ? 30 : 16]} />
        <meshPhysicalMaterial color="#10437f" metalness={0.52} roughness={0.22} transparent opacity={0.82} emissive="#073474" emissiveIntensity={0.82} envMapIntensity={1.35} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.075, tier === "FULL" ? 28 : 16, tier === "FULL" ? 20 : 12]} />
        <meshBasicMaterial color="#42aaff" wireframe transparent opacity={0.46} />
      </mesh>
      {[
        { position: [-0.45, 0.34, 0.91] as [number, number, number], scale: [0.78, 0.48, 0.14] as [number, number, number], rotation: [0.12, -0.24, 0.1] as [number, number, number] },
        { position: [0.08, 0.55, 0.82] as [number, number, number], scale: [0.54, 0.35, 0.13] as [number, number, number], rotation: [-0.18, 0.12, -0.22] as [number, number, number] },
        { position: [0.46, -0.12, 0.91] as [number, number, number], scale: [0.68, 0.44, 0.13] as [number, number, number], rotation: [0.1, 0.36, 0.2] as [number, number, number] },
        { position: [-0.25, -0.5, 0.82] as [number, number, number], scale: [0.64, 0.34, 0.12] as [number, number, number], rotation: [-0.16, -0.18, 0.28] as [number, number, number] },
      ].map((mass, index) => (
        <mesh key={"continent-" + index} position={mass.position} rotation={mass.rotation} scale={mass.scale}>
          <icosahedronGeometry args={[0.34, 0]} />
          <meshBasicMaterial color={index % 2 ? "#2584db" : "#46a7ec"} transparent opacity={0.46} />
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
      <pointLight color="#299bff" intensity={tier === "FULL" ? 2.4 : 1.1} distance={5} />
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
      new Vector3(2.35, -1.4 + index * 0.28, -1.8),
      new Vector3(4.1, 1.4 * sign, -0.6),
      new Vector3(2.15, -1.1 * sign, 1.4),
      new Vector3(5.4, 1.4 + index * 0.2, -0.7),
      new Vector3(8.2, -0.3 + index * 0.38, 0.8),
    ]);
  }, [index]);
  const geometry = useMemo(() => new TubeGeometry(curve, 96, 0.022, 6, false), [curve]);
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
        <meshBasicMaterial color={index % 2 === 0 ? "#1c78ff" : "#56e5ff"} transparent opacity={tier === "FULL" ? 0.62 : 0.38} />
      </mesh>
      <mesh ref={node}>
        <sphereGeometry args={[tier === "FULL" ? 0.045 : 0.03, 8, 6]} />
        <meshBasicMaterial color="#b5f7ff" />
      </mesh>
    </group>
  );
}

/** Adds a human-scale visitor silhouette grounded in the chamber platform. */
function HumanScaleFigure() {
  return (
    <group position={[-1.18, -1.58, 3.5]} scale={1.34}>
      <mesh position={[0, 0.65, 0]}>
        <sphereGeometry args={[0.105, 10, 8]} />
        <meshBasicMaterial color="#02050a" />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <capsuleGeometry args={[0.13, 0.48, 4, 8]} />
        <meshStandardMaterial color="#173655" metalness={0.64} roughness={0.31} emissive="#1766a5" emissiveIntensity={0.82} />
      </mesh>
      <mesh position={[0, 0.28, -0.11]}>
        <boxGeometry args={[0.24, 0.34, 0.13]} />
        <meshStandardMaterial color="#0b1d32" metalness={0.76} roughness={0.24} emissive="#0a2a4f" emissiveIntensity={0.32} />
      </mesh>
      <mesh position={[0, 0.48, 0]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.055, 0.29, 3, 6]} />
        <meshStandardMaterial color="#091421" metalness={0.42} roughness={0.38} />
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
        <boxGeometry args={[0.026, 0.38, 0.014]} />
        <meshBasicMaterial color="#a9f2ff" transparent opacity={0.92} />
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
    <group position={[side * 6.55, -1.05, 0.72]} rotation={[0, side * -0.18, 0]} scale={[1.16, 1.2, 1.08]}>
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
    () => new MeshBasicMaterial({
      color: "#ffffff",
      transparent: true,
      opacity: tier === "FULL" ? 0.72 : 0.54,
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
        { position: [0, halfHeight * 0.44, z], scale: [halfWidth * 1.72, 0.028, 0.08], color: accentColor },
        { position: [0, -halfHeight * 0.42, z], scale: [halfWidth * 1.62, 0.024, 0.08], color: frameColor },
      ];
      return frame;
    });
  }, [tier]);
  const beams = useSceneInstances(beamGeometry, beamMaterial, transforms);

  useEffect(() => () => {
    beamGeometry.dispose();
    beamMaterial.dispose();
  }, [beamGeometry, beamMaterial]);

  return <primitive object={beams} />;
}

/** Builds the reflective-looking platform rings and restrained holographic panels. */

function FloorGuideLines() {
  const geometry = useMemo(() => new PlaneGeometry(1, 1), []);
  const material = useMemo(
    () => new MeshBasicMaterial({
      color: "#ffffff",
      transparent: true,
      opacity: 0.22,
      side: DoubleSide,
      vertexColors: true,
    }),
    [],
  );
  const transforms = useMemo(() => [
    ...Array.from({ length: 13 }, (_, index): SceneInstanceTransform => ({
      position: [-9 + index * 1.5, -2.115, -1.2],
      rotation: [-Math.PI / 2, 0, 0],
      scale: [0.012, 24, 1],
      color: "#2266b5",
    })),
    ...Array.from({ length: 8 }, (_, index): SceneInstanceTransform => ({
      position: [0, -2.112, -10 + index * 2.3],
      rotation: [-Math.PI / 2, 0, 0],
      scale: [28, 0.012, 1],
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
  [-0.8, 1.38, -2.35, 1.9, 1.42],
  [8.2, 1.12, -2.25, 2.7, 1.82],
  [8.45, -0.42, -0.72, 2.2, 1.46],
  [2.6, 2.28, -2.85, 1.78, 1.16],
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

function HolographicPanelBank() {
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
      backplates: new MeshBasicMaterial({ color: "#187fe8", transparent: true, opacity: 0.27, side: DoubleSide, depthWrite: false }),
      glassFaces: new MeshBasicMaterial({ color: "#104779", transparent: true, opacity: 0.52, side: DoubleSide, depthWrite: false }),
      innerGlass: new MeshBasicMaterial({ color: "#061b35", transparent: true, opacity: 0.48, side: DoubleSide, depthWrite: false }),
      wireframes: new MeshBasicMaterial({ color: "#68dfff", wireframe: true, transparent: true, opacity: 0.3, side: DoubleSide, depthWrite: false }),
      horizontalFrames: new MeshBasicMaterial({ color: "#c6f7ff", transparent: true, opacity: 0.86, side: DoubleSide }),
      verticalFrames: new MeshBasicMaterial({ color: "#5dbbff", transparent: true, opacity: 0.76, side: DoubleSide }),
      highlightLines: new MeshBasicMaterial({ color: "#e1fbff", transparent: true, opacity: 0.86, side: DoubleSide }),
      telemetryLines: new MeshBasicMaterial({ color: "#67c8ff", transparent: true, opacity: 0.64, side: DoubleSide }),
    }),
    [],
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

function FloorAndPanels({ tier }: { tier: HeroSceneProps["tier"] }) {
  const environment = useChromeEnvironmentMap();
  const platformMaterials = useMemo(
    () => [
      new MeshPhysicalMaterial({ color: "#07101d", metalness: 0.96, roughness: 0.21, clearcoat: 0.62, clearcoatRoughness: 0.16, envMap: environment, envMapIntensity: 1.4, emissive: "#07182e", emissiveIntensity: 0.55 }),
      new MeshPhysicalMaterial({ color: "#0b1a2c", metalness: 0.97, roughness: 0.18, clearcoat: 0.76, clearcoatRoughness: 0.12, envMap: environment, envMapIntensity: 1.65, emissive: "#09264a", emissiveIntensity: 0.5 }),
      new MeshPhysicalMaterial({ color: "#030913", metalness: 0.98, roughness: 0.16, clearcoat: 0.82, clearcoatRoughness: 0.1, envMap: environment, envMapIntensity: 1.8, emissive: "#0a2b55", emissiveIntensity: 0.65 }),
    ],
    [environment],
  );
  useEffect(() => () => platformMaterials.forEach((material) => material.dispose()), [platformMaterials]);

  return (
    <group>
      <mesh position={[0, -2.14, -1.6]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[28, 26]} />
        <meshBasicMaterial color="#030814" side={DoubleSide} />
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
      {[1.35, 1.72, 2.12, 2.55, 2.96, 3.35, 3.76, 4.16, 4.56, 4.98, 5.32].map((radius, index) => (
        <mesh key={radius} position={[3.08, -1.858 + index * 0.008, -0.2]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, index === 2 || index === 6 || index === 9 ? 0.045 : 0.026, 7, 120]} />
          <meshBasicMaterial color={index % 3 === 0 ? "#92dfff" : index % 2 ? "#286ac5" : "#51b7eb"} transparent opacity={index % 3 === 0 ? 0.54 : 0.38 - index * 0.012} />
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
      <LaboratoryBackplanes tier={tier} />
      <HolographicPanelBank />
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
      <ambientLight intensity={tier === "FULL" ? 0.48 : 0.4} color="#7899c3" />
      <hemisphereLight args={["#a8dcff", "#020710", 0.82]} />
      <directionalLight position={[1, 5, 8]} intensity={tier === "FULL" ? 2.2 : 1.55} color="#d9efff" />
      <directionalLight position={[-5, 1, 1]} intensity={tier === "FULL" ? 3.2 : 1.9} color="#287aff" />
      <directionalLight position={[5, 3, -4]} intensity={tier === "FULL" ? 2.7 : 1.5} color="#55cfff" />
      <directionalLight position={[-1, 4, -6]} intensity={tier === "FULL" ? 1.9 : 1} color="#6daaff" />
      <pointLight position={[2.6, 3.4, 7.5]} intensity={tier === "FULL" ? 22 : 13} distance={18} decay={2} color="#e7f7ff" />
      <pointLight position={[4.2, -0.2, 6.5]} intensity={tier === "FULL" ? 12 : 7} distance={15} decay={2} color="#3ebdff" />
      <Chamber tier={tier} />
      <PrecisionBladesN tier={tier} />
      <GlobalNetwork tier={tier} />
      <HumanScaleFigure />
      <LaboratoryConsoleBay side={-1} />
      <LaboratoryConsoleBay side={1} />
      <FloorAndPanels tier={tier} />
      <SceneParticles tier={tier} />
      {Array.from({ length: tier === "FULL" ? 6 : 3 }, (_, index) => (
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
