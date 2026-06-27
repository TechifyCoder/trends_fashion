"use client"

import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

function FloatingClothMesh() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { mouse } = useThree()

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(6, 4, 40, 28)
    return geo
  }, [])

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#C9A96E"),
      metalness: 0.75,
      roughness: 0.25,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    })
  }, [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    const pos = meshRef.current.geometry.attributes.position

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      const wave =
        Math.sin(x * 0.8 + t * 0.9) * 0.15 +
        Math.sin(y * 0.6 + t * 0.7) * 0.1 +
        Math.sin((x + y) * 0.5 + t * 0.5) * 0.12
      pos.setZ(i, wave)
    }
    pos.needsUpdate = true
    meshRef.current.geometry.computeVertexNormals()

    // Mouse parallax
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      mouse.y * 0.08,
      0.05
    )
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      -mouse.x * 0.08,
      0.05
    )
  })

  return (
    <mesh ref={meshRef} geometry={geometry} material={material} rotation={[-0.3, 0, 0]} />
  )
}

export default function FloatingCloth() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#E8C98A" />
      <directionalLight position={[-5, -3, 2]} intensity={0.4} color="#C9A96E" />
      <pointLight position={[0, 0, 4]} intensity={0.8} color="#ffffff" />
      <FloatingClothMesh />
    </>
  )
}
