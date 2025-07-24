import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ExplosionAnimated({ object, position = [0, 0, 0] }: { object: THREE.Object3D, position?: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)
  const [progress, setProgress] = useState(0)
  const [showSmoke, setShowSmoke] = useState(false)
  const [explosionObj] = useState(() => object.clone())
  const progressRef = useRef(0)

  useFrame((_, delta) => {
    setProgress((prev) => {
      const next = Math.min(prev + delta / 1.2, 1)
      progressRef.current = next
      if (next === 1 && !showSmoke) setShowSmoke(true)
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
      <group scale={[scale, scale, scale]}>
        <primitive object={explosionObj} />
      </group>
      {showSmoke && <SmokeParticles />}
    </group>
  )
}

function SmokeParticles() {
  // Definir posiciones y direcciones fijas para 8 partículas
  const particles = [
    { pos: [0, 0, 0], dir: [0, 1, 0] },
    { pos: [0.1, 0, 0], dir: [0.5, 1, 0] },
    { pos: [-0.1, 0, 0], dir: [-0.5, 1, 0] },
    { pos: [0, 0, 0.1], dir: [0, 1, 0.5] },
    { pos: [0, 0, -0.1], dir: [0, 1, -0.5] },
    { pos: [0.08, 0, 0.08], dir: [0.4, 1, 0.4] },
    { pos: [-0.08, 0, -0.08], dir: [-0.4, 1, -0.4] },
    { pos: [0, 0, 0], dir: [0, 1.2, 0] },
  ]
  const [life, setLife] = useState(0)
  useFrame((_, delta) => {
    setLife((prev) => Math.min(prev + delta * 1.2, 1))
  })
  return (
    <group>
      {particles.map((p, i) => {
        // Movimiento y desvanecimiento
        const px = p.pos[0] + p.dir[0] * life * 0.7
        const py = p.pos[1] + p.dir[1] * life * 0.7
        const pz = p.pos[2] + p.dir[2] * life * 0.7
        const scale = 0.035 + 0.05 * (1 - life)
        const opacity = 0.45 * (1 - life)
        return (
          <mesh key={i} position={[px, py, pz]} scale={[scale, scale, scale]}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#b0b0b0" transparent opacity={opacity} roughness={1} />
          </mesh>
        )
      })}
    </group>
  )
} 