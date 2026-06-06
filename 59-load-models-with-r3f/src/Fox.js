import {useAnimations, useGLTF} from '@react-three/drei'
import {useEffect} from 'react'
import {useControls} from 'leva'
export default function Fox(){
    const gltf = useGLTF('./Fox/glTF/Fox.gltf')
    const animations = useAnimations(gltf.animations, gltf.scene)

    const {animationName} = useControls({
        animationName: { options: animations.names}
        

    }) 

    useEffect(()=>{
        // const action = animations.actions.Run
        // action.play()
        // window.setTimeout(()=>{
        //    animations.actions.Walk.play()
        //    animations.actions.Walk.crossFadeFrom(animations.actions.Run, 0.1)
        // },2000 )  

        const action = animations.actions[animationName]
        //action.play()
        action.reset().fadeIn(0.5).play()
        return ()=>{
            action.fadeOut(0.5)
        }
    }   ,[animationName])


    return <primitive object={gltf.scene}  scale={0.02} position-x={-2} />
}

// 预加载
useGLTF.preload('./Fox/glTF/Fox.gltf')

