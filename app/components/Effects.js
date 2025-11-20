"use client"

import { useLoader } from '@react-three/fiber'
import { EffectComposer, Bloom, LUT } from '@react-three/postprocessing'
import { LUTCubeLoader } from 'postprocessing'

export default function Effects({ lutUrl }) {
  const texture = useLoader(LUTCubeLoader, lutUrl)

  return (
    <EffectComposer disableNormalPass>
      <Bloom mipmapBlur levels={9} intensity={1.5} luminanceThreshold={1} luminanceSmoothing={1} />
      <LUT lut={texture} />
    </EffectComposer>
  )
}
