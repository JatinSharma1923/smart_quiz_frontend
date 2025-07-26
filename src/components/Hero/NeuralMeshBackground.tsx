import * as React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import Fireflies from './Fireflies';

function generateHelixPoints(numPoints = 200, radius = 3, turns = 3, height = 4, phase = 0) {
  const points = [];
  for (let i = 0; i < numPoints; i++) {
    const t = (i / numPoints) * Math.PI * 2 * turns + phase;
    const x = Math.cos(t) * radius * (0.7 + 0.3 * Math.sin(t * 2));
    const y = (i / numPoints - 0.5) * height;
    const z = Math.sin(t) * radius * (0.7 + 0.3 * Math.cos(t * 2));
    points.push(new THREE.Vector3(x, y, z));
  }
  return points;
}

function lerpColor(a: THREE.Color, b: THREE.Color, t: number): THREE.Color {
  return a.clone().lerp(b, t);
}

const CYAN = new THREE.Color('#00fff7');
const PURPLE = new THREE.Color('#a78bfa');

type NeuralHelixLayerProps = {
  numPoints: number;
  radius: number;
  turns: number;
  height: number;
  phase: number;
  baseOpacity: number;
  flicker?: boolean;
  wave?: boolean;
  speed?: number;
  debug?: boolean;
};

const NeuralHelixLayer: React.FC<NeuralHelixLayerProps> = ({ numPoints, radius, turns, height, phase, baseOpacity, flicker = false, wave = false, speed = 1, debug = false }) => {
  const pointsRef = React.useRef<THREE.Group>(null);
  const [positions, colors, opacities] = React.useMemo(() => {
    const pts = generateHelixPoints(numPoints, radius, turns, height, phase);
    const pos = [];
    const cols = [];
    const ops = [];
    for (let i = 0; i < pts.length; i++) {
      pos.push(pts[i].x, pts[i].y, pts[i].z);
      const t = i / pts.length;
      const color = lerpColor(CYAN, PURPLE, t);
      cols.push(color.r, color.g, color.b);
      ops.push(baseOpacity * (flicker ? (0.7 + 0.3 * Math.random()) : 1));
    }
    return [new Float32Array(pos), new Float32Array(cols), new Float32Array(ops)];
  }, [numPoints, radius, turns, height, phase, baseOpacity, flicker]);

  const scaleRef = React.useRef(1);
  useFrame((state) => {
    if (pointsRef.current) {
      (pointsRef.current as THREE.Group).rotation.y += 0.0012 * speed;
      (pointsRef.current as THREE.Group).rotation.x = Math.sin(state.clock.elapsedTime * 0.15 * speed) * 0.13;
      (pointsRef.current as THREE.Group).rotation.z = Math.cos(state.clock.elapsedTime * 0.13 * speed) * 0.09;
      scaleRef.current = 0.97 + Math.sin(state.clock.elapsedTime * 0.5 * speed) * 0.04;
      (pointsRef.current as THREE.Group).scale.set(scaleRef.current, scaleRef.current, scaleRef.current);
    }
  });

  const animatedPositions = React.useMemo(() => new Float32Array(positions), [positions]);
  useFrame((state) => {
    if (wave) {
      for (let i = 0; i < positions.length; i += 3) {
        const t = i / positions.length;
        animatedPositions[i] = positions[i] + Math.sin(state.clock.elapsedTime * 0.8 + t * 20 + phase) * 0.08;
        animatedPositions[i + 1] = positions[i + 1] + Math.cos(state.clock.elapsedTime * 0.7 + t * 18 + phase) * 0.08;
        animatedPositions[i + 2] = positions[i + 2] + Math.sin(state.clock.elapsedTime * 0.6 + t * 22 + phase) * 0.08;
      }
    }
  });

  return (
    <group ref={pointsRef} position={[0, 0, 0]}>
      <Points positions={wave ? animatedPositions : positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={debug ? 0.3 : 0.14}
          sizeAttenuation
          depthWrite={false}
          opacity={baseOpacity}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

const NeuralMeshBackground: React.FC = () => {
  return (
    <Canvas
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'rgba(0,0,0,0.5)' }}
      camera={{ position: [0, 0, 12], fov: 60 }}
      gl={{ alpha: true }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 12]} />
      <ambientLight intensity={0.5} />
      <NeuralHelixLayer numPoints={320} radius={4} turns={4} height={6} phase={0} baseOpacity={1} flicker wave speed={1} debug />
      <NeuralHelixLayer numPoints={220} radius={2.7} turns={3.5} height={4.5} phase={Math.PI / 2} baseOpacity={0.8} flicker wave speed={0.7} debug />
      <NeuralHelixLayer numPoints={120} radius={1.7} turns={2.5} height={3.5} phase={Math.PI} baseOpacity={0.6} flicker={false} wave={false} speed={0.5} debug />
      <Fireflies />
      <EffectComposer>
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} intensity={0.6} />
      </EffectComposer>
    </Canvas>
  );
};

export default NeuralMeshBackground; 