import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NUM_PARTICLES = 60;

function Particles() {
  const mesh = useRef<THREE.Points>(null!);
  // Generate random positions for particles
  const positions = useMemo(() => {
    const arr = [];
    for (let i = 0; i < NUM_PARTICLES; i++) {
      arr.push(
        (Math.random() - 0.5) * 16, // x
        (Math.random() - 0.5) * 9,  // y
        (Math.random() - 0.5) * 8   // z
      );
    }
    return new Float32Array(arr);
  }, []);

  // Animate particles
  useFrame(({ clock }) => {
    if (mesh.current) {
      const t = clock.getElapsedTime();
      const positionsAttr = mesh.current.geometry.attributes.position;
      for (let i = 0; i < NUM_PARTICLES; i++) {
        positionsAttr.setY(i, Math.sin(t * 0.5 + i) * 2 + (Math.random() - 0.5));
        positionsAttr.setX(i, Math.cos(t * 0.3 + i) * 2 + (Math.random() - 0.5));
      }
      positionsAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#38bdf8"
        size={0.25}
        sizeAttenuation
        transparent
        opacity={0.45}
        depthWrite={false}
      />
    </points>
  );
}

const ParticleBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none">
      <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <Particles />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;
