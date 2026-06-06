导入模型的最佳实践

```
// import { useLoader } from '@react-three/fiber'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import {useGLTF} from '@react-three/drei'

// const gltf = useLoader(GLTFLoader, './hamburger.glb',(loader)=>{
//     console.log(loader)
// })

//draco 更轻便的版本
//  const gltf = useLoader(GLTFLoader, './hamburger-draco.glb',(loader)=>{
//     const dracoLoader = new DRACOLoader()
//     dracoLoader.setDecoderPath('./draco/')
//     loader.setDRACOLoader(dracoLoader)
// })

// const gltf = useLoader(GLTFLoader, './FlightHelmet/glTF/FlightHelmet.gltf',(loader)=>{
//     const dracoLoader = new DRACOLoader()
//     dracoLoader.setDecoderPath('./draco/')
//     loader.setDRACOLoader(dracoLoader)
// })

//最佳实践
const gltf = useGLTF('./hamburger.glb')
//    const gltf2 = useGLTF('./hamburger-draco.glb')
```

等待加载
```
<Suspense
            fallback={<Placeholder position={[0, 0.5, 0]} scale={[2,3,2]} />}
        >
            <Model />
        </Suspense>
```


