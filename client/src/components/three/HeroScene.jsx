import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/** Smooth mouse-follow camera parallax with scroll depth */
function CameraRig({ scrollY = 0 }) {
  const { camera, pointer } = useThree();

  useFrame(() => {
    const targetX = pointer.x * 0.4;
    const targetY = pointer.y * 0.25 + 0.1;
    const targetZ = 5.5 - Math.min(scrollY * 0.0006, 1);

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.035);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.035);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.035);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/** Subtle floating particle field - minimal and professional */
function ParticleField({ count = 1200 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.015;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.03;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial size={0.018} color="#67e8f9" transparent opacity={0.45} sizeAttenuation />
    </points>
  );
}

/** Clean orbital rings - professional and minimal */
function OrbitalRings() {
  const ring1 = useRef();
  const ring2 = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.25;
      ring1.current.rotation.z = t * 0.15;
    }
    if (ring2.current) {
      ring2.current.rotation.y = t * 0.3;
      ring2.current.rotation.x = Math.PI / 3;
    }
  });

  return (
    <group>
      <mesh ref={ring1}>
        <torusGeometry args={[2.0, 0.015, 16, 64]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.25} />
      </mesh>
      <mesh ref={ring2} scale={1.2}>
        <torusGeometry args={[2.3, 0.012, 16, 48]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

/** Premium quantum sphere - clean and professional */
function QuantumCore() {
  const coreRef = useRef();
  const wireRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (coreRef.current) coreRef.current.rotation.y = t * 0.2;
    if (wireRef.current) {
      wireRef.current.rotation.x = t * 0.12;
      wireRef.current.rotation.z = t * 0.08;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={[2.0, 0.15, -0.3]}>
        {/* Main sphere with subtle distortion */}
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[0.75, 1]} />
          <MeshDistortMaterial
            color="#3b82f6"
            emissive="#22d3ee"
            emissiveIntensity={0.25}
            roughness={0.2}
            metalness={0.8}
            distort={0.2}
            speed={2}
            transparent
            opacity={0.9}
          />
        </mesh>
        {/* Wireframe overlay */}
        <mesh ref={wireRef} scale={1.25}>
          <icosahedronGeometry args={[0.75, 0]} />
          <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.35} />
        </mesh>
        {/* Soft glow light */}
        <pointLight position={[0, 0, 0]} intensity={1.5} color="#67e8f9" distance={3.5} />
      </group>
    </Float>
  );
}

function SceneContent({ scrollY, particleCount }) {
  return (
    <>
      <color attach="background" args={['#0d0f16']} />
      <fog attach="fog" args={['#0d0f16', 7, 16]} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#e0f2fe" />
      <directionalLight position={[-4, -2, -3]} intensity={0.3} color="#8b5cf6" />
      <CameraRig scrollY={scrollY} />
      <ParticleField count={particleCount} />
      <OrbitalRings />
      <QuantumCore />
    </>
  );
}

/**
 * Professional 3D hero scene with clean quantum sphere
 * Optimized for performance with reduced particle count on mobile
 * @param scrollY - vertical scroll offset for depth parallax
 * @param particleCount - particle count (reduced on mobile/tablet)
 */
const HeroScene = ({ scrollY = 0, particleCount = 1200 }) => {
  return (
    <div className="absolute inset-0 h-full w-full">
      <Canvas
        camera={{ position: [0, 0.15, 5.8], fov: 48 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        style={{ touchAction: 'none' }}
      >
        <Suspense fallback={null}>
          <SceneContent scrollY={scrollY} particleCount={particleCount} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroScene;
