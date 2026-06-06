import { useFrame } from '@react-three/fiber'
import {  meshBounds,OrbitControls, useGLTF } from '@react-three/drei'
import { useRef, useState } from 'react'

//useBVH
export default function Experience()
{
    const cube = useRef()
    const hamburger = useGLTF('./hamburger.glb')
    const originalPositions = useRef(new Map())
    const [isExploded, setIsExploded] = useState(false)

    useFrame((state, delta) => {
        cube.current.rotation.y += delta * 0.2

        // 炸裂动画
        hamburger.scene.traverse((child) => {
            if (child.isMesh && originalPositions.current.has(child)) {
                const original = originalPositions.current.get(child)
                const targetY = isExploded ? original.y + Math.abs(original.y) * 0.5 + 0.3 : original.y
                child.position.y += (targetY - child.position.y) * delta * 15
            }
        })
    })

    // 鼠标事件默认是穿透的，如果想阻止穿透，需要设置
    const evnetHandler = (event) =>{
        console.log(event)
        //这个event用处很大·    
        cube.current.material.color.set(`hsl(${Math.random()*360}, 100%, 50%)`)
    }

    /**
     * 鼠标右键事件处理函数
     *
     * @param {Object} event - 鼠标右键事件对象
     */
    const evnetHandler2 = (event) =>{
        console.log("evnetHandler2")
        
        cube.current.position.y =cube.current.position.y >2 ? 1:3;
        console.log(cube.current.position.y)
    }

    return <>

        <OrbitControls makeDefault />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />

        {/* // CLICK -> A--B--C--D 默认点击会穿透，除非前面的model也有事件 阻挡 */}
        <mesh position-x={ - 2 } onClick={(event) => event.stopPropagation()} >
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh ref={ cube } position-x={ 2 } scale={ 1.5 } 
        raycast={ meshBounds }
        onClick={evnetHandler}
        onPointerEnter={ () =>{document.body.style.cursor = 'pointer'} }
        onPointerLeave={ () =>{document.body.style.cursor = 'default'} }
        // onDoubleClick={evnetHandler} //双击事件
        // onContextMenu={evnetHandler2} //右键事件
        // onPointerOver={evnetHandler} //鼠标悬停事件
        // onPointerOut={evnetHandler} //鼠标移出事件
        // onPointerMissed={evnetHandler} //鼠标移出事件
        
        >
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>


        <mesh>
            <primitive 
                object={ hamburger.scene } 
                scale={ 0.25 } 
                position-y={  2 } 
                onClick={ (event) =>{
                    console.log(event.object.name)
                    event.stopPropagation()

                } }
                onPointerEnter={ (event) => {
                    // 保存原始位置（首次进入时）
                    hamburger.scene.traverse((child) => {
                        if (child.isMesh && !originalPositions.current.has(child)) {
                            originalPositions.current.set(child, child.position.clone())
                        }
                    })
                    setIsExploded(true)
                    event.stopPropagation()
                } }
                onPointerLeave={ (event) => {
                    setIsExploded(false)
                    event.stopPropagation()
                } }
            />

        </mesh>


    </>
}