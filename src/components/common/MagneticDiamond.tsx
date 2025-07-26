import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface MagneticDiamondProps {
  mousePosition: { x: number; y: number };
}

const MagneticDiamond: React.FC<MagneticDiamondProps> = ({ mousePosition }) => {
  const groupRef = useRef<THREE.Group>(null);
  const diamondRef = useRef<THREE.Mesh>(null);
  const globeRef = useRef<THREE.Mesh>(null);
  const { size, viewport } = useThree();

  useFrame((state) => {
    if (diamondRef.current && globeRef.current && groupRef.current) {
      const t = state.clock.elapsedTime;
      diamondRef.current.rotation.x = Math.sin(t * 0.5) * 0.3;
      diamondRef.current.rotation.y += 0.01;
      diamondRef.current.rotation.z = Math.sin(t * 0.3) * 0.1;
      globeRef.current.rotation.y += 0.02;
      globeRef.current.rotation.x = Math.sin(t * 0.8) * 0.2;
      if (mousePosition.x !== 0 || mousePosition.y !== 0) {
        const targetX = (mousePosition.x / size.width) * viewport.width * 0.8;
        const targetY = -(mousePosition.y / size.height) * viewport.height * 0.8;
        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.08);
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.08);
        const distance = Math.sqrt(targetX * targetX + targetY * targetY);
        const scale = 1 + (distance * 0.15);
        groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, Math.min(scale, 1.5), 0.05));
        groupRef.current.position.y += Math.sin(t * 2) * 0.02;
      } else {
        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 0, 0.03);
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0, 0.03);
        groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, 1, 0.03));
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Glassy Diamond */}
      <mesh ref={diamondRef} castShadow receiveShadow>
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
      {/* Globe inside the diamond */}
      <mesh ref={globeRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color="#E6E6FA"
          transparent
          opacity={0.7}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      {/* Inner glow layers */}
      <mesh scale={0.8}>
        <octahedronGeometry args={[2, 0]} />
        <meshBasicMaterial color="#81D4FA" transparent opacity={0.08} />
      </mesh>
      <mesh scale={0.6}>
        <octahedronGeometry args={[2, 0]} />
        <meshBasicMaterial color="#E1F5FE" transparent opacity={0.12} />
      </mesh>
    </group>
  );
};

export default MagneticDiamond; 