import { Suspense, useRef, Component, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Error boundary for WebGL failures
interface ErrorBoundaryState { hasError: boolean }
interface ErrorBoundaryProps { children: ReactNode; fallback: ReactNode }

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function WebGLFallback() {
  return (
    <div className="w-full h-full relative" style={{
      backgroundImage: `url('/ED-VI-Hair-Barber/images/photo_01.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="absolute inset-0" style={{ background: 'rgba(9,9,9,0.65)' }} />
    </div>
  );
}

function BarberChair() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  const leather = new THREE.MeshStandardMaterial({ color: '#1a0d08', roughness: 0.8, metalness: 0 });
  const chrome = new THREE.MeshStandardMaterial({ color: '#c0c0c0', roughness: 0.1, metalness: 0.9 });

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Seat */}
      <mesh material={leather} position={[0, 0.8, 0]} castShadow>
        <boxGeometry args={[1.8, 0.25, 1.5]} />
      </mesh>
      {/* Seat cushion */}
      <mesh material={leather} position={[0, 0.98, 0]} castShadow>
        <boxGeometry args={[1.6, 0.18, 1.3]} />
      </mesh>
      {/* Back rest */}
      <mesh material={leather} position={[0, 1.9, -0.65]} rotation={[0.15, 0, 0]} castShadow>
        <boxGeometry args={[1.6, 2.0, 0.2]} />
      </mesh>
      {/* Armrest left */}
      <mesh material={chrome} position={[-0.85, 1.15, 0]} castShadow>
        <boxGeometry args={[0.12, 0.1, 0.8]} />
      </mesh>
      {/* Armrest right */}
      <mesh material={chrome} position={[0.85, 1.15, 0]} castShadow>
        <boxGeometry args={[0.12, 0.1, 0.8]} />
      </mesh>
      {/* Pedestal */}
      <mesh material={chrome} position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.28, 1.0, 16]} />
      </mesh>
      {/* Base plate */}
      <mesh material={chrome} position={[0, -0.2, 0]} castShadow>
        <cylinderGeometry args={[0.55, 0.55, 0.08, 32]} />
      </mesh>
      {/* Footrest */}
      <mesh material={chrome} position={[0, 0.4, 0.7]} castShadow>
        <boxGeometry args={[1.0, 0.06, 0.25]} />
      </mesh>
    </group>
  );
}

function ScissorsProp() {
  const ref = useRef<THREE.Group>(null);
  const silver = new THREE.MeshStandardMaterial({ color: '#d0d0d0', roughness: 0.05, metalness: 0.95 });

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.5) * 0.15;
    }
  });

  return (
    <group ref={ref} position={[2.2, 0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
      <mesh material={silver} position={[-0.05, 0, 0]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.06, 1.4, 0.04]} />
      </mesh>
      <mesh material={silver} position={[0.05, 0, 0]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.06, 1.4, 0.04]} />
      </mesh>
      <mesh material={silver} position={[0, 0, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
      </mesh>
    </group>
  );
}

function MirrorProp() {
  const mirror = new THREE.MeshStandardMaterial({ color: '#888', roughness: 0.05, metalness: 0.9 });
  const frame = new THREE.MeshStandardMaterial({ color: '#c0c0c0', roughness: 0.15, metalness: 0.85 });

  return (
    <group position={[-0.2, 1.5, -2.5]}>
      <mesh material={mirror}>
        <circleGeometry args={[1.4, 32]} />
      </mesh>
      <mesh material={frame} position={[0, 0, -0.05]}>
        <torusGeometry args={[1.4, 0.08, 8, 32]} />
      </mesh>
    </group>
  );
}

function GoldParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 200;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
  }

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.0005;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#B58A4A" transparent opacity={0.6} />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <spotLight position={[5, 8, 5]} angle={0.3} intensity={2} color="#F1E8D8" castShadow />
      <spotLight position={[-3, 4, 2]} angle={0.4} intensity={0.8} color="#681F2B" />
      <pointLight position={[0, -2, 3]} intensity={0.5} color="#B58A4A" />
      <Environment preset="studio" />
      <BarberChair />
      <ScissorsProp />
      <MirrorProp />
      <GoldParticles />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
    </>
  );
}

interface BarberScene3DProps {
  className?: string;
}

export default function BarberScene3D({ className }: BarberScene3DProps) {
  return (
    <ErrorBoundary fallback={<WebGLFallback />}>
      <div className={className || 'w-full h-full'}>
        <Canvas
          camera={{ position: [0, 1, 5], fov: 50 }}
          shadows
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
    </ErrorBoundary>
  );
}
