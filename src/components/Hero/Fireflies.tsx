import * as React from 'react';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FireflyData {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  phase: number;
  size: number;
  color: THREE.Color;
  shape: 'sphere' | 'tetrahedron';
}

const COOL_COLORS = [
  new THREE.Color('#00fff7'),
  new THREE.Color('#2563eb'),
  new THREE.Color('#a78bfa'),
  new THREE.Color('#ffffff'),
];

interface FirefliesProps {
  debug?: boolean;
}

const Fireflies: React.FC<FirefliesProps> = ({ debug = false }) => {
  const groupRef = useRef<THREE.Group>(null);
  const fireflyRefs = useRef<THREE.Mesh[]>([]);
  const time = useRef(0);

  const fireflyCount = 70;
  const boundarySize = 8;

  const fireflies = useMemo<FireflyData[]>(() => {
    return Array.from({ length: fireflyCount }, (_, i) => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * boundarySize,
        (Math.random() - 0.5) * boundarySize,
        (Math.random() - 0.5) * boundarySize
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      ),
      phase: Math.random() * Math.PI * 2,
      size: 0.05 + Math.random() * 0.1,
      color: COOL_COLORS[Math.floor(Math.random() * COOL_COLORS.length)],
      shape: Math.random() < 0.7 ? 'sphere' : 'tetrahedron',
    }));
  }, [fireflyCount]);

  const fireflyMeshes = useMemo(() => {
    fireflyRefs.current = [];
    return fireflies.map((firefly, i) => (
      <mesh
        key={i}
        ref={(ref) => {
          if (ref) fireflyRefs.current[i] = ref;
        }}
        position={firefly.position}
      >
        {firefly.shape === 'sphere' ? (
          <sphereGeometry args={[debug ? firefly.size * 2.5 : firefly.size, 8, 8]} />
        ) : (
          <tetrahedronGeometry args={[debug ? firefly.size * 2.5 : firefly.size, 0]} />
        )}
        <meshStandardMaterial
          color={firefly.color}
          emissive={firefly.color}
          emissiveIntensity={debug ? 1 : 0.5}
          transparent
          opacity={debug ? 1 : 0.8}
        />
      </mesh>
    ));
  }, [fireflies, debug]);

  useFrame((state) => {
    time.current += 0.01;
    fireflies.forEach((firefly, index) => {
      const mesh = fireflyRefs.current[index];
      if (!mesh) return;
      firefly.position.add(firefly.velocity);
      firefly.position.x += Math.sin(time.current + firefly.phase) * 0.001;
      firefly.position.y += Math.cos(time.current + firefly.phase * 1.3) * 0.001;
      firefly.position.z += Math.sin(time.current + firefly.phase * 0.7) * 0.001;
      if (Math.abs(firefly.position.x) > boundarySize / 2) {
        firefly.velocity.x *= -0.8;
        firefly.position.x = Math.sign(firefly.position.x) * (boundarySize / 2);
      }
      if (Math.abs(firefly.position.y) > boundarySize / 2) {
        firefly.velocity.y *= -0.8;
        firefly.position.y = Math.sign(firefly.position.y) * (boundarySize / 2);
      }
      if (Math.abs(firefly.position.z) > boundarySize / 2) {
        firefly.velocity.z *= -0.8;
        firefly.position.z = Math.sign(firefly.position.z) * (boundarySize / 2);
      }
      if (Math.random() < 0.01) {
        firefly.velocity.add(new THREE.Vector3(
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.005
        ));
        firefly.velocity.clampLength(0, 0.03);
      }
      mesh.position.copy(firefly.position);
      const pulseFactor = Math.sin(time.current * 2 + firefly.phase) * 0.3 + 0.7;
      mesh.scale.setScalar(pulseFactor);
      const material = mesh.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.3 + pulseFactor * 0.4;
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.005;
    });
  });

  return (
    <group ref={groupRef}>
      {fireflyMeshes}
      {Array.from({ length: 10 }, (_, i) => {
        const position = new THREE.Vector3(
          (Math.random() - 0.5) * boundarySize * 1.5,
          (Math.random() - 0.5) * boundarySize * 1.5,
          (Math.random() - 0.5) * boundarySize * 1.5
        );
        return (
          <mesh key={`glow-${i}`} position={position}>
            <sphereGeometry args={[0.02, 6, 6]} />
            <meshStandardMaterial
              color="#a78bfa"
              emissive="#a78bfa"
              emissiveIntensity={0.2}
              transparent
              opacity={0.6}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default Fireflies;