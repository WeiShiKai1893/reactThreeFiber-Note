import { useFrame  } from '@react-three/fiber'
import { useControls } from 'leva'
import { Stage, Lightformer, Environment, RandomizedLight, AccumulativeShadows, BakeShadows, useHelper, OrbitControls, SoftShadows } from '@react-three/drei'
import { useRef  } from 'react'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import { RAD2DEG } from 'three/src/math/MathUtils.js'


// 1:20:01
export default function Experience()
{
    const directionalLight = useRef()
    useHelper(directionalLight, THREE.DirectionalLightHelper, 0.5)
    const cube = useRef()
    
    useFrame((state, delta) =>
    {
        cube.current.rotation.y += delta * 0.2
        //灯围绕物体旋转
       // directionalLight.current.position.x = Math.cos(state.clock.elapsedTime) * 3
     //   directionalLight.current.position.z = Math.sin(state.clock.elapsedTime) * 3
    })

    //添加注释
//envMapIntensity	环境贴图光照强度	0-12
// envmapheight	地面环境高度	0-10
// envmapradius	地面环境半径	0-100
// envmapscale	地面环境缩放	0-200

    const { envMapIntensity, envmapheight, envmapradius, envmapscale } = useControls('environment map', {
        envMapIntensity: { value: 1.5, min: 0, max: 12 },
        envmapheight: { value: 5, min: 0, max: 10 },
        envmapradius: { value: 40, min: 0, max: 100 },
        envmapscale: { value: 100, min: 0, max: 200 },
    })

    return <>

        {/* <Environment ground={{ height: envmapheight, radius: envmapradius, scale: envmapscale }}
            preset="city">

        </Environment> */}



        {/* <BakeShadows /> */}

        <Perf position="top-left" />
        <OrbitControls makeDefault />

<Stage 
    contactshadow= {{opacity: 0.5, blur: 2 }}
    environment={"city"}
    preset="portrait"
>

        <mesh  castShadow position-x={ -2 }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh castShadow ref={ cube }  position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>
</Stage>

        {/* <AccumulativeShadows
            position={ [ 0, -1, 0 ] }
            scale={ 10 }
            color="#316d39"
            opacity={ 0.8 }
            frame={ 100 }
        >
        <RandomizedLight 
        amount={ 8 } radius={ 1 } ambient={ 0.5 } intensity={ 1 }
            position={ [ 1, 2, 3 ] } bias={ 0.001 }
        />

        </AccumulativeShadows> */}

        {/* <directionalLight ref={ directionalLight }  position={ [ 1, 2, 3 ] }   intensity={ 4.5 } 
        castShadow
        shadow-mapSize={ [ 1024 *3, 1024 *3 ] } //set the shadow map size
        shadow-camera-top = { 5 }
        shadow-camera-right = { 5 }
        shadow-camera-bottom = { -2}
        shadow-camera-left = { -2 }
    
         />
        <ambientLight intensity={ 1.5 } /> */}

        {/* <mesh  castShadow position-x={ -2 }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh castShadow ref={ cube }  position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh receiveShadow position-y={ - 1.1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh> */}


    </>
}