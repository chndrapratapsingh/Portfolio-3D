import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

interface ScrollBackgroundProps {
  scrollProgress: number; // 0 to 1
}

const BackgroundObjects: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const torusRef = useRef<THREE.Mesh>(null!);
  const octaRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotate background scene dynamically based on scroll
      groupRef.current.rotation.y = scrollProgress * Math.PI * 2 + state.clock.getElapsedTime() * 0.05;
      groupRef.current.rotation.x = scrollProgress * Math.PI * 0.5;
      groupRef.current.position.z = -2 - scrollProgress * 3;
    }

    if (torusRef.current) {
      torusRef.current.rotation.x += delta * 0.2;
      torusRef.current.rotation.z += delta * 0.15;
    }

    if (octaRef.current) {
      octaRef.current.rotation.y += delta * 0.3;
      octaRef.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Torus Floating Left */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8} position={[-5, 2, -4]}>
        <mesh ref={torusRef}>
          <torusGeometry args={[1.5, 0.2, 16, 60]} />
          <meshStandardMaterial
            color="#6366f1"
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>
      </Float>

      {/* Octahedron Floating Right */}
      <Float speed={2} rotationIntensity={0.8} floatIntensity={1} position={[6, -3, -5]}>
        <mesh ref={octaRef}>
          <octahedronGeometry args={[1.8, 0]} />
          <meshStandardMaterial
            color="#06b6d4"
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      </Float>

      {/* Icosahedron Bottom Left */}
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6} position={[-6, -4, -6]}>
        <mesh>
          <icosahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial
            color="#8b5cf6"
            wireframe
            transparent
            opacity={0.25}
          />
        </mesh>
      </Float>
    </group>
  );
};

export const ScrollCanvas: React.FC<ScrollBackgroundProps> = ({ scrollProgress }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#a5b4fc" />
        
        {/* Starfield Particles */}
        <Stars
          radius={50}
          depth={50}
          count={2500}
          factor={4}
          saturation={0}
          fade
          speed={0.5}
        />

        <BackgroundObjects scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
};
