import React, { useRef, useMemo } from 'react';
import { useFrame, useThree, Canvas } from '@react-three/fiber';
import * as THREE from 'three';

interface ConstellationProps {
  count?: number;
  connectionDistance?: number;
  colors?: { points: string; lines: string };
}

export function Constellation({
  count = 150,
  connectionDistance = 2.5,
  colors = { points: '#fbbf24', lines: '#818cf8' } // amber-400, indigo-400
}: ConstellationProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  
  const mousePos = useRef(new THREE.Vector3());

  // Generate random positions and velocities
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = [];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5 - 2; // Keep closer to z=0
      
      vel.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      ));
    }
    return [pos, vel];
  }, [count]);

  const { pointer, viewport, camera } = useThree();

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current) return;

    // Convert pointer to 3D world space
    const vector = new THREE.Vector3(pointer.x, pointer.y, 0.5);
    vector.unproject(camera);
    const dir = vector.sub(camera.position).normalize();
    const distance = -camera.position.z / dir.z;
    const posAtZ0 = camera.position.clone().add(dir.multiplyScalar(distance));
    mousePos.current.lerp(posAtZ0, 0.1);

    const positionsArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    // Update particle positions
    for (let i = 0; i < count; i++) {
      let x = positionsArray[i * 3];
      let y = positionsArray[i * 3 + 1];
      let z = positionsArray[i * 3 + 2];

      const v = velocities[i];
      x += v.x;
      y += v.y;
      z += v.z;

      // Wrap around bounds
      if (x < -10) x = 10;
      if (x > 10) x = -10;
      if (y < -10) y = 10;
      if (y > 10) y = -10;
      if (z < -8) z = 2;
      if (z > 2) z = -8;

      // Mouse repulsion
      const distToMouse = Math.sqrt(
        Math.pow(x - mousePos.current.x, 2) + 
        Math.pow(y - mousePos.current.y, 2)
      );

      if (distToMouse < 3) {
        const repulsion = (3 - distToMouse) * 0.02;
        const dx = (x - mousePos.current.x) / distToMouse;
        const dy = (y - mousePos.current.y) / distToMouse;
        x += dx * repulsion;
        y += dy * repulsion;
      }

      positionsArray[i * 3] = x;
      positionsArray[i * 3 + 1] = y;
      positionsArray[i * 3 + 2] = z;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Calculate connections
    const linePositions = [];
    const lineColors = [];
    
    const colorObj = new THREE.Color(colors.lines);

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positionsArray[i * 3] - positionsArray[j * 3];
        const dy = positionsArray[i * 3 + 1] - positionsArray[j * 3];
        const dz = positionsArray[i * 3 + 2] - positionsArray[j * 3];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < connectionDistance) {
          linePositions.push(
            positionsArray[i * 3], positionsArray[i * 3 + 1], positionsArray[i * 3 + 2],
            positionsArray[j * 3], positionsArray[j * 3 + 1], positionsArray[j * 3 + 2]
          );

          // Alpha fade out based on distance
          const alpha = 1.0 - dist / connectionDistance;
          lineColors.push(
            colorObj.r, colorObj.g, colorObj.b, alpha * 0.3,
            colorObj.r, colorObj.g, colorObj.b, alpha * 0.3
          );
        }
      }
    }

    linesRef.current.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    linesRef.current.geometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 4));
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.05} color={colors.points} transparent opacity={0.6} />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial vertexColors transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
}

export default function ConstellationBackground() {
  // Use a ref to the container, or just attach event source to window/document
  return (
    <div className="absolute inset-0 z-0 overflow-hidden" style={{ pointerEvents: 'none' }}>
      <Canvas eventSource={typeof window !== 'undefined' ? document.getElementById('root') || undefined : undefined} eventPrefix="client">
        <Constellation />
      </Canvas>
    </div>
  );
}
