import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const ThreeDecorativeModel: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[300px]">
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[0, 0, 2]} intensity={0.5} />
        <mesh rotation={[0.5, 1.2, 0]}>
          <icosahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial
            color={'#38bdf8'}
            roughness={0.3}
            metalness={0.6}
            clearcoat={1}
            transmission={0.7}
            reflectivity={1}
          />
        </mesh>
        <OrbitControls enableZoom={false} autoRotate />
      </Canvas>
    </div>
  );
};

export default ThreeDecorativeModel;
