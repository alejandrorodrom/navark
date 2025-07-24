import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function AnimatedPuddle({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [geometry] = useState(() => {
    const radius = 0.6;
    const segments = 128;
    const geo = new THREE.CircleGeometry(radius, segments);
    const pos = geo.attributes.position;
    const borderCount = pos.count - 1;
    // Borde cartoon suave
    const angle0 = 0;
    const variation0 = 1
      + Math.sin(angle0 * 2) * 0.18
      + Math.cos(angle0 * 3) * 0.13
      + Math.sin(angle0 * 1) * 0.09;
    const x0 = pos.getX(1) * variation0;
    const y0 = pos.getY(1) * variation0;
    pos.setX(1, x0);
    pos.setY(1, y0);
    for (let i = 2; i < pos.count - 1; i++) {
      const angle = ((i - 1) / (borderCount - 1)) * Math.PI * 2;
      const variation = 1
        + Math.sin(angle * 2) * 0.18
        + Math.cos(angle * 3) * 0.13
        + Math.sin(angle * 1) * 0.09;
      pos.setX(i, pos.getX(i) * variation);
      pos.setY(i, pos.getY(i) * variation);
    }
    pos.setX(pos.count - 1, x0);
    pos.setY(pos.count - 1, y0);
    return geo;
  })
  const baseZ = useRef<Float32Array>(null)
  const scaleZ = 2.2

  useEffect(() => {
    baseZ.current = new Float32Array(geometry.attributes.position.count)
    for (let i = 0; i < geometry.attributes.position.count; i++) {
      baseZ.current[i] = geometry.attributes.position.getZ(i)
    }
  }, [geometry])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const pos = geometry.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      const d = Math.sqrt(x * x + (y / scaleZ) * (y / scaleZ))
      const wave = Math.sin(8 * d - t * 3) * 0.04
      pos.setZ(i, baseZ.current ? baseZ.current[i] + wave : wave)
    }
    pos.needsUpdate = true
    geometry.computeVertexNormals()
  })

  return (
    <>
      <mesh ref={meshRef} geometry={geometry} position={position} rotation={[-Math.PI / 2, 0, 0]} scale={[1.3, 3, scaleZ]}>
        <meshPhysicalMaterial color="#7ed6fb" roughness={0.35} metalness={0.0} transmission={0.7} thickness={0.2} ior={1.2} transparent opacity={0.85} />
      </mesh>
      {/* Highlight cartoon */}
      <mesh geometry={geometry} position={[position[0], position[1]+0.01, position[2]]} rotation={[-Math.PI / 2, 0, 0]} scale={[0.5, 1.2, scaleZ * 0.7]}>
        <meshPhysicalMaterial color="#fff" transparent opacity={0.25} roughness={0.2} metalness={0.0} />
      </mesh>
    </>
  )
} 