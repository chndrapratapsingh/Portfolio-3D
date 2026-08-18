import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshWobbleMaterial, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ProjectCard3DProps {
  modelType: 'cube' | 'torus' | 'sphere' | 'icosahedron' | 'knot' | 'octahedron' | 'cyberCube';
  color: string;
  isHovered: boolean;
  isLucyAi?: boolean;
}

const ProjectMesh: React.FC<ProjectCard3DProps> = ({ modelType, color, isHovered, isLucyAi }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (meshRef.current) {
      const speed = isHovered ? 2.2 : 0.8;
      meshRef.current.rotation.x += delta * 0.4 * speed;
      meshRef.current.rotation.y += delta * 0.6 * speed;

      if (ringRef.current) {
        ringRef.current.rotation.z -= delta * 1.5 * speed;
        ringRef.current.rotation.x += delta * 0.5;
      }
    }
  });

  if (isLucyAi) {
    // Lucy AI glowing cyan plasma reactor sphere matching the user image
    return (
      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.8}>
        <group>
          {/* Main Plasma Orb Core */}
          <mesh ref={meshRef}>
            <sphereGeometry args={[1.05, 64, 64]} />
            <MeshDistortMaterial
              color="#38bdf8"
              emissive="#0284c7"
              emissiveIntensity={0.9}
              roughness={0.05}
              metalness={0.9}
              distort={isHovered ? 0.45 : 0.25}
              speed={3}
            />
          </mesh>

          {/* Inner Glowing White Core */}
          <mesh scale={0.55}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>

          {/* Concentric Energy Aura Rings */}
          <mesh ref={ringRef}>
            <torusGeometry args={[1.45, 0.03, 16, 64]} />
            <meshBasicMaterial color="#38bdf8" wireframe />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.6, 0.02, 16, 64]} />
            <meshBasicMaterial color="#a855f7" wireframe />
          </mesh>
        </group>
      </Float>
    );
  }

  const renderShape = () => {
    switch (modelType) {
      case 'cyberCube':
      case 'cube':
        return <boxGeometry args={[1.25, 1.25, 1.25]} />;
      case 'knot':
        return <torusKnotGeometry args={[0.8, 0.28, 64, 16]} />;
      case 'torus':
        return <torusGeometry args={[0.9, 0.35, 16, 50]} />;
      case 'octahedron':
        return <octahedronGeometry args={[1.1, 0]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[1.1, 0]} />;
      case 'sphere':
      default:
        return <sphereGeometry args={[1, 32, 32]} />;
    }
  };

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <group>
        <mesh ref={meshRef}>
          {renderShape()}
          <MeshWobbleMaterial
            color={color}
            factor={isHovered ? 0.35 : 0.12}
            speed={isHovered ? 3 : 1.5}
            roughness={0.2}
            metalness={0.8}
            wireframe={isHovered}
          />
        </mesh>
        {modelType === 'cyberCube' && (
          <mesh ref={ringRef}>
            <torusGeometry args={[1.4, 0.025, 16, 48]} />
            <meshBasicMaterial color={color} wireframe />
          </mesh>
        )}
      </group>
    </Float>
  );
};

export const ProjectCard3D: React.FC<ProjectCard3DProps> = ({ modelType, color, isHovered, isLucyAi }) => {
  return (
    <div className="w-full h-44 rounded-xl overflow-hidden bg-gradient-to-b from-slate-900/90 to-slate-950/95 relative border border-slate-800">
      <Canvas camera={{ position: [0, 0, 3.8], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.3} />
        <pointLight position={[-5, -5, -5]} intensity={1} color={color} />
        <pointLight position={[0, 2, 2]} intensity={1.2} color="#38bdf8" />

        <ProjectMesh modelType={modelType} color={color} isHovered={isHovered} isLucyAi={isLucyAi} />
      </Canvas>

      <div className="absolute bottom-2 right-2 text-[10px] font-mono text-slate-400 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800/80">
        {isLucyAi ? 'JARVIS AI Core 3D' : '3D Interactive Model'}
      </div>
    </div>
  );
};

