
import * as React from 'react';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Ring } from '@react-three/drei';
import * as THREE from 'three';
import SnakePath from './SnakePath';
import Fireflies from './Fireflies';

const GlassyDiamond: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });
  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[2, 0]} />
      <meshPhysicalMaterial
        color="#87CEEB"
        transparent
        opacity={0.3}
        roughness={0.1}
        metalness={0.1}
        clearcoat={1}
        clearcoatRoughness={0.1}
        transmission={0.9}
        ior={1.5}
        thickness={0.5}
      />
    </mesh>
  );
};

const OrbitingCloud: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.02;
    }
    if (sphereRef.current) {
      sphereRef.current.position.x = Math.sin(state.clock.elapsedTime * 2) * 1.5;
      sphereRef.current.position.z = Math.cos(state.clock.elapsedTime * 2) * 1.5;
      sphereRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.5;
    }
  });
  return (
    <group ref={groupRef}>
      <Sphere ref={sphereRef} args={[0.3, 16, 16]} position={[1.5, 0, 0]}>
        <meshStandardMaterial
          color="#E6E6FA"
          transparent
          opacity={0.7}
          roughness={0.8}
          metalness={0.1}
        />
      </Sphere>
    </group>
  );
};

const GlowingRingPlatform: React.FC = () => {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.005;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      ringRef.current.scale.set(scale, scale, scale);
    }
  });
  return (
    <group position={[0, -3, 0]}>
      <Ring ref={ringRef} args={[2, 2.5, 32]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          color="#00FFFF"
          transparent
          opacity={0.6}
          emissive="#00FFFF"
          emissiveIntensity={0.2}
        />
      </Ring>
      <Ring args={[1.5, 2, 32]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          color="#FF69B4"
          transparent
          opacity={0.4}
          emissive="#FF69B4"
          emissiveIntensity={0.1}
        />
      </Ring>
    </group>
  );
};

const Scene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#87CEEB" />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#FF69B4" />
      <GlassyDiamond />
      <OrbitingCloud />
      <GlowingRingPlatform />
      <SnakePath />
      <Fireflies />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
};

const ThreeDFloatingBox: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 75 }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
    >
      <Scene />
    </Canvas>
  );
};

export default ThreeDFloatingBox;