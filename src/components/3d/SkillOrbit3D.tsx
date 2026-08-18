import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Skill } from '../../types';

interface SkillNodeProps {
  skill: Skill;
  position: [number, number, number];
  isSelected: boolean;
  onSelect: (skill: Skill) => void;
}

// Brand specific color configuration
const getSkillColors = (name: string, category: string) => {
  switch (name.toLowerCase()) {
    case 'python':
      return { primary: '#306998', accent: '#FFD43B', text: '#FFD43B' }; // Python: Blue & Yellow
    case 'java':
      return { primary: '#DC2626', accent: '#FFFFFF', text: '#FFFFFF' }; // Java: Red & White
    case 'c++':
    case 'cpp':
      return { primary: '#00599C', accent: '#659AD2', text: '#659AD2' }; // C++: Blue
    case 'c':
      return { primary: '#283593', accent: '#3f51b5', text: '#9fa8da' }; // C: Navy
    case 'node.js':
    case 'nodejs':
      return { primary: '#339933', accent: '#FFFFFF', text: '#68a063' }; // Node: Green & White
    case 'javascript':
    case 'js':
      return { primary: '#F7DF1E', accent: '#000000', text: '#F7DF1E' }; // JS: Gold
    case 'html5':
    case 'html':
      return { primary: '#E34F26', accent: '#F16529', text: '#E34F26' }; // HTML: Orange Red
    case 'css3':
    case 'css':
      return { primary: '#1572B6', accent: '#2965F1', text: '#38bdf8' }; // CSS: Blue
    case 'c#':
      return { primary: '#9B4F96', accent: '#68217A', text: '#c084fc' };
    case 'kotlin':
      return { primary: '#7F52FF', accent: '#C757BC', text: '#c084fc' };
    case 'ai/ml':
    default:
      return { primary: '#8b5cf6', accent: '#06b6d4', text: '#a855f7' };
  }
};

const SkillNode: React.FC<SkillNodeProps> = ({ skill, position, isSelected, onSelect }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  const colors = getSkillColors(skill.name, skill.category);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.8;
      meshRef.current.rotation.x += delta * 0.4;

      if (ringRef.current) {
        ringRef.current.rotation.z -= delta * 1.2;
        ringRef.current.rotation.x += delta * 0.5;
      }

      const targetScale = isSelected ? 1.4 : hovered ? 1.25 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5} position={position}>
      <group>
        {/* Main Tech Node Sphere */}
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => onSelect(skill)}
        >
          <sphereGeometry args={[0.36, 32, 32]} />
          <meshStandardMaterial
            color={colors.primary}
            emissive={colors.primary}
            emissiveIntensity={hovered || isSelected ? 0.9 : 0.4}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Outer Accent Ring (Yellow for Python, White for Java, etc.) */}
        <mesh ref={ringRef}>
          <torusGeometry args={[0.52, 0.03, 16, 32]} />
          <meshBasicMaterial
            color={colors.accent}
            wireframe
          />
        </mesh>

        {/* 3D Text Label under sphere */}
        <Text
          position={[0, -0.7, 0]}
          fontSize={0.28}
          color={isSelected || hovered ? '#ffffff' : colors.text}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#020617"
        >
          {skill.name}
        </Text>
      </group>
    </Float>
  );
};

interface SkillOrbit3DProps {
  skills: Skill[];
  selectedSkill: Skill | null;
  onSelectSkill: (skill: Skill) => void;
}

export const SkillOrbit3D: React.FC<SkillOrbit3DProps> = ({ skills, selectedSkill, onSelectSkill }) => {
  const groupRef = useRef<THREE.Group>(null!);

  // Distribute skills evenly on a clean 3D orbital cylinder/sphere layout with bounded Y coordinates
  const getNodePosition = (index: number, total: number): [number, number, number] => {
    // Custom offsets to ensure major skills sit in prominent, eye-level camera view
    const skillName = skills[index]?.name.toLowerCase();

    const radius = 3.2;
    const angle = (index / total) * Math.PI * 2;

    // Height offset bounded strictly between -1.5 and +1.5 so nothing floats off top
    const yOffset = Math.sin(index * 1.8) * 1.2;

    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    const y = yOffset;

    return [x, y, z];
  };

  return (
    <div className="w-full h-[400px] md:h-[480px] rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md relative overflow-hidden">
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 bg-indigo-950/60 px-2.5 py-1 rounded-full border border-indigo-800/50">
          Interactive 3D Tech Stack
        </span>
        <p className="text-xs text-slate-400 mt-1">
          Python (Yellow & Blue) • Java (Red & White) • Node.js • C/C++ • HTML/CSS/JS
        </p>
      </div>

      <Canvas camera={{ position: [0, 0, 7.5], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#6366f1" />
        <pointLight position={[0, 5, 5]} intensity={1} color="#38bdf8" />

        <group ref={groupRef}>
          {skills.map((skill, idx) => (
            <SkillNode
              key={skill.name}
              skill={skill}
              position={getNodePosition(idx, skills.length)}
              isSelected={selectedSkill?.name === skill.name}
              onSelect={onSelectSkill}
            />
          ))}
        </group>

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  );
};

