import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleDiamond: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  const glassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#00BFFF'),
      transparent: true,
      opacity: 0.4,
      roughness: 0.1,
      metalness: 0.1,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      transmission: 0.9,
      ior: 1.5,
      thickness: 0.5
    });
  }, []);

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[1.5, 0]} />
      <meshPhysicalMaterial
        color="#00BFFF"
        transparent
        opacity={0.4}
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

// Particle System around the diamond
const DiamondParticles: React.FC = () => {
  const mesh = useRef<THREE.Points>(null!);
  const NUM_PARTICLES = 40;
  
  const positions = useMemo(() => {
    const arr = [];
    for (let i = 0; i < NUM_PARTICLES; i++) {
      // Create particles in a diamond-shaped pattern around the center
      const angle = (i / NUM_PARTICLES) * Math.PI * 2;
      const radius = 2 + Math.random() * 1;
      const height = (Math.random() - 0.5) * 2;
      
      arr.push(
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius
      );
    }
    return new Float32Array(arr);
  }, []);

  useFrame(({ clock }) => {
    if (mesh.current) {
      const t = clock.getElapsedTime();
      const positionsAttr = mesh.current.geometry.attributes.position;
      for (let i = 0; i < NUM_PARTICLES; i++) {
        const angle = (i / NUM_PARTICLES) * Math.PI * 2;
        const radius = 2 + Math.sin(t * 0.5 + i) * 0.5;
        const height = Math.sin(t * 0.3 + i) * 0.5;
        
        positionsAttr.setX(i, Math.cos(angle) * radius);
        positionsAttr.setY(i, height);
        positionsAttr.setZ(i, Math.sin(angle) * radius);
      }
      positionsAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#38bdf8"
        size={0.15}
        sizeAttenuation
        transparent
        opacity={0.6}
        depthWrite={false}
      />
    </points>
  );
};

const Scene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[0, 0, 5]} intensity={0.5} color="#00BFFF" />
      
      <ParticleDiamond />
      <DiamondParticles />
    </>
  );
};

const ParticleDiamondContainer: React.FC = () => {
  return (
    <div className="absolute bottom-8 right-8 w-32 h-32 z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 60 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default ParticleDiamondContainer;