import { useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

function FloatingLogo() {
  const groupRef = useRef<THREE.Group>(null)
  const barcoRef = useRef<THREE.Mesh>(null)
  const animationRef = useRef<number | undefined>(undefined)

  const gltf = useGLTF('/models/loading.glb')
  const barco = gltf.scene

  useEffect(() => {
    let startTime = Date.now()
    
    const animate = () => {
      if (barcoRef.current) {
        const elapsed = (Date.now() - startTime) / 1000
        
        // Animación de flotación vertical - sinusoidal continua
        barcoRef.current.position.y = Math.sin(elapsed * 1.5) * 0.1
        
        // Animación de balanceo - sinusoidal continua
        barcoRef.current.rotation.z = Math.sin(elapsed * 1.2) * 0.08
        
        // Animación de rotación lenta continua
        barcoRef.current.rotation.y = elapsed * 0.15
      }
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <group ref={groupRef} scale={0.5}>
      <primitive object={barco} ref={barcoRef}/>
    </group>
  )
}

useGLTF.preload('/models/loading.glb')

export default function SplashScene() {
  return (
    <Canvas camera={{ position: [0, 1.5, 4], fov: 50 }} style={{ background: 'white' }}>
      <ambientLight intensity={1.2}/>
      <directionalLight position={[2, 4, 2]} intensity={1.8}/>
      <FloatingLogo/>
    </Canvas>
  )
}
