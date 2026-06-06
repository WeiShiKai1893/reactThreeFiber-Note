import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Outline as PostOutline } from '@react-three/postprocessing'
import { Perf } from 'r3f-perf'
import { Suspense } from 'react'
import { useState, useMemo } from 'react'
import * as THREE from 'three'
import Model from './Model'
import Placeholder from './Placeholder'
import {Hamburger} from './Hamburger'
import Fox from './Fox'

export default function Experience() {

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
        <ambientLight intensity={1.5} />


        <mesh receiveShadow position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

        <Suspense
            fallback={<Placeholder position={[0, 0.5, 0]} scale={[2,3,2]} />}
        >
            <Hamburger scale={0.1} />
            <Fox />
        </Suspense>

    </>
}