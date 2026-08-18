import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles, OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { GraphicSettings } from '../../types';

interface HeroObjectProps {
  settings: GraphicSettings;
}

// Orbiting Tech Nodes around the main AI reactor core
const OrbitingTechNode: React.FC<{ label: string; primaryColor: string; accentColor: string; radius: number; speed: number; phase: number }> = ({
  label,
  primaryColor,
  accentColor,
  radius,
  speed,
  phase,
}) => {
  const nodeGroupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (nodeGroupRef.current) {
      const t = state.clock.getElapsedTime() * speed + phase;
      nodeGroupRef.current.position.x = Math.cos(t) * radius;
      nodeGroupRef.current.position.z = Math.sin(t) * radius;
      nodeGroupRef.current.position.y = Math.sin(t * 2) * 0.45;
    }
  });

  return (
    <group ref={nodeGroupRef}>
      <mesh>
        <sphereGeometry args={[0.2, 24, 24]} />
        <meshStandardMaterial color={primaryColor} emissive={primaryColor} emissiveIntensity={0.85} roughness={0.2} />
      </mesh>
      {/* Outer ring on node */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[0.28, 0.02, 12, 24]} />
        <meshBasicMaterial color={accentColor} wireframe />
      </mesh>
      <Text
        position={[0, 0.4, 0]}
        fontSize={0.24}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.025}
        outlineColor="#020617"
      >
        {label}
      </Text>
    </group>
  );
};

export const HeroObject: React.FC<HeroObjectProps> = ({ settings }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const outerRing1Ref = useRef<THREE.Mesh>(null!);
  const outerRing2Ref = useRef<THREE.Mesh>(null!);
  const outerRing3Ref = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Smooth rotation animation in loop
  useFrame((_, delta) => {
    if (!meshRef.current) return;

    // Auto rotate main plasma core
    const speedMultiplier = settings.autoRotate ? 1 : 0.2;
    meshRef.current.rotation.x += delta * 0.4 * speedMultiplier;
    meshRef.current.rotation.y += delta * 0.6 * speedMultiplier;

    if (outerRing1Ref.current) {
      outerRing1Ref.current.rotation.x -= delta * 0.5 * speedMultiplier;
      outerRing1Ref.current.rotation.z += delta * 0.4 * speedMultiplier;
    }

    if (outerRing2Ref.current) {
      outerRing2Ref.current.rotation.y += delta * 0.7 * speedMultiplier;
      outerRing2Ref.current.rotation.x += delta * 0.3 * speedMultiplier;
    }

    if (outerRing3Ref.current) {
      outerRing3Ref.current.rotation.z -= delta * 0.6 * speedMultiplier;
      outerRing3Ref.current.rotation.y -= delta * 0.4 * speedMultiplier;
    }

    // Interactive spring back scale on hover/click
    const targetScale = clicked ? 1.35 : hovered ? 1.2 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  const primaryCol = settings.primaryColor || '#06b6d4'; // Cyan JARVIS Blue
  const secondaryCol = settings.secondaryColor || '#a855f7'; // Purple AI Glow

  const renderCoreGeometry = () => {
    switch (settings.activeGeometry) {
      case 'torusKnot':
        return <torusKnotGeometry args={[0.9, 0.3, 128, 32]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[1.2, 1]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[1.2, 0]} />;
      case 'cyberCube':
        return <boxGeometry args={[1.4, 1.4, 1.4]} />;
      case 'sphere':
      default:
        return <sphereGeometry args={[1.15, 64, 64]} />;
    }
  };

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 10]} intensity={1.6} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={1.3} color="#06b6d4" />
      <pointLight position={[10, -5, 5]} intensity={1.6} color="#FFD43B" />
      <pointLight position={[0, 5, 0]} intensity={1.4} color="#DC2626" />

      {/* Floating group with R3F Drei Float */}
      <Float speed={2.2} rotationIntensity={0.6} floatIntensity={0.9}>
        <group scale={0.82}>
          {/* Main JARVIS AI Core Plasma Mesh */}
          <mesh
            ref={meshRef}
            onPointerOver={() => {
              document.body.style.cursor = 'pointer';
              setHovered(true);
            }}
            onPointerOut={() => {
              document.body.style.cursor = 'auto';
              setHovered(false);
            }}
            onClick={() => setClicked(!clicked)}
          >
            {renderCoreGeometry()}
            <MeshDistortMaterial
              color={hovered ? '#38bdf8' : primaryCol}
              roughness={0.08}
              metalness={0.92}
              distort={hovered ? 0.55 : 0.32}
              speed={3.2}
              wireframe={settings.enableWireframe}
            />
          </mesh>

          {/* Inner Glowing White/Cyan Core */}
          <mesh scale={0.65}>
            <icosahedronGeometry args={[1, 2]} />
            <meshBasicMaterial color="#ffffff" wireframe />
          </mesh>

          {/* Concentric Energy Orbit Rings */}
          {/* Ring 1: Cyan JARVIS Ring */}
          <mesh ref={outerRing1Ref}>
            <torusGeometry args={[2.0, 0.035, 16, 100]} />
            <meshStandardMaterial
              color="#06b6d4"
              wireframe
              emissive="#06b6d4"
              emissiveIntensity={0.85}
            />
          </mesh>

          {/* Ring 2: Python Yellow Ring */}
          <mesh ref={outerRing2Ref} rotation={[Math.PI / 3, 0, Math.PI / 4]}>
            <torusGeometry args={[2.35, 0.025, 16, 100]} />
            <meshStandardMaterial
              color="#FFD43B"
              wireframe
              emissive="#FFD43B"
              emissiveIntensity={0.85}
            />
          </mesh>

          {/* Ring 3: Java Red Ring */}
          <mesh ref={outerRing3Ref} rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
            <torusGeometry args={[2.65, 0.02, 16, 100]} />
            <meshStandardMaterial
              color="#DC2626"
              wireframe
              emissive="#DC2626"
              emissiveIntensity={0.8}
            />
          </mesh>

          {/* Orbiting Language Nodes in 3D Space */}
          <OrbitingTechNode label="Python" primaryColor="#306998" accentColor="#FFD43B" radius={2.2} speed={0.8} phase={0} />
          <OrbitingTechNode label="Lucy AI" primaryColor="#06b6d4" accentColor="#a855f7" radius={2.4} speed={0.7} phase={2} />
          <OrbitingTechNode label="C++" primaryColor="#00599C" accentColor="#659AD2" radius={2.1} speed={0.9} phase={4} />
          <OrbitingTechNode label="Java" primaryColor="#DC2626" accentColor="#ffffff" radius={2.5} speed={0.6} phase={1} />
          <OrbitingTechNode label="Node.js" primaryColor="#339933" accentColor="#ffffff" radius={2.3} speed={0.85} phase={3.5} />
          <OrbitingTechNode label="Android" primaryColor="#3DDC84" accentColor="#ffffff" radius={2.6} speed={0.65} phase={5} />
        </group>
      </Float>

      {/* Particle sparkles if enabled */}
      {settings.enableParticles && (
        <Sparkles
          count={clicked ? 200 : 130}
          scale={7.5}
          size={3.8}
          speed={0.6}
          color="#38bdf8"
        />
      )}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
};

