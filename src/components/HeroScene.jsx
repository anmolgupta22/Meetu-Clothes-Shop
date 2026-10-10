import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image, RoundedBox } from '@react-three/drei';
import { MathUtils } from 'three';

function FashionPanel({ url, width, height, ...props }) {
  return <group {...props}>
    <RoundedBox args={[width + 0.08, height + 0.08, 0.1]} radius={0.04} smoothness={3}>
      <meshStandardMaterial color="#f2ecdf" roughness={0.9} />
    </RoundedBox>
    <Image url={url} scale={[width, height]} position={[0, 0, 0.057]} toneMapped={false} />
  </group>;
}

function Display({ onReady }) {
  const ref = useRef();
  useEffect(() => { onReady(); }, [onReady]);
  useFrame((state, delta) => {
    if (!ref.current) return;
    const factor = 1 - Math.exp(-delta * 3);
    ref.current.rotation.y = MathUtils.lerp(ref.current.rotation.y, state.pointer.x * 0.1, factor);
    ref.current.rotation.x = MathUtils.lerp(ref.current.rotation.x, -state.pointer.y * 0.04, factor);
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.65) * 0.04;
  });
  return <group ref={ref}>
    <FashionPanel url="/images/style-shirts.jpg" width={2.05} height={2.7} position={[-1.95, -0.2, -0.45]} rotation={[0, 0.15, 0.11]} />
    <FashionPanel url="/images/hero-photo.jpg" width={3.08} height={4.3} position={[0.2, 0.15, 0.3]} rotation={[0, -0.1, -0.045]} />
    <FashionPanel url="/images/style-denim.jpg" width={1.85} height={2.4} position={[2.05, -0.9, 0.6]} rotation={[0, -0.15, -0.12]} />
    <mesh position={[-2.35, 1.95, 0.1]} rotation={[0.5, 0.35, 0.2]}>
      <torusGeometry args={[0.32, 0.055, 12, 48]} />
      <meshStandardMaterial color="#b7a070" metalness={0.6} roughness={0.25} />
    </mesh>
  </group>;
}

export default function HeroScene({ active, onReady, onFailure }) {
  return <Canvas camera={{ position: [0, 0, 8.7], fov: 37 }} dpr={[1, 1.5]}
    frameloop={active ? 'always' : 'never'} gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
    onCreated={({ gl }) => { gl.domElement.addEventListener('webglcontextlost', onFailure, { once: true }); }}
    fallback={<span className="sr-only">Fashion display illustration</span>}>
    <ambientLight intensity={1.8} />
    <directionalLight position={[3, 5, 5]} intensity={2} />
    <Suspense fallback={null}><Display onReady={onReady} /></Suspense>
  </Canvas>;
}
