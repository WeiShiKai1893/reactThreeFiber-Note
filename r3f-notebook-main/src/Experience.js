
import { useFrame, extend, useThree } from '@react-three/fiber'
import { Perf } from "r3f-perf";
import { useRef } from 'react'
import { AmbientLight } from 'three';
//import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import CustomerObject from './model/CustomeObject'
import Car from './model/Car';
import { useHelper } from '@react-three/drei';
import * as THREE from 'three';

extend({ OrbitControls })
export default function Experience() {
    const { camera, gl } = useThree();
   // console.log(camera, gl)
    const cubeRef = useRef();
    const groupCubeRef = useRef();
  useHelper(groupCubeRef, THREE.AxesHelper, 5);

    useFrame((state, delta) => {
        const angle = state.clock.elapsedTime;

        // 镜头旋转视角
        // state.camera.position.x = Math.sin(angle) * 8;
        // state.camera.position.z = Math.cos(angle) * 8;
         state.camera.lookAt(0, 0, 0)
        //console.log(delta)
  //     cubeRef.current.rotation.y += delta;
        //        groupCubeRef.current.rotation.y += delta;

    })

    return (
        <>
            <Perf position="top-left" />
            <OrbitControls args={[camera, gl.domElement]} />
            {/* 直接光和环境光 */}
            <directionalLight position={[1, 2, 3]} intensity={5} />
            <ambientLight intensity={1} />
            <group ref={groupCubeRef} >



                <mesh position-x={-2} >
                    {/* <sphereGeometry args={[1.5, 32, 32]} />
                    <meshNormalMaterial args={[{ color: 'red', wireframe: true }]} /> */}

                    {/* // meshNormalMaterial 修改材质以看到光影效果  meshStandardMaterial */}
                    <sphereGeometry />
                    <meshStandardMaterial args={[{ color: 'red' }]} />
                </mesh>

                <mesh ref={cubeRef} position-x={2} rotation-y={-Math.PI * 0.5} scale={1.5} >
                    <boxGeometry />
                    <meshStandardMaterial args={[{ color: 'red' }]} />
                </mesh>

                <mesh position-y={-2} rotation-x={-Math.PI * 0.5} scale={10}>
                    <planeGeometry />
                    <meshBasicMaterial args={[{ color: 'greenyellow' }]} />
                </mesh>

                <Car  position={[-20,20,0]} scale={ 0.35 } />
            </group>

        </>

    )
}

