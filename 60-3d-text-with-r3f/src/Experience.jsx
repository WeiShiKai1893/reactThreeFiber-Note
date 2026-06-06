import { useMatcapTexture, Center, Text3D, OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import {useRef,  useEffect,useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

//https://github.com/emmelleppi/matcaps
export default function Experience() {
    const [matcapTexture] = useMatcapTexture('C09E5C_DAD2B9_654429_81582D', 256)

    const [matcapTexture2] = useMatcapTexture('3E2335_D36A1B_8E4A2E_2842A5', 256)

    // const [torusGeometry,setTorusGeometry] = useState()
    // const [material,setMaterial] = useState()

    const torusGeometry = new THREE.TorusGeometry(1, 0.4, 16, 32)
    const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture2 })

    const dountGroup = useRef()

    useEffect(() => {
        matcapTexture.encoding = THREE.sRGBEncoding
        matcapTexture2.encoding = THREE.sRGBEncoding
        
        matcapTexture.needsUpdate = true
        matcapTexture2.needsUpdate = true

        material.matcap = matcapTexture2
        material.needsUpdate = true
    }, [])

    useFrame((state, delta) => {
        for (const child of dountGroup.current.children) {
           // child.rotation.x += delta * 0.5
            child.rotation.y += delta * 0.5
        }
    })
    
    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        {/* <torusGeometry ref={setTorusGeometry} args={[1, 0.4, 16, 32]} />
        <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture2} /> */}
        // Center is a wrapper component that centers the child element in the viewport
        // Text3D is a component that renders 3D text
        <Center>
            <Text3D
                font="/fonts/helvetiker_regular.typeface.json"
                position={[0, 0, 0]}
                size={1}
                height={0.5}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
            >
                Hello World
                {/* //  <meshNormalMaterial/>   */}
                <meshMatcapMaterial matcap={matcapTexture} />
            </Text3D>

<group ref={dountGroup}>
{[...Array(100)].map((value, index) =>

                <mesh
                    position={[(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10]}
                    key={index}
                    rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
                    scale={0.1 + Math.random() * 0.5} 
                    geometry={torusGeometry}
                    material={material}
                    >
                </mesh>
            )}

</group>



        </Center>

    </>
}