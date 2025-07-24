import { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export default function SpinningRudder({ position = [0, -1.8, 0] }: { position?: [number, number, number] }) {
  const rudderGroupRef = useRef<THREE.Group>(null)
  const rudderObjectRef = useRef<THREE.Object3D>(null)
  const rudderGltf = useGLTF('/models/rudder.glb')
  const rudder = rudderGltf.scene

  useEffect(() => {
    let frameId: number
    const animate = () => {
      if (rudderObjectRef.current) {
        rudderObjectRef.current.rotation.x -= 0.07 // giro hacia la derecha
      }
      frameId = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(frameId)
  }, [])

  return (
    <group ref={rudderGroupRef} position={position} scale={[0.22, 0.22, 0.22]} rotation={[-0.40, -Math.PI / 2, 0]}>
      <primitive object={rudder.clone()} ref={rudderObjectRef} />
    </group>
  )
} 