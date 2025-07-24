import { useRef, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import AnimatedPuddle from './components/AnimatedPuddle'
import ExplosionAnimated from './components/ExplosionAnimated'
import SpinningRudder from './components/SpinningRudder'

function FloatingLogo() {
  const groupRef = useRef<THREE.Group>(null)
  const ship1Ref = useRef<THREE.Group>(null)
  const ship2Ref = useRef<THREE.Group>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const [shotData, setShotData] = useState<null | {from: number, to: number, fromY: number, toY: number, fromZ: number, toZ: number, progress: number, target: 'ship1' | 'ship2'}>(null)
  const [isShooting, setIsShooting] = useState(false)
  const [currentShooter, setCurrentShooter] = useState<'ship1' | 'ship2'>('ship1')
  // Usar refs para el temblor
  const shakeUntil1 = useRef(0)
  const shakeUntil2 = useRef(0)
  const [explosions, setExplosions] = useState<{ position: [number, number, number], key: number, created: number }[]>([])
  const explosionKey = useRef(0)
  const explosionTriggered = useRef(false)

  // Cargar modelos de barcos distintos
  const ship1Gltf = useGLTF('/models/loading_ship_1.glb')
  const ship2Gltf = useGLTF('/models/loading_ship_2.glb')
  const ship1 = ship1Gltf.scene
  const ship2 = ship2Gltf.scene
  const cannonballGltf = useGLTF('/models/cannonball.glb')
  const cannonball = cannonballGltf.scene
  const explosionGltf = useGLTF('/models/explosion.glb')
  const explosion = explosionGltf.scene

  // Animación continua de barcos y bala
  useEffect(() => {
    let startTime = Date.now()
    
    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000

      // Temblor lateral (usando refs de tiempo, intensidad 1/8)
      const shaking1 = elapsed < shakeUntil1.current
      const shaking2 = elapsed < shakeUntil2.current
      // Nueva lógica: vibración de menos a más y luego a menos
      const shakeDuration = 0.5 // segundos
      let shakeIntensity1 = 0
      let shakeIntensity2 = 0
      if (shaking1) {
        const t = Math.max(0, Math.min(1, 1 - (shakeUntil1.current - elapsed) / shakeDuration))
        shakeIntensity1 = Math.sin(Math.PI * t) // 0 -> 1 -> 0
      }
      if (shaking2) {
        const t = Math.max(0, Math.min(1, 1 - (shakeUntil2.current - elapsed) / shakeDuration))
        shakeIntensity2 = Math.sin(Math.PI * t)
      }
      // Mucho menor intensidad
      const shakeAmount1X = shakeIntensity1 * Math.sin(elapsed * 30) * 0.006
      const shakeAmount2X = shakeIntensity2 * Math.sin(elapsed * 30) * 0.006
      const shakeAmount1RotY = shakeIntensity1 * Math.sin(elapsed * 30) * 0.003
      const shakeAmount2RotY = shakeIntensity2 * Math.sin(elapsed * 30) * 0.003

      if (ship1Ref.current && ship2Ref.current) {
        // Animación de flotación mejorada con múltiples frecuencias de onda
        const wave1 = Math.sin(elapsed * 1.2) * 0.08
        const wave2 = Math.sin(elapsed * 0.8) * 0.04
        const wave3 = Math.sin(elapsed * 0.6) * 0.02

        // Animación de flotación del barco 1
        ship1Ref.current.position.y = wave1 + wave2 + wave3
        ship1Ref.current.position.x = -1.5 + Math.sin(elapsed * 0.4) * 0.02 + shakeAmount1X

        // Animación de flotación del barco 2 (fase opuesta)
        ship2Ref.current.position.y = -wave1 + wave2 - wave3
        ship2Ref.current.position.x = 1.5 + Math.sin(elapsed * 0.4 + Math.PI) * 0.02 + shakeAmount2X

        // Simulación realista de inclinación de barcos
        const tilt1 = Math.sin(elapsed * 1.1) * 0.06
        const tilt2 = Math.sin(elapsed * 0.9) * 0.04
        const roll1 = Math.sin(elapsed * 0.7) * 0.08
        const roll2 = Math.sin(elapsed * 0.5) * 0.05

        // Inclinación del barco 1 (pitch y roll)
        ship1Ref.current.rotation.z = tilt1 + tilt2 // Roll
        ship1Ref.current.rotation.x = roll1 + roll2 // Pitch
        ship1Ref.current.rotation.y = Math.PI / 2.5 + shakeAmount1RotY // Giro lateral

        // Inclinación del barco 2 (fase opuesta)
        ship2Ref.current.rotation.z = -tilt1 + tilt2
        ship2Ref.current.rotation.x = -roll1 + roll2
        ship2Ref.current.rotation.y = -Math.PI / 2.5 + shakeAmount2RotY
      }

      // Animar la bala si hay disparo activo
      setShotData(prev => {
        if (!prev) return prev
        const newProgress = prev.progress + 0.015
        // Duración total de la bala (en segundos): 1 / 0.015 ≈ 66 frames ≈ 1s
        // 300 ms antes: progreso >= 1 - 0.3 / 1 = 0.7
        if (!explosionTriggered.current && prev.progress < 0.7 && newProgress >= 0.7) {
          setExplosions((exps) => [
            ...exps,
            {
              position: [prev.to, prev.toY + 0.48, prev.toZ],
              key: explosionKey.current++,
              created: Date.now()
            }
          ])
          explosionTriggered.current = true
        }
        if (newProgress >= 1) {
          setIsShooting(false)
          // Temblor al barco objetivo usando refs
          if (prev.target === 'ship1') {
            shakeUntil1.current = elapsed + 0.5
          } else {
            shakeUntil2.current = elapsed + 0.5
          }
          explosionTriggered.current = false
          return null
        }
        return {...prev, progress: newProgress}
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // Limpiar explosiones después de su animación
  useEffect(() => {
    if (explosions.length === 0) return
    const interval = setInterval(() => {
      const now = Date.now()
      setExplosions((exps) => exps.filter(e => now - e.created < 1000))
    }, 100)
    return () => clearInterval(interval)
  }, [explosions])

  // Disparo alternado cada 1.5 segundos, independiente de la animación
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isShooting) {
        explosionTriggered.current = false;
        setIsShooting(true)
        if (currentShooter === 'ship1') {
          setShotData({
            from: -1.5, to: 1.5,
            fromY: -0.7, toY: -0.7,
            fromZ: 0.5, toZ: 0,
            progress: 0,
            target: 'ship2'
          })
          setCurrentShooter('ship2')
        } else {
          setShotData({
            from: 1.5, to: -1.5,
            fromY: -0.7, toY: -0.7,
            fromZ: -0.5, toZ: 0,
            progress: 0,
            target: 'ship1'
          })
          setCurrentShooter('ship1')
        }
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [isShooting, currentShooter])

  return (
    <group ref={groupRef} scale={0.5} position={[0, 0.7, 0]}>
      {/* Charco animado debajo de cada barco */}
      <AnimatedPuddle position={[-1.5, -0.7, 0]} />
      <AnimatedPuddle position={[1.5, -0.7, 0]} />
      {/* Barco 1 - Izquierda */}
      <group ref={ship1Ref} position={[-1.5, 0, 0]} rotation={[0, Math.PI / 2.5, 0]}>
        <primitive object={ship1.clone()} />
      </group>
      {/* Barco 2 - Derecha */}
      <group ref={ship2Ref} position={[1.5, 0, 0]} rotation={[0, -Math.PI / 2.5, 0]}>
        <primitive object={ship2.clone()} />
      </group>
      {/* Disparo actual */}
      {shotData && (
        <group
          key="cannonball"
          position={[
            THREE.MathUtils.lerp(shotData.from, shotData.to, shotData.progress),
            THREE.MathUtils.lerp(shotData.fromY, shotData.toY, shotData.progress) + Math.sin(shotData.progress * Math.PI) * 0.7 + 0.3,
            THREE.MathUtils.lerp(shotData.fromZ, shotData.toZ, shotData.progress)
          ]}
          scale={[0.06, 0.06, 0.06]}
        >
          <primitive object={cannonball.clone()} />
        </group>
      )}
      {/* Explosiones cartoon en impactos */}
      {explosions.map((exp) => (
        <ExplosionAnimated key={exp.key} object={explosion} position={exp.position} />
      ))}
    </group>
  )
}

useGLTF.preload('/models/loading-ship-1.glb')
useGLTF.preload('/models/loading-ship-2.glb')
useGLTF.preload('/models/cannonball.glb')
useGLTF.preload('/models/rudder.glb')
useGLTF.preload('/models/explosion.glb')

export default function SplashScene() {
  return (
    <Canvas camera={{ position: [0, 1.5, 4], fov: 50 }} style={{ background: 'white' }}>
      <ambientLight intensity={1.6}/>
      <directionalLight
        position={[0, 2, 4]}
        intensity={1.0}
      />
      <FloatingLogo/>
      <SpinningRudder position={[0, -1.8, 0]} />
    </Canvas>
  )
}
