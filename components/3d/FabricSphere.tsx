"use client"

import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

export default function FabricSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { mouse } = useThree()

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    meshRef.current.rotation.x = t * 0.2
    meshRef.current.rotation.y = t * 0.15
    meshRef.current.rotation.z = t * 0.08

    // Mouse parallax
    meshRef.current.rotation.x += THREE.MathUtils.lerp(0, mouse.y * 0.3, 0.05)
    meshRef.current.rotation.y += THREE.MathUtils.lerp(0, mouse.x * 0.3, 0.05)
  })

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#E8C98A" />
      <pointLight position={[-3, -3, 3]} intensity={0.5} color="#C9A96E" />
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.2, 0.38, 140, 16]} />
        <meshBasicMaterial
          color={new THREE.Color("#C9A96E")}
          wireframe={true}
        />
      </mesh>
    </>
  )
}
