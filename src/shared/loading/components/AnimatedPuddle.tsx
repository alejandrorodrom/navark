import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function AnimatedPuddle({ position, scale = [1, 1, 1] }: { position: [number, number, number], scale?: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [geometry] = useState(() => {
    // Usar un plano rectangular en lugar de círculo
    const width = 2;
    const height = 2;
    const segments = 64;
    const geo = new THREE.PlaneGeometry(width, height, segments, segments);
    return geo;
  })
  const baseZ = useRef<Float32Array>(null)
  const scaleZ = scale[2] || 2.2

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
      <mesh ref={meshRef} geometry={geometry} position={position} rotation={[-Math.PI / 2, 0, 0]} scale={scale}>
        <meshPhysicalMaterial color="#1E90FF" roughness={0.5} metalness={0.0} transmission={0.3} thickness={0.1} ior={1.1} transparent opacity={0.9} />
      </mesh>
      {/* Highlight cartoon */}
      <mesh geometry={geometry} position={[position[0], position[1]+0.01, position[2]]} rotation={[-Math.PI / 2, 0, 0]} scale={[scale[0] * 0.5, scale[1] * 1.2, scale[2] * 0.7]}>
        <meshPhysicalMaterial color="#fff" transparent opacity={0.15} roughness={0.3} metalness={0.0} />
      </mesh>
    </>
  )
} 