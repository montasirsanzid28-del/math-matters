import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function AMathIcon() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <meshStandardMaterial color="#818cf8" roughness={0.2} metalness={0.8} />
      </mesh>
    </Float>
  );
}

function BMathIcon() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      groupRef.current.rotation.z = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef}>
        {[[-0.6, -0.6, 0], [0.6, -0.6, 0], [-0.6, 0.6, 0], [0.6, 0.6, 0]].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <boxGeometry args={[0.9, 0.9, 0.9]} />
            <meshStandardMaterial color="#fbbf24" roughness={0.3} metalness={0.7} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function FurtherPureIcon() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.25;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1}>
      <group>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial color="#10b981" roughness={0.4} metalness={0.6} wireframe />
          <mesh scale={0.7}>
            <octahedronGeometry args={[1.5, 0]} />
            <meshStandardMaterial color="#34d399" roughness={0.2} metalness={0.8} />
          </mesh>
        </mesh>
      </group>
    </Float>
  );
}

function FoundationIcon() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.4;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <cylinderGeometry args={[0, 1.2, 1.8, 4, 1]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.6} />
      </mesh>
    </Float>
  );
}

export default function CourseIcon3D({ type }: { type: string }) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <directionalLight position={[-10, -10, -5]} intensity={1} />
      {type === 'A Math' && <AMathIcon />}
      {type === 'B Math' && <BMathIcon />}
      {type === 'Further Pure Math' && <FurtherPureIcon />}
      {type === 'Foundation Level' && <FoundationIcon />}
    </Canvas>
  );
}
