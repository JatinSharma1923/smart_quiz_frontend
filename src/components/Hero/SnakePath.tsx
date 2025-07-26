
import * as React from 'react';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SnakePath: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const segmentRefs = useRef<THREE.Mesh[]>([]);
  const trailPositions = useRef<THREE.Vector3[]>([]);
  const time = useRef(0);

  const segmentCount = 20;
  const segmentSize = 0.1;
  const trailLength = 50;
  const speed = 0.02;
  const radius = 4;

  const segments = useMemo(() => {
    const segs: React.ReactNode[] = [];
    segmentRefs.current = [];
    for (let i = 0; i < segmentCount; i++) {
      const size = segmentSize * (1 - i / segmentCount * 0.5);
      const color = new THREE.Color().setHSL(0.5 + i / segmentCount * 0.3, 1, 0.5);
      segs.push(
        <mesh
          key={i}
          ref={(ref) => {
            if (ref) segmentRefs.current[i] = ref;
          }}
        >
          <sphereGeometry args={[size, 8, 8]} />
          <meshStandardMaterial
            color="#e11d48"
            emissive={color}
            emissiveIntensity={0.3}
            transparent
            opacity={0.8}
          />
        </mesh>
      );
    }
    return segs;
  }, [segmentCount, segmentSize]);

  const trailGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(trailLength * 3);
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [trailLength]);

  const trailMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: '#00FFFF',
      transparent: true,
      opacity: 0.6,
      linewidth: 2
    });
  }, []);

  const glowMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: '#87CEEB',
      transparent: true,
      opacity: 0.3,
      linewidth: 4
    });
  }, []);

  const trailLine = useMemo(() => new THREE.Line(trailGeometry, trailMaterial), [trailGeometry, trailMaterial]);
  const glowLine = useMemo(() => new THREE.Line(trailGeometry, glowMaterial), [trailGeometry, glowMaterial]);

  useFrame((state) => {
    time.current += speed;
    const headX = Math.sin(time.current) * radius + Math.cos(time.current * 0.5) * 2;
    const headY = Math.sin(time.current * 0.7) * 2 + Math.cos(time.current * 0.3) * 1;
    const headZ = Math.cos(time.current) * radius + Math.sin(time.current * 0.8) * 1.5;
    const headPosition = new THREE.Vector3(headX, headY, headZ);
    trailPositions.current.unshift(headPosition.clone());
    if (trailPositions.current.length > trailLength) {
      trailPositions.current.pop();
    }
    segmentRefs.current.forEach((segment, index) => {
      if (segment) {
        const trailIndex = index * 2;
        if (trailPositions.current[trailIndex]) {
          segment.position.copy(trailPositions.current[trailIndex]);
          segment.rotation.x = time.current * 0.5 + index * 0.1;
          segment.rotation.y = time.current * 0.3 + index * 0.2;
        }
      }
    });
    if (trailGeometry.attributes.position) {
      const positions = trailGeometry.attributes.position.array as Float32Array;
      trailPositions.current.forEach((pos, index) => {
        if (index < trailLength) {
          positions[index * 3] = pos.x;
          positions[index * 3 + 1] = pos.y;
          positions[index * 3 + 2] = pos.z;
        }
      });
      trailGeometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {segments}
      <primitive object={trailLine} />
      <primitive object={glowLine} />
    </group>
  );
};

export default SnakePath;