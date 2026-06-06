
import {Clone, useGLTF} from '@react-three/drei'

export default function Model()
{
    
    //最佳实践
    const gltf = useGLTF('./hamburger.glb')
    return <>
        <Clone object={gltf.scene} position-y={-11} scale={1} /> 
        <Clone object={gltf.scene} position-y={-1} scale={1} /> 
        <Clone object={gltf.scene} position-y={-31} scale={1} /> 
        <Clone object={gltf.scene} position-y={-21} scale={1} /> 

    </>
}

// 预加载
useGLTF.preload('./hamburger.glb')