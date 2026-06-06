import { Sparkles, useTexture, useGLTF, OrbitControls, Center, Stars, Cloud, Float, Trail } from '@react-three/drei'
import { Color } from 'three'
import { useFrame } from '@react-three/fiber'
import { useRef ,useMemo } from 'react'

// 移动的小球 - 用于展示 Trail 拖尾效果
function MovingOrb() {
    const ref = useRef()

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime()
        ref.current.position.x = Math.cos(t * 2) * 3
        ref.current.position.z = Math.sin(t * 2) * 3
        ref.current.position.y = 1.5 + Math.sin(t * 3) * 0.5
    })

    return (
        <mesh ref={ ref }>
            <sphereGeometry args={ [0.1, 16, 16] } />
            <meshBasicMaterial color="#ff69b4" />
        </mesh>
    )
}

export default function Experience()
{
    const spark =useRef()
    //模型以及纹理
    const {nodes} = useGLTF('./model/portal.glb')
    const bakedTexture = useTexture('./model/baked.jpg')
    //引入纹理记得设置偏转。
    bakedTexture.flipY = false

    useFrame (({ clock }, delta) => {
        const elapsedTime = clock.getElapsedTime()
        //让portalLight发光
       //让Sparkles绕着Y轴旋转
       // spark.current.rotation.y = elapsedTime * 0.2
        spark.current.rotation.x = elapsedTime * 0.2
       // spark.current.rotation.z = elapsedTime * 0.2

       


    })
    
    return <>
        <color attach="background" args={ ['#201919'] } />

        {/* 1. Stars 星空背景 */}
        <Stars
            radius={10}
            depth={50}
            count={1000}      // 增加数量
            factor={8}         // 增大星星尺寸
            saturation={0}
            fade
            speed={0.5}        // 减慢旋转速度
        />

        <OrbitControls makeDefault />

    <Center>
        <mesh  geometry={ nodes.baked.geometry }>
            <meshBasicMaterial map={ bakedTexture } map-flipY={ false } />
        </mesh>

        <mesh  
            geometry={ nodes.poleLightA.geometry }
            position={ nodes.poleLightA.position }
        >
            <meshBasicMaterial color={ '#ffffe5' } />
        </mesh>
        <mesh  
            geometry={ nodes.poleLightB.geometry }
            position={ nodes.poleLightB.position }
        >
            <meshBasicMaterial color={ '#ffFFe5' } />
        </mesh>

        <mesh  
            geometry={ nodes.portalLight.geometry }
            position={ nodes.portalLight.position }
            rotation={ nodes.portalLight.rotation }
        >
            <meshBasicMaterial color={ '#ffFFe5' } />
        </mesh>
        {/* 2. Cloud 体积云 */}
        <Cloud position={ [-4, 5, -2] } speed={ 0.2 } opacity={ 0.6 } color="#a0a0a0" />
        <Cloud position={ [4, 6, -3] } speed={ 0.3 } opacity={ 0.4 } color="#808080" scale={ 0.8 } />

  
            <Sparkles
                ref={ spark }
                size={ 10 }
                scale={ [1, 1, 0] }
                speed={ 0.1 }
                count={ 40 }
                color={ '#3cff00' }
                position={ nodes.portalLight.position }   
            /> 

        {/* 4. Trail 拖尾效果 */}
        <Trail width={ 1.5 } length={ 8 } color="#2c1be5" attenuation={ (t) => t * t }
            >
            <MovingOrb />
        </Trail>

        <RingParticles count={ 100 } radius={ 2.5 }  />



    </Center>


    </>
}

function RingParticles({ count = 100, radius = 2 }) {
    const points = useRef()
    
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2
            arr[i * 3] = Math.cos(angle) * radius
            arr[i * 3 + 1] = (Math.random() - 0.5) * 0.5
            arr[i * 3 + 2] = Math.sin(angle) * radius
        }
        return arr
    }, [count, radius])

    useFrame((state) => {
        points.current.rotation.y = state.clock.elapsedTime * 0.5
    })

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial size={0.1} color="#35d81f" transparent opacity={0.8} />
        </points>
    )
}

useGLTF.preload('./model/portal.glb')