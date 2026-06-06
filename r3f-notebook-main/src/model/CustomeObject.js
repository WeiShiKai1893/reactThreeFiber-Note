import * as THREE from 'three';
import { useEffect, useMemo, useRef } from 'react';

export default function CustomGeometry() {


    // const positions = new Float32Array(verticesCount * 3);
    // for (let i = 0; i < verticesCount * 3; i++) {
    //   positions[i] = (Math.random() - 0.5) * 3; // 随机生成坐标范围 [-1.5, 1.5]
    // }
    const geometryRef = useRef();


    const verticesCount = 10 * 3;
    const positions = useMemo(() => {
        const positions = new Float32Array(verticesCount * 3);
        for (let i = 0; i < verticesCount * 3; i++) {
          positions[i] = (Math.random() - 0.5) * 3; // 随机生成坐标范围 [-1.5, 1.5]
        }
        return positions
    }, [])

    useEffect( ()=>{
    geometryRef.current.computeVertexNormals()
    } ,[])

    return (
        <mesh>
            <bufferGeometry ref={geometryRef}>
                <bufferAttribute
                    attach="attributes-position"
                    count={verticesCount}
                    itemSize={3} // 每个顶点有3个坐标值（x, y, z）
                    array={positions}
                />
            </bufferGeometry>
            <meshBasicMaterial color="red" side={THREE.DoubleSide} /> {/* 添加材质 */}
        </mesh>
    );
}