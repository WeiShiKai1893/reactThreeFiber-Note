
import { useFrame, useThree  } from '@react-three/fiber'
import { useRef, useEffect, useMemo } from 'react'
import {
OrbitControls,
TransformControls,
PivotControls,
Html,
Text,
Float,
MeshReflectorMaterial,
Environment
} from "@react-three/drei";
import * as THREE from 'three';


export default function ExperienceLesson1() {

    // This hook is used to access the Three.js context
    const { camera, gl } = useThree();

    // This is a reference to the cube mesh
    const cubeRef = useRef();
    const groupRef = useRef();
    const boxRef = useRef();
    const controlsRef = useRef();
    
    // Animation function that updates the rotation of the cube and group based on the elapsed time
    const tick = (delta) => {
        cubeRef.current.rotation.y += delta * 4;
        groupRef.current.rotation.y += delta * 0.5;
    }
    // This function is called on every frame render
    useFrame((state, delta) => {

        
    tick(delta);
        // 通过设置镜头在X,Z轴的位置实现环绕功能
        // const angle = state.clock.elapsedTime
        // state.camera.position.x = Math.sin(angle) * 8
        // state.camera.position.z = Math.cos(angle) * 8
        // state.camera.lookAt(0, 0, 0)

        // 设置物体自旋转
       // cubeRef.current.rotation.y += delta * 4;
       //groupRef.current.rotation.y += delta * 0.5;
    });




    return (
        
        <>

            {/* This component is used to create orbit controls for the camera */}
            <OrbitControls args={[camera, gl.domElement]}  ref={controlsRef} />

            {/* This component is used to create a  lights | 直光 与环境光*/}
            <directionalLight position={[1, 2, 3]} intensity={1.5} />
            <ambientLight intensity={0.5} />

  

            {/* //使用ref 方式管理组件，避免了usestate动态修改参数值导致 React重新加载组件的问题 */}
            <group ref={groupRef}>
                <mesh position-x={-2}>
                    <sphereGeometry />
                    <meshStandardMaterial color="orange" />
                </mesh>
                <mesh
                    ref={cubeRef}
                    rotation-y={Math.PI * 0.25}
                    position-x={6}
                    scale={1.5}
                >
                    <boxGeometry scale={1.5} />
                    <meshStandardMaterial color="mediumpurple" wireframe={false} />
                </mesh>
            </group>

            <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
                <planeGeometry />
                <meshStandardMaterial color="greenyellow" />
            </mesh>

            {/* 创建一个立方体，并启用TransformControls 使可以操作旋转 */}
            <mesh ref={boxRef} position-x={2} scale={1.5} >
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>
            <TransformControls object={boxRef} mode="rotate" />

           
{/* 
            <CustomObject /> */}

        </>
    );
};

const CustomObject = () => {
    const geometryRef = useRef();

    const verticesCount = 10 * 3;

    // useMemo is a React hook that helps to optimize performance by memoizing the result of a function call
    const positions = useMemo(() => {
        const positions = new Float32Array(verticesCount * 3);

        for (let i = 0; i < verticesCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 3;
        }

        return positions;
    }, []);

    // useEffect is a React hook that allows you to perform side effects in function components
    useEffect(() => {
        geometryRef.current.computeVertexNormals();
    }, []);

    return (
        <mesh>
            {/* 提供自一些坐标点 随机生成一个多面体 */}
            <bufferGeometry ref={geometryRef}>
                <bufferAttribute
                    attach="attributes-position"
                    count={verticesCount}
                    itemSize={3}
                    array={positions}
                />
            </bufferGeometry>

            <meshStandardMaterial color="red" side={THREE.DoubleSide} />
        </mesh>
    );
};

