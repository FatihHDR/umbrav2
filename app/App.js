"use client"
import * as THREE from 'three'
import { useRef, useCallback, useState } from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { Center, Text3D } from '@react-three/drei'
import { Bloom, EffectComposer, LUT } from '@react-three/postprocessing'
import { LUTCubeLoader } from 'postprocessing'
import { Beam } from './components/Beam'
import { Rainbow } from './components/Rainbow'
import { Prism } from './components/Prism'
import { Flare } from './components/Flare'
import { Box } from './components/Box'


export function lerp(object, prop, goal, speed = 0.1) {
  object[prop] = THREE.MathUtils.lerp(object[prop], goal, speed)
}

const vector = new THREE.Vector3()
export function lerpV3(value, goal, speed = 0.1) {
  value.lerp(vector.set(...goal), speed)
}

export function calculateRefractionAngle(incidentAngle, glassIor = 2.5, airIor = 1.000293) {
  const theta = Math.asin((airIor * Math.sin(incidentAngle)) / glassIor) || 0
  return theta
}