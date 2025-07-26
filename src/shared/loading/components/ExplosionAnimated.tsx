import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ExplosionAnimated({ object, position = [0, 0, 0] }: { object: THREE.Object3D, position?: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)
  const [progress, setProgress] = useState(0)
  const [explosionObj] = useState(() => object.clone())
  const progressRef = useRef(0)

  useFrame((_, delta) => {
    setProgress((prev) => {
      const next = Math.min(prev + delta / 1.2, 1)
      progressRef.current = next
      return next
    })
    // Desvanecer materiales usando el valor actualizado
    const p = progressRef.current
    const opacity = p < 0.7 ? 1 : 1 - (p - 0.7) / 0.3
    explosionObj.traverse((child: any) => {
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((mat: any) => {
            mat.transparent = true
            mat.opacity = opacity
            mat.needsUpdate = true
          })
        } else {
          child.material.transparent = true
          child.material.opacity = opacity
          child.material.needsUpdate = true
        }
      }
    })
  })

  // Escalado de 0.01 a 0.6
  const scale = 0.01 + progress * 0.6

  if (progress >= 1) return null;

  return (
    <group ref={groupRef} position={position}>
      {progress < 1 && (
        <group scale={[scale, scale, scale]}>
          <primitive object={explosionObj} />
        </group>
      )}
    </group>
  )
} 